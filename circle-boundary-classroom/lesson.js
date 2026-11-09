const route = document.querySelector('#route');
const board = document.querySelector('#board');
const lesson = document.querySelector('#lesson');
const extension = document.querySelector('#extension');
const lightbox = document.querySelector('#lightbox');
const dialogContent = document.querySelector('#dialog-content');
const projectButton = document.querySelector('#project');
const previous = document.querySelector('#prev');
const next = document.querySelector('#next');

const svg = (body, label) => `<svg viewBox="0 0 420 246" role="img" aria-label="${label}">${body}</svg>`;
const path = (d, kind = 'shape') => `<path class="${kind}" d="${d}"/>`;
const line = (x, y, endX, endY, kind = 'shape') => path(`M${x} ${y}L${endX} ${endY}`, kind);
const circle = (x, y, r, kind = 'shape') => `<circle class="${kind}" cx="${x}" cy="${y}" r="${r}"/>`;
const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#284e41"/>`;
const label = (x, y, text, kind = '') => `<text x="${x}" y="${y}" text-anchor="middle" class="${kind}">${text}</text>`;
const arc = (x, y, diameter) => `M${x} ${y}a${diameter / 2} ${diameter / 2} 0 0 1 ${diameter} 0`;
const fixed = (number) => Number(number.toFixed(4)).toString();
const section = (name, body) => `<div class="controls" role="group" aria-label="${name}">${body}</div>`;
const choice = (value, name, pressed = false) => `<button type="button" class="choice" data-value="${value}" aria-pressed="${pressed}">${name}</button>`;
const graph = (caption) => `<figure class="diagram"><div data-graph></div><button class="zoom" type="button">放大图形 ↗</button><figcaption>${caption}</figcaption></figure>`;
const feedback = (text) => `<p class="feedback" data-feedback aria-live="polite">${text}</p>`;
const reveal = (name) => `<div class="answer-controls"><button type="button" class="action" data-reveal aria-expanded="false">${name}</button></div><div class="worked" data-worked hidden></div>`;
const teacher = (text) => `<details class="teacher"><summary>教师提示</summary><p>${text}</p></details>`;
const columns = (caption, controls) => `<div class="lesson-grid">${graph(caption)}<div class="activities">${controls}</div></div>`;

function updateDiagram(markup) {
  board.querySelector('[data-graph]').innerHTML = markup;
}

function bindChoices(container, callback) {
  const buttons = [...container.querySelectorAll('button[data-value]')];
  for (const button of buttons) {
    button.addEventListener('click', () => {
      for (const item of buttons) item.setAttribute('aria-pressed', String(item === button));
      callback(button.dataset.value);
    });
  }
}

function showFeedback(message, retry = false) {
  const element = board.querySelector('[data-feedback]');
  element.textContent = message;
  element.dataset.tone = retry ? 'retry' : 'info';
}

function bindReveal(markup) {
  const button = board.querySelector('[data-reveal]');
  const result = board.querySelector('[data-worked]');
  const original = button.textContent;
  result.innerHTML = markup();
  button.addEventListener('click', () => {
    result.hidden = !result.hidden;
    button.textContent = result.hidden ? original : '收起解答';
    button.setAttribute('aria-expanded', String(!result.hidden));
  });
  return () => { result.innerHTML = markup(); };
}

function fullCircle(radius, mode) {
  const x = 210;
  const y = 117;
  const r = 16 * radius;
  return svg(
    (mode === 'area' ? circle(x, y, r, 'shade') : '') +
    circle(x, y, r, mode === 'boundary' ? 'trace' : 'shape') +
    line(x, y, x + r, y, 'measure') + dot(x, y) +
    label(x + r / 2, y - 11, `r = ${radius} cm`) +
    (mode === 'boundary' ? label(x, 226, '蓝线 · 外圈一整圈', 'blue') : '') +
    (mode === 'area' ? label(x, 226, '橙色 · 圆内整块', 'amber') : ''),
    `半径 ${radius} 厘米的圆${mode === 'area' ? '，内部涂橙色' : mode === 'boundary' ? '，边界描蓝线' : ''}`
  );
}

