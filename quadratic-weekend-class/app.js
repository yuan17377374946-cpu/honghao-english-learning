'use strict';

const board = document.querySelector('#board');
const nav = document.querySelector('#question-nav');
const zoom = document.querySelector('#zoom');
const zoomImage = document.querySelector('#zoom-image');
const fontDown = document.querySelector('#font-down');
const fontUp = document.querySelector('#font-up');
const fullscreen = document.querySelector('#fullscreen');
const groups = ['周六 · 必做', '周日 · 指定小问', '拓展 · 选做'];
let question = 1;
let partIndex = 0;
let revealed = 0;
let sizeIndex = 1;
const sizes = [.88, 1, 1.13, 1.25];

function navMarkup() {
  return groups.map((group, index) => `<div class="nav-group">
    <h2>${group}</h2>
    <div class="nav-buttons">${lesson.slice(index*4,index*4+4).map((item,i) => {
      const n=index*4+i+1;
      return `<button type="button" data-question="${n}" aria-label="第 ${n} 题 ${item.title}" aria-current="${n===question}">${String(n).padStart(2,'0')}</button>`;
    }).join('')}</div></div>`).join('');
}

function renderQuestion() {
  const item = lesson[question-1];
  board.innerHTML = `
    <div class="question-head">
      <div class="question-title"><p>${item.source}</p><h2 id="question-title" tabindex="-1">第 ${question} 题 · ${item.title}</h2></div>
      <div class="question-actions"><button type="button" data-move="-1" ${question===1?'disabled':''}>← 上一题</button>
      <button type="button" data-move="1" ${question===lesson.length?'disabled':''}>下一题 →</button></div>
    </div>
    <div class="columns">
      <section class="panel" aria-labelledby="condition-title">
        <h3 id="condition-title">读题与条件</h3>
        <p>${item.setup}</p>
        ${item.note?`<p class="rule">${item.note}</p>`:''}
        <details class="source-images" ${question===4?'open':''}>
          <summary>原题原图 · 点击放大</summary>
          ${Array.from({length:item.images},(_,i)=>{
            const url=`assets/q${String(question).padStart(2,'0')}-${i+1}.webp`;
            return `<button type="button" class="original" data-zoom="${url}" aria-label="放大第 ${question} 题原图 ${i+1}"><img src="${url}" alt="第 ${question} 题原图，第 ${i+1} 部分"></button>`;
          }).join('')}
        </details>
        ${boardGraph(question)}
      </section>
      <section class="panel" aria-labelledby="solution-title">
        <h3 id="solution-title">分步板书</h3>
        <div class="part-tabs" role="group" aria-label="选择小问">
          ${item.parts.map((part,i)=>`<button type="button" data-part="${i}" aria-current="${i===partIndex}">${part[0]}${part[5]?' · 选做':''}</button>`).join('')}
        </div>
        <div id="part-body"></div>
      </section>
    </div>`;
  for(const button of nav.querySelectorAll('[data-question]')) {
    button.setAttribute('aria-current',String(Number(button.dataset.question)===question));
  }
  renderPart();
}

function renderPart() {
  const [title,prompt,hint,steps,answer,optional] = lesson[question-1].parts[partIndex];
  document.querySelector('#part-body').innerHTML = `
    <h4 class="part-title" id="part-title" tabindex="-1">${title} <span>${optional?'选做':'必做'}</span></h4>
    <p class="part-prompt">${prompt}</p>
    <div class="stage-actions">
      <button type="button" data-action="hint" aria-expanded="false" aria-controls="hint">显示提示</button>
      <button type="button" class="primary" data-action="step">展开第 1 步</button>
      <button type="button" data-action="reset" disabled>收起解析</button>
    </div>
    <p id="hint" class="hint" hidden>${hint}</p>
    <ol class="steps" aria-label="推导步骤">${steps.map(step=>`<li hidden>${step}</li>`).join('')}</ol>
    <p class="answer" hidden><strong>结论</strong>　${answer}</p>`;
}

