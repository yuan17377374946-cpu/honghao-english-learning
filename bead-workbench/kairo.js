"use strict";

const byId = (name) => document.getElementById(name);
const tabs = byId("gameTabs");
const search = byId("search");
const category = byId("category");
const list = byId("charts");
const image = byId("chartImage");
const stage = byId("stage");
const imageStatus = byId("imageStatus");
const zoomFit = byId("zoomFit");
const variants = byId("variants");
const params = new URLSearchParams(location.search);
let games = [];
let game;
let selected;
let variant = params.get("variant") === "original" ? "original" : "reduced";
let chartRequest = 0;
let currentPattern;
let zoom = 1;
let chartUrl = "";
const thumbs = new Map();
const thumbObserver = new IntersectionObserver(entries => {
  for (const {target,isIntersecting} of entries) {
    if (!isIntersecting) continue;
    thumbObserver.unobserve(target);
    loadThumb(target.querySelector("img"));
  }
}, {root:list,rootMargin:"80px"});

async function loadThumb(image) {
  const id = image.dataset.thumb;
  try {
    if (!thumbs.has(id)) {
      const pattern = await BeadProject.kairo(id);
      const canvas = document.createElement("canvas");
      canvas.width = pattern.width;
      canvas.height = pattern.height;
      const ctx = canvas.getContext("2d");
      for (let i = 0; i < pattern.cells.length; i++) {
        const entry = pattern.palette[pattern.cells[i]];
        if (!entry) continue;
        ctx.fillStyle = entry.hex;
        ctx.fillRect(i % pattern.width,Math.floor(i / pattern.width),1,1);
      }
      thumbs.set(id,canvas.toDataURL("image/png"));
    }
    image.src = thumbs.get(id);
    image.hidden = false;
  } catch {}
}

function setZoom(value) {
  zoom = Math.max(1, Math.min(4, value));
  image.style.width = zoom * 100 + "%";
  zoomFit.textContent = zoom === 1 ? "适合宽度" : Math.round(zoom * 100) + "%";
  byId("zoomOut").disabled = zoom === 1;
  byId("zoomIn").disabled = zoom === 4;
}

function updateSelection() {
  for (const button of list.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button.dataset.chart === selected?.id));
  }
}

