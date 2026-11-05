'use strict';
const $=id=>document.getElementById(id), storageKey='honghao-listening-information-v1';
let passages=[],index=0,answers={},checked={},voices=[],audioManifest=null;
let playToken=0,isPlaying=false,currentAudio=null,pendingCancel=null,playbackAudio=null;
const synth=window.speechSynthesis;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function persist(){try{localStorage.setItem(storageKey,JSON.stringify({index,answers,checked}));}catch{}}
function status(text){$('play-status').textContent=text;}
function loadVoices(){
 if(audioManifest)return;
 voices=synth?synth.getVoices().filter(v=>/^en[-_]/i.test(v.lang)):[];
 const select=$('voice-select'),old=select.value;
 select.innerHTML='<option value="">自动选择英语语音</option>'+voices.map(v=>`<option value="${esc(v.voiceURI)}">${esc(v.name)} · ${esc(v.lang)}</option>`).join('');
 if(voices.some(v=>v.voiceURI===old))select.value=old;
}
function voiceFor(role){
 const custom=voices.find(v=>v.voiceURI===$('voice-select').value);if(custom)return custom;
 const list=voices.filter(v=>/^en[-_]US/i.test(v.lang));
 const female=/aria|jenny|samantha|zira|susan|emma|female/i, male=/guy|david|daniel|mark|ryan|male/i;
 const preferred=(role==='Boy'||role==='Man')?male:female;
 return list.find(v=>preferred.test(v.name))||list[role==='Boy'||role==='Man'?1:0]||list[0]||voices[0]||null;
}
function controls(active){isPlaying=active;$('stop').disabled=!active;$('equalizer').classList.toggle('playing',active);$('play-twice').textContent=active?'↻ 重新播放两遍':'▶ 播放两遍';}
function stop(reset=true){
 playToken++;if(pendingCancel){const f=pendingCancel;pendingCancel=null;f();}
 if(synth)synth.cancel();if(currentAudio){currentAudio.pause();currentAudio=null;}
 controls(false);document.querySelectorAll('.reading').forEach(e=>e.classList.remove('reading'));
 if(reset)status('已停止，可重新播放');
}
const abort=()=>new DOMException('Stopped','AbortError');
function wait(ms,token){return new Promise((resolve,reject)=>{if(token!==playToken)return reject(abort());const timer=setTimeout(()=>{pendingCancel=null;resolve();},ms);pendingCancel=()=>{clearTimeout(timer);reject(abort());};});}
function speak(text,role,token){
 return new Promise((resolve,reject)=>{
  if(token!==playToken)return reject(abort());
  if(!synth||!window.SpeechSynthesisUtterance)return reject(new Error('当前浏览器不支持语音播放，请用 Chrome、Edge 或 Safari 打开本页。'));
  const u=new SpeechSynthesisUtterance(text);u.lang='en-US';const v=voiceFor(role);if(v)u.voice=v;
  u.rate=Number($('speed').value);u.pitch=1;u.volume=1;
  const timer=setTimeout(()=>{pendingCancel=null;reject(new Error('语音未正常播放。请先点“试听语音”，或在播放设置中选择一个英语语音。'));synth.cancel();},Math.max(20000,text.length*500));
  const finish=()=>{clearTimeout(timer);pendingCancel=null;};
  u.onend=()=>{finish();token===playToken?resolve():reject(abort());};
  u.onerror=e=>{finish();reject(token!==playToken?abort():new Error('播放未完成，请检查设备声音，并重新点击播放。'));};
  pendingCancel=()=>{clearTimeout(timer);reject(abort());};synth.speak(u);
 });
}
function playFile(path,token){return new Promise((resolve,reject)=>{
 if(token!==playToken)return reject(abort());
 const a=playbackAudio||(playbackAudio=new Audio());a.src=path;currentAudio=a;a.playbackRate=Number($('speed').value);a.preload='auto';
 const timer=setTimeout(()=>{a.pause();cleanup();reject(new Error('音频加载时间较长，请检查网络后重试。'));},45000);
 const cleanup=()=>{clearTimeout(timer);pendingCancel=null;if(currentAudio===a)currentAudio=null;};
 a.onended=()=>{cleanup();token===playToken?resolve():reject(abort());};
 a.onerror=()=>{cleanup();reject(new Error('音频加载失败，请检查网络后重试。'));};
 pendingCancel=()=>{a.pause();cleanup();reject(abort());};
 a.play().catch(()=>{cleanup();reject(new Error('浏览器暂未允许播放，请再点一次播放按钮。'));});
});}
async function sayLine(line,slot,token){
 const path=audioManifest?.[passages[index].id]?.[slot];
 if(path)return playFile(path,token);
 const split=line.indexOf(':');return speak(line.slice(split+1).trim(),line.slice(0,split),token);
}
async function play(repeat,questions=true){
 stop(false);$('audio-error').hidden=true;const token=playToken,d=passages[index];controls(true);
 try{
  for(let n=0;n<repeat;n++){
   status(`对话播放中 · 第${n+1} / ${repeat}遍`);
   for(let i=0;i<d.lines.length;i++){await sayLine(d.lines[i],'line'+i,token);await wait(350,token);}
   if(n<repeat-1){status('即将重听对话');await wait(1100,token);}
  }
  if(questions&&$('read-questions').checked){
   for(const q of d.qs){
    if(token!==playToken)throw abort();
    $('q-'+q.n).classList.add('reading');status(`请回答第${q.n}题`);
    const path=audioManifest?.[d.id]?.['q'+q.n];
    if(path)await playFile(path,token);else await speak(q.text,'Woman',token);
    for(let s=8;s>0;s--){status(`第${q.n}题 · 作答倒计时 ${s} 秒`);await wait(1000,token);}
    $('q-'+q.n).classList.remove('reading');
   }
  }
  if(token===playToken){status('本段播放完毕，可以核对答案或再听一遍');controls(false);}
 }catch(e){if(token!==playToken||e.name==='AbortError')return;controls(false);status('播放暂未完成');$('audio-error').textContent=e.message;$('audio-error').hidden=false;}
}
function renderProgress(){
 const all=passages.flatMap(d=>d.qs),count=all.filter(q=>Number.isInteger(answers[q.n])).length;
 $('total-progress').textContent=`已答 ${count} / ${all.length}`;$('progress-fill').style.width=`${count/all.length*100}%`;
 $('passage-nav').innerHTML=passages.map((d,i)=>`<button type="button" data-index="${i}" class="${i===index?'active ':''}${d.qs.every(q=>Number.isInteger(answers[q.n]))?'done':''}" ${i===index?'aria-current="step"':''} aria-label="第${i+1}段对话">${String(i+1).padStart(2,'0')}</button>`).join('');
}
function feedback(q){
 const selected=answers[q.n],correct=q.choices.indexOf(q.answer),ok=selected===correct;
 return `<div class="feedback"><p class="result ${ok?'':'incorrect'}">${ok?'✓ 回答正确':Number.isInteger(selected)?'再听一听这条线索':'本题尚未作答'}</p><p>正确答案：${'ABC'[correct]}. ${esc(q.answer)}</p><p>听力线索：</p><p class="quote">${esc(q.clue)}</p>${Object.entries(q.reasons).map(([choice,why])=>`<p>${'ABC'[q.choices.indexOf(choice)]}项：${esc(why)}</p>`).join('')}<p>听题提示：${esc(q.point)}</p></div>`;
}
function renderQuestions(){
 const d=passages[index];
 $('questions').innerHTML=d.qs.map(q=>`<fieldset class="question" id="q-${q.n}"><legend>${q.n}. ${esc(q.text)}</legend><div class="options">${q.choices.map((choice,i)=>`<label class="option ${answers[q.n]===i?'selected ':''}${checked[d.id]?(choice===q.answer?'correct':answers[q.n]===i?'wrong':''):''}"><input type="radio" name="q${q.n}" value="${i}" ${answers[q.n]===i?'checked':''}><span class="letter">${'ABC'[i]}</span><span>${esc(choice)}</span></label>`).join('')}</div>${checked[d.id]?feedback(q):''}</fieldset>`).join('');
 if(checked[d.id]){const n=d.qs.filter(q=>q.choices[answers[q.n]]===q.answer).length;$('check-summary').textContent=`本段答对 ${n} / 2 题`;}else $('check-summary').textContent='';
}
function render(){
 const d=passages[index];$('passage-number').textContent='DIALOGUE '+String(index+1).padStart(2,'0');$('lesson-title').textContent=`听第${index+1}段对话`;
 $('question-range').textContent=`回答第${d.qs[0].n}—${d.qs[1].n}题`;$('nav-count').textContent=`${String(index+1).padStart(2,'0')} / 26`;$('bottom-count').textContent=`${index+1} / 26`;
 $('previous').disabled=index===0;$('next').disabled=index===passages.length-1;
 $('transcript').hidden=true;$('show-transcript').textContent='显示听力原文';$('show-transcript').setAttribute('aria-expanded','false');
 $('script-lines').innerHTML=d.lines.map(line=>{const s=line.indexOf(':');return `<p class="script-line"><span class="role">${esc(line.slice(0,s))}</span> ${esc(line.slice(s+1).trim())}</p>`;}).join('');
 $('audio-error').hidden=true;status('准备好后，点击播放');renderProgress();renderQuestions();
}
function go(i){if(i<0||i>=passages.length)return;stop(false);index=i;persist();render();}
$('passage-nav').addEventListener('click',e=>{const b=e.target.closest('button[data-index]');if(b)go(Number(b.dataset.index));});
$('questions').addEventListener('change',e=>{
 if(e.target.type!=='radio')return;const n=Number(e.target.name.slice(1));answers[n]=Number(e.target.value);checked[passages[index].id]=false;persist();
 $('questions').querySelectorAll('.option').forEach(label=>{label.classList.toggle('selected',label.querySelector('input').checked);label.classList.remove('correct','wrong');});
 $('questions').querySelectorAll('.feedback').forEach(el=>el.remove());$('check-summary').textContent='';renderProgress();
});
$('questions').addEventListener('submit',e=>e.preventDefault());
$('play-twice').onclick=()=>play(2);$('play-once').onclick=()=>play(1,false);$('stop').onclick=()=>stop();
$('speed').onchange=()=>{if(currentAudio)currentAudio.playbackRate=Number($('speed').value);};
$('previous').onclick=()=>go(index-1);$('next').onclick=()=>go(index+1);
$('show-transcript').onclick=()=>{const show=$('transcript').hidden;$('transcript').hidden=!show;$('show-transcript').textContent=show?'隐藏听力原文':'显示听力原文';$('show-transcript').setAttribute('aria-expanded',String(show));};
$('check').onclick=()=>{checked[passages[index].id]=true;persist();renderQuestions();};
$('reset').onclick=()=>{if(confirm('清空52题的作答记录并回到第一段？')){stop(false);answers={};checked={};index=0;persist();render();}};
$('test-voice').onclick=async()=>{stop(false);$('audio-error').hidden=true;const token=playToken;controls(true);status('正在试听英语语音');try{const path=audioManifest?.[passages[index].id]?.line0;if(path)await playFile(path,token);else await speak('Hello! Let us listen carefully.','Woman',token);if(token===playToken){controls(false);status('试听结束，准备好后开始练习');}}catch(e){if(token!==playToken)return;controls(false);$('audio-error').textContent=e.message;$('audio-error').hidden=false;}};
window.addEventListener('pagehide',()=>stop(false));
async function init(){
 try{const r=await fetch('data.json');if(!r.ok)throw Error('题目加载失败');passages=await r.json();
  try{const s=JSON.parse(localStorage.getItem(storageKey)||'{}');answers=s.answers||{};checked=s.checked||{};index=Number.isInteger(s.index)&&s.index>=0&&s.index<passages.length?s.index:0;}catch{}
  loadVoices();if(synth)synth.addEventListener('voiceschanged',loadVoices);
  try{const r=await fetch('audio/manifest.json');if(r.ok)audioManifest=await r.json();}catch{}
  if(audioManifest){$('voice-select').innerHTML='<option>男女声对话（已配好音频）</option>';$('voice-select').disabled=true;}
  render();
 }catch(e){$('questions').innerHTML='<p>题目未加载成功，请刷新页面重试。</p>';status('加载未完成');}
}
init();
