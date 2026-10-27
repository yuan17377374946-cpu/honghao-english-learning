'use strict';
const motionState={angle:-70,fold:100,e:2,align:100,side:0};
const motionActive=()=>mode==='practice'&&[2,4,6].includes(index);
function motionGeometry(q){
 const diagramStage=diagramStep();
 if(!motionActive())return q;
 q={...q,p:{...q.p},labels:[...q.labels],angles:[]};
 if(index===2){const a=motionState.angle*Math.PI/180;q.p.E=rot([.7,0],a);q.p.F=rot([-.7,0],a);q.p.D=rot([0,-s3*.7],a);q.frame=[[-1.5,-1.9],[1.5,1.5]];if(diagramStage>=3)q.angles=[['A','O','D',0,'α'],['B','O','E',1,'α',35]];}
 if(index===4){const t=motionState.fold/100,A=q.p.A,B=q.p.B,N=q.p.N,dx=N[0]-B[0],dy=N[1]-B[1],u=((A[0]-B[0])*dx+(A[1]-B[1])*dy)/(dx*dx+dy*dy),H=[B[0]+u*dx,B[1]+u*dy];q.p.T=[H[0]+(A[0]-H[0])*Math.cos(Math.PI*t),H[1]+(A[1]-H[1])*Math.cos(Math.PI*t)];q.pointNames={T:t===1?'M':'A′'};q.edges=['AB','BC','CD','DA','BN','BT','NT'];q.frame=[[-.5,-.5],[4.6,5.5]];if(t<1){q.pairAt=99;q.right=[];}else{delete q.p.T;q.edges=['AB','BC','CD','DA','BN','BM','MN'];}if(diagramStage>=3&&t===1)q.angles=[['D','N','M',0,'α'],['B','M','C',1,'α']];}
 if(index===6){q.p.E=[0,motionState.e];q.p.F=[6-motionState.e,0];q.frame=[[-.6,-.5],[6.6,6.6]];if(diagramStage>=2)q.angles=[['A','D','E',0,'α'],['C','D','F',1,'α']];q.labels.push(L('CF','CF=AE',4,0,26));}
 return q;
}
function setupMotion(){
 const box=$('modelControls');box.classList.toggle('motionControls',motionActive());if(!motionActive())return;
 const cfg={2:['第二个等边三角形绕O转动','angle',-110,-20,1,'°','保持两个等边三角形和共同中点O不变；转动后，看看AD与BE的比是否变化。'],4:['沿BN折叠','fold',0,100,1,'%','拖动查看翻折。中间画面是折叠的平面投影；相似证明只看完全折好后的图。'],6:['移动E（从C向A）','e',.5,5.5,.1,'','拖动E，F随之移动，始终保持DE⊥DF。观察AE变长时，BF怎样变化。图中长度只用于演示。']}[index];
 box.innerHTML='<label for="motionSlider">'+cfg[0]+'</label><input id="motionSlider" type="range" min="'+cfg[2]+'" max="'+cfg[3]+'" step="'+cfg[4]+'" value="'+motionState[cfg[1]]+'" data-key="'+cfg[1]+'"><output id="motionValue">'+motionState[cfg[1]]+cfg[5]+'</output><small class="turnNote">'+cfg[6]+'</small><div class="turnButtons"><button data-motion="reset">回到题设位置</button>'+(index===4?'<button data-motion="unfold">看折叠前</button><button data-motion="fold">完全折好</button>':'')+'</div>';
}
function renderMotion(q){
 const box=$('motionCompare');$('all').disabled=false;box.hidden=!motionActive();if(!motionActive())return;
 const folding=index===4&&motionState.fold!==100;
 if(folding){$('caption').textContent='沿BN翻折的平面投影；完全折好后A与M重合。';$('proof').innerHTML='<div class="motionHint">先看A怎样绕折痕BN翻到M。B、N在折痕上保持不动，BA对应BM，NA对应NM。点击“完全折好”后继续证明。</div>';$('next').disabled=true;$('prev').disabled=true;$('all').disabled=true;$('tip').hidden=true;}
 const s=diagramStep(),ps=pair(q,s),ready=s>=q.pairAt&&!folding;
 if(!ready){box.innerHTML='<p class="motionHint">'+(index===4?'折痕BN固定，A与M是对应点；折叠保持长度与角度。':index===6?'先连CD，再观察两对垂直线。讲到第3步时，可把两个三角形取出对照。':'先连接AO、DO，再找两组边的倍率与夹角。讲到第4步时，可把两个三角形取出对照。')+'</p>';return;}
 const edgeNames=[...ps[0]].map((k,i)=>k+ps[0][(i+1)%3]+' ↔ '+ps[1][i]+ps[1][(i+1)%3]);
 box.innerHTML='<h4>把两个三角形单独拿出来看</h4><p>同一颜色的顶点互相对应。拖动滑块，把右图转到相同方向；两图各自缩放，仅用于看对应关系。</p><svg id="compareSvg" viewBox="0 0 560 240" role="img" aria-label="对应三角形单独对照"></svg><label for="alignSlider">转到相同方向</label><input id="alignSlider" type="range" min="0" max="100" step="1" value="'+motionState.align+'"><div class="motionPairs">'+edgeNames.map((t,i)=>'<button data-side="'+i+'" class="'+(motionState.side===i?'selected':'')+'">'+t+'</button>').join('')+'</div><p>'+(q.pairSymbol==='≌'?'全等：对应边相等。':'相似：按同一顺序列对应边的比。')+' '+[...ps[0]].map((k,i)=>k+'↔'+ps[1][i]).join('，')+'</p>';
 drawComparison(q,ps);
 if(index===6&&s>=4){const e=motionState.e;box.innerHTML+='<p class="motionHint">演示长度：AE=CF='+(6-e).toFixed(1)+'，BF='+e.toFixed(1)+'。<br>AE+BF='+ (6-e).toFixed(1)+'+'+e.toFixed(1)+'=6=BC（数值用于观察，正式证明见右侧）。</p>';}
}
function drawComparison(q,ps){
 const svg=$('compareSvg');if(!svg)return;const colors=['#c0435c','#258462','#8752c7'],length=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
 function shape(t){const v=[...t].map(k=>q.p[k]),d=length(v[0],v[1]),u=[(v[1][0]-v[0][0])/d,(v[1][1]-v[0][1])/d],w=v.map(p=>[(p[0]-v[0][0])*u[0]+(p[1]-v[0][1])*u[1],-(p[0]-v[0][0])*u[1]+(p[1]-v[0][1])*u[0]]);return {w,raw:v.map(p=>[p[0]-v[0][0],p[1]-v[0][1]]),d};}
 let out='';ps.forEach((t,j)=>{const sh=shape(t),fraction=j?motionState.align/100:1;let w;if(j){let theta=Math.atan2(sh.raw[1][1],sh.raw[1][0]);w=sh.raw.map(p=>rot(p,-theta*fraction));}else w=sh.w;const minX=Math.min(...w.map(p=>p[0])),maxX=Math.max(...w.map(p=>p[0])),minY=Math.min(...w.map(p=>p[1])),maxY=Math.max(...w.map(p=>p[1])),sc=Math.min(170/Math.max(.01,maxX-minX),135/Math.max(.01,maxY-minY)),pts=w.map(p=>[j*280+140+(p[0]-(minX+maxX)/2)*sc,123-(p[1]-(minY+maxY)/2)*sc]);out+='<text x="'+(j*280+140)+'" y="23" text-anchor="middle" style="font-size:19px;fill:'+(j?'#b65d14':'#2465d6')+'">△'+t+'</text><polygon points="'+pts.map(p=>p.join(',')).join(' ')+'" fill="'+(j?'#fff2e3':'#eaf2ff')+'" stroke="'+(j?'#b65d14':'#2465d6')+'" stroke-width="2"/>';const k=motionState.side,a=pts[k],b=pts[(k+1)%3];out+='<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="#df3b55" stroke-width="6"/>';pts.forEach((p,i)=>{const cx=pts.reduce((v,p)=>v+p[0],0)/3,cy=pts.reduce((v,p)=>v+p[1],0)/3,dx=p[0]-cx,dy=p[1]-cy,l=Math.hypot(dx,dy)||1;out+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="5" fill="'+colors[i]+'"/><text x="'+(p[0]+17*dx/l)+'" y="'+(p[1]+17*dy/l+5)+'" text-anchor="middle" style="font-size:19px;fill:'+colors[i]+'">'+t[i]+'</text>';});});svg.innerHTML=out;
}
function motionOverlay(q,xy,s){if(!motionActive())return '';let out='';const line=(a,b,color,dash='')=>{a=xy(a);b=xy(b);return '<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="'+color+'" stroke-width="3" stroke-dasharray="'+dash+'"/>';};
 if(index===4){out+=line(q.p.B,q.p.N,'#d58b14','7 5');const t=q.p.T||q.p.M;out+='<polygon points="'+[q.p.B,q.p.N,t].map(p=>xy(p).join(',')).join(' ')+'" fill="#2ca57a" fill-opacity=".12" stroke="#258462" stroke-width="2"/>';out+=line(q.p.B,q.p.A,'#9bacbe','5 5')+line(q.p.N,q.p.A,'#9bacbe','5 5');}
 if(index===6&&s>=4){out+=line(q.p.A,q.p.E,'#df3b55')+line(q.p.C,q.p.F,'#df3b55')+line(q.p.B,q.p.F,'#258462');}
 if(s>=q.pairAt&&!(index===4&&motionState.fold<100)){const ps=pair(q,s),k=motionState.side;ps.forEach(t=>{out+=line(q.p[t[k]],q.p[t[(k+1)%3]],'#df3b55');});}
 return out;
}
function installMotionEvents(){
 $('modelControls').addEventListener('input',e=>{if(e.target.id!=='motionSlider')return;const k=e.target.dataset.key;motionState[k]=+e.target.value;$('motionValue').textContent=e.target.value+({angle:'°',fold:'%',e:''}[k]);onlyOriginal=false;renderStep();});
 $('modelControls').addEventListener('click',e=>{const b=e.target.closest('[data-motion]');if(!b)return;const a=b.dataset.motion;if(a==='reset'){if(index===2)motionState.angle=-70;if(index===4)motionState.fold=100;if(index===6)motionState.e=2;}if(a==='unfold')motionState.fold=0;if(a==='fold')motionState.fold=100;setupMotion();renderStep();});
 $('motionCompare').addEventListener('input',e=>{if(e.target.id==='alignSlider'){motionState.align=+e.target.value;drawComparison(current(),pair(current(),diagramStep()));}});
 $('motionCompare').addEventListener('click',e=>{const b=e.target.closest('[data-side]');if(!b)return;motionState.side=+b.dataset.side;renderStep();});
}
