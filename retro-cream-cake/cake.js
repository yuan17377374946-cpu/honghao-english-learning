"use strict";

const byId = id => document.getElementById(id);
const canvas = byId("cake");
const context = canvas.getContext("2d");
const undoButton = byId("undo");
const eraserButton = byId("eraser");
const fruitSizeInput = byId("fruit-size");
const fruitSizeOutput = byId("fruit-size-value");
const resizeFruitButton = byId("resize-fruit");
const messageInput = byId("message");
const hint = byId("hint");
const gift = byId("gift");
const originalCenterY = 446;
const originalSideHeight = 272;
const cakeBottomY = originalCenterY + originalSideHeight;
const center = { x: 535, get y() { return cakeBottomY - cakeSideHeight(); } };
const radius = { x: 337, y: 170 };
const spongeHeight = 73;
const fillingHeight = 26;
const maxSponges = 4;
const tau = Math.PI * 2;
const storageKey = "retro-cake-studio-v2";
const eraserRadius = 18;
const hitCanvas = document.createElement("canvas");
hitCanvas.width = hitCanvas.height = eraserRadius * 2 + 1;
const hitContext = hitCanvas.getContext("2d", { willReadFrequently: true });
const defaultFruitSize = Number(fruitSizeInput.defaultValue);
const minFruitSize = Number(fruitSizeInput.min);
const maxFruitSize = Number(fruitSizeInput.max);

const fillingGroups = {
  cream: "奶油",
  fruit: "果粒",
  boba: "啵啵",
  crunch: "饼干薄脆",
  paste: "红豆芋泥"
};
const layerFlavors = {
  vanillaSponge: { name: "香草蛋糕体", kind: "sponge" },
  cocoaSponge: { name: "可可蛋糕体", kind: "sponge", color: { tint: "#75472d", shade: .72 } },
  matchaSponge: { name: "抹茶蛋糕体", kind: "sponge", color: { tint: "#879152", shade: .37 } },
  vanillaCream: { name: "香草奶油", kind: "filling", group: "cream" },
  strawberryCream: { name: "草莓奶油", kind: "filling", group: "cream", color: { tint: "#da7d82", shade: .3 } },
  blueberryCream: { name: "蓝莓奶油", kind: "filling", group: "cream", color: { tint: "#9d78b2", shade: .38 } },
  cocoaCream: { name: "可可奶油", kind: "filling", group: "cream", color: { tint: "#926047", shade: .62 } },
  melonFilling: { name: "哈密瓜", kind: "filling", group: "fruit", asset: "filling-melon" },
  dragonFilling: { name: "火龙果", kind: "filling", group: "fruit", asset: "filling-dragon" },
  mangoFilling: { name: "芒果", kind: "filling", group: "fruit", asset: "filling-mango" },
  peachBoba: { name: "蜜桃乌龙啵啵", kind: "filling", group: "boba", asset: "filling-peach-boba" },
  thaiBoba: { name: "泰茶啵啵", kind: "filling", group: "boba", asset: "filling-thai-boba" },
  cookieFilling: { name: "奥利奥碎", kind: "filling", group: "crunch", asset: "filling-cookie" },
  crispFilling: { name: "可可百利薄脆", kind: "filling", group: "crunch", asset: "filling-crisp" },
  redBeanFilling: { name: "甜红豆", kind: "filling", group: "paste", asset: "filling-red-bean" },
  taroFilling: { name: "芋泥", kind: "filling", group: "paste", asset: "filling-taro" }
};

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
  leaf: { name: "奶油叶", spacing: 57, box: [59, 62, -34], defaultColor: "seafoam", hint: "在花朵旁边点几片有叶脉的奶油叶。" },
  rope: { name: "双股绳纹", spacing: 103, box: [116, 34, -17], edge: true, hint: "沿着蛋糕边拖动，把双股奶油接成一圈绳纹。" },
  scroll: { name: "法式 S 卷", spacing: 104, box: [118, 54, -27], edge: true, hint: "点一段卷纹，或沿着边缘拖出一串法式 S 卷。" },
  drip: { name: "垂珠滴边", spacing: 96, box: [104, 52, -10], hint: "贴着蛋糕侧面的上沿点一下，让奶油珠垂下来。" },
  blossom: { name: "五瓣小花", box: [81, 72, -37], defaultColor: "blush", hint: "点一下挤出一朵五瓣小花，适合点缀在水果旁边。" },
  heart: { name: "奶油爱心", box: [81, 70, -38], defaultColor: "rose", hint: "在蛋糕上点一下，挤一颗双线奶油爱心。" },
  tower: { name: "螺旋尖塔", box: [76, 78, -70], hint: "在蛋糕顶部点一下，挤出一座层层叠起的奶油尖塔。" }
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
const fillingAssets = Object.values(layerFlavors).map(flavor => flavor.asset).filter(Boolean);
const imageNames = ["opening", "sample", "plain", "bag", "workbench", "sponge", "filling", ...fillingAssets, ...Object.keys(tools)];
const art = {};
const tinted = new Map();
const frostedStages = new Map();
const history = [];
let state = loadCake() ?? blankCake();
let ready = false;
let displayAngle = state.angle;
let rotationFrame = 0;
let pointer = null;
let hover = null;
let erasing = false;
let resizingFruit = false;
let selectedFruit = null;
let fruitResizeStarted = false;
let newFruitSize = defaultFruitSize;
let tab = state.layers && !state.frosted ? "build" : "icing";
let fillingGroup = "cream";
let activeTool = "shell";
let activeColor = "vanilla";
let customIcingColor = false;

