(function(){
'use strict';
const catalog=window.QUESTION_CATALOG,week=['周一','周二','周三','周四','周五'];
const subjectName={english:'英语',math:'数学',both:'英语＋数学'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function read(key){try{const s=JSON.parse(localStorage.getItem(key)||'{}');return {state:s&&typeof s==='object'?s:{}};}catch{return {state:{},error:true};}}
function collect(subject='both',pendingOnly=false){
 const en=read('miaosang-u4-five-days-v1'),math=read('math-letter-island-v1');
 const rows=[];
 for(const q of catalog){
  if(!q.objective||subject!=='both'&&q.subject!==subject)continue;
  let wrong=false,pending=false,collected=false,reason='';
  if(q.subject==='english'){
   const r=en.state.answers?.[q.id]||{};
   wrong=!!(r.everWrong||r.firstCorrect===false||r.firstSubmission?.correct===false||r.reviewFailures>0);
   pending=!!r.needsReview;
   collected=!!(wrong||r.collected||r.revealed||r.helped&&r.done||pending||r.reviewAttempts);
   reason=wrong?'答错':r.skipped||r.firstSubmission?.skipped?'暂时跳过':r.helped||r.firstSubmission?.assisted?'借助提示':'需独立巩固';
  }else{
   const m=math.state.mistakes?.[q.id],r=math.state.records?.[q.id];
   const failed=e=>!!(e&&!e.skipped&&Array.isArray(e.results)&&e.results.some(v=>v===false));
   collected=!!m;pending=!!m?.pending;
   wrong=!!(m?.everWrong||failed(m?.first)||failed(r?.first)||failed(r?.last));
   reason=wrong?'答错':m?.first?.skipped?'暂时跳过':m?.first?.assisted?'借助提示':'需独立巩固';
  }
  if(collected&&(!pendingOnly||pending))rows.push({...q,wrong,pending,reason});
 }
 return {rows,error:subject!=='math'&&en.error||subject!=='english'&&math.error};
}
function label(subject,id){const q=catalog.find(q=>q.subject===subject&&q.id===id);return q?`${q.code} · ${week[q.day-1]}${q.slot}`:id;}
function url(q){return new URL('../'+(q.subject==='english'?'grade5-unit4-five-days/':'grade5-algebra-word-challenge/')+'?question='+encodeURIComponent(q.id),new URL('five-day-learning/',scriptRoot)).href;}
const scriptRoot=new URL('../',document.currentScript.src);
function textReport(subject='both',pendingOnly=false){
 const {rows,error}=collect(subject,pendingOnly),wrong=rows.filter(q=>q.wrong),other=rows.filter(q=>!q.wrong);
 const lines=['梦梦 · 五天小闯关 · 周日讲题清单',`导出时间：${new Date().toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',hour12:false})}（北京时间）`,`范围：${subjectName[subject]} · ${pendingOnly?'仅待复习':'全部错题历史（含已掌握）'}`,`答错 ${wrong.length} 题；跳过／辅助等待巩固 ${other.length} 题。`,''];
 if(error)lines.push('部分记录无法读取，请回到做题时使用的浏览器检查。','');
 for(const [heading,items] of [['一、答错题',wrong],['二、跳过／辅助等巩固题',other]]){
  lines.push(heading);if(!items.length){lines.push('暂无记录','');continue;}
  for(const sub of ['english','math'])for(let day=1;day<=5;day++){
   const group=items.filter(q=>q.subject===sub&&q.day===day);if(!group.length)continue;
   lines.push(`${subjectName[sub]} · ${week[day-1]}（第${day}天）：${group.map(q=>q.code).join('、')}`);
   group.forEach(q=>lines.push(`${q.code}｜${q.slot}｜${q.reason}｜${q.pending?'待复习':'已掌握'}｜原题ID：${q.id}`,q.title,url(q)));
   lines.push('');
  }
 }
 lines.push('编号与网页题目一致；点击题目链接可打开原题。','未做题不算错题；开放写作请老师另行核对。','记录来自当前浏览器，不会自动同步到其他设备。');return lines.join('\n');
}
function panel(subject='both'){
 const {rows,error}=collect(subject),wrong=rows.filter(q=>q.wrong).length;
 return `<section class="mx-panel" data-mx-subject="${subject}" aria-label="导出错题编号"><div class="mx-heading"><div><p class="mx-eyebrow">周日讲哪些题，提前收好</p><h2>一键导出错题编号</h2><p>答错 <b>${wrong}</b> 题 · 其中待复习 ${rows.filter(q=>q.wrong&&q.pending).length} 题；另有跳过／辅助等巩固题 ${rows.length-wrong} 题。</p></div></div><div class="mx-controls"><label>导出范围 <select data-mx-filter><option value="all">全部历史（含已掌握）</option><option value="pending">仅待复习</option></select></label><button type="button" class="mx-primary" data-mx="copy">一键复制错题编号</button><button type="button" data-mx="download">下载错题清单 TXT</button></div><p class="mx-note">按科目、周一至周五整理。请在梦梦做题的设备和浏览器里导出，再把清单发给老师。</p>${error?'<p class="mx-status" role="alert">部分记录无法读取，请检查浏览器的存储设置。</p>':''}<p class="mx-status" data-mx-status role="status" aria-live="polite"></p><div data-mx-fallback hidden><label>长按下方文字，全选后复制给老师<textarea readonly data-mx-text aria-label="错题编号清单"></textarea></label></div><details class="mx-details"><summary>查看题号，点开原题</summary>${rows.length?rows.map(q=>`<p><a href="${esc(url(q))}">${esc(label(q.subject,q.id))}</a><span> · ${q.reason} · ${q.pending?'待复习':'已掌握'}</span><small>${esc(q.title)}</small></p>`).join(''):'<p>当前浏览器还没有收集到错题。开始做题后会自动记录。</p>'}</details></section>`;
}
document.addEventListener('click',async e=>{
 const button=e.target.closest('[data-mx]');if(!button)return;
 const p=button.closest('[data-mx-subject]'),subject=p.dataset.mxSubject,pending=p.querySelector('[data-mx-filter]').value==='pending',text=textReport(subject,pending),status=p.querySelector('[data-mx-status]');
 if(button.dataset.mx==='copy'){
  try{if(!navigator.clipboard?.writeText)throw Error('clipboard');await navigator.clipboard.writeText(text);status.textContent='已复制，把清单粘贴发给老师就可以了。';}
  catch{const area=p.querySelector('[data-mx-text]');p.querySelector('[data-mx-fallback]').hidden=false;area.value=text;area.focus();area.select();status.textContent='浏览器暂不支持自动复制，请长按下方文字全选复制，也可以下载 TXT。';}
 }else{
  const u=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=u;a.download='梦梦-五天闯关-错题编号.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000);status.textContent='已生成错题清单；微信中无法下载时，请使用“一键复制”。';
 }
});
window.MistakeExport={collect,label,panel,textReport};
})();
