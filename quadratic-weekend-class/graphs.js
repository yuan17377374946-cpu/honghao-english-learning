'use strict';

const green = '#116b62';
const blue = '#285f9b';
const amber = '#a55320';

const boardGraphs = {
  1: {
    label:'抛物线的顶点、对称轴与交点',
    range:[-3.2,5.2,-8,8.4],
    xTicks:[-2,2,4], yTicks:[-4,2,4,8],
    curves:[{from:-1.8,to:3.8,f:x=>-2*(x-1)**2+6,color:green}],
    guides:[[[1,-8],[1,8.4]]],
    dots:[[1,6,'顶点 (1, 6)',9,-10],[1-Math.sqrt(3),0,'1 − √3',-63,-11],[1+Math.sqrt(3),0,'1 + √3',10,-11]],
    caption:'虚线是对称轴 x = 1。比较对称轴右边的点，可以看出 y 随 x 增大而减小。'
  },
  2: {
    label:'平移前后两条抛物线',
    range:[-4.6,5.6,-5.8,7],
    xTicks:[-4,-2,2,4], yTicks:[-2,2,4,6],
    curves:[
      {from:-4.3,to:2.3,f:x=>(x+1)**2-4,color:blue,dashed:true},
      {from:-1.3,to:5.3,f:x=>(x-2)**2-4,color:green}
    ],
    guides:[[[-1,-4],[2,-4]]],
    dots:[[-1,-4,'(−1, −4)',-66,19],[2,-4,'(2, −4)',9,19],[0,0,'O',9,-9]],
    caption:'蓝色虚线是原抛物线，绿色实线是右移 3 个单位后的抛物线。顶点高度不变，新图象经过原点。'
  },
  3: {
    label:'代入参数后看对称轴和最小值',
    range:[-2.5,5,-1,22],
    xTicks:[-2,-1,1,2,3,4], yTicks:[4,8,16,20],
    curves:[{from:-2,to:5,f:x=>(x-1.5)**2+39/4,color:green}],
    guides:[[[1.5,0],[1.5,22]],[[0,39/4],[1.5,39/4]]],
    dots:[[0,12,'(0, 12)',-52,-10],[1.5,39/4,'最小值 39/4',10,22]],
    caption:'取 m = −3 后得到这条抛物线。对称轴 x = 3/2 位于 y 轴右侧。'
  },
  4: {
    label:'按原题条件重画系数判断图',
    range:[-3.2,2.5,-2.2,4.5],
    xTicks:[-2,-1,1,2], yTicks:[-1,1,2,3,4],
    curves:[{from:-3,to:2.1,f:x=>x*x+1.5*x-.5,color:green}],
    guides:[[[-.75,-2.2],[-.75,4.5]],[[1,0],[1,2],[0,2]]],
    dots:[[1,2,'(1, 2)',10,-9],[0,-.5,'c < 0',10,21],[-1,-1,'f(−1) < 0',-82,19]],
    caption:'这是按原图条件重画的示意图。观察开口方向、对称轴在 −1 与 0 之间，以及 x = ±1 时的函数值。'
  },
  5: {
    label:'第（3）问 · 拖动水平线看交点个数',
    range:[-4.4,2.35,-3,6],
    xTicks:[-4,-3,-2,-1,1,2], yTicks:[-2,2,4],
    curves:[
      {from:-4.4,to:2,f:x=>.5*(x+2)**2-2,color:'#9eb9bd',dashed:true},
      {from:-3,to:1,f:x=>.5*(x+2)**2-2,color:green}
    ],
    dots:[[-3,-1.5,'左端',-35,-12],[-2,-2,'顶点',9,20],[1,2.5,'右端',9,-9]],
    interactive:true
  },
  6: {
    label:'第（3）问 · m = 60 时的净收益',
    range:[-4,164,-600,1400],
    xTicks:[20,40,60,80,100,120,140,160], yTicks:[-400,400,800,1200],
    curves:[{from:0,to:160,f:x=>-.25*(x-80)**2+1100,color:green}],
    guides:[[[80,0],[80,1100]]],
    dots:[[80,1100,'最大净收益点 (80, 1100)',10,-10]],
    caption:'净收益曲线开口向下。虚线标出 x = 80，顶点高度为 1100 元。'
  },
  7: {
    label:'大棚拱顶和两个排气装置',
    range:[-2.7,2.7,-.4,5],
    xTicks:[-2,-1,1,2], yTicks:[1,2,3,4],
    curves:[{from:-2,to:2,f:x=>4-.25*x*x,color:green}],
    segments:[
      [[-2,0],[-2,3],[2,3],[2,0]],
      [[-1,3],[-1,3.75],[-.25,3.75],[-.25,3],[-1,3]],
      [[.25,3],[.25,3.75],[1,3.75],[1,3],[.25,3]]
    ],
    dots:[[-1,3.75,'L',-17,-8],[1,3.75,'R'],[-.25,3,'G',-13,20],[.25,3,'M',7,20],[0,4,'E(0, 4)',10,-10],[-2,3,'A',-17,-8],[2,3,'D']],
    caption:'两装置的外侧上角 L、R 都在 y = 3.75 上。先算 L 到 R 的水平距离，再减掉两个正方形的边长。'
  },
  8: {
    label:'描出六个测量点并连成抛物线',
    range:[-.7,7.5,-1,11.2],
    xTicks:[1,2,3,4,5,6,7], yTicks:[2,4,6,8,10],
    curves:[{from:0,to:6,f:x=>.25*x*x,color:green}],
    dots:[0,2,3,4,5,6].map(x=>[x,.25*x*x,`(${x}, ${.25*x*x})`]),
    caption:'横轴是测得的水平距离，纵轴是竖直距离。六个点都满足 y = x²/4。'
  },
  9: {
    label:'水流上、下边缘与绿化带',
    range:[-.65,6.8,-.25,2.06],
    xTicks:[1,2,3,4,5,6], yTicks:[.5,1,1.5,2],
    curves:[
      {from:0,to:6,f:x=>1.6-.1*(x-2)**2,color:green},
      {from:0,to:2,f:x=>1.6-.1*(x+2)**2,color:blue}
    ],
    regions:[[[3.2,0],[5.2,0],[5.2,.7],[3.2,.7]]],
    guides:[[[5.2,0],[5.2,.7]]],
    dots:[[0,1.2,'H',-18,-10],[2,1.6,'A(2, 1.6)'],[2,0,'B',-15,-10],[6,0,'C',10,-10],[5.2,.7,'F',10,-12],[5.2,.576,'0.576',10,17]],
    caption:'绿色是水流上边缘，蓝色是下边缘。绿化带右上角 F 高 0.7 m，同处水流最高仅 0.576 m。'
  },
  10: {
    label:'抛物线动点与三角形面积',
    range:[-1.85,4.1,-1.45,4.9],
    xTicks:[-1,1,2,3,4], yTicks:[1,2,3,4],
    curves:[{from:-1.35,to:3.35,f:x=>-x*x+2*x+3,color:green}],
    regions:[[[0,3],[1.5,3.75],[3,0]]],
    segments:[[[1.5,3.75],[1.5,1.5]]],
    dots:[[-1,0,'A',-17,-9],[3,0,'B(3, 0)',8,-10],[0,3,'C(0, 3)',-56,-10],[1.5,3.75,'P',10,-9],[1.5,1.5,'Q',10,14]],
    caption:'阴影是面积最大时的三角形。过 P 作竖线交 BC 于 Q，用 PQ 作公共底，把面积拆成左右两块。'
  },
  11: {
    label:'桥拱、最高水位与灯笼悬挂区间',
    range:[-11.5,11.5,-.55,6],
    xTicks:[-10,-8,-6,-4,-2,2,4,6,8,10], yTicks:[1.8,3.2,5],
    curves:[{from:-10,to:10,f:x=>5-x*x/20,color:blue},{from:-6,to:6,f:x=>5-x*x/20,color:green}],
    guides:[[[-10,1.8],[10,1.8]],[[-10,3.2],[10,3.2]],[[-6,0],[-6,3.2]],[[6,0],[6,3.2]]],
    dots:[[-6,3.2,'(−6, 3.2)',-73,-10],[6,3.2,'(6, 3.2)',10,-10],...[-5.6,-4,-2.4,-.8,.8,2.4,4,5.6].map(x=>[x,5-x*x/20,''])],
    caption:'最高水位是 1.8 m，悬挂点至少要在 3.2 m 高处。绿色弧线是可挂范围，弧上 8 个小点是一种等距对称排法。'
  },
  12: {
    label:'两条极端水柱与安全通道',
    range:[-.4,4.65,-.3,3.65],
    xTicks:[1,2,3,4], yTicks:[1,2,3],
    curves:[
      {from:0,to:4,f:x=>3-.75*(x-2)**2,color:green},
      {from:0,to:3,f:x=>3-.75*(x-1)**2,color:amber}
    ],
    regions:[[[.5,0],[.5,21/16],[2.5,21/16],[2.5,0]]],
    dots:[[.5,0,'C(0.5, 0)',9,19],[2.5,0,'D(2.5, 0)',9,19]],
    caption:'绿色与橙色分别表示喷头最低和最高时的水柱。阴影框宽 2 m，上沿约 1.3 m，左右端各受一条极端水柱限制。'
  }
};

