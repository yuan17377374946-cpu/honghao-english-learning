"use strict";

const lessonGlossary = new Map();
for (const line of `
a:一个；一件（不定冠词）
about:关于；大约
across:穿过；从一边到另一边
ago:以前
air:空气
also:也；还
amazing:令人惊奇的
and:和；而且
anti-clockwise:逆时针地
are,be,is,was,were:是；处于某种状态（be 动词）
at:在（某个地点或时间）
away:离开；远离
ball:球
because:因为
become,becomes:变成；变得
bellows:风箱（一种把空气吹向炉火的工具）
better:更好（good 或 well 的比较级）
big:大的
blacksmiths:铁匠（复数）
blows:吹；吹动（blow 的第三人称单数）
box:盒子；箱子
boy:男孩
burn,burns:燃烧
but:但是
by:通过；在……旁边
can:能；可以
car:汽车；小车
carry:拿；搬运
cart:手推车；小车
chair:椅子
change:改变；变化
class:班级；课
classroom:教室
clockwise:顺时针地
clothes:衣服
come:来；到来
curtains:窗帘（复数）
daily:日常的；每天的
day:一天；日子
desk:书桌
diandian:点点（人名）
diandian's:点点的
different:不同的
difficult:困难的
dig:挖；掘
do:做；用于构成疑问句等
door:门
down:向下；往下
drawer:抽屉
earth:泥土；地球
easy:容易的
erhu:二胡
every:每个；每一
factories:工厂（factory 的复数）
family:家庭；家人
far:远；远的
fast:快的；快速地
faster:更快（fast 的比较级）
fire:火；炉火
first:首先；第一
floor:地板；楼层
force,forces:力；力量
fresh:新鲜的
full:满的；装满的
gate:大门；栅栏门
gently:轻柔地；轻轻地
go,goes:走；去；移动
gong:公（人名 Yu Gong 的一部分）
handle:把手；手柄
hard:用力地；困难的；坚硬的
have:有（have to 表示“不得不”）
he:他
heavier:更重的（heavy 的比较级）
heaviest:最重的（heavy 的最高级）
heavy:重的；沉重的
hi:嗨；你好
his:他的
history:历史
home,homes:家；住处
hotter:更热的（hot 的比较级）
how:怎样；如何
i:我
idea:想法；要点
if:如果
in:在……里；在……
into:进入；到……里面
it:它；这件事
it's:它是；这是（it is 的缩写）
its:它的
kept:继续；保持（keep 的过去式）
kitchens:厨房（复数）
last:最后的（at last 表示“终于”）
learn:学习；了解
least:最少的（at least 表示“至少”）
life:生活；生命
light:轻的；光；灯
lived:居住；生活（live 的过去式）
long:长的；时间长的
longlong:龙龙（人名）
main:主要的
make,makes:使；让；制作
many:许多
material:材料；阅读材料
means:意思是
modern:现代的
mountains:山（复数）
move,moves,moving:移动；搬动
moved:移动；搬动（move 的过去式或过去分词）
much:很多；……得多
must:必须；一定
my:我的
near:在……附近
need:需要
never:从不
not:不；没有
note:说明；提醒；笔记
of:……的；表示所属或数量
often:经常
oh:哦
old:旧的；老的
on:在……上面；关于
one:一个；用来代替前文的单数名词
only:仅；只
open,opening:打开；开
or:或；还是
our:我们的
out:向外；出来
passage:短文；段落
people:人们
plane:飞机
play:玩；演奏（乐器）
pressed:被压；被挤（press 的过去式或过去分词）
pull,pulls,pulling:拉；拉力
puller:拉东西的人或装置
push,pushes,pushing:推；推力
put:放；摆
quick:快的；迅速的
quicker:更快的（quick 的比较级）
quickly:迅速地
results:结果（复数）
rod:杆；棒（文中指晾衣杆）
run,runs:跑；运转；流动
safety:安全
schoolbag,schoolbags:书包
science:科学
see:看见
sentences:句子（复数）
shopping:购物
simple:简单的
six:六
slow:慢的；减速
slower:更慢的（slow 的比较级）
slowly:慢慢地
small:小的
smaller:更小的（small 的比较级）
so:所以；这么
softly:轻轻地；微弱地
sometimes:有时
speed:速度
stones:石头（复数）
stopped:停止（stop 的过去式或过去分词）
stronger:更强的；更旺的（strong 的比较级）
stuck:卡住的；动不了的
suitcase:行李箱
tall:高的（形容人或物的高度）
tallest:最高的（tall 的最高级）
tells:告诉；说明
than:比（用于比较）
that:那；那个；引出后面的从句
the:这；那（指特定的人或事物）
them:他们；它们（宾格）
then:然后；那时
they:他们；它们
things:事物；东西（复数）
this:这；这个
three:三
to:到；向（也可放在动词原形前）
tom:汤姆（人名）
too:太；也
tool:工具
toy:玩具
traditional:传统的
train:火车
truck:卡车
try:试一试；尝试
turn:转动；转向
two:二；两个
under:在……下面
underlined:画了下划线的
up:向上；往上
us:我们（宾格）
use,uses,using:使用；用
used:使用（use 的过去式或过去分词）
useful:有用的
very:很；非常
wanted:想要（want 的过去式）
way,ways:方法；方向；路程
we:我们
what:什么
when:什么时候；当……时
where:哪里；在什么地方
which:哪一个；哪些
widely:广泛地
will:将；会
with:和……一起；用；带有
word:单词
work,worked,working:工作；干活；运转
workshops:工场；作坊（复数）
wow:哇
write:写；书写
years:年（复数）
yes:是的
you:你；你们
your:你的；你们的
yu:愚（人名 Yu Gong 的一部分）
`.trim().split("\n")) {
  const [forms, meaning] = line.split(":");
  for (const form of forms.split(",")) lessonGlossary.set(form, meaning);
}

