'use strict';
window.CircleExam=(()=>{
 const id='sz2024-q18',legacyId='sz2024-q18-1';
 const givens=['在△ABD中，AB＝BD，⊙O是△ABD的外接圆。','直线BE与⊙O相切，切点为B。','AC是⊙O的直径。连接DC并延长，交直线BE于点E（点序为D、C、E）。'];
 const parts=[{id:'proof',label:'第（1）问 · 几何证明',goal:'求证：DE⊥BE。',steps:[
 '连接OB，并延长BO交AD于H，再连接OD。H是新添的辅助点，位于线段AD上。',
 'AB＝BD，说明B到A、D的距离相等；OA＝OD（同圆半径），说明O到A、D的距离也相等。因此B、O都在AD的垂直平分线上。直线BO就是这条垂直平分线，得到BH⊥AD，AH＝HD。',
 'BE是圆O在B处的切线，所以OB⊥BE。又因为B、O、H共线，所以BH⊥BE，∠HBE＝90°。这里直接使用切线性质。',
 'AC是直径，D在圆上，所以∠ADC＝90°。D、C、E共线，因此AD⊥DE，∠HDE＝90°。',
 '看四边形BHDE：H处、B处、D处的三个内角都是90°，所以BHDE是矩形（三个角是直角的四边形是矩形）。',
 '矩形的相邻边互相垂直。BE与DE是这个矩形的两条相邻边，所以DE⊥BE，第（1）问得证。'
 ],hints:['先找题目中的等长和直角：AB＝BD能联系哪条中垂线？切线和直径各能提供哪个直角？','连接OB，延长BO交AD于H，再连接OD。由AB＝BD、OA＝OD，说明BO垂直平分AD。','把BH、HD、DE、EB看成一个四边形。若已经找到三个直角，可以判定它是什么四边形？']},
 {id:'compute',label:'第（2）问 · 综合计算',goal:'若AB＝5√6，BE＝5，求⊙O的半径。',steps:[
 '沿用第（1）问的辅助线与结论。四边形BHDE是矩形，矩形对边相等，所以DH＝BE＝5。',
 'BH垂直平分AD，所以AH＝DH＝5。在Rt△ABH中，∠AHB＝90°，斜边AB＝5√6。',
 '用勾股定理：BH²＝AB²－AH²＝(5√6)²－5²＝150－25＝125。BH是长度，取正值，得到BH＝5√5。',
 '设圆半径为r，则OA＝OB＝r。图中点序为B—O—H，所以BH＝BO＋OH，进而OH＝BH－BO＝5√5－r。',
 '看Rt△AOH：H处是直角，OA是斜边。由OA²＝AH²＋OH²，列出方程：r²＝25＋(5√5－r)²。',
 '先展开完全平方：(5√5－r)²＝125－10√5·r＋r²。代入得到：r²＝25＋125－10√5·r＋r²。',
 '两边同时减去r²，得到0＝150－10√5·r。移项得10√5·r＝150，所以r＝150/(10√5)＝15/√5＝3√5。',
 '检验：r＝3√5＞0，OH＝5√5－3√5＝2√5＞0；(3√5)²＝5²＋(2√5)²＝45，符合勾股关系。因此⊙O的半径为3√5。'
 ],hints:['第（1）问得到的矩形还能提供什么？先把BE＝5转移到DH上，再用中垂线得到AH。','先在Rt△ABH中求BH；再设半径为r，用BH－OB表示OH。','在Rt△AOH中列勾股方程，OA＝r，AH＝5，OH＝5√5－r。展开后，两边的r²可以消去。']}];
 const questions=parts.map(p=>p.goal);
 function draw(stage=0,part='proof'){
 const calculate=part==='compute',limit=calculate?8:6;stage=Math.max(0,Math.min(limit,Number(stage)||0));const k=Math.sqrt(5),p=Object.fromEntries(Object.entries({O:[0,0],A:[-3,0],B:[2,k],C:[3,0],D:[1/3,-4*k/3],E:[11/3,k/3],H:[-4/3,-2*k/3]}).map(([n,q])=>[n,q.map(x=>x*k)]));
 const s=CircleFigures.createScene('2024年深圳中考第18题：等腰三角形、中垂线、矩形与勾股定理的综合题',p,{bounds:[[-3.8*k,-3.8*k],[4.8*k,3.4*k]]}),orange='#b8671b',green='#398c24',red='#c65353',aux=calculate||stage>=1,mid=(a,b)=>[(p[a][0]+p[b][0])/2,(p[a][1]+p[b][1])/2];
 if(calculate||stage>=5)s.polygon(['B','H','D','E'],'#edf7e7');
 if(calculate&&stage>=5)s.polygon(['A','O','H'],'#f8e9e9');
 s.circle('O',3*k);[['A','B'],['B','D'],['A','D'],['A','C'],['D','E']].forEach(e=>s.line(...e));
 const u=[k/3,-2/3];s.line([p.B[0]-.7*k*u[0],p.B[1]-.7*k*u[1]],[p.E[0]+.65*k*u[0],p.E[1]+.65*k*u[1]]);
 function lengthLabel(a,b,text){const u=s.xy(p[a]),v=s.xy(p[b]),dx=v[0]-u[0],dy=v[1]-u[1],length=Math.hypot(dx,dy),x=(u[0]+v[0])/2-dy/length*12,y=(u[1]+v[1])/2+dx/length*12;let angle=Math.atan2(dy,dx)*180/Math.PI;if(angle>90)angle-=180;if(angle< -90)angle+=180;s.raw(`<text class="label" x="${x}" y="${y}" text-anchor="middle" transform="rotate(${angle} ${x} ${y})" style="font-size:17px">${text}</text>`)}
 function tick(a,b){const x=p[a],y=p[b],dx=y[0]-x[0],dy=y[1]-x[1],len=Math.hypot(dx,dy),m=mid(a,b),v=[-dy/len*.1*k,dx/len*.1*k];s.line([m[0]-v[0],m[1]-v[1]],[m[0]+v[0],m[1]+v[1]])}tick('A','B');tick('B','D');
 if(aux){s.line('B','H',orange,true);s.line('O','D',orange,true)}
 if(calculate||stage>=2)s.right('B','H','D');if(calculate||stage>=3)s.right('H','B','E');if(calculate||stage>=4)s.right('A','D','E');
 if(calculate||stage>=5){[['B','H'],['H','D'],['D','E'],['E','B']].forEach(e=>s.line(...e,green,false,3.3))}
 if(calculate||stage>=6)s.right('D','E','B');
 if(calculate){s.label(mid('A','B'),'5√6',-18,-12);s.label(mid('B','E'),'5',16,-2);if(stage>=1){s.line('H','D',red,false,4);s.label(mid('H','D'),'5',-22,20)}if(stage>=2){s.line('A','H',red,false,4);s.label(mid('A','H'),'5',-20,0)}if(stage>=3)s.label(mid('B','H'),'5√5',26,1);if(stage>=4){s.label(mid('O','A'),stage>=8?'3√5':'r',-10,-12);s.label(mid('O','B'),stage>=8?'3√5':'r',-20,-13);lengthLabel('O','H',stage>=8?'2√5':'5√5－r')}if(stage>=5){s.line('A','O',red,false,4);s.line('O','H',red,false,4);s.line('H','A',red,false,4)}}
 const positions={O:calculate?[9,20]:[-26,-11],A:[-24,9],B:[4,-15],C:[-1,26],D:[-5,25],E:[14,1],H:[-25,15]};Object.keys(p).filter(n=>n!=='H'||aux).forEach(n=>s.point(n,...positions[n]));
 const captions=calculate?['第（2）问题设图：沿用第（1）问的矩形，已知AB＝5√6、BE＝5。','由矩形对边相等，把BE＝5转移到DH上。','利用垂直平分线，得到AH＝DH＝5。','在Rt△ABH中，用勾股定理得到BH＝5√5。','设OA＝OB＝r，利用B—O—H的点序表示OH。','重点看红色Rt△AOH，用半径作斜边列方程。','展开(5√5－r)²，注意中间项是－10√5·r。','消去两边的r²，解出r＝3√5。','检验半径与各线段均为正，答案为3√5。']:['第（1）问题设图：先读已知，辅助线按核对步骤出现。','连接OB并延长至H，连接OD。','AB＝BD与OA＝OD，共同确定AD的垂直平分线。','切线性质给出B处的直角。','直径所对圆周角给出D处的直角。','H、B、D三个直角，判定绿色四边形BHDE为矩形。','由矩形相邻边垂直，得到DE⊥BE。'];
 return{svg:s.svg(),caption:captions[stage],geometry:p};
 }
 return{id,legacyId,title:'等腰三角形与矩形：证明并求半径',intro:'把前几天学的等腰三角形、垂直平分线、矩形和勾股定理放在同一道题中运用。',givens,questions,parts,review:['等腰与中垂线：到线段两端距离相等的点，位于这条线段的垂直平分线上。','矩形判定：三个角是直角的四边形是矩形。','矩形性质：对边相等，相邻边互相垂直。','勾股定理：在直角三角形中，斜边的平方等于两条直角边的平方和。','圆的性质直接使用：切线垂直于过切点的半径；直径所对的圆周角是直角。'],source:'https://zy.21cnjy.com/20741089',solutionSource:'https://kaosj.com/papers/2024/07/2024-zhongkao-math-guangdong-shenzhen-8d2b1fd738-paper/',draw};
})();
