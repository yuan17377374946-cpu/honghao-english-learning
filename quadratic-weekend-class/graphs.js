'use strict';

const boardGraphs = {
  5: {
    label:'第 5 题交点图 · 拖动水平线',
    range:[-4.4, 2.35, -3, 6],
    curves:[
      {from:-4.4,to:2,f:x=>.5*(x+2)**2-2,color:'#9eb9bd',dashed:true},
      {from:-3,to:1,f:x=>.5*(x+2)**2-2,color:'#116b62'}
    ],
    dots:[[-3,-1.5,'左端'],[-2,-2,'顶点'],[1,2.5,'右端']],
    interactive:true
  },
  6: {
    label:'第 6 题板书图 · m = 60 时的净收益',
    range:[-4,164,-600,1250],
    curves:[{from:0,to:160,f:x=>-.25*(x-80)**2+1100,color:'#116b62'}],
    dots:[[80,1100,'(80, 1100)']]
  },
  7: {
    label:'第 7 题板书图 · 拱顶和排气装置',
    range:[-2.7,2.7,-.4,4.7],
    curves:[{from:-2,to:2,f:x=>4-.25*x*x,color:'#116b62'}],
    segments:[
      [[-2,0],[-2,3],[2,3],[2,0]],
      [[-1,3],[-1,3.75],[-.25,3.75],[-.25,3]],
      [[.25,3],[.25,3.75],[1,3.75],[1,3]]
    ],
    dots:[[-1,3.75,'L'],[1,3.75,'R'],[-.25,3,'G'],[.25,3,'M'],[0,4,'E']]
  },
  8: {
    label:'第 8 题板书图 · 描点后连线',
    range:[-.7,7.5,-1,11.2],
    curves:[{from:0,to:6,f:x=>.25*x*x,color:'#116b62'}],
    dots:[0,2,3,4,5,6].map(x=>[x,.25*x*x,`(${x}, ${.25*x*x})`])
  },
  12: {
    label:'第 12 题板书图 · 两条极端水柱与安全通道',
    range:[-.4,4.65,-.3,3.65],
    curves:[
      {from:0,to:4,f:x=>3-.75*(x-2)**2,color:'#116b62'},
      {from:0,to:3,f:x=>3-.75*(x-1)**2,color:'#a55320'}
    ],
    segments:[[[.5,0],[.5,21/16],[2.5,21/16],[2.5,0]]],
    dots:[[.5,0,'C'],[2.5,0,'D']]
  }
};

function graphMarkup(config, level = -1.5) {
  const [left,right,bottom,top] = config.range;
  const X=x=>42+516*(x-left)/(right-left);
  const Y=y=>252-224*(y-bottom)/(top-bottom);
  const poly=(coords)=>coords.map(([x,y])=>`${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ');
  const x0=X(0), y0=Y(0);
  const curves=config.curves.map(({from,to,f,color,dashed})=>{
    const samples=Array.from({length:65},(_,i)=>{const x=from+(to-from)*i/64;return [x,f(x)];});
    return `<polyline points="${poly(samples)}" fill="none" stroke="${color}" stroke-width="3.5" ${dashed?'stroke-dasharray="5 5"':''}/>`;
  }).join('');
  const segments=(config.segments??[]).map(points=>`<polyline points="${poly(points)}" stroke="#456974" stroke-width="2" fill="none"/>`).join('');
  const levelLine=config.interactive?`<path d="M42 ${Y(level)}H558" stroke="#a55320" stroke-width="2.5" stroke-dasharray="6 4"/>`:'';
  const intersections=config.interactive&&level>=-2?[...new Set([-2-Math.sqrt(2*(level+2)),-2+Math.sqrt(2*(level+2))])].filter(x=>x>=-3-1e-8&&x<=1+1e-8):[];
  return `<svg viewBox="0 0 610 278" role="img" aria-label="${config.label}">
    <path d="M42 ${y0}H566 M${x0} 254V17" stroke="#779295" stroke-width="1.4"/>
    <text x="575" y="${y0+4}" fill="#345058">x</text><text x="${x0+7}" y="21" fill="#345058">y</text>
    ${segments}${curves}${levelLine}
    ${config.dots.map(([x,y,label],i)=>`<circle cx="${X(x)}" cy="${Y(y)}" r="4.2" fill="#116b62"/><text x="${X(x)+(config===boardGraphs[7]&&i===2?-17:7)}" y="${Y(y)-7}" fill="#163b46" font-size="15">${label}</text>`).join('')}
    ${intersections.map(x=>`<circle cx="${X(x)}" cy="${Y(level)}" r="6.5" fill="#a55320" stroke="#fff" stroke-width="1.5"/>`).join('')}
  </svg>`;
}

function boardGraph(question) {
  const config=boardGraphs[question];
  if(!config) return '';
  return `<details class="graph"><summary>${config.label}</summary><div class="graph-view">${graphMarkup(config)}</div>
    ${config.interactive?`<label>水平线高度 t <input id="horizontal-level" type="range" min="-2.5" max="3" step=".25" value="-1.5"><output id="intersection-label" for="horizontal-level">t = −1.5，2 个交点</output></label><p class="tiny">实线为 −3 ≤ x ≤ 1 内的图象，只统计实线上的交点。</p>`:''}
  </details>`;
}
