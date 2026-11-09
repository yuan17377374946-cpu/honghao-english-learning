"use strict";

const $ = (id) => document.getElementById(id);
const { catalog, parsePalette, sizeFor, convert, countsFor } = BeadEngine;
const art = $("art");
const viewport = $("viewport");
const viewButtons = [...document.querySelectorAll("[data-mode]")];
const toolButtons = [...document.querySelectorAll("[data-tool]")];
const chartGutter = 1.4;
const historyLimit = 35;
const state = {
  source:null, name:"番茄示例", isSample:true, catalog, custom:false, pattern:null,
  mode:"bead", tool:null, selected:-1, zoom:1, undo:[], redo:[], stroke:null, importId:0
};
const sample = makeSample();
const textureCache = new Map();
let toastTimer;
let pendingFrame = 0;
let chartPrintId = 0;

function makeSample() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 32;
  const ctx = canvas.getContext("2d");
  const fill = (hex, x, y, w = 1, h = 1) => {
    ctx.fillStyle = hex;
    ctx.fillRect(x, y, w, h);
  };
  const tomato = [[11,21],[8,24],[6,26],[5,27],[4,28],[3,29],[3,29],[2,30],[2,30],[2,30],[2,30],[2,30],[3,29],[3,29],[4,28],[5,27],[6,26],[8,24],[11,21]];
  tomato.forEach(([left,right], i) => {
    const y = 10 + i;
    fill("#A83142", left, y, right - left + 1);
    if (i > 0 && i < tomato.length - 1) {
      fill("#DA4149", left + 1, y, right - left - 1);
      if (i < tomato.length - 4) {
        const inset = i < 3 ? 1 : 0;
        fill("#ED5A58", left + 2 + inset, y, right - left - 4 - inset);
      }
    }
  });

  [[8,13,5],[7,14,3],[6,15,3],[6,16,2],[6,17,2],[7,18,1]].forEach(([x,y,w]) => fill("#F87B70",x,y,w));
  [[9,14,2],[8,15,2],[7,16,1]].forEach(([x,y,w]) => fill("#FFA095",x,y,w));
  const leaves = [
    [5,19,20],[6,18,20],[7,17,19],[8,16,18],
    [9,9,12],[9,16,18],[9,22,25],
    [10,8,14],[10,15,19],[10,21,26],
    [11,9,26],[12,10,25],[13,10,23],[14,10,14],[14,16,20],[14,22,23],
    [15,10,12],[15,17,20],[16,17,19],[17,18,19]
  ];
  leaves.forEach(([y,left,right]) => fill("#3E7754",left,y,right - left + 1));
  [[19,6,1],[18,7,1],[17,8,1],[16,9,2],[10,10,3],[11,11,4],[16,11,8],[13,12,9],[16,13,4],[17,14,2]].forEach(([x,y,w]) => fill("#609D59",x,y,w));
  [[19,5,1],[10,10,2],[17,11,4],[15,12,2],[22,11,2]].forEach(([x,y,w]) => fill("#86BB65",x,y,w));
  return canvas;
}

function say(message) {
  clearTimeout(toastTimer);
  $("toast").textContent = message;
  $("toast").hidden = false;
  toastTimer = setTimeout(() => { $("toast").hidden = true; }, 3200);
}

function dimensions() {
  return sizeFor(state.source.naturalWidth || state.source.width, state.source.naturalHeight || state.source.height, $("widthInput").value);
}

function updateSettings(pending = false) {
  const [width, height] = dimensions();
  const requested = Number($("widthInput").value);
  $("dimensionHint").textContent = width < requested && height === 120
    ? "按比例缩为 " + width + " × " + height + " 格"
    : "纵向 " + height + " 格，按原图比例计算";
  $("colorLimit").textContent = $("maxColors").value + " 色";
  if (pending) $("settingsNote").textContent = "点击「生成图纸」应用新设置。";
}

function confirmRegenerate() {
  return !state.undo.length || window.confirm("重新生成会替换手动修改。继续吗？");
}

