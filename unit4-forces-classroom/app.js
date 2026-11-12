"use strict";
const $ = id => document.getElementById(id);
const storageKey = "unit4-forces-classroom-v1";
const groupById = new Map(groups.map(group => [group.id, group]));
const questionById = new Map(questions.map(question => [question.id, question]));
const svgNS = "http://www.w3.org/2000/svg";

let data = {notes:{},ink:{},done:{}};
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
  for (const key of Object.keys(data)) {
    if (saved[key] && typeof saved[key] === "object" && !Array.isArray(saved[key])) data[key] = saved[key];
  }
} catch {}
function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(data)); } catch {}
}
function node(tag, text, className) {
  const item = document.createElement(tag);
  if (text !== undefined) item.textContent = text;
  if (className) item.className = className;
  return item;
}
function photo(name, alt) {
  const img = node("img");
  img.src = "assets/" + name + ".jpg";
  img.alt = alt;
  return img;
}
function optionsList(values) {
  const list = node("ol");
  list.append(...values.map(value => vocabText("li",value)));
  return list;
}
function itemTitle(q) {
  const group = groupById.get(q.group);
  if (q.group === "11") {
    if (q.no === "3") return "第十一题 · 任务三";
    const [task, number] = q.no.split("-");
    return "第十一题 · 任务" + (task === "1" ? "一" : "二") + "第 " + number + " 小题";
  }
  return q.group === "12" ? "第十二题 · 写作" : "第" + group.number + "题 · 第 " + q.no + " 小题";
}
const reviewMarks = {
  wrong: {short:"错", label:"错题"},
  blank: {short:"空", label:"未作答"},
  writing: {short:"评", label:"作文待修改"},
};
function reviewMark(question, compact = false) {
  const mark = reviewMarks[question.status];
  if (!mark) return null;
  const badge = node("span", compact ? mark.short : mark.label, "review-mark");
  badge.dataset.status = question.status;
  if (compact) badge.setAttribute("aria-hidden","true");
  return badge;
}

let current = questionById.get(location.hash.slice(1)) || questions[0];
let wrongOnly = false;
let tool = null;
let stroke = null;
let boardOpen = false;
const sections = [
  ["student","作答示例"],["hint","线索"],["answer","参考答案"],["explanation","讲解"]
];
const revealed = new Set();
const cleared = new Map();

