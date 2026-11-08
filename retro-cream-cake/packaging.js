"use strict";

const boxShapes = {
  round: {
    name: "圆筒盒", width: 395, depth: 198,
    rim: Array.from({ length: 64 }, (_, i) => {
      const angle = i * Math.PI / 32;
      return [Math.cos(angle), Math.sin(angle)];
    })
  },
  square: {
    name: "方盒", width: 416, depth: 183,
    rim: [[-.67,-1],[.96,-1],[1,-.88],[.77,.88],[.72,1],[-.95,1],[-1,.88],[-.73,-.88]]
  },
  heart: {
    name: "心形盒", width: 442, depth: 196,
    rim: [[0,-.87],[.18,-1.02],[.38,-1.15],[.58,-1.18],[.75,-1.1],[.89,-.91],
      [.98,-.65],[1,-.39],[.98,-.16],[.91,.07],[.78,.31],[.58,.56],[.35,.81],
      [.13,1.02],[.03,1.1],[-.03,1.1],[-.13,1.02],[-.35,.81],[-.58,.56],
      [-.78,.31],[-.91,.07],[-.98,-.16],[-1,-.39],[-.98,-.65],[-.89,-.91],
      [-.75,-1.1],[-.58,-1.18],[-.38,-1.15],[-.18,-1.02]]
  },
  hex: {
    name: "六角盒", width: 438, depth: 203,
    rim: [[-.54,-1],[.54,-1],[1,-.06],[.59,.94],[-.59,.94],[-1,-.06]]
  }
};

const boxMaterials = {
  clear: { name: "无色透明", color: "#f9edcf", edge: "#fff4dc", trim: "#dbc2a1", ink: "#6d5239" },
  pink: { name: "蜜桃粉", color: "#ec96ad", edge: "#ffe0e4", trim: "#d89ea6", ink: "#86464e" },
  amber: { name: "蜂蜜金", color: "#eda952", edge: "#ffe3ac", trim: "#dfa66b", ink: "#925820" },
  green: { name: "薄荷绿", color: "#8ac9ad", edge: "#d8ffe1", trim: "#a0bba1", ink: "#416c59" },
  purple: { name: "雾紫", color: "#b49dd7", edge: "#f1e7ff", trim: "#b3a1c5", ink: "#675074" },
  paper: { name: "奶油纸盒", color: "#ead4ab", edge: "#fff1cc", trim: "#e1c392", ink: "#a67150", paper: true }
};

const boxRibbons = {
  silk: { name: "豆沙缎带", asset: "ribbon-silk", light: "#eeb5a9", dark: "#994943" },
  gingham: { name: "红格纹", asset: "ribbon-gingham", light: "#dfaaa1", dark: "#9f3c37" },
  lace: { name: "奶油蕾丝", asset: "ribbon-lace", light: "#fff2d6", dark: "#ba9a75" },
  none: { name: "无丝带" }
};

const defaultPackaging = { shape: "round", material: "clear", ribbon: "silk" };

function boxPath(points, closed = true) {
  const path = new Path2D();
  path.moveTo(...points[0]);
  for (const point of points.slice(1)) path.lineTo(...point);
  if (closed) path.closePath();
  return path;
}

