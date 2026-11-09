"use strict";

const $ = (selector) => document.querySelector(selector);
const fingers = ["拇指", "食指", "中指", "无名指", "小指"];
const widths = [1.04, .87, .95, .89, .72];
const shapes = {
  almond: ["杏仁", "M19 119C18 83 25 56 39 34Q50 15 61 34C75 56 82 83 81 119Q81 145 50 147Q19 145 19 119Z"],
  oval: ["椭圆", "M18 117C18 79 17 47 30 32Q50 11 70 32C83 47 82 79 82 117Q82 145 50 147Q18 145 18 117Z"],
  square: ["方圆", "M17 120L16 41Q16 27 29 25Q50 22 71 25Q84 27 84 41L83 120Q83 145 50 147Q17 145 17 120Z"],
  coffin: ["芭蕾", "M17 120L25 34Q26 25 36 24L64 24Q74 25 75 34L83 120Q83 145 50 147Q17 145 17 120Z"],
  stiletto: ["尖形", "M18 118C20 78 36 47 47 25Q50 19 53 25C64 47 80 78 82 118Q83 145 50 147Q17 145 18 118Z"]
};
const lengths = {short: ["短", .72], medium: ["中", .89], long: ["长", 1]};
const finishes = {gloss:"亮面", matte:"磨砂", jelly:"果冻", pearl:"贝母", glitter:"细闪", cat:"斜光猫眼", glass:"玻璃珠猫眼", velvet:"丝绒猫眼", chrome:"镜面银光"};
const palette = [
  ["奶油白","#fff0dc"],["裸奶茶","#dbc0ae"],["蜜桃裸","#f3c7b5"],["芭蕾粉","#f3cadb"],["豆沙粉","#d08ca6"],["莓果红","#b83c58"],["车厘子","#832442"],["桑葚紫","#613451"],
  ["暖砖红","#b9584d"],["焦糖棕","#b67b58"],["巧克力","#6a4038"],["杏子橙","#f3ab87"],["奶油黄","#f5dda1"],["开心果","#b6c194"],["青提绿","#d2dda9"],["抹茶绿","#6e936c"],
  ["海盐蓝","#b6d2e6"],["晴空蓝","#7eabc7"],["灰紫","#afa3bf"],["薰衣草","#c9b6e7"],["贝壳灰","#d0c9c7"],["石墨黑","#39323d"],["银白","#e8e9ef"],
  ["冰透白","#f1e9e4"],["透明裸粉","#f1d2cc"],["烟灰奶茶","#a58b7c"],["摩卡棕","#765446"],["蜂蜜琥珀","#dca162"],["黑樱桃","#491b2f"],["熟葡萄","#563762"],["香槟金","#d9b887"]
];
const patterns = {
  none: "无花纹", french: "法式边", micro: "细法式", ombre: "渐变晕染", dots: "波点", plaid: "格纹", marble: "大理石",
  flowers: "小雏菊", cherry: "小樱桃", waves: "海浪线", tortoise: "琥珀玳瑁", hearts: "小爱心", stripe: "斜纹",
  halo: "中心光晕", smoke: "烟雾晕染", amberFlow: "琥珀流纹", silverTip: "极细银边", softPlaid: "透感格纹", leopard: "微豹纹",
  lace: "蕾丝法式", porcelain: "浮雕山茶", shellGrain: "贝母细纹"
};
const charms = {
  pearl:"珍珠", bow:"蝴蝶结", diamond:"水钻", flower:"小花", heart:"爱心", star:"星星",
  shell:"贝壳", moon:"月亮", ribbon:"丝带结", gold:"金珠", clover:"四叶草", butterfly:"蝴蝶",
  foilGold:"碎金箔", foilSilver:"碎银箔", microGem:"迷你碎钻", waterDrop:"透明水滴"
};
const icons = {
  studio:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18m-12 0v11"/>',
  heart:'<path d="M20.8 8.7c0 4-8.8 9.3-8.8 9.3S3.2 12.7 3.2 8.7A4.4 4.4 0 0 1 12 7.5a4.4 4.4 0 0 1 8.8 1.2Z"/>',
  shuffle:'<path d="M3 6h3c5.5 0 6.5 12 12 12h3m-4-4 4 4-4 4M3 18h3c1.9 0 3.2-1.5 4.3-3.4m3.4-5.2C14.8 7.5 16.1 6 18 6h3m-4-4 4 4-4 4"/>',
  undo:'<path d="M9 15 4 10l5-5M4 10h10a5 5 0 0 1 0 10h-3"/>',
  redo:'<path d="m15 15 5-5-5-5m5 5H10a5 5 0 0 0 0 10h3"/>',
  cursor:'<path d="m5 3 15 8-7 1-3 7L5 3Z"/>',
  reset:'<path d="M4 5v5h5M4.8 10a8 8 0 1 1 .3 6.2"/>',
  list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  download:'<path d="M12 3v11m-4-4 4 4 4-4M4 15v5h16v-5"/>',
  shape:'<path d="M6 14c0-4 4-9 6-10 2 1 6 6 6 10v2a6 6 0 0 1-12 0z"/>',
  color:'<path d="M12 3c2 4 6 7.3 6 11a6 6 0 0 1-12 0c0-3.7 4-7 6-11Z"/>',
  art:'<path d="M12 2c.8 6 3.6 9.2 10 10-6.4.8-9.2 4-10 10-.8-6-3.6-9.2-10-10 6.4-.8 9.2-4 10-10Z"/>',
  gem:'<path d="M7 4h10l4 6-9 10L3 10zm-4 6h18m-13 0 4 10 4-10"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  next:'<path d="m9 5 7 7-7 7"/>'
};
function icon(name) {
  return '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icons[name] + '</svg>';
}

const hex = (value) => /^#[0-9a-f]{6}$/i.test(value || "") ? value.toLowerCase() : "#f3cadb";
const copy = (value) => JSON.parse(JSON.stringify(value));
const colorName = (value) => palette.find(([, color]) => color === value)?.[0] ?? value.toUpperCase();
const escapeText = (value) => String(value).replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
function mix(color, target, amount) {
  const start = hex(color).slice(1).match(/../g);
  const end = hex(target).slice(1).match(/../g);
  return "#" + start.map((channel, i) => Math.round(parseInt(channel,16) * (1 - amount) + parseInt(end[i],16) * amount).toString(16).padStart(2,"0")).join("");
}
function dots(seed, count, build) {
  let n = seed;
  const rand = () => ((n = (Math.imul(n, 1664525) + 1013904223) >>> 0) / 4294967296);
  return Array.from({length:count}, () => build(rand(), rand(), rand())).join("");
}
const nail = (color, finish = "gloss", pattern = "none", ink = "#fff0dc", decor = [], shape = "almond", length = "long") =>
  ({color, finish, pattern, ink, decor, shape, length});
const charm = (kind, x = 50, y = 85, size = 25) => ({kind,x,y,size});
const presets = [
  {name:"草莓奶霜", detail:"莓果红 · 法式边 · 蝴蝶结", tint:"#f3d7e1", nails:[
    nail("#b83c58","gloss","french","#f3cadb", [charm("pearl",50,105,13)]),
    nail("#f3cadb","jelly","cherry","#b83c58"),
    nail("#b83c58","cat","none","#fff0dc", [charm("bow",50,88,35)]),
    nail("#fff0dc","pearl","flowers","#d08ca6"),
    nail("#d08ca6","gloss","french","#fff0dc")
  ]},
  {name:"海盐月光", detail:"雾蓝 · 贝母 · 贝壳", tint:"#dce8f1", nails:[
    nail("#7eabc7","cat","waves","#e8e9ef", [], "oval"),
    nail("#b6d2e6","jelly","ombre","#e8e9ef", [charm("shell",48,101,28)], "oval"),
    nail("#e8e9ef","pearl","marble","#b6d2e6", [charm("pearl",51,78,17),charm("pearl",42,95,11)], "oval"),
    nail("#7eabc7","cat","none","#fff0dc",[charm("moon",50,89,28)],"oval"),
    nail("#b6d2e6","glitter","micro","#e8e9ef", [], "oval")
  ]},
  {name:"复古可可", detail:"巧克力 · 玳瑁 · 金珠", tint:"#eddfd5", nails:[
    nail("#6a4038","gloss","french","#dbc0ae", [], "coffin"),
    nail("#dbc0ae","jelly","tortoise","#6a4038", [], "coffin"),
    nail("#b67b58","gloss","tortoise","#6a4038", [charm("gold",50,111,15)], "coffin"),
    nail("#6a4038","gloss","none","#fff0dc",[charm("star",50,90,29)],"coffin"),
    nail("#dbc0ae","matte","plaid","#b67b58", [], "coffin")
  ]},
  {name:"青提汽水", detail:"青提绿 · 果冻 · 小雏菊", tint:"#e7edd9", nails:[
    nail("#d2dda9","jelly","french","#fff0dc", [], "square","medium"),
    nail("#b6c194","pearl","flowers","#fff0dc", [], "square","medium"),
    nail("#d2dda9","jelly","ombre","#6e936c", [charm("clover",50,89,33)], "square","medium"),
    nail("#fff0dc","pearl","dots","#b6c194",[charm("pearl",50,90,17)],"square","medium"),
    nail("#6e936c","gloss","micro","#d2dda9", [], "square","medium")
  ]}
];

