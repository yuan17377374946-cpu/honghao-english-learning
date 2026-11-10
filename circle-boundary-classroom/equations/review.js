const examples = [
  {
    label: '加小数', equation: 'x + 0.8 = 2.3', cue: '左边加了 0.8，两边都减 0.8。',
    steps: [
      ['x + 0.8 − 0.8 = 2.3 − 0.8', '把「减 0.8」同时写在等号两边。'],
      ['x + (0.8 − 0.8) = 2.3 − 0.8', '先算左边这两个 0.8。'],
      ['x + 0 = 2.3 − 0.8', '0.8 − 0.8 = 0。'],
      ['x = 2.3 − 0.8', '加 0 以后，左边还是 x。'],
      ['x = 1.5', '右边算出 1.5。'],
      ['1.5 + 0.8 = 2.3', '把 1.5 代回原方程，左右相等。']
    ]
  },
  {
    label: '减小数', equation: 'x − 0.6 = 1.8', cue: '左边减了 0.6，两边都加 0.6。',
    steps: [
      ['x − 0.6 + 0.6 = 1.8 + 0.6', '把「加 0.6」同时写在等号两边。'],
      ['x = 1.8 + 0.6', '左边先减 0.6，再加 0.6，就回到原来的 x。'],
      ['x = 2.4', '右边的小数加法算出 2.4。'],
      ['2.4 − 0.6 = 1.8', '代回原方程验算。']
    ]
  },
  {
    label: '乘小数', equation: '1.2x = 3.6', cue: '1.2x 就是 x 乘 1.2，两边都除以 1.2。',
    steps: [
      ['(x × 1.2) ÷ 1.2 = 3.6 ÷ 1.2', '把「除以 1.2」同时写在两边。'],
      ['x × (1.2 ÷ 1.2) = 3.6 ÷ 1.2', '先算左边的 1.2 ÷ 1.2。'],
      ['x × 1 = 3.6 ÷ 1.2', '1.2 ÷ 1.2 = 1。'],
      ['x = 3.6 ÷ 1.2', 'x 乘 1，还是 x。'],
      ['x = (3.6 × 10) ÷ (1.2 × 10)', '算右边的除法时，被除数和除数都乘 10，商不变。'],
      ['x = 36 ÷ 12', '把小数除法改写成整数除法。'],
      ['x = 3', '36 ÷ 12 = 3。'],
      ['1.2 × 3 = 3.6', '代回原方程验算。']
    ]
  },
  {
    label: '除以小数', equation: 'x ÷ 1.2 = 3.2', cue: 'x 被 1.2 除了，两边都乘 1.2。',
    steps: [
      ['(x ÷ 1.2) × 1.2 = 3.2 × 1.2', '把「乘 1.2」同时写在两边。'],
      ['x = 3.2 × 1.2', '左边先除以 1.2，再乘 1.2，就回到原来的 x。'],
      ['x = 3.84', '32 × 12 = 384，两个因数一共两位小数，所以积是 3.84。'],
      ['3.84 ÷ 1.2 = 3.2', '代回原方程验算。']
    ]
  },
  {
    label: 'x 在减号后', equation: '15.8 − x = 5.3', cue: '先让两边都加 x，再从新的式子里把 x 单独留下。',
    steps: [
      ['15.8 − x + x = 5.3 + x', '两边同时加 x。'],
      ['15.8 = 5.3 + x', '左边减去 x 又加回 x，仍然是 15.8。'],
      ['5.3 + x = 15.8', '交换等号左右两边的位置。'],
      ['5.3 + x − 5.3 = 15.8 − 5.3', '两边同时减 5.3。'],
      ['x = 15.8 − 5.3', '左边加上 5.3 又减去 5.3，剩下 x。'],
      ['x = 10.5', '算右边的减法。'],
      ['15.8 − 10.5 = 5.3', '代回原方程验算。']
    ]
  },
  {
    label: 'x 在除号后', equation: '6 ÷ x = 1.5', cue: '这里 x 是除数，x 不能是 0。先让两边都乘 x。',
    steps: [
      ['(6 ÷ x) × x = 1.5 × x', '两边同时乘 x。'],
      ['6 = 1.5 × x', '左边先除以 x，再乘 x，回到 6。'],
      ['1.5 × x = 6', '交换等号两边的位置。'],
      ['(1.5 × x) ÷ 1.5 = 6 ÷ 1.5', '两边同时除以 1.5。'],
      ['x = 6 ÷ 1.5', '左边乘 1.5 再除以 1.5，剩下 x。'],
      ['x = (6 × 10) ÷ (1.5 × 10)', '右边的被除数和除数都乘 10。'],
      ['x = 60 ÷ 15', '算整数除法。'],
      ['x = 4', '60 ÷ 15 = 4。'],
      ['6 ÷ 4 = 1.5', '代回原方程验算。']
    ]
  },
  {
    label: '合并小数项', equation: '1.6x + x = 7.8', cue: '一个 x 就是 1x。1.6 个 x 加 1 个 x，是 2.6 个 x。',
    steps: [
      ['1.6x + 1x = 7.8', '把单独的 x 写成 1x。'],
      ['(1.6 + 1) × x = 7.8', '两项都乘同一个 x，把前面的数放在一个括号里。'],
      ['2.6 × x = 7.8', '1.6 + 1 = 2.6。'],
      ['(x × 2.6) ÷ 2.6 = 7.8 ÷ 2.6', '两边都除以 2.6。'],
      ['x × (2.6 ÷ 2.6) = 7.8 ÷ 2.6', '先看左边的 2.6 ÷ 2.6。'],
      ['x × 1 = 7.8 ÷ 2.6', '2.6 ÷ 2.6 = 1。'],
      ['x = 7.8 ÷ 2.6', 'x 乘 1，还是 x。'],
      ['x = (7.8 × 10) ÷ (2.6 × 10)', '右边的被除数和除数都乘 10。'],
      ['x = 78 ÷ 26', '算整数除法。'],
      ['x = 3', '78 ÷ 26 = 3。'],
      ['1.6 × 3 + 3 = 4.8 + 3 = 7.8', '代回原方程验算。']
    ]
  },
  {
    label: '两边都有 x', equation: '3.2x − 2 = 10 + 2.4x', cue: '先从两边都减去 2.4x，让右边的 x 项消掉。',
    steps: [
      ['3.2x − 2 − 2.4x = 10 + 2.4x − 2.4x', '两边同时减去 2.4x。'],
      ['(3.2 − 2.4) × x − 2 = 10 + 0', '左边合并带 x 的两项，右边相同的两项相减等于 0。'],
      ['0.8x − 2 = 10', '3.2 − 2.4 = 0.8。'],
      ['0.8x − 2 + 2 = 10 + 2', '两边同时加 2。'],
      ['0.8x = 12', '左边 −2 加 2 等于 0，右边 10 + 2 = 12。'],
      ['(0.8 × x) ÷ 0.8 = 12 ÷ 0.8', '两边同时除以 0.8。'],
      ['x = 12 ÷ 0.8', '左边乘 0.8 再除以 0.8，剩下 x。'],
      ['x = (12 × 10) ÷ (0.8 × 10)', '右边的被除数和除数都乘 10。'],
      ['x = 120 ÷ 8', '算整数除法。'],
      ['x = 15', '120 ÷ 8 = 15。'],
      ['3.2 × 15 − 2 = 46，10 + 2.4 × 15 = 46', '把 15 代入左右两边，两边都等于 46。']
    ]
  },
  {
    label: '回到半圆题', equation: '3.14 × x ÷ 2 + x = 51.4', cue: '这里 x 表示直径（cm）。先求直径，再求半径，最后算面积。',
    steps: [
      ['(3.14 ÷ 2) × x + x = 51.4', '先算弧长里的 3.14 ÷ 2。'],
      ['1.57x + x = 51.4', '3.14 ÷ 2 = 1.57，弧长是 1.57x。'],
      ['1.57x + 1x = 51.4', '直径 x 就是 1x。'],
      ['(1.57 + 1) × x = 51.4', '1.57 个 x 加 1 个 x，把前面的数加起来。'],
      ['2.57 × x = 51.4', '1.57 + 1 = 2.57。'],
      ['(x × 2.57) ÷ 2.57 = 51.4 ÷ 2.57', '两边都除以 2.57。'],
      ['x × (2.57 ÷ 2.57) = 51.4 ÷ 2.57', '先看左边的 2.57 ÷ 2.57。'],
      ['x × 1 = 51.4 ÷ 2.57', '2.57 ÷ 2.57 = 1。'],
      ['x = 51.4 ÷ 2.57', 'x 乘 1，还是 x。'],
      ['x = (51.4 × 100) ÷ (2.57 × 100)', '除数有两位小数，所以右边的两个数都乘 100。'],
      ['x = 5140 ÷ 257', '51.4 × 100 = 5140，2.57 × 100 = 257。'],
      ['x = 20', '257 × 20 = 5140，所以直径是 20 cm。'],
      ['3.14 × 20 ÷ 2 + 20 = 31.4 + 20 = 51.4', '代回去验算周长，正好是题目给的 51.4 cm。'],
      ['半径 = 20 ÷ 2 = 10 cm', '直径的一半是半径。'],
      ['整圆面积 = 3.14 × 10 × 10 = 3.14 × 100 = 314 cm²', '先用半径算整圆的面积。'],
      ['半圆面积 = 314 ÷ 2 = 157 cm²', '半圆的面积是整圆面积的一半。']
    ]
  }
];

