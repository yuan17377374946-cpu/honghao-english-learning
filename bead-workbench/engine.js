"use strict";

const BeadEngine = (() => {
  const colors = [
    ["雪白","FFFFFF"],["奶油白","FFF3DB"],["浅米","EEDBC3"],["浅灰","E3E5E9"],["银灰","B8C0CD"],["冷灰","9299AA"],["深灰","535968"],["炭黑","262638"],
    ["浅粉","FFDDE6"],["樱花粉","FCB6CE"],["桃粉","F993AC"],["玫红","E6548B"],["莓果红","C63F66"],["酒红","842B49"],
    ["浅珊瑚","FFA095"],["珊瑚红","F87B70"],["番茄红","ED5A58"],["朱红","DA4149"],["深红","A83142"],["栗红","642D3A"],
    ["浅杏","FFD1A7"],["杏橙","FFB47C"],["蜜橙","F9904F"],["焦橙","DF6D34"],["砖橙","AF513C"],
    ["浅奶黄","FFF1B1"],["柠檬黄","FFEB71"],["金黄","FFD15F"],["芥末黄","D9A540"],
    ["浅豆绿","DBECA9"],["嫩芽绿","B5DC79"],["草绿","86BB65"],["叶绿","609D59"],["松叶绿","3E7754"],["深松绿","285345"],
    ["浅薄荷","CBF2E4"],["薄荷绿","A2DFC8"],["浅青","71CABE"],["湖绿","50ABAA"],["深青","347D87"],["墨青","295460"],
    ["冰蓝","D8EAFF"],["雾蓝","B9D5F4"],["浅天蓝","91C3F1"],["晴空蓝","6EA8EB"],["海蓝","4F84D7"],["钴蓝","3C65B5"],["藏蓝","324978"],["夜蓝","253454"],
    ["淡紫","EDE2FF"],["浅薰衣草","D8C4F4"],["薰衣草","BFA4E9"],["鸢尾紫","9E79CB"],["深紫","784EA3"],["葡萄紫","523973"],
    ["浅肤","F8DBCA"],["暖肤","F0BFA9"],["浅驼","D6AA88"],["驼色","BB8C69"],["棕色","9E6D53"],["咖啡","765044"],["深棕","4F3940"]
  ];

  function color(code, hex, name) {
    const rgb = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
    return { code, hex, name, rgb };
  }
  const catalog = colors.map(([name, hex], i) => color("P" + String(i + 1).padStart(2, "0"), "#" + hex, name));

  function parsePalette(text) {
    const rows = text.replace(/^\uFEFF/, "").trim().split(/\r?\n/).filter((line) => line.trim());
    const result = [];
    const used = new Set();
    rows.forEach((line, index) => {
      const [code = "", value = "", ...name] = line.split(/[,\t，]/).map((part) => part.trim().replace(/^"|"$/g, ""));
      if (index === 0 && /^(code|色号|编号)$/i.test(code) && /^(hex|色值|十六进制)$/i.test(value)) return;
      const hex = "#" + value.replace(/^#/, "").toUpperCase();
      if (!/^[a-z0-9][a-z0-9_-]{0,7}$/i.test(code) || !/^#[0-9A-F]{6}$/.test(hex)) {
        throw Error("第 " + (index + 1) + " 行格式有误。色号需为 1–8 位英数编号，HEX 需为六位色值。");
      }
      const key = code.toUpperCase();
      if (used.has(key)) throw Error("色号 " + code + " 重复，请保留一行。");
      used.add(key);
      result.push(color(code, hex, name.join(",").slice(0, 30) || "自定义色"));
    });
    if (result.length < 2 || result.length > 400) throw Error("请提供 2–400 种颜色。");
    return result;
  }

  function sizeFor(sourceWidth, sourceHeight, requestedWidth) {
    const width = Math.max(8, Math.min(120, Math.round(Number(requestedWidth) || 32)));
    const height = Math.max(1, Math.round(width * sourceHeight / sourceWidth));
    if (height <= 120) return [width, height];
    return [Math.max(1, Math.round(120 * sourceWidth / sourceHeight)), 120];
  }

  function distance(a, b) {
    const red = a[0] - b[0];
    const green = a[1] - b[1];
    const blue = a[2] - b[2];
    const redMean = (a[0] + b[0]) / 2;
    return (2 + redMean / 256) * red * red + 4 * green * green + (3 - redMean / 256) * blue * blue;
  }

  function closest(rgb, palette) {
    let winner = 0;
    let score = Infinity;
    for (let i = 0; i < palette.length; i++) {
      const next = distance(rgb, palette[i].rgb);
      if (next < score) {
        score = next;
        winner = i;
      }
    }
    return winner;
  }

  function foreground(data, width, height, removeBg) {
    const size = width * height;
    const keep = Uint8Array.from({length:size}, (_, i) => data[i * 4 + 3] >= 96 ? 1 : 0);
    if (!removeBg) return keep;

    const visited = new Uint8Array(size);
    const queue = new Int32Array(size);
    let tail = 0;
    function enqueue(i) {
      if (visited[i]) return;
      visited[i] = 1;
      const offset = i * 4;
      const min = Math.min(data[offset], data[offset + 1], data[offset + 2]);
      const max = Math.max(data[offset], data[offset + 1], data[offset + 2]);
      if (keep[i] && (min < 226 || max - min > 25)) return;
      keep[i] = 0;
      queue[tail++] = i;
    }
    for (let x = 0; x < width; x++) {
      enqueue(x);
      enqueue((height - 1) * width + x);
    }
    for (let y = 0; y < height; y++) {
      enqueue(y * width);
      enqueue(y * width + width - 1);
    }
    for (let head = 0; head < tail; head++) {
      const i = queue[head];
      if (i % width > 0) enqueue(i - 1);
      if (i % width < width - 1) enqueue(i + 1);
      if (i >= width) enqueue(i - width);
      if (i < size - width) enqueue(i + width);
    }
    return keep;
  }

  function chooseColors(data, keep, palette, limit) {
    const population = new Int32Array(palette.length);
    const memo = new Map();
    for (let i = 0; i < keep.length; i++) {
      if (!keep[i]) continue;
      const offset = i * 4;
      const rgb = [data[offset], data[offset + 1], data[offset + 2]];
      const key = rgb[0] * 65536 + rgb[1] * 256 + rgb[2];
      let match = memo.get(key);
      if (match === undefined) {
        match = closest(rgb, palette);
        memo.set(key, match);
      }
      population[match]++;
    }
    const candidates = palette.map((entry, index) => ({...entry, count:population[index]}))
      .filter((entry) => entry.count).sort((a, b) => b.count - a.count);
    if (candidates.length <= limit) return candidates;

    // Prefer frequently used colors while keeping distinct accents and outlines.
    const selected = [candidates.shift()];
    while (selected.length < limit) {
      let winner = 0;
      let best = -1;
      candidates.forEach((entry, index) => {
        const separation = distance(entry.rgb, selected[closest(entry.rgb, selected)].rgb);
        const score = Math.sqrt(entry.count) * separation;
        if (score > best) {
          best = score;
          winner = index;
        }
      });
      selected.push(candidates.splice(winner, 1)[0]);
    }
    return selected;
  }

  function convert(data, width, height, palette, limit, options = {}) {
    const keep = foreground(data, width, height, options.removeBg);
    const chosen = chooseColors(data, keep, palette, limit);
    const cells = new Int16Array(width * height).fill(-1);
    if (!chosen.length) return { width, height, palette:chosen, cells };

    const work = options.dither ? new Float32Array(data) : data;
    function spread(x, y, error, amount) {
      if (x < 0 || x >= width || y >= height || !keep[y * width + x]) return;
      const offset = (y * width + x) * 4;
      for (let k = 0; k < 3; k++) work[offset + k] += error[k] * amount / 16;
    }
    for (let i = 0; i < cells.length; i++) {
      if (!keep[i]) continue;
      const offset = i * 4;
      const rgb = [0, 1, 2].map((k) => Math.max(0, Math.min(255, work[offset + k])));
      const index = closest(rgb, chosen);
      cells[i] = index;
      if (options.dither) {
        const error = rgb.map((value, k) => value - chosen[index].rgb[k]);
        const x = i % width;
        const y = Math.floor(i / width);
        spread(x + 1, y, error, 7);
        spread(x - 1, y + 1, error, 3);
        spread(x, y + 1, error, 5);
        spread(x + 1, y + 1, error, 1);
      }
    }
    return {width, height, palette:chosen, cells};
  }

  function countsFor(pattern) {
    const counts = new Uint16Array(pattern.palette.length);
    for (const cell of pattern.cells) if (cell >= 0) counts[cell]++;
    return counts;
  }

  return {catalog, parsePalette, sizeFor, convert, countsFor};
})();

if (typeof module !== "undefined") module.exports = BeadEngine;