const seasonalNail = (color, finish, pattern = "none", ink = "#fff0dc", decor = []) =>
  nail(color, finish, pattern, ink, decor, "square", "short");
const trendPresets = [
  {name:"水光蕾丝", category:"daily", detail:"冰透裸粉 · 水光猫眼 · 蕾丝与浮雕", tint:"#efe0e2",
    tip:"用裸粉和冰透白做跳色。两片用玻璃珠猫眼，其余搭配细蕾丝、浮雕山茶和贝母细纹。",
    nails:[
      nail("#edbebc","glass","none","#fff0dc",[],"oval","short"),
      nail("#e3b9bd","jelly","lace","#fff3e6",[],"oval","short"),
      nail("#d08ca6","glass","none","#fff0dc",[],"oval","short"),
      nail("#dba8b3","jelly","porcelain","#fff0e4",[],"oval","short"),
      nail("#f1d2cc","pearl","shellGrain","#fff1e5",[],"oval","short")
    ]},
  {name:"白开水猫眼", category:"daily", detail:"透白 · 玻璃珠光 · 极细银边", tint:"#ece4e8",
    tip:"用一层透明裸粉统一甲片，两片做银边、一片留微闪。小钻只点在食指甲根。",
    nails:[
      seasonalNail("#f1d2cc","glass","silverTip","#e8e9ef"),
      seasonalNail("#f1e9e4","jelly","none","#fff0dc",[charm("microGem",49,119,12)]),
      seasonalNail("#f1d2cc","glass"),
      seasonalNail("#f1e9e4","glass","silverTip","#e8e9ef"),
      seasonalNail("#f1d2cc","jelly")
    ]},
  {name:"美拉德丝绒", category:"warm", detail:"摩卡棕 · 丝绒猫眼 · 碎金箔", tint:"#e4cfc1",
    tip:"用摩卡和奶茶做深浅跳色。猫眼光柔和散开，金箔集中在无名指的一侧。",
    nails:[
      seasonalNail("#765446","velvet"),
      seasonalNail("#dbc0ae","velvet","micro","#765446"),
      seasonalNail("#a58b7c","velvet"),
      seasonalNail("#765446","jelly","halo","#b67b58",[charm("foilGold",61,113,23),charm("foilGold",65,94,13)]),
      seasonalNail("#6a4038","gloss")
    ]},
  {name:"蜂蜜琥珀玳瑁", category:"warm", detail:"蜂蜜琥珀 · 流纹 · 玳瑁斑", tint:"#f0ddbc",
    tip:"先铺透蜜色，局部叠茶棕流纹。只给一到两片加深色玳瑁斑，其他甲片保留透感。",
    nails:[
      seasonalNail("#dca162","jelly","amberFlow","#6a4038"),
      seasonalNail("#dbc0ae","gloss","micro","#b67b58"),
      seasonalNail("#dca162","jelly","tortoise","#503128",[charm("foilGold",62,113,16)]),
      seasonalNail("#dca162","jelly","amberFlow","#b67b58"),
      seasonalNail("#765446","velvet")
    ]},
  {name:"黑樱桃酒红晕染", category:"warm", detail:"黑樱桃 · 烟雾晕染 · 一点银", tint:"#ebd5da",
    tip:"保留透酒红，把黑樱桃深色晕到甲边。中指保留光晕，无名指用一片碎银提亮。",
    nails:[
      nail("#832442","jelly","smoke","#491b2f",[],"almond","medium"),
      nail("#491b2f","velvet","none","#fff0dc",[],"almond","medium"),
      nail("#832442","jelly","halo","#d08ca6",[],"almond","medium"),
      nail("#491b2f","gloss","none","#fff0dc",[charm("foilSilver",58,109,21)],"almond","medium"),
      nail("#832442","jelly","smoke","#491b2f",[],"almond","medium")
    ]},
  {name:"灰奶茶透感格纹", category:"daily", detail:"奶茶灰 · 透明格线 · 小水钻", tint:"#e6ddd8",
    tip:"以半透灰奶茶打底，宽淡线交叠后再勾细线。格纹分给两片，其他甲片做纯色或细法式。",
    nails:[
      seasonalNail("#a58b7c","velvet"),
      seasonalNail("#dbc0ae","jelly","softPlaid","#765446"),
      seasonalNail("#f1e9e4","glass","none","#fff0dc",[charm("microGem",50,117,13)]),
      seasonalNail("#a58b7c","jelly","softPlaid","#f1e9e4"),
      seasonalNail("#dbc0ae","jelly","micro","#765446")
    ]},
  {name:"熟葡萄光晕", category:"cool", detail:"熟葡萄 · 中心光晕 · 镜面跳色", tint:"#e2d6ee",
    tip:"用深葡萄色框住淡紫中心，边缘虚化。镜面银只做一片，保留整套的葡萄色主调。",
    nails:[
      nail("#563762","jelly","halo","#c9b6e7",[],"oval","medium"),
      nail("#afa3bf","glass","none","#fff0dc",[],"oval","medium"),
      nail("#563762","jelly","halo","#d08ca6",[charm("microGem",50,115,14)],"oval","medium"),
      nail("#e8e9ef","chrome","none","#fff0dc",[],"oval","medium"),
      nail("#563762","velvet","none","#fff0dc",[],"oval","medium")
    ]}
];

let serial = 0;
function petals(ink, uid) {
  return '<defs><linearGradient id="'+uid+'-petal" x2=".72" y2="1"><stop stop-color="'+mix(ink,"#fff",.63)+'"/><stop offset=".55" stop-color="'+ink+'"/><stop offset="1" stop-color="'+mix(ink,"#713f54",.43)+'"/></linearGradient></defs>';
}

