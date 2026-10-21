/* Data-driven, exact-proportion teaching diagrams. No external dependencies. */
(()=>{
'use strict';
const num=v=>{const a=String(v??0).split('/').map(Number);return a.length===2?a[0]/a[1]:a[0]},E=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const C={ink:'#244e40',green:'#15785d',light:'#d8ead3',blue:'#4f76a9',orange:'#c37a30',gold:'#f2c67e'};
const txt=(x,y,s,size=23,color=C.ink,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-size="${size}">${E(s)}</text>`;
const line=(x1,y1,x2,y2,color=C.ink,width=2,dash='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${dash?'stroke-dasharray="'+dash+'"':''}/>`;
const rect=(x,y,w,h,fill='none',stroke=C.green)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const circ=(x,y,r,fill='none',stroke=C.green,sw=3)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const brace=(x1,x2,y,label,color=C.ink)=>line(x1,y,x2,y,color)+line(x1,y-6,x1,y+6,color)+line(x2,y-6,x2,y+6,color)+txt((x1+x2)/2,y+30,label,23,color);
const fade=(p,start,content)=>`<g opacity="${Math.max(0,Math.min(1,p-start+1))}">${content}</g>`;
function draw(q,p=0){
 const m=q.model, t=m.type;let s='',cap=''; const known=q.given.join('；');
 const bar=(x,y,w,h,n,k)=>{let z='';for(let i=0;i<n;i++)z+=rect(x+i*w/n,y,w/n,h,i<k?C.light:'#fff');return z};
 if(t==='fraction'){
  const {k,n,mode,unit}=m,x=90,w=720,y=105,h=65,part=w*k/n;
  s=txt(450,48,'把整体看成单位“1”，每一格一样大',24)+bar(x,y,w,h,n,p>=.3?k:0);
  s+=fade(p,1,brace(x,x+w,62,mode==='part'?`整体：${m.total}${unit}`:'整体：？',C.green));
  let left=mode==='part'?'这部分：？':`这部分：${m.part}${unit}`;
  if(mode==='remaining')left=`已用 ${k}/${n}`;
  s+=fade(p,1,brace(x,x+part,193,left,mode==='part'?C.orange:C.green));
  const right=mode==='remaining'?`剩下：${m.rest}${unit}（${n-k}/${n}）`:mode==='other'?'另一部分：？':`其余 ${n-k}/${n}`;
  s+=fade(p,1.6,brace(x+part,x+w,193,right,C.orange));
  cap=mode==='part'?'整体已知，找它的几分之几：从全部取出对应的份数。':mode==='remaining'?`已知的是剩下的 ${n-k} 份，不是用掉的 ${k} 份。先找对应分数，再求整体。`:mode==='other'?'两部分共用同一个整体。先求每一份或先求整体，再求另一部分。':'已知部分有多少，倒过来求整体：先从这几份找到一份，再还原全部。';
 }else if(t==='share'){
  const x=90,w=720,y=70,h=145; s=txt(450,38,'一整条表示 1 个单位',23)+bar(x,y,w,h,m.b,p>=.3?m.a:0);
  s+=fade(p,1,Array.from({length:m.n-1},(_,i)=>line(x,y+h*(i+1)/m.n,x+w*m.a/m.b,y+h*(i+1)/m.n,C.blue,2)).join(''));
  s+=fade(p,2,rect(x,y,w*m.a/m.b,h/m.n,C.gold,C.orange)+txt(450,265,`把 ${m.a}/${m.b} 平均分成 ${m.n} 份，橙色表示其中一份`,23));
  cap='先认清总量，再平均分。图中未涂色的部分不属于这次拿来分的总量。';
 }else if(t==='groups'){
  const r=num(m.total)/num(m.each),n=Math.ceil(r),x=90,w=720,y=100,visible=Math.min(n,24);s=txt(450,48,`总量 ${m.total}，每份 ${m.each}`,25);
  for(let i=0;i<visible;i++){let f=Math.min(1,r-i);s+=rect(x+i*w/visible,y,w/visible,65,'#fff');if(p>=1)s+=rect(x+i*w/visible,y,w/visible*f,65,f<1?C.gold:C.light);if(f<1)s+=line(x+(i+f)*w/visible,y,x+(i+f)*w/visible,y+65,C.orange,3,'6 4')}
  s+=fade(p,1,brace(x,x+w/visible,187,`每份 ${m.each}`));s+=fade(p,2,txt(450,275,m.cuts?'每两个相邻小段之间，才需要剪一刀。':m.container?'满瓶数和至少需要的瓶数，问法不同。':'数一数：总量里有多少个这样的每份量？',24,C.orange));
  cap=m.cuts?'先算段数；一根绳子分成 n 段，剪的次数是 n−1。':m.container?'末尾的不足一份也需要一个容器。先分清求“装满几个”“至少几个”还是“余下多少”。':'每份量已知，要看总量包含几个每份量。总量 ÷ 每份量 = 份数。';
 }else if(t==='ratio'){
  const W=600/Math.max(1,m.k/m.n);s=txt(100,80,'蓝色',24)+bar(170,55,W,48,m.n,0)+txt(100,180,'红色',24)+bar(170,155,W*m.k/m.n,48,m.k,p>=1?m.k:0);
  s+=fade(p,1,txt(480,130,m.reverse?'蓝绳：？':`蓝绳：${m.total}${m.unit}`,23));
  s+=fade(p,2,txt(480,250,`红绳是蓝绳的 ${m.k}/${m.n}；${m.reverse?'红绳：'+m.part+m.unit:'求红绳长度'}`,25,C.orange));
  cap='“谁是谁的几分之几”，就把“谁的”后面的量看成单位“1”。先找比较的标准。';
 }else if(t==='rate'){
  s=txt(450,40,'时间和路程一一对应',24);
  for(const [y,label] of [[105,'时间'],[200,'路程']])s+=txt(90,y,label,24)+line(160,y-7,790,y-7)+line(160,y-15,160,y+2)+line(475,y-15,475,y+2)+line(790,y-15,790,y+2);
  s+=fade(p,1,txt(475,80,`${m.time} 小时`,23)+txt(475,175,`${m.distance} 千米`,23)+line(475,110,475,155,C.blue,2,'6 5'));
  s+=fade(p,2,txt(790,80,m.findtime?'？小时':`${m.targetTime} 小时`,23,C.orange)+txt(790,175,m.findtime?`${m.targetDistance} 千米`:'？千米',23,C.orange));
  s+=txt(450,280,'先求每小时的路程，再找目标时间或目标路程',23);cap='这是对应关系示意，刻度不代表实际比例。先把已知的时间和路程配成一对，再求单位量。';
 }else if(t==='rect'){
  const length=num(m.area)/num(m.width),W=Math.min(480,180*length/num(m.width)),H=W*num(m.width)/length,x=(900-W)/2,y=(300-H)/2;s=rect(x,y,W,H,p>=1?C.light:'#fff')+txt(450,150,`面积 ${m.area} 平方米`,27)+fade(p,1,txt(x+W+85,150,`宽 ${m.width} 米`,23))+fade(p,2,brace(x,x+W,260,'长：？米',C.orange));cap='面积是长和宽相乘得到的。面积与一条边已知，就能反过来求另一条边。';
 }else if(t==='square'){
  const W=Math.min(440,230*num(m.l)/num(m.w)),H=W*num(m.w)/num(m.l),x=(900-W)/2,y=(310-H)/2,r=Math.min(H/2,W/(2*m.count));
  s=rect(x,y,W,H,p>=1&&m.cut?C.gold:'#fff');
  for(let i=0;i<m.count;i++)s+=circ(x+(W-(m.count*2*r))/2+r+2*r*i,y+H/2,r,p>=1?C.light:'#fff');
  s+=fade(p,1,txt(450,Math.min(300,y+H+30),`长 ${m.l}，宽 ${m.w}（按图中比例）`,22));
  s+=fade(p,2,txt(450,32,m.cut?'阴影面积 = 正方形面积 − 圆面积':'圆的直径受边长限制',24,C.orange));cap=m.cut?'圆的直径等于正方形边长。把阴影补成完整正方形，再减去圆。':'圆必须完整放在边界内。一个最大圆看短边，并排多个圆还要看长边够不够。';
 }else if(t==='half'){
  const x=340,y=180,r=125,arc=`M ${x-r} ${y} A ${r} ${r} 0 0 1 ${x+r} ${y}`;
  s=`<path d="M ${x-r} ${y} A ${r} ${r} 0 0 0 ${x+r} ${y}" fill="none" stroke="#b5c3b1" stroke-width="2" stroke-dasharray="6 6" opacity="${Math.max(0,1-p/2)}"/><path d="${arc} L ${x-r} ${y}" fill="${p>=1&&m.measure==='area'?C.light:'#fff'}" stroke="#a8c6ab" stroke-width="2"/>`;
  const progress=Math.max(0,Math.min(1,p-0.4));s+=`<path d="${arc}" fill="none" stroke="${C.green}" stroke-width="7" pathLength="100" stroke-dasharray="${100*progress} 100"/>`;
  s+=line(x-r,y,x+r,y,p>=2&&m.measure==='perimeter'?C.orange:'#b5c3b1',p>=2&&m.measure==='perimeter'?6:2,m.measure==='arc'?'8 5':'');
  s+=txt(710,285,'整圆平均分成 2 份，取 1 份',22)+fade(p,1,(m.given==='r'?circ(x,y,3,C.ink,C.ink,1)+line(x,y,x+r,y,C.blue,3)+txt(x+r/2,y+36,`半径 ${m.value}`,25,C.blue):line(x-r,y,x+r,y,C.blue,3)+txt(x,y+36,`直径 ${m.value}`,25,C.blue)));
  s+=fade(p,2,txt(745,100,m.measure==='arc'?'只取弯曲的弧':m.measure==='perimeter'?'弯弧 + 直径':'取半个圆的面积',25,C.green)+txt(745,150,m.measure==='arc'?'直径不计入':m.measure==='perimeter'?'直线也在边界上':'面积要除以 2',23,C.orange));
  if(m.count===2)s+=fade(p,2,txt(745,210,'题目有 2 个相同半圆',22));
  cap=m.measure==='arc'?'半圆弧恰好是整圆周长的一半，所以用 πd ÷ 2（或 πr）。不包括直径。':m.measure==='perimeter'?'绕完整个半圆边界：先走弯弧，再走直径。半圆周长 = πd ÷ 2 + d。':'半径相同的两个半圆能拼成一个整圆。一个半圆面积是 πr² ÷ 2。';
 }else if(t==='circle'){
  const x=335,y=155,r=115,isS=m.measure==='S',frac=Math.max(0,Math.min(1,p-.3));
  s=circ(x,y,r,p>=1&&isS?C.light:'#fff','#c3d6bf',2);
  if(!isS)s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${C.green}" stroke-width="6" pathLength="100" stroke-dasharray="${100*frac} 100" transform="rotate(-90 ${x} ${y})"/>`;
  s+=circ(x,y,3,C.ink,C.ink,1);
  s+=fade(p,1,m.given==='d'?line(x-r,y,x+r,y,C.blue,3)+txt(x,y-15,`d = ${m.value}`,25):m.given==='r'?line(x,y,x+r*(num(m.value)/num(m.r)),y,C.blue,3)+txt(x+65,y-15,`r = ${m.value}`,24):txt(680,75,`一圈 C = ${m.value}`,25,C.blue));
  if(num(m.add))s+=fade(p,2,txt(680,120,`半径还要增加 ${m.add}`,23,C.orange));
  s+=fade(p,2,txt(680,175,isS?'求铺满里面的面积':m.measure==='inverse'?'从周长反推半径或直径':'求围一圈的长度',24,C.green));
  if(num(m.gap))s+=fade(p,2,txt(680,225,`围栏还要扣去 ${m.gap} 米门宽`,22,C.orange));
  if(m.price)s+=fade(p,2,txt(680,265,`面积与单价、总价相对应`,22,C.orange));
  cap=isS?'先找半径，再用 π × 半径 × 半径求面积。已知周长时，要先反求半径；绕多圈时先求一圈。':m.measure==='inverse'?'周长是一整圈的长度。先注意一圈还是多圈，再从 C = πd = 2πr 反推。':'周长量的是边界一圈，使用长度单位；先把直径与半径分清。';
 }else if(t==='track'){
  const y=155,r=85,L=170*num(m.l)/num(m.w),x=(900-L)/2,top=y-r,bot=y+r,d=`M ${x} ${top} H ${x+L} A ${r} ${r} 0 0 1 ${x+L} ${bot} H ${x} A ${r} ${r} 0 0 1 ${x} ${top} Z`;
  s=`<path d="${d}" fill="${p>=1&&m.measure==='S'?C.light:'#fff'}" stroke="${p>=1?C.green:'#c2d4be'}" stroke-width="${m.measure==='C'&&p>=1?6:3}"/>`;
  s+=fade(p,1,line(x,top,x,bot,C.blue,2,'6 4')+line(x+L,top,x+L,bot,C.blue,2,'6 4')+txt(x+L/2,y+8,'长方形',26)+txt(450,35,`两端半圆直径 = 宽 ${m.w}`,24));
  s+=fade(p,2,brace(m.overall?x-r:x,m.overall?x+L+r:x+L,278,m.overall?`全长 ${m.total}，先减去两端合起来的直径`:`中间直段长 ${m.l}`,C.orange));
  cap=m.measure==='C'?'两个半圆弧合起来是一整圆；中间两条直线各算一次，内部虚线不属于外边界。':'面积分成中间长方形与两端半圆。两个半圆可以合并成一个圆，内部虚线用于分割。';
 }else if(t==='curve'){
  const x=170,y=210,R=210,r=R/2;
  s=`<path d="M ${x} ${y} A ${R} ${R} 0 0 1 ${x+2*R} ${y} A ${r} ${r} 0 0 1 ${x+R} ${y} A ${r} ${r} 0 0 0 ${x} ${y}" fill="${p>=1?C.light:'#fff'}" stroke="${C.green}" stroke-width="5"/>`+line(x,y,x+2*R,y,C.blue,2,'7 5');
  s+=fade(p,1,txt(720,85,`大半圆半径 ${m.r}`,24))+fade(p,2,txt(720,135,'两条小弧合成一个小圆',22)+txt(720,180,'小圆直径 = 大半圆半径',22));cap='沿实际边界逐段找弧。这里有一条大半圆弧、两条小半圆弧，虚线直径不计入。';
 }else if(t==='roll'){
  const progress=Math.max(0,Math.min(1,p/3)),r=62,x=160+2*Math.PI*r*progress,y=155,a=progress*2*Math.PI;
  s=line(85,y+r,810,y+r,C.ink,3)+circ(x,y,r,C.light)+line(x,y,x+r*Math.sin(a),y+r*Math.cos(a),C.orange,5)+circ(x+r*Math.sin(a),y+r*Math.cos(a),6,C.orange,C.orange);
  s+=txt(450,45,`轮子直径 ${m.d}${m.cm?'厘米':'米'}（滚动演示一圈）`,24)+fade(p,2,txt(450,275,'滚一圈前进的距离，等于轮子一圈的周长',25));cap='动画示意一圈。实际题目用：路程 = 每圈周长 × 圈数；已知路程时反求圈数。厘米与米要先统一。';
 }else if(t==='ring'){
  const x=350,y=155,R=120,r=R*num(m.r)/num(m.R),dx=m.off?(R-r)*.6:0;
  s=circ(x,y,R,p>=1?C.gold:'#fff')+circ(x+dx,y,r,'#fff',C.blue,2);
  s+=fade(p,1,line(x,y,x-R,y,C.green,3)+txt(185,y-15,`外半径 ${m.R}`,23));
  s+=fade(p,2,line(x+dx,y,x+dx+r,y,C.blue,3)+txt(690,120,`内半径 ${m.r}`,24,C.blue)+txt(690,170,m.width?'先求外半径，再作差':'大圆面积 − 小圆面积',24,C.orange));
  cap=m.off?'内圆即使不在中心，只要完整位于大圆内，剩余面积仍是大圆面积减去小圆面积。':m.width?'路宽是半径增加的量，先用内半径加路宽求外半径，再作面积差。':'圆环面积看两个半径的平方差。不能把半径差直接当成一个小圆的半径来算。';
 }else if(t==='compare'){
  if(m.mode==='circles'){
   const R=100,rr=R*num(m.small)/num(m.big);s=circ(240,150,R,p>=1?C.light:'#fff')+txt(240,285,`一个大圆，直径 ${m.big}`,23);
   for(let i=0;i<m.n;i++){const xx=590+(i%2)*150,yy=m.n>2?80+Math.floor(i/2)*135:150;s+=circ(xx,yy,Math.min(rr,60),p>=1?C.gold:'#fff')}
   s+=txt(660,285,`${m.n} 个小圆，直径各 ${m.small}`,23);cap='先分别求大圆面积与所有小圆的总面积，再比较。直径相加一样，不代表面积一样。';
  }else if(m.mode==='wire'){
   const side=105*num(m.side)/num(m.r);s=circ(230,145,105,p>=1?C.light:'#fff')+rect(650-side/2,145-side/2,side,side,p>=1?C.gold:'#fff')+txt(450,285,`两根绳一样长：周长都为 ${m.C}`,24);cap='周长相等时，先分别求半径和边长，再比较面积，不能把周长相等理解成面积相等。';
  }else{
   const r=35;s=circ(180,160,r,p>=1?C.light:'#fff')+circ(610,160,r*m.k,p>=1?C.gold:'#fff')+fade(p,1,txt(450,30,`半径扩大到 ${m.k} 倍`,25))+fade(p,2,txt(450,300,`面积中半径乘了两次：${m.k} × ${m.k}`,24,C.orange));cap='半径扩大 k 倍，面积扩大 k² 倍，因为面积公式里有两个半径相乘。';
  }
 }else{cap='先找已知量与未知量，再列出数量关系。';s=txt(450,150,'用图帮助理解数量关系',30)}
 const svg=`<svg viewBox="0 0 900 330" role="img" aria-label="${E(cap)}" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">${s}</svg>`;
 return {svg,caption:cap};
}
window.drawProblem=draw;
})();