function regenerate({ notify = false, ask = false } = {}) {
  if (ask && !confirmRegenerate()) return false;
  const [width, height] = dimensions();
  const buffer = document.createElement("canvas");
  buffer.width = width;
  buffer.height = height;
  const ctx = buffer.getContext("2d", {willReadFrequently:true});
  ctx.imageSmoothingEnabled = !state.isSample || width < 32 || height < 32;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(state.source, 0, 0, width, height);
  state.pattern = convert(ctx.getImageData(0, 0, width, height).data, width, height, state.catalog, Number($("maxColors").value), {
    removeBg:$("removeBg").checked,
    dither:$("dither").checked
  });
  state.undo = [];
  state.redo = [];
  state.stroke = null;
  state.selected = -1;
  state.tool = null;
  state.zoom = 1;
  if (state.mode === "source") state.mode = "bead";
  $("dimensions").textContent = width + " × " + height + " 格";
  $("fileName").textContent = state.name;
  $("fileName").title = state.name;
  $("resetSample").hidden = state.isSample;
  $("paletteName").textContent = state.custom ? "自定义色板" : "通用色板";
  $("paletteNotice").textContent = state.custom
    ? "使用你导入的色号。颜色以实物色卡为准。"
    : "P 色号为工作台编号。使用自己的品牌色表可按实际色号配豆。";
  $("settingsNote").textContent = "上传图片后会自动生成初稿。";
  viewport.scrollTo(0, 0);
  updateSettings();
  updateTools();
  renderPalette();
  render();
  if (!state.pattern.palette.length) say("当前图纸为空，可关闭去背景后重新生成。");
  else if (notify) say("已生成 " + width + " × " + height + " 格图纸");
  return true;
}

function useSample() {
  state.importId++;
  state.source = sample;
  state.name = "番茄示例";
  state.isSample = true;
  $("widthInput").value = 32;
  $("maxColors").value = Math.min(12, state.catalog.length);
  $("removeBg").checked = false;
  $("dither").checked = false;
  regenerate();
}

async function loadImage(file) {
  if (!file) return;
  if (!/\.(png|jpe?g|webp|gif|bmp)$/i.test(file.name) && !/^image\/(png|jpeg|webp|gif|bmp|x-ms-bmp)$/i.test(file.type)) {
    say("请选择 PNG、JPG、WebP、GIF 或 BMP 图片。");
    return;
  }
  if (file.size > 30 * 1024 * 1024) {
    say("请选择小于 30 MB 的图片。");
    return;
  }
  if (!confirmRegenerate()) return;
  const id = ++state.importId;
  const url = URL.createObjectURL(file);
  const img = new Image();
  try {
    img.src = url;
    await img.decode();
    if (id !== state.importId) return;
    if (img.naturalWidth * img.naturalHeight > 48_000_000) {
      say("图片像素过多，请缩小到 4800 万像素以下再试。");
      return;
    }
    state.source = img;
    state.name = file.name.replace(/\.[^.]+$/, "") || "拼豆图案";
    state.isSample = false;
    regenerate({notify:true});
  } catch {
    if (id === state.importId) say("这张图片无法读取。可以另存为 PNG 或 JPG 再试。");
  } finally {
    URL.revokeObjectURL(url);
  }
}

function paintBead(ctx, color, x, y, unit) {
  const resolution = Math.max(10, Math.ceil(unit));
  const key = color.hex + "/" + resolution;
  let texture = textureCache.get(key);
  if (!texture) {
    if (textureCache.size >= 400) textureCache.clear();
    texture = document.createElement("canvas");
    texture.width = texture.height = resolution;
    const pen = texture.getContext("2d");
    pen.scale(resolution, resolution);
    const gradient = pen.createLinearGradient(0, 0, 0, 1);
    gradient.addColorStop(0, mix(color.rgb, 255, .33));
    gradient.addColorStop(.42, color.hex);
    gradient.addColorStop(1, mix(color.rgb, 0, .22));
    pen.fillStyle = gradient;
    pen.beginPath();
    pen.arc(.5, .5, .465, 0, Math.PI * 2);
    pen.fill();
    pen.strokeStyle = "#26324d36";
    pen.lineWidth = .047;
    pen.stroke();
    pen.fillStyle = mix(color.rgb, 0, .35);
    pen.beginPath();
    pen.arc(.5, .51, .177, 0, Math.PI * 2);
    pen.fill();
    pen.fillStyle = "#f8f9fc";
    pen.beginPath();
    pen.arc(.5, .55, .112, 0, Math.PI * 2);
    pen.fill();
    textureCache.set(key, texture);
  }
  ctx.drawImage(texture, x, y, unit, unit);
}