function artMarkup(kind, ink, uid, shape) {
  switch (kind) {
    case "french": return '<path d="M1 0h98v59Q72 53 50 68Q28 53 1 59Z" fill="' + ink + '"/><path d="M11 56Q36 56 50 68Q66 55 89 56" fill="none" stroke="#fff7" stroke-width="1.05"/>';
    case "micro": return '<path d="M-8 0h116v35Q78 32 50 38Q22 32-8 35Z" fill="' + ink + '"/>';
    case "ombre": return '<defs><linearGradient id="' + uid + '-fade" x2="0" y2="1"><stop stop-color="' + ink + '"/><stop offset=".21" stop-color="' + ink + '" stop-opacity=".93"/><stop offset=".88" stop-color="' + ink + '" stop-opacity="0"/></linearGradient></defs><path d="M0 0h100v154H0z" fill="url(#' + uid + '-fade)"/>';
    case "dots": return Array.from({length:21}, (_,i) => '<circle cx="' + (24+(i%3)*26+(Math.floor(i/3)%2)*9) + '" cy="' + (30+Math.floor(i/3)*17) + '" r="3.15" fill="' + ink + '"/>').join("");
    case "plaid": return '<path d="M25 10v145M49 10v145M73 10v145M0 49h100M0 78h100M0 108h100M0 136h100" stroke="' + ink + '" stroke-width="8" opacity=".49"/><path d="M33 10v145M57 10v145M81 10v145M0 58h100M0 87h100M0 117h100M0 145h100" stroke="' + ink + '" opacity=".84" stroke-width="1.6"/>';
    case "marble": {
      const vein = "M73 20C53 32 66 45 60 56S46 62 41 73C35 84 42 98 30 111S16 122 11 143";
      return '<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="'+vein+'" stroke="'+ink+'" stroke-width="12" opacity=".14"/><path d="'+vein+'" stroke="'+ink+'" stroke-width="5" opacity=".25"/><path d="'+vein+'" stroke="'+ink+'" stroke-width="1.35" opacity=".72"/><path d="M83 48C71 54 67 64 56 67L49 71M41 73C31 76 25 73 18 83M36 98l10 5 7 13 13 8 7 13M45 103l11 2 7 7M65 27l-14 3-12 12" stroke="'+ink+'" stroke-width=".78" opacity=".56"/><path d="M69 25C58 36 69 45 61 57S48 64 44 73M41 86c2 14-7 22-15 30" stroke="#fff8ee" stroke-width=".86" opacity=".7"/></g>';
    }
    case "flowers":
      return petals(ink,uid)+[[44,49,.79,-12],[63,73,.61,19],[34,92,.72,4],[57,112,.82,-25],[39,131,.53,12]].map(([x,y,s,angle]) =>
        '<g transform="translate('+x+' '+y+') rotate('+angle+') scale('+s+')">' + Array.from({length:7}, (_,i)=>
          '<path d="M0 1C-2-2-5-7-4-11c1-4 6-5 8-1C6-8 2-2 0 1Z" transform="rotate('+(i*360/7)+')" fill="url(#'+uid+'-petal)"/>').join("") +
        '<circle r="3.75" fill="#b98348"/><circle r="2.9" cx="-.35" cy="-.55" fill="#e9bc75"/><path d="m-1.6-.8.1-.1m2.8 1.4.1-.1m-1-2.1.1-.1" stroke="#fff2c7" stroke-width="1.15" stroke-linecap="round"/></g>').join("");
    case "cherry": return [[47,55,.65],[59,88,.84],[38,114,.73]].map(([x,y,s]) => '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M-6 5Q-5-9 1-15Q6-11 8 4" stroke="#526e47" fill="none" stroke-width="2.2"/><path d="M0-14q-12-8-13 0 5 4 13 0" fill="#7d9966"/><circle cx="-7" cy="7" r="6.2" fill="'+ink+'"/><circle cx="8" cy="6" r="6.5" fill="'+ink+'"/><path d="m-9 5 1-1m13 1 2-2" stroke="#fff9" stroke-linecap="round" stroke-width="2"/></g>').join("");
    case "waves": return '<path d="M-10 69C18 41 36 82 63 66S96 44 112 63M-10 82C18 54 37 95 65 80S97 58 112 77M-10 126C18 96 38 138 63 123S96 101 112 119" fill="none" stroke="' + ink + '" stroke-width="3.1" opacity=".9"/>';
    case "tortoise": return [[42,38,12,8,20],[65,55,12,16,50],[32,73,13,10,-35],[56,94,13,18,35],[29,112,11,12,-20],[72,125,14,10,-35],[48,139,9,8,32]].map(([x,y,rx,ry,rot]) => '<g transform="translate('+x+' '+y+') rotate('+rot+')"><ellipse rx="'+(rx+3)+'" ry="'+(ry+3)+'" fill="#bb682c" opacity=".34"/><ellipse rx="'+rx+'" ry="'+ry+'" fill="'+ink+'" opacity=".46"/><ellipse rx="'+rx*.6+'" ry="'+ry*.7+'" fill="'+ink+'" opacity=".33"/></g>').join("");
    case "hearts": return [[49,49,.58],[65,78,.57],[35,100,.69],[58,125,.72]].map(([x,y,s]) => '<path transform="translate('+x+' '+y+') scale('+s+')" d="M0-6C-11-21-26-1 0 15 26-1 11-21 0-6Z" fill="'+ink+'"/>').join("");
    case "stripe": return '<path d="M-25 76 78-9m-106 110L98-3m-124 128L112 7M-14 143 115 35M-4 162 124 54m-91 98 94-80m-65 80 65-53" stroke="' + ink + '" stroke-width="4" opacity=".8"/>';
    case "halo":
      return '<defs><radialGradient id="'+uid+'-aura"><stop stop-color="'+ink+'" stop-opacity=".96"/><stop offset=".35" stop-color="'+ink+'" stop-opacity=".8"/><stop offset=".68" stop-color="'+ink+'" stop-opacity=".36"/><stop offset="1" stop-color="'+ink+'" stop-opacity="0"/></radialGradient></defs><ellipse cx="50" cy="79" rx="38" ry="57" fill="url(#'+uid+'-aura)"/>';
    case "smoke":
      return '<defs><radialGradient id="'+uid+'-smoke"><stop stop-color="'+ink+'" stop-opacity="0"/><stop offset=".47" stop-color="'+ink+'" stop-opacity=".08"/><stop offset=".8" stop-color="'+ink+'" stop-opacity=".6"/><stop offset="1" stop-color="'+ink+'" stop-opacity=".98"/></radialGradient></defs><ellipse cx="50" cy="81" rx="50" ry="83" fill="url(#'+uid+'-smoke)"/><path d="M5 62Q36 38 59 44T106 30M10 122Q35 104 67 108T100 87" fill="none" stroke="'+ink+'" opacity=".28" stroke-width="7"/>';
    case "amberFlow":
      return '<defs><linearGradient id="'+uid+'-amber" x2="1" y2=".8"><stop stop-color="'+ink+'" stop-opacity=".76"/><stop offset=".35" stop-color="'+ink+'" stop-opacity=".39"/><stop offset=".78" stop-color="#f3c182" stop-opacity=".18"/><stop offset="1" stop-color="#fff1c9" stop-opacity=".6"/></linearGradient></defs><path d="M0 0h100v63C63 47 49 82 29 97S8 105 0 123Z" fill="url(#'+uid+'-amber)"/><path d="M-8 122C28 123 42 103 54 91S85 70 113 84m-118 57c31 1 50-15 64-33S89 92 112 95" fill="none" stroke="'+ink+'" opacity=".36" stroke-width="6.5"/><path d="M-8 119C30 124 42 98 58 88S86 71 113 78m-118 61c31 1 51-13 65-32S89 90 112 93" fill="none" stroke="#ffdfab" opacity=".6" stroke-width="1.6"/>';
    case "silverTip": {
      const edge = shape ?? shapes.oval[1];
      return '<defs><linearGradient id="'+uid+'-silver" x1="0" y1="0" x2="1" y2=".25"><stop stop-color="#827c90"/><stop offset=".28" stop-color="#f8f8ff"/><stop offset=".53" stop-color="#b8b6c8"/><stop offset=".79" stop-color="#fdfcff"/><stop offset="1" stop-color="#848798"/></linearGradient><linearGradient id="'+uid+'-tip-fade" gradientUnits="userSpaceOnUse" x1="0" y1="48" x2="0" y2="67"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="'+uid+'-tip-only"><rect width="100" height="72" fill="url(#'+uid+'-tip-fade)"/></mask></defs><path d="'+edge+'" fill="none" stroke="url(#'+uid+'-silver)" stroke-width="9" mask="url(#'+uid+'-tip-only)"/>';
    }
    case "softPlaid":
      return '<path d="M32 0v152m26-152v152m21-152v152M0 54h100M0 88h100M0 117h100" stroke="'+ink+'" stroke-width="10" opacity=".23"/><path d="M26 0v152m26-152v152m21-152v152M0 47h100M0 81h100M0 110h100" stroke="#fff3ed" stroke-width="2" opacity=".68"/><path d="M37 0v152m26-152v152m21-152v152M0 58h100M0 92h100M0 121h100" stroke="'+ink+'" stroke-width="1.65" opacity=".71"/>';
    case "leopard":
      return [[46,39,-17],[62,62,15],[33,76,38],[54,91,-23],[73,108,40],[34,117,-15],[53,132,23]].map(([x,y,a]) =>
        '<g transform="translate('+x+' '+y+') rotate('+a+')"><path d="M-6-3Q-3-9 4-6T7 3Q2 7-4 5T-6-3Z" fill="#dba679" opacity=".7"/><path d="M-7 3Q-12-5-3-7m9 1q7 4 1 8M2 6q-4 2-7-1" fill="none" stroke="'+ink+'" stroke-linecap="round" stroke-width="2.6"/></g>').join("");
    case "lace": {
      const hem = "M13 45C27 47 37 62 50 64S73 48 87 45";
      const picots = [[24,51,-36],[36,60,-42],[50,65,0],[64,60,41],[76,51,36]];
      return '<defs><pattern id="'+uid+'-mesh" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0H7V7" fill="none" stroke="'+ink+'" stroke-width=".95" opacity=".68"/></pattern></defs>'+
        '<path d="M10 0h80v44C73 48 63 66 50 64S27 47 10 45Z" fill="url(#'+uid+'-mesh)"/>'+
        '<path d="'+hem+'" fill="none" stroke="'+ink+'" stroke-width="1.5"/>'+
        picots.map(([x,y,angle]) => '<g transform="translate('+x+' '+y+') rotate('+angle+')" fill="none" stroke="'+ink+'" stroke-linecap="round"><path d="M-7 0C-7 5-4 10 0 10S7 5 7 0M-4 1C-4 4-2 7 0 7s4-3 4-6" stroke-width=".9"/><path d="M0 2c-3 0-3 4 0 4s3-4 0-4" stroke-width=".7"/><circle cy="12.5" r=".75" fill="'+ink+'" stroke="none"/></g>').join("");
    }
    case "porcelain": {
      const petal = "M0 2C-3-2-10-7-10-14c0-6 4-10 9-9 6-1 10 3 10 9C9-7 3-2 0 2Z";
      const bloom = (x,y,scale,tilt) =>
        '<g transform="translate('+x+' '+y+') rotate('+tilt+') scale('+scale+')">'+
        '<ellipse cx="1.8" cy="3.7" rx="20" ry="17" fill="'+mix(ink,"#643c50",.77)+'" opacity=".21"/>'+
        Array.from({length:6},(_,i)=>'<g transform="rotate('+(i*60)+')"><path d="'+petal+'" fill="url(#'+uid+'-petal)" stroke="'+mix(ink,"#6f4353",.35)+'" stroke-width=".65"/><path d="M-5-13q-1-5 3-7" stroke="#fff" stroke-opacity=".78" stroke-width="1" fill="none" stroke-linecap="round"/></g>').join("")+
        Array.from({length:5},(_,i)=>'<path transform="rotate('+(i*72+31)+') scale(.53)" d="'+petal+'" fill="url(#'+uid+'-petal)" stroke="'+mix(ink,"#82505f",.29)+'" stroke-width=".8"/>').join("")+
        '<circle r="3.4" fill="#ba935c"/><circle cx="-1" cy="-1" r="1.9" fill="#f9deb0"/></g>';
      return petals(ink,uid)+
        '<path d="M29 123Q40 97 57 78M38 108Q24 94 31 85Q44 91 38 108M46 99Q51 109 66 101Q58 93 46 99" fill="none" stroke="'+ink+'" stroke-width="1.1" opacity=".8"/>'+
        bloom(54,76,.92,-16)+bloom(36,112,.49,14);
    }
    case "shellGrain":
      return '<defs><linearGradient id="'+uid+'-shell" x2=".65" y2="1"><stop stop-color="'+ink+'" stop-opacity=".11"/><stop offset=".32" stop-color="#fff8eb" stop-opacity=".85"/><stop offset=".67" stop-color="'+ink+'" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity=".08"/></linearGradient></defs>'+
        Array.from({length:11},(_,i) => {
          const y = 39 + i*8.4;
          return '<path d="M10 '+(y+11)+'Q38 '+(y-26)+' 88 '+(y+2)+'" fill="none" stroke="url(#'+uid+'-shell)" stroke-width="'+(i%3===0?1.65:.82)+'"/>';
        }).join("");
    default: return "";
  }
}

