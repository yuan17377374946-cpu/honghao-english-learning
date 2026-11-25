'use strict';
window.CircleVocabulary=(()=>{
 const items=[
  ['这个圆怎样命名？圆心是哪一点？','圆与圆心','圆记作⊙O，读作“圆O”；点O是圆心。','center'],
  ['线段OA叫什么？还能找到哪些同类线段？','半径','OA是半径；图中OB、OC、OD、OT也是半径。半径的一端是圆心，另一端在圆上。','radius'],
  ['线段AB叫什么？为什么它是特殊的弦？','直径','AB是直径：它的两个端点在圆上，并且经过圆心O。直径也是弦，AB＝2OA。','diameter'],
  ['线段CD叫什么？线段AC、AD是否也是这一类？','弦','CD、AC、AD都是弦：每条线段的两个端点都在圆上。AB也属于弦。','chord'],
  ['圆心O到弦CD的垂线段OM叫什么？','弦心距','OM是弦CD的弦心距，因为OM⊥CD。弦心距是垂线段的长度，不能用OC或OD代替。','distance'],
  ['OM与CD的交点M叫什么？图上哪个标记能作依据？','垂足','M是O到CD所作垂线的垂足；M处的小方角表示OM⊥CD。','foot'],
  ['从C沿圆的左侧短路走到D，这段弧叫什么？怎样记？','劣弧','左侧经过B的短弧是劣弧CD，可以用两个端点记作弧CD；它小于半圆。','minor'],
  ['从C沿经过A的长路走到D，这段弧叫什么？怎样避免歧义？','优弧','经过A的长弧是优弧CAD，大于半圆；通常用三个字母说明取哪一条弧。','major'],
  ['从A沿上方经过T走到B，这段弧叫什么？','半圆','弧ATB是半圆弧，度数为180°，端点A、B是一条直径的两端。下方的另一条AB弧也是半圆。','semicircle'],
  ['∠COD叫什么角？命名中的中间字母表示什么？','圆心角','∠COD是圆心角：顶点O为圆心，两边OC、OD是半径。中间字母O表示角的顶点。','central'],
  ['∠CAD叫什么角？顶点在哪里，两边是什么？','圆周角','∠CAD是圆周角：顶点A在圆上，两边AC、AD分别与圆相交。中间字母A是角的顶点。','inscribed'],
  ['∠COD和∠CAD都对应哪一条弧？','所对的弧','这两个图示角都对应左侧不含A的劣弧CD。这里∠CAD＝∠COD的一半。','arc'],
  ['只由OC、OD和左侧短弧CD围成的区域，叫什么？','扇形','这块区域是扇形COD，边界由两条半径和一条弧组成；弦CD不是这块区域的边界。','sector'],
  ['只由弦CD和左侧短弧CD围成的区域，叫什么？','弓形','这块区域是弓形，边界由一条弦和它所对的一条弧组成；图中是小于半圆的弓形。','segment'],
  ['直线l与圆只有一个公共点，是什么位置关系？它叫什么线？','相切与切线','直线l与圆相切，是圆O的切线。l经过圆上点T，并且l⊥OT；直线与圆只有一个公共点。','tangent'],
  ['直线l与圆的公共点T叫什么？OT与l有什么关系？','切点','T是切点，经过切点的半径OT垂直于切线l。不是圆上的每个点都叫这条切线的切点。','touch'],
  ['直线m与圆交于A、B，是什么位置关系？它与线段AB有何区别？','相交与割线','直线m与圆相交，是割线：与圆有两个公共点。AB是有限长的线段，是直径；m向两侧无限延伸。','secant'],
  ['直线n与圆有几个公共点？这是什么位置关系？','相离','直线n与圆没有公共点，称为直线与圆相离。这时它既不是切线，也不是割线。','disjoint'],
  ['H是O到直线n的垂足，OH表示什么距离？它与半径相比怎样？','圆心到直线的距离','OH是圆心O到直线n的垂直距离，OH＞R。到直线的距离必须沿垂线量取；OH不叫弦心距，因为n没有截出弦。','line-distance'],
  ['把m、l、n放在一起比较，圆心到各直线的距离d、半径R和公共点个数怎样对应？','直线与圆的三种位置关系','m与圆相交：d＜R，有2个公共点；l与圆相切：d＝R，有1个公共点；n与圆相离：d＞R，没有公共点。这里d指圆心到相应直线的垂直距离，不是圆心到直线上任意点的距离。图中m恰过圆心，所以它的d＝0；相交的直线不一定经过圆心。','line-positions'],
  ['点N在圆的什么位置？ON与半径相比怎样？','圆内点','N在圆内，ON小于半径R。圆内点不在圆周上。','inside'],
  ['点A在圆的什么位置？OA与半径相比怎样？','圆上点','A在圆上，OA＝R；B、C、D、T也都是圆上点。','on'],
  ['点P在圆的什么位置？OP与半径相比怎样？','圆外点','P在圆外，OP大于半径R。','outside'],
  ['“圆”指一条边界曲线，还是连同内部的整块区域？','圆与圆面','几何定义中的圆指圆周这条曲线；圆面包括这条边界及其内部区域。求圆面积时计算的是圆面面积。','disk']
 ];
 const O=[430,370],R=240,polar=a=>[430+R*Math.cos(a*Math.PI/180),370-R*Math.sin(a*Math.PI/180)];
 const C=polar(125),D=polar(235),pts={O,A:[670,370],B:[190,370],C,D,M:[C[0],370],T:[430,130],H:[430,50],N:[530,260],P:[775,255]};
 const xy=p=>p.map(n=>n.toFixed(2)).join(' '),line=(a,b,cls='')=>`<path class="${cls}" d="M${xy(pts[a])} L${xy(pts[b])}"/>`;
 const minor=`M${xy(C)} A240 240 0 0 0 ${xy(D)}`,major=`M${xy(C)} A240 240 0 1 1 ${xy(D)}`;
 const sector=`M430 370 L${xy(C)} A240 240 0 0 0 ${xy(D)} Z`,segment=`${minor} Z`;
 function svg(index=-1){const k=items[index]?.[3]||'',active=x=>k===x?' active':'',ring=(name)=>`<circle class="spot" cx="${pts[name][0]}" cy="${pts[name][1]}" r="16"/>`;
 const highlights={center:ring('O'),radius:line('O','A'),diameter:line('A','B'),chord:line('C','D'),distance:line('O','M'),foot:ring('M'),minor:`<path d="${minor}"/>`,major:`<path d="${major}"/>`,semicircle:'<path d="M670 370 A240 240 0 0 0 190 370"/>',central:line('O','C')+line('O','D'),inscribed:line('A','C')+line('A','D'),arc:`<path d="${minor}"/>`,sector:`<path class="area" d="${sector}"/>`,segment:`<path class="area" d="${segment}"/>`,tangent:'<path d="M70 130 H850"/>',touch:ring('T'),secant:'<path d="M70 370 H850"/>',disjoint:'<path d="M70 50 H850"/>','line-distance':line('O','H'),'line-positions':'<path d="M70 50 H850 M70 130 H850 M70 370 H850"/>',inside:ring('N'),on:ring('A'),outside:ring('P'),disk:'<circle class="area" cx="430" cy="370" r="240"/>'};
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 810" role="img" aria-label="圆的要素综合识别图：圆O、直径AB、弦CD、垂线段OM、圆上点T、相交直线m、相切直线l、相离直线n、圆心到n的垂足H，以及点N和P"><style>text{font-family:'Microsoft YaHei','Noto Sans CJK SC',sans-serif;fill:#193548}.v-title{font-size:28px;font-weight:700}.v-letter{font-size:27px;font-weight:700;paint-order:stroke;stroke:white;stroke-width:7px;stroke-linejoin:round}.v-note{font-size:21px}.base{stroke:#176fc2;stroke-width:3.2;fill:none;stroke-linecap:round;stroke-linejoin:round}.inner{stroke:#66839b;stroke-width:2.8}.aux{stroke:#b8671b;stroke-dasharray:10 7;stroke-width:3}.right{stroke:#b8671b;stroke-width:3;fill:none}.angle{stroke:#459331;stroke-width:3;fill:none}.highlight{stroke:#e58d16;stroke-width:9;stroke-linecap:round;stroke-linejoin:round;fill:none;opacity:.85}.highlight .spot{stroke-width:5;fill:#fff0c4}.highlight .area{fill:#f5b84b;fill-opacity:.38;stroke-width:4}.dots{fill:#193548;stroke:white;stroke-width:2}.v-small{font-size:20px;fill:#526a79}</style><rect width="920" height="810" rx="20" fill="white"/><text x="460" y="47" text-anchor="middle" class="v-title">圆的要素综合识别图</text><text x="460" y="83" text-anchor="middle" class="v-small">先指图说名称，再用字母写出对象</text><g transform="translate(0,80)"><g class="base"><circle cx="430" cy="370" r="240"/><path d="M70 50 H850 M70 130 H850 M70 370 H850"/>${line('C','D')}${line('O','C','inner')}${line('O','D','inner')}${line('A','C','inner')}${line('A','D','inner')}${line('O','T','inner')}${line('T','H','aux')}${line('O','M','aux')}<path class="right" d="M${C[0]+14} 370 v-14 h-14 M430 144 h14 v-14 M430 64 h14 v-14"/></g><path class="angle" d="M404.19 333.14 A45 45 0 0 0 404.19 406.86 M621.21 344.60 A55 55 0 0 0 621.21 395.40"/><g class="highlight">${highlights[k]||''}</g><g class="dots">${Object.values(pts).map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="5.5"/>`).join('')}</g>${Object.entries({O:[442,399],A:[683,401],B:[161,401],C:[C[0]-23,C[1]-17],D:[D[0]-24,D[1]+32],M:[C[0]-10,404],T:[441,114],H:[441,34],N:[543,255],P:[789,251]}).map(([n,p])=>`<text x="${p[0]}" y="${p[1]}" class="v-letter">${n}</text>`).join('')}<text class="v-letter" x="870" y="58" font-style="italic">n</text><text class="v-letter" x="870" y="138" font-style="italic">l</text><text class="v-letter" x="867" y="379" font-style="italic">m</text><text x="460" y="665" text-anchor="middle" class="v-note">O是圆心；AB经过O；OM⊥CD；l⊥OT；OH⊥n。</text><text x="460" y="702" text-anchor="middle" class="v-small">A、B、C、D、T在圆上；N在圆内，P在圆外。</text></g></svg>`;
 }
 return {items,svg};
})();
