"use strict";

const byId = id => document.getElementById(id);
const canvas = byId("cake");
const context = canvas.getContext("2d");
const undoButton = byId("undo");
const eraserButton = byId("eraser");
const messageInput = byId("message");
const hint = byId("hint");
const gift = byId("gift");
const center = { x: 535, y: 446 };
const radius = { x: 337, y: 170 };
const sideHeight = 272;
const tau = Math.PI * 2;
const storageKey = "retro-cake-studio-v2";
const eraserRadius = 18;
const hitCanvas = document.createElement("canvas");
hitCanvas.width = hitCanvas.height = eraserRadius * 2 + 1;
const hitContext = hitCanvas.getContext("2d", { willReadFrequently: true });

const colors = {
  vanilla: { name: "香草奶油", tint: "#eabe7f" },
  ivory: { name: "奶油白", tint: "#f6eee3", light: .26 },
  blush: { name: "草莓粉", tint: "#e6a0aa", shade: .06 },
  rose: { name: "豆沙粉", tint: "#d68278", shade: .15 },
  berry: { name: "莓果红", tint: "#bd5b73", shade: .39 },
  lavender: { name: "薰衣草紫", tint: "#ae97c6", shade: .19 },
  blue: { name: "雾蓝色", tint: "#86a7c3", shade: .18 },
  seafoam: { name: "薄荷绿", tint: "#91bea4", shade: .09 },
  mint: { name: "开心果绿", tint: "#acb378", shade: .16 },
  lemon: { name: "柠檬黄", tint: "#edcb68", shade: .04 },
  caramel: { name: "焦糖杏", tint: "#d09260", shade: .29 },
  cocoa: { name: "可可奶油", tint: "#976147", shade: .55 }
};
const icing = {
  shell: { name: "贝壳边", spacing: 41, box: [91, 61, -30], edge: true, hint: "沿着蛋糕边拖动，挤一圈厚厚的贝壳花。" },
  rose: { name: "奶油玫瑰", spacing: 74, box: [104, 95, -52], color: "rose", hint: "点一下蛋糕，挤一朵奶油玫瑰。" },
  swag: { name: "奶油垂帘", spacing: 125, color: "rose", hint: "点一下蛋糕侧面，挤出一串奶油垂帘。" },
  bow: { name: "奶油蝴蝶结", spacing: 72, box: [92, 79, -20], color: "rose", hint: "给垂帘两端点上奶油蝴蝶结。" },
  star: { name: "星星花", spacing: 55, box: [68, 58, -35], hint: "点出一朵星星，也可以拖出一圈星星花。" },
  pearls: { name: "珍珠串", spacing: 71, box: [72, 30, -18], edge: true, hint: "沿着蛋糕边拖动，排出圆圆的奶油珍珠。" },
  ruffle: { name: "荷叶波浪", spacing: 90, box: [108, 53, -27], edge: true, hint: "沿着边缘拖动，让奶油像荷叶一样起褶。" },
  weave: { name: "篮编纹", spacing: 83, box: [87, 73, -36], hint: "在侧面挤上几片交错的篮编纹。" },
  lace: { name: "蕾丝边", spacing: 92, box: [103, 43, -22], edge: true, hint: "沿着边缘拖动，接成一条镂空奶油蕾丝。" },
  leaf: { name: "奶油叶", spacing: 57, box: [59, 62, -34], defaultColor: "seafoam", hint: "在花朵旁边点几片有叶脉的奶油叶。" }
};
const toppings = {
  cherry: { name: "红樱桃", box: [54, 81, -77, -24] },
  strawberry: { name: "草莓", size: 78 },
  raspberry: { name: "覆盆子", size: 60 },
  blueberry: { name: "蓝莓", size: 49 },
  blackberry: { name: "黑莓", size: 59 },
  grape: { name: "紫葡萄", size: 81 },
  fig: { name: "无花果", size: 82 },
  strawberryHalf: { name: "草莓切半", size: 77 },
  kiwi: { name: "奇异果片", size: 83 },
  orange: { name: "橙子片", size: 89 },
  lemonSlice: { name: "柠檬片", size: 84 },
  peach: { name: "蜜桃片", size: 80 },
  mango: { name: "芒果丁", size: 57 },
  candle: { name: "小蜡烛", box: [18, 107, -105], hint: "点一下蛋糕顶部，插一支小蜡烛。" }
};
const tools = { ...icing, ...toppings };
const catalog = { icing: Object.keys(icing), topping: Object.keys(toppings) };
const pageSize = 4;
const pages = { icing: 0, topping: 0 };
const selectedTools = { icing: "shell", topping: "cherry" };
const imageNames = ["opening", "sample", "plain", "bag", ...Object.keys(tools)];
const art = {};
const tinted = new Map();
const history = [];
let state = loadCake() ?? sampleCake();
let ready = false;
let displayAngle = state.angle;
let rotationFrame = 0;
let pointer = null;
let hover = null;
let erasing = false;
let tab = "icing";
let activeTool = "shell";
let activeColor = "vanilla";
let customIcingColor = false;