function charmMarkup(kind, uid) {
  const radial = (inner, middle, outer) => '<defs><radialGradient id="'+uid+'" cx=".31" cy=".25" r=".77"><stop stop-color="'+inner+'"/><stop offset=".49" stop-color="'+middle+'"/><stop offset="1" stop-color="'+outer+'"/></radialGradient></defs>';
  const paint = 'url(#'+uid+')';
  switch (kind) {
    case "pearl": return radial("#fff", "#f9e6d9", "#ab8795")+'<circle r="13" fill="'+paint+'" stroke="#a68286" stroke-width=".6"/><circle cx="-4.2" cy="-5" r="2.5" fill="#fff" opacity=".83"/>';
    case "bow": return radial("#ffe4ee","#dc7ca2","#994463")+'<path d="M-1 0C-9-14-23-17-21-4q.8 11 19 8l-11 13 7-2 3 4L1 5l7 14 3-5 7 2L4 3q16 3 18-8C24-17 9-13 1 0Z" fill="'+paint+'" stroke="#a04b69" stroke-width="1"/><path d="M-16-6Q-11-4-4 1M17-6Q11-4 4 1" stroke="#fff8" stroke-width="1.4" fill="none"/><ellipse rx="4.7" ry="5.1" fill="#f8b8d3" stroke="#a95076" stroke-width=".8"/>';
    case "diamond": return '<path d="M0-14 11-8 14 3 6 13H-6L-14 3l3-11Z" fill="#e4eff8" stroke="#a998b6" stroke-width="1"/><path d="M0-14 5-5 11-8M5-5l9 8-8 10-3-9ZM-14 3-5-4l3 8-4 9Z" fill="#aaa6ce"/><path d="m0-14-5 10 10-1L3 4l-5 0-3-8-6-4Z" fill="#fff"/><path d="m-14 3 12 1-4 9m9-9 11-1" stroke="#fff" fill="none" stroke-width="1"/>';
    case "flower": return radial("#fff2f6","#ef9cbd","#b96688")+Array.from({length:5},(_,i)=>'<ellipse transform="rotate('+(i*72)+')" cy="-8" rx="5.8" ry="7.4" fill="'+paint+'" stroke="#d592ad" stroke-width=".55"/>').join("")+'<circle r="4.5" fill="#f7cd79"/><circle cx="-1.6" cy="-1.4" r="1.4" fill="#fff9e5"/>';
    case "heart": return radial("#ffdce7","#e96d96","#9d3b61")+'<path d="M0-6C-12-22-29 0 0 16 29 0 12-22 0-6Z" fill="'+paint+'" stroke="#a14663"/><path d="M-12-4q1-4 5-4" fill="none" stroke="#fff9" stroke-width="1.6" stroke-linecap="round"/>';
    case "star": return radial("#fff6c9","#e4b468","#a5753d")+'<path d="m0-16 4.9 10 11.1 1.7-8 7.7 1.8 11-9.8-5.2-9.8 5.2 1.8-11-8-7.7 11.1-1.7Z" fill="'+paint+'" stroke="#a47b48"/><path d="M0-11v9l-10-1" stroke="#fff8" fill="none" stroke-linecap="round"/>';
    case "shell": return radial("#fff7ed","#ead2dc","#a589aa")+'<path d="M-5 12C-9 7-18 5-17-3c0-7 7-10 10-9 3-4 11-4 14 0 5 0 10 4 10 9 0 8-9 10-12 15Q0 15-5 12Z" fill="'+paint+'" stroke="#aa91aa"/><path d="M0 10 0-11M-3 10-7-9m4 19-10-12m16 12 4-19m-4 19 10-12" stroke="#fff9" fill="none" stroke-width="1.2"/>';
    case "moon": return radial("#fff9d8","#ecd098","#a7804d")+'<path d="M6-14A15 15 0 1 0 14 6 13 13 0 0 1 6-14Z" fill="'+paint+'" stroke="#ab8659"/><path d="M-6-9q-6 5-5 12" stroke="#fff9" fill="none" stroke-width="1.7" stroke-linecap="round"/>';
    case "ribbon": return '<path d="M0 0Q-19-20-18-9-18 2 0 0q19-20 18-9 0 11-18 9m0 1Q-5 6-2 12t-8 11M0 1q7 5 5 10t8 9" fill="none" stroke="#8c3559" stroke-width="4.2" stroke-linecap="round"/><path d="M0 0Q-19-20-18-9-18 2 0 0q19-20 18-9 0 11-18 9m0 1Q-5 6-2 12t-8 11M0 1q7 5 5 10t8 9" fill="none" stroke="#e9a1be" stroke-width="2.4" stroke-linecap="round"/>';
    case "gold": return radial("#fff9d5","#d8a558","#8e6134")+'<circle r="12.8" fill="'+paint+'" stroke="#997344" stroke-width=".6"/><circle cx="-4.5" cy="-5" r="2.2" fill="#fff6cf"/>';
    case "clover": return radial("#e1edb7","#8ab38a","#4a755b")+'<path d="M0 0C-26-4-12-26 0-8 10-25 24-5 7 0 24 11 7 25 0 7-9 24-26 7 0 0ZM0 2q4 11 1 16" fill="'+paint+'" stroke="#63876a" stroke-width="1.2"/><circle r="2" fill="#eaf1ce"/>';
    case "butterfly": return radial("#f5e0ff","#c7a8e8","#8266aa")+'<path d="M-2 2C-27-4-21-22-9-15q8 5 9 13 1-8 9-13c12-7 18 11-7 17q19-3 12 9-8 8-14-5-6 13-14 5Q-21-1-2 2Z" fill="'+paint+'" stroke="#8c6baa"/><path d="M0 5V-3l-3-5m3 5 3-5" fill="none" stroke="#684f8b" stroke-linecap="round"/>';
    case "foilGold":
    case "foilSilver": {
      const silver = kind === "foilSilver";
      return radial("#fff",silver?"#d1cfdf":"#e7bc71",silver?"#87859e":"#a97439")+
        '<path d="m-13-4 7-5 7 2 4-5 8 4-3 9 3 4-8 1-2 6-8-4-6 3-3-7Z" fill="'+paint+'"/><path d="m-10-1 6-5 2 4 6-3 4 3m-15 6 5-2 3 4 5-3" fill="none" stroke="#fff" stroke-opacity=".76" stroke-width="1.1"/>';
    }
    case "microGem":
      return '<path d="M0-12 8-7 11 2 5 10-5 10-11 2-8-7Z" fill="#ebf0fc" stroke="#8f879f" stroke-width="1"/><path d="M0-12-4-3 3-4 8-7m-19 9 8 1-2 7 8-7 8-1-6 8" fill="#b2abc9"/><path d="M-4-3 3-4 3 3-3 3Z" fill="#fff"/>';
    case "waterDrop":
      return '<path d="M0-15C5-7 12 0 12 6a12 12 0 1 1-24 0c0-6 7-13 12-21Z" fill="#f0f6ff" fill-opacity=".24" stroke="#eeeefa" stroke-opacity=".9" stroke-width="1.4"/><path d="M-6 2c1-3 2-5 4-7M3 13q4-1 6-5" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/>';
    default: return "";
  }
}

const magneticFinishes = {
  cat: {angle:51, rx:14, ry:70, strength:.87, grain:115, seed:59},
  glass: {angle:15, rx:24, ry:43, strength:.74, grain:140, seed:79},
  velvet: {angle:27, rx:43, ry:61, strength:.48, grain:205, seed:143}
};

function magneticGlaze(kind, id, base) {
  const {angle,rx,ry,strength,grain,seed} = magneticFinishes[kind];
  const light = mix(base,"#fff7e8",.87);
  const tint = mix(base,"#f7dbe8",.55);
  const core = '<defs><radialGradient id="'+id+'-magnet" cx=".46" cy=".42" r=".55"><stop stop-color="#fffaf4" stop-opacity="'+strength+'"/><stop offset=".24" stop-color="'+light+'" stop-opacity="'+(strength*.93)+'"/><stop offset=".52" stop-color="'+light+'" stop-opacity="'+(strength*.49)+'"/><stop offset=".78" stop-color="'+tint+'" stop-opacity=".19"/><stop offset="1" stop-color="'+tint+'" stop-opacity="0"/></radialGradient></defs>';
  // Keep magnetic particles concentrated around the same axis as the light.
  const flecks = dots(seed,grain,(x,y,z) => {
    const theta = x * Math.PI * 2;
    const distance = Math.sqrt(y);
    const px = Math.cos(theta)*distance*rx;
    const py = Math.sin(theta)*distance*ry;
    const opacity = (.16+z*.57)*(1-y*.71);
    return '<ellipse cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" rx="'+(.15+z*.35).toFixed(2)+'" ry="'+(.24+z*.42).toFixed(2)+'" fill="'+(z>.65?"#fffaf2":light)+'" opacity="'+opacity.toFixed(2)+'"/>';
  });
  const refraction = kind === "glass" ?
    '<defs><radialGradient id="'+id+'-refraction" cx=".57" cy=".58"><stop offset=".27" stop-color="'+tint+'" stop-opacity="0"/><stop offset=".51" stop-color="'+light+'" stop-opacity=".19"/><stop offset=".67" stop-color="'+mix(base,"#fff0d6",.66)+'" stop-opacity=".38"/><stop offset=".83" stop-color="'+base+'" stop-opacity=".13"/><stop offset="1" stop-color="'+base+'" stop-opacity="0"/></radialGradient></defs><ellipse cx="2" cy="5" rx="29" ry="51" fill="url(#'+id+'-refraction)"/>' : "";
  return core+'<g transform="translate(50 80) rotate('+angle+')">'+refraction+
    '<ellipse rx="'+rx+'" ry="'+ry+'" fill="url(#'+id+'-magnet)"/>'+flecks+'</g>';
}