function queue() {
  return wrongOnly ? questions.filter(q => q.status !== "right") : questions;
}
function move(delta) {
  const list = queue();
  const next = list[list.findIndex(q => q.id === current.id) + delta];
  if (next) choose(next);
}
function choose(q) {
  if (!q || q === current) return;
  finishStroke();
  current = q;
  closeVocabCard();
  revealed.clear();
  $("material").hidden = true;
  history.replaceState(null,"","#"+q.id);
  render();
  if (window.scrollY > 75) window.scrollTo(0,0);
}
function directory() {
  const root = $("directory");
  root.replaceChildren();
  const list = queue();
  for (const group of groups) {
    const entries = list.filter(q => q.group === group.id);
    if (!entries.length) continue;
    const row = node("section",undefined,"rail-group");
    const title = node("h3");
    title.append(node("span",group.number), document.createTextNode(group.title));
    const nums = node("div",undefined,"numbers");
    for (const q of entries) {
      const button = node("button",q.group === "12" ? "作文" : q.no);
      button.type = "button";
      const mark = reviewMark(q,true);
      const status = reviewMarks[q.status];
      button.setAttribute("aria-label", status ? itemTitle(q) + "，" + status.label : itemTitle(q));
      if (mark) button.append(mark);
      if (q === current) button.setAttribute("aria-current","true");
      if (data.done[q.id]) button.classList.add("done");
      button.addEventListener("click", () => choose(q));
      nums.append(button);
    }
    row.append(title, nums);
    root.append(row);
  }
  $("directory-progress").textContent = "已讲 " + questions.filter(q => data.done[q.id]).length + " / " + questions.length;
}
function renderQuestion() {
  const group = groupById.get(current.group);
  const title = vocabText("h2",current.prompt);
  title.id = "question-title";
  const root = $("question");
  const number = node("p",itemTitle(current),"question-kicker");
  const mark = reviewMark(current);
  if (mark) number.append(mark);
  root.replaceChildren(number,title);
  if (current.options) root.append(optionsList(current.options));
  if (group.figure && (current.group !== "5" || ["2","5"].includes(current.no))) {
    root.append(photo(group.figure, group.title + "配图"));
  }
  if (current.group === "12") {
    root.append(node("p","写清楚什么场景、怎么用力、推还是拉、力有多大。","writing-list"));
  }
}
function renderMaterial() {
  const group = groupById.get(current.group);
  const button = $("show-material");
  const target = $("material");
  button.hidden = !group.material;
  if (!group.material) target.hidden = true;
  button.setAttribute("aria-expanded",String(!target.hidden));
  if (target.hidden) { target.replaceChildren(); return; }
  const title = vocabText("h3",group.materialTitle);
  title.id = "material-heading";
  target.replaceChildren(title);
  if (group.words) {
    const words = node("div",undefined,"word-bank");
    words.append(...group.words.map(word => vocabText("span",word)));
    target.append(words);
  }
  target.append(...group.material.map(line => vocabText("p",line)));
  if (group.options) target.append(optionsList(group.options));
}
const pickedWritingScenes = new Set();
function renderWritingScenes() {
  const section = node("section",undefined,"writing-scene-bank");
  const grid = node("div",undefined,"writing-scenes");
  const guide = node("p","任选三个场景。先选 push 或 pull，再从同一个场景里挑词组填进句型。","writing-scene-guide");
  section.append(node("h4","仿写词组"),guide,grid);
  for (const {name,direction,size,action,object,reason} of writingScenes) {
    const scene = node("div",undefined,"writing-scene");
    const label = node("label",undefined,"writing-scene-choice");
    const checkbox = node("input");
    checkbox.type = "checkbox";
    checkbox.checked = pickedWritingScenes.has(name);
    checkbox.onchange = () => {
      if (checkbox.checked) pickedWritingScenes.add(name);
      else pickedWritingScenes.delete(name);
    };
    label.append(checkbox,node("strong",name));
    const choices = node("dl");
    for (const [slot,phrase] of [
      ["推拉与力度",direction + " · " + size + " force"],
      ["第 1 种 · to 后",action],
      ["第 2 种 · because 后",reason],
      ["第 3 种 · push / pull 后",object]
    ]) {
      choices.append(node("dt",slot),vocabText("dd",phrase));
    }
    scene.append(label,choices);
    grid.append(scene);
  }
  return section;
}
function renderReveal() {
  const root = $("reveal-content");
  const correction = corrections[current.id];
  $("reveal-explanation").textContent = correction ? "解析与复盘" : "展开解析";
  root.replaceChildren();
  for (const [key,label] of sections) {
    $("reveal-"+key).setAttribute("aria-expanded",String(revealed.has(key)));
    if (!revealed.has(key)) continue;
    const card = node("section",undefined,"reveal-section "+key);
    card.id = "shown-"+key;
    const value = key === "student" && current.status === "blank" ? "作答示例为留空。" : current[key];
    card.append(node("h3",label),vocabText("p",value));
    root.append(card);
    if (key === "explanation" && correction) {
      const [reason, knowledge] = correction;
      const cause = node("section",undefined,"reveal-section correction-cause");
      cause.append(node("h3",current.status === "blank" ? "未作答分析" : "错因分析"),node("p",reason));
      const review = node("section",undefined,"reveal-section correction-knowledge");
      review.append(node("h3","考点回顾"),node("p",knowledge));
      if (current.status === "writing") {
        const patterns = node("ol",undefined,"writing-patterns");
        for (const {label,pattern,example} of writingPatterns) {
          const item = node("li");
          item.append(node("h4",label),vocabText("p",pattern,"writing-pattern"),vocabText("p",example));
          patterns.append(item);
        }
        review.append(patterns,renderWritingScenes());
      }
      root.append(cause,review);
    }
  }
}
function reveal(key) {
  if (revealed.has(key)) revealed.delete(key);
  else revealed.add(key);
  renderReveal();
  if (revealed.has(key)) $("shown-"+key).scrollIntoView({block:"nearest"});
}
function renderBoard() {
  $("board").hidden = !boardOpen;
  $("board-toggle").setAttribute("aria-expanded",String(boardOpen));
  $("board-text").value = data.notes[current.id] || "";
}
function render() {
  const group = groupById.get(current.group);
  const list = queue();
  const index = list.findIndex(q => q.id === current.id);
  $("group-name").textContent = group.number + "、" + group.title;
  $("position").textContent = "第 " + (index+1) + " / " + list.length + " 题";
  $("previous").disabled = index <= 0;
  $("next").disabled = index >= list.length-1;
  $("mark-done").setAttribute("aria-pressed",String(Boolean(data.done[current.id])));
  $("mark-done").textContent = data.done[current.id] ? "已讲 ✓" : "标为讲过";
  directory();
  renderQuestion();
  renderMaterial();
  renderReveal();
  renderBoard();
  renderInk();
}