function sampleCake() {
  return { preset: true, marks: [], angle: 0, base: "vanilla", message: "" };
}

function blankCake() {
  return { ...sampleCake(), preset: false, layers: [], frosted: false };
}

function layerKind(index) {
  return index % 2 ? "filling" : "sponge";
}

function cakeSideHeight() {
  if (!state.layers) return originalSideHeight;
  const count = state.layers.length;
  return Math.ceil(count / 2) * spongeHeight + Math.floor(count / 2) * fillingHeight;
}

function canFinishLayers(layers) {
  return Boolean(layers && layers.length >= 3 && layerKind(layers.length) === "filling");
}

function loadCake() {
  try {
    const current = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(current?.marks) && Number.isFinite(current.angle) && colors[current.base] && typeof current.message === "string") {
      const { layers, frosted, ...cake } = current;
      const validLayers = Array.isArray(layers) && layers.length <= maxSponges * 2 - 1 &&
        layers.every((id, index) => layerFlavors[id]?.kind === layerKind(index));
      return validLayers ? { ...cake, layers, frosted: Boolean(frosted && canFinishLayers(layers)) } : cake;
    }
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
  selectedFruit = null;
  fruitResizeStarted = false;
  messageInput.value = state.message;
  undoButton.disabled = !history.length;
  persist();
  if (state.layers && !state.frosted) switchTab("build");
  else {
    updateTray();
    render();
  }
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
    return { x: center.x + radius.x * Math.cos(angle), y: center.y + radius.y * Math.sin(angle) + cakeSideHeight() * distance };
  }
  return { x: center.x + radius.x * distance * Math.cos(angle), y: center.y + radius.y * distance * Math.sin(angle) };
}

function wrapped(angle) {
  return ((angle % tau) + tau) % tau;
}

function sprite(tool, color) {
  const original = art[tool];
  if (toppings[tool] || color === (icing[tool].color ?? "vanilla")) return original;
  return tintedImage(original, tool + color, colors[color]);
}

function tintedImage(original, key, color) {
  if (tinted.has(key)) return tinted.get(key);
  const layer = document.createElement("canvas");
  layer.width = original.naturalWidth;
  layer.height = original.naturalHeight;
  const ctx = layer.getContext("2d");
  ctx.drawImage(original, 0, 0);
  colorWash(ctx, color, layer.width, layer.height);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(original, 0, 0);
  tinted.set(key, layer);
  return layer;
}

function layerImage(id) {
  const { kind, color, asset } = layerFlavors[id];
  if (asset) return art[asset];
  return color ? tintedImage(art[kind], "layer-" + id, color) : art[kind];
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
  ctx.lineTo(center.x + radius.x, cakeBottomY);
  ctx.ellipse(center.x, cakeBottomY, radius.x, radius.y, 0, 0, Math.PI);
  ctx.closePath();
}