function warmup() {
  board.insertAdjacentHTML('beforeend', columns('同一个圆形花坛，先判断题目要求什么。',
    `<p class="prompt">沿花坛边缘装一圈围栏，要算什么？</p>
    ${section('请选择量', choice('boundary', '周长 · cm') + choice('area', '面积 · cm²'))}
    ${feedback('请先指着图，说一说要量的位置。')}
    <p class="prompt soft">如果改成给花坛里面铺满草皮呢？</p>`
  ) + teacher('请学生用手指比划，并把「沿边一圈」和「铺满里面」分别说出来。追问单位，顺便检查半径和直径能否分清。'));
  updateDiagram(fullCircle(4, 'plain'));
  bindChoices(board.querySelector('.controls'), (value) => {
    updateDiagram(fullCircle(4, value));
    const wrong = value === 'area';
    showFeedback(wrong ? '橙色这块对应铺草皮。围栏沿边缘走一圈，试着选周长。' : '围栏沿蓝线围一圈，求周长，用 cm。铺满橙色区域时，求面积，用 cm²。', wrong);
  });
}

function compareCircle() {
  board.insertAdjacentHTML('beforeend', columns('拖动半径，观察同一图形的边线与内部。', 
    `<label class="slider">半径 <input id="radius" type="range" min="2" max="6" step="1" value="4" aria-label="调整圆的半径"><output for="radius" id="radius-value">4 cm</output></label>
    ${section('图形显示', choice('boundary','描一圈',true) + choice('area','涂里面'))}
    ${feedback('周长用长度单位 cm。先用半径说出算式。')}
    ${reveal('显示算式与结果')}
    <div class="tags"><span class="tag blue">周长 C = 2πr = πd</span><span class="tag amber">面积 S = πr²</span></div>`
  ) + teacher('先用半径 4 cm 比较 25.12 cm 和 50.24 cm²。再把半径从 2 cm 拖到 4 cm，请学生观察周长变 2 倍、面积变 4 倍。'));
  const slider = board.querySelector('#radius');
  let mode = 'boundary';
  const updateWorked = bindReveal(() => {
    const r = Number(slider.value);
    return mode === 'boundary'
      ? `<strong>周长</strong><span class="formula">2 × 3.14 × ${r} = ${fixed(6.28 * r)} cm</span><p>也可以先求直径 ${r * 2} cm，再用 πd。</p>`
      : `<strong>面积</strong><span class="formula">3.14 × ${r} × ${r} = ${fixed(3.14 * r * r)} cm²</span><p>r² 就是半径乘半径。</p>`;
  });
  const update = () => {
    const r = Number(slider.value);
    board.querySelector('#radius-value').value = `${r} cm`;
    updateDiagram(fullCircle(r, mode));
    showFeedback(mode === 'boundary' ? '周长用长度单位 cm。先用半径说出算式。' : '面积用平方单位 cm²。先说说半径要乘几次。');
    updateWorked();
  };
  slider.addEventListener('input', update);
  bindChoices(board.querySelector('.controls'), (value) => { mode = value; update(); });
  update();
}

function semicircle() {
  const modes = {
    arc: ['沿弧走，从左端到右端。', '半圆弧长', '3.14 × 8 ÷ 2 = 12.56 cm', '整圆周长的一半。'],
    boundary: ['从弧的一个端点出发，还要沿直径走回起点。', '半圆周长', '12.56 + 8 = 20.56 cm', '弧长加一条直径。'],
    area: ['把半圆里面全部涂满。', '半圆面积', '3.14 × 4 × 4 ÷ 2 = 25.12 cm²', '先求整圆面积，再取一半。']
  };
  let mode = 'arc';
  board.insertAdjacentHTML('beforeend', columns('同一张半圆图，直径 8 cm，半径 4 cm。',
    `<p class="prompt">蓝线该描到哪里？橙色该涂在哪里？</p>
    ${section('切换半圆的三个量', choice('arc','半圆弧长',true) + choice('boundary','半圆周长') + choice('area','半圆面积'))}
    ${feedback(modes.arc[0])}
    ${reveal('显示算式与结果')}`
  ) + teacher('先让学生用手沿图走一圈。弧长的终点在另一端，周长的终点要回到起点。最后把 12.56 cm、20.56 cm、25.12 cm² 对照读一遍。'));
  const updateWorked = bindReveal(() => {
    const [, name, equation, note] = modes[mode];
    return `<strong>${name}</strong><span class="formula">${equation}</span><p>${note}</p>`;
  });
  const update = () => {
    const curve = arc(82, 165, 256);
    updateDiagram(svg(
      (mode === 'area' ? path(curve + 'Z', 'shade') : '') +
      path(curve, mode === 'area' ? 'shape' : 'trace') +
      line(82, 165, 338, 165, mode === 'boundary' ? 'trace' : 'shape') +
      line(210, 165, 210, 37, 'guide') +
      dot(210, 165) + label(210, 204, '直径 8 cm') + label(256, 114, 'r = 4 cm') +
      (mode === 'arc' ? label(210, 229, '蓝线只走弧', 'blue') : mode === 'boundary' ? label(210, 229, '蓝线围成一圈', 'blue') : label(210, 229, '橙色是半圆区域', 'amber')),
      `半圆，直径 8 厘米，当前显示${modes[mode][1]}`
    ));
    showFeedback(modes[mode][0]);
    updateWorked();
  };
  bindChoices(board.querySelector('.controls'), (value) => { mode = value; update(); });
  update();
}

