"use strict";

const sliceCounts = [6, 8];
const sampleSliceLayers = ["vanillaSponge", "strawberryCream", "vanillaSponge", "strawberryCream", "vanillaSponge"];
const sliceBoxes = {
  window: { name: "透明三角盒", fill: "#fffae6", edge: "#8b6c4a" },
  kraft: { name: "牛皮纸窗盒", fill: "#bc8850", edge: "#744723" },
  rose: { name: "莓果粉窗盒", fill: "#e5a3a3", edge: "#954b50" }
};
const sliceStatus = { ready: "待装盒", packed: "已装盒", sold: "已售出" };

function readServing(serving) {
  if (!Array.isArray(serving?.pieces) || !sliceCounts.includes(serving.pieces.length) || !Number.isFinite(serving.angle)) return null;
  if (serving.pieces.some(piece => !piece || !Object.hasOwn(sliceStatus, piece.status) ||
    !Object.hasOwn(sliceBoxes, piece.box) || (piece.status === "sold" &&
      (!Number.isInteger(piece.cents) || piece.cents < 1 || piece.cents > 99999)))) return null;
  return serving;
}

function slicePoint(geometry, angle, distance = 1, depth = 0) {
  const { x, y, rx, ry, height } = geometry;
  return [x + Math.cos(angle) * rx * distance, y + Math.sin(angle) * ry * distance + height * depth];
}

function sliceTop(geometry, start, end) {
  const { x, y, rx, ry } = geometry;
  const path = new Path2D();
  path.moveTo(x, y);
  path.ellipse(x, y, rx, ry, 0, start, end);
  path.closePath();
  return path;
}

function sliceOuter(geometry, start, end) {
  const { x, y, rx, ry, height } = geometry;
  const path = new Path2D();
  path.ellipse(x, y, rx, ry, 0, start, end);
  path.ellipse(x, y + height, rx, ry, 0, end, start, true);
  path.closePath();
  return path;
}