const supportingGraphs = {
  5: {
    label:'第（1）（2）问 · 直线与抛物线的交点',
    range:[-4.2,2.4,-4,6],
    xTicks:[-4,-3,-2,-1,1,2], yTicks:[-3,2,4,6],
    curves:[
      {from:-4.2,to:2.2,f:x=>.5*(x+2)**2-2,color:green},
      {from:-4.2,to:2.4,f:x=>1.5*x+1,color:blue}
    ],
    dots:[[-2,-2,'B(−2, −2)',-73,21],[1,2.5,'A(1, 5/2)',9,-9]],
    caption:'绿色是抛物线，蓝色是直线。两交点之间抛物线较低，两交点外侧抛物线较高。'
  },
  6: {
    label:'第（1）（2）问 · 收入、成本与收支平衡',
    range:[-6,126,-500,7200],
    xTicks:[20,40,60,80,100,120], yTicks:[2000,4000,6000],
    curves:[
      {from:0,to:125,f:x=>50*x,color:blue},
      {from:0,to:125,f:x=>.25*x*x+20*x+500,color:green}
    ],
    guides:[[[20,0],[20,1000]],[[100,0],[100,5000]]],
    dots:[[20,1000,'(20, 1000)',9,20],[100,5000,'(100, 5000)',-98,-11]],
    caption:'蓝色直线是收入，绿色曲线是成本。两图象的交点都表示收入等于成本。'
  }
};