function combination() {
  const examples = [
    {
      caption: 'M 到 N 有两条路线，三个小半圆的直径分别为 2、4、6 cm。',
      prompt: '哪条路更长？先猜，再沿线走一遍。',
      options: [['top', '只描上面的大弧'], ['bottom', '描下面的三段弧']],
      info: { top: '大弧的直径是 2 + 4 + 6 = 12 cm。', bottom: '三段小弧各算一次，连接点之间的虚线不走。' },
      answer: '<strong>两条路线一样长</strong><span class="formula">上面：3.14 × 12 ÷ 2 = 18.84 cm<br>下面：3.14 × (2 + 4 + 6) ÷ 2 = 18.84 cm</span><p>每段弧长都是直径乘 3.14 ÷ 2，所以可以先把小直径加起来。</p>'
    },
    {
      caption: '同一块月牙形区域，下面两个半圆直径分别是 2 cm 和 6 cm。',
      prompt: '先描阴影的周长，再涂阴影的面积。',
      options: [['boundary', '描阴影周长'], ['area', '涂阴影面积']],
      info: { boundary: '蓝色边界有一条大弧、两条小弧。沿三条弧回到出发点，底下虚线没有碰到阴影。', area: '橙色区域是大半圆内部去掉两个小半圆。先把三个直径换成半径。' },
      answer: {
        boundary: '<strong>阴影周长</strong><span class="formula">3.14 × (8 + 2 + 6) ÷ 2 = 25.12 cm</span><p>沿边界依次走完三条弧，把它们的长度加起来。</p>',
        area: '<strong>阴影面积</strong><span class="formula">3.14 × (4² − 1² − 3²) ÷ 2 = 9.42 cm²</span><p>大半圆面积 − 两个小半圆面积。</p>'
      }
    }
  ];
  board.insertAdjacentHTML('beforeend',
    `<div class="lesson-tabs" role="group" aria-label="组合图形例题">${choice('0', '例 1 · 两条路线', true)}${choice('1', '例 2 · 同图两问')}</div><div id="combination-example"></div>` +
    teacher('例 1 用约 3 分钟，例 2 用约 7 分钟。例 2 先遮住解答，让学生亲口说出「周长三段加，面积用大减小」，最后请他解释底部虚线为何不计入周长。')
  );
  function selectExample(index) {
    const example = examples[index];
    let mode = example.options[0][0];
    const panel = board.querySelector('#combination-example');
    panel.innerHTML = columns(example.caption,
      `<p class="prompt">${example.prompt}</p>` +
      section('图形标记', example.options.map(([value, title], i) => choice(value, title, i === 0)).join('')) +
      feedback(example.info[mode]) + reveal('显示计算过程')
    );
    const updateWorked = bindReveal(() => index === 0 ? example.answer : example.answer[mode]);
    const update = () => {
      const x = 60;
      const y = 174;
      const d = 300;
      const lengths = index === 0 ? [2, 4, 6] : [2, 6];
      const unit = d / lengths.reduce((sum, length) => sum + length, 0);
      const outer = arc(x, y, d);
      let inner = '';
      let dimensions = '';
      let start = x;
      for (const length of lengths) {
        const width = length * unit;
        inner += path(arc(start, y, width), mode === 'bottom' || mode === 'boundary' ? 'trace' : 'shape');
        dimensions += label(start + width / 2, y + 25, `${length} cm`) + dot(start, y);
        start += width;
      }
      const shading = index === 1
        ? path(`${outer}a112.5 112.5 0 0 0 -225 0a37.5 37.5 0 0 0 -75 0Z`, mode === 'area' ? 'shade' : 'neutral')
        : '';
      updateDiagram(svg(shading + line(x, y, x + d, y, 'guide') +
        path(outer, mode === 'top' || mode === 'boundary' ? 'trace' : 'shape') + inner + dimensions + dot(x + d, y) +
        (index === 0 ? label(x - 20, y + 5, 'M') + label(x + d + 21, y + 5, 'N') : ''),
        index === 0 ? '大半圆弧与三条小半圆弧连接相同的起点和终点' : '大半圆去掉两个小半圆的阴影区域'));
      showFeedback(example.info[mode]);
      updateWorked();
    };
    bindChoices(panel.querySelector('.controls'), (value) => { mode = value; update(); });
    update();
  }
  bindChoices(board.querySelector('.lesson-tabs'), (index) => selectExample(Number(index)));
  selectExample(0);
}