function paintSliceFace(ctx, geometry, angle, layers, cream, dark) {
  const [edgeX, edgeY] = slicePoint(geometry, angle);
  const { x, y, height } = geometry;
  const width = 300;
  const lip = height * .055;
  ctx.save();
  ctx.transform((edgeX - x) / width, (edgeY - y) / width, 0, 1, x, y);
  ctx.fillStyle = cream;
  ctx.fillRect(0, 0, width, height);
  const total = layers.reduce((sum, id) => sum + (layerFlavors[id].kind === "sponge" ? spongeHeight : fillingHeight), 0);
  const interior = height - lip * 2;
  let row = height - lip;
  for (const id of layers) {
    const isSponge = layerFlavors[id].kind === "sponge";
    const layerHeight = interior * (isSponge ? spongeHeight : fillingHeight) / total;
    row -= layerHeight;
    const texture = layerImage(id);
    ctx.drawImage(texture, texture.width * .2, texture.height * .21, texture.width * .6,
      texture.height * (isSponge ? .21 : .24), 0, row, width, layerHeight + .45);
    const seam = ctx.createLinearGradient(0, row, 0, row + layerHeight);
    seam.addColorStop(0, "#55331835");
    seam.addColorStop(.17, "#fff2c51c");
    seam.addColorStop(.74, "#fff2c500");
    seam.addColorStop(1, "#52301940");
    ctx.fillStyle = seam;
    ctx.fillRect(0, row, width, layerHeight);
  }
  const shade = ctx.createLinearGradient(0, 0, width, 0);
  shade.addColorStop(0, dark ? "#482e2227" : "#55341b17");
  shade.addColorStop(.78, dark ? "#482e221c" : "#fff6df00");
  shade.addColorStop(1, dark ? "#482e2260" : "#54301c35");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function paintPortion(ctx, geometry, start, end, { layers, cream, coat, marks, surface, inscription, selected = false }) {
  for (let turn = Math.floor(start / tau); turn <= Math.floor(end / tau); turn++) {
    const frontStart = Math.max(start, turn * tau);
    const frontEnd = Math.min(end, turn * tau + Math.PI);
    if (frontStart >= frontEnd) continue;
    const outer = sliceOuter(geometry, frontStart, frontEnd);
    const shade = ctx.createLinearGradient(geometry.x - geometry.rx, 0, geometry.x + geometry.rx, 0);
    shade.addColorStop(0, coat);
    shade.addColorStop(.36, cream);
    shade.addColorStop(1, coat);
    ctx.fillStyle = shade;
    ctx.fill(outer);
    if (surface) surface(outer);
  }
  if (Math.cos(start) < -.005) paintSliceFace(ctx, geometry, start, layers, cream, false);
  if (Math.cos(end) > .005) paintSliceFace(ctx, geometry, end, layers, cream, true);

  const top = sliceTop(geometry, start, end);
  const glaze = ctx.createLinearGradient(geometry.x - geometry.rx, geometry.y - geometry.ry, geometry.x + geometry.rx, geometry.y + geometry.ry);
  glaze.addColorStop(0, "#fff1d8");
  glaze.addColorStop(.32, cream);
  glaze.addColorStop(1, coat);
  ctx.fillStyle = glaze;
  ctx.fill(top);
  if (surface) surface(top);
  if (inscription) inscription(top);
  ctx.strokeStyle = selected ? "#ffecb8" : "#f6dfb999";
  ctx.lineWidth = selected ? 3.5 : 1.4;
  ctx.stroke(top);
  marks();
}

function sliceRange(index) {
  const step = tau / state.serving.pieces.length;
  const start = Math.PI / 2 - step / 2 + index * step;
  return [start, start + step];
}

function sliceMarkGroups() {
  const { pieces } = state.serving;
  const groups = pieces.map(() => []);
  const [start] = sliceRange(0);
  for (const entry of orderedMarks(true, state.serving.angle)) {
    const index = Math.floor(wrapped(entry.angle - start) / tau * pieces.length);
    groups[index].push(entry);
  }
  return groups;
}

function counterPortions() {
  return state.serving.pieces.map((piece, index) => {
    const [start, end] = sliceRange(index);
    const middle = (start + end) / 2;
    const distance = index === selectedSlice ? 23 : 10;
    return {
      index, start, end, depth: Math.sin(middle), visible: piece.status === "ready",
      geometry: { x: center.x + Math.cos(middle) * distance, y: center.y + Math.sin(middle) * distance * .52,
        rx: radius.x, ry: radius.y, height: cakeSideHeight() }
    };
  }).filter(piece => piece.visible).sort((a, b) => a.depth - b.depth);
}

function slicedCakeLayers() {
  return state.layers ?? sampleSliceLayers;
}

function cutCakeStyle() {
  return { layers: slicedCakeLayers(), cream: colors[state.base].tint, coat: colors[state.base].tint + "c0" };
}

function paintCutCake(ctx) {
  ctx.drawImage(art.workbench, 0, 0, canvas.width, canvas.height);
  const groups = sliceMarkGroups();
  const design = cutCakeStyle();
  const frosting = frostedStage();
  const visible = counterPortions();
  for (const { index, start, end, geometry } of visible) {
    const dx = geometry.x - center.x;
    const dy = geometry.y - center.y;
    paintPortion(ctx, geometry, start, end, {
      ...design,
      selected: index === selectedSlice,
      surface(path) {
        ctx.save();
        ctx.clip(path);
        ctx.translate(dx, dy);
        ctx.drawImage(frosting, 0, 0);
        if (state.base !== "vanilla") paintBase(ctx);
        ctx.restore();
      },
      inscription(path) {
        ctx.save();
        ctx.clip(path);
        ctx.translate(dx, dy);
        paintMessage(ctx);
        ctx.restore();
      },
      marks() {
        ctx.save();
        ctx.translate(dx, dy);
        for (const entry of groups[index]) drawMark(ctx, entry);
        ctx.restore();
      }
    });
  }
  if (!visible.length) {
    ctx.save();
    ctx.fillStyle = "#fff2d3";
    ctx.strokeStyle = "#ae845c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(351, 616, 371, 85, 15);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 29px "Noto Serif SC", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#63402b";
    ctx.fillText("转台上的蛋糕已全部装盒", 536, 659);
    ctx.restore();
  }
}

function paintSliceBox(ctx, geometry, start, end, box, drawPiece) {
  const { fill, edge } = sliceBoxes[box];
  const { x, y, height } = geometry;
  const [leftX, leftY] = slicePoint(geometry, start);
  const [rightX, rightY] = slicePoint(geometry, end);
  const floor = [[leftX - 26, leftY + height - 16], [rightX + 26, rightY + height - 16], [x + 9, y + height + 36], [x - 9, y + height + 36]];
  const roof = floor.map(([px, py]) => [px, py - height - 65]);
  const floorFront = [floor[0], floor[3], floor[2], floor[1]];
  const roofFront = [roof[0], roof[3], roof[2], roof[1]];
  const front = boxPath([...roofFront, ...floorFront.slice().reverse()]);
  const lid = boxPath(roof);
  ctx.save();
  ctx.lineJoin = "round";
  ctx.fillStyle = fill;
  ctx.strokeStyle = edge;
  ctx.lineWidth = 3;
  ctx.fill(boxPath(floor));
  ctx.stroke(boxPath(floor));
  drawPiece();
  const shine = ctx.createLinearGradient(leftX, 0, rightX, 0);
  shine.addColorStop(0, fill + "38");
  shine.addColorStop(.24, "#ffffff35");
  shine.addColorStop(.46, "#fff9e50b");
  shine.addColorStop(.88, fill + "36");
  shine.addColorStop(1, fill + "56");
  ctx.fillStyle = shine;
  ctx.fill(front);
  ctx.strokeStyle = edge + "9c";
  ctx.lineWidth = 2;
  ctx.stroke(front);
  ctx.fill(lid);
  ctx.stroke(lid);
  ctx.strokeStyle = "#fffbecdd";
  ctx.stroke(boxPath(roofFront.map(([px, py]) => [px, py + 4]), false));
  ctx.strokeStyle = box === "window" ? "#f7e5caba" : fill;
  ctx.lineWidth = box === "window" ? 4 : 11;
  ctx.stroke(boxPath(floorFront, false));
  ctx.stroke(boxPath(roof, true));
  ctx.restore();
}

function paintSlicePreview() {
  const preview = byId("slice-preview");
  const ctx = preview.getContext("2d");
  const piece = state.serving.pieces[selectedSlice];
  const [originalStart, originalEnd] = sliceRange(selectedSlice);
  const step = originalEnd - originalStart;
  const middle = Math.PI * 1.5 - .11;
  const start = middle - step / 2;
  const end = middle + step / 2;
  const height = cakeSideHeight() * .34;
  const geometry = { x: 375, y: 307 - height, rx: 380 * (Math.PI / 3) / step, ry: 82, height };
  const background = ctx.createLinearGradient(0, 0, 0, preview.height);
  background.addColorStop(0, "#fff1d4");
  background.addColorStop(.65, "#f4dbb2");
  background.addColorStop(1, "#ddbb93");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, preview.width, preview.height);
  ctx.save();
  ctx.shadowColor = "#6f422c38";
  ctx.shadowBlur = 21;
  ctx.shadowOffsetY = 11;
  ctx.beginPath();
  ctx.ellipse(340, 297, 248, 65, 0, 0, tau);
  ctx.fillStyle = "#fff6de";
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#d3a477";
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(340, 297, 228, 53, 0, 0, tau);
  ctx.strokeStyle = "#ddc5a2";
  ctx.stroke();
  ctx.restore();

  const entries = sliceMarkGroups()[selectedSlice].map(({ mark, angle }) => {
    const adjusted = angle + start - originalStart;
    const [x, y] = mark.face === "top" ? slicePoint(geometry, adjusted, mark.distance) :
      slicePoint(geometry, adjusted, 1, mark.distance);
    return { mark, angle: adjusted, point: { x, y } };
  }).sort((a, b) => a.point.y - b.point.y);
  const drawPiece = () => paintPortion(ctx, geometry, start, end, {
    ...cutCakeStyle(),
    marks() {
      for (const entry of entries) {
        if (entry.mark.face !== "top") continue;
        const scale = .66;
        ctx.save();
        ctx.translate(entry.point.x * (1 - scale), entry.point.y * (1 - scale));
        ctx.scale(scale, scale);
        drawMark(ctx, entry);
        ctx.restore();
      }
    }
  });
  if (piece.status === "ready") drawPiece();
  else paintSliceBox(ctx, geometry, start, end, piece.box, drawPiece);
}