const patterns = [
  ['看图列式', '左盘有 x kg 和 0.5 kg，右盘有 2.5 kg，天平平衡。', '左盘质量 = 右盘质量', 'x + 0.5 = 2.5'],
  ['用总量列式', '每本画册印刷费 5.2 元，另有费用 800 元，一共 2100 元。设印了 x 本。', '每本印刷费 × 本数 + 其他费用 = 总费用', '5.2x + 800 = 2100'],
  ['用差量列式', '两人买同一种笔，一人买 6 支，另一人买 4 支，前者多付 7 元。设每支 x 元。', '第一人付的钱 − 第二人付的钱 = 多付的钱', '6x − 4x = 7'],
  ['用剩余量列式', '一条路长 360 m，每天修 80 m，修了 x 天后还剩 40 m。', '全长 − 已修长度 = 剩余长度', '360 − 80x = 40'],
  ['用题目里的相等条件列式', '甲袋有 3x kg 米，乙袋有 x kg 米。往乙袋加入 5 kg 后两袋一样重。', '甲袋原来的质量 = 乙袋现在的质量', '3x = x + 5'],
  ['用周长公式和倍数列式', '长方形桌面周长 3.6 m，长是宽的 3 倍。设宽为 x m，长为 3x m。', '（长 + 宽）× 2 = 周长', '(3x + x) × 2 = 3.6']
];

