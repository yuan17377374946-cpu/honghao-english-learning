"""Render remaining stories with local Piper. No account, API key or paid service.

Install piper-tts==1.8.0, then pass --model-dir containing the two pinned
en_GB-vctk-medium model files. Sources, hashes and attribution are recorded below.
Already accepted HeyGen recordings are kept. Raw build WAVs are intermediate files.
"""
from pathlib import Path
import argparse, hashlib, importlib.metadata, json, os, re, subprocess, tempfile, wave
# Full process-lifetime opt-out must be set before ONNX Runtime initializes.
os.environ['ORT_DISABLE_TELEMETRY'] = '1'
import onnxruntime as ort
# ONNX Runtime enables telemetry by default. Disable it before creating any
# inference session; this build uses local model files and needs no network.
ort.disable_telemetry_events()
from piper import PiperVoice, SynthesisConfig

parser = argparse.ArgumentParser()
parser.add_argument('--model-dir', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
production = root / 'audio-production'
model = args.model_dir / 'en_GB-vctk-medium.onnx'
model_config = args.model_dir / 'en_GB-vctk-medium.onnx.json'
expected = {
    model: 'fc3d92d266b1a6c03af2a38215e0eee430ca7fb360f641d7c3dcb17c7670c0f3',
    model_config: '8cc5a7678bf893c35cb6fde5d0812fb7e2b63e1eef54db250afd525277471f2d',
}
for file, digest in expected.items():
    assert hashlib.sha256(file.read_bytes()).hexdigest() == digest, 'Unexpected voice model/config'
config = json.loads(model_config.read_text())
voice = PiperVoice.load(model)
sample_rate = config['audio']['sample_rate']
speaker_map = {'adult_f': 'p228', 'adult_m': 'p227', 'child_f': 'p225', 'child_m': 'p226'}
content = json.loads((root / 'listening-content.json').read_text())
drafts = json.loads((production / 'natural-listening-drafts.json').read_text())
build_dir = Path(tempfile.mkdtemp(prefix='mengmeng-listening-'))
outputs = []

def speaker_label(identifier, part, role):
    if identifier == 'listen-sort-d2':
        return '妈妈' if role == 'adult_f' else 'Leo'
    if identifier == 'listen-sort-d3':
        return '老师' if role == 'adult_f' else 'Anna'
    if identifier == 'listen-sort-d5':
        return '主持人' if role == 'adult_f' else ('Ben' if role == 'child_m' else {1: 'Amy', 3: 'Mia', 5: 'Eva'}[part])
    return None

def silence(seconds):
    return b'\0\0' * round(seconds * sample_rate)

def say(text, role, filename):
    source = build_dir / filename
    speaker = speaker_map[role]
    with wave.open(str(source), 'wb') as wav:
        voice.synthesize_wav(text, wav, syn_config=SynthesisConfig(
            speaker_id=config['speaker_id_map'][speaker], length_scale=1.15,
            noise_scale=.333, noise_w_scale=.5,
        ))
    with wave.open(str(source), 'rb') as wav:
        assert wav.getframerate() == sample_rate and wav.getnchannels() == 1
        frames = wav.readframes(wav.getnframes())
    assert len(frames) > 0
    return frames, speaker

def encode(identifier, frames):
    source = build_dir / (identifier + '-full.wav')
    with wave.open(str(source), 'wb') as wav:
        wav.setnchannels(1); wav.setsampwidth(2); wav.setframerate(sample_rate)
        wav.writeframes(frames)
    filename = identifier + '-clear-v3.mp3'
    destination = root / 'audio' / filename
    subprocess.run(['ffmpeg', '-v', 'error', '-i', str(source), '-af',
                    'volume=0.9,asetpts=N/SR/TB', '-codec:a', 'libmp3lame',
                    '-b:a', '48k', '-ar', '24000', '-ac', '1', '-y', str(destination)], check=True)
    duration = float(subprocess.check_output(['ffprobe', '-v', 'error',
        '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', str(destination)], text=True))
    return 'audio/' + filename, duration, hashlib.sha256(destination.read_bytes()).hexdigest()

for draft in drafts['questions']:
    q = next(q for q in content['questions'] if q['id'] == draft['id'])
    if q.get('audioRevision') == 2:  # Keep both completed/accepted HeyGen takes.
        continue
    frames = bytearray(silence(.35))
    turns = []
    new_parts = []
    for index, part in enumerate(draft['parts']):
        assert ord(part['card']) - 65 == q['answer'][index]
        start = len(frames) / 2 / sample_rate
        for turn_index, turn in enumerate(part['turns']):
            if turn_index:
                frames.extend(silence(.22))
            turn_start = len(frames) / 2 / sample_rate
            pcm, speaker = say(turn['text'], turn['voice'], f'{q["id"]}-{index}-{turn_index}.wav')
            frames.extend(pcm)
            turns.append({'part': index, 'turn': turn_index, 'role': turn['voice'],
                          'speaker': speaker, 'text': turn['text'],
                          'start': round(turn_start, 3), 'end': round(len(frames) / 2 / sample_rate, 3)})
        end = len(frames) / 2 / sample_rate
        new_parts.append({'card': q['answer'][index], 'text': ' '.join(t['text'] for t in part['turns']),
                          'clue': part['clue'], 'start': round(start, 3), 'end': round(end, 3)})
        if speaker_label(q['id'], index, part['turns'][0]['voice']):
            new_parts[-1]['turns'] = [dict(t, speakerLabel=speaker_label(q['id'], index, t['voice'])) for t in part['turns']]
        frames.extend(silence(.55 if q['day'] < 2 else .4))
    frames.extend(silence(.3))
    src, duration, digest = encode(q['id'], frames)
    q.update(prompt=draft['title'] + '：听录音，按提及活动的顺序给图片编号。',
             parts=new_parts, audioSrc=src, duration=duration, audioRevision=3,
             listeningFormat=draft['format'])
    q['hint'] = '先看图，听清真正介绍的活动。背景里提到物品、否定或猜测，都不等于已经确定这项活动；按录音介绍顺序排，不按星期先后排。'
    q['why'] = '把每幅图和录音中的具体行动对应起来；分段重听时也要听前后句，不能只凭一个熟悉单词判断。'
    outputs.append({'id': q['id'], 'audioSrc': src, 'duration': duration, 'sha256': digest, 'turns': turns})
    print(q['id'], round(duration, 2), 'seconds;', draft['format'], flush=True)

# Replace the five short listening files too; keep their wording and answers.
for old in content['existing_listening']:
    frames, speaker = say(old['text'], 'adult_f', old['id'] + '.wav')
    src, duration, digest = encode(old['id'], silence(.3) + frames + silence(.4))
    old.update(audioSrc=src, duration=duration)
    outputs.append({'id': old['id'], 'audioSrc': src, 'duration': duration, 'sha256': digest,
                    'turns': [{'role': 'adult_f', 'speaker': speaker, 'text': old['text']}]})

provenance = {
    'engine': 'Piper', 'version': importlib.metadata.version('piper-tts'),
    'telemetry_disabled_before_runtime_initialization': True,
    'model': 'en_GB-vctk-medium', 'model_url':
        'https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_GB/vctk/medium',
    'model_sha256': expected[model], 'config_sha256': expected[model_config],
    'speaker_map': speaker_map, 'settings': {'length_scale': 1.15, 'noise_scale': .333, 'noise_w_scale': .5},
    'sample_rate': sample_rate, 'timing': 'Measured PCM boundaries of whole utterances; no guessed word timestamps.',
    'review_limit': 'Automated content, timing, encoding and browser checks; subjective audio quality remains for actual listening.',
    'outputs': outputs,
}
(production / 'local-audio-manifest.json').write_text(json.dumps(provenance, ensure_ascii=False, indent=2) + '\n')
content['voice'] = 'HeyGen Voice for day 1; local Piper VCTK for remaining stories and short listening tasks'
content['audio_provenance']['remaining'] = 'All 8 revised stories and 5 short listening tasks are now generated locally with Piper.'
content['audio_provenance']['local_manifest'] = 'audio-production/local-audio-manifest.json'
(root / 'listening-content.json').write_text(json.dumps(content, ensure_ascii=False, indent=2) + '\n')
module = (root / 'listening.js').read_text()
prefix, tail = module.split(' const questions=', 1)
_, suffix = tail.split(';\n questions.forEach', 1)
suffix = re.sub(r" U.days.flatMap\(d=>d.questions\).filter\(q=>q.type==='listen'\).forEach\(q=>q.audioSrc='audio/'\+q.id\+'\.mp3'\);",
    ' const shortAudio=' + json.dumps({q['id']: q['audioSrc'] for q in content['existing_listening']}) + ';\n'
    + " U.days.flatMap(d=>d.questions).filter(q=>q.type==='listen').forEach(q=>q.audioSrc=shortAudio[q.id]);", suffix)
assert 'const shortAudio=' in suffix
module = prefix + ' const questions=' + json.dumps(content['questions'], ensure_ascii=False, indent=2) + ';\n questions.forEach' + suffix
module = re.sub(r'U.listeningRevision=\d+;', 'U.listeningRevision=3;', module)
(root / 'listening.js').write_text(module)
drafts.update(status='all_ten_revised_scripts_and_audio_live', note='第1天两篇保留HeyGen配音；其余8篇已用本地Piper配音，不再等待插件额度。')
(production / 'natural-listening-drafts.json').write_text(json.dumps(drafts, ensure_ascii=False, indent=2) + '\n')
print('Built', len(outputs), 'MP3s; intermediate WAVs:', build_dir)
