"""Assemble completed HeyGen takes only; never makes a generation request."""
from pathlib import Path
import json, re, subprocess, zipfile

root = Path(__file__).resolve().parent.parent
production = root / 'audio-production'
drafts = json.loads((production / 'natural-listening-drafts.json').read_text())
jobs = json.loads((production / 'heygen-jobs.json').read_text())['jobs']
outputs = json.loads((production / 'heygen-results.json').read_text())
content = json.loads((root / 'listening-content.json').read_text())
rate = outputs['lessonPlaybackRate']  # Fixed learner delivery choice, not a duration target.

def words(text):
    return re.findall(r"[A-Za-z]+(?:['’][A-Za-z]+)*|\d+", text.lower())

completed = []
for draft in drafts['questions']:
    question_jobs = [job for job in jobs if job['question'] == draft['id']]
    if not all(job['id'] in outputs['outputs'] for job in question_jobs):
        continue
    # Only the two complete single-voice stories are currently available.
    assert len(question_jobs) == 1, 'Multi-role takes need a full, separately reviewed assembly.'
    job = question_jobs[0]
    take = outputs['outputs'][job['id']]
    timestamps = take['original_words']
    assert words(job['text']) == words(' '.join(word['text'] for word in timestamps))
    assert all(0 <= word['start_time'] < word['end_time'] <= take['duration'] for word in timestamps)
    source = production / 'originals' / (job['id'] + '.wav')
    destination = root / 'audio' / (draft['id'] + '-natural-v2.mp3')
    subprocess.run([
        'ffmpeg', '-v', 'error', '-i', str(source),
        '-af', f'atempo={rate},asetpts=N/SR/TB,adelay=250,apad=pad_dur=0.3,asetpts=N/SR/TB',
        '-codec:a', 'libmp3lame', '-b:a', '48k', '-ar', '24000', '-ac', '1', '-y', str(destination)
    ], check=True)
    duration = float(subprocess.check_output([
        'ffprobe', '-v', 'error', '-show_entries', 'format=duration',
        '-of', 'default=nw=1:nk=1', str(destination)
    ], text=True))
    question = next(q for q in content['questions'] if q['id'] == draft['id'])
    cursor = 0
    for part, revision in zip(question['parts'], draft['parts']):
        text = ' '.join(turn['text'] for turn in revision['turns'])
        count = len(words(text))
        chunk = timestamps[cursor:cursor + count]
        assert words(text) == words(' '.join(word['text'] for word in chunk))
        part.update(text=text, clue=revision['clue'],
                    start=round(max(0, .25 + chunk[0]['start_time'] / rate - .1), 3),
                    end=round(min(duration - .05, .25 + chunk[-1]['end_time'] / rate + .12), 3))
        cursor += count
    assert cursor == len(timestamps)
    assert all(question['parts'][i]['end'] <= question['parts'][i + 1]['start']
               for i in range(len(question['parts']) - 1))
    question.update(prompt=draft['title'] + '：听录音，按提及活动的顺序给图片编号。',
                    audioSrc='audio/' + destination.name, duration=duration,
                    listeningFormat=draft['format'], audioRevision=2)
    completed.append(draft['id'])
    print(draft['id'], round(duration, 3), 'seconds;', len(timestamps), 'aligned words')

content['audio_provenance'] = {
    'completed_natural_questions': completed,
    'provider': 'HeyGen Voice', 'source_speed': 1, 'lesson_rate': rate,
    'editing': 'Pitch-preserving fixed lesson tempo, 250ms leading and 300ms trailing padding. No per-word retiming.',
    'alignment': 'Provider word timestamps transformed to final audio coordinates; not independent speech recognition.',
    'review_limit': 'Content/timing checks and browser playback can be verified. Subjective listening review is not independently available.',
    'remaining': 'Other questions keep the existing Flite audio until quota is available.'
}
(root / 'listening-content.json').write_text(json.dumps(content, ensure_ascii=False, indent=2) + '\n')
module = (root / 'listening.js').read_text()
prefix, tail = module.split(' const questions=', 1)
_, suffix = tail.split(';\n questions.forEach', 1)
module = prefix + ' const questions=' + json.dumps(content['questions'], ensure_ascii=False, indent=2) + ';\n questions.forEach' + suffix
module = module.replace('U.listeningRevision=1;', 'U.listeningRevision=2;')
(root / 'listening.js').write_text(module)
drafts['status'] = 'two_complete_audio_ready_remaining_blocked_by_allowance'
drafts['note'] = '第1天两篇已生成并接入；其余8篇等待可用语音额度。第二天女声片段已保留，不能作为完整题播放。'
(production / 'natural-listening-drafts.json').write_text(json.dumps(drafts, ensure_ascii=False, indent=2) + '\n')

# Archive byte-identical original WAVs so expiring media URLs are never the only copy.
with zipfile.ZipFile(production / 'heygen-originals.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for source in sorted((production / 'originals').glob('*.wav')):
        archive.write(source, source.name)
