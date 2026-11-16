"use strict";

const BeadFocus = (() => {
  const dialog = document.createElement("dialog");
  dialog.className = "focus-dialog";
  dialog.setAttribute("aria-labelledby", "focus-title");
  dialog.innerHTML = `
    <header class="dialog-heading"><h2 id="focus-title"></h2><button type="button" class="button outline" data-close>返回图纸</button></header>
    <div class="focus-controls">
      <label>高亮色号 <select data-color></select></label>
      <label>高亮区域 <select data-region></select></label>
      <label>格子大小 <select data-size><option value="20">小</option><option value="28">中</option><option value="39">大</option></select></label>
      <label class="focus-check"><input type="checkbox" data-hide> 隐去已拼</label>
    </div>
    <div class="focus-progress">
      <output data-progress aria-live="polite"></output>
      <progress data-meter value="0" max="100" aria-label="拼豆完成进度"></progress>
      <button type="button" class="button outline" data-complete disabled>标记当前范围</button>
      <button type="button" class="button outline" data-reset disabled>清空进度</button>
    </div>
    <p class="focus-help">点击格子标记已拼，再点一次可取消。高亮色号与区域可同时使用，进度保存在当前浏览器。</p>
    <div class="focus-scroll" tabindex="0" aria-label="拼豆网格"><canvas data-grid aria-label="拼豆图纸网格"></canvas></div>
    <div class="focus-colors" data-colors aria-label="用豆清单"></div>`;
  document.body.append(dialog);

  const pick = (name) => dialog.querySelector("[data-" + name + "]");
  const color = pick("color");
  const region = pick("region");
  const size = pick("size");
  const hide = pick("hide");
  const grid = pick("grid");
  const ctx = grid.getContext("2d");
  const canvasFrame = grid.parentElement;
  const block = 10;
  let current, storageKey, finished, tiles, counts, completedByColor;
  let total = 0;

  function patternKey(pattern) {
    let hash = 2166136261;
    for (const value of pattern.cells) hash = Math.imul(hash ^ (value + 1), 16777619);
    const palette = pattern.palette.map(item => item.code + item.hex).join(",");
    for (const character of palette) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
    return pattern.width + "x" + pattern.height + "-" + (hash >>> 0).toString(36);
  }

  function persist() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        done: [...finished], color:color.value, tile:region.value, size:size.value, hide:hide.checked
      }));
    } catch {}
  }

  function inScope(i) {
    if (current.cells[i] < 0 || (color.value && Number(color.value) !== current.cells[i])) return false;
    if (!region.value) return true;
    const tile = tiles[Number(region.value)];
    const x = i % current.width;
    const y = Math.floor(i / current.width);
    return x >= tile.x && x < tile.right && y >= tile.y && y < tile.bottom;
  }

  function draw() {
    const {width, height, palette, cells} = current;
    const step = Number(size.value);
    const canvasWidth = (width + 1) * step + 1;
    const canvasHeight = (height + 1) * step + 1;
    const scale = Math.min(devicePixelRatio || 1, 2, 4200 / Math.max(canvasWidth, canvasHeight));
    grid.width = Math.round(canvasWidth * scale);
    grid.height = Math.round(canvasHeight * scale);
    grid.style.width = canvasWidth + "px";
    grid.style.height = canvasHeight + "px";
    ctx.setTransform(grid.width / canvasWidth,0,0,grid.height / canvasHeight,0,0);
    ctx.fillStyle = "#fbeaf2";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < cells.length; i++) {
      const x = (i % width + 1) * step;
      const y = (Math.floor(i / width) + 1) * step;
      const entry = palette[cells[i]];
      const done = finished.has(i);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#fff";
      ctx.fillRect(x,y,step,step);
      if (!entry || (done && hide.checked)) continue;
      ctx.globalAlpha = inScope(i) ? (done ? .46 : 1) : .19;
      ctx.fillStyle = entry.hex;
      ctx.fillRect(x,y,step,step);
      const [r,g,b] = entry.rgb;
      ctx.fillStyle = (r * .299 + g * .587 + b * .114) > 146 ? "#251b22" : "#fff";
      ctx.font = "700 " + Math.min(17, step * .48) + "px system-ui,sans-serif";
      ctx.fillText(done ? "✓" : entry.code,x + step / 2,y + step / 2,step - 3);
    }
    ctx.globalAlpha = 1;
    for (const [extent, vertical] of [[width,true],[height,false]]) {
      for (let i = 0; i <= extent; i++) {
        ctx.strokeStyle = i % 5 === 0 ? "#a16e88" : "#e4c9d8";
        ctx.lineWidth = i % 5 === 0 ? 1.2 : .7;
        const p = (i + 1) * step + .5;
        ctx.beginPath();
        ctx.moveTo(vertical ? p : step, vertical ? step : p);
        ctx.lineTo(vertical ? p : canvasWidth, vertical ? canvasHeight : p);
        ctx.stroke();
        if (i === extent) continue;
        ctx.fillStyle = "#63445a";
        ctx.font = "600 11px system-ui,sans-serif";
        ctx.fillText(i + 1, vertical ? p + step / 2 : step / 2, vertical ? step / 2 : p + step / 2);
      }
    }
    if (region.value) {
      const tile = tiles[Number(region.value)];
      ctx.strokeStyle = "#a32f66";
      ctx.lineWidth = 2.5;
      ctx.strokeRect((tile.x + 1) * step,(tile.y + 1) * step,(tile.right - tile.x) * step,(tile.bottom - tile.y) * step);
    }
  }

  function refresh() {
    completedByColor.fill(0);
    for (const i of finished) completedByColor[current.cells[i]]++;
    const pct = total ? Math.round(finished.size / total * 100) : 0;
    pick("meter").value = pct;
    const scope = current.cells.reduce((count, _, i) => count + Number(inScope(i) && !finished.has(i)), 0);
    pick("progress").textContent = finished.size + " / " + total + " 颗已拼 · " + pct + "%" +
      ((color.value || region.value) ? " · 当前待拼 " + scope + " 颗" : "");
    pick("complete").disabled = !scope || (!region.value && !color.value);
    pick("reset").disabled = !finished.size;
    for (const button of pick("colors").querySelectorAll("button")) {
      const index = Number(button.value);
      button.setAttribute("aria-pressed",String(color.value === button.value));
      button.querySelector("span:last-child").textContent = current.palette[index].code + " " + completedByColor[index] + "/" + counts[index];
    }
    draw();
    persist();
  }

  function open(name, pattern, identifier) {
    current = pattern;
    storageKey = "bead-focus:v1:" + (identifier ? identifier + ":" : "") + patternKey(pattern);
    let saved;
    try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch {}
    finished = new Set((Array.isArray(saved?.done) ? saved.done : [])
      .filter(i => Number.isInteger(i) && i >= 0 && i < pattern.cells.length && pattern.cells[i] >= 0));
    counts = new Array(pattern.palette.length).fill(0);
    total = 0;
    for (const index of pattern.cells) {
      if (index < 0) continue;
      counts[index]++;
      total++;
    }
    if (!total) return false;
    completedByColor = counts.map(() => 0);
    const codes = counts.map((count,index) => ({count,index})).filter(item => item.count)
      .sort((a,b) => b.count - a.count);
    color.replaceChildren(new Option("全部色号",""));
    const paletteList = pick("colors");
    paletteList.replaceChildren();
    for (const {index,count} of codes) {
      const entry = pattern.palette[index];
      color.add(new Option(entry.code + " · " + count + " 颗",String(index)));
      const button = document.createElement("button");
      button.type = "button";
      button.className = "button outline";
      button.value = index;
      const swatch = document.createElement("span");
      swatch.className = "focus-swatch";
      swatch.style.background = entry.hex;
      button.append(swatch,document.createElement("span"));
      paletteList.append(button);
    }
    tiles = [];
    region.replaceChildren(new Option("整张图纸",""));
    for (let y = 0; y < pattern.height; y += block) {
      for (let x = 0; x < pattern.width; x += block) {
        const right = Math.min(x + block,pattern.width);
        const bottom = Math.min(y + block,pattern.height);
        if (!pattern.cells.some((entry,i) => entry >= 0 && i % pattern.width >= x && i % pattern.width < right &&
          Math.floor(i / pattern.width) >= y && Math.floor(i / pattern.width) < bottom)) continue;
        region.add(new Option("行 " + (y+1) + "–" + bottom + " · 列 " + (x+1) + "–" + right,String(tiles.length)));
        tiles.push({x,y,right,bottom});
      }
    }
    color.value = saved?.color ?? "";
    if (color.selectedIndex < 0) color.value = "";
    region.value = saved?.tile ?? "";
    if (region.selectedIndex < 0) region.value = "";
    size.value = ["20","28","39"].includes(saved?.size) ? saved.size : "28";
    hide.checked = Boolean(saved?.hide);
    dialog.querySelector("h2").textContent = name + " · 拼豆模式";
    dialog.showModal();
    canvasFrame.scrollTo(0,0);
    refresh();
    return true;
  }

  grid.addEventListener("click", event => {
    const rect = grid.getBoundingClientRect();
    const step = Number(size.value);
    const x = Math.floor((event.clientX - rect.left) / step) - 1;
    const y = Math.floor((event.clientY - rect.top) / step) - 1;
    if (x < 0 || y < 0 || x >= current.width || y >= current.height) return;
    const i = y * current.width + x;
    if (!inScope(i)) return;
    if (finished.has(i)) finished.delete(i);
    else finished.add(i);
    refresh();
  });
  for (const select of [color, region, size, hide]) select.addEventListener("change",refresh);
  pick("colors").addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    color.value = color.value === button.value ? "" : button.value;
    refresh();
  });
  pick("complete").addEventListener("click", () => {
    for (let i = 0; i < current.cells.length; i++) if (inScope(i)) finished.add(i);
    refresh();
  });
  pick("reset").addEventListener("click", () => {
    if (!confirm("清空这张图纸的拼豆进度？")) return;
    finished.clear();
    refresh();
  });
  pick("close").addEventListener("click", () => dialog.close());
  return {open};
})();