const practice = [
  ['x + 0.33 = 0.96', 0.63, '两边都减 0.33。', ['x + 0.33 − 0.33 = 0.96 − 0.33', 'x + 0 = 0.96 − 0.33', 'x = 0.63']],
  ['x − 1.89 = 4.6', 6.49, '两边都加 1.89。', ['x − 1.89 + 1.89 = 4.6 + 1.89', 'x = 4.60 + 1.89', 'x = 6.49']],
  ['0.3x = 3.06', 10.2, '两边都除以 0.3。', ['(0.3 × x) ÷ 0.3 = 3.06 ÷ 0.3', 'x × (0.3 ÷ 0.3) = 3.06 ÷ 0.3', 'x × 1 = 3.06 ÷ 0.3', 'x = (3.06 × 10) ÷ (0.3 × 10)', 'x = 30.6 ÷ 3', 'x = 10.2']],
  ['x ÷ 7 = 0.4', 2.8, '两边都乘 7。', ['(x ÷ 7) × 7 = 0.4 × 7', '左边除以 7 再乘 7，剩下 x。', 'x = 0.4 × 7', 'x = 2.8']],
  ['1.5x + x = 10', 4, '先把单独的 x 写成 1x。', ['1.5x + 1x = 10', '(1.5 + 1) × x = 10', '2.5 × x = 10', '(2.5 × x) ÷ 2.5 = 10 ÷ 2.5', 'x × (2.5 ÷ 2.5) = 10 ÷ 2.5', 'x = (10 × 10) ÷ (2.5 × 10)', 'x = 100 ÷ 25', 'x = 4']],
  ['原有 8 kg 油漆，刷了 4 根柱子，每根用量相同，还剩 0.4 kg。设每根用 x kg，求 x。', 1.9, '用掉的油漆 + 剩下的油漆 = 原有的油漆。', ['4 根共用 4x kg。', '4x + 0.4 = 8', '4x + 0.4 − 0.4 = 8 − 0.4', '4x + 0 = 7.6', '4x = 7.6', '(4 × x) ÷ 4 = 7.6 ÷ 4', 'x × (4 ÷ 4) = 7.6 ÷ 4', 'x = 7.6 ÷ 4', 'x = 1.9，每根柱子用了 1.9 kg。']]
];

const choices = document.querySelector('#model-choices');
const feedback = document.querySelector('#model-feedback');
const modelMessages = {
  arc: '弧长只算到了蓝线。沿整个边缘走一圈，还要经过橙色的直径。',
  full: '对，沿蓝线和橙线各走一遍。两段长度的和就是 51.4 cm。',
  area: '题目给的是 51.4 cm，要先找边线长度的关系。面积的单位是 cm²。'
};
choices.addEventListener('click', (event) => {
  const selected = event.target.closest('[data-model]');
  if (!selected) return;
  for (const choice of choices.querySelectorAll('button')) {
    choice.setAttribute('aria-pressed', String(choice === selected));
  }
  feedback.dataset.tone = selected.dataset.model === 'full' ? 'correct' : 'retry';
  feedback.textContent = modelMessages[selected.dataset.model];
});