function application() {
  const examples = [
    {
      caption: '围墙沿半圆的直边，竹篱笆只围弧边。',
      prompt: '14.13 m 长的竹篱笆靠墙围成一个半圆形鸡棚。鸡棚的面积是多少？',
      question: '14.13 m 对应图中的哪一段？',
      result: '<strong>① 先求半径，再求面积</strong><span class="formula">r = 14.13 ÷ 3.14 = 4.5 m<br>S = 3.14 × 4.5² ÷ 2 = 31.7925 m²</span>',
      correct: 'arc',
      notes: { arc: '对。靠墙的一边由墙封住，竹篱笆只有半圆弧。用弧长 πr 反推半径。', boundary: '沿直边的是墙。再看看竹篱笆实际围到哪儿。' }
    },
    {
      caption: '礼饼的完整边缘包含弧边和直边。',
      prompt: '半个礼饼的周长是 51.4 cm。它的面积是多少？',
      question: '51.4 cm 对应图中的哪一段？',
      result: '<strong>② 先求半径，再求面积</strong><span class="formula">r = 51.4 ÷ (3.14 + 2) = 10 cm<br>S = 3.14 × 10² ÷ 2 = 157 cm²</span>',
      correct: 'boundary',
      notes: { arc: '沿弧走到另一端后，继续沿直边走回起点，才是半个礼饼的周长。', boundary: '对。51.4 cm = πr + 2r = (π + 2)r，可以用它求半径。' }
    }
  ];
  board.insertAdjacentHTML('beforeend',
    `<div class="lesson-tabs" role="group" aria-label="应用题选择">${choice('0','题 1 · 靠墙鸡棚',true)}${choice('1','题 2 · 半个礼饼')}</div><div id="application-example"></div>` +
    teacher('两题都求面积，先问「已知长度指的是哪一段」。靠墙题用约 4 分钟，礼饼题用约 5 分钟。')
  );
  function selectExample(index) {
    const example = examples[index];
    const panel = board.querySelector('#application-example');
    panel.innerHTML = columns(example.caption,
      `<p class="prompt">${example.prompt}</p><p>${example.question}</p>` +
      section('判断已知长度', choice('arc', '只算弧边') + choice('boundary', '弧边加直边')) +
      feedback('先在图上指一指。') + reveal('显示计算过程')
    );
    const draw = (mode) => {
      const curve = arc(78, 170, 264);
      updateDiagram(svg(
        path(curve + 'Z', 'neutral') + path(curve, mode ? 'trace' : 'shape') +
        line(78, 170, 342, 170, mode === 'boundary' ? 'trace' : 'shape') +
        (index === 0 ? line(60, 177, 360, 177, 'ghost') + label(210, 207, '墙') : label(210, 207, '直边 · 一条直径')) +
        label(210, 117, index === 0 ? '半圆形鸡棚' : '半个礼饼'),
        index === 0 ? '靠墙的半圆形鸡棚' : '半个礼饼的轮廓'));
    };
    draw('');
    bindReveal(() => example.result);
    bindChoices(panel.querySelector('.controls'), (value) => {
      draw(value);
      showFeedback(example.notes[value], value !== example.correct);
    });
  }
  bindChoices(board.querySelector('.lesson-tabs'), (index) => selectExample(Number(index)));
  selectExample(0);
}