const vocabStorageKey = "unit4-forces-vocabulary-v1";
const vocabWordPattern = /[a-z]+(?:[-'’][a-z]+)*(?![a-z_])/gi;
let wordMode = false;
let vocabSessionIndex = 0;
let vocabSessions = [];
let vocabAnchor = null;
try {
  const saved = JSON.parse(localStorage.getItem(vocabStorageKey) || "{}");
  if (Array.isArray(saved.sessions)) {
    vocabSessions = saved.sessions.filter(session =>
      typeof session?.date === "string" && Array.isArray(session.words)
    ).map(session => ({
      date:session.date,
      words:[...new Set(session.words.filter(word => lessonGlossary.has(word)))]
    }));
  }
  if (Number.isInteger(saved.active) && vocabSessions[saved.active]) vocabSessionIndex = saved.active;
} catch {}

function addVocabSession() {
  const date = new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
  vocabSessions.push({date,words:[]});
  vocabSessionIndex = vocabSessions.length - 1;
}
if (!vocabSessions.length) addVocabSession();
function vocabWords() {
  return vocabSessions[vocabSessionIndex].words;
}
function saveVocabulary() {
  try {
    localStorage.setItem(vocabStorageKey,JSON.stringify({sessions:vocabSessions,active:vocabSessionIndex}));
  } catch {
    $("vocab-storage-note").textContent = "浏览器无法保存生词，请在离开前复制或导出。";
  }
}
function wordKey(word) {
  return word.toLowerCase().replaceAll("’","'");
}
function displayVocabWord(word) {
  return word === "i" ? "I" : word;
}
function vocabText(tag, value, className) {
  const root = node(tag,undefined,className);
  const words = vocabWords();
  let cursor = 0;
  for (const match of value.matchAll(vocabWordPattern)) {
    const spelling = match[0];
    const key = wordKey(spelling);
    if (!lessonGlossary.has(key) || (match.index === 0 && spelling === "A" && value[1] === ".")) continue;
    root.append(document.createTextNode(value.slice(cursor,match.index)));
    const selected = words.includes(key);
    const part = node(wordMode || selected ? "button" : "span",spelling,"vocab-word");
    if (part.tagName === "BUTTON") part.type = "button";
    part.lang = "en";
    part.dataset.word = key;
    part.classList.toggle("vocab-marked",selected);
    root.append(part);
    cursor = match.index + spelling.length;
  }
  root.append(document.createTextNode(value.slice(cursor)));
  return root;
}
function closeVocabCard() {
  vocabAnchor = null;
  $("vocab-card").hidden = true;
}
function showVocabCard(anchor, key) {
  const card = $("vocab-card");
  const viewport = document.documentElement.clientWidth;
  $("vocab-card-word").textContent = displayVocabWord(key);
  $("vocab-card-meaning").textContent = lessonGlossary.get(key);
  card.hidden = false;
  const bounds = anchor.getBoundingClientRect();
  const width = card.offsetWidth;
  const left = Math.max(10,Math.min(bounds.left,viewport-width-10));
  const below = bounds.bottom + 7;
  const top = below + card.offsetHeight <= window.innerHeight - 7
    ? below : Math.max(7,bounds.top-card.offsetHeight-7);
  card.style.left = left + "px";
  card.style.top = top + "px";
  vocabAnchor = anchor;
}
function renderVocabulary() {
  const words = vocabWords();
  const select = $("vocab-session");
  const countByDate = new Map();
  select.replaceChildren(...vocabSessions.map((session,index) => {
    const count = (countByDate.get(session.date) || 0) + 1;
    countByDate.set(session.date,count);
    const option = node("option",session.date + " · 第 " + count + " 节" +
      (index === vocabSessions.length-1 ? "（本节）" : ""));
    option.value = String(index);
    return option;
  }));
  select.value = String(vocabSessionIndex);
  $("vocab-toggle").textContent = "生词本 · " + words.length;
  $("vocab-empty").hidden = Boolean(words.length);
  $("vocab-new").disabled = !vocabSessions.at(-1).words.length;
  $("vocab-copy").disabled = $("vocab-export").disabled = !words.length;
  const list = $("vocab-list");
  list.replaceChildren(...words.map(word => {
    const row = node("li");
    const term = node("strong",displayVocabWord(word));
    term.lang = "en";
    const meaning = node("span",lessonGlossary.get(word));
    const remove = node("button","移除");
    remove.type = "button";
    remove.setAttribute("aria-label","移除 " + displayVocabWord(word));
    remove.onclick = () => {
      vocabWords().splice(vocabWords().indexOf(word),1);
      saveVocabulary();
      refreshVocabContent();
      ($("vocab-list").querySelector("button") || $("vocab-session")).focus();
    };
    row.append(term,meaning,remove);
    return row;
  }));
}
function refreshVocabContent() {
  closeVocabCard();
  renderQuestion();
  renderMaterial();
  renderReveal();
  renderVocabulary();
  $("vocab-copy-fallback").hidden = true;
  $("vocab-status").textContent = "";
}
function setWordMode(active, refresh = true) {
  wordMode = active;
  $("word-marker").setAttribute("aria-pressed",String(active));
  $("vocab-instruction").hidden = !active;
  if (refresh) refreshVocabContent();
}
function initializeVocabulary() {
  $("word-marker").onclick = () => {
    if (!wordMode) setDrawingTool(null);
    setWordMode(!wordMode);
  };
  for (const id of ["question","material","reveal-content"]) {
    $(id).addEventListener("click",event => {
      const anchor = event.target.closest("button[data-word]");
      if (!anchor) return;
      const key = anchor.dataset.word;
      if (wordMode && !vocabWords().includes(key)) {
        vocabWords().push(key);
        saveVocabulary();
        for (const occurrence of document.querySelectorAll(".vocab-word")) {
          if (occurrence.dataset.word === key) occurrence.classList.add("vocab-marked");
        }
        renderVocabulary();
      }
      showVocabCard(anchor,key);
    });
  }
  document.addEventListener("click",event => {
    if (vocabAnchor && !event.target.closest(".vocab-word, #vocab-card")) closeVocabCard();
  });
  document.addEventListener("keydown",event => {
    if (event.key === "Escape" && vocabAnchor) closeVocabCard();
  });
  window.addEventListener("resize",closeVocabCard);
  window.addEventListener("scroll",closeVocabCard,{passive:true});
  $("vocab-toggle").onclick = () => {
    const panel = $("vocab-panel");
    panel.hidden = !panel.hidden;
    $("vocab-toggle").setAttribute("aria-expanded",String(!panel.hidden));
    if (!panel.hidden) renderVocabulary();
  };
  $("vocab-session").onchange = event => {
    vocabSessionIndex = Number(event.target.value);
    saveVocabulary();
    refreshVocabContent();
  };
  $("vocab-new").onclick = () => {
    addVocabSession();
    saveVocabulary();
    refreshVocabContent();
    $("vocab-session").focus();
  };
  $("vocab-copy").onclick = async () => {
    const words = vocabWords();
    if (!words.length) return;
    const text = words.map(displayVocabWord).join("\n");
    const fallback = $("vocab-copy-fallback");
    try {
      await navigator.clipboard.writeText(text);
      fallback.hidden = true;
      $("vocab-status").textContent = "已复制 " + words.length + " 个单词，每行一个。";
    } catch {
      fallback.hidden = false;
      fallback.value = text;
      fallback.focus();
      fallback.select();
      $("vocab-status").textContent = "请复制选中的单词。";
    }
  };
  $("vocab-export").onclick = () => {
    const words = vocabWords();
    if (!words.length) return;
    const csvCell = value => '"' + value.replaceAll('"','""') + '"';
    const rows = [["英文","中文"],...words.map(word => [displayVocabWord(word),lessonGlossary.get(word)])];
    const blob = new Blob(["\uFEFF" + rows.map(row => row.map(csvCell).join(",")).join("\r\n")],{type:"text/csv;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const link = node("a");
    link.href = url;
    link.download = "Unit4-生词-" + vocabSessions[vocabSessionIndex].date.replaceAll("/","-") + "-第" + (vocabSessionIndex+1) + "节.csv";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url),1000);
    $("vocab-status").textContent = "已导出 " + words.length + " 个单词。";
  };
  renderVocabulary();
}