function sampleCake() {
  return { preset: true, marks: [], angle: 0, base: "vanilla", message: "" };
}

function loadCake() {
  try {
    const current = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(current?.marks) && Number.isFinite(current.angle) && colors[current.base] && typeof current.message === "string") return current;
    const legacy = JSON.parse(localStorage.getItem("retro-cake-studio-v1"));
    if (!Array.isArray(legacy?.marks) || !Number.isFinite(legacy.angle) || typeof legacy.message !== "string") return null;
    const includesStarter = legacy.marks.length >= 109 && legacy.marks[0].tool === "shell" &&
      legacy.marks[0].angle === 0 && legacy.marks[1].face === "side" && legacy.marks[84].tool === "swag";
    return { ...sampleCake(), ...legacy, preset: includesStarter, marks: includesStarter ? legacy.marks.slice(109) : legacy.marks };
  } catch {
    return null;
  }
}

function persist() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
}

function saveUndo() {
  history.push({ ...state, marks: state.marks.slice() });
  if (history.length > 48) history.shift();
  undoButton.disabled = false;
}

function undo() {
  if (pointer || !history.length) return;
  const orientation = state.angle;
  state = history.pop();
  state.angle = orientation;
  messageInput.value = state.message;
  undoButton.disabled = !history.length;
  persist();
  updateTray();
  render();
}

function starterMarks() {
  const marks = [];
  for (let index = 0; index < 36; index += 1) {
    const angle = index * tau / 36;
    marks.push({ tool: "shell", color: "vanilla", face: "top", angle, distance: .97 });
    marks.push({ tool: "shell", color: "vanilla", face: "side", angle, distance: .93 });
  }
  for (let index = 0; index < 10; index += 1) {
    const angle = index * tau / 10 + .03;
    marks.push({ tool: "swag", color: "rose", face: "side", angle, distance: .32 });
    marks.push({ tool: "bow", color: "rose", face: "side", angle: angle + .31, distance: .34 });
  }
  for (const [angle, cherry] of [[.57, true], [2.15, true], [3.32, false], [4.02, true], [4.78, false]]) {
    const rose = { tool: "rose", color: "rose", face: "top", angle, distance: .88 };
    marks.push(rose);
    if (cherry) marks.push({ ...rose, tool: "cherry", lift: 21 });
  }
  return marks;
}
const starter = starterMarks();

function project(angle, distance, face) {
  if (face === "side") {
    return { x: center.x + radius.x * Math.cos(angle), y: center.y + radius.y * Math.sin(angle) + sideHeight * distance };
  }
  return { x: center.x + radius.x * distance * Math.cos(angle), y: center.y + radius.y * distance * Math.sin(angle) };
}

function wrapped(angle) {
  return ((angle % tau) + tau) % tau;
}