const scale = `<svg class="eq-scale" viewBox="0 0 310 116" role="img" aria-label="天平左盘放着 x 千克和 0.5 千克，右盘放着 2.5 千克，两盘平衡">
  <path d="M38 81H125 M185 81H272 M81 81V92 M229 81V92 M81 92H229 M155 92V106 M132 106H178" stroke="#164e40" stroke-width="3" fill="none"/>
  <rect x="40" y="38" width="44" height="42" rx="5" fill="#e7f2fc" stroke="#126cb7"/>
  <rect x="88" y="48" width="40" height="32" rx="5" fill="#fff0d6" stroke="#a95b15"/>
  <rect x="198" y="35" width="62" height="45" rx="5" fill="#e2efdb" stroke="#538b6d"/>
  <g fill="#152f29" font-family="system-ui,sans-serif" font-size="12" font-weight="700" text-anchor="middle">
    <text x="62" y="63">x kg</text><text x="108" y="68">0.5</text><text x="229" y="61">2.5 kg</text>
  </g>
</svg>`;

document.querySelector('#patterns').innerHTML = patterns.map(([title, question, relation, equation], index) =>
  `<details class="reveal"><summary>${title}</summary>${index === 0 ? scale : ''}<p>${question}</p><p><strong>${relation}</strong></p><p class="eq-math">${equation}</p></details>`
).join('');

const picker = document.querySelector('#example-picker');
const board = document.querySelector('#example-board');
picker.innerHTML = examples.map(({label}, index) =>
  `<button type="button" class="choice" data-example="${index}" aria-pressed="false">${label}</button>`
).join('');

function showExample(index) {
  const {equation, cue, steps} = examples[index];
  for (const button of picker.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(Number(button.dataset.example) === index));
  }
  board.innerHTML = `
    <h3>例 ${index + 1} · ${examples[index].label}</h3>
    <p class="eq-demo-head">${equation}</p>
    <p>${cue}</p>
    <div class="eq-demo-controls">
      <button type="button" class="action" data-step="next">展开下一步</button>
      <button type="button" class="outline" data-step="all">展开全部</button>
      <button type="button" class="outline" data-step="reset" disabled>重新逐步看</button>
    </div>
    <p data-step-count role="status">已展开 0 / ${steps.length} 步</p>
    <ol>${steps.map(([math, why]) => `<li hidden><strong class="eq-math">${math}</strong><p>${why}</p></li>`).join('')}</ol>`;
}

picker.addEventListener('click', (event) => {
  const selected = event.target.closest('[data-example]');
  if (selected) showExample(Number(selected.dataset.example));
});
board.addEventListener('click', (event) => {
  const action = event.target.closest('[data-step]');
  if (!action) return;
  const steps = [...board.querySelectorAll('li')];
  const firstHidden = steps.findIndex(step => step.hidden);
  const count = action.dataset.step === 'reset' ? 0 :
    action.dataset.step === 'all' ? steps.length : firstHidden + 1;
  steps.forEach((step, index) => { step.hidden = index >= count; });
  board.querySelector('[data-step-count]').textContent = `已展开 ${count} / ${steps.length} 步`;
  board.querySelector('[data-step="next"]').disabled = count === steps.length;
  board.querySelector('[data-step="all"]').disabled = count === steps.length;
  board.querySelector('[data-step="reset"]').disabled = count === 0;
  if (action.dataset.step === 'next') steps[count - 1]?.scrollIntoView({block: 'nearest'});
});
showExample(0);

const grid = document.querySelector('#practice-grid');
grid.innerHTML = practice.map(([question, , hint, steps], index) => `
  <article class="eq-practice">
    <h3>第 ${index + 1} 题</h3>
    <p id="question-${index}" class="${index < practice.length - 1 ? 'eq-math' : ''}">${question}</p>
    <form data-practice="${index}" novalidate>
      <label for="answer-${index}">x =</label>
      <input id="answer-${index}" name="answer" inputmode="decimal" autocomplete="off" aria-describedby="question-${index}">
      <button type="submit" class="action">检查答案</button>
    </form>
    <p class="feedback" role="status"></p>
    <details class="reveal"><summary>看提示</summary><p>${hint}</p></details>
    <details class="reveal"><summary>看过程</summary><ol>${steps.map(step => `<li>${step}</li>`).join('')}</ol></details>
  </article>`).join('');

grid.addEventListener('submit', (event) => {
  const form = event.target;
  event.preventDefault();
  const input = form.elements.answer.value.normalize('NFKC').trim().replace('−', '-');
  const [, answer, hint] = practice[Number(form.dataset.practice)];
  const valid = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(input);
  const correct = valid && Math.abs(Number(input) - answer) < 1e-9;
  const result = form.nextElementSibling;
  result.dataset.tone = correct ? 'correct' : 'retry';
  result.textContent = correct ? '答对了。可以把这个值代回原式验算。' :
    valid ? hint : '请输入一个数，例如 2.5。';
});