const quizzes = [
  { question: '直径 10 cm 的圆，外面绕一圈的长度是多少？', unit: 'cm', value: 31.4, hint: '蓝线走完整一圈，已知直径。试试用 πd。', solution: '3.14 × 10 = 31.4 cm' },
  { question: '半径 3 cm 的半圆，沿边界完整走一圈是多少？', unit: 'cm', value: 15.42, hint: '先求半圆弧长，再加一条 6 cm 的直径。', solution: '3.14 × 3 + 6 = 15.42 cm' },
  { question: '还是这个半径 3 cm 的半圆，里面有多大？', unit: 'cm²', value: 14.13, hint: '先把半径乘半径，算整圆面积后再取一半。', solution: '3.14 × 3 × 3 ÷ 2 = 14.13 cm²' }
];

function exitQuiz() {
  board.insertAdjacentHTML('beforeend', `<div class="quiz-grid">${quizzes.map((item, i) => `
    <section class="quiz-card">
      <h3>第 ${i + 1} 题</h3><p id="question-${i}">${item.question}</p>
      <form><input id="answer-${i}" type="text" inputmode="decimal" autocomplete="off" placeholder="填数字" aria-labelledby="question-${i}"><label for="answer-${i}">${item.unit}</label><button class="action" type="submit">检查</button></form>
      <p class="feedback" aria-live="polite">先说清楚算什么，再填答案。</p>
      <details><summary>查看算式</summary><p>${item.solution}</p></details>
    </section>`).join('')}</div>
    <p class="exit-footer"><button type="button" id="quiz-reset" class="outline">清空小测</button></p>` +
    teacher('三题先独立做。第 1 题查直径与半径，第 2 题查漏加直径，第 3 题查半径平方和平方单位。请学生用自己的话总结「求周长先描边，求面积先圈区域」。'));
  const cards = [...board.querySelectorAll('.quiz-card')];
  const initial = '先说清楚算什么，再填答案。';
  for (const [i, card] of cards.entries()) {
    const form = card.querySelector('form');
    const input = card.querySelector('input');
    const result = card.querySelector('.feedback');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = input.value.trim().replaceAll('．', '.');
      const number = Number(answer);
      const valid = /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(answer);
      const correct = valid && Math.abs(number - quizzes[i].value) < 1e-8;
      result.dataset.tone = correct ? 'info' : 'retry';
      result.textContent = correct ? `答对了。${quizzes[i].solution}` : valid ? quizzes[i].hint : '请输入一个数值，例如 12.56。';
    });
  }
  board.querySelector('#quiz-reset').addEventListener('click', () => {
    for (const card of cards) {
      card.querySelector('form').reset();
      card.querySelector('details').open = false;
      const result = card.querySelector('.feedback');
      result.textContent = initial;
      delete result.dataset.tone;
    }
    cards[0].querySelector('input').focus();
  });
}

const steps = [
  ['课前诊断', '5 分钟', '围一圈，还是铺里面？', '周末练习里的圆，先把题意和图形对上。', warmup],
  ['整圆对照', '8 分钟', '同一个圆，两种算法', '先区分厘米和平方厘米，再辨认半径和直径。全课 π 取 3.14。', compareCircle],
  ['认识半圆', '8 分钟', '半圆有三个容易混的量', '先说蓝线从哪里走到哪里，再看橙色铺了多大。', semicircle],
  ['组合图形', '10 分钟', '同一块阴影，周长和面积怎么找？', '会沿边走，也要会把阴影拆成认识的图形。', combination],
  ['应用辨析', '9 分钟', '题目给的长度，究竟是哪一段？', '两题都要求面积，第一步都要用已知长度求半径。', application],
  ['下课小测', '5 分钟', '独立做这三道题', '每题先说求的是长度还是面积，再填写数字。', exitQuiz]
];

