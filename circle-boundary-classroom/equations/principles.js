const balances = [
  {
    label: '两边同减', operation: '减 0.8', left: 'x + 0.8', right: '2.3',
    before: [[['x', 'unknown'], ['0.8', 'extra']], [['2.3']]],
    after: [[['x', 'unknown']], [['1.5']]],
    applied: ['x + 0.8 − 0.8', '2.3 − 0.8'], result: 'x = 1.5',
    explanation: '左右各拿走 0.8。左盘只剩 x，右盘还剩 1.5。', tilt: -1
  },
  {
    label: '两边同加', operation: '加 0.6', left: 'x − 0.6', right: '1.8',
    before: [[['x − 0.6', 'unknown']], [['1.8']]],
    after: [[['x', 'unknown']], [['1.8'], ['0.6', 'extra']]],
    applied: ['x − 0.6 + 0.6', '1.8 + 0.6'], result: 'x = 2.4',
    explanation: '左右各放回 0.6。左边原来少了 0.6，补回以后是完整的 x，右边是 2.4。', tilt: 1
  },
  {
    label: '两边同乘', operation: '乘 2', left: 'x ÷ 2', right: '1.5',
    before: [[['x ÷ 2', 'unknown']], [['1.5']]],
    after: [[['x ÷ 2', 'unknown'], ['x ÷ 2', 'unknown']], [['1.5'], ['1.5']]],
    applied: ['(x ÷ 2) × 2', '1.5 × 2'], result: 'x = 3',
    explanation: '左右各变成原来的两份。两个半份合成一个完整的 x，两个 1.5 合起来是 3。', tilt: 1
  },
  {
    label: '两边同除', operation: '除以 3', left: '3x', right: '9',
    before: [[['x', 'unknown'], ['x', 'unknown'], ['x', 'unknown']], [['3'], ['3'], ['3']]],
    after: [[['x', 'unknown']], [['3']]],
    applied: ['3x ÷ 3', '9 ÷ 3'], result: 'x = 3',
    explanation: '左右都分成 3 个等份，各取 1 份。左边的 3 个 x 留下 1 个 x，右边的 9 留下 3。两边同除时，除数不能是 0。', tilt: -1
  }
];

const partMethods = [
  {
    label: '加法', equation: 'x + 0.8 = 2.3', whole: '和 · 2.3',
    blocks: [['x', '加数', 15, 'unknown'], ['0.8', '加数', 8, 'extra']],
    rule: '一个加数 = 和 − 另一个加数',
    why: '2.3 是两部分的合计。拿走已知的 0.8，剩下的蓝色一段就是 x。',
    answer: 'x = 2.3 − 0.8 = 1.5', example: 0,
    related: '求和时，把两个加数相加。'
  },
  {
    label: '减法', equation: '15.8 − x = 5.3', whole: '被减数 · 15.8',
    blocks: [['x', '减掉的部分', 105, 'unknown'], ['5.3', '剩下的差', 53]],
    rule: '减数 = 被减数 − 差',
    why: '15.8 是原来整条的长度，5.3 是剩下的长度。从整条去掉剩下的那段，得到原来被减掉的 x。',
    answer: 'x = 15.8 − 5.3 = 10.5', example: 4,
    related: '求被减数时，用差加减数。'
  },
  {
    label: '乘法', equation: '1.2 × x = 3.6', whole: '积 · 3.6',
    blocks: [['1 份 x', '1 个 x', 5, 'unknown'], ['0.2 份 x', '0.2 个 x', 1, 'extra']],
    rule: '一个因数 = 积 ÷ 另一个因数',
    why: '整条 3.6 里有 1.2 份 x。求 1 份 x，就用总量 3.6 除以份数 1.2。',
    answer: 'x = 3.6 ÷ 1.2 = 36 ÷ 12 = 3', example: 2,
    related: '求积时，把两个因数相乘。'
  },
  {
    label: '除法', equation: '6 ÷ x = 1.5', whole: '被除数 · 总量 6',
    blocks: Array.from({length: 4}, () => ['1.5', '每份', 1]),
    rule: '除数 = 被除数 ÷ 商',
    why: '把总量 6 分成 x 份，每份是 1.5。用 6 除以每份的 1.5，就能数出一共几份。',
    answer: 'x = 6 ÷ 1.5 = 60 ÷ 15 = 4', example: 5,
    related: '求被除数时，用除数乘商。'
  }
];

const principles = document.querySelector('#principles');
const balanceStage = document.querySelector('#balance-stage');
const partsStage = document.querySelector('#parts-stage');
let balanceIndex = 0;

function setPicker(id, items, attribute) {
  document.querySelector(id).innerHTML = items.map(({label}, index) =>
    `<button class="choice" type="button" data-${attribute}="${index}" aria-pressed="${index === 0}">${label}</button>`
  ).join('');
}

function selectButton(selected, attribute) {
  for (const item of principles.querySelectorAll(`[${attribute}]`)) {
    item.setAttribute('aria-pressed', String(item === selected));
  }
}

function drawPan(x, y, weights) {
  const palette = {
    unknown: ['#dceefc', '#1971aa'],
    extra: ['#ffeed1', '#99500f'],
    known: ['#e3f0dd', '#397052']
  };
  const width = 174 / weights.length;
  const blocks = weights.map(([value, tone = 'known'], index) => {
    const [fill, stroke] = palette[tone];
    const left = x - 87 + width * index + 2;
    return `<rect x="${left}" y="${y - 42}" width="${width - 4}" height="39" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
      <text x="${left + (width - 4) / 2}" y="${y - 15}" text-anchor="middle" fill="#152f29" font-size="23" font-weight="760">${value}</text>`;
  }).join('');
  return `<path d="M${x} ${y - 65} L${x - 94} ${y} H${x + 94} Z" fill="none" stroke="#89a599" stroke-width="2"/>
    ${blocks}<path d="M${x - 99} ${y} Q${x} ${y + 27} ${x + 99} ${y}" fill="#dceae1" stroke="#32614f" stroke-width="3"/>`;
}