function sprite(tool, color) {
  const original = art[tool];
  if (toppings[tool] || color === (icing[tool].color ?? "vanilla")) return original;
  const key = tool + color;
  if (tinted.has(key)) return tinted.get(key);
  const layer = document.createElement("canvas");
  layer.width = original.naturalWidth;
  layer.height = original.naturalHeight;
  const ctx = layer.getContext("2d");
  ctx.drawImage(original, 0, 0);
  colorWash(ctx, colors[color], layer.width, layer.height);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(original, 0, 0);
  tinted.set(key, layer);
  return layer;
}

function colorWash(ctx, color, width, height) {
  ctx.fillStyle = color.tint;
  ctx.globalCompositeOperation = "color";
  ctx.fillRect(0, 0, width, height);
  if (color.shade) {
    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = color.shade;
    ctx.fillRect(0, 0, width, height);
  }
  if (color.light) {
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = color.light;
    ctx.fillRect(0, 0, width, height);
  }
}

function outline(ctx) {
  ctx.beginPath();
  ctx.ellipse(center.x, center.y, radius.x, radius.y, 0, Math.PI, tau);
  ctx.lineTo(center.x + radius.x, center.y + sideHeight);
  ctx.ellipse(center.x, center.y + sideHeight, radius.x, radius.y, 0, 0, Math.PI);
  ctx.closePath();
}

function paintBase(ctx) {
  if (state.base === "vanilla") return;
  ctx.save();
  outline(ctx);
  ctx.clip();
  colorWash(ctx, colors[state.base], canvas.width, canvas.height);
  ctx.restore();
}

function drawSwag(ctx, mark, angle, shadow) {
  const a = wrapped(angle + .35) - .35;
  const start = a - .315;
  const end = a + .315;
  const rightAngle = Math.max(.008, start);
  const leftAngle = Math.min(Math.PI - .008, end);
  if (leftAngle <= rightAngle) return;
  const left = project(leftAngle, mark.distance, "side");
  const right = project(rightAngle, mark.distance, "side");
  const width = right.x - left.x;
  if (width < 9) return;
  const source = shadow ? sprite("swag", mark.color) : art.swag;
  const sourceWidth = source.width;
  const sourceHeight = source.height;
  const cropStart = (end - leftAngle) / .63 * sourceWidth;
  const cropWidth = (leftAngle - rightAngle) / .63 * sourceWidth;
  const depth = 28 + 53 * Math.max(.1, Math.sin(a));
  ctx.save();
  outline(ctx);
  ctx.clip();
  ctx.transform(1, (right.y - left.y) / width, 0, 1, left.x, left.y - 4);
  if (shadow) {
    ctx.shadowColor = "#5a2f244c";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 3;
  }
  ctx.drawImage(source, cropStart, 0, cropWidth, sourceHeight, 0, 0, width, depth);
  ctx.restore();
}

function drawMark(ctx, { mark, angle, point }, shadow = true) {
  if (mark.tool === "swag") { drawSwag(ctx, mark, angle, shadow); return; }
  if (mark.face === "side" && Math.sin(angle) < .025) return;
  const source = shadow ? sprite(mark.tool, mark.color) : art[mark.tool];
  const tool = tools[mark.tool];
  ctx.save();
  ctx.translate(point.x, point.y - (mark.lift ?? 0));
  if (shadow) {
    ctx.shadowColor = "#693c254d";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 4;
  }
  if (tool.edge) {
    if (mark.face === "top" && mark.distance > .76) {
      const tilt = Math.atan2(radius.y * Math.cos(angle), -radius.x * Math.sin(angle));
      ctx.rotate(Math.abs(tilt) > Math.PI / 2 ? tilt - Math.sign(tilt) * Math.PI : tilt);
    } else if (mark.face === "side") {
      ctx.rotate(-.29 * Math.cos(angle));
      ctx.scale(.62 + .38 * Math.sin(angle), 1);
    }
  }
  if (tool.box) {
    const [width, height, y, x = -width / 2] = tool.box;
    ctx.drawImage(source, x, y, width, height);
  } else {
    const scale = tool.size / Math.max(source.width, source.height);
    const width = source.width * scale;
    const height = source.height * scale;
    ctx.drawImage(source, -width / 2, -height * .92, width, height);
  }
  ctx.restore();
}