function mix(rgb, target, amount) {
  return "rgb(" + rgb.map((value) => Math.round(value + (target - value) * amount)).join(",") + ")";
}

function chart(ctx, pattern, step, region = [0,0,pattern.width,pattern.height]) {
  const [left, top, width, height] = region;
  const gutter = chartGutter * step;
  const fontSize = Math.max(2, step * .38);
  const right = gutter + width * step;
  const bottom = gutter + height * step;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, right + 1, bottom + 1);
  ctx.fillStyle = "#eef2fa";
  ctx.fillRect(gutter, 0, width * step, gutter);
  ctx.fillRect(0, gutter, gutter, height * step);
  ctx.fillStyle = "#f8faff";
  ctx.fillRect(gutter, gutter, width * step, height * step);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "650 " + fontSize + "px ui-monospace, monospace";

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = pattern.cells[(y + top) * pattern.width + x + left];
      if (index < 0) continue;
      const entry = pattern.palette[index];
      const sx = gutter + x * step;
      const sy = gutter + y * step;
      ctx.fillStyle = entry.hex;
      ctx.fillRect(sx, sy, step, step);
      if (step >= 8) {
        const [r,g,b] = entry.rgb;
        ctx.fillStyle = r * .299 + g * .587 + b * .114 < 126 ? "#fff" : "#171d33";
        ctx.fillText(entry.code, sx + step / 2, sy + step / 2 + step * .025, step * .86);
      }
    }
  }
  for (let major = 0; major <= 1; major++) {
    ctx.lineWidth = major ? Math.max(.7,step * .055) : Math.max(.25,step * .021);
    ctx.strokeStyle = major ? "#536589bd" : "#5a678646";
    ctx.beginPath();
    for (let x = 0; x <= width; x++) {
      const bold = !x || x === width || (x + left) % 5 === 0;
      if (Number(bold) !== major) continue;
      const sx = gutter + x * step;
      ctx.moveTo(sx, gutter);
      ctx.lineTo(sx, bottom);
    }
    for (let y = 0; y <= height; y++) {
      const bold = !y || y === height || (y + top) % 5 === 0;
      if (Number(bold) !== major) continue;
      const sy = gutter + y * step;
      ctx.moveTo(gutter, sy);
      ctx.lineTo(right, sy);
    }
    ctx.stroke();
  }

  ctx.fillStyle = "#31466f";
  for (let x = 0; x < width; x++) {
    const n = x + left + 1;
    if (step >= 19 || x === 0 || x === width - 1 || n % 5 === 0) ctx.fillText(n, gutter + (x + .5) * step, gutter / 2, step * .92);
  }
  for (let y = 0; y < height; y++) {
    const n = y + top + 1;
    if (step >= 19 || y === 0 || y === height - 1 || n % 5 === 0) ctx.fillText(n, gutter / 2, gutter + (y + .5) * step, gutter * .88);
  }
}

