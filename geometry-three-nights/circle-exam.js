'use strict';
window.CircleExam=(()=>{
 const id='sz2024-q18-1';
 const givens=['在△ABD中，AB＝BD，⊙O是△ABD的外接圆。','直线BE与⊙O相切，切点为B。','AC是⊙O的直径。连接DC并延长，交直线BE于点E（点序为D、C、E）。'];
 const steps=[
 '连接OB，并延长BO交AD于H，再连接OD。注意H是新添的辅助点。',
 '因为AB＝BD，点B到A、D的距离相等，所以B在AD的垂直平分线上；又因为OA＝OD（同圆半径），O也在AD的垂直平分线上。B与O是不同的两点，所以直线BO就是AD的垂直平分线。因此BH⊥AD，AH＝HD。',
 'BE在B处与⊙O相切，OB是过切点的半径，所以OB⊥BE。B、O、H共线，因此BH⊥BE。',
 'AD与BE都垂直于BH，所以AD∥BE（同一平面内，垂直于同一条直线的两条直线平行）。',
 'AC是直径，D在⊙O上，所以∠ADC＝90°（直径所对的圆周角是直角）。于是AD⊥DC。又因为D、C、E共线，所以AD⊥DE。',
 '由AD∥BE，DE⊥AD，得到DE⊥BE。原命题得证。'
 ];
 function draw(stage=0){stage=Math.max(0,Math.min(6,Number(stage)||0));const k=Math.sqrt(5),p={O:[0,0],A:[-3,0],B:[2,k],C:[3,0],D:[1/3,-4*k/3],E:[11/3,k/3],H:[-4/3,-2*k/3]},s=CircleFigures.createScene('2024年深圳中考第18题第1问：切线、直径与等弦的证明题',p,{bounds:[[-3.6,-3.7],[4.5,3.3]]}),orange='#b8671b',green='#398c24';
 s.circle('O',3);[['A','B'],['B','D'],['A','D'],['A','C'],['D','E']].forEach(e=>s.line(...e));
 const u=[k/3,-2/3];s.line([p.B[0]-.7*u[0],p.B[1]-.7*u[1]],[p.E[0]+.55*u[0],p.E[1]+.55*u[1]]);
 function tick(a,b){const x=p[a],y=p[b],dx=y[0]-x[0],dy=y[1]-x[1],len=Math.hypot(dx,dy),m=[(x[0]+y[0])/2,(x[1]+y[1])/2],v=[-dy/len*.10,dx/len*.10];s.line([m[0]-v[0],m[1]-v[1]],[m[0]+v[0],m[1]+v[1]])}tick('A','B');tick('B','D');
 if(stage>=1){s.line('B','H',orange,true);s.line('O','D',orange,true)}
 if(stage>=2)s.right('B','H','D');if(stage>=3)s.right('O','B','E');
 if(stage>=4){s.line('A','D',green,false,3.6);s.line('B','E',green,false,3.6)}
 if(stage>=5)s.right('A','D','E');if(stage>=6)s.right('D','E','B');
 const positions={O:[-24,-10],A:[-24,8],B:[4,-15],C:[-1,26],D:[-5,25],E:[14,1],H:[-25,14]};
 Object.keys(p).filter(n=>n!=='H'||stage>=1).forEach(n=>s.point(n,...positions[n]));
 const captions=['题设图：AB＝BD，AC为直径，BE在B处相切。先独立找出能得到的关系。','第1步：连接OB，延长BO交AD于H，再连接OD。','第2步：利用等距点说明BO垂直平分AD。','第3步：切点处半径OB垂直于切线BE。','第4步：AD与BE都垂直BH，因此平行（绿色）。','第5步：直径产生∠ADC＝90°，于是AD⊥DE。','第6步：结合AD∥BE与AD⊥DE，得到DE⊥BE。'];
 return {svg:s.svg(),caption:captions[stage],geometry:p};}
 return{id,title:'切线与直径：证明DE⊥BE',intro:'把切线性质、直径所对圆周角和垂直平分线串成一条证明。',givens,goal:'DE⊥BE。',steps,hints:['切线BE与直径AC，分别能带来哪个直角？','AB＝BD与OA＝OD都涉及A、D。点B和O分别位于线段AD的哪条特殊直线上？','连接OB并延长交AD于H，再连接OD。先证明AD∥BE，再说明AD⊥DE。'],alternative:'前面已经得到BH⊥AD、BH⊥BE、AD⊥DE。因为H在AD上，四边形BHDE的H、B、D三个内角都是90°，所以BHDE为矩形。矩形相邻边垂直，故DE⊥BE。',source:'https://zy.21cnjy.com/20741089',draw};
})();
