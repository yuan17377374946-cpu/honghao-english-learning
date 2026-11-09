'use strict';

const sketches = new Map();
const svgNamespace = 'http://www.w3.org/2000/svg';

function sketchMarkup() {
  const xTicks = [-8, -6, -4, -2, 2, 4, 6, 8].map(value => {
    const x = 240 + value * 24;
    return `<path d="M${x} 129v6"/><text stroke="none" x="${x}" y="150" text-anchor="middle">${value}</text>`;
  }).join('');
  const yTicks = [-4, -2, 2, 4].map(value => {
    const y = 132 - value * 24;
    return `<path d="M237 ${y}h6"/><text stroke="none" x="231" y="${y + 4}" text-anchor="end">${value}</text>`;
  }).join('');

  return `<section class="sketch" aria-labelledby="sketch-title">
    <div class="sketch-head">
      <h4 id="sketch-title">坐标草稿纸</h4>
      <div class="sketch-controls">
        <button type="button" data-sketch="undo">撤销一笔</button>
        <button type="button" data-sketch="clear">清空本题</button>
      </div>
    </div>
    <svg viewBox="0 0 480 264" aria-label="空白直角坐标系，可用鼠标或触屏画草图">
      <defs><pattern id="sketch-grid" x="0" y="12" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" fill="none" stroke="#dce6e6"/>
      </pattern></defs>
      <rect width="480" height="264" fill="url(#sketch-grid)"/>
      <g stroke="#496167" fill="none">
        <path d="M14 132H462m-7-4 7 4-7 4M240 253V15m-4 7 4-7 4 7"/>
        <g fill="#496167" font-size="12" font-family="system-ui" stroke-width="1">${xTicks}${yTicks}</g>
      </g>
      <g fill="#29464d" font-size="14" font-family="system-ui">
        <text x="465" y="126">x</text><text x="248" y="17">y</text><text x="227" y="149">O</text>
      </g>
      <g class="sketch-ink" fill="none" stroke="#175c94" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"></g>
    </svg>
    <p class="tiny">用鼠标或手指画。切换题目时，各题草图分开保留。</p>
  </section>`;
}

function writingMarkup() {
  return `<section class="panel sketch writing-paper" aria-labelledby="writing-title">
    <div class="sketch-head">
      <h3 id="writing-title">手写草稿纸</h3>
      <div class="sketch-controls">
        <button type="button" data-sketch="undo">撤销一笔</button>
        <button type="button" data-sketch="clear">清空手写</button>
      </div>
    </div>
    <p class="tiny">按住鼠标左键写字或算式，草稿按题保存在当前浏览器。</p>
    <svg viewBox="0 0 800 450" aria-label="空白手写区">
      <g class="sketch-ink" fill="none" stroke="#182f3c" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"></g>
    </svg>
  </section>`;
}

function mountSketch(panel, questionNumber, kind = 'sketch') {
  const svg = panel.querySelector('svg');
  const ink = svg.querySelector('.sketch-ink');
  const undo = panel.querySelector('[data-sketch="undo"]');
  const clear = panel.querySelector('[data-sketch="clear"]');
  const key = `quadratic-weekend-${kind}:${questionNumber}`;
  const { width, height } = svg.viewBox.baseVal;
  let activePointer = null;
  let activePath = null;
  let lastPoint = '';

  if (!sketches.has(key)) {
    let paths = [];
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      if (Array.isArray(saved)) paths = saved.filter(path => typeof path === 'string');
    } catch {
      // Drawing still works when the browser disables storage.
    }
    sketches.set(key, paths);
  }
  const paths = sketches.get(key);

  function addPath(data) {
    const element = document.createElementNS(svgNamespace, 'path');
    element.setAttribute('d', data);
    ink.append(element);
    return element;
  }

  function updateButtons() {
    undo.disabled = clear.disabled = paths.length === 0 || activePointer !== null;
  }

  function save() {
    try {
      if (paths.length) localStorage.setItem(key, JSON.stringify(paths));
      else localStorage.removeItem(key);
    } catch {
      // Keep the drawing for this visit if persistence is unavailable.
    }
    updateButtons();
  }

  function point(event) {
    const coordinate = svg.createSVGPoint();
    coordinate.x = event.clientX;
    coordinate.y = event.clientY;
    const local = coordinate.matrixTransform(svg.getScreenCTM().inverse());
    const x = Math.max(0, Math.min(width, Math.round(local.x)));
    const y = Math.max(0, Math.min(height, Math.round(local.y)));
    return `${x} ${y}`;
  }

  for (const path of paths) addPath(path);
  updateButtons();

  svg.addEventListener('pointerdown', event => {
    if (event.button !== 0 || activePointer !== null) return;
    event.preventDefault();
    svg.setPointerCapture(event.pointerId);
    activePointer = event.pointerId;
    lastPoint = point(event);
    activePath = addPath(`M${lastPoint}l.01 0`);
    updateButtons();
  });

  function extend(event) {
    const next = point(event);
    if (next === lastPoint) return;
    lastPoint = next;
    activePath.setAttribute('d', activePath.getAttribute('d') + `L${next}`);
  }

  svg.addEventListener('pointermove', event => {
    if (event.pointerId === activePointer) extend(event);
  });

  function finish(event) {
    if (event.pointerId !== activePointer) return;
    if (event.type === 'pointerup') extend(event);
    paths.push(activePath.getAttribute('d'));
    activePointer = null;
    activePath = null;
    save();
  }

  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    svg.addEventListener(type, finish);
  }

  undo.addEventListener('click', () => {
    paths.pop();
    ink.lastElementChild?.remove();
    save();
  });

  clear.addEventListener('click', () => {
    paths.length = 0;
    ink.replaceChildren();
    save();
  });
}