function graphMarkup(config, level = -1.5) {
  const [left,right,bottom,top] = config.range;
  const X=x=>52+504*(x-left)/(right-left);
  const Y=y=>252-224*(y-bottom)/(top-bottom);
  const poly=points=>points.map(([x,y])=>`${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ');
  const x0=X(0), y0=Y(0);
  const xGrid=config.xTicks.map(x=>`M${X(x)} 28V252`).join(' ');
  const yGrid=config.yTicks.map(y=>`M52 ${Y(y)}H556`).join(' ');
  const xLabels=config.xTicks.map(x=>`<text x="${X(x)}" y="${Math.min(y0+19,273)}" text-anchor="middle">${x}</text>`).join('');
  const yLabels=config.yTicks.map(y=>`<text x="${Math.max(x0-7,46)}" y="${Y(y)+4}" text-anchor="end">${y}</text>`).join('');
  const curves=config.curves.map(({from,to,f,color,dashed})=>{
    const samples=Array.from({length:97},(_,i)=>{const x=from+(to-from)*i/96;return [x,f(x)];});
    return `<polyline points="${poly(samples)}" fill="none" stroke="${color}" stroke-width="3.3" ${dashed?'stroke-dasharray="6 5"':''}/>`;
  }).join('');
  const regions=(config.regions??[]).map(points=>`<polygon points="${poly(points)}" fill="#cfe8dd" fill-opacity=".72" stroke="#558978" stroke-width="1.6"/>`).join('');
  const segments=(config.segments??[]).map(points=>`<polyline points="${poly(points)}" stroke="#456974" stroke-width="2" fill="none"/>`).join('');
  const guides=(config.guides??[]).map(points=>`<polyline points="${poly(points)}" stroke="#73928e" stroke-width="1.5" fill="none" stroke-dasharray="5 5"/>`).join('');
  const levelLine=config.interactive?`<path d="M52 ${Y(level)}H556" stroke="${amber}" stroke-width="2.5" stroke-dasharray="6 4"/>`:'';
  const intersections=config.interactive&&level>=-2?[...new Set([-2-Math.sqrt(2*(level+2)),-2+Math.sqrt(2*(level+2))])].filter(x=>x>=-3-1e-8&&x<=1+1e-8):[];
  return `<svg viewBox="0 0 610 284" role="img" aria-label="${config.label}">
    <path d="${xGrid} ${yGrid}" stroke="#e3edeb" stroke-width="1" fill="none"/>
    <path d="M52 ${y0}H566m-7-4 7 4-7 4M${x0} 253V18m-4 7 4-7 4 7" stroke="#779295" stroke-width="1.4" fill="none"/>
    <g fill="#597277" font-size="12">${xLabels}${yLabels}</g>
    <text x="575" y="${y0+4}" fill="#345058">x</text><text x="${x0+8}" y="21" fill="#345058">y</text>
    <svg x="52" y="28" width="504" height="224" viewBox="52 28 504 224" overflow="hidden">
      ${regions}${guides}${segments}${curves}${levelLine}
    </svg>
    ${config.dots.map(([x,y,label,dx=7,dy=-7])=>`<circle cx="${X(x)}" cy="${Y(y)}" r="4.2" fill="${green}"/>${label?`<text x="${X(x)+dx}" y="${Y(y)+dy}" fill="#163b46" font-size="15">${label.replaceAll('<','&lt;')}</text>`:''}`).join('')}
    ${(config.markers??intersections.map(x=>[x,level])).map(([x,y])=>`<circle cx="${X(x)}" cy="${Y(y)}" r="6.5" fill="${amber}" stroke="#fff" stroke-width="1.5"/>`).join('')}
  </svg>`;
}

function diagramDetails(config, controls = '') {
  return `<details class="graph"><summary>展开板书图 · ${config.label}</summary><div class="graph-view">${graphMarkup(config)}</div>
    ${controls}
    ${config.caption?`<p class="tiny">${config.caption}</p>`:''}
    ${config.interactive?`<label>水平线高度 t <input id="horizontal-level" type="range" min="-2.5" max="3" step=".25" value="-1.5"><output id="intersection-label" for="horizontal-level">t = −1.5，2 个交点</output></label><p class="tiny">实线为 −3 ≤ x ≤ 1 内的图象，只统计实线上的交点。</p>`:''}
  </details>`;
}

function boardGraph(question) {
  const graphs = [supportingGraphs[question],boardGraphs[question]].filter(Boolean);
  return graphs.map(diagramDetails).join('');
}

const tangentShift = -11/4;
const segmentY = x=>1.5*x+1;

function shiftedIntersections(m) {
  const discriminant = 12*m+33;
  if (discriminant<0) return [];
  const offset = Math.sqrt(discriminant)/2;
  return [...new Set([m+1.5-offset,m+1.5+offset])].filter(x=>x>=-2 && x<=1);
}

function shiftedGraph(m, intersections) {
  return {
    label:'第（4）问 · 平移抛物线与线段 AB',
    range:[-5.35,6.35,-3,7],
    xTicks:[-5,-4,-3,-2,-1,1,2,3,4,5,6], yTicks:[-2,2,4,6],
    curves:[
      {from:-5.35,to:6.35,f:x=>.5*(x-m)**2-2,color:green},
      {from:-2,to:1,f:segmentY,color:blue}
    ],
    guides:[[[m,-3],[m,7]]],
    dots:[[-2,-2,'B(−2, −2)',-82,20],[1,2.5,'A(1, 5/2)',10,-10]],
    markers:intersections.map(x=>[x,segmentY(x)]),
    caption:'蓝色是线段 AB，绿色是平移后的抛物线，橙色点是计入的交点。只数 −2 ≤ x ≤ 1 内的交点，A、B 两个端点也计入。'
  };
}

function shiftedGraphDetails() {
  return diagramDetails(shiftedGraph(tangentShift,shiftedIntersections(tangentShift)),`
    <label for="shift-m">拖动滑杆改变顶点横坐标 m</label>
    <div class="stage-actions">
      <input id="shift-m" type="range" min="-4" max="5" step="0.01" value="${tangentShift}">
      <output id="shift-value" for="shift-m">m = −2.75</output>
    </div>
    <div class="stage-actions" role="group" aria-label="跳到关键位置">
      <button type="button" data-shift-m="${tangentShift}">−11/4（相切）</button>
      <button type="button" data-shift-m="-2">−2（原位置）</button>
      <button type="button" data-shift-m="4">4（交于 A）</button>
    </div>
    <p><output id="shift-count" for="shift-m">与线段 AB 有 1 个交点（相切）</output></p>`);
}