function wetCoat(id, soft) {
  const opacity = soft ? ".48" : ".85";
  return '<defs><linearGradient id="'+id+'-coat" gradientUnits="userSpaceOnUse" x1="28" y1="44" x2="43" y2="99"><stop stop-color="#fff" stop-opacity=".19"/><stop offset=".31" stop-color="#fff" stop-opacity="'+opacity+'"/><stop offset=".57" stop-color="#fffaf3" stop-opacity="'+opacity+'"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>'+
    '<path d="M47 38C36 47 28 63 26 87q.1 9 3 12c1-23 8-43 19-55q3-4-1-6Z" fill="url(#'+id+'-coat)"/>'+
    '<path d="M34 56q3-6 7-10m-9 14-1 2" stroke="#fff" stroke-opacity="'+opacity+'" stroke-width="1.18" fill="none" stroke-linecap="round"/>'+
    '<path d="M71 84q5 12 3 27-1 10-7 17" stroke="#fff4ea" stroke-opacity="'+(soft?".22":".56")+'" stroke-width="1.25" fill="none" stroke-linecap="round"/>';
}

function chromeGlaze(id, base) {
  const dark = mix(base,"#54576d",.8);
  const shine = mix(base,"#fcfaff",.86);
  return '<defs><linearGradient id="'+id+'-chrome" x1="0" y1=".15" x2="1" y2=".7"><stop stop-color="'+dark+'"/><stop offset=".18" stop-color="#a6a8c0"/><stop offset=".32" stop-color="'+shine+'"/><stop offset=".47" stop-color="#d4ccdf"/><stop offset=".52" stop-color="#676779"/><stop offset=".63" stop-color="#aaa9bd"/><stop offset=".78" stop-color="#f7f5ff"/><stop offset="1" stop-color="#62677d"/></linearGradient></defs><path d="M0 0h100v149H0z" fill="url(#'+id+'-chrome)"/>';
}

function nailSVG(item, finger = 2, use = "", position = "") {
  const id = "n" + (++serial);
  const base = item.color;
  const shape = shapes[item.shape][1];
  const sy = lengths[item.length][1] * [0.98,.99,1,.97,.85][finger];
  const sx = widths[finger];
  const magnetic = Object.hasOwn(magneticFinishes,item.finish);
  const glass = item.finish === "glass";
  const shade = mix(base, "#3b142d", item.finish === "matte" ? .21 : glass ? .25 : .36);
  const light = mix(base, "#fff9f8", item.finish === "matte" ? .13 : .44);
  const inner = item.finish === "jelly" || glass ? mix(base,"#fff2f7",glass ? .32 : .64) : base;
  const sheen = ["matte","chrome","velvet"].includes(item.finish) ? "" : '<path d="M24 92C23 67 35 37 47 33C41 45 37 54 34 65Q29 84 28 105Z" fill="#fff" opacity=".27"/><path d="M72 61c4 15 7 32 6 53" stroke="#fff" opacity=".37" stroke-width="1.4" fill="none"/>';
  const finish = {
    matte: () => dots(47,90,(x,y,z)=>'<circle cx="'+(x*100).toFixed(1)+'" cy="'+(y*147).toFixed(1)+'" r="'+(.23+z*.52).toFixed(1)+'" fill="#fff" opacity=".23"/>'),
    jelly: () => '<ellipse cx="46" cy="82" rx="28" ry="53" fill="url(#'+id+'-jelly)"/>',
    pearl: () => '<path d="M0 0h100v149H0z" fill="url(#'+id+'-pearl)"/>',
    glitter: () => dots(82,135,(x,y,z)=>'<circle cx="'+(x*100).toFixed(1)+'" cy="'+(y*150).toFixed(1)+'" r="'+(.26+z*1.25).toFixed(1)+'" fill="'+(z>.71?'#fff7db':'#fff')+'" opacity="'+(.16+z*.65).toFixed(2)+'"/>'),
    chrome: () => chromeGlaze(id,base)
  }[item.finish];
  const pattern = artMarkup(item.pattern,item.ink,id,shape);
  const material = magnetic ? magneticGlaze(item.finish,id,base) : (finish?.() ?? "");
  const reflection = magnetic ? wetCoat(id,item.finish === "velvet") : sheen;
  const underPattern = magnetic || item.finish === "chrome" ||
    ["silverTip","lace","porcelain","shellGrain"].includes(item.pattern);
  return '<svg xmlns="http://www.w3.org/2000/svg" class="nail-art" viewBox="0 13 100 143" aria-hidden="true" '+position+'><defs>'+
    '<clipPath id="'+id+'-clip"><path d="'+shape+'"/></clipPath>'+
    '<linearGradient id="'+id+'-base"><stop stop-color="'+shade+'"/><stop offset=".19" stop-color="'+light+'"/><stop offset=".53" stop-color="'+inner+'"/><stop offset=".8" stop-color="'+base+'"/><stop offset="1" stop-color="'+shade+'"/></linearGradient>'+
    '<radialGradient id="'+id+'-jelly"><stop stop-color="#fff2f5" stop-opacity=".65"/><stop offset="1" stop-color="#fff2f5" stop-opacity="0"/></radialGradient>'+
    '<linearGradient id="'+id+'-pearl" x2="1" y2="1"><stop stop-color="#ffdee3" stop-opacity="0"/><stop offset=".27" stop-color="#fff0c1" stop-opacity=".47"/><stop offset=".48" stop-color="#e0f3f1" stop-opacity=".6"/><stop offset=".65" stop-color="#e0c6f0" stop-opacity=".43"/><stop offset="1" stop-color="#fbe0e8" stop-opacity="0"/></linearGradient>'+
    '<filter id="'+id+'-charm" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.25" flood-color="#592a42" flood-opacity=".47"/></filter>'+
    '</defs><g transform="translate(50 147) scale('+sx+' '+sy+') translate(-50 -147)" data-nail-space="">'+
    '<path data-nail-shape="" d="'+shape+'" fill="url(#'+id+'-base)"/><g clip-path="url(#'+id+'-clip)">'+
    (underPattern ? material+pattern : pattern+material)+reflection+
    '<path d="'+shape+'" fill="none" stroke="'+shade+'" stroke-width="1.4" opacity=".58"/>'+
    item.decor.map(({kind,x,y,size},i) => '<g '+(use === "editor" ? 'data-charm-index="'+i+'"' : "")+' transform="translate('+x+' '+y+') scale('+size/30+')" filter="url(#'+id+'-charm)">'+
      (use === "editor" ? '<circle r="16" fill="transparent"/>' : "") + charmMarkup(kind,id+"c"+i)+'</g>').join("")+
    '</g></g></svg>';
}

const storage = {
  read(key, fallback) {
    try { return JSON.parse(localStorage.getItem("nail-atelier-" + key)) ?? fallback; }
    catch { return fallback; }
  },
  write(key, value) {
    try { localStorage.setItem("nail-atelier-" + key, JSON.stringify(value)); return true; }
    catch { return false; }
  }
};
function makeDesign(preset) { return {name:preset.name, tint:preset.tint, nails:copy(preset.nails)}; }
let design = storage.read("draft", makeDesign(presets[0]));
let saved = storage.read("collection", []);
let selected = 2;
let tab = "color";
let charmIndex = null;
let lastRandom = -1;
let activeRecipe;
let toastTimer;
let drag = null;
let rangeStart = null;
let exportUrl = null;
const undoStack = [];
const redoStack = [];
const editor = $("#editor-panel");
const row = $("#nail-row");
const dialog = $("#dialog");
const dialogBody = $("#dialog-body");