function orderedMarks(includeStarter) {
  const marks = state.preset && includeStarter ? [...starter, ...state.marks] : state.marks;
  return marks.map(mark => {
    const angle = mark.angle + displayAngle;
    return { mark, angle, point: project(angle, mark.distance, mark.face) };
  }).sort((first, second) => {
    if (first.mark.face !== second.mark.face) return first.mark.face === "side" ? -1 : 1;
    return first.point.y - second.point.y || Number(Boolean(toppings[first.mark.tool])) - Number(Boolean(toppings[second.mark.tool]));
  });
}

function paint(ctx, { photo = false } = {}) {
  const exactSample = state.preset && (!erasing || photo) &&
    state.base === "vanilla" && Math.abs(Math.sin(displayAngle / 2)) < .0005;
  const showOriginalBag = !photo && !hover && tab === "icing";
  const background = exactSample ? (showOriginalBag ? art.opening : art.sample) : art.plain;
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  if (!exactSample) paintBase(ctx);
  for (const entry of orderedMarks(!exactSample)) drawMark(ctx, entry);
  if (state.message.trim()) {
    ctx.save();
    ctx.translate(center.x + 7, center.y - 11);
    ctx.scale(1, .76);
    ctx.font = 'bold 48px "Noto Serif SC", "Songti SC", Georgia, serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "#f9dc9d";
    ctx.lineWidth = 3;
    ctx.strokeText(state.message.trim(), 0, 0, 435);
    ctx.fillStyle = "#883831";
    ctx.fillText(state.message.trim(), 0, 0, 435);
    ctx.restore();
  }
  if (!photo && hover) {
    if (erasing) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(hover.x, hover.y, eraserRadius, 0, tau);
      ctx.strokeStyle = "#703b2b";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.setLineDash([7, 5]);
      ctx.strokeStyle = "#fff0cb";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();
    } else if (tab === "icing") {
      ctx.drawImage(art.bag, hover.x - 5, hover.y - 182, 150, 186);
    }
  }
}

function render() {
  if (ready) paint(context);
}

function pointerPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height };
}

function locate(x, y) {
  const dx = (x - center.x) / radius.x;
  const dy = (y - center.y) / radius.y;
  const distance = Math.hypot(dx, dy);
  if (distance <= 1.035 && activeTool !== "swag") {
    return {
      face: "top", angle: Math.atan2(dy, dx) - displayAngle,
      distance: icing[activeTool]?.edge && distance > .79 ? .97 : Math.min(distance, .96)
    };
  }
  if (Math.abs(dx) >= .995 || tab === "topping") return null;
  const angle = Math.acos(dx);
  const depth = (y - center.y - radius.y * Math.sin(angle)) / sideHeight;
  if (depth < -.045 || depth > 1.02) return null;
  return { face: "side", angle: angle - displayAngle, distance: Math.max(.035, Math.min(depth, activeTool === "swag" ? .77 : .96)) };
}

function place(x, y) {
  const mark = locate(x, y);
  if (!mark || state.marks.length >= 1500) return false;
  beginEdit();
  state.marks.push({ ...mark, tool: activeTool, color: activeColor });
  return true;
}

function beginEdit() {
  if (!pointer?.changed) {
    saveUndo();
    if (pointer) pointer.changed = true;
  }
}

function hitMark(x, y) {
  const diameter = hitCanvas.width;
  const centerAlpha = (eraserRadius * diameter + eraserRadius) * 4 + 3;
  let closest = null;
  let bestDistance = eraserRadius ** 2 + 1;
  for (const entry of orderedMarks(true).reverse()) {
    // The broad bounds include the curved swags and tall candles.
    if (Math.abs(entry.point.x - x) > 145 || Math.abs(entry.point.y - y) > 160) continue;
    hitContext.clearRect(0, 0, diameter, diameter);
    hitContext.save();
    hitContext.translate(eraserRadius + .5 - x, eraserRadius + .5 - y);
    drawMark(hitContext, entry, false);
    hitContext.restore();
    const pixels = hitContext.getImageData(0, 0, diameter, diameter).data;
    if (pixels[centerAlpha] > 96) return entry.mark;
    for (let row = 0; row < diameter; row += 1) {
      for (let col = 0; col < diameter; col += 1) {
        const distance = (col - eraserRadius) ** 2 + (row - eraserRadius) ** 2;
        if (distance < bestDistance && pixels[(row * diameter + col) * 4 + 3] > 96) {
          bestDistance = distance;
          closest = entry.mark;
        }
      }
    }
  }
  return closest;
}