function render() {
  const {pattern, mode, zoom, source} = state;
  if (!pattern) return;
  const padding = viewport.clientWidth <= 616 ? 48 : 65;
  const availableWidth = Math.max(90, viewport.clientWidth - padding);
  const availableHeight = Math.max(90, viewport.clientHeight - padding);
  const sourceWidth = source.naturalWidth || source.width;
  const sourceHeight = source.naturalHeight || source.height;
  const w = mode === "source" ? sourceWidth : pattern.width + (mode === "chart" ? chartGutter : 0);
  const h = mode === "source" ? sourceHeight : pattern.height + (mode === "chart" ? chartGutter : 0);
  const fit = Math.min(availableWidth / w, availableHeight / h);
  const cssWidth = Math.max(1, Math.floor(w * fit * zoom));
  const cssHeight = Math.max(1, Math.floor(h * fit * zoom));
  const dpr = Math.min(window.devicePixelRatio || 1, 2, 3500 / Math.max(cssWidth, cssHeight));
  art.width = Math.max(1, Math.round(cssWidth * dpr));
  art.height = Math.max(1, Math.round(cssHeight * dpr));
  art.style.width = cssWidth + "px";
  art.style.height = cssHeight + "px";
  const ctx = art.getContext("2d");
  ctx.scale(art.width / w, art.height / h);

  if (mode === "source") {
    ctx.imageSmoothingEnabled = !state.isSample;
    ctx.drawImage(source, 0, 0, w, h);
  } else if (mode === "chart") {
    // Draw in device pixels for crisp text and grid lines.
    ctx.setTransform(1,0,0,1,0,0);
    const step = Math.min(art.width / w, art.height / h);
    chart(ctx, pattern, step);
  } else {
    ctx.setTransform(1,0,0,1,0,0);
    const unitX = art.width / w;
    const unitY = art.height / h;
    ctx.fillStyle = "#fbfcff";
    ctx.fillRect(0,0,art.width,art.height);
    ctx.fillStyle = "#dce3f1";
    for (let i = 0; i < pattern.cells.length; i++) {
      const x = i % pattern.width * unitX;
      const y = Math.floor(i / pattern.width) * unitY;
      const index = pattern.cells[i];
      if (index >= 0) {
        paintBead(ctx, pattern.palette[index], x, y, Math.min(unitX, unitY));
      } else {
        const dot = Math.max(.65, Math.min(1.2, unitX * .09));
        ctx.fillRect(x + unitX / 2 - dot / 2, y + unitY / 2 - dot / 2, dot, dot);
      }
    }
  }
  art.setAttribute("aria-label", state.name + "，" + (mode === "source" ? "原图" : pattern.width + " × " + pattern.height + " 格" + (mode === "chart" ? "色号图" : "拼豆预览")));
  $("zoomText").textContent = Math.round(zoom * 100) + "%";
  $("zoomOut").disabled = zoom <= .5;
  $("zoomIn").disabled = zoom >= 5;
}

function renderSoon() {
  if (pendingFrame) return;
  pendingFrame = requestAnimationFrame(() => {
    pendingFrame = 0;
    render();
  });
}

function renderPalette() {
  const { pattern } = state;
  const counts = countsFor(pattern);
  $("totalBeads").textContent = counts.reduce((total,n) => total + n, 0).toLocaleString("zh-CN");
  $("totalColors").textContent = counts.filter(Boolean).length;
  const list = $("paletteList");
  const previous = list.scrollTop;
  const focusedIndex = document.activeElement?.dataset.paletteIndex;
  list.replaceChildren();
  const order = [...counts.keys()].sort((a, b) => counts[b] - counts[a]);
  for (const i of order) {
    const entry = pattern.palette[i];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "palette-row";
    button.dataset.paletteIndex = i;
    button.setAttribute("aria-pressed", String(state.selected === i));
    button.title = entry.code + " " + entry.name + " " + entry.hex + "，" + counts[i] + " 颗";
    const swatch = document.createElement("span");
    swatch.className = "bead-swatch";
    swatch.style.setProperty("--bead", entry.hex);
    const label = document.createElement("span");
    label.className = "swatch-label";
    const code = document.createElement("strong");
    code.textContent = entry.code;
    const name = document.createElement("span");
    name.textContent = entry.name;
    label.append(code, name);
    const count = document.createElement("span");
    count.className = "count";
    count.textContent = counts[i];
    button.append(swatch, label, count);
    list.append(button);
  }
  if (!order.length) {
    const message = document.createElement("p");
    message.className = "empty-palette";
    message.textContent = "图纸留空，暂时没有色豆。";
    list.append(message);
  }
  list.scrollTop = previous;
  if (focusedIndex !== undefined) list.querySelector('[data-palette-index="' + focusedIndex + '"]')?.focus({preventScroll:true});
}