function renderBalance(state) {
  const example = balances[balanceIndex];
  const both = state === 'both';
  const leftOnly = state === 'left';
  const tilt = leftOnly ? example.tilt * 19 : 0;
  const [left, right] = [state === 'start' ? example.before[0] : example.after[0], both ? example.after[1] : example.before[1]];
  const [leftTerm, rightTerm] = state === 'start' ? [example.left, example.right] :
    [example.applied[0], both ? example.applied[1] : example.right];
  const sign = leftOnly ? (example.tilt > 0 ? '＞' : '＜') : '=';
  const relation = leftOnly ? (example.tilt > 0 ? '左盘更重，天平向左倾斜' : '右盘更重，天平向右倾斜') : '天平保持平衡';
  const figure = balanceStage.querySelector('.eq-balance');
  figure.innerHTML = `
    <svg viewBox="0 0 540 220" role="img" aria-label="${relation}。左边 ${leftTerm}，右边 ${rightTerm}。">
      <path d="M270 86 L228 203 H312 Z" fill="#d2e2d6" stroke="#32614f" stroke-width="3"/>
      <path d="M211 204 H329" stroke="#32614f" stroke-width="5" stroke-linecap="round"/>
      <line x1="124" y1="${86 + tilt}" x2="416" y2="${86 - tilt}" stroke="#32614f" stroke-width="7" stroke-linecap="round"/>
      <circle cx="270" cy="86" r="7" fill="#164e40"/>
      ${drawPan(124, 151 + tilt, left)}
      ${drawPan(416, 151 - tilt, right)}
    </svg>
    <figcaption>${relation}。图上的方块用来区分各部分，重量看数字。</figcaption>`;
  balanceStage.querySelector('.eq-balance-equation').textContent = `${leftTerm} ${sign} ${rightTerm}`;
  balanceStage.querySelector('.eq-viz-result').textContent = both ? example.result : '';
  const feedback = balanceStage.querySelector('.feedback');
  feedback.dataset.tone = leftOnly ? 'retry' : 'correct';
  feedback.textContent = both ? example.explanation : leftOnly ?
    `只有左盘${example.operation}，右盘还是原来的样子，所以左右不再相等。` :
    '现在两盘一样重。选「两边都做」，再试试只动左边。';
  for (const button of balanceStage.querySelectorAll('[data-balance-action]')) {
    button.setAttribute('aria-pressed', String(button.dataset.balanceAction === state));
  }
}

function showBalance() {
  const {operation} = balances[balanceIndex];
  balanceStage.innerHTML = `
    <figure class="eq-balance"></figure>
    <p class="eq-balance-equation"></p>
    <p class="eq-viz-result"></p>
    <div class="controls eq-balance-controls" role="group" aria-label="操作天平">
      <button type="button" class="choice" data-balance-action="both">两边都${operation}</button>
      <button type="button" class="choice" data-balance-action="left">只让左边${operation}</button>
      <button type="button" class="choice" data-balance-action="start">恢复原样</button>
    </div>
    <p class="feedback" role="status"></p>`;
  renderBalance('start');
}

function showParts(index) {
  const part = partMethods[index];
  partsStage.innerHTML = `
    <p class="eq-balance-equation">${part.equation}</p>
    <figure class="eq-parts-drawing" aria-label="${part.why}">
      <div class="eq-parts-whole">${part.whole}</div>
      <div class="eq-parts-row">
        ${part.blocks.map(([value, label, weight, tone = '']) =>
          `<div class="eq-part-block ${tone}" style="flex:${weight}"><span>${value}<small>${label}</small></span></div>`
        ).join('')}
      </div>
      ${index === 3 ? '<figcaption>每小格是 1 份，x 表示一共有几份。</figcaption>' : ''}
    </figure>
    <p class="eq-parts-why">${part.why}</p>
    <ul class="eq-parts-legend"><li class="current">${part.rule}</li><li>${part.related}</li></ul>
    <p class="eq-viz-result">${part.answer}</p>
    <button type="button" class="outline" data-related-example="${part.example}">看这道例题的每一步 ↓</button>`;
}

setPicker('#balance-picker', balances, 'balance');
setPicker('#parts-picker', partMethods, 'parts');
showBalance();
showParts(0);
principles.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const {method, balance, balanceAction, parts, relatedExample} = button.dataset;
  if (method) {
    selectButton(button, 'data-method');
    document.querySelector('#method-balance').hidden = method !== 'balance';
    document.querySelector('#method-parts').hidden = method !== 'parts';
  } else if (balance !== undefined) {
    selectButton(button, 'data-balance');
    balanceIndex = Number(balance);
    showBalance();
  } else if (balanceAction) {
    renderBalance(balanceAction);
  } else if (parts !== undefined) {
    selectButton(button, 'data-parts');
    showParts(Number(parts));
  } else if (relatedExample !== undefined) {
    const example = document.querySelector(`#example-picker button[data-example="${relatedExample}"]`);
    example.click();
    example.focus();
    example.scrollIntoView({block: 'start'});
  }
});