let selectedSlice = 0;

function slicePrice(cents) {
  return "¥" + (cents / 100).toFixed(2);
}

function updateSliceCounter() {
  byId("slice-setup").hidden = Boolean(state.serving);
  byId("slice-counter").hidden = !state.serving;
  byId("cut-cake").disabled = !ready;
  if (!state.serving) return;

  const { pieces } = state.serving;
  const choices = byId("slice-pieces");
  if (choices.children.length !== pieces.length) {
    choices.replaceChildren(...pieces.map((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.addEventListener("click", () => selectSlice(index));
      return button;
    }));
  }
  selectedSlice = Math.min(selectedSlice, pieces.length - 1);
  let packed = 0;
  let sold = 0;
  let cents = 0;
  for (const [index, piece] of pieces.entries()) {
    if (piece.status === "packed") packed++;
    if (piece.status === "sold") {
      sold++;
      cents += piece.cents;
    }
    const button = choices.children[index];
    button.textContent = (index + 1) + " · " + sliceStatus[piece.status];
    button.dataset.status = piece.status;
    button.setAttribute("aria-pressed", index === selectedSlice);
  }

  const piece = pieces[selectedSlice];
  const title = "第 " + (selectedSlice + 1) + " 块 · " + sliceStatus[piece.status];
  const layers = "从上到下 · " + slicedCakeLayers().slice().reverse().map(id => layerFlavors[id].name).join(" / ");
  byId("slice-totals").textContent = "待装 " + (pieces.length - packed - sold) + " · 已装 " + packed +
    " · 已售 " + sold + " · 收入 " + slicePrice(cents);
  byId("slice-title").textContent = title;
  byId("slice-layers").textContent = layers;
  byId("slice-preview").setAttribute("aria-label", title + "。切面" + layers);
  const receipt = byId("slice-receipt");
  receipt.hidden = piece.status !== "sold";
  receipt.textContent = piece.status === "sold" ? "已成交 " + slicePrice(piece.cents) + " · " + sliceBoxes[piece.box].name : "";
  byId("slice-box").value = piece.box;
  byId("slice-box-label").hidden = piece.status !== "ready";
  byId("pack-slice").hidden = piece.status !== "ready";
  byId("pack-slice").disabled = !ready;
  byId("slice-price-label").hidden = piece.status !== "packed";
  byId("sell-slice").hidden = piece.status !== "packed";
  byId("sell-slice").disabled = !ready;
}