function erase(x, y) {
  const mark = hitMark(x, y);
  if (!mark) return false;
  beginEdit();
  if (state.preset && !state.marks.includes(mark)) {
    state.marks = [...starter, ...state.marks];
    state.preset = false;
  }
  state.marks.splice(state.marks.indexOf(mark), 1);
  return true;
}

function canDecorate() {
  return ready && gift.hidden && (erasing || tab === "icing" || tab === "topping");
}

canvas.addEventListener("pointerdown", event => {
  if (!canDecorate() || pointer || event.button !== 0) return;
  const { x, y } = pointerPoint(event);
  if (!erasing && !locate(x, y)) return;
  cancelAnimationFrame(rotationFrame);
  state.angle = displayAngle;
  pointer = { id: event.pointerId, x, y, changed: false };
  canvas.setPointerCapture(event.pointerId);
  const edit = erasing ? erase : place;
  edit(x, y);
  hover = erasing || tab === "icing" ? { x, y } : null;
  render();
});
canvas.addEventListener("pointermove", event => {
  if (!canDecorate()) return;
  const { x, y } = pointerPoint(event);
  const nextHover = erasing || (tab === "icing" && locate(x, y)) ? { x, y } : null;
  const movedBrush = Boolean(hover || nextHover);
  hover = nextHover;
  const spacing = erasing ? eraserRadius : tools[activeTool].spacing;
  const edit = erasing ? erase : place;
  let changed = false;
  if (pointer?.id === event.pointerId && spacing) {
    const distance = Math.hypot(x - pointer.x, y - pointer.y);
    const steps = Math.floor(distance / spacing);
    if (steps) {
      const dx = (x - pointer.x) * spacing / distance;
      const dy = (y - pointer.y) * spacing / distance;
      for (let step = 0; step < steps; step += 1) {
        pointer.x += dx;
        pointer.y += dy;
        changed = edit(pointer.x, pointer.y) || changed;
      }
    }
  }
  if (movedBrush || changed) render();
});
for (const event of ["pointerup", "pointercancel", "lostpointercapture"]) {
  canvas.addEventListener(event, input => {
    if (pointer?.id !== input.pointerId) return;
    if (pointer.changed) persist();
    pointer = null;
    if (input.pointerType !== "mouse") { hover = null; render(); }
  });
}
canvas.addEventListener("pointerleave", () => { hover = null; render(); });
canvas.addEventListener("keydown", event => {
  if (!canDecorate() || pointer) return;
  const direction = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
  if (erasing && direction) {
    event.preventDefault();
    const point = hover ?? center;
    hover = {
      x: Math.max(0, Math.min(canvas.width, point.x + direction[0] * eraserRadius)),
      y: Math.max(0, Math.min(canvas.height, point.y + direction[1] * eraserRadius))
    };
    render();
    return;
  }
  if (!["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  if (erasing) {
    const point = hover ?? center;
    erase(point.x, point.y);
  } else {
    place(center.x, center.y + (activeTool === "swag" ? 255 : -28));
  }
  persist();
  render();
});

function rotate() {
  if (pointer || !ready) return;
  closeGift();
  hover = null;
  const from = displayAngle;
  cancelAnimationFrame(rotationFrame);
  state.angle += Math.PI / 4;
  const to = state.angle;
  persist();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    displayAngle = to;
    render();
    return;
  }
  const start = performance.now();
  function animate(time) {
    const progress = Math.min(1, (time - start) / 380);
    displayAngle = from + (to - from) * (1 - (1 - progress) ** 3);
    render();
    if (progress < 1) rotationFrame = requestAnimationFrame(animate);
  }
  rotationFrame = requestAnimationFrame(animate);
}