function updateTools() {
  for (const button of viewButtons) button.setAttribute("aria-pressed", String(button.dataset.mode === state.mode));
  for (const button of toolButtons) {
    button.disabled = state.mode === "source" || !state.pattern.palette.length;
    button.setAttribute("aria-pressed", String(button.dataset.tool === state.tool && state.mode !== "source"));
  }
  const editing = state.mode !== "source" && state.tool && state.pattern.palette.length;
  art.classList.toggle("ink", Boolean(editing));
  $("undoButton").disabled = !state.undo.length;
  $("redoButton").disabled = !state.redo.length;
  const color = state.pattern.palette[state.selected];
  let hint = "选一颗色豆，再点画布上的格子改色。";
  if (state.mode === "source") hint = "原图预览。切到拼豆或色号图可编辑。";
  else if (state.tool === "erase") hint = "橡皮擦 · 在格子上点击或拖动";
  else if (state.tool === "sample") hint = "吸管 · 点一个有颜色的格子取色";
  else if (state.tool === "paint" && color) hint = "画笔 · " + color.code + " " + color.name + " · 点击或拖动";
  $("boardHint").textContent = hint;
}

function selectColor(index) {
  state.selected = index;
  state.tool = "paint";
  if (state.mode === "source") {
    state.mode = "bead";
    render();
  }
  for (const button of $("paletteList").querySelectorAll(".palette-row")) {
    button.setAttribute("aria-pressed", String(Number(button.dataset.paletteIndex) === index));
  }
  updateTools();
}

function position(event) {
  const rect = art.getBoundingClientRect();
  const {width, height} = state.pattern;
  const gutter = state.mode === "chart" ? chartGutter : 0;
  const step = Math.min(art.width / (width + gutter), art.height / (height + gutter));
  const x = state.mode === "chart"
    ? Math.floor((event.clientX - rect.left) / rect.width * art.width / step - gutter)
    : Math.floor((event.clientX - rect.left) / rect.width * width);
  const y = state.mode === "chart"
    ? Math.floor((event.clientY - rect.top) / rect.height * art.height / step - gutter)
    : Math.floor((event.clientY - rect.top) / rect.height * height);
  return x >= 0 && y >= 0 && x < width && y < height ? [x,y] : null;
}

function paintLine(from, to) {
  const {pattern, stroke} = state;
  let [x,y] = from || to;
  const [endX,endY] = to;
  const dx = Math.abs(endX - x), dy = -Math.abs(endY - y);
  const sx = x < endX ? 1 : -1, sy = y < endY ? 1 : -1;
  let error = dx + dy;
  while (true) {
    const index = y * pattern.width + x;
    if (pattern.cells[index] !== stroke.color) {
      if (!stroke.changes.has(index)) stroke.changes.set(index, pattern.cells[index]);
      pattern.cells[index] = stroke.color;
    }
    if (x === endX && y === endY) break;
    const twice = 2 * error;
    if (twice >= dy) { error += dy; x += sx; }
    if (twice <= dx) { error += dx; y += sy; }
  }
  stroke.last = to;
  renderSoon();
}

function finishStroke(event) {
  const stroke = state.stroke;
  if (!stroke || stroke.pointerId !== event.pointerId) return;
  state.stroke = null;
  if (!stroke.changes.size) return;
  state.undo.push(stroke);
  if (state.undo.length > historyLimit) state.undo.shift();
  state.redo = [];
  updateTools();
  renderPalette();
}

function history(action) {
  const redo = action === "redo";
  const list = redo ? state.redo : state.undo;
  const other = redo ? state.undo : state.redo;
  if (!list.length || state.stroke) return;
  const stroke = list.pop();
  for (const [index, value] of stroke.changes) state.pattern.cells[index] = redo ? stroke.color : value;
  other.push(stroke);
  renderPalette();
  render();
  updateTools();
}