const ink = $("ink");
ink.setAttribute("viewBox","0 0 1000 1000");
function paths() {
  return data.ink[current.id] || [];
}
function renderInk() {
  ink.replaceChildren();
  for (const line of paths().concat(stroke ? [stroke] : [])) {
    if (!line.points?.length) continue;
    const path = document.createElementNS(svgNS,"path");
    const points = line.points;
    const start = points[0];
    path.setAttribute("d", "M " + start.join(" ") + " L " + (points.length === 1 ? [start[0]+.1,start[1]].join(" ") : points.slice(1).map(p=>p.join(" ")).join(" L ")));
    path.setAttribute("fill","none");
    path.setAttribute("stroke",line.tool === "marker" ? "#e6aa26" : "#b42535");
    path.setAttribute("stroke-width",line.tool === "marker" ? "15" : "3");
    path.setAttribute("stroke-opacity",line.tool === "marker" ? ".42" : "1");
    path.setAttribute("stroke-linejoin","round");
    path.setAttribute("stroke-linecap","round");
    path.setAttribute("vector-effect","non-scaling-stroke");
    ink.append(path);
  }
  $("undo").disabled = !paths().length && !cleared.has(current.id);
  $("clear-ink").disabled = !paths().length;
}
function point(event) {
  const box = ink.getBoundingClientRect();
  return [
    Math.round(Math.max(0,Math.min(1,(event.clientX-box.left)/box.width))*1000),
    Math.round(Math.max(0,Math.min(1,(event.clientY-box.top)/box.height))*1000)
  ];
}
function finishStroke() {
  if (!stroke) return;
  data.ink[current.id] = [...paths(),stroke];
  cleared.delete(current.id);
  stroke = null;
  save();
  renderInk();
}
ink.addEventListener("pointerdown",event => {
  if (!tool || stroke || event.button !== 0) return;
  event.preventDefault();
  stroke = {tool,points:[point(event)]};
  ink.setPointerCapture(event.pointerId);
  renderInk();
});
ink.addEventListener("pointermove",event => {
  if (!stroke || !ink.hasPointerCapture(event.pointerId)) return;
  const next=point(event);
  const last=stroke.points.at(-1);
  if (next[0] === last[0] && next[1] === last[1]) return;
  stroke.points.push(next);
  renderInk();
});
ink.addEventListener("pointerup",finishStroke);
ink.addEventListener("pointercancel",finishStroke);
function setDrawingTool(next) {
  finishStroke();
  tool = next;
  for (const mode of ["pen","marker"]) $(mode).setAttribute("aria-pressed",String(mode === tool));
  ink.classList.toggle("drawing",Boolean(tool));
}
for (const name of ["pen","marker"]) {
  $(name).addEventListener("click",() => {
    if (wordMode) setWordMode(false);
    setDrawingTool(tool === name ? null : name);
  });
}
$("undo").onclick = () => {
  if (paths().length) paths().pop();
  else if (cleared.has(current.id)) {
    data.ink[current.id] = cleared.get(current.id);
    cleared.delete(current.id);
  }
  save();
  renderInk();
};
$("clear-ink").onclick = () => {
  cleared.set(current.id,paths());
  data.ink[current.id] = [];
  save();
  renderInk();
};
$("board-text").addEventListener("input",event => {
  data.notes[current.id] = event.target.value;
  save();
});
$("board-toggle").onclick = () => {
  boardOpen = !boardOpen;
  renderBoard();
  if (boardOpen) $("board-text").focus();
};
$("show-material").onclick = () => {
  $("material").hidden = !$("material").hidden;
  renderMaterial();
  if (!$("material").hidden) $("material").scrollIntoView({block:"nearest"});
};
$("mark-done").onclick = () => {data.done[current.id] = !data.done[current.id];save();render();};
$("previous").onclick = () => move(-1);
$("next").onclick = () => move(1);
$("filter").onclick = () => {
  wrongOnly = !wrongOnly;
  $("filter").setAttribute("aria-pressed",String(wrongOnly));
  $("filter").textContent = wrongOnly ? "显示全部" : "只讲错题";
  if (!queue().includes(current)) choose(queue()[0]);
  else render();
};
$("focus-mode").onclick = () => {
  const focus = document.body.classList.toggle("focus");
  $("focus-mode").setAttribute("aria-pressed",String(focus));
  $("focus-mode").textContent = focus ? "显示目录" : "专注授课";
};
$("fullscreen").onclick = async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch { $("fullscreen").textContent = "请用浏览器全屏"; }
};
document.addEventListener("fullscreenchange",() => {
  $("fullscreen").textContent = document.fullscreenElement ? "退出全屏" : "全屏";
});
for (const [key] of sections) $("reveal-"+key).onclick = () => reveal(key);
document.addEventListener("keydown",event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.isComposing ||
      event.target.matches("input,textarea,[contenteditable]")) return;
  const key = event.key.toLowerCase();
  const command = {arrowleft:() => move(-1),arrowright:() => move(1),
    h:() => reveal("hint"),a:() => reveal("answer"),e:() => reveal("explanation"),
    b:() => $("board-toggle").click(),f:() => $("focus-mode").click()}[key];
  if (command) {event.preventDefault();command();}
});
let clockStart = 0;
let elapsed = 0;
function showTime() {
  const seconds = Math.floor((elapsed + (clockStart ? Date.now()-clockStart : 0))/1000);
  const parts = [Math.floor(seconds/60),seconds%60].map(n => String(n).padStart(2,"0"));
  $("timer").querySelector("span").textContent = parts.join(":");
}
$("timer").onclick = () => {
  if (clockStart) {elapsed += Date.now()-clockStart;clockStart = 0;}
  else clockStart = Date.now();
  $("timer").setAttribute("aria-pressed",String(Boolean(clockStart)));
  showTime();
};
setInterval(showTime,1000);
initializeVocabulary();
render();