function announce(message) {
  if (dialog.open) {
    let status = dialogBody.querySelector(".dialog-status");
    if (!status) {
      status = document.createElement("p");
      status.className = "dialog-status";
      status.setAttribute("role", "status");
      dialogBody.append(status);
    }
    status.textContent = message;
    return;
  }
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3000);
}
function persist() {
  storage.write("draft", design);
  $("#undo").disabled = !undoStack.length;
  $("#redo").disabled = !redoStack.length;
}
function remember(before) {
  if (JSON.stringify(before) === JSON.stringify(design)) return;
  undoStack.push(before);
  if (undoStack.length > 70) undoStack.shift();
  redoStack.length = 0;
  persist();
}
function commit(change, update = render) {
  const before = copy(design);
  change();
  remember(before);
  update();
}
function stepHistory(from, to) {
  if (!from.length) return;
  to.push(copy(design));
  design = from.pop();
  charmIndex = null;
  persist();
  render();
}
function allTargets(change) {
  const applyAll = $("#apply-all").checked;
  design.nails.forEach((item, i) => {
    if (applyAll || i === selected) change(item, i);
  });
}
function showDesign(value) {
  charmIndex = null;
  commit(() => { design = makeDesign(value); });
  $("#workbench").scrollIntoView({block:"nearest"});
}
function setSelected(index) {
  if (selected !== index) {
    selected = index;
    charmIndex = null;
  }
  render();
}
function renderStage() {
  const focused = row.contains(document.activeElement) ? document.activeElement.dataset.finger : undefined;
  $("#design-label").textContent = design.name;
  $("#design-label").title = design.name;
  $("#display-index").textContent = "正在编辑 " + fingers[selected];
  $("#display").style.background = "radial-gradient(ellipse at 50% 35%,#fff8f6 5%,"+mix(design.tint,"#ffffff",.45)+" 65%,"+design.tint+" 100%)";
  row.innerHTML = design.nails.map((item, i) =>
    '<button type="button" data-finger="'+i+'" aria-label="编辑'+fingers[i]+'" aria-pressed="'+(selected===i)+'" class="nail-button'+(i===selected?' active':'')+(item.decor.length?' has-charm':'')+'">'+
    nailSVG(item,i,"editor")+'<span class="finger-label">'+fingers[i]+'</span></button>').join("");
  if (focused !== undefined && !drag) row.querySelector('[data-finger="'+focused+'"]')?.focus({preventScroll:true});
  $("#tray-hint span:last-child").textContent = tab === "charm" ? "在甲片上拖动饰品，可调整位置" : "点一片甲开始设计";
}
function panelGroup(title, summary, content) {
  return '<div class="panel-group"><div class="panel-heading"><h3>'+title+'</h3>'+(summary?'<span>'+summary+'</span>':'')+'</div>'+content+'</div>';
}
function option(key, id, label, active, art = "") {
  return '<button type="button" class="option'+(art && !art.includes("finish-sample")?' figure':'')+(active?' active':'')+'" data-key="'+key+'" data-value="'+id+'" aria-pressed="'+active+'">'+art+'<span>'+label+'</span></button>';
}
function swatches(key, current, colors, caption) {
  const known = colors.some(([,color]) => color === current);
  return '<div class="swatches">'+colors.map(([name,color]) =>
    '<button type="button" class="swatch'+(color===current?' active':'')+'" data-key="'+key+'" data-value="'+color+'" style="--swatch:'+color+'" aria-label="'+name+'" title="'+name+' '+color.toUpperCase()+'" aria-pressed="'+(color===current)+'"></button>').join("")+
    '<label class="color-picker'+(!known?' active':'')+'" title="'+caption+'">'+icon("plus")+'<input type="color" value="'+current+'" aria-label="'+caption+'" data-color-key="'+key+'"></label></div>';
}
function optionGrid(items, four = false) {
  return '<div class="option-grid'+(four?' four':'')+'">'+items.join("")+'</div>';
}
function renderEditor() {
  const old = editor.contains(document.activeElement) ? document.activeElement : null;
  const focused = old?.dataset.key ? '[data-key="'+old.dataset.key+'"][data-value="'+old.dataset.value+'"]' :
    old?.dataset.colorKey ? '[data-color-key="'+old.dataset.colorKey+'"]' :
    old?.id ? '#'+old.id : null;
  const item = design.nails[selected];
  $("#edit-target").textContent = $("#apply-all").checked ? "样式同时应用到五片甲" : "当前选中 "+fingers[selected];
  $("#tabs").querySelectorAll("[data-tab]").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.tab === tab));
    button.tabIndex = button.dataset.tab === tab ? 0 : -1;
  });
  editor.setAttribute("aria-labelledby", "tab-"+tab);
  if (tab === "shape") {
    editor.innerHTML = panelGroup("选择甲型", shapes[item.shape][0], optionGrid(Object.entries(shapes).map(([key,[label]]) =>
      option("shape",key,label,key===item.shape,nailSVG(nail("#d9a3ba","gloss","none","#fff0dc",[],key))))))+
      panelGroup("甲片长度", lengths[item.length][0]+"款", optionGrid(Object.entries(lengths).map(([key,[label]]) => option("length",key,label+"款",key===item.length))))+
      '<p class="small-note panel-group">可以给不同指甲搭配不同甲型和长度。</p>';
  } else if (tab === "color") {
    editor.innerHTML = panelGroup("底色", colorName(item.color), swatches("color", item.color, palette, "自定义底色"))+
      panelGroup("表面质感", finishes[item.finish], optionGrid(Object.entries(finishes).map(([key,label]) =>
        option("finish",key,label,key===item.finish,'<span class="finish-sample finish-'+key+'" aria-hidden="true"></span>'))));
  } else if (tab === "art") {
    editor.innerHTML = panelGroup("选择花纹", patterns[item.pattern], optionGrid(Object.entries(patterns).map(([key,label]) => {
      const id = "p" + (++serial);
      const mark = '<svg class="pattern-art" viewBox="0 16 100 125" aria-hidden="true"><rect x="18" y="21" width="64" height="115" rx="20" fill="#eed4df"/><clipPath id="'+id+'"><rect x="18" y="21" width="64" height="115" rx="20"/></clipPath><g clip-path="url(#'+id+')">'+artMarkup(key,"#a75a7c",id)+'</g></svg>';
      return option("pattern",key,label,key===item.pattern,mark);
    }),true))+
      (item.pattern === "silverTip"
        ? panelGroup("花纹颜色", "镜面银", '<p class="small-note">银边保留金属反光，可以在「底色」换甲片颜色。</p>')
        : panelGroup("花纹颜色", colorName(item.ink), swatches("ink", item.ink,
          [0,3,5,7,9,15,17,21,22,26,27,28,29,30].map((i)=>palette[i]), "自定义花纹色")));
  } else {
    const active = item.decor[charmIndex];
    editor.innerHTML = panelGroup("点一下添加", "本片 "+item.decor.length+" / 6", optionGrid(Object.entries(charms).map(([key,label]) =>
      option("charm",key,label,false,'<svg class="charm-art" viewBox="-25 -24 50 50" aria-hidden="true">'+charmMarkup(key,"p"+(++serial))+'</svg>')),true))+
      (active ? panelGroup("调整"+charms[active.kind], "", '<div class="charm-edit"><label for="charm-size">大小<input type="range" min="10" max="43" value="'+active.size+'" id="charm-size"></label><button type="button" id="remove-charm" class="text-button">移除选中</button></div>') :
        '<p class="small-note panel-group">点选或拖动甲片上的饰品，可调整位置和大小。</p>')+
      (item.decor.length || ($("#apply-all").checked && design.nails.some((n) => n.decor.length)) ? '<button type="button" class="text-button" id="clear-charms">'+($("#apply-all").checked?"清空五指饰品":"清空本片饰品")+'</button>' : "");
  }
  if (focused) editor.querySelector(focused)?.focus({preventScroll:true});
}
function render() { renderStage(); renderEditor(); }

