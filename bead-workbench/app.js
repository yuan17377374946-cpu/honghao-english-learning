"use strict";

const $ = (id) => document.getElementById(id);
const { catalog, parsePalette, sizeFor, convert, countsFor } = BeadEngine;
const art = $("art");
const viewport = $("viewport");
const viewButtons = [...document.querySelectorAll("[data-mode]")];
const toolButtons = [...document.querySelectorAll("[data-tool]")];
const {gutter:chartGutter,draw:chart} = BeadChart;
const historyLimit = 35;
const state = {
  source:null, name:"番茄示例", isSample:true, catalog, custom:false, pattern:null,
  mode:"bead", tool:null, selected:-1, zoom:1, undo:[], redo:[], stroke:null, importId:0,
  mirror:false, direct:false, sourceId:null, paletteLabel:null
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
  if (state.direct) return false;
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
  $("paletteName").textContent = state.paletteLabel || (state.custom ? "自定义色板" : "通用色板");
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

function setDirect(direct) {
  state.direct = direct;
  $("imageSettings").hidden = direct;
  $("imageActions").hidden = direct;
  document.querySelector('[data-mode="source"]').disabled = direct;
  $("openPalette").hidden = direct;
  if (!direct) state.sourceId = null;
}

function openEditable(name,pattern,sourceId = null) {
  state.importId++;
  state.pattern = pattern;
  state.name = name;
  state.sourceId = sourceId;
  state.isSample = false;
  state.mode = "chart";
  state.zoom = 1;
  state.selected = -1;
  state.tool = null;
  state.undo = [];
  state.redo = [];
  setDirect(true);
  $("fileName").textContent = name;
  $("fileName").title = name;
  $("resetSample").hidden = false;
  $("dimensions").textContent = pattern.width + " × " + pattern.height + " 格";
  $("paletteName").textContent = sourceId ? "MARD 291" : "作品色板";
  $("paletteNotice").textContent = "选择色号开始绘制。";
  viewport.scrollTo(0,0);
  updateTools();
  renderPalette();
  render();
}

function useSample() {
  setDirect(false);
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
    setDirect(false);
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
    ctx.fillStyle = "#fffbfd";
    ctx.fillRect(0,0,art.width,art.height);
    ctx.fillStyle = "#edcfdf";
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
  else if (state.tool === "fill" && color) hint = "油漆桶 · " + color.code + " · 点击填充相连的同色格";
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

function paintCell(index,stroke) {
  const {cells} = state.pattern;
  if (cells[index] === stroke.color) return;
  if (!stroke.changes.has(index)) stroke.changes.set(index,cells[index]);
  cells[index] = stroke.color;
}

function fillArea(x,y) {
  const {width,height,cells} = state.pattern;
  const start = y * width + x;
  const oldColor = cells[start];
  const stroke = {color:state.selected,changes:new Map()};
  if (oldColor === stroke.color) return;
  const pending = [start];
  paintCell(start,stroke);
  while (pending.length) {
    const index = pending.pop();
    const col = index % width;
    const neighbors = [];
    if (col > 0) neighbors.push(index - 1);
    if (col < width - 1) neighbors.push(index + 1);
    if (index >= width) neighbors.push(index - width);
    if (index < width * (height - 1)) neighbors.push(index + width);
    for (const neighbor of neighbors) {
      if (cells[neighbor] !== oldColor) continue;
      paintCell(neighbor,stroke);
      pending.push(neighbor);
    }
  }
  storeStroke(stroke);
  render();
}

function paintLine(from, to) {
  const {pattern, stroke} = state;
  let [x,y] = from || to;
  const [endX,endY] = to;
  const dx = Math.abs(endX - x), dy = -Math.abs(endY - y);
  const sx = x < endX ? 1 : -1, sy = y < endY ? 1 : -1;
  let error = dx + dy;
  while (true) {
    paintCell(y * pattern.width + x,stroke);
    if (state.mirror) paintCell(y * pattern.width + pattern.width - 1 - x,stroke);
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
  storeStroke(stroke);
}

function storeStroke(stroke) {
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
  const canvas = BeadChart.page(state.pattern,state.name,
    $("paletteName").textContent === "通用色板" ? "P 色号为工作台编号" : $("paletteName").textContent);
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

function updateCatalog(next, custom, label = null) {
  if (!confirmRegenerate()) return;
  state.catalog = next;
  state.custom = custom;
  state.paletteLabel = label;
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
  if ((state.tool === "paint" || state.tool === "fill") && state.selected < 0) state.selected = 0;
  updateTools();
}));
$("paletteList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-palette-index]");
  if (!button) return;
  const keepFill = state.tool === "fill";
  selectColor(Number(button.dataset.paletteIndex));
  if (keepFill) {
    state.tool = "fill";
    updateTools();
  }
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
  if (state.tool === "fill") {
    fillArea(...point);
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

const projectStorage = "bead-workbench:projects:v1";
const projectsDialog = $("projectsDialog");
const newDialog = $("newDialog");

function savedWorks() {
  try {
    const works = JSON.parse(localStorage.getItem(projectStorage));
    return Array.isArray(works) ? works.filter(work => work?.project?.format === "bead-workbench") : [];
  } catch {
    return [];
  }
}

function currentProject(name = state.name) {
  return BeadProject.snapshot(name,state.pattern,state.sourceId);
}

function projectName(value) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0,60) : "我的拼豆图纸";
}

function openProject(data) {
  if (data?.format !== "bead-workbench" || data.version !== 1) throw Error("请选择拼豆工作台导出的图纸 JSON。");
  const pattern = BeadProject.read(data);
  if (!confirmRegenerate()) return;
  const sourceId = typeof data.sourceId === "string" && BeadProject.validSource(data.sourceId) ? data.sourceId : null;
  openEditable(projectName(data.name),pattern,sourceId);
  projectsDialog.close();
}

function listWorks() {
  const works = savedWorks();
  const result = $("projectList");
  result.replaceChildren();
  if (!works.length) {
    const empty = document.createElement("p");
    empty.textContent = "暂无本地作品";
    result.append(empty);
    return;
  }
  for (const folder of new Set(works.map(work => work.folder))) {
    const heading = document.createElement("h3");
    heading.textContent = folder || "未分组";
    result.append(heading);
    for (const work of works.filter(item => item.folder === folder)) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "button outline";
      button.textContent = work.project.name + " · " + work.project.width + " × " + work.project.height + " 格";
      button.addEventListener("click",() => {
        try { openProject(work.project); } catch (error) { say(error.message); }
      });
      result.append(button);
    }
  }
}

