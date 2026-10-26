(()=>{'use strict';
const {papers,questions,sizes}=window.MATH_DATA,$=s=>document.querySelector(s),KEY='hongren-math-original-u1-u4-v1';
let lessonStep=0;
let stored={};try{stored=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{};
const state={unit:stored.unit||'1',paper:stored.paper||'u1a',id:stored.id||'q001',type:'all',status:'all',zoom:100,records:stored.records||{}};
const initialHash=decodeURIComponent(location.hash.slice(1));if(questions.some(q=>q.id===initialHash)){state.id=initialHash;state.paper=questions.find(q=>q.id===initialHash).paper;}
if(!questions.some(q=>q.id===state.id)){const replacement=questions.find(q=>q.legacyId===state.id);if(replacement)state.id=replacement.id;}
const unitInfo=[['1','01 · 第一单元','分数除法'],['2','02 · 第二单元','圆'],['3','03 · 第三单元','用字母表示数'],['4','04 · 第四单元','分数混合运算'],['z','温故知新','前四单元综合']];
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));$('#saved').textContent='已保存在此浏览器'}catch{$('#saved').textContent='当前浏览器无法保存，请另行记录'}}
const record=id=>state.records[id]||{};
const current=()=>questions.find(q=>q.id===state.id);
const paper=()=>papers.find(p=>p.id===state.paper);
const filtered=()=>questions.filter(q=>q.paper===state.paper&&(state.type==='all'||q.type===state.type)&&(state.status==='all'||(record(q.id).status||'new')===state.status));
function cropMarkup(q,label){const [x,y,w,h]=q.crop,[iw,ih]=sizes[q.pdf];return `<svg class="scan-crop" viewBox="${x} ${y} ${w} ${h}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><image x="0" y="0" width="${iw}" height="${ih}" href="assets/p${q.pdf}.webp"/></svg>`}
function progress(){let n=questions.filter(q=>record(q.id).status==='done').length;$('#progress').textContent=`已掌握 ${n} / ${questions.length}`}
function renderNav(){
 $('#units').innerHTML=unitInfo.map(([id,sub,name])=>`<button class="unit ${state.unit===id?'active':''}" data-unit="${id}" aria-pressed="${state.unit===id}"><small>${sub}</small><strong>${name}</strong></button>`).join('');
 $('#papers').innerHTML=papers.filter(p=>p.unit===state.unit).map(p=>`<button data-paper="${p.id}" class="${p.id===state.paper?'active':''}" aria-pressed="${p.id===state.paper}">${p.label}</button>`).join('');
 const types=[...new Set(questions.filter(q=>q.paper===state.paper).map(q=>q.type))];
 if(!types.includes(state.type))state.type='all';
 $('#type').innerHTML='<option value="all">全部题型</option>'+types.map(t=>`<option value="${t}">${t}题</option>`).join('');$('#type').value=state.type;$('#status').value=state.status;
 renderList();
}
function renderList(){
 const list=filtered();if(!list.some(q=>q.id===state.id))state.id=list[0]?.id||'';
 $('#groupCount').textContent=`${list.length} ${state.unit==='1'?'题':'组'}`;
 $('#list').innerHTML=list.map((q,i)=>`<button class="question-link ${q.id===state.id?'active':''}" data-id="${q.id}" aria-current="${q.id===state.id?'true':'false'}"><span class="num">${String(i+1).padStart(2,'0')}</span><span class="name"><small>原卷第${q.page}页 · ${q.type}题</small>${q.title}</span><i class="status-dot ${record(q.id).status||''}" aria-label="${record(q.id).status==='done'?'已掌握':record(q.id).status==='review'?'需复习':'未标记'}"></i></button>`).join('');
 renderQuestion();progress();save();
}
function renderQuestion(){
 const q=current(),list=filtered(),index=list.findIndex(x=>x.id===state.id);$('.question-card').hidden=!q;$('#empty').hidden=!!q;$('.bottom-nav').hidden=!q;
 $('#breadcrumb').textContent=`${state.unit==='z'?'前四单元综合':`第${state.unit}单元 · ${paper().name}`}`;
 if(!q)return;
 $('.side-title span').textContent=q.lesson?'本卷题目':'本卷题组';$('#previous').textContent=q.lesson?'← 上一题':'← 上一题组';$('#next').textContent=q.lesson?'下一题 →':'下一题组 →';$('#questionType').textContent=q.type+'题';$('#questionTitle').textContent=q.title;$('#counter').textContent=`${index+1} / ${list.length}`;
 $('#bottomCounter').textContent=`第 ${index+1} / ${list.length} ${q.lesson?'题':'题组'}`;$('#previous').disabled=index===0;$('#next').disabled=index===list.length-1;
 $('#questionImage').innerHTML=q.statement?`<div class="typed-question"><small>原卷计算题 · 单独练习</small><p>${window.lessonMath(q.statement)}</p></div>`:cropMarkup(q,`${paper().name} ${q.title} 原卷第${q.page}页`);$('#questionImage').style.width=state.zoom+'%';$('#zoomValue').textContent=state.zoom+'%';
 $('#work').value=record(q.id).work||'';$('#saved').textContent=record(q.id).work?'已保存在此浏览器':'自动保存';
 const continued=/（上）|接下一组/.test(q.title),continuing=/（续）/.test(q.title);
 $('#continuation').hidden=!(continued||continuing);$('#continuation').textContent=continued?'本题还有后续内容，点击“下一题组”继续查看。':'本题接上一题组，请结合前面的题干一起作答。';
 lessonStep=0;$('.question-card').classList.toggle('has-lesson',!!q.lesson);$('.question-card').classList.remove('lesson-open');$('#answers').hidden=true;$('#answerToggle').textContent=q.lesson?'展开本题分步解析':'展开本卷参考答案';$('#answerToggle').setAttribute('aria-expanded','false');$('#answerImages').replaceChildren();if(history.replaceState)history.replaceState(null,'','#'+q.id);updateMarks();
}
function updateMarks(){const s=record(state.id).status;$('#done').classList.toggle('is-done',s==='done');$('#review').classList.toggle('is-review',s==='review');$('#done').setAttribute('aria-pressed',s==='done');$('#review').setAttribute('aria-pressed',s==='review')}
function mark(status){const r=state.records[state.id]??={};r.status=r.status===status?'new':status;save();renderList()}
function selectPaper(id){state.paper=id;state.unit=paper().unit;state.type='all';state.status='all';state.id=questions.find(q=>q.paper===id).id;renderNav()}
function move(dir){const list=filtered(),i=list.findIndex(q=>q.id===state.id);if(!list[i+dir])return;state.id=list[i+dir].id;renderList();$('.paperbar').scrollIntoView({behavior:'smooth',block:'start'})}
function renderLesson(){
 const l=current().lesson,m=window.lessonMath,total=l.steps.length+1;
 const shown=l.steps.slice(0,lessonStep).map((s,i)=>`<section class="lesson-step"><div class="step-heading"><span>${i+1}</span><h4>${s.title}</h4></div><p>${m(s.text)}</p>${s.visual||''}</section>`).join('');
 const final=lessonStep>l.steps.length?`<section class="lesson-result"><strong>本题答案</strong><p>${m(l.answer)}</p></section><section class="lesson-trap"><strong>易错提醒</strong><p>${m(l.trap)}</p></section>`:'';
 $('#answerImages').innerHTML=`<div class="teacher-prompt"><strong>先问学生</strong><p>${m(l.prompt)}</p></div><div class="lesson-steps">${shown}${final}</div><div class="reveal-controls"><button data-reveal="prev" ${lessonStep===0?'disabled':''}>退一步</button><span role="status" aria-live="polite">${lessonStep} / ${total} 步</span><button data-reveal="next" class="primary" ${lessonStep===total?'disabled':''}>${lessonStep===l.steps.length?'显示答案':lessonStep===total?'已讲完':'下一步 →'}</button><button data-reveal="all" class="plain" ${lessonStep===total?'disabled':''}>全部展开</button></div>`;
}
function answers(open){
 const q=current();$('#answers').hidden=!open;$('.question-card').classList.toggle('lesson-open',open&&!!q.lesson);
 $('#answerToggle').textContent=q.lesson?(open?'收起本题解析':'展开本题分步解析'):(open?'收起本卷参考答案':'展开本卷参考答案');$('#answerToggle').setAttribute('aria-expanded',open);
 $('#answers h3').textContent=q.lesson?'本题思路与分步推导':'本卷参考答案与点拨';
 $('#answers .answer-heading p').textContent=q.lesson?'先提问，再逐步展示。点“下一步”继续推导，最后显示答案。':'按原卷题号查找；本区包含整份试卷的答案。';
 if(open){if(q.lesson){renderLesson();if(!document.body.classList.contains('focus-mode'))$('#answers').scrollIntoView({behavior:'smooth',block:'start'});}else{$('#answerImages').innerHTML=paper().answers.map((a,i)=>`<div class="answer-section"><small>本卷答案 · 第${i+1}段 / 共${paper().answers.length}段 · 原书第${a.pdf-3}页</small>${cropMarkup(a,'本卷官方参考答案第'+(i+1)+'段')}</div>`).join('');$('#answers').scrollIntoView({behavior:'smooth',block:'start'})}}
}
$('#answerImages').addEventListener('click',e=>{const b=e.target.closest('[data-reveal]'),l=current()?.lesson;if(!b||!l)return;const total=l.steps.length+1;lessonStep=b.dataset.reveal==='all'?total:Math.max(0,Math.min(total,lessonStep+(b.dataset.reveal==='next'?1:-1)));renderLesson();$('#answerImages [data-reveal="next"]:not(:disabled)')?.focus({preventScroll:true})});
$('#units').addEventListener('click',e=>{const b=e.target.closest('[data-unit]');if(b)selectPaper(papers.find(p=>p.unit===b.dataset.unit).id)});
$('#papers').addEventListener('click',e=>{const b=e.target.closest('[data-paper]');if(b)selectPaper(b.dataset.paper)});
$('#list').addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(!b)return;state.id=b.dataset.id;renderList();if(innerWidth<=760){$('#sidebar').classList.remove('open');$('#catalog').textContent='题目目录';$('.question-card').scrollIntoView({behavior:'smooth',block:'start'})}});
$('#type').addEventListener('change',e=>{state.type=e.target.value;renderList()});$('#status').addEventListener('change',e=>{state.status=e.target.value;renderList()});
$('#work').addEventListener('input',e=>{(state.records[state.id]??={}).work=e.target.value;save()});
$('.math-keys').innerHTML=['÷','×','π','²','（','）'].map(s=>`<button type="button">${s}</button>`).join('');$('.math-keys').addEventListener('click',e=>{if(e.target.tagName!=='BUTTON')return;const a=$('#work');a.setRangeText(e.target.textContent,a.selectionStart,a.selectionEnd,'end');a.dispatchEvent(new Event('input'));a.focus()});
$('#done').onclick=()=>mark('done');$('#review').onclick=()=>mark('review');$('#previous').onclick=()=>move(-1);$('#next').onclick=()=>move(1);$('#answerToggle').onclick=()=>answers($('#answers').hidden);$('#answerHide').onclick=()=>answers(false);
$('#resetFilter').onclick=()=>{state.type='all';state.status='all';renderNav()};
function zoom(delta){state.zoom=Math.max(70,Math.min(180,state.zoom+delta));$('#questionImage').style.width=state.zoom+'%';$('#zoomValue').textContent=state.zoom+'%'}$('#smaller').onclick=()=>zoom(-10);$('#bigger').onclick=()=>zoom(10);
$('#source').onclick=()=>{const q=current();if(!q)return;$('#sourceTitle').textContent=`${paper().name} · ${paper().label} · 原卷第${q.page}页`;$('#sourceImage').src=`assets/p${q.pdf}.webp`;$('#sourceImage').alt=`原卷第${q.page}页完整试题`;$('#sourceDialog').showModal()};$('#sourceClose').onclick=()=>$('#sourceDialog').close();
$('#catalog').onclick=()=>{const el=$('#sidebar');if(innerWidth<=760){el.classList.toggle('open');$('#catalog').textContent=el.classList.contains('open')?'收起目录':'题目目录';if(el.classList.contains('open'))el.scrollIntoView({behavior:'smooth'})}else{document.body.classList.remove('focus-mode');$('#focus').textContent='课堂专注';$('#list .active')?.scrollIntoView({behavior:'smooth',block:'center'})}};
$('#focus').onclick=()=>{document.body.classList.toggle('focus-mode');$('#focus').textContent=document.body.classList.contains('focus-mode')?'退出专注':'课堂专注'};
document.addEventListener('keydown',e=>{if(['TEXTAREA','INPUT','SELECT'].includes(e.target.tagName)||$('#sourceDialog').open)return;if(e.key==='ArrowRight'){e.preventDefault();move(1)}if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}});
if(!papers.some(p=>p.id===state.paper)){state.paper='u1a'}state.unit=paper().unit;renderNav();
})();