function setZoom(next) {
  const centerX = (viewport.scrollLeft + viewport.clientWidth / 2) / Math.max(viewport.scrollWidth,1);
  const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / Math.max(viewport.scrollHeight,1);
  state.zoom = Math.max(.5, Math.min(5, Math.round(next * 100) / 100));
  render();
  viewport.scrollTo(centerX * viewport.scrollWidth - viewport.clientWidth / 2, centerY * viewport.scrollHeight - viewport.clientHeight / 2);
}

function usedColors() {
  return [...countsFor(state.pattern)].map((count,i) => ({...state.pattern.palette[i],count}))
    .filter((color) => color.count).sort((a,b) => b.count - a.count);
}

function exportName() {
  return state.name.replace(/[\\/:*?"<>|\u0000-\u001f]/g,"-").slice(0,60) || "拼豆图纸";
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function legendText(entry) {
  return entry.code + "  " + entry.name + "  × " + entry.count;
}

function patternSummary(colors) {
  const {width,height} = state.pattern;
  const total = colors.reduce((sum,color) => sum + color.count,0);
  return width + " × " + height + " 格    " + total + " 颗    " + colors.length + " 色";
}

function png() {
  const {pattern} = state;
  const colors = usedColors();
  const step = 27;
  const margin = 24;
  const header = 86;
  const graphWidth = Math.ceil((pattern.width + chartGutter) * step);
  const graphHeight = Math.ceil((pattern.height + chartGutter) * step);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(640,graphWidth + margin * 2 + 2);
  const columns = Math.min(4, Math.floor((canvas.width - margin * 2) / 182));
  const legendHeight = 62 + Math.ceil(colors.length / columns) * 25;
  canvas.height = header + graphHeight + legendHeight + margin;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#192c69";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText(state.name + " · 拼豆图纸",margin,36,canvas.width - margin * 2);
  ctx.font = "16px sans-serif";
  ctx.fillText(patternSummary(colors),margin,64);
  ctx.save();
  ctx.translate(margin,header);
  chart(ctx, pattern, step);
  ctx.restore();
  const top = header + graphHeight + 28;
  ctx.font = "bold 18px sans-serif";
  ctx.fillStyle = "#192c69";
  ctx.fillText("用豆清单",margin,top);
  ctx.font = "13px sans-serif";
  ctx.fillText(state.custom ? "自定义色板" : "P 色号为工作台编号",margin,top + 22);
  ctx.font = "15px sans-serif";
  const columnWidth = (canvas.width - margin * 2) / columns;
  colors.forEach((entry,i) => {
    const x = margin + i % columns * columnWidth;
    const y = top + 45 + Math.floor(i / columns) * 25;
    ctx.fillStyle = entry.hex;
    ctx.fillRect(x,y - 13,16,16);
    ctx.strokeStyle = "#69758c";
    ctx.strokeRect(x,y - 13,16,16);
    ctx.fillStyle = "#1e2743";
    ctx.fillText(legendText(entry),x + 23,y,columnWidth - 30);
  });
  canvas.toBlob((blob) => {
    if (blob) {
      download(blob,exportName() + "-拼豆图纸.png");
      say("已导出带色号的 PNG 图纸");
    } else say("导出失败，请重新试一次。");
  },"image/png");
}

function csv() {
  const safe = (value) => {
    const raw = String(value);
    const text = /^[=+\-@\t\r]/.test(raw) ? "'" + raw : raw;
    return '"' + text.replaceAll('"','""') + '"';
  };
  const lines = ["色号,颜色名称,HEX,数量（颗）"];
  for (const entry of usedColors()) lines.push([entry.code,entry.name,entry.hex,entry.count].map(safe).join(","));
  download(new Blob(["\ufeff" + lines.join("\r\n")],{type:"text/csv;charset=utf-8"}),exportName() + "-用豆清单.csv");
  say("已导出用豆清单");
}

function makePrintPages() {
  const {pattern} = state;
  const colors = usedColors();
  const content = document.createDocumentFragment();
  const tileWidth = 40, tileHeight = 46;
  const pages = Math.ceil(pattern.width / tileWidth) * Math.ceil(pattern.height / tileHeight);
  let part = 0;
  function addPage(title, detail) {
    const page = document.createElement("section");
    page.className = "print-page";
    const heading = document.createElement("h1");
    heading.textContent = title;
    const info = document.createElement("p");
    info.textContent = detail;
    page.append(heading,info);
    content.append(page);
    return page;
  }
  for (let y = 0; y < pattern.height; y += tileHeight) {
    for (let x = 0; x < pattern.width; x += tileWidth) {
      const width = Math.min(tileWidth,pattern.width - x);
      const height = Math.min(tileHeight,pattern.height - y);
      const page = addPage(exportName() + " · 拼豆图纸",
        "图纸 " + (++part) + " / " + pages + "  |  列 " + (x + 1) + "–" + (x + width) + "，行 " + (y + 1) + "–" + (y + height) + "  |  " + patternSummary(colors));
      const canvas = document.createElement("canvas");
      const step = 36;
      canvas.width = Math.ceil((width + chartGutter) * step) + 2;
      canvas.height = Math.ceil((height + chartGutter) * step) + 2;
      chart(canvas.getContext("2d"),pattern,step,[x,y,width,height]);
      const img = document.createElement("img");
      img.alt = "色号图 " + part;
      img.style.width = ((width + chartGutter) * 4.4).toFixed(2) + "mm";
      img.src = canvas.toDataURL("image/png");
      page.append(img);
    }
  }
  if (colors.length) {
    const page = addPage("用豆清单",patternSummary(colors) + "  |  " + (state.custom ? "自定义色板" : "P 色号为工作台编号"));
    const list = document.createElement("div");
    list.className = "print-legend";
    for (const entry of colors) {
      const item = document.createElement("div");
      item.className = "print-color";
      const swatch = document.createElement("i");
      swatch.style.backgroundColor = entry.hex;
      item.append(swatch,document.createTextNode(legendText(entry)));
      list.append(item);
    }
    page.append(list);
  }
  $("printArea").replaceChildren(content);
}

async function printPattern() {
  const id = ++chartPrintId;
  makePrintPages();
  const images = [...$("printArea").querySelectorAll("img")];
  await Promise.allSettled(images.map((img) => img.decode()));
  if (id === chartPrintId) window.print();
}

function updateCatalog(next, custom) {
  if (!confirmRegenerate()) return;
  state.catalog = next;
  state.custom = custom;
  const max = Math.min(48,next.length);
  $("maxColors").max = max;
  document.querySelector(".range-labels span:last-child").textContent = max + " 色";
  $("paletteDialog").close();
  regenerate({notify:true});
}

for (const id of ["widthInput","maxColors","removeBg","dither"]) $(id).addEventListener("input", () => updateSettings(true));
$("widthInput").addEventListener("change", (event) => {
  const value = Number(event.target.value);
  event.target.value = Math.max(8,Math.min(120,Math.round(value || 32)));
  updateSettings(true);
});
$("generate").addEventListener("click", () => regenerate({notify:true,ask:true}));
$("imageInput").addEventListener("change", (event) => {
  loadImage(event.target.files[0]);
  event.target.value = "";
});
$("resetSample").addEventListener("click", () => { if (confirmRegenerate()) useSample(); });

const dropZone = $("dropZone");
for (const type of ["dragenter","dragover"]) {
  dropZone.addEventListener(type, (event) => {
    event.preventDefault();
    dropZone.classList.add("drag");
    event.dataTransfer.dropEffect = "copy";
  });
}
dropZone.addEventListener("dragleave", (event) => {
  if (!dropZone.contains(event.relatedTarget)) dropZone.classList.remove("drag");
});
dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("drag");
  loadImage(event.dataTransfer.files[0]);
});

viewButtons.forEach((button) => button.addEventListener("click", () => {
  state.mode = button.dataset.mode;
  viewport.scrollTo(0,0);
  render();
  updateTools();
}));
toolButtons.forEach((button) => button.addEventListener("click", () => {
  state.tool = button.dataset.tool === state.tool ? null : button.dataset.tool;
  if (state.tool === "paint" && state.selected < 0) selectColor(0);
  updateTools();
}));
$("paletteList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-palette-index]");
  if (button) selectColor(Number(button.dataset.paletteIndex));
});

