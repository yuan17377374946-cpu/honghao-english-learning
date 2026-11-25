'use strict';
window.CircleFigures=(()=>{
 const blue='#176fc2',orange='#b8671b',green='#398c24',gray='#a7b8c4';
 const polar=(r,a,c=[0,0])=>[c[0]+r*Math.cos(a*Math.PI/180),c[1]+r*Math.sin(a*Math.PI/180)];
 const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
 const intersect=(a,b,c,d)=>{const x=b[0]-a[0],y=b[1]-a[1],u=d[0]-c[0],v=d[1]-c[1],s=((c[0]-a[0])*v-(c[1]-a[1])*u)/(x*v-y*u);return[a[0]+s*x,a[1]+s*y]};
 function scene(title,points,opts={}){
  const all=[...Object.values(points),...(opts.bounds||[])],xs=all.map(p=>p[0]),ys=all.map(p=>p[1]);
  const loX=Math.min(...xs)-.65,hiX=Math.max(...xs)+.65,loY=Math.min(...ys)-.6,hiY=Math.max(...ys)+.6;
  const scale=Math.min(460/(hiX-loX),290/(hiY-loY)),cx=(loX+hiX)/2,cy=(loY+hiY)/2;
  const xy=p=>[270+(p[0]-cx)*scale,185-(p[1]-cy)*scale];let content='';
  const P=x=>typeof x==='string'?points[x]:x;
  const line=(a,b,color=blue,dash=false,width=2.8)=>{const x=xy(P(a)),y=xy(P(b));content+=`<line x1="${x[0]}" y1="${x[1]}" x2="${y[0]}" y2="${y[1]}" stroke="${color}" stroke-width="${width}" ${dash?'stroke-dasharray="7 6"':''}/>`};
  const circle=(o,r,color=blue,dash=false)=>{const q=xy(P(o));content+=`<circle cx="${q[0]}" cy="${q[1]}" r="${r*scale}" fill="none" stroke="${color}" stroke-width="2.4" ${dash?'stroke-dasharray="7 6"':''}/>`};
  const label=(p,text,dx=10,dy=-9,color)=>{const q=xy(P(p));content+=`<text class="label" x="${q[0]+dx}" y="${q[1]+dy}" ${color?`style="fill:${color}"`:''}>${text}</text>`};
  const point=(name,dx=9,dy=-9)=>{const q=xy(points[name]);content+=`<circle cx="${q[0]}" cy="${q[1]}" r="3.4" fill="${blue}"/>`;label(name,name,dx,dy)};
  const polygon=(ps,color='#e8f2ff')=>{content+=`<polygon points="${ps.map(p=>xy(P(p)).join(',')).join(' ')}" fill="${color}" stroke="none"/>`};
  const arc=(o,r,start,end,color=green,width=4.5)=>{const a=xy(polar(r,start,P(o))),b=xy(polar(r,end,P(o))),span=((end-start)%360+360)%360;content+=`<path d="M${a.join(' ')} A${r*scale} ${r*scale} 0 ${span>180?1:0} 0 ${b.join(' ')}" fill="none" stroke="${color}" stroke-width="${width}"/>`};
  const right=(a,o,b)=>{a=P(a);o=P(o);b=P(b);const da=distance(a,o),db=distance(b,o);if(!da||!db)return;const s=12/scale,u=[(a[0]-o[0])*s/da,(a[1]-o[1])*s/da],v=[(b[0]-o[0])*s/db,(b[1]-o[1])*s/db];const pts=[[o[0]+u[0],o[1]+u[1]],[o[0]+u[0]+v[0],o[1]+u[1]+v[1]],[o[0]+v[0],o[1]+v[1]]].map(x=>xy(x).join(',')).join(' ');content+=`<polyline points="${pts}" fill="none" stroke="${orange}" stroke-width="2"/>`};
  const raw=x=>{content+=x};
  return{points,line,circle,label,point,polygon,arc,right,raw,xy,scale,svg:()=>`<svg class="fig" xmlns="http://www.w3.org/2000/svg" viewBox="${270-(hiX-loX)*scale/2-8} ${185-(hiY-loY)*scale/2-8} ${(hiX-loX)*scale+16} ${(hiY-loY)*scale+16}" role="img" aria-label="${title}"><title>${title}</title>${content}</svg>`};
 }
 function draw(type='chord',params={}){
  let p={},s,caption='示意图按几何关系绘制；计算以题目条件为准。';
  const basicBounds=[[-3,-3],[3,3]];
  if(['basics','symmetry','chord','parallel','arcs','angle','angle-edge','angle-inside','angle-outside','angle-obtuse','cyclic','circum','diameter','similar','ptolemy','perp'].includes(type)){
   let R=3;
   if(['basics','symmetry','chord','parallel'].includes(type)){
    const d=params.d===undefined?1.8:Number(params.d),a=Math.sqrt(Math.max(0,9-d*d));p={O:[0,0],A:[-a,-d],B:[a,-d],M:[0,-d],C:[0,3],D:[0,-3]};s=scene('垂径定理：半径、弦心距与半弦',p,{bounds:basicBounds});s.circle('O',3);s.polygon(['O','M','B']);s.line('A','B');s.line('O','A');s.line('O','B');s.line('C','D',orange,true);s.right('O','M','B');['A','B','C','D'].forEach(n=>s.point(n,n==='A'?-24:10,n==='D'?23:-10));s.point('O',-25,-9);s.point('M',8,23);s.label([a/2,-d],'a/2',0,24);s.label([0,-d/2],'d',12,0);s.label([a/2,-d/2],'R',12,-5);
    if(type==='parallel'){const d2=params.same?0.8:-0.8,a2=Math.sqrt(9-d2*d2);s.line([-a2,d2],[a2,d2],green);s.label([-a2,d2],'E',-23,-5);s.label([a2,d2],'F',12,-5);caption='两条平行弦的距离：先分别求弦心距，再区分圆心同侧与异侧。'}
    if(type==='symmetry'){s.arc('O',3,90,270,green,4);caption='过圆心的直线是对称轴。沿它对折，弦的两个端点以及对应圆弧分别重合。'}
    if(type==='chord')caption='先连半径，再作弦心距：AM＝MB＝AB/2，OM²＋MB²＝OB²。';
   }else if(type==='arcs'){
    p={O:[0,0],A:polar(3,70),B:polar(3,150),C:polar(3,260),D:polar(3,340)};s=scene('同圆中的两组等弦与等圆心角',p,{bounds:basicBounds});s.circle('O',3);s.polygon(['O','A','B']);s.polygon(['O','C','D'],'#edf6e6');['A','B','C','D'].forEach(n=>s.line('O',n,gray,true));s.line('A','B');s.line('C','D',green);s.arc('O',3,70,150);s.arc('O',3,260,340);Object.keys(p).forEach(n=>s.point(n));caption='同圆或等圆中，对应小圆心角相等、弧相等、弦相等可以相互转化。';
   }else if(type.startsWith('angle')){
    let a=params.alpha||60;
    p={O:[0,0],A:polar(3,270-a),B:polar(3,270+a),C:[0,3]};
    if(type==='angle-edge')p={O:[0,0],C:[3,0],B:[-3,0],A:polar(3,110)};
    if(type==='angle-inside')p={O:[0,0],C:[3,0],A:polar(3,110),B:polar(3,250),D:[-3,0]};
    if(type==='angle-outside')p={O:[0,0],C:[3,0],A:polar(3,70),B:polar(3,140),D:[-3,0]};
    if(type==='angle-obtuse')p={O:[0,0],A:polar(3,230),B:polar(3,310),C:polar(3,270)};
    s=scene('圆周角与对应圆弧：顶点C不在所对弧上',p,{bounds:basicBounds});s.circle('O',3);s.line('C','A');s.line('C','B');s.line('O','A',orange,true);s.line('O','B',orange,true);if(p.D)s.line('C','D',orange,true);if(type==='angle')s.arc('O',3,270-a,270+a);Object.keys(p).forEach(n=>s.point(n,n==='O'?-24:9,n==='C'?23:-10));caption=type==='angle-outside'?'固定点序C、A、B、D：∠ACB＝∠ACD－∠BCD，相应弧度数也相减。':'圆周角∠ACB所对的是不含C的AB弧。必须比较同一条弧对应的角。';
   }else if(type==='cyclic'||type==='ptolemy'){
    p={O:[0,0],A:polar(3,125),B:polar(3,215),C:polar(3,310),D:polar(3,35)};s=scene('圆内接四边形ABCD',p,{bounds:basicBounds});s.circle('O',3);s.polygon(['A','B','C','D']);[['A','B'],['B','C'],['C','D'],['D','A']].forEach(e=>s.line(...e));s.line('A','C',orange,true);s.line('B','D',orange,true);
    if(type==='ptolemy'){const f=distance(p.A,p.B)*distance(p.C,p.D)/(distance(p.B,p.D)*distance(p.A,p.C));p.K=[p.A[0]+f*(p.C[0]-p.A[0]),p.A[1]+f*(p.C[1]-p.A[1])];s.line('B','K',green);s.point('K',12,16)}['A','B','C','D'].forEach(n=>s.point(n));caption=type==='ptolemy'?'在AC上构造K，建立两组相似，再利用AK＋KC＝AC相加。':'顶点按圆周顺序排列。∠A与∠C互补，∠B与∠D互补。';
   }else if(type==='perp'){
    const example=!!params.example,R=example?5:3,k=Math.sqrt(8);p=example?{O:[0,0],P:[-3,0],A:[-5,0],B:[5,0],C:[-3,4],D:[-3,-4]}:{O:[0,0],P:[-1,-1],A:[-k,-1],B:[k,-1],C:[-1,k],D:[-1,-k],M:[0,-1],N:[-1,0]};s=scene(params.hideRight?'圆内相交的弦AB、CD':'两条垂直相交的弦AB、CD',p,{bounds:[[-R,-R],[R,R]]});s.circle('O',R);s.line('A','B');s.line('C','D');if(!params.hideRight)s.right('B','P','C');if(!example){s.line('O','M',orange,true);s.line('O','N',orange,true);s.right('O','M','B');s.right('O','N','C')}Object.keys(p).forEach(n=>s.point(n,n==='A'||n==='P'||n==='N'?-24:9,n==='P'||n==='M'?24:-10));caption=params.hideRight?'相交弦乘积：PA·PB＝PC·PD。先证明相似，再选择同一条弦上的两段相乘。':'两弦在圆内垂直相交，M、N分别是弦中点；用垂径和勾股证明四段平方和等于4R²。';
   }else{
    p={O:[0,0],A:[-3,0],B:[3,0],C:[-1,Math.sqrt(8)],H:[-1,0]};if(params.alpha){p.C=polar(3,2*params.alpha);p.H=[p.C[0],0]}if(type==='circum'&&params.kind==='acute')p={O:[0,0],A:polar(3,90),B:polar(3,210),C:polar(3,330)};if(type==='circum'&&params.kind==='obtuse')p={O:[0,0],A:polar(3,65),B:polar(3,105),C:polar(3,230)};
    s=scene('直径与直角三角形，外接圆与相似',p,{bounds:basicBounds});s.circle('O',3);s.polygon(['A','B','C']);s.line('A','B');s.line('A','C');s.line('B','C');if(p.H){s.line('C','H',orange,true);s.right('A','C','B');s.right('C','H','A')}if(type==='circum')Object.keys(p).filter(n=>n!=='O'&&n!=='H').forEach(n=>s.line('O',n,orange,true));Object.keys(p).forEach(n=>s.point(n,n==='A'?-25:9,n==='H'||n==='O'?23:-10));caption=type==='similar'?'CD或CH是斜边上的高时，先找两组等角，再写相似三角形的对应比例；本图垂足记为H。':'直角三角形的外心是斜边中点；锐角、钝角三角形的外心位置需分别检查。';
   }
  }else if(type==='power-chords'||type==='power-secants'){
   if(type==='power-chords'){const v=[.5,Math.sqrt(3)/2],P=[-1,-.6],dot=P[0]*v[0]+P[1]*v[1],disc=Math.sqrt(dot*dot+9-P[0]**2-P[1]**2),t1=-dot+disc,t2=-dot-disc,a=Math.sqrt(9-.36);p={O:[0,0],P,A:[-a,-.6],B:[a,-.6],C:[P[0]+t1*v[0],P[1]+t1*v[1]],D:[P[0]+t2*v[0],P[1]+t2*v[1]]};s=scene('圆内相交弦：比较三角形APC与DPB',p,{bounds:basicBounds});s.circle('O',3);s.line('A','B');s.line('C','D');s.line('A','C',orange,true);s.line('D','B',orange,true);caption='△APC∽△DPB，对应A↔D、P↔P、C↔B；PA/PD＝PC/PB，得到PA·PB＝PC·PD。';}
   else{const v=[-Math.cos(Math.PI/9),Math.sin(Math.PI/9)],dot=5*v[0],disc=Math.sqrt(dot*dot-16),t1=-dot-disc,t2=-dot+disc;p={O:[0,0],P:[5,0],A:[3,0],B:[-3,0],C:[5+t1*v[0],t1*v[1]],D:[5+t2*v[0],t2*v[1]]};s=scene('圆外两割线：点序P-A-B与P-C-D',p,{bounds:[...basicBounds,[5.5,0]]});s.circle('O',3);s.line('P','B');s.line('P','D');s.line('A','D',orange,true);s.line('C','B',orange,true);caption='△PAD∽△PCB，对应P↔P、A↔C、D↔B；PA/PC＝PD/PB，所以PA·PB＝PC·PD。';}
   Object.keys(p).filter(n=>n!=='O').forEach(n=>s.point(n,n==='B'?-24:9,n==='A'||n==='B'||n==='P'?24:-10));
  }else if(['tangent','double','construct','power'].includes(type)){
   const R=3,k=params.p||5,x=R*R/k,y=Math.sqrt(R*R-x*x);p={O:[0,0],P:[k,0],A:[x,y],B:[x,-y],H:[x,0],E:[-R,0],F:[R,0]};s=scene('圆的切线与切点处的半径垂直',p,{bounds:[[-3.5,-3.5],[k+.4,3.5]]});s.circle('O',R);s.line('P','A');s.line('O','A',orange,true);s.line('O','P',gray,true);s.right('O','A','P');
   if(type==='double'){s.line('P','B');s.line('O','B',orange,true);s.line('A','B',green);s.right('O','B','P');s.right('O','H','A');['O','P','A','B','H'].forEach(n=>s.point(n,n==='O'?-23:9,n==='H'?23:-10));caption='同一点P的两条切线：PA＝PB，OP平分∠APB，并垂直平分切点弦AB。'}
   else if(type==='construct'){p.K=[k/2,0];s.circle('K',k/2,orange,true);s.line('P','B');s.line('O','B',orange,true);s.right('O','B','P');['O','P','A','B','K'].forEach(n=>s.point(n,8,n==='K'?24:-10));caption='以OP为直径作辅助圆。交点A、B处产生直角，从而得到两条切线。'}
   else if(type==='power'){p.T=p.A;p.A=p.F;p.B=p.E;s.line('B','P');['O','P','T','A','B'].forEach(n=>s.point(n,8,n==='A'||n==='B'?23:-10));caption='P、A、B依次共线：切线PT的平方＝PA·PB。乘的是外段和全段。'}
   else{['O','P','A'].forEach(n=>s.point(n));s.label('A','切点',13,24);caption='证明切线：先连接圆心与圆上一点，再证明这条半径垂直于待证直线。'}
  }else if(type==='position'){
   const d=params.d===undefined?2:Number(params.d);p={O:[0,0]};s=scene('圆心到直线的垂距决定位置关系',p,{bounds:basicBounds});s.circle('O',3);s.line([-3.7,-d],[3.7,-d],green);s.line('O',[0,-d],orange,true);s.right('O',[0,-d],[3,-d]);s.point('O',-24,-9);s.label([0,-d],'H',10,23);s.label([3.5,-d],'l',10,-9);if(d<3){const a=Math.sqrt(9-d*d);s.label([-a,-d],'A',-23,24);s.label([a,-d],'B',10,24)}caption='OH是圆心到直线l的垂距；OH小于半径时相交，等于时相切，大于时相离。';
  }else if(type==='minmax'){
   p={O:[0,0],P:[5,0],A:[3,0],B:[-3,0],Q:polar(3,100)};s=scene('固定点P到整圆上动点的最近与最远距离',p,{bounds:[[-3.5,-3.5],[5.5,3.5]]});s.circle('O',3);s.line('B','P');s.line('P','Q',orange,true);s.line('O','Q',gray,true);Object.keys(p).forEach(n=>s.point(n,8,n==='A'||n==='O'||n==='B'?23:-10));caption='P在圆外时，A是整圆最近点，B是最远点；若只允许一段圆弧，还要检查A、B是否允许。';
  }else if(type==='common-chord'){
   p={O:[0,0],A:[3,0],B:polar(3,60),C:polar(3,120),'C′':polar(3,240)};s=scene('共端点弦的两种端点位置',p,{bounds:basicBounds});s.circle('O',3);s.line('A','O',gray,true);s.line('A','B');s.line('A','C',green);s.line('A','C′',orange,true);Object.keys(p).forEach(n=>s.point(n,n==='C'||n==='C′'?-25:8));caption='B与C在AO同侧时，A处夹角取差；C换到C′时取和。两种位置都符合给定的弦长。';
  }else if(type==='semicircle-mid'){
   p={O:[0,0],A:[-3,0],B:[3,0],M:[0,3],C:polar(3,255)};s=scene('半圆弧中点和另一半圆上的顶点',p,{bounds:basicBounds});s.circle('O',3);s.arc('O',3,0,90,green);s.arc('O',3,90,180,green);[['A','B'],['A','M'],['B','M'],['C','A'],['C','B'],['C','M']].forEach(e=>s.line(...e));Object.keys(p).forEach(n=>s.point(n,n==='A'?-25:9,n==='O'?22:-10));caption='M平分上半圆弧，C在下方开半圆。两段90°弧分别对应C处的两个45°圆周角。';
  }else if(type==='isosceles-diameter'){
   p={A:[0,8],B:[-6,0],C:[6,0],D:[0,0],O:[-3,4]};s=scene('等腰三角形与以一腰AB为直径的圆',p,{bounds:[[-8.5,-1.5],[6.5,9.5]]});s.circle('O',5);s.line('A','B');s.line('A','C');s.line('B','C');s.line('A','D',orange,true);s.right('A','D','B');Object.keys(p).forEach(n=>s.point(n,n==='B'?-25:9,n==='D'?23:-10));caption='AB为直径，先得AD⊥BC；再由AB＝AC得到BD＝DC。C位于圆外，不能把C误画到圆上。';
  }else if(type==='incircle'){
   p={A:[0,4],B:[0,0],C:[3,0],I:[1,1],D:[0,1],E:[1,0],F:[1.8,1.6]};s=scene('三角形内切圆：圆心到三边的垂距相等',p);s.polygon(['A','B','C']);[['A','B'],['B','C'],['C','A']].forEach(e=>s.line(...e));s.circle('I',1,green);['D','E','F'].forEach(n=>s.line('I',n,orange,true));s.line('A','I',gray,true);s.line('B','I',gray,true);s.line('C','I',gray,true);s.right('I','D','A');s.right('I','E','B');s.right('I','F','A');Object.keys(p).forEach(n=>s.point(n,n==='D'?-23:8,n==='E'||n==='B'?23:-9));caption='ID、IE、IF分别垂直于三边，长度都是内切圆半径；IA、IB、IC一般不相等。';
  }else if(type==='arc-mid'){
   p={O:[0,0],A:polar(3,75),B:polar(3,200),C:polar(3,340),M:polar(3,270)};p.N=intersect(p.A,p.M,p.B,p.C);const a=distance(p.B,p.C),b=distance(p.A,p.C),c=distance(p.A,p.B);p.I=[(a*p.A[0]+b*p.B[0]+c*p.C[0])/(a+b+c),(a*p.A[1]+b*p.B[1]+c*p.C[1])/(a+b+c)];s=scene('弧中点M、角平分线与内心I',p,{bounds:basicBounds});s.circle('O',3);s.arc('O',3,200,270);s.arc('O',3,270,340);[['A','B'],['A','C'],['B','C'],['A','M'],['B','M'],['C','M']].forEach(e=>s.line(...e));s.line('B','I',orange,true);['A','B','C','M','N','I'].forEach(n=>s.point(n,n==='I'?-24:9,n==='N'?23:-9));caption='M取在不含A的BC弧上：AM平分∠A，MB＝MC；I为内心时，还可证明MI＝MB。';
  }else if(type==='polygon'){
   const n=params.n||6;p={O:[0,0]};for(let i=0;i<n;i++)p[String.fromCharCode(65+i)]=polar(3,90+i*360/n);p.H=[(p.A[0]+p.B[0])/2,(p.A[1]+p.B[1])/2];s=scene(`正${n}边形与圆`,p,{bounds:basicBounds});s.circle('O',3);const names=Object.keys(p).filter(x=>x!=='O'&&x!=='H');s.polygon(names);for(let i=0;i<n;i++){s.line(names[i],names[(i+1)%n]);s.line('O',names[i],gray,true)}s.line('O','H',orange,true);s.right('O','H','A');Object.keys(p).forEach(n=>s.point(n,n==='H'?-22:9));caption='半边长、边心距与外接圆半径构成直角三角形。中心角＝360°÷边数。';
  }else if(type==='sector'||type==='sweep'){
   const n=params.n||90;p={O:[0,0],A:[3,0],B:polar(3,n)};s=scene(type==='sector'?'扇形的弧长与面积':'线段旋转的轨迹与扫过区域',p,{bounds:basicBounds});const o=s.xy(p.O),a=s.xy(p.A),b=s.xy(p.B),r=3*s.scale;s.raw(`<path d="M${o.join(' ')} L${a.join(' ')} A${r} ${r} 0 ${n>180?1:0} 0 ${b.join(' ')} Z" fill="#e9f5df"/>`);s.arc('O',3,0,n);s.line('O','A');s.line('O','B');if(type==='sweep'){const inner=1.2*s.scale,aa=s.xy([1.2,0]),bb=s.xy(polar(1.2,n));s.raw(`<path d="M${o.join(' ')} L${aa.join(' ')} A${inner} ${inner} 0 ${n>180?1:0} 0 ${bb.join(' ')} Z" fill="white"/>`);s.arc('O',1.2,0,n,orange);s.line([1.2,0],'A');s.line(polar(1.2,n),'B');s.label([1.2,0],'C',-8,24);caption='外端点走的是圆弧，线段扫过的是扇环区域；两者使用的公式和单位不同。'}else caption='弧长L＝nπR/180；扇形面积S＝nπR²/360＝LR/2。扇形周长还要加两条半径。';Object.keys(p).forEach(n=>s.point(n,n==='O'?-24:9));s.label(polar(1.0,n/2),`${n}°`,0,0);
  }else if(type==='locus'){
   const k=params.p||1.8;p={O:[0,0],P:[k,0],K:[k/2,0],M:polar(k/2,150,[k/2,0])};const v=[p.P[0]-p.M[0],p.P[1]-p.M[1]],len=Math.hypot(...v),u=v.map(x=>x/len),h=Math.sqrt(Math.max(0,9-p.M[0]**2-p.M[1]**2));p.A=[p.M[0]+h*u[0],p.M[1]+h*u[1]];p.B=[p.M[0]-h*u[0],p.M[1]-h*u[1]];s=scene('过固定点P的弦，中点M在以OP为直径的辅助圆上',p,{bounds:[...basicBounds,[k+.5,0]]});s.circle('O',3);s.circle('K',k/2,green,true);s.line('A','B');if(k>3)s.line('P','A',gray,true);s.line('O','M',orange,true);s.line('O','P',gray,true);s.right('O','M','P');['O','P','A','B','M'].forEach(n=>s.point(n,n==='O'?-24:9,n==='P'?22:-9));caption='先由OM⊥PM找辅助圆，再根据P在原圆内、圆上或圆外，检查允许圆弧与端点。';
  }else if(type==='restricted-arc'){
   p={O:[0,0],P:[3,0],A:[-1,0],B:[0,1],C:[0,-1],Q:polar(1,140)};s=scene('动点Q只允许在左半圆弧上',p,{bounds:[[-1.5,-1.4],[3.5,1.4]]});s.line([-1.5,0],[3.5,0],gray,false,1.8);s.line([0,-1.4],[0,1.4],gray,false,1.8);s.circle('O',1,gray,true);s.arc('O',1,90,270,green,5);s.line('P','Q');s.line('P','A',orange,true);s.line('P','B',orange,true);Object.keys(p).forEach(n=>s.point(n,n==='O'?-23:8,n==='P'||n==='O'||n==='A'?23:-10));caption='绿色为允许的左半圆弧，包含两个端点。整圆的最近点不在允许范围内，需检查弧端点。';
  }else if(type==='axis-tangent'||type==='axis-four'){
   const four=type==='axis-four';p=four?{O:[0,0],M:[2,2],N:[-2,2],P:[-2,-2],Q:[2,-2]}:{O:[0,0],M:[-2,3],T:[-2,0]};s=scene(four?'同时与两坐标轴相切的四个圆心位置':'圆心到x轴的垂距等于半径',p,{bounds:four?[[-4.7,-4.7],[4.7,4.7]]:[[-5.7,-.7],[1.7,6.7]]});s.line(four?[-4.7,0]:[-5.7,0],four?[4.7,0]:[1.7,0],gray,false,1.8);s.line([0,four?-4.7:-.7],[0,four?4.7:6.7],gray,false,1.8);if(four){['M','N','P','Q'].forEach(n=>s.circle(n,2,n==='M'?blue:green,true));caption='圆心横、纵坐标的绝对值均为2，共四个象限中的四种位置。'}else{s.circle('M',3);s.line('M','T',orange,true);s.right('M','T','O');caption='M(-2,3)到x轴的距离是|3|＝3，切点T(-2,0)，所以半径为3。'}Object.keys(p).forEach(n=>s.point(n,9,n==='O'||n==='T'?23:-10));
  }else if(type==='coordinates'){
   p={M:[3,5],A:[0,1],B:[0,9],T:[3,0],O:[0,0],H:[0,5]};s=scene('圆与坐标轴相切及弦的垂直平分线',p,{bounds:[[-3,-1],[9,11]]});s.line([-3,0],[9,0],gray,false,1.8);s.line([0,-1],[0,11],gray,false,1.8);s.circle('M',5);s.line('M','T',orange,true);s.line('M','H',orange,true);s.line('A','B');s.right('M','T','O');Object.keys(p).forEach(n=>s.point(n,n==='A'||n==='B'?-27:10,n==='O'?22:-10));s.label([8.5,0],'x',0,23);s.label([0,10.5],'y',10,0);caption='切x轴：半径＝圆心纵坐标的绝对值。弦AB的垂直平分线经过圆心M。';
  }else if(type==='two-circles'||type==='rolling'){
   p={O:[0,0],P:[type==='rolling'?4:3.4,0]};s=scene('两圆的圆心距与半径关系',p,{bounds:[[-3.5,-3.5],[type==='rolling'?5.5:7,3.5]]});s.circle('O',3);s.circle('P',type==='rolling'?1:3,green);s.line('O','P',orange,true);if(type==='rolling'){s.circle('O',4,gray,true);s.point('O',-23,24);s.point('P',9,24);s.label([3,0],'T',-8,-10);caption='外滚时圆心距为R＋r，圆心路径是半径R＋r的圆；轮缘点的路径另作研究。'}else{const xx=1.7,yy=Math.sqrt(9-xx*xx);p.A=[xx,yy];p.B=[xx,-yy];s.line('A','B',green);['O','P','A','B'].forEach(n=>s.point(n));caption='相交两圆的圆心都到公共弦端点等距，因此连心线垂直平分公共弦。'}
  }else if(type==='cone'){
   return{svg:`<svg class="fig" viewBox="0 0 540 375" role="img" aria-label="圆锥轴截面与侧面展开对应"><title>母线l是展开扇形的半径</title><path d="M45 284L140 70L235 284" fill="#edf6e5" stroke="${blue}" stroke-width="3"/><ellipse cx="140" cy="284" rx="95" ry="25" fill="white" stroke="${blue}" stroke-width="2.5"/><path d="M140 70V284H235" fill="none" stroke="${orange}" stroke-width="2.5" stroke-dasharray="7 6"/><text x="185" y="175">l</text><text x="150" y="180">h</text><text x="184" y="278">r</text><path d="M140 271h13v13" fill="none" stroke="${orange}" stroke-width="2"/><path d="M350 72L295 280 A220 220 0 0 0 505 230Z" fill="#edf6e5" stroke="${blue}" stroke-width="3"/><text x="301" y="171">l</text><text x="365" y="292">弧长＝2πr</text><text x="67" y="338">l²＝r²＋h²</text><text x="306" y="338">S侧＝πrl</text></svg>`,caption:'展开扇形的半径是母线l，弧长等于底面圆周长2πr。图形为结构示意。'};
  }else return draw('chord',params);
  let svg=s.svg();if(params.foot==='D'){svg=svg.replace(/>H<\/text>/g,'>D</text>');caption=caption.replace(/H/g,'D').replace('CD或CD','CD')}
  return{svg,caption};
 }
 return{draw,polar,distance};
})();
