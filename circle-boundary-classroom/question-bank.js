const bankMenu = document.querySelector('#bank-topics');
const bankPanel = document.querySelector('#bank-panel');
let bankIndex = 0;
let stopBankMotion = () => {};
const groups = topics.map((_,i) => questionRows
  .map((row,index) => ({row,index}))
  .filter(({row}) => row.topic === i+1));

bankMenu.innerHTML = topics.map(([title],i) =>
  `<button type="button" class="bank-topic"><span>${String(i+1).padStart(2,'0')}</span><span>${title}</span><small>${groups[i].length} 题</small></button>`
).join('');

for (const [i,button] of [...bankMenu.children].entries()) {
  button.addEventListener('click', () => renderQuestion(groups[i][0].index,true));
}

function renderQuestion(index, moveFocus = false) {
  if (index < 0 || index >= questionRows.length) return;
  stopBankMotion();
  bankIndex = index;
  const question = questionRows[index];
  const group = groups[question.topic-1];
  for (const [i,button] of [...bankMenu.children].entries()) {
    if (i+1 === question.topic) button.setAttribute('aria-current','true');
    else button.removeAttribute('aria-current');
  }
  const draw = questionDiagrams.get(question.diagram);
  const caption = question.diagram === 'inclusion-unclear' ? '原题构造待核对 · 轮廓示意' : '按题意重绘 · 可放大';
  const visual = draw ? `<figure class="diagram bank-figure">${svg(draw(question.diagram),question.title+'题图')}<button type="button" class="zoom">放大题图 ↗</button><figcaption>${caption}</figcaption></figure>` : `<figure class="diagram bank-figure">${svg(label(210,124,'点下方按钮，看图演示'),question.title+'演示图')}</figure>`;
  bankPanel.innerHTML = `
    <article class="board bank-board">
      <div class="bank-head"><span class="kicker">重难点 ${question.topic} · ${topics[question.topic-1][0]}</span><span class="bank-count">第 ${index+1} / ${questionRows.length} 题</span></div>
      <div class="bank-pills" role="group" aria-label="本题型小题">${group.map(({row,index:at})=>`<button type="button" class="choice" data-index="${at}" aria-pressed="${at===index}">第 ${row.number} 题</button>`).join('')}</div>
      <h3 id="bank-question-title" tabindex="-1">${question.title}</h3>
      <p class="bank-question">${question.prompt}</p>
      ${visual}
      ${window.circlePracticeMotion.controls}
      <div class="bank-reveals">
        <details class="reveal"><summary>看提示</summary><p>${question.hint}</p></details>
        <details class="reveal"><summary>看分步解析</summary><ol>${question.steps.map(step=>`<li>${step}</li>`).join('')}</ol></details>
      </div>
      <div class="bank-footer">
        <button class="outline" type="button" data-nav="-1" ${index===0?'disabled':''}>← 上一题</button>
        <button class="action" type="button" data-nav="1" ${index===questionRows.length-1?'disabled':''}>下一题 →</button>
      </div>
    </article>`;
  const figure = bankPanel.querySelector('.bank-figure');
  stopBankMotion = window.circlePracticeMotion.attach(bankPanel,figure,null,window.circleBankMotion.build(question,figure));
  if (moveFocus) bankPanel.querySelector('#bank-question-title').focus();
}

bankPanel.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.index) renderQuestion(Number(button.dataset.index),true);
  if (button.dataset.nav) renderQuestion(bankIndex+Number(button.dataset.nav),true);
  if (button.classList.contains('zoom')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'dialog-graph';
    const original = button.closest('figure').querySelector('svg').cloneNode(true);
    original.querySelector('.motion-overlay')?.remove();
    wrapper.append(original);
    openDialog('放大题图',wrapper);
  }
});
const requestedBankQuestion = Number(new URLSearchParams(location.search).get("q"));
renderQuestion(Number.isInteger(requestedBankQuestion) && requestedBankQuestion > 0 && requestedBankQuestion <= questionRows.length ? requestedBankQuestion - 1 : 0);