art.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 || state.stroke || state.mode === "source" || !state.tool || !state.pattern.palette.length) return;
  const point = position(event);
  if (!point) return;
  if (state.tool === "sample") {
    const index = state.pattern.cells[point[1] * state.pattern.width + point[0]];
    if (index >= 0) selectColor(index);
    return;
  }
  state.stroke = {pointerId:event.pointerId,color:state.tool === "erase" ? -1 : state.selected,changes:new Map(),last:null};
  art.setPointerCapture(event.pointerId);
  paintLine(null,point);
});
art.addEventListener("pointermove", (event) => {
  if (state.stroke?.pointerId !== event.pointerId) return;
  const point = position(event);
  if (point) paintLine(state.stroke.last,point);
  else state.stroke.last = null;
});
for (const type of ["pointerup","pointercancel","lostpointercapture"]) art.addEventListener(type,finishStroke);
$("undoButton").addEventListener("click", () => history("undo"));
$("redoButton").addEventListener("click", () => history("redo"));
$("zoomIn").addEventListener("click", () => setZoom(state.zoom * 1.25));
$("zoomOut").addEventListener("click", () => setZoom(state.zoom / 1.25));
$("zoomFit").addEventListener("click", () => setZoom(1));
new ResizeObserver(renderSoon).observe(viewport);