function selectSlice(index) {
  selectedSlice = index;
  updateSliceCounter();
  render();
}

function changeSlice(piece, announcement) {
  saveUndo();
  const pieces = state.serving.pieces.slice();
  pieces[selectedSlice] = piece;
  state.serving = { ...state.serving, pieces };
  persist();
  updateSliceCounter();
  render();
  byId("notice").textContent = announcement;
}

function installSliceCounter() {
  const box = byId("slice-box");
  for (const [id, { name }] of Object.entries(sliceBoxes)) box.add(new Option(name, id));
  byId("cut-cake").addEventListener("click", () => {
    const count = Number(byId("slice-count").value);
    if (!ready || state.serving || (state.layers && !state.frosted) || !sliceCounts.includes(count)) return;
    cancelAnimationFrame(rotationFrame);
    displayAngle = state.angle;
    saveUndo();
    state.serving = {
      angle: displayAngle,
      pieces: Array.from({ length: count }, () => ({ status: "ready", box: "window" }))
    };
    selectedSlice = 0;
    persist();
    updateTray();
    render();
    byId("slice-pieces").firstElementChild.focus({ preventScroll: true });
  });
  byId("pack-slice").addEventListener("click", () => {
    const piece = state.serving?.pieces[selectedSlice];
    if (!ready || piece?.status !== "ready" || !Object.hasOwn(sliceBoxes, box.value)) return;
    changeSlice({ status: "packed", box: box.value }, "已装好第 " + (selectedSlice + 1) + " 块。");
    byId("slice-price").focus({ preventScroll: true });
  });
  byId("sell-slice").addEventListener("click", () => {
    const piece = state.serving?.pieces[selectedSlice];
    if (!ready || piece?.status !== "packed") return;
    const input = byId("slice-price");
    if (!input.reportValidity()) return;
    const cents = Math.round(input.valueAsNumber * 100);
    changeSlice({ ...piece, status: "sold", cents }, "第 " + (selectedSlice + 1) + " 块已售出 " + slicePrice(cents));
    byId("slice-pieces").children[selectedSlice].focus({ preventScroll: true });
  });
  canvas.addEventListener("click", event => {
    if (!ready || !state.serving) return;
    const { x, y } = pointerPoint(event);
    const hit = counterPortions().reverse().find(({ geometry, start, end }) =>
      context.isPointInPath(sliceTop(geometry, start, end), x, y));
    if (hit) selectSlice(hit.index);
  });
}