function paintStack(ctx) {
  ctx.drawImage(art.workbench, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  const width = radius.x * 2;
  let y = cakeBottomY;
  for (const [index, id] of state.layers.entries()) {
    const height = layerKind(index) === "sponge" ? spongeHeight : fillingHeight;
    y -= height;
    ctx.save();
    ctx.shadowColor = "#5b331d38";
    ctx.shadowBlur = 9;
    ctx.shadowOffsetY = 5;
    ctx.drawImage(layerImage(id), center.x - radius.x, y - radius.y, width, radius.y * 2 + height);
    ctx.restore();
  }
}

function frostedStage() {
  const height = cakeSideHeight();
  if (Math.abs(height - originalSideHeight) <= 2) return art.plain;
  if (frostedStages.has(height)) return frostedStages.get(height);
  const frame = document.createElement("canvas");
  frame.width = canvas.width;
  frame.height = canvas.height;
  const ctx = frame.getContext("2d");
  ctx.drawImage(art.workbench, 0, 0, frame.width, frame.height, 0, 0, frame.width, frame.height);
  const left = center.x - radius.x;
  const shift = center.y - originalCenterY;
  // Resize the curved side in narrow strips to keep its bottom seated on the stand.
  for (let x = left; x < center.x + radius.x; x += 2) {
    const across = (x + 1 - center.x) / radius.x;
    const y = originalCenterY + radius.y * Math.sqrt(1 - across * across);
    ctx.drawImage(art.plain, x, y, 2, originalSideHeight, x, y + shift, 2, height);
  }
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(center.x, center.y, radius.x, radius.y + 1, 0, 0, tau);
  ctx.clip();
  ctx.drawImage(art.plain, 0, shift);
  ctx.restore();
  frostedStages.set(height, frame);
  return frame;
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

function isFruit(tool) {
  return Boolean(toppings[tool]) && tool !== "candle";
}

function fruitSizePercent(mark) {
  const size = mark?.fruitSize;
  return Number.isFinite(size) ? Math.max(minFruitSize, Math.min(maxFruitSize, size)) : defaultFruitSize;
}

function markBox(tool, source) {
  if (tool.box) return tool.box;
  const scale = tool.size / Math.max(source.width, source.height);
  const width = source.width * scale;
  const height = source.height * scale;
  return [width, height, -height * .92];
}

function drawMark(ctx, { mark, angle, point }, shadow = true, selected = false) {
  if (mark.tool === "swag") { drawSwag(ctx, mark, angle, shadow); return; }
  if (mark.face === "side" && Math.sin(angle) < .025) return;
  const source = shadow ? sprite(mark.tool, mark.color) : art[mark.tool];
  const tool = tools[mark.tool];
  const scale = isFruit(mark.tool) ? fruitSizePercent(mark) / defaultFruitSize : 1;
  ctx.save();
  ctx.translate(point.x, point.y - (mark.lift ?? 0));
  if (scale !== 1) ctx.scale(scale, scale);
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
  const [width, height, y, x = -width / 2] = markBox(tool, source);
  ctx.drawImage(source, x, y, width, height);
  if (selected) {
    const padding = 8 / scale;
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "#2d573e";
    ctx.lineWidth = 3 / scale;
    ctx.setLineDash([7 / scale, 5 / scale]);
    ctx.strokeRect(x - padding, y - padding, width + padding * 2, height + padding * 2);
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
  if (state.layers && (!state.frosted || (!photo && tab === "build"))) {
    paintStack(ctx);
    return;
  }
  const exactSample = state.preset && ((!erasing && !resizingFruit) || photo) &&
    state.base === "vanilla" && Math.abs(Math.sin(displayAngle / 2)) < .0005;
  const showOriginalBag = !photo && !hover && tab === "icing";
  const background = exactSample ? (showOriginalBag ? art.opening : art.sample) :
    state.layers ? frostedStage() : art.plain;
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  if (!exactSample) paintBase(ctx);
  for (const entry of orderedMarks(!exactSample)) drawMark(ctx, entry, true, !photo && entry.mark === selectedFruit);
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
    if (erasing || resizingFruit) {
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
  const depth = (y - center.y - radius.y * Math.sin(angle)) / cakeSideHeight();
  if (depth < -.045 || depth > 1.02) return null;
  return { face: "side", angle: angle - displayAngle, distance: Math.max(.035, Math.min(depth, activeTool === "swag" ? .77 : .96)) };
}

function place(x, y) {
  const mark = locate(x, y);
  if (!mark || state.marks.length >= 1500) return false;
  beginEdit();
  const entry = { ...mark, tool: activeTool, color: activeColor };
  if (isFruit(activeTool) && newFruitSize !== defaultFruitSize) entry.fruitSize = newFruitSize;
  state.marks.push(entry);
  return true;
}

function beginEdit() {
  if (!pointer?.changed) {
    saveUndo();
    if (pointer) pointer.changed = true;
  }
}

function hitMark(x, y, fruitOnly = false) {
  const diameter = hitCanvas.width;
  const centerAlpha = (eraserRadius * diameter + eraserRadius) * 4 + 3;
  let closest = null;
  let bestDistance = eraserRadius ** 2 + 1;
  for (const entry of orderedMarks(true).reverse()) {
    if (fruitOnly && !isFruit(entry.mark.tool)) continue;
    // Include curved swags, tall candles, and fruit enlarged to 160%.
    if (Math.abs(entry.point.x - x) > 145 || Math.abs(entry.point.y - y) > 185) continue;
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

function editableMarkIndex(mark) {
  const index = state.marks.indexOf(mark);
  if (index >= 0 || !state.preset) return index;
  state.marks = [...starter, ...state.marks];
  state.preset = false;
  return starter.indexOf(mark);
}

function erase(x, y) {
  const mark = hitMark(x, y);
  if (!mark) return false;
  beginEdit();
  state.marks.splice(editableMarkIndex(mark), 1);
  return true;
}

function selectFruit(x, y) {
  selectedFruit = hitMark(x, y, true);
  fruitResizeStarted = false;
  hover = null;
  updateTray();
  render();
}

function setFruitSize(size) {
  if (!resizingFruit) {
    newFruitSize = size;
  } else if (selectedFruit && size !== fruitSizePercent(selectedFruit)) {
    if (!fruitResizeStarted) saveUndo();
    fruitResizeStarted = true;
    const index = editableMarkIndex(selectedFruit);
    selectedFruit = { ...selectedFruit, fruitSize: size };
    state.marks[index] = selectedFruit;
    persist();
    render();
  }
  updateFruitSizeControls();
}

function canDecorate() {
  return ready && gift.hidden && (erasing || tab === "icing" || tab === "topping");
}

canvas.addEventListener("pointerdown", event => {
  if (!canDecorate() || pointer || event.button !== 0) return;
  const { x, y } = pointerPoint(event);
  if (resizingFruit) {
    selectFruit(x, y);
    return;
  }
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
  const nextHover = erasing || resizingFruit || (tab === "icing" && locate(x, y)) ? { x, y } : null;
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
  if ((erasing || resizingFruit) && direction) {
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
  if (resizingFruit) {
    const point = hover ?? center;
    selectFruit(point.x, point.y);
    return;
  } else if (erasing) {
    const point = hover ?? center;
    erase(point.x, point.y);
  } else {
    place(center.x, center.y + (activeTool === "swag" ? 255 : -28));
  }
  persist();
  render();
});

function rotate() {
  if (pointer || !ready || tab === "build") return;
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

function updateFruitSizeControls() {
  const size = resizingFruit && selectedFruit ? fruitSizePercent(selectedFruit) : newFruitSize;
  const label = size + "%";
  byId("fruit-size-controls").hidden = tab !== "topping";
  resizeFruitButton.setAttribute("aria-pressed", resizingFruit);
  fruitSizeInput.disabled = !ready || erasing || (resizingFruit ? !selectedFruit : !isFruit(activeTool));
  fruitSizeInput.value = size;
  fruitSizeInput.setAttribute("aria-valuetext", label);
  fruitSizeOutput.value = label;
}

function updateAssembly() {
  const layers = state.layers;
  const count = layers?.length ?? 0;
  const kind = layerKind(count);
  const full = count >= maxSponges * 2 - 1;
  const choosing = Boolean(layers && !state.frosted && !full);
  const title = !layers ? "从蛋糕胚做一只新蛋糕" :
    state.frosted ? "从底到顶的夹层" : full ? "蛋糕胚叠好了" :
    count === 0 ? "选第一层蛋糕体" : kind === "filling" ? "给这一层铺上夹心" : "再叠一层蛋糕体";
  byId("assembly-title").textContent = title;
  byId("layer-count").textContent = layers ?
    Math.ceil(count / 2) + " 层蛋糕体 · " + Math.floor(count / 2) + " 层夹心" : "";
  const choosingFilling = choosing && kind === "filling";
  const choices = byId("layer-choices");
  choices.hidden = !choosing;
  byId("filling-groups").hidden = !choosingFilling;
  for (const [group, button] of fillingGroupButtons) {
    button.setAttribute("aria-pressed", group === fillingGroup);
    button.disabled = !ready;
  }
  let visibleChoices = 0;
  for (const [id, button] of layerButtons) {
    const flavor = layerFlavors[id];
    const visible = flavor.kind === kind && (!choosingFilling || flavor.group === fillingGroup);
    button.hidden = !visible;
    button.disabled = !ready;
    if (visible) visibleChoices++;
  }
  choices.style.setProperty("--flavor-columns", visibleChoices);
  const entries = (layers ?? []).map((id, index) => {
    const li = document.createElement("li");
    li.dataset.kind = layerFlavors[id].kind;
    li.textContent = (index + 1) + ". " + layerFlavors[id].name;
    return li;
  });
  byId("layer-stack").replaceChildren(...entries);
  byId("layer-stack").hidden = !count;
  byId("remove-layer").hidden = !count || state.frosted;
  const finish = byId("finish-assembly");
  finish.textContent = !layers ? "开始叠蛋糕胚" : state.frosted ? "继续装饰" : "叠好了，去抹奶油";
  finish.disabled = !ready || Boolean(layers && !canFinishLayers(layers));
  if (!layers) return "点开始，就可以选第一层蛋糕体。";
  if (state.frosted) return "这是你亲手叠的夹层。切回奶油、裱花或装饰，就能继续做。";
  if (full) return "已经叠了四层蛋糕体，可以抹奶油了。";
  if (canFinishLayers(layers)) return "现在可以抹奶油，也可以继续加夹心和蛋糕体。";
  return "蛋糕体和夹心交替叠，最上面放一层蛋糕体。";
}

function updateTray() {
  eraserButton.setAttribute("aria-pressed", erasing);
  eraserButton.disabled = !ready || tab === "build";
  byId("rotate").disabled = !ready || tab === "build";
  canvas.classList.toggle("is-erasing", erasing);
  canvas.classList.toggle("is-resizing", resizingFruit);
  document.querySelectorAll(".tabs button").forEach(button => {
    button.setAttribute("aria-pressed", button.dataset.tab === tab);
    button.disabled = Boolean(state.layers && !state.frosted && button.dataset.tab !== "build");
  });
  const choices = catalog[tab];
  const currentPage = pages[tab];
  const pageCount = choices ? Math.ceil(choices.length / pageSize) : 0;
  const visibleTools = choices?.slice(currentPage * pageSize, (currentPage + 1) * pageSize) ?? [];
  for (const [key, button] of toolButtons) {
    button.hidden = !visibleTools.includes(key);
    button.setAttribute("aria-pressed", !erasing && !resizingFruit && key === activeTool);
  }
  for (const [key, button] of baseButtons) {
    button.hidden = tab !== "base";
    button.setAttribute("aria-pressed", key === state.base);
  }
  for (const [key, button] of swatches) button.setAttribute("aria-pressed", key === activeColor);
  byId("tools").hidden = tab === "packing" || tab === "build";
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
  byId("assembly").hidden = tab !== "build";
  updateFruitSizeControls();
  hint.textContent = tab === "build" ? updateAssembly() :
    erasing ? "点击擦掉一个装饰，按住拖动可连续擦除。" :
    resizingFruit ? (selectedFruit ? "已选" + tools[selectedFruit.tool].name + "，拖动滑块调整大小。" :
      "点一下蛋糕上要调整的水果，再拖动滑块。") :
    tab === "packing" ? "写好祝福，就可以盖上蛋糕盒。" :
    tab === "base" ? "选一种颜色，给整只蛋糕抹上奶油。" :
    tools[activeTool].hint ?? "点一下蛋糕顶部，放上" + tools[activeTool].name + "。";
}

function setEditMode(mode) {
  erasing = mode === "erase";
  resizingFruit = mode === "resize";
  selectedFruit = null;
  fruitResizeStarted = false;
  hover = null;
  updateTray();
  render();
}

function switchTab(next) {
  if (pointer || (state.layers && !state.frosted && next !== "build")) return;
  closeGift();
  tab = next;
  if (selectedTools[tab]) activeTool = selectedTools[tab];
  setEditMode("place");
}

function stamp(name, artwork, onClick, tray = byId("tools")) {
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
  tray.append(button);
  return button;
}

const toolButtons = new Map();
const baseButtons = new Map();
const swatches = new Map();
const layerButtons = new Map();
const fillingGroupButtons = new Map();
for (const [key, tool] of Object.entries(tools)) {
  toolButtons.set(key, stamp(tool.name, key, () => {
    if (pointer) return;
    activeTool = key;
    selectedTools[tab] = key;
    if (tab === "icing" && !customIcingColor) activeColor = tool.defaultColor ?? tool.color ?? "vanilla";
    setEditMode("place");
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
    setEditMode("place");
  });
  byId("colors").append(button);
  swatches.set(key, button);
}
for (const [id, flavor] of Object.entries(layerFlavors)) {
  layerButtons.set(id, stamp(flavor.name, null, () => addLayer(id), byId("layer-choices")));
}
for (const [group, name] of Object.entries(fillingGroups)) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = name;
  button.addEventListener("click", () => {
    fillingGroup = group;
    updateTray();
  });
  byId("filling-groups").append(button);
  fillingGroupButtons.set(group, button);
}
const fillingCount = Object.values(layerFlavors).filter(flavor => flavor.kind === "filling").length;
byId("filling-total").textContent = fillingCount + " 种夹心";

function addLayer(id) {
  const layers = state.layers;
  if (!ready || !layers || state.frosted || layers.length >= maxSponges * 2 - 1 ||
    layerFlavors[id].kind !== layerKind(layers.length)) return;
  saveUndo();
  state.layers = [...layers, id];
  persist();
  updateTray();
  render();
  byId("assembly-title").focus({ preventScroll: true });
}

function removeTopLayer() {
  if (!state.layers?.length || state.frosted) return;
  saveUndo();
  state.layers = state.layers.slice(0, -1);
  persist();
  updateTray();
  render();
  byId("assembly-title").focus({ preventScroll: true });
}

function finishAssembly() {
  if (!ready || pointer) return;
  if (!state.layers) {
    replaceCake(false);
  } else if (state.frosted) {
    switchTab("icing");
  } else if (canFinishLayers(state.layers)) {
    saveUndo();
    state.frosted = true;
    persist();
    switchTab("base");
  }
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
  state = withSample ? sampleCake() : blankCake();
  displayAngle = state.angle;
  messageInput.value = state.message;
  hover = null;
  selectedTools.icing = "shell";
  selectedTools.topping = "cherry";
  pages.icing = 0;
  pages.topping = 0;
  activeColor = "vanilla";
  customIcingColor = false;
  newFruitSize = defaultFruitSize;
  switchTab(withSample ? "icing" : "build");
  persist();
  byId("notice").textContent = withSample ? "复古样款已恢复。" : "蛋糕转台准备好了。";
}

function closeGift() {
  gift.hidden = true;
}

function savePhoto() {
  if (!ready) return;
  const photoTop = 173 - Math.max(0, cakeSideHeight() - originalSideHeight);
  const frame = document.createElement("canvas");
  frame.width = canvas.width;
  frame.height = canvas.height - photoTop;
  const ctx = frame.getContext("2d");
  ctx.translate(0, -photoTop);
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
  setEditMode(erasing ? "place" : "erase");
});
resizeFruitButton.addEventListener("click", () => {
  if (pointer || !ready) return;
  setEditMode(resizingFruit ? "place" : "resize");
});
fruitSizeInput.addEventListener("input", () => setFruitSize(fruitSizeInput.valueAsNumber));
for (const event of ["change", "blur", "pointerdown"]) {
  fruitSizeInput.addEventListener(event, () => { fruitResizeStarted = false; });
}
byId("rotate").addEventListener("click", rotate);
byId("reset").addEventListener("click", () => replaceCake(false));
byId("sample").addEventListener("click", () => replaceCake(true));
byId("remove-layer").addEventListener("click", removeTopLayer);
byId("finish-assembly").addEventListener("click", finishAssembly);
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
    } else if (erasing || resizingFruit) {
      setEditMode("place");
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
  setEditMode("place");
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
  for (const [key, button] of baseButtons) paintThumb(button, sprite("rose", key));
  for (const [id, button] of layerButtons) paintThumb(button, layerImage(id));
  ready = true;
  updateTray();
  render();
}).catch(() => {
  hint.textContent = "蛋糕素材未加载，请刷新页面。";
});

function paintThumb(button, source) {
  const icon = button.querySelector("canvas");
  const scale = Math.min(83 / source.width, 65 / source.height);
  const width = source.width * scale;
  const height = source.height * scale;
  icon.getContext("2d").drawImage(source, (icon.width - width) / 2, (icon.height - height) / 2, width, height);
}