function paintPackaging(ctx, { shape, material, ribbon }, x, floor, roof, images) {
  const { rim, width, depth } = boxShapes[shape];
  const { color, edge, trim, ink, paper } = boxMaterials[material];
  const top = rim.map(([u, v]) => [x + width * u, roof + depth * v]);
  const right = rim.reduce((i, point, index) => point[0] > rim[i][0] ? index : i, 0);
  const left = rim.reduce((i, point, index) => point[0] < rim[i][0] ? index : i, 0);
  const front = [];
  for (let i = right; i !== left; i = (i + 1) % rim.length) front.push(top[i]);
  front.push(top[left]);
  const height = floor - roof;
  const atFloor = front.map(([px, py]) => [px, py + height]);
  const bottomEdge = atFloor.map(([px, py]) => [px, py + 24]);
  const lid = boxPath(top);
  const wall = boxPath([...front, ...atFloor.slice().reverse()]);
  const base = boxPath([...atFloor, ...bottomEdge.slice().reverse()]);
  const paint = (path, fill, stroke, lineWidth = 2) => {
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill(path);
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke(path);
    }
  };

  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  const lidShine = ctx.createLinearGradient(x - width, roof - depth, x + width, roof + depth);
  lidShine.addColorStop(0, paper ? edge : edge + "35");
  lidShine.addColorStop(.46, paper ? color : color + "24");
  lidShine.addColorStop(1, paper ? trim : edge + "2a");
  const wallShine = ctx.createLinearGradient(x - width, 0, x + width, 0);
  wallShine.addColorStop(0, paper ? trim : color + "43");
  wallShine.addColorStop(.22, paper ? color : edge + "1b");
  wallShine.addColorStop(.64, paper ? color : color + "24");
  wallShine.addColorStop(.86, paper ? trim : color + "40");
  wallShine.addColorStop(1, paper ? ink : edge + "55");

  paint(lid, lidShine, paper ? ink : edge + "af", 4);
  paint(wall, wallShine, paper ? ink : edge + "85", 3);
  if (paper) {
    if (images.box) {
      ctx.save();
      ctx.clip(boxPath([...top.slice(0, right + 1), ...atFloor, ...top.slice(left)]));
      ctx.globalAlpha = .32;
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(images.box, 132, 360, 84, 50, x - width, roof - depth * 1.2, width * 2, height + depth * 2.4);
      ctx.restore();
    }
    if (shape === "square" || shape === "hex") {
      const end = shape === "square" ? 2 : 1;
      paint(boxPath([...front.slice(0, end + 1), ...atFloor.slice(0, end + 1).reverse()]), ink + "25");
    }
    for (const offset of [10, 15]) {
      paint(boxPath(front.map(([px, py]) => [px, py + offset]), false), null, ink + "a0", 2);
    }
    paint(boxPath(top.map(([px, py]) => [x + (px - x) * .94, roof + (py - roof) * .89])), null, ink + "96", 2);
    paint(boxPath(top.map(([px, py]) => [x + (px - x) * .927, roof + (py - roof) * .868])), null, edge + "cf", 2);
  } else {
    const seamPoints = shape === "square" || shape === "hex" ?
      front.filter((_, i) => i === 0 || i === front.length - 1 || (shape === "square" && i === 2)) :
      [front[0], front.at(-1)];
    for (const [px, py] of seamPoints) {
      paint(boxPath([[px - 3, py + 3], [px - 3, py + height]], false), null, ink + "45", 6);
      paint(boxPath([[px + 1, py + 3], [px + 1, py + height]], false), null, edge + "ae", 2.5);
    }
    ctx.save();
    ctx.clip(wall);
    const shine = ctx.createLinearGradient(x - width, 0, x - width + 126, 0);
    shine.addColorStop(0, edge + "15");
    shine.addColorStop(.5, edge + "42");
    shine.addColorStop(1, edge + "00");
    paint(boxPath([
      [x - width + 27, roof - depth], [x - width + 113, roof - depth],
      [x - width + 155, floor + depth], [x - width + 82, floor + depth]
    ]), shine);
    ctx.restore();
    paint(boxPath(front.map(([px, py]) => [px, py + 8]), false), null, edge + "87", 2);
  }

  const baseFinish = ctx.createLinearGradient(x - width, 0, x + width, 0);
  baseFinish.addColorStop(0, ink);
  baseFinish.addColorStop(.24, trim);
  baseFinish.addColorStop(.58, edge);
  baseFinish.addColorStop(1, ink);
  paint(base, baseFinish, ink + "a4", 3);
  paint(boxPath(atFloor.map(([px, py]) => [px, py + 5]), false), null, edge + "e6", 2.5);
  paint(boxPath(bottomEdge.map(([px, py]) => [px, py - 4]), false), null, ink + "5c", 2);

  const { asset, light, dark } = boxRibbons[ribbon];
  if (asset && images[asset]) {
    const ribbonTop = front.map(([px, py]) => [px, py + 6]);
    const ribbonBottom = front.map(([px, py]) => [px, py + 22]);
    const band = ctx.createLinearGradient(x - width, 0, x + width, 0);
    band.addColorStop(0, dark);
    band.addColorStop(.23, light);
    band.addColorStop(.6, light);
    band.addColorStop(1, dark);
    paint(boxPath([...ribbonTop, ...ribbonBottom.slice().reverse()]), band, dark + "c0", 2);
    const stitching = boxPath(front.map(([px, py]) => [px, py + 10]), false);
    if (ribbon !== "silk") ctx.setLineDash([5, 4]);
    paint(stitching, null, "#fff4dc9e", 2);
    ctx.setLineDash([]);
    const segment = front.findIndex(([px]) => px <= x);
    const [x0, y0] = front[segment - 1];
    const [x1, y1] = front[segment];
    const frontY = y0 + (y1 - y0) * (x0 - x) / (x0 - x1);
    const bow = images[asset];
    const bowWidth = 181;
    const bowHeight = bowWidth * bow.height / bow.width;
    ctx.shadowColor = "#49251d50";
    ctx.shadowBlur = 7;
    ctx.shadowOffsetY = 4;
    ctx.drawImage(bow, x - bowWidth / 2, frontY + 14 - bowHeight * .43, bowWidth, bowHeight);
  }
  ctx.restore();
}