function miniSet(nails, tint) {
  return '<div class="preset-image" style="--card-tint:'+tint+'" aria-hidden="true">'+nails.map((n,i)=>nailSVG(n,i)).join("")+'</div>';
}
function renderPresets() {
  $("#presets").innerHTML = presets.map((preset,i) => '<button type="button" class="preset" data-preset="'+i+'">'+miniSet(preset.nails,preset.tint)+
    '<div class="preset-caption"><span><strong>'+preset.name+'</strong><small>'+preset.detail+'</small></span>'+icon("next")+'</div></button>').join("");
}
const trendLabels = {daily:"通勤短甲", warm:"秋冬暖调", cool:"清冷微光"};
function renderTrends(category = "all") {
  $("#trend-presets").innerHTML = trendPresets.map((preset,i) => {
    if (category !== "all" && preset.category !== category) return "";
    return '<article class="trend-card">'+
      '<button type="button" class="trend-apply" data-trend-apply="'+i+'" aria-label="套用'+preset.name+'">'+miniSet(preset.nails,preset.tint)+
      '<span class="trend-caption"><span class="trend-tag">'+trendLabels[preset.category]+'</span><strong>'+preset.name+'</strong><small>'+preset.detail+'</small></span></button>'+
      '<div class="trend-actions"><button type="button" class="text-button" data-trend-recipe="'+i+'" aria-label="查看'+preset.name+'配方">'+icon("list")+'看配方</button>'+
      '<button type="button" class="text-button trend-load" data-trend-apply="'+i+'">套用'+icon("next")+'</button></div></article>';
  }).join("");
}
function applyTrend(index) {
  showDesign(trendPresets[index]);
  $(".tray").scrollIntoView({block:"start"});
  row.querySelector('[data-finger="'+selected+'"]').focus({preventScroll:true});
  announce("已套用配方，可继续改色和摆饰品");
}
function renderCount() {
  const count = $("#collection-count");
  count.hidden = !saved.length;
  count.textContent = saved.length;
}
function openDialog(title, body) {
  if (exportUrl) {
    URL.revokeObjectURL(exportUrl);
    exportUrl = null;
  }
  $("#dialog-title").textContent = title;
  dialogBody.innerHTML = body;
  if (!dialog.open) dialog.showModal();
}
function openCollection() {
  openDialog("我的作品", saved.length
    ? '<div class="collection">'+saved.map((work,i) =>
      '<article class="collection-item">'+miniSet(work.nails,work.tint)+'<strong>'+escapeText(work.name)+'</strong><button type="button" class="text-button" data-open-work="'+i+'">继续编辑</button><button type="button" class="text-button" data-export-work="'+i+'">导出</button><button type="button" class="text-button" data-delete-work="'+i+'">删除</button></article>').join("")+'</div>'
    : '<p class="small-note">设计好一套后，点「保存作品」，就能在这里继续编辑。</p>');
}
function openSave() {
  openDialog("保存这套穿戴甲", '<form class="dialog-form" id="save-form"><label for="work-name">作品名称<input id="work-name" name="workName" maxlength="30" required value="'+escapeText(design.name)+'"></label><button type="submit" class="button primary">保存作品</button></form>');
  $("#work-name").focus();
  $("#work-name").select();
}
function recipeLine(item) {
  const base = colorName(item.color) + (colorName(item.color) === item.color.toUpperCase() ? "" : " "+item.color.toUpperCase());
  const ink = colorName(item.ink);
  const art = item.pattern === "none" ? "" : "、"+patterns[item.pattern]+
    (item.pattern === "silverTip" ? "" : "（"+ink+(ink === item.ink.toUpperCase() ? "" : " "+item.ink.toUpperCase())+"）");
  const decor = item.decor.map(({kind,x,y,size}) => {
    const height = y < 65 ? "甲尖" : y > 111 ? "甲根" : "中部";
    const side = x < 42 ? "偏左" : x > 58 ? "偏右" : "";
    const scale = size < 18 ? "小" : size > 30 ? "大" : "中";
    return charms[kind]+"（"+height+side+"，"+scale+"）";
  }).join("、");
  return shapes[item.shape][0]+lengths[item.length][0]+"款，"+base+"，"+finishes[item.finish]+art+(decor ? "；饰品 "+decor : "");
}
function openRecipe(work, trendIndex) {
  activeRecipe = work;
  const tip = work.tip ? '<p class="recipe-tip">'+escapeText(work.tip)+'</p>' : '';
  const apply = trendIndex === undefined ? "" : '<button type="button" class="button outline" data-apply-recipe="'+trendIndex+'">套用这套</button>';
  openDialog((work.tip ? "款式配方 · " : "实做清单 · ")+work.name,
    tip+'<ul class="recipe-list">'+work.nails.map((item,i) => '<li><strong>'+fingers[i]+'</strong>'+escapeText(recipeLine(item))+'</li>').join("")+
    '</ul><div class="dialog-actions"><button type="button" class="button primary" id="copy-recipe">复制清单</button>'+apply+'</div>');
}
async function copyRecipe() {
  const work = activeRecipe;
  const text = [work.name,work.tip,...work.nails.map((item,i) => fingers[i]+"　"+recipeLine(item))].filter(Boolean).join("\n");
  try {
    if (navigator.clipboard) await navigator.clipboard.writeText(text);
    else {
      const area = document.createElement("textarea");
      area.value = text;
      dialogBody.append(area);
      area.select();
      const copied = document.execCommand("copy");
      area.remove();
      if (!copied) throw new Error("copy");
    }
    announce("已复制实做清单");
  } catch {
    openDialog("实做清单 · "+work.name, '<textarea class="recipe-text" rows="9" readonly aria-label="实做清单">'+escapeText(text)+'</textarea><p class="small-note">选中文字，即可手动复制。</p>');
    $(".recipe-text").focus();
    $(".recipe-text").select();
  }
}

async function exportPNG(work = design) {
  const captured = copy(work);
  const width = 1200, height = 740;
  const art = captured.nails.map((item,i) => nailSVG(item,i,"",'x="'+(98+i*210)+'" y="151" width="168" height="311"')).join("");
  const background = mix(captured.tint,"#ffffff",.45);
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'"><defs><filter id="card-shadow" x="-20%" y="-35%" width="140%" height="180%"><feDropShadow dx="0" dy="15" stdDeviation="13" flood-color="#69374b" flood-opacity=".26"/></filter></defs><rect width="1200" height="740" fill="'+background+'"/><rect x="36" y="36" width="1128" height="668" rx="32" fill="#fff8" stroke="#fff"/><g filter="url(#card-shadow)">'+art+'</g></svg>';
  const url = URL.createObjectURL(new Blob([svg],{type:"image/svg+xml;charset=utf-8"}));
  try {
    const artImage = new Image();
    artImage.src = url;
    await artImage.decode();
    const canvas = document.createElement("canvas");
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(artImage,0,0);
    ctx.textAlign = "center";
    ctx.fillStyle = "#632c46";
    ctx.font = "italic 24px Georgia, serif";
    ctx.fillText("The Nail Atelier",600,99);
    ctx.font = 'bold 47px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(captured.name,600,158,1010);
    captured.nails.forEach((item,i) => {
      const x = 182+i*210;
      ctx.fillStyle = "#53283d";
      ctx.font = 'bold 25px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText(fingers[i],x,494);
      ctx.fillStyle = "#765363";
      ctx.font = '20px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText(shapes[item.shape][0]+lengths[item.length][0]+"款 · "+finishes[item.finish],x,534,180);
      ctx.fillText(colorName(item.color),x,565,180);
      ctx.fillStyle = item.color;
      ctx.beginPath(); ctx.arc(x,603,10,0,2*Math.PI); ctx.fill();
      ctx.strokeStyle = "#8e6079"; ctx.lineWidth = 1; ctx.stroke();
    });
    ctx.fillStyle = "#765363";
    ctx.font = '19px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText("穿戴甲设计参考",600,669);
    const png = await new Promise((resolve) => canvas.toBlob(resolve,"image/png"));
    if (!png) throw new Error("png");
    const fileName = captured.name.replace(/[\\/:*?"<>|]/g,"-")+".png";
    const href = URL.createObjectURL(png);
    openDialog("导出设计图", '<img class="export-preview" src="'+href+'" alt="'+escapeText(captured.name)+'的五指穿戴甲参考图"><div class="dialog-actions"><a class="button primary" href="'+href+'" download="'+escapeText(fileName)+'">'+icon("download")+'下载 PNG</a></div><p class="small-note export-note">手机也可以长按图片保存。</p>');
    exportUrl = href;
  } catch {
    announce("暂时无法导出图片，请重试");
  } finally {
    URL.revokeObjectURL(url);
  }
}

function randomDesign() {
  const themes = [
    ["浆果晚宴","#ead5e4",["#832442","#f3cadb","#613451","#d08ca6"],"almond","long"],
    ["蜜桃冰茶","#f0dad3",["#f3c7b5","#f3ab87","#b9584d","#fff0dc"],"oval","medium"],
    ["蓝调星光","#e3e4f1",["#7eabc7","#e8e9ef","#b6d2e6","#afa3bf"],"stiletto","long"],
    ["春日奶油","#e8eddb",["#d2dda9","#6e936c","#fff0dc","#f5dda1"],"square","short"],
    ["焦糖拿铁","#ecded5",["#6a4038","#dbc0ae","#b67b58","#fff0dc"],"coffin","medium"],
    ["薰衣草糖","#e9deef",["#c9b6e7","#fff0dc","#613451","#f3cadb"],"almond","medium"],
    ["莓果格纹","#efdee6",["#b83c58","#fff0dc","#d08ca6","#832442"],"square","medium"],
    ["日落贝壳","#f1dedd",["#f3ab87","#fff0dc","#d08ca6","#f5dda1"],"oval","long"],
    ["琥珀糖","#efdbbb",["#dca162","#dbc0ae","#765446","#6a4038"],"square","short"],
    ["葡萄糖霜","#e3d6ee",["#563762","#c9b6e7","#d08ca6","#afa3bf"],"oval","medium"]
  ];
  const pick = (values) => values[Math.floor(Math.random()*values.length)];
  const choices = themes.map((_,i)=>i).filter((i)=>i!==lastRandom);
  lastRandom = pick(choices);
  const [name,tint,[a,b,c,d],shape,length] = themes[lastRandom];
  const jewel = pick(["bow","heart","shell","star","diamond","butterfly","flower","clover"]);
  const nails = [
    nail(a,pick(["cat","gloss","jelly","velvet"]),pick(["none","french","waves","amberFlow"]),b,[],shape,length),
    nail(b,pick(["gloss","pearl","matte"]),pick(["plaid","flowers","dots","hearts","softPlaid","leopard"]),a,[],shape,length),
    nail(c,pick(["cat","jelly","glitter","glass"]),"none",b,[charm(jewel,50,87,32)],shape,length),
    nail(d,pick(["gloss","jelly","pearl"]),pick(["ombre","micro","french","halo","silverTip"]),a,[charm("pearl",50,111,14)],shape,length),
    nail(a,pick(["gloss","glitter","jelly"]),pick(["none","micro","marble"]),d,[],shape,length)
  ];
  showDesign({name,tint,nails});
  announce("试试「"+name+"」");
}

function addCharm(kind) {
  const slots = [[50,85],[50,111],[50,58],[35,96],[65,96],[50,129]];
  let added = false;
  commit(() => {
    allTargets((item,i) => {
      if (item.decor.length >= slots.length) return;
      const [x,y] = slots[item.decor.length];
      const size = {bow:34,microGem:13,foilGold:20,foilSilver:20}[kind] ?? 25;
      item.decor.push(charm(kind,x,y,size));
      added = true;
      if (i === selected) charmIndex = item.decor.length - 1;
    });
  });
  if (!added) announce("每片甲最多放 6 个饰品");
}
function setOption(button) {
  const {key,value} = button.dataset;
  if (key === "charm") {
    addCharm(value);
    return;
  }
  commit(() => allTargets((item) => { item[key] = value; }));
}
function setTab(next) {
  tab = next;
  render();
}

document.querySelectorAll("[data-icon]").forEach((node) => { node.innerHTML = icon(node.dataset.icon); });
$("#tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (button) setTab(button.dataset.tab);
});
$("#tabs").addEventListener("keydown", (event) => {
  const tabs = [...$("#tabs").querySelectorAll("[data-tab]")];
  const index = tabs.findIndex((button)=>button.dataset.tab === tab);
  const target = {ArrowRight:(index+1)%tabs.length,ArrowLeft:(index+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1}[event.key];
  if (target === undefined) return;
  event.preventDefault();
  setTab(tabs[target].dataset.tab);
  tabs[target].focus();
});
$("#apply-all").addEventListener("change", renderEditor);
editor.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.key) setOption(button);
  if (button.id === "remove-charm") {
    commit(() => {
      design.nails[selected].decor.splice(charmIndex,1);
      charmIndex = null;
    });
  }
  if (button.id === "clear-charms") {
    commit(() => {
      allTargets((item)=>{ item.decor = []; });
      charmIndex = null;
    });
  }
});
editor.addEventListener("input", (event) => {
  const control = event.target;
  const key = control.dataset.colorKey;
  if (control.id !== "charm-size" && !key) return;
  rangeStart ??= copy(design);
  if (key) allTargets((item)=>{ item[key] = hex(control.value); });
  else if (design.nails[selected].decor[charmIndex]) design.nails[selected].decor[charmIndex].size = Number(control.value);
  renderStage();
});
editor.addEventListener("change", (event) => {
  if (!rangeStart) return;
  remember(rangeStart);
  rangeStart = null;
  if (event.target.dataset.colorKey) renderEditor();
});
editor.addEventListener("focusout", () => {
  if (!rangeStart) return;
  remember(rangeStart);
  rangeStart = null;
});