const exportMenu = $("exportMenu");
const exportButton = $("exportButton");
function setExport(open) {
  exportMenu.hidden = !open;
  exportButton.setAttribute("aria-expanded",String(open));
}
exportButton.addEventListener("click", () => setExport(exportMenu.hidden));
document.addEventListener("click", (event) => { if (!event.target.closest(".export-wrap")) setExport(false); });
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !exportMenu.hidden) {
    setExport(false);
    exportButton.focus();
  }
  if (!(event.ctrlKey || event.metaKey) || /^(INPUT|TEXTAREA)$/.test(event.target.tagName) || document.querySelector("dialog[open]")) return;
  const key = event.key.toLowerCase();
  if (key === "z" || key === "y") {
    event.preventDefault();
    history(key === "y" || event.shiftKey ? "redo" : "undo");
  }
});
$("exportPng").addEventListener("click", () => { setExport(false); png(); });
$("exportCsv").addEventListener("click", () => { setExport(false); csv(); });
$("printButton").addEventListener("click",printPattern);
window.addEventListener("beforeprint", () => { if (!$("printArea").hasChildNodes()) makePrintPages(); });
window.addEventListener("afterprint", () => $("printArea").replaceChildren());
$("helpButton").addEventListener("click", () => $("helpDialog").showModal());
$("openPalette").addEventListener("click", () => {
  $("paletteFeedback").textContent = "";
  $("paletteDialog").showModal();
});
for (const button of document.querySelectorAll(".close-dialog")) button.addEventListener("click", () => button.closest("dialog").close());
$("paletteFile").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  event.target.value = "";
  if (!file) return;
  if (file.size > 100_000) {
    $("paletteFeedback").textContent = "色表文件请小于 100 KB。";
    return;
  }
  try {
    const buffer = await file.arrayBuffer();
    let text;
    try { text = new TextDecoder("utf-8",{fatal:true}).decode(buffer); }
    catch { text = new TextDecoder("gb18030").decode(buffer); }
    $("paletteInput").value = text;
    $("paletteFeedback").textContent = "";
  } catch {
    $("paletteFeedback").textContent = "无法读取色表。请将内容粘贴到下方。";
  }
});
$("applyPalette").addEventListener("click", () => {
  try { updateCatalog(parsePalette($("paletteInput").value),true); }
  catch (error) { $("paletteFeedback").textContent = error.message; }
});
$("defaultPalette").addEventListener("click", () => {
  if (state.custom) updateCatalog(catalog,false);
  else $("paletteDialog").close();
});

useSample();
