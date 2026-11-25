'use strict';
window.CircleExamBank=(()=>{
 const red='#c65353',green='#398c24',orange='#b8671b';
 const paper24='https://kaosj.com/papers/2024/07/2024-zhongkao-math-guangdong-shenzhen-8d2b1fd738-paper/';
 const luohu='https://www.ky125.com/wp-content/uploads/2024/02/（周测二参考答案）2023年广东省深圳市罗湖区中考数学二模试卷.pdf';
 const congruence='https://zy.21cnjy.com/23132528';
 function part(id,label,goal,steps,hints){return{id,label,goal,steps,hints}}
 function make(q){q.questions=q.parts.map(p=>p.goal);q.intro=q.intro||'先读完已知与问题，独立找等长、等角、垂直和平行关系；需要时再展开提示。';q.version=q.version||'公开整理版 · 原题节选';return q}
 function drawing(title,p,stage,paint,caption,bounds){const s=CircleFigures.createScene(title,p,{bounds:bounds||[]});const mid=(a,b)=>[(p[a][0]+p[b][0])/2,(p[a][1]+p[b][1])/2];const edges=(list,color,dash=false,width=2.8)=>list.forEach(e=>s.line(...e,color,dash,width));const dots=(names,offsets={})=>names.forEach(n=>s.point(n,...(offsets[n]||[8,-10])));const tick=(a,b)=>{const d=CircleFigures.distance(p[a],p[b]),m=mid(a,b),u=[-(p[b][1]-p[a][1])*.09/d,(p[b][0]-p[a][0])*.09/d];s.line([m[0]-u[0],m[1]-u[1]],[m[0]+u[0],m[1]+u[1]])};paint(s,{mid,edges,dots,tick});return{svg:s.svg(),caption,geometry:p}}
 const rect=make({id:'sz2023-q20-1',title:'矩形中的全等：证明后转移长度',origin:'2023年深圳中考 · 第20题第（1）问',topic:'矩形 · 余角 · 全等',level:'基础衔接',source:congruence,solutionSource:'https://zy.21cnjy.com/22291163',givens:['矩形ABCD中，E在线段AD上，且BE＝BC。','从C向BE作垂线，垂足为F，即CF⊥BE。'],review:['矩形的四个角都是直角。','同角的余角相等。','AAS：两角及其中一角的对边分别相等，可判定两个三角形全等。','全等三角形的对应边相等；矩形面积＝邻边长的乘积。'],parts:[part('proof','① 证明全等','求证：△ABE≌△FCB。',[
 '矩形ABCD中，AB⊥AD，所以∠BAE＝90°；又CF⊥BE，所以∠CFB＝90°。先找到第一组相等的角。',
 'BE把矩形B处的直角分开，所以∠ABE＋∠EBC＝90°。在Rt△CFB中，∠FCB＋∠FBC＝90°；F在BE上，故∠FBC＝∠EBC。',
 '这两个角都与∠EBC相加得到90°，所以∠ABE＝∠FCB。这里用的是同角的余角相等。',
 '按A↔F、B↔C、E↔B的顺序对应：∠BAE＝∠CFB，∠ABE＝∠FCB，BE＝CB（已知）。因此△ABE≌△FCB（AAS）。'
 ],['先找两个直角。','要比较∠ABE与∠FCB，可让它们都与∠EBC相加。','注意对应顺序：BE对应CB，是两个三角形的斜边。']),part('compute','② 运用全等结论','若矩形ABCD的面积为20，求BE·CF。',[
 '沿用①的全等结论△ABE≌△FCB，可得AB＝FC；题设还给出BE＝BC。',
 '把乘积中的两条线段换成矩形邻边：BE·CF＝BC·AB。',
 'BC·AB正好是矩形ABCD的面积，因此BE·CF＝20。不需要分别算出BE和CF。'
 ],['不一定要先求两条线段各是多少。','把BE、CF分别替换成矩形的哪两条边？'])],draw(n=0,p='proof'){const calc=p==='compute';return drawing(this.title,{A:[0,0],B:[4,0],C:[4,5],D:[0,5],E:[0,3],F:[1.6,1.8]},n,(s,{edges,dots,tick})=>{if(n>=4||calc&&n>=1){s.polygon(['A','B','E'],'#edf7e7');s.polygon(['F','C','B'],'#f8e9e9')}edges([['A','B'],['B','C'],['C','D'],['D','A'],['B','E'],['C','F']]);s.right('C','F','B');tick('B','E');tick('B','C');if(n>=1)s.right('B','A','E');if(calc&&n>=1){s.line('C','F',red,false,4);s.line('A','B',red,false,4)}dots(['A','B','C','D','E','F'],{A:[-23,18],B:[8,18],D:[-23,-9],E:[-23,-5],F:[-24,19]})},n?'对照对应顶点A↔F、B↔C、E↔B；柔和红色强调可替换的等长线段。':'题设图已画好：F为垂足，BE＝BC；图中未标计算答案。')}});
 const fold=make({id:'sz2022-q20-1',title:'正方形折叠：找出两条相等的边',origin:'2022年深圳中考 · 第20题第（1）问',topic:'正方形 · 折叠 · HL全等',level:'基础衔接',source:congruence,givens:['正方形ABCD中，E在边AD上。','沿BE折叠△AEB，点A落在F处；延长EF，与边CD相交于G。'],review:['折叠前后的对应线段相等、对应角相等，折痕上的点保持不动。','正方形四边相等、四角都是直角。','HL：两个直角三角形的斜边和一条直角边分别相等，可判定全等。'],parts:[part('proof','第（1）问 · 发现','求证：△BFG≌△BCG。',[
 '沿BE折叠时，B、E不动，A变为F。因此BF＝BA，∠BFE＝∠BAE＝90°。',
 'E、F、G共线，所以BF⊥FG，△BFG是直角三角形。正方形的BC⊥CD，而G在CD上，故△BCG也是直角三角形。',
 '正方形中BA＝BC，又BF＝BA，所以BF＝BC。这是两个直角三角形的一组直角边相等。',
 'BG是两个直角三角形的公共斜边，所以BG＝BG。结合BF＝BC，得到Rt△BFG≌Rt△BCG（HL）。'
 ],['折叠能告诉你BF等于原图哪条边？','先确认两个三角形都是什么三角形。','BG是公共边；这里它是斜边还是直角边？'])],draw(n=0){return drawing(this.title,{A:[0,0],B:[4,0],C:[4,4],D:[0,4],E:[0,2],F:[1.6,3.2],G:[8/3,4]},n,(s,{edges,dots})=>{if(n>=3){s.polygon(['B','F','G'],'#f8e9e9');s.polygon(['B','C','G'],'#edf7e7')}edges([['A','B'],['B','C'],['C','D'],['D','A'],['E','B'],['E','G'],['B','F'],['B','G']]);s.line('E','B',orange,true);if(n>=1)s.right('B','F','G');if(n>=2)s.right('B','C','G');if(n>=3){s.line('B','F',red,false,4);s.line('B','C',red,false,4)}dots(['A','B','C','D','E','F','G'],{A:[-23,18],B:[8,18],C:[9,-6],D:[-23,-10],E:[-23,-3],F:[-27,2],G:[-8,-16]})},n?'折叠给出BF＝BA，再用正方形BA＝BC；公共斜边是BG。':'橙色虚线为折痕BE；A折到F，E、F、G共线。')}});
 const coordinate=make({id:'lh2023-q22-1',title:'矩形折叠：把几何条件变成方程',origin:'2023年深圳罗湖二模 · 第22题第（1）问',topic:'矩形 · 折叠 · 勾股 · 坐标',level:'综合应用',source:luohu,givens:['坐标系中，矩形AOBC的A、B分别在y轴、x轴正半轴上，C的坐标为(5，4)。','D在BC上；沿AD折叠，C落在x轴上的E处（E在线段OB上）。','AD的延长线与x轴相交于F。'],review:['横坐标相同的点在同一条竖直线上；纵坐标相同的点在同一条水平线上。','折叠中，折痕上的A、D到C及其对应点E的距离分别相等。','设点坐标前先确定它在哪条边上，再用一个字母表示未知长度。'],parts:[part('proof','原题第（1）问','求点D的坐标。',[
 '由矩形位置和C(5，4)，得到A(0，4)、B(5，0)、O(0，0)，所以AC＝OB＝5，OA＝BC＝4。',
 '折叠时A在折痕上不动，C落到E，所以AE＝AC＝5。在Rt△AOE中，OE²＝AE²－AO²＝25－16＝9，故OE＝3。',
 'E在线段OB上，所以BE＝OB－OE＝5－3＝2。注意这里取的是线段长度，不能把BE写成8。',
 '设D(5，a)，0＜a＜4，则BD＝a、CD＝4－a。D在折痕上，故DE＝DC＝4－a。',
 '看Rt△DBE：两条直角边为a、2，斜边为4－a。列勾股方程：a²＋2²＝(4－a)²。',
 '展开得a²＋4＝16－8a＋a²，消去a²，得到8a＝12，因此a＝3/2，符合0＜a＜4。故D的坐标是(5，3/2)。'
 ],['折叠会得到AE＝AC、DE＝DC。','先用Rt△AOE算OE，再算BE。','设D(5，a)，在Rt△DBE中列方程。'])],draw(n=0){return drawing(this.title,{O:[0,0],A:[0,4],B:[5,0],C:[5,4],D:[5,1.5],E:[3,0],F:[8,0]},n,(s,{edges,dots})=>{s.line([-.5,0],[8.8,0]);s.line([0,-.5],[0,5]);s.label([8.7,0],'x',0,20);s.label([0,4.9],'y',-22,0);if(n>=5)s.polygon(['D','B','E'],'#f8e9e9');edges([['A','C'],['C','B'],['A','E'],['D','E']]);s.line('A','F',orange,true);s.label('C','(5，4)',8,-16);if(n>=1){s.label([2.5,4],'5',0,-12);s.label([0,2],'4',-24,0)}if(n>=3)s.label([4,0],'2',-4,25);if(n>=4){s.label([5,.75],'a',11,4);s.label([5,2.75],'4－a',10,0)}if(n>=5)s.right('D','B','E');dots(['O','A','B','C','D','E','F'],{O:[-23,20],A:[-24,-7],B:[-2,25],C:[-4,-34],D:[-28,1],E:[-5,25],F:[0,25]})},n?'先用折叠找等长，再把直角三角形DBE中的长度写进方程。':'AD是折痕，C折到E；初始图不显示D的坐标答案。',[[-.7,-.7],[9,5.2]])}});
 const isoCircle=make({id:'lh2023-q21-12',title:'等腰三角形与圆：两种方法找等角',origin:'2023年深圳罗湖二模 · 第21题第（1）（2）问',topic:'等腰 · 中垂线 · 圆周角',level:'综合证明',source:luohu,givens:['△ABC内接于⊙O，AB＝AC。连接AO并延长，交BC于D。','第（2）问：过B作BE⊥AC，垂足为E；直线BE再交⊙O于F，并与AD相交于G，连接AF、CF。'],review:['到B、C距离相等的点位于BC的垂直平分线上。','同弧所对的圆周角相等。','一个三角形里有两个角相等，它们所对的两条边就相等。'],parts:[part('proof','第（1）问 · 找中垂线','求证：AD⊥BC。',[
 'AB＝AC，所以A到B、C的距离相等，A在BC的垂直平分线上。',
 'OB＝OC，因为它们都是同一个圆的半径，所以O也在BC的垂直平分线上。',
 'A、O是两个不同的点，直线AO就是BC的垂直平分线；D在直线AO与BC的交点处，故AD⊥BC。'
 ],['A到B、C距离相等。还有谁到B、C的距离相等？','连接圆心与等腰三角形顶点，实际上找到的是底边的中垂线。']),part('compute','第（2）问 · 转换等角','求证：AG＝AF。',[
 '由第（1）问，AD⊥BC；又BE⊥AC。G在AD、BE上，E在AC上，所以∠AGE与∠BCA都是直线BE和BC所夹锐角的余角，故∠AGE＝∠BCA。',
 'A、B、C、F同在圆上，∠AFB与∠ACB同对弦AB，因此∠AFB＝∠ACB。',
 '按图中点序，射线GE与GF同向，射线FB与FG同向，故∠AGF＝∠AGE、∠AFG＝∠AFB。',
 '因此△AGF中，∠AGF＝∠AFG。等角对等边，所以AF＝AG。证明的关键是把三角形AGF中的两个角都转成∠ACB。'
 ],['要证AG＝AF，可以先证△AGF中哪两个角相等？','一个角通过“两条垂线”转到∠ACB；另一个角利用同弧圆周角。'])],draw(n=0,part='proof'){const advanced=part==='compute',p={O:[0,0],A:[0,3],B:CircleFigures.polar(3,220),C:CircleFigures.polar(3,320)};p.D=[0,p.B[1]];const v=[p.C[0]-p.A[0],p.C[1]-p.A[1]],t=((p.B[0]-p.A[0])*v[0]+(p.B[1]-p.A[1])*v[1])/(v[0]**2+v[1]**2);p.E=[p.A[0]+t*v[0],p.A[1]+t*v[1]];p.F=CircleFigures.polar(3,10);p.G=CircleFigures.intersect(p.A,p.D,p.B,p.E);return drawing(this.title,p,n,(s,{edges,dots})=>{if(advanced&&n>=4)s.polygon(['A','G','F'],'#f8e9e9');s.circle('O',3);edges([['A','B'],['A','C'],['B','C'],['A','D']]);if(n>=2&&!advanced)edges([['O','B'],['O','C']],orange,true);if(n>=3||advanced)s.right('A','D','C');if(advanced){edges([['B','F'],['A','F'],['C','F']]);s.right('B','E','A');if(n>=4){s.line('A','F',red,false,4);s.line('A','G',red,false,4)}}dots(['A','B','C','D','O',...(advanced?['E','F','G']:[])],{A:[-9,-17],B:[-26,13],C:[8,18],D:[-8,25],O:[-26,-8],E:[7,20],F:[10,-5],G:[-26,0]})},advanced?'第（2）问配图：E在AC上，B、G、E、F共线；目标是把AG、AF变成等角所对的边。':'第（1）问只看等腰三角形与圆心，先说明AO为什么是BC的垂直平分线。',[[-3.3,-3.3],[3.5,3.4]])}});
 const tangent=make({id:'szmock2025-circle-angle',title:'切线与等弦：证明角的二倍关系',origin:'2025年深圳模拟 · 圆综合题第（1）问',topic:'切线 · 直径 · 等弦 · 圆周角',level:'综合证明',source:'https://zy.21cnjy.com/24782246',version:'公开课件收录 · 原题第（1）问节选',givens:['A、B、C、D在⊙O上，AB为直径；C在不经过A的劣弧BD上。','BF是圆在B处的切线，F在图示上方射线上，CB＝CD；连接AC、AD、BC。'],review:['切线与经过切点的半径垂直，做题时直接使用。','直径所对的圆周角为直角。','同圆中等弦所对的劣弧相等，这些弧所对的圆周角也相等。'],parts:[part('proof','第（1）问 · 角度证明','求证：∠DAB＝2∠CBF。',[
 'AB是直径，所以∠ACB＝90°，在△ABC中得到∠BAC＋∠ABC＝90°。',
 'BF是B处切线，OB⊥BF；A、O、B共线，因此∠ABF＝90°。BC把这个直角分开，故∠ABC＋∠CBF＝90°。',
 '∠BAC和∠CBF都与∠ABC互余，所以∠BAC＝∠CBF。',
 'CB＝CD，两条等弦所对的劣弧相等，故它们在A处所对的圆周角相等：∠BAC＝∠CAD。',
 'AC在∠DAB内部，所以∠DAB＝∠DAC＋∠CAB＝2∠BAC＝2∠CBF。'
 ],['“二倍”通常可以拆成两个相等的角之和。','先证明∠BAC＝∠CBF：它们都与哪个角互余？','再用CB＝CD，把∠DAB拆成两个相等的圆周角。'])],draw(n=0){return drawing(this.title,{O:[0,0],A:[-3,0],B:[3,0],C:CircleFigures.polar(3,50),D:CircleFigures.polar(3,100),F:[3,4]},n,(s,{edges,dots,tick})=>{s.circle('O',3);edges([['A','B'],['A','C'],['A','D'],['B','C'],['C','D']]);s.line([3,-.7],'F');tick('B','C');tick('C','D');if(n>=1)s.right('A','C','B');if(n>=2)s.right('A','B','F');if(n>=4){s.line('A','C',red,false,4);s.arc('O',3,0,50,green);s.arc('O',3,50,100,green)}dots(['O','A','B','C','D','F'],{O:[-8,25],A:[-24,18],B:[12,18],C:[11,-8],D:[-16,-15],F:[10,-4]})},n?'先用两个直角找相等的余角，再用CB＝CD找相等的圆周角。':'保持原题点序；切线性质直接使用，不另设定理证明任务。',[[-3.4,-3.3],[3.9,4.3]])}});
 const sector=make({id:'sz2024-q11',title:'矩形里的扇形：先求角，再求面积',origin:'2024年深圳中考 · 第11题',topic:'矩形 · 等腰直角 · 扇形',level:'综合计算',source:paper24,version:'公开整理版 · 完整填空题，补写理由训练',givens:['矩形ABCD中，BC＝√2·AB，O是BC的中点，AB＝OE＝4。','以O为圆心的扇形EOF如图放置，E在AB上，F在CD上（OE＝OF）。'],review:['矩形的对边相等，相邻边垂直。','两条直角边相等的直角三角形，两个锐角均为45°。','扇形面积S＝(圆心角/360°)·πr²。'],parts:[part('proof','完整原题 · 补写过程','求扇形EOF的面积，并写出圆心角的求法。',[
 'AB＝4，BC＝√2·AB＝4√2。O是BC中点，所以OB＝OC＝2√2。',
 'E在AB上，AB⊥BC，故△OBE是直角三角形，OE＝4是斜边。BE²＝OE²－OB²＝16－8＝8，所以BE＝2√2＝OB。',
 '因此△OBE是等腰直角三角形，∠BOE＝45°。同理，在Rt△OCF中，OF＝4、OC＝2√2，可得∠COF＝45°。',
 'B、O、C在同一直线上，∠BOC＝180°；射线OE、OF在其上方，所以∠EOF＝180°－45°－45°＝90°。',
 '扇形半径为4，故S＝(90°/360°)×π×4²＝4π。先求圆心角，再代面积公式，不能直接把矩形面积当作扇形面积。'
 ],['先求OB和OC。','OE与OB已知，可用勾股定理判断△OBE的形状。','圆心角位于平角BOC中间，要减去两侧的45°。'])],draw(n=0){const w=4*Math.SQRT2,h=2*Math.SQRT2;return drawing(this.title,{A:[-h,4],B:[-h,0],C:[h,0],D:[h,4],O:[0,0],E:[-h,h],F:[h,h]},n,(s,{edges,dots,mid})=>{if(n>=4){const a=s.xy([0,0]),b=s.xy([-h,h]);s.raw(`<path d="M${a} L${b} A${4*s.scale} ${4*s.scale} 0 0 1 ${s.xy([h,h])}Z" fill="#f8e9e9"/>`)}edges([['A','B'],['B','C'],['C','D'],['D','A'],['O','E'],['O','F']]);s.arc('O',4,45,135);s.label(mid('A','B'),'4',-25,0);s.label(mid('O','E'),'4',-16,-7);if(n>=1){s.label(mid('B','O'),'2√2',-22,27);s.label(mid('O','C'),'2√2',-22,27)}if(n>=4)s.label([0,1.1],'90°',-18,0);dots(['A','B','C','D','O','E','F'],{A:[-12,-12],B:[-20,22],C:[6,22],D:[7,-12],O:[-7,25],E:[-25,0],F:[10,0]})},n?'先在两侧直角三角形中求45°，再从180°中减去它们。':'扇形弧EF位于矩形内；初始图不直接标出圆心角答案。',[[-w/2-.6,-.8],[w/2+.6,4.6]])}});
 const q18=window.CircleExam;q18.origin='2024年深圳中考 · 第18题';q18.topic='等腰 · 中垂线 · 矩形 · 圆';q18.level='综合证明与计算';q18.version='公开回忆版 · 完整保留两问';
 const rhombus=make({id:'sz2025-q18-12',title:'直角三角形、菱形与切线的综合',origin:'2025年深圳中考 · 第18题第（1）（2）问',topic:'斜边中线 · 菱形 · 圆 · 30°',level:'综合证明与计算',version:'公开回忆版 · 节选第（1）（2）问',source:'https://zy.21cnjy.com/23344735',solutionSource:'https://zy.21cnjy.com/25364707',givens:['Rt△ABC中，∠ACB＝90°，D为斜边AB的中点，AE＝CD、AD＝EC；E按图示在AC的另一侧。','第（2）问：O在线段AC上，E、A、D都在⊙O上，连接OD，CD在D处与⊙O相切。','求半径时另有条件AC＝4。'],review:['直角三角形的斜边中线等于斜边的一半。','两组对边分别相等的四边形是平行四边形；邻边相等的平行四边形是菱形。','半径相等可找等腰三角形；切线与切点半径垂直。','直角三角形中，30°角所对直角边等于斜边的一半。'],parts:[part('proof','第（1）问 · 菱形判定','求证：四边形ADCE是菱形。',[
 'AD＝EC、AE＝CD是四边形ADCE的两组对边分别相等，所以ADCE是平行四边形。注意按A—D—C—E的顺序认边。',
 '△ABC在C处为直角，D是斜边AB的中点，所以CD＝AB/2；同时AD＝AB/2，得到CD＝AD。',
 '平行四边形ADCE的两条邻边AD、DC相等，因此它是菱形。'
 ],['先判定平行四边形，再补一组邻边相等。','D是直角三角形斜边中点，CD和AD有什么关系？']),part('compute','第（2）问 · 求角与半径','①求∠ACD；②若AC＝4，求⊙O的半径r。',[
 '由第（1）问，AD＝DC，所以△ADC为等腰三角形。设∠ACD＝x，则∠DAC＝x。',
 'OA＝OD是半径，所以△AOD为等腰三角形。A、O、C共线且O在A、C之间，因此∠OAD＝∠ODA＝x。',
 '∠COD是△AOD在O处的外角，故∠COD＝∠OAD＋∠ODA＝2x。',
 'CD是D处切线，所以CD⊥OD。Rt△CDO中，∠OCD＋∠COD＝90°，也就是x＋2x＝90°。因此x＝30°，∠ACD＝30°。',
 '设半径为r，则OA＝OD＝r，OC＝AC－AO＝4－r。Rt△CDO中，D处是直角，C处为30°，所以OD＝OC/2。',
 '代入得r＝(4－r)/2，即2r＝4－r，3r＝4，r＝4/3。这个值为正且小于AC，符合O在线段AC上的条件。'
 ],['先证菱形，后面就有AD＝DC。','把∠ACD设为x，利用两个等腰三角形，尝试表示∠COD。','切线给出直角；得到30°后，找其对边OD与斜边OC。'])],draw(n=0,part='proof'){const second=part==='compute',q=4/Math.sqrt(3);return drawing(this.title,{A:[4,0],B:[0,q],C:[0,0],D:[2,q/2],E:[2,-q/2],O:[8/3,0]},n,(s,{edges,dots})=>{if(n>=3&&!second)s.polygon(['A','D','C','E'],'#edf7e7');edges([['A','B'],['B','C'],['C','A'],['C','D'],['C','E'],['E','A']]);s.right('A','C','B');if(second){s.circle('O',4/3);s.line('O','D',orange,true);if(n>=4)s.right('C','D','O');if(n>=5){s.line('C','O',red,false,4);s.line('O','D',red,false,4);s.label([1.3,0],'4－r',-14,25);s.label([2.33,q/4],'r',10,-4)}s.label([2,-.15],'AC＝4',-25,48)}dots(['A','B','C','D','E',...(second?['O']:[])],{A:[10,17],B:[-23,-7],C:[-23,19],D:[-9,-17],E:[-5,26],O:[-5,-14]})},second?'第（2）问增加圆与切线条件；利用等腰三角形和直角列出x＋2x＝90°。':'第（1）问先证明菱形，不使用第（2）问才给出的圆与切线条件。',[[-.6,-1.8],[4.7,2.8]])}});
 const inverse=make({id:'sz2024-q12',title:'菱形与反比例函数：先定坐标再求k',origin:'2024年深圳中考 · 第12题',topic:'菱形 · 正切 · 勾股 · 反比例函数',level:'选做挑战',source:paper24,version:'公开整理版 · 完整填空题，补写推理过程',givens:['第一象限中，AOCB为菱形，O为原点，C在x轴正半轴上。','tan∠AOC＝4/3，点A在y＝3/x上，点B在y＝k/x上（k≠0）。'],review:['菱形四边相等，对边平行。','正切＝对边/邻边；第一象限内横、纵坐标都为正。','点在y＝k/x的图象上，等价于它的横坐标×纵坐标＝k。'],parts:[part('proof','完整原题 · 补写过程','求k的值。',[
 '从A向x轴作垂线，垂足H。tan∠AOC＝AH/OH＝4/3，设OH＝3t、AH＝4t（t＞0），则A(3t，4t)。',
 'A在y＝3/x上，所以(3t)(4t)＝3，12t²＝3，t＝1/2（舍去负根）。得到A(3/2，2)。',
 'Rt△OHA中，OA＝√[(3/2)²＋2²]＝√(9/4＋16/4)＝5/2。',
 '菱形中AB＝OA＝5/2，AB∥OC，所以AB是水平线段，B在A右侧。B的纵坐标为2，横坐标为3/2＋5/2＝4。',
 'B(4，2)在y＝k/x上，所以k＝4×2＝8。别把OA＝OC误当成A与C的横坐标相等。'
 ],['先由正切4/3把A坐标设成(3t，4t)。','代入A所在的反比例函数，求出t。','用菱形的水平边AB，把A的坐标平移到B。'])],draw(n=0){return drawing(this.title,{O:[0,0],A:[1.5,2],C:[2.5,0],B:[4,2],H:[1.5,0]},n,(s,{edges,dots})=>{s.line([-.3,0],[5.1,0]);s.line([0,-.3],[0,3.9]);s.label([5,0],'x',0,23);s.label([0,3.8],'y',-22,0);edges([['A','O'],['O','C'],['C','B'],['B','A']]);function curve(k,x1,x2,color){const a=[];for(let x=x1;x<=x2;x+=.035){const y=k/x;if(y<=3.8)a.push(s.xy([x,y]))}if(a.length)s.raw(`<polyline points="${a.map(x=>x.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="1.7"/>`)}curve(3,.8,5,'#93a6b5');curve(8,2.1,5,'#a8b5c1');s.label([3.2,.75],'y＝3/x',0,18);s.label([3.9,3.5],'y＝k/x',-20,-5);if(n>=1){s.line('A','H',orange,true);s.right('O','H','A')}if(n>=2)s.label('A','(3/2，2)',-62,-20);if(n>=4){s.line('A','B',red,false,4);s.label('B','(4，2)',-10,-20)}dots(['O','A','B','C',...(n>=1?['H']:[])],{O:[-24,21],A:[-23,2],B:[10,3],C:[-3,24],H:[-8,24]})},n?'先求A坐标与OA长度，再用菱形对边的位置确定B。':'函数曲线仅作定位，计算依据题设；初始图不显示A、B的坐标答案。',[[-.5,-.7],[5.5,4.2]])}});
 const ratio=make({id:'sz2024-q13',title:'等腰与垂线：添加辅助线求线段比',origin:'2024年深圳中考 · 第13题',topic:'等腰 · 正切 · 勾股 · 相似',level:'选做挑战',source:paper24,version:'公开整理版 · 完整填空题，补写辅助线与理由',givens:['△ABC中，AB＝BC，tan∠ABC＝5/12。','D在BC上，BD/CD＝8/5；过D作DE⊥AD，与AC的延长线相交于E（A、C、E依次排列）。'],review:['比值题可以设共同单位，把所有长度按同一比例表示。','AA：两角分别相等的三角形相似。','平行线截三角形可得到相似；先写对应顶点，再写比例。'],parts:[part('proof','完整原题 · 添加辅助线','求CE/AC，并说明辅助线的作用。',[
 '作AH⊥BC于H。设AH＝5t、BH＝12t（t＞0），由勾股得AB＝13t；AB＝BC，所以BC＝13t。BD:CD＝8:5，得到BD＝8t、CD＝5t，DH＝12t－8t＝4t。',
 '在Rt△ADH中，AD＝√[(4t)²＋(5t)²]＝√41·t。再从C向AD作垂线，垂足P。P在线段AD上，这条辅助线的作用是让CP∥DE。',
 '比较△DPC和△DHA：∠DPC＝∠DHA＝90°；DP与DA同向、DC与DH同向，所以∠PDC＝∠HDA。因此△DPC∽△DHA，D↔D、P↔H、C↔A。',
 '由对应边比例DP/DH＝DC/DA，得DP＝(4t×5t)/(√41·t)＝20t/√41。于是AP＝AD－DP＝√41·t－20t/√41＝21t/√41。',
 'CP⊥AD、DE⊥AD，所以CP∥DE；又A、P、D共线，A、C、E共线，得到△APC∽△ADE。',
 '对应边成比例：AC/AE＝AP/AD＝(21t/√41)/(√41·t)＝21/41。因此AE/AC＝41/21。',
 'E在AC延长线上，CE＝AE－AC，所以CE/AC＝AE/AC－1＝41/21－1＝20/21。别把AE/AC当作最终所求。'
 ],['先作AH⊥BC，将正切5/12变成边长5t、12t，再用AB＝BC。','第二条辅助线：作CP⊥AD。它与DE平行，可构造一对以A为公共顶点的相似三角形。','先求AP/AD，再得到AC/AE；最后别忘记CE＝AE－AC。'])],draw(n=0){return drawing(this.title,{B:[0,0],C:[13,0],A:[12,5],D:[8,0],E:[293/21,-100/21],H:[12,0],P:[408/41,100/41]},n,(s,{edges,dots,mid})=>{if(n>=5){s.polygon(['A','D','E'],'#edf7e7');s.polygon(['A','P','C'],'#f8e9e9')}edges([['A','B'],['B','C'],['A','E'],['A','D'],['D','E']]);s.right('A','D','E');if(n>=1){s.line('A','H',orange,true);s.right('A','H','B');s.label(mid('A','H'),'5t',10,0);s.label(mid('D','H'),'4t',-5,26)}if(n>=2){s.line('C','P',orange,true);s.right('D','P','C')}if(n>=5)s.line('C','P',red,false,4);dots(['A','B','C','D','E',...(n>=1?['H']:[]),...(n>=2?['P']:[])],{A:[-5,-16],B:[-24,15],C:[10,-5],D:[-14,-13],E:[8,20],H:[-8,27],P:[-29,-5]})},n?'橙色虚线AH用于把正切变成长度，CP用于构造与△ADE相似的小三角形。':'保持原题A—C—E的点序；辅助线AH、CP随解析出现，学生不用自行画图。',[[-.8,-5.3],[15,5.8]])}});
 return[rect,fold,coordinate,isoCircle,tangent,sector,q18,rhombus,inverse,ratio];
})();