function updateTray() {
  eraserButton.setAttribute("aria-pressed", erasing);
  canvas.classList.toggle("is-erasing", erasing);
  document.querySelectorAll(".tabs button").forEach(button => {
    button.setAttribute("aria-pressed", button.dataset.tab === tab);
  });
  const choices = catalog[tab];
  const currentPage = pages[tab];
  const pageCount = choices ? Math.ceil(choices.length / pageSize) : 0;
  const visibleTools = choices?.slice(currentPage * pageSize, (currentPage + 1) * pageSize) ?? [];
  for (const [key, button] of toolButtons) {
    button.hidden = !visibleTools.includes(key);
    button.setAttribute("aria-pressed", !erasing && key === activeTool);
  }
  for (const [key, button] of baseButtons) {
    button.hidden = tab !== "base";
    button.setAttribute("aria-pressed", key === state.base);
  }
  for (const [key, button] of swatches) button.setAttribute("aria-pressed", key === activeColor);
  byId("tools").hidden = tab === "packing";
  byId("tools").dataset.tab = tab;
  byId("icing-colors").hidden = tab !== "icing";
  byId("color-name").textContent = colors[activeColor].name;
  byId("catalog-nav").hidden = !choices;
  if (choices) {
    byId("catalog-count").textContent = tab === "icing" ? choices.length + " 款裱花" : choices.length - 1 + " 款水果 · 另有蜡烛";
    byId("page-number").textContent = (currentPage + 1) + " / " + pageCount;
    byId("prev-page").disabled = currentPage === 0;
    byId("next-page").disabled = currentPage === pageCount - 1;
  }
  byId("packing").hidden = tab !== "packing";
  hint.textContent = erasing ? "点击擦掉一个装饰，按住拖动可连续擦除。" :
    tab === "packing" ? "写好祝福，就可以盖上蛋糕盒。" :
    tab === "base" ? "选一种颜色，给整只蛋糕抹上奶油。" :
    tools[activeTool].hint ?? "点一下蛋糕顶部，放上" + tools[activeTool].name + "。";
}

function setEraser(active) {
  erasing = active;
  hover = null;
  updateTray();
  render();
}

function switchTab(next) {
  if (pointer) return;
  closeGift();
  tab = next;
  if (selectedTools[tab]) activeTool = selectedTools[tab];
  setEraser(false);
}

function stamp(name, artwork, onClick) {
  const button = document.createElement("button");
  button.className = "stamp";
  button.type = "button";
  const icon = document.createElement(artwork ? "img" : "canvas");
  if (artwork) {
    icon.alt = "";
    icon.src = artwork + ".webp";
  } else {
    icon.width = 96;
    icon.height = 74;
    icon.setAttribute("aria-hidden", "true");
  }
  button.append(icon, name);
  button.addEventListener("click", onClick);
  byId("tools").append(button);
  return button;
}

const toolButtons = new Map();
const baseButtons = new Map();
const swatches = new Map();
for (const [key, tool] of Object.entries(tools)) {
  toolButtons.set(key, stamp(tool.name, key, () => {
    if (pointer) return;
    activeTool = key;
    selectedTools[tab] = key;
    if (tab === "icing" && !customIcingColor) activeColor = tool.defaultColor ?? tool.color ?? "vanilla";
    setEraser(false);
  }));
}
for (const [key, color] of Object.entries(colors)) {
  const baseButton = stamp(color.name, null, () => {
    if (state.base === key) return;
    saveUndo();
    state.base = key;
    persist();
    updateTray();
    render();
  });
  baseButtons.set(key, baseButton);
  const button = document.createElement("button");
  button.className = "swatch";
  button.type = "button";
  button.style.backgroundColor = color.tint;
  button.setAttribute("aria-label", color.name);
  button.title = color.name;
  button.addEventListener("click", () => {
    if (pointer) return;
    activeColor = key;
    customIcingColor = true;
    setEraser(false);
  });
  byId("colors").append(button);
  swatches.set(key, button);
}