row.addEventListener("click", (event) => {
  const button = event.target.closest("[data-finger]");
  if (button) setSelected(Number(button.dataset.finger));
});
row.addEventListener("pointerdown", (event) => {
  const target = event.target.closest("[data-charm-index]");
  if (!target || event.button !== 0 || drag) return;
  const svg = target.closest("svg");
  const matrix = svg.querySelector("[data-nail-space]").getScreenCTM();
  if (!matrix) return;
  const inverse = matrix.inverse();
  const finger = Number(target.closest("[data-finger]").dataset.finger);
  const index = Number(target.dataset.charmIndex);
  const item = design.nails[finger].decor[index];
  const point = new DOMPoint(event.clientX,event.clientY).matrixTransform(inverse);
  drag = {pointer:event.pointerId,inverse, before:copy(design), offsetX:item.x-point.x, offsetY:item.y-point.y};
  selected = finger;
  charmIndex = index;
  tab = "charm";
  row.setPointerCapture(event.pointerId);
  event.preventDefault();
});
function moveCharm(x,y) {
  const item = design.nails[selected].decor[charmIndex];
  const path = row.querySelector('[data-finger="'+selected+'"] [data-nail-shape]');
  x = clamp(x,23,77);
  y = clamp(y,38,135);
  if (path?.isPointInFill) {
    for (let attempts=0; attempts<10 && !path.isPointInFill(new DOMPoint(x,y)); attempts++) x = (x+50)/2;
  }
  item.x = Math.round(x);
  item.y = Math.round(y);
}
row.addEventListener("pointermove", (event) => {
  if (!drag || event.pointerId !== drag.pointer) return;
  const point = new DOMPoint(event.clientX,event.clientY).matrixTransform(drag.inverse);
  moveCharm(point.x+drag.offsetX,point.y+drag.offsetY);
  renderStage();
});
function finishDrag(event) {
  if (!drag || event.pointerId !== drag.pointer) return;
  const before = drag.before;
  drag = null;
  remember(before);
  render();
}
row.addEventListener("pointerup", finishDrag);
row.addEventListener("pointercancel", finishDrag);
row.addEventListener("lostpointercapture", finishDrag);
row.addEventListener("keydown", (event) => {
  const finger = Number(event.target.dataset.finger);
  if (!Number.isInteger(finger) || !event.key.startsWith("Arrow")) return;
  if (tab === "charm" && design.nails[finger].decor.length && event.shiftKey) {
    event.preventDefault();
    if (selected !== finger) charmIndex = null;
    selected = finger;
    charmIndex ??= 0;
    const item = design.nails[finger].decor[charmIndex];
    if (!item) return;
    const [dx,dy] = {ArrowLeft:[-2,0],ArrowRight:[2,0],ArrowUp:[0,-2],ArrowDown:[0,2]}[event.key];
    commit(() => moveCharm(item.x+dx,item.y+dy));
  } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    const next = (finger+(event.key === "ArrowRight" ? 1 : 4))%5;
    setSelected(next);
    row.querySelector('[data-finger="'+next+'"]').focus({preventScroll:true});
  }
});

$("#random").addEventListener("click", randomDesign);
$("#undo").addEventListener("click", () => stepHistory(undoStack,redoStack));
$("#redo").addEventListener("click", () => stepHistory(redoStack,undoStack));
$("#blank").addEventListener("click", () => showDesign({name:"新设计",tint:"#f3d7e1",nails:Array.from({length:5},()=>nail("#f3c7b5","gloss","none","#fff0dc",[],"oval","medium"))}));
$("#recipe").addEventListener("click", () => openRecipe(design));
$("#save").addEventListener("click", openSave);
$("#export").addEventListener("click", () => exportPNG());
$("#nav-collection").addEventListener("click", openCollection);
$("#nav-studio").addEventListener("click", () => window.scrollTo({top:0}));
$("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => {
  if (!exportUrl) return;
  const url = exportUrl;
  exportUrl = null;
  setTimeout(() => URL.revokeObjectURL(url), 2000);
});
$("#trend-filters").addEventListener("click", (event) => {
  const filter = event.target.closest("[data-filter]");
  if (!filter) return;
  $("#trend-filters").querySelectorAll("[data-filter]").forEach((button) => {
    button.setAttribute("aria-pressed",String(button === filter));
  });
  renderTrends(filter.dataset.filter);
});
$("#trend-presets").addEventListener("click", (event) => {
  const apply = event.target.closest("[data-trend-apply]");
  const recipe = event.target.closest("[data-trend-recipe]");
  if (apply) {
    applyTrend(Number(apply.dataset.trendApply));
  }
  if (recipe) {
    const i = Number(recipe.dataset.trendRecipe);
    openRecipe(trendPresets[i], i);
  }
});
$("#presets").addEventListener("click", (event) => {
  const button = event.target.closest("[data-preset]");
  if (button) showDesign(presets[Number(button.dataset.preset)]);
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const {left,right,top,bottom} = dialog.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) dialog.close();
  }
  const button = event.target.closest("button");
  if (!button) return;
  if (button.id === "copy-recipe") copyRecipe();
  if (button.dataset.applyRecipe !== undefined) {
    dialog.close();
    applyTrend(Number(button.dataset.applyRecipe));
  }
  if (button.dataset.openWork !== undefined) {
    showDesign(saved[Number(button.dataset.openWork)]);
    dialog.close();
  }
  if (button.dataset.exportWork !== undefined) exportPNG(saved[Number(button.dataset.exportWork)]);
  if (button.dataset.deleteWork !== undefined) {
    const i = Number(button.dataset.deleteWork);
    openDialog("删除这套作品？", '<p>'+escapeText(saved[i].name)+'</p><div class="dialog-actions"><button type="button" class="button outline" id="cancel-delete">返回作品</button><button type="button" class="button primary" data-confirm-delete="'+i+'">确认删除</button></div>');
  }
  if (button.id === "cancel-delete") openCollection();
  if (button.dataset.confirmDelete !== undefined) {
    const i = Number(button.dataset.confirmDelete);
    const next = saved.filter((_,index)=>index!==i);
    if (storage.write("collection",next)) {
      saved = next;
      renderCount();
      openCollection();
    } else announce("作品暂时无法删除，请重试");
  }
});
dialog.addEventListener("submit", (event) => {
  if (event.target.id !== "save-form") return;
  event.preventDefault();
  const input = $("#work-name");
  const name = input.value.trim();
  if (!name) {
    input.setCustomValidity("请输入作品名称");
    input.reportValidity();
    return;
  }
  const work = copy(design);
  work.name = name;
  const next = [work,...saved.filter((item) => JSON.stringify(item) !== JSON.stringify(work))];
  if (!storage.write("collection",next)) {
    announce("保存失败，请检查浏览器的储存空间");
    return;
  }
  saved = next;
  commit(() => { design.name = name; });
  renderCount();
  dialog.close();
  announce("已存到我的作品");
});
dialog.addEventListener("input", (event) => {
  if (event.target.id === "work-name") event.target.setCustomValidity("");
});
document.addEventListener("keydown", (event) => {
  if (dialog.open || event.target.matches("input, textarea, [contenteditable]") || !(event.ctrlKey || event.metaKey)) return;
  const key = event.key.toLowerCase();
  if (key !== "z" && key !== "y") return;
  event.preventDefault();
  if (key === "y" || event.shiftKey) stepHistory(redoStack,undoStack);
  else stepHistory(undoStack,redoStack);
});

renderTrends();
renderPresets();
renderCount();
render();
