/* New listening questions for Honghao's 2026-11-05 class. */
(() => {
'use strict';
const QUESTIONS = [
 {q:'Can your brother take a photo?',zh:'你的哥哥会拍照吗？',type:'一般疑问句',kind:'是否有能力',clue:'Can your brother…?',options:['Yes, he can.','Yes, he does.','At the park.'],answer:0,reasons:['问“他会不会”，回答用 he can，与 Can 对应。','does 对应 Do / Does 提问，不能替代这里的 can。','表示地点“在公园”，没有回答会不会。'],point:'can 提问与回答；your brother 对应 he。'},
 {q:'Do they read English after dinner?',zh:'他们晚饭后读英语吗？',type:'一般疑问句',kind:'是否做某事',clue:'Do they…?',options:['Yes, they are.','No, they do not.','At eight o’clock.'],answer:1,reasons:['are 对应 Are 提问，这里需要 do。','Do they 提问，否定回答用 No, they do not.，也可以缩写为 No, they don’t.。','表示时间“八点”，没有回答是否读英语。'],point:'Do 提问用 do / do not 回答；after dinner 是“晚饭后”。'},
 {q:'Is the young man your teacher?',zh:'那个年轻的男人是你的老师吗？',type:'一般疑问句',kind:'确认身份',clue:'Is the young man…?',options:['He is very kind.','In the classroom.','Yes, he is.'],answer:2,reasons:['“他很友善”介绍性格，没有确认是不是老师。','“在教室里”回答地点。','Is 提问，the young man 用 he 指代，因此回答 Yes, he is.。'],point:'Is…? 的回答；young 修饰 man。'},
 {q:'Are those books on the desk?',zh:'那些书在书桌上吗？',type:'一般疑问句',kind:'确认位置',clue:'Are those books…?',options:['No, they are not.','No, I do not.','By bike.'],answer:0,reasons:['books 是复数，用 they 指代；Are 提问用 are not 回答。','主语 I 与 books 不对应，do 也与 Are 不对应。','“骑自行车”回答交通方式，不能确认书是否在桌上。'],point:'Are…? 与复数 they；those books 表示“那些书”。'},
 {q:'Who is singing in that room?',zh:'谁正在那个房间里唱歌？',type:'特殊疑问句',kind:'人',clue:'Who',options:['A happy song.','My sister is.','In that room.'],answer:1,reasons:['表示一首歌，是事物，没有回答“谁”。','My sister 指出唱歌的人，is 承接题干的 is singing。','表示地点，没有回答“谁”。'],point:'who 问人；不要只听见 singing 就去找歌名。'},
 {q:'Where is my black coat?',zh:'我的黑色外套在哪里？',type:'特殊疑问句',kind:'地点',clue:'Where',options:['It is my coat.','It is black.','Under the chair.'],answer:2,reasons:['说明外套属于谁，没有说明位置。','说明颜色，没有说明位置。','“在椅子下面”给出了地点，对应 Where。'],point:'where 问地点；black 修饰 coat，颜色已经给出。'},
 {q:'When does the English class start?',zh:'英语课什么时候开始？',type:'特殊疑问句',kind:'开始的时间',clue:'When / start',options:['At half past seven.','For thirty minutes.','By bike.'],answer:0,reasons:['“七点半”是具体开始时间，对应 When。','“三十分钟”表示持续多久，不是开始时刻。','“骑自行车”表示交通方式。'],point:'when 问时间；区分“几点开始”和“持续多久”。'},
 {q:'What does the boy want to buy?',zh:'那个男孩想买什么？',type:'特殊疑问句',kind:'物品',clue:'What / buy',options:['In a small shop.','A new phone.','On the table.'],answer:1,reasons:['“在一家小商店”表示购买地点，没有说明买什么。','“一部新手机”是要买的物品，对应 What。','“在桌子上”表示物品位置。'],point:'what 问事物；want to buy 表示“想买”。'},
 {q:'Why do you like taking photos?',zh:'你为什么喜欢拍照？',type:'特殊疑问句',kind:'原因',clue:'Why',options:['In a beautiful park.','On Thursday.','Because it is fun.'],answer:2,reasons:['“在一个美丽的公园”表示地点。','“在星期四”表示时间。','Because 后说明原因：“因为这很有趣”。'],point:'why 问原因，because 引出原因；taking photos 是拍照。'},
 {q:'How does your sister go to school?',zh:'你的姐姐怎样去上学？',type:'特殊疑问句',kind:'交通方式',clue:'How / go to school',options:['By bike.','At half past seven.','She is in her room.'],answer:0,reasons:['“骑自行车”说明怎样去上学。','表示出发或到达的时刻，没有说明交通方式。','表示她在哪里，没有说明怎样去学校。'],point:'How…go to school? 问交通方式；by bike 是骑自行车。'},
 {q:'How many photos are on your phone?',zh:'你的手机里有多少张照片？',type:'特殊疑问句',kind:'数量',clue:'How many photos',options:['Ten yuan.','There are twelve.','Every Friday.'],answer:1,reasons:['“十元”是价钱，不是照片数量。','“有十二张”给出照片的数量。','“每周五”表示频率，不是数量。'],point:'how many + 可数名词复数；不要与 how much 问价钱混淆。'},
 {q:'How often do you read with your brother?',zh:'你多久和哥哥一起读一次书？',type:'特殊疑问句',kind:'频率',clue:'How often',options:['For half an hour.','Next Sunday.','Every Sunday.'],answer:2,reasons:['“半小时”表示每次读多久，对应 how long。','“下周日”表示下一次的具体时间，没有说明多久一次。','“每周日”表示重复发生的频率，对应 How often。'],point:'how often 问频率；every Sunday 与 next Sunday 意思不同。'}
];
const KEY='honghao-listening-20261105-new-v1';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{}
let index=Number.isInteger(saved.index)&&saved.index>=0&&saved.index<12?saved.index:0;
const records=saved.records&&typeof saved.records==='object'&&!Array.isArray(saved.records)?saved.records:{};
let showText=false;
const audio=$('#listening-audio');
function record(){const r=records[index];return r&&typeof r==='object'?r:{}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify({index,records}))}catch{$('#listen-audio-status').textContent='当前浏览器无法保存，请使用页面顶部导出课堂记录。'}}
function stop(){audio.pause();audio.removeAttribute('src');audio.load();$('#listen-audio-status').textContent='';}
function play(slow){stop();$('#word-audio').pause();if('speechSynthesis'in window)speechSynthesis.cancel();audio.src='audio/listen-'+String(index+1).padStart(2,'0')+'.mp3';audio.playbackRate=slow?.75:1;$('#listen-audio-status').textContent='正在加载录音…';audio.play().catch(()=>{$('#listen-audio-status').textContent='播放未成功，请再次点击播放。'});}
audio.onplaying=()=>{$('#listen-audio-status').textContent=audio.playbackRate<1?'正在慢速播放…':'正在播放…'};
audio.onended=()=>{$('#listen-audio-status').textContent='播放结束，可以再听一遍。'};
audio.onerror=()=>{$('#listen-audio-status').textContent='录音加载失败，请刷新页面后重试；老师也可以展开题干朗读。'};
function render(){
 const q=QUESTIONS[index],r=record(),checked=!!r.checked;
 $('#listen-number').textContent=`第 ${index+1} / 12 题`;
 $('#listen-text').hidden=!showText;$('#listen-text').innerHTML=`<p class="en" lang="en">${esc(q.q)}</p>`;
 $('#listen-show-text').textContent=showText?'收起题干':'显示题干';$('#listen-show-text').setAttribute('aria-expanded',String(showText));
 $('#listen-options').innerHTML=q.options.map((o,i)=>`<button class="listen-option ${r.choice===i?'listen-selected':''} ${checked&&i===q.answer?'listen-correct':''} ${checked&&r.choice===i&&i!==q.answer?'listen-wrong':''}" data-listen-choice="${i}" aria-pressed="${r.choice===i}" ${checked?'disabled':''}><span class="tag">${'ABC'[i]}</span><span class="en" lang="en">${esc(o)}</span>${checked&&i===q.answer?'<span class="good">✓</span>':''}</button>`).join('');
 $('#listen-check').disabled=checked;$('#listen-retry').hidden=!checked;
 $('#listen-feedback').hidden=!checked;
 $('#listen-feedback').innerHTML=checked?`<strong>${r.choice===q.answer?'✓ 选对了':'这题需要再听一遍'}</strong><p>正确答案：${'ABC'[q.answer]} · <span class="en">${esc(q.options[q.answer])}</span></p><p>关键线索：<b>${esc(q.clue)}</b>，问的是<strong>${esc(q.kind)}</strong>。</p><p>${esc(q.reasons[q.answer])}</p>`:'';
 $('#listen-teacher').open=false;
 $('#listen-analysis').innerHTML=`<p class="en" lang="en">${esc(q.q)}</p><p>${esc(q.zh)}</p><p><strong>问句类型：</strong>${q.type} · 问${q.kind}</p><p><strong>正确答案：</strong>${'ABC'[q.answer]} · ${esc(q.options[q.answer])}</p><p><strong>听题线索：</strong>${esc(q.clue)}</p>${q.options.map((o,i)=>`<p><b>${'ABC'[i]} · ${esc(o)}</b><br>${esc(q.reasons[i])}</p>`).join('')}<div class="tip"><strong>对应知识点：</strong>${esc(q.point)}</div>`;
 $('#listen-prev').disabled=index===0;$('#listen-next').disabled=index===11;
 $('#listen-jump').innerHTML=QUESTIONS.map((_,i)=>`<button class="small ${i===index?'primary':''}" data-listen-jump="${i}" ${i===index?'aria-current="step"':''}>${i+1}${records[i]?.checked?(records[i].choice===QUESTIONS[i].answer?' ✓':' ·'):''}</button>`).join('');
 const completed=QUESTIONS.filter((_,i)=>records[i]?.checked).length,correct=QUESTIONS.filter((q,i)=>records[i]?.checked&&records[i].choice===q.answer).length;
 $('#listen-progress').textContent=`已完成 ${completed} / 12 题 · 正确 ${correct} 题`;
}
function jump(i){stop();index=i;showText=false;persist();render()}
$('#listen-play').onclick=()=>play(false);$('#listen-slow').onclick=()=>play(true);
$('#listen-show-text').onclick=()=>{showText=!showText;render()};
$('#listen-check').onclick=()=>{const r=record();if(!Number.isInteger(r.choice)){ $('#listen-audio-status').textContent='先选一个回答，再核对。';return }records[index]={...r,checked:true,firstChoice:r.firstChoice??r.choice,attempts:(r.attempts||0)+1,updated:new Date().toISOString()};persist();render()};
$('#listen-retry').onclick=()=>{const r=record();records[index]={...r,choice:null,checked:false};showText=false;stop();persist();render()};
$('#listen-prev').onclick=()=>jump(Math.max(0,index-1));$('#listen-next').onclick=()=>jump(Math.min(11,index+1));
$('#listening').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.listenChoice!==undefined){records[index]={...record(),choice:Number(b.dataset.listenChoice)};persist();render()}if(b.dataset.listenJump!==undefined)jump(Number(b.dataset.listenJump))});
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',stop));$('#stop-audio').addEventListener('click',stop);
window.addEventListener('pagehide',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
window.hhListeningExport=()=>QUESTIONS.map((q,i)=>({number:i+1,question:q.q,translation:q.zh,answer:'ABC'[q.answer],response:records[i]?.choice==null?'':'ABC'[records[i].choice],checked:!!records[i]?.checked,firstResponse:records[i]?.firstChoice==null?'':'ABC'[records[i].firstChoice],attempts:records[i]?.attempts||0}));
render();
})();