const topics = [
  ['半圆弧长', '同一条线上分段画半圆，先把直径相加，再乘 π ÷ 2。求阴影周长时，沿实际边界数清每段弧。'],
  ['半圆面积', '先从已知条件找半径。靠墙的篱笆通常只围半圆弧，半圆完整周长还包含直径。'],
  ['半径、直径、周长和面积', '半径变为原来的 k 倍，直径和周长也变为 k 倍，面积变为 k² 倍。求减少量时，用原来的面积减去新面积。'],
  ['外圆内方与外方内圆', '正方形外接圆时，正方形对角线是圆的直径。圆内接于正方形时，圆的直径等于正方形边长。'],
  ['扇环', '先看尺寸线指向内弧还是外弧。用 π(R² − r²) 算整圆环面积，再乘圆心角占整圆的比例。'],
  ['木桩拴绳', '先画直接能走的范围。能绕过墙角时，先减去已经沿墙走掉的绳长，再判断新增的扇形和是否重叠。'],
  ['整体代换', '碰到只给面积的题，可以先找 r² 或 R² − r²。原图部分小题的条件需要补齐，可先练第 1、4 题。'],
  ['捆圆柱', '沿绳子把直线段和弧线段分开数。同样大小的圆柱紧密捆扎时，外侧转弯的弧段合计为一整圈。'],
  ['割补法', '先认出完整图形，再决定要加上或减去哪一块。两图重叠后若只保留各自多出的部分，重叠面积要从面积和中减两次。'],
  ['叶子形', '若两个等半径的四分之一圆覆盖一个正方形，重叠的叶子面积等于两个扇形面积之和减正方形面积。'],
  ['角上的扇形', '同半径的扇形可以合并圆心角。以三角形三个顶点为圆心的同半径扇形，角度合计 180°。'],
  ['正方形内排圆', '每边排 n 个同样大小的圆，共 n² 个。每个圆的半径缩为原来的 1/n，所以这些圆的总面积与只排一个圆时相等。'],
  ['重叠图形', '两个图形各自多出的区域如果一样大，那么它们加上同一公共部分后，整个图形的面积也一样大。'],
  ['容斥原理', '两个区域的并集面积等于两部分面积之和减重叠面积。原图第 3 题的图形条件需核对，可先练第 1、2 题。'],
  ['圆的滚动与旋转', '先画出题目要量的对象。求圆心走过的距离时追踪圆心，求扫过的面积时标出整个圆经过的区域。']
];
let activeStep = 0;

function renderStep(index, scroll = false) {
  if (index < 0 || index >= steps.length) return;
  activeStep = index;
  const [, time, title, intro, build] = steps[index];
  for (const [i, button] of [...route.children].entries()) {
    if (i === index) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  }
  board.innerHTML = `<div class="kicker">第 ${index + 1} 环节 · ${time}</div><h2 id="step-title" tabindex="-1">${title}</h2><p class="lead">${intro}</p>`;
  build();
  previous.disabled = index === 0;
  next.disabled = index === steps.length - 1;
  document.querySelector('#progress').textContent = `第 ${index + 1} / ${steps.length} 环节 · 共 45 分钟`;
  if (scroll) {
    board.querySelector('#step-title').focus({ preventScroll: true });
    lesson.scrollIntoView({ block: 'start' });
  }
}

function openDialog(title, content) {
  document.querySelector('#dialog-title').textContent = title;
  dialogContent.replaceChildren(content);
  lightbox.scrollTop = 0;
  lightbox.showModal();
}

route.innerHTML = steps.map(([name, time], i) => `<button type="button" class="step"><span>${String(i + 1).padStart(2, '0')}</span><strong>${name}</strong><small>${time}</small></button>`).join('');
for (const [i, button] of [...route.children].entries()) button.addEventListener('click', () => renderStep(i, true));
previous.addEventListener('click', () => renderStep(activeStep - 1, true));
next.addEventListener('click', () => renderStep(activeStep + 1, true));
document.querySelector('#start').addEventListener('click', () => lesson.scrollIntoView({ block: 'start' }));

function setProjection(enabled) {
  document.body.classList.toggle('projected', enabled);
  projectButton.setAttribute('aria-pressed', String(enabled));
  projectButton.textContent = enabled ? '退出投屏' : '投屏模式';
}

projectButton.addEventListener('click', () => {
  const enabled = !document.body.classList.contains('projected');
  setProjection(enabled);
  if (enabled) window.scrollTo(0, 0);
});
document.querySelector('#topics-button').addEventListener('click', () => {
  setProjection(false);
  extension.scrollIntoView({ block: 'start' });
});

board.addEventListener('click', (event) => {
  const zoom = event.target.closest('button.zoom');
  if (!zoom) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'dialog-graph';
  wrapper.append(zoom.closest('figure').querySelector('svg').cloneNode(true));
  openDialog('放大图形', wrapper);
});
document.querySelector('#topics').innerHTML = topics.map(([title, note], i) => `
  <details><summary>${String(i + 1).padStart(2, '0')} · ${title}</summary><p>${note}</p>
  </details>`).join('');
lightbox.addEventListener('close', () => { dialogContent.replaceChildren(); });

renderStep(0);