async function showChart(entry, {scroll = false, resetView = true} = {}) {
  selected = entry;
  currentPattern = null;
  const request = ++chartRequest;
  const reduced = variant === "reduced";
  const versionName = reduced ? "减色版" : "原版";
  const title = entry.name + " · " + versionName;
  if (chartUrl) URL.revokeObjectURL(chartUrl);
  chartUrl = "";
  image.removeAttribute("src");
  byId("chartName").textContent = entry.name;
  const meta = game.title + " / " + entry.category + " / #" + entry.number + " · " +
    entry.width + " × " + entry.height + " 格 · " + entry.beads + " 颗";
  byId("chartMeta").textContent = meta;
  image.alt = title + " MARD 291 拼豆图纸";
  image.hidden = true;
  imageStatus.hidden = false;
  imageStatus.textContent = "正在加载图纸…";
  byId("editPattern").href = "./?" + new URLSearchParams({kairo:entry.id,variant});
  const download = byId("download");
  download.removeAttribute("href");
  download.download = entry.name.replace(/[\/:*?"<>|]/g,"-") + "-" + versionName + "-MARD291拼豆图纸.png";
  byId("controls").hidden = false;
  variants.hidden = false;
  for (const button of variants.querySelectorAll("button")) {
    const active = button.dataset.variant === variant;
    button.className = "button " + (active ? "primary" : "outline");
    button.setAttribute("aria-pressed",String(active));
  }
  byId("print").disabled = true;
  byId("kairoFocus").disabled = true;
  if (resetView) {
    setZoom(1);
    stage.scrollTo(0,0);
  }
  updateSelection();

  const address = new URL(location.href);
  address.searchParams.set("pattern", entry.id);
  if (reduced) address.searchParams.delete("variant");
  else address.searchParams.set("variant",variant);
  history.replaceState(null, "", address);
  if (scroll && matchMedia("(max-width: 720px)").matches) byId("viewer").scrollIntoView({block:"start"});

  try {
    const pattern = await BeadProject.kairo(entry.id,variant);
    if (request !== chartRequest) return;
    const colors = pattern.palette.length;
    const reduction = reduced && colors < entry.colors ? entry.colors + " → " : "";
    byId("chartMeta").textContent = meta + " · " + reduction + colors + " 色";
    const source = entry.redrawn
      ? "参考 Kairosoft 游戏素材 · 正面微侧重绘"
      : "游戏原画 © Kairosoft · 像素图来源 KairoHistory";
    const canvas = BeadChart.page(pattern,title,"MARD 291",source + " · 色值 MakeBead（CC BY 4.0）");
    const png = await new Promise(resolve => canvas.toBlob(resolve,"image/png"));
    if (request !== chartRequest) return;
    if (!png) throw Error("图纸生成失败。");
    if (chartUrl) URL.revokeObjectURL(chartUrl);
    chartUrl = URL.createObjectURL(png);
    currentPattern = pattern;
    download.href = chartUrl;
    image.src = chartUrl;
  } catch {
    if (request !== chartRequest) return;
    imageStatus.hidden = false;
    imageStatus.textContent = "图纸加载失败，重新点击图纸再试。";
  }
}

function renderList() {
  const query = search.value.trim().toLocaleLowerCase();
  const matches = game.items.filter(entry =>
    (!category.value || entry.category === category.value) &&
    (!query || [entry.name, entry.alias, entry.number].some(value => value.toLocaleLowerCase().includes(query))));
  byId("count").textContent = matches.length ? matches.length + " 张图纸" : "没有找到匹配的图纸";
  thumbObserver.disconnect();
  const cards = document.createDocumentFragment();
  for (const entry of matches) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chart-item";
    button.dataset.chart = entry.id;
    button.setAttribute("aria-pressed", String(entry.id === selected?.id));
    const thumb = document.createElement("img");
    thumb.dataset.thumb = entry.id;
    thumb.alt = "";
    thumb.hidden = true;
    const title = document.createElement("strong");
    title.textContent = entry.name;
    const grid = document.createElement("span");
    grid.textContent = "#" + entry.number + " · " + entry.width + " × " + entry.height + " 格";
    const thumbFrame = document.createElement("span");
    thumbFrame.className = "chart-thumb";
    thumbFrame.append(thumb);
    button.append(thumbFrame, title, grid);
    cards.append(button);
  }
  list.replaceChildren(cards);
  list.scrollTop = 0;
  for (const frame of list.querySelectorAll(".chart-thumb")) thumbObserver.observe(frame);
}

function changeGame(next, entry = next.items[0]) {
  game = next;
  search.value = "";
  category.replaceChildren(new Option("全部分类", ""));
  for (const name of new Set(game.items.map(item => item.category))) category.add(new Option(name, name));
  for (const button of tabs.querySelectorAll("button")) {
    const active = button.dataset.game === next.id;
    button.className = "button " + (active ? "primary" : "outline");
    button.setAttribute("aria-pressed", String(active));
  }
  showChart(entry);
  renderList();
  list.querySelector('[aria-pressed="true"]')?.scrollIntoView({block:"nearest"});
}

async function init() {
  try {
    games = await BeadProject.kairoCatalog();
    const id = params.get("pattern");
    for (const collection of games) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.game = collection.id;
      const label = document.createElement("span");
      label.textContent = collection.title;
      const total = document.createElement("small");
      total.textContent = collection.items.length + " 张";
      button.append(label, total);
      button.addEventListener("click", () => { if (game !== collection) changeGame(collection); });
      tabs.append(button);
    }
    const first = games.find(collection => collection.items.some(entry => entry.id === id)) ?? games[0];
    changeGame(first, first.items.find(entry => entry.id === id) ?? first.items[0]);
  } catch {
    byId("count").textContent = "图纸目录加载失败，请刷新重试。";
  }
}

search.addEventListener("input", () => { if (game) renderList(); });
category.addEventListener("change", () => { if (game) renderList(); });
list.addEventListener("click", event => {
  const button = event.target.closest("[data-chart]");
  if (button) showChart(game.items.find(entry => entry.id === button.dataset.chart), {scroll:true});
});
variants.addEventListener("click",event => {
  const button = event.target.closest("[data-variant]");
  if (!button || !selected || variant === button.dataset.variant) return;
  variant = button.dataset.variant;
  showChart(selected,{resetView:false});
});
image.addEventListener("load", () => {
  image.hidden = false;
  imageStatus.hidden = true;
  byId("print").disabled = false;
  byId("kairoFocus").disabled = false;
});
image.addEventListener("error", () => {
  image.hidden = true;
  imageStatus.hidden = false;
  imageStatus.textContent = "图纸加载失败，重新点击图纸再试。";
});
byId("zoomOut").addEventListener("click", () => setZoom(zoom / 1.25));
byId("zoomIn").addEventListener("click", () => setZoom(zoom * 1.25));
zoomFit.addEventListener("click", () => { setZoom(1); stage.scrollTo(0,0); });
byId("print").addEventListener("click", async () => {
  const printImage = byId("printImage");
  printImage.src = image.currentSrc;
  try {
    await printImage.decode();
    window.print();
  } catch {
    imageStatus.hidden = false;
    imageStatus.textContent = "图纸暂时无法打印，请重新打开后再试。";
  }
});
byId("kairoFocus").addEventListener("click",() => {
  if (!currentPattern || !selected) return;
  const name = variant === "reduced" ? selected.name + " · 减色版" : selected.name;
  BeadFocus.open(name,currentPattern,selected.id);
});
init();