function selectQuestion(next) {
  if (!Number.isInteger(next) || next<1 || next>lesson.length || next===question) return;
  question=next;
  partIndex=0;
  revealed=0;
  renderQuestion();
  const heading=document.querySelector('#question-title');
  heading.focus({preventScroll:true});
  board.scrollIntoView({block:'start'});
}

function updateSteps() {
  const rows=[...board.querySelectorAll('.steps li')];
  for(const [index,row] of rows.entries()){
    row.hidden=index>=revealed;
    row.classList.toggle('latest',index===revealed-1);
  }
  const complete=revealed===rows.length;
  board.querySelector('.answer').hidden=!complete;
  const step=board.querySelector('[data-action="step"]');
  step.textContent=complete?'已展开全部':`展开第 ${revealed+1} 步`;
  step.disabled=complete;
  board.querySelector('[data-action="reset"]').disabled=revealed===0;
}

nav.addEventListener('click',event=>{
  const button=event.target.closest('[data-question]');
  if(button) selectQuestion(Number(button.dataset.question));
});

board.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button) return;
  if(button.dataset.move) {
    selectQuestion(question+Number(button.dataset.move));
  } else if(button.dataset.part!==undefined) {
    const next=Number(button.dataset.part);
    if(next===partIndex) return;
    partIndex=next;
    revealed=0;
    for(const tab of board.querySelectorAll('[data-part]')){
      tab.setAttribute('aria-current',String(tab===button));
    }
    renderPart();
    document.querySelector('#part-title').focus({preventScroll:true});
  } else if(button.dataset.zoom) {
    zoomImage.src=button.dataset.zoom;
    zoomImage.alt=button.getAttribute('aria-label');
    zoom.showModal();
    zoom.scrollTop=0;
  } else if(button.dataset.action==='hint') {
    const hint=board.querySelector('#hint');
    hint.hidden=!hint.hidden;
    button.textContent=hint.hidden?'显示提示':'收起提示';
    button.setAttribute('aria-expanded',String(!hint.hidden));
  } else if(button.dataset.action==='step') {
    revealed+=1;
    updateSteps();
    board.querySelector('.steps .latest').scrollIntoView({block:'nearest'});
  } else if(button.dataset.action==='reset') {
    revealed=0;
    updateSteps();
    board.querySelector('[data-action="step"]').focus();
  }
});

board.addEventListener('input',event=>{
  if(event.target.id!=='horizontal-level') return;
  const t=Number(event.target.value);
  const count=t< -2||t>2.5?0:t===-2||t> -1.5?1:2;
  board.querySelector('#intersection-label').textContent=`t = ${String(t).replace('-', '−')}，${count} 个交点`;
  board.querySelector('.graph-view').innerHTML=graphMarkup(boardGraphs[5],t);
});

document.addEventListener('keydown',event=>{
  if(zoom.open||event.altKey||event.ctrlKey||event.metaKey||event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
  if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight') return;
  event.preventDefault();
  selectQuestion(question+(event.key==='ArrowLeft'?-1:1));
});

function changeSize(direction) {
  sizeIndex=Math.max(0,Math.min(sizes.length-1,sizeIndex+direction));
  document.documentElement.style.setProperty('--zoom',sizes[sizeIndex]);
  fontDown.disabled=sizeIndex===0;
  fontUp.disabled=sizeIndex===sizes.length-1;
}

fontDown.addEventListener('click',()=>changeSize(-1));
fontUp.addEventListener('click',()=>changeSize(1));
fullscreen.hidden=!document.fullscreenEnabled;
fullscreen.addEventListener('click',async()=>{
  try {
    if(document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    fullscreen.textContent='浏览器未允许全屏';
  }
});
document.addEventListener('fullscreenchange',()=>{
  fullscreen.textContent=document.fullscreenElement?'退出全屏':'全屏';
});

nav.innerHTML=navMarkup();
renderQuestion();
