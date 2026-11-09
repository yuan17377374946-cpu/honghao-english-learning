'use strict';

const sketches = new Map();
const svgNamespace = 'http://www.w3.org/2000/svg';
const coordinateScales = [.25, .5, .75, 1, 1.5, 2, 3];
const defaultScaleIndex = coordinateScales.indexOf(1);
const coordinateOrigin = { x: 240, y: 132 };

function coordinateTicks(scale) {
  const { x, y } = coordinateOrigin;
  const unit = 24 * scale;
  const step = unit < 8 ? 8 : unit < 15 ? 4 : unit < 30 ? 2 : 1;
  const horizontal = [];
  const vertical = [];
  for (let value = step; value * unit <= 212; value += step) {
    for (const tick of [-value, value]) {
      const position = x + tick * unit;
      horizontal.push(`<path d="M${position} 129v6"/><text stroke="none" x="${position}" y="150" text-anchor="middle">${tick}</text>`);
    }
  }
  for (let value = step; value * unit <= 112; value += step) {
    for (const tick of [-value, value]) {
      const position = y - tick * unit;
      vertical.push(`<path d="M237 ${position}h6"/><text stroke="none" x="231" y="${position + 4}" text-anchor="end">${tick}</text>`);
    }
  }
  return horizontal.join('') + vertical.join('');
}

function sketchMarkup() {
  return `<section class="sketch" aria-labelledby="sketch-title">
    <div class="sketch-head">
      <h4 id="sketch-title">坐标草稿纸</h4>
      <div class="sketch-controls">
        <div class="sketch-zoom" role="group" aria-label="坐标缩放">
          <button type="button" data-zoom-step="-1">缩小</button>
          <output class="sketch-scale" aria-live="polite">100%</output>
          <button type="button" data-zoom-step="1">放大</button>
          <button type="button" data-zoom-step="0">复位</button>
        </div>
        <button type="button" data-sketch="undo">撤销一笔</button>
        <button type="button" data-sketch="clear">清空本题</button>
      </div>
    </div>
    <svg viewBox="0 0 480 264" aria-label="空白直角坐标系，可用鼠标或触屏画草图">
      <defs><pattern id="sketch-grid" x="240" y="132" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" fill="none" stroke="#dce6e6"/>
      </pattern></defs>
      <rect width="480" height="264" fill="url(#sketch-grid)"/>
      <g stroke="#496167" fill="none">
        <path d="M14 132H462m-7-4 7 4-7 4M240 253V15m-4 7 4-7 4 7"/>
        <g class="sketch-ticks" fill="#496167" font-size="12" font-family="system-ui" stroke-width="1">${coordinateTicks(1)}</g>
      </g>
      <g fill="#29464d" font-size="14" font-family="system-ui">
        <text x="465" y="126">x</text><text x="248" y="17">y</text><text x="227" y="149">O</text>
      </g>
      <g class="sketch-ink" fill="none" stroke="#175c94" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"></g>
    </svg>
    <p class="tiny">用鼠标或手指画。坐标不够用时点「缩小」，草图会和坐标轴一起缩放。</p>
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
  const zoomKey = `${key}:zoom`;
  const zoomButtons = [...panel.querySelectorAll('[data-zoom-step]')];
  const { width, height } = svg.viewBox.baseVal;
  let activePointer = null;
  let activePath = null;
  let lastPoint = '';
  let scaleIndex = defaultScaleIndex;
  let scale = 1;

  if (zoomButtons.length) {
    try {
      const savedScale = Number(localStorage.getItem(zoomKey) ?? 1);
      if (coordinateScales.includes(savedScale)) scaleIndex = coordinateScales.indexOf(savedScale);
    } catch {
      // Use the default scale when browser storage is unavailable.
    }
  }

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
    for (const button of zoomButtons) {
      const step = Number(button.dataset.zoomStep);
      const next = step === 0 ? defaultScaleIndex : scaleIndex + step;
      button.disabled = activePointer !== null || next === scaleIndex ||
        next < 0 || next >= coordinateScales.length;
    }
  }

  function renderScale() {
    scale = coordinateScales[scaleIndex];
    const { x, y } = coordinateOrigin;
    const grid = svg.querySelector('#sketch-grid');
    const gridSize = 24 * scale * (scale < .5 ? 2 : 1);
    grid.setAttribute('width', gridSize);
    grid.setAttribute('height', gridSize);
    grid.querySelector('path').setAttribute('d', `M${gridSize} 0H0V${gridSize}`);
    svg.querySelector('.sketch-ticks').innerHTML = coordinateTicks(scale);
    ink.setAttribute('transform', `translate(${x} ${y}) scale(${scale}) translate(${-x} ${-y})`);
    ink.setAttribute('stroke-width', 2.7 / scale);
    panel.querySelector('.sketch-scale').textContent = `${scale * 100}%`;
    updateButtons();
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
    const x = Math.max(0, Math.min(width, local.x));
    const y = Math.max(0, Math.min(height, local.y));
    const worldX = coordinateOrigin.x + (x - coordinateOrigin.x) / scale;
    const worldY = coordinateOrigin.y + (y - coordinateOrigin.y) / scale;
    return `${Math.round(worldX)} ${Math.round(worldY)}`;
  }

  for (const path of paths) addPath(path);
  updateButtons();
  if (zoomButtons.length) renderScale();

  for (const button of zoomButtons) {
    button.addEventListener('click', () => {
      const step = Number(button.dataset.zoomStep);
      scaleIndex = step === 0 ? defaultScaleIndex : scaleIndex + step;
      renderScale();
      try {
        localStorage.setItem(zoomKey, String(scale));
      } catch {
        // Zoom remains usable for the current view.
      }
    });
  }

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