function turnPage(direction) {
  if (!catalog[tab]) return;
  const lastPage = Math.ceil(catalog[tab].length / pageSize) - 1;
  pages[tab] = Math.max(0, Math.min(lastPage, pages[tab] + direction));
  updateTray();
}

function replaceCake(withSample) {
  if (pointer) return;
  closeGift();
  cancelAnimationFrame(rotationFrame);
  saveUndo();
  state = { ...sampleCake(), preset: withSample };
  displayAngle = state.angle;
  messageInput.value = state.message;
  hover = null;
  selectedTools.icing = "shell";
  selectedTools.topping = "cherry";
  pages.icing = 0;
  pages.topping = 0;
  activeColor = "vanilla";
  customIcingColor = false;
  switchTab("icing");
  persist();
  byId("notice").textContent = withSample ? "复古样款已恢复。" : "空白蛋糕准备好了。";
}

function closeGift() {
  gift.hidden = true;
}

function savePhoto() {
  if (!ready) return;
  const frame = document.createElement("canvas");
  frame.width = canvas.width;
  frame.height = canvas.height - 173;
  const ctx = frame.getContext("2d");
  ctx.translate(0, -173);
  paint(ctx, { photo: true });
  frame.toBlob(blob => {
    if (!blob) { byId("notice").textContent = "照片生成失败，请再试一次。"; return; }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "我的复古奶油蛋糕.png";
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    byId("notice").textContent = "成品照已生成。";
    byId("gift-save").textContent = "已生成照片";
  }, "image/png");
}

undoButton.disabled = true;
undoButton.addEventListener("click", undo);
eraserButton.addEventListener("click", () => {
  if (pointer || !ready) return;
  closeGift();
  setEraser(!erasing);
});
byId("rotate").addEventListener("click", rotate);
byId("reset").addEventListener("click", () => replaceCake(false));
byId("sample").addEventListener("click", () => replaceCake(true));
byId("prev-page").addEventListener("click", () => turnPage(-1));
byId("next-page").addEventListener("click", () => turnPage(1));
document.querySelectorAll(".tabs button").forEach(button => button.addEventListener("click", () => switchTab(button.dataset.tab)));
document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z" && event.target !== messageInput) {
    event.preventDefault();
    undo();
  }
  if (event.key === "Escape" && !pointer) {
    if (!gift.hidden) {
      closeGift();
      byId("box").focus();
    } else if (erasing) {
      setEraser(false);
    }
  }
});
messageInput.value = state.message;
messageInput.addEventListener("focus", () => { messageInput.dataset.before = state.message; });
messageInput.addEventListener("input", () => {
  state.message = messageInput.value;
  persist();
  render();
});
messageInput.addEventListener("change", () => {
  const current = state.message;
  state.message = messageInput.dataset.before ?? "";
  saveUndo();
  state.message = current;
  messageInput.dataset.before = current;
});
byId("box").addEventListener("click", () => {
  if (pointer) return;
  setEraser(false);
  byId("gift-message").textContent = state.message.trim() || "一只亲手裱好的奶油蛋糕";
  byId("gift-save").textContent = "保存成品照";
  gift.hidden = false;
  byId("unbox").focus();
});
byId("unbox").addEventListener("click", () => { closeGift(); byId("box").focus(); });
byId("gift-save").addEventListener("click", savePhoto);

updateTray();
Promise.all(imageNames.map(async name => {
  const image = new Image();
  image.src = name + ".webp";
  await image.decode();
  art[name] = image;
})).then(() => {
  for (const [key, button] of baseButtons) {
    const icon = button.querySelector("canvas");
    const swatch = sprite("rose", key);
    const scale = 65 / Math.max(swatch.width, swatch.height);
    const width = swatch.width * scale;
    const height = swatch.height * scale;
    icon.getContext("2d").drawImage(swatch, (icon.width - width) / 2, (icon.height - height) / 2, width, height);
  }
  ready = true;
  eraserButton.disabled = false;
  render();
}).catch(() => {
  hint.textContent = "蛋糕素材未加载，请刷新页面。";
});