$("newProject").addEventListener("click",() => newDialog.showModal());
$("newForm").addEventListener("submit",async event => {
  event.preventDefault();
  if (!confirmRegenerate()) return;
  const button = $("createBlank");
  const width = $("newWidth").valueAsNumber;
  const height = $("newHeight").valueAsNumber;
  const name = projectName($("newName").value);
  button.disabled = true;
  try {
    const colors = $("newPalette").value === "mard" ? await BeadProject.mard() : catalog;
    openEditable(name,{width,height,palette:colors,cells:new Int16Array(width*height).fill(-1)});
    newDialog.close();
  } catch (error) { say(error.message); }
  finally { button.disabled = false; }
});
$("openProjects").addEventListener("click",() => {
  $("saveTitle").value = state.name;
  listWorks();
  projectsDialog.showModal();
});
$("saveProject").addEventListener("click",() => {
  const name = projectName($("saveTitle").value);
  const folder = $("saveFolder").value.trim().slice(0,40);
  const works = savedWorks();
  const existing = works.find(work => work.folder === folder && work.project.name === name);
  if (existing && !confirm("覆盖同组同名的作品「" + name + "」？")) return;
  try {
    const next = [{folder,project:currentProject(name)},...works.filter(work => work !== existing)];
    localStorage.setItem(projectStorage,JSON.stringify(next));
    listWorks();
    say("已保存「" + name + "」");
  } catch { say("浏览器存储空间不足，可通过导出图纸下载 JSON。"); }
});
$("openProjectFile").addEventListener("click",() => $("projectFile").click());
$("projectFile").addEventListener("change",async event => {
  const file = event.target.files[0];
  event.target.value = "";
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) return say("图纸文件过大，请检查 JSON。");
  try { openProject(JSON.parse(await file.text())); }
  catch { say("无法读取这份图纸，请选择工作台导出的 JSON。"); }
});
$("exportProject").addEventListener("click",() => {
  setExport(false);
  download(new Blob([JSON.stringify(currentProject())],{type:"application/json"}),exportName() + ".bead.json");
});
$("useMard").addEventListener("click",async () => {
  const button = $("useMard");
  button.disabled = true;
  try { updateCatalog(await BeadProject.mard(),true,"MARD 291"); }
  catch (error) { $("paletteFeedback").textContent = error.message; }
  finally { button.disabled = false; }
});
$("mirrorPaint").addEventListener("click",() => {
  state.mirror = !state.mirror;
  $("mirrorPaint").setAttribute("aria-pressed",String(state.mirror));
});
$("openFocus").addEventListener("click",() => {
  if (!BeadFocus.open(state.name,state.pattern,state.sourceId)) say("图纸还没有放豆。");
});

useSample();
const kairoId = new URLSearchParams(location.search).get("kairo");
if (kairoId) {
  const request = state.importId;
  Promise.all([BeadProject.kairo(kairoId),fetch("kairo/catalog.json?v=kairo-colors-1").then(response => {
    if (!response.ok) throw Error("开罗图纸目录无法读取。");
    return response.json();
  })]).then(([pattern,collections]) => {
    if (state.importId !== request || !confirmRegenerate()) return;
    const item = collections.flatMap(collection => collection.items).find(item => item.id === kairoId);
    openEditable(item?.name ?? "开罗拼豆图纸",pattern,kairoId);
  }).catch(error => say(error.message));
}
