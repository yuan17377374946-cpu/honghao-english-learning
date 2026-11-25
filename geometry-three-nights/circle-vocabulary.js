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
  ['“圆”指一条边界曲线，还是连同内部的整块区域？','圆与圆面','几何定义中的圆指圆周这条曲线；圆面包括这条边界及其内部区域。求圆面积时计算的是圆面面积。','circumference'],
 ["弧CB与弧BD是否相等？这样的两条弧叫什么？", "等弧", "由AB经过圆心且垂直CD，劣弧CD被B平分，所以弧CB与弧BD是等弧。等弧能够重合；比较不同圆中的弧时，只有弧长相等还不能判断为等弧。", "equal-arcs"],
 ["B是劣弧CD的什么点？它与弦CD的中点M有什么区别？", "弧中点与弦中点", "B是劣弧CD的中点，在圆上；M是弦CD的中点，在弦上。弧中点把弧分成两条等弧，弦中点把线段分成两条等线段。A还是优弧CAD的中点。", "arc-midpoint"],
 ["只看圆本身，直线m与点O分别是什么对称要素？", "对称轴与对称中心", "直线m是这个圆的一条对称轴；任何直径所在直线都是对称轴，圆有无数条对称轴。点O是圆的对称中心；圆绕O旋转任意角度都与原圆重合。这里讨论的是圆本身，不是附加全部线段和点后的整幅图。", "axis"],
 ["弧CD的度数与弧CD的长度，是同一个量吗？", "弧度数与弧长", "不是同一个量。弧的度数用度（°）计量，弧长用厘米、米等长度单位计量。相同度数的弧在半径不同的圆中，弧长可以不同；“弧度数”也不要与高中使用的“弧度制”混淆。", "minor"],
 ["圆的周长与圆的面积，分别计算什么对象？", "周长与面积", "周长是整条圆周的长度，等于2πR；面积是圆面所占区域的大小，等于πR²。半径用厘米时，周长用厘米，面积用平方厘米。", "disk"],
 ["图中∠CAD可以直接写成∠A吗？还能怎样规范命名？", "角的规范命名", "∠CAD也可以写成∠DAC，顶点A始终放在中间。本图A处有AC、AO、AD等射线，形成多个角，单写∠A会产生歧义；应写出三个字母，明确指的是哪一个角。", "inscribed"],
 ["“弦CD”与“弧CD”怎样区分书写？优弧为什么常用三个字母？", "弦与弧的规范写法", "线段CD表示直线段，弧CD应在字母上方加弧形符号，或在文字中明确写“弧CD”。本图优弧用弧CAD指明经过A的那一条；三个字母的弧记号中，中间字母位于所指的弧上，并不表示角的顶点。", "minor"]
 ];
 const O=[430,370],R=240,polar=a=>[430+R*Math.cos(a*Math.PI/180),370-R*Math.sin(a*Math.PI/180)];
 const C=polar(125),D=polar(235),pts={O,A:[670,370],B:[190,370],C,D,M:[C[0],370],T:[430,130],H:[430,50],N:[530,260],P:[775,255]};
 const xy=p=>p.map(n=>n.toFixed(2)).join(' '),line=(a,b,cls='')=>`<path class="${cls}" d="M${xy(pts[a])} L${xy(pts[b])}"/>`;
 const minor=`M${xy(C)} A240 240 0 0 0 ${xy(D)}`,major=`M${xy(C)} A240 240 0 1 1 ${xy(D)}`;
 const sector=`M430 370 L${xy(C)} A240 240 0 0 0 ${xy(D)} Z`,segment=`${minor} Z`;
 function svg(index=-1){const k=items[index]?.[3]||'',active=x=>k===x?' active':'',ring=(name)=>`<circle class="spot" cx="${pts[name][0]}" cy="${pts[name][1]}" r="16"/>`;
 const selected=new Set(({center:['O'],radius:['O','A'],diameter:['A','B'],chord:['C','D'],distance:['O','M'],foot:['M'],minor:['C','D'],major:['C','A','D'],semicircle:['A','T','B'],central:['C','O','D'],inscribed:['C','A','D'],arc:['C','D'],sector:['C','O','D'],segment:['C','D'],tangent:['T'],touch:['T'],secant:['A','B'],disjoint:[],'line-distance':['O','H'],'line-positions':['A','B','T'],inside:['N'],on:['A'],outside:['P'],'equal-arcs':['C','B','D'],'arc-midpoint':['B','M'],axis:['O']})[k]||[]),selectedLines=({tangent:['l'],touch:['l'],secant:['m'],disjoint:['n'],'line-distance':['n'],'line-positions':['l','m','n'],axis:['m']})[k]||[];
 const highlights={circumference:'<circle cx="430" cy="370" r="240"/>',axis:'<path d="M70 370 H850"/>','equal-arcs':'<path d="M292.34 173.40 A240 240 0 0 0 190 370"/><path d="M190 370 A240 240 0 0 0 292.34 566.60"/>','arc-midpoint':ring('B')+ring('M')+'<path d="'+minor+'"/>',center:ring('O'),radius:line('O','A'),diameter:line('A','B'),chord:line('C','D'),distance:line('O','M'),foot:ring('M'),minor:`<path d="${minor}"/>`,major:`<path d="${major}"/>`,semicircle:'<path d="M670 370 A240 240 0 0 0 190 370"/>',central:line('O','C')+line('O','D'),inscribed:line('A','C')+line('A','D'),arc:`<path d="${minor}"/>`,sector:`<path class="area" d="${sector}"/>`,segment:`<path class="area" d="${segment}"/>`,tangent:'<path d="M70 130 H850"/>',touch:ring('T'),secant:'<path d="M70 370 H850"/>',disjoint:'<path d="M70 50 H850"/>','line-distance':line('O','H'),'line-positions':'<path d="M70 50 H850 M70 130 H850 M70 370 H850"/>',inside:ring('N'),on:ring('A'),outside:ring('P'),disk:'<circle class="area" cx="430" cy="370" r="240"/>'};
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 810" role="img" aria-label="圆的要素综合识别图：圆O及点A、B、C、D、T、M、H、N、P，直线l、m、n和图示垂直关系"><style>text{font-family:'Microsoft YaHei','Noto Sans CJK SC',sans-serif;fill:#193548}.v-title{font-size:28px;font-weight:700}.v-letter{font-size:27px;font-weight:700;paint-order:stroke;stroke:white;stroke-width:7px;stroke-linejoin:round}.v-note{font-size:21px}.base{stroke:#176fc2;stroke-width:3.2;fill:none;stroke-linecap:round;stroke-linejoin:round}.inner{stroke:#66839b;stroke-width:2.8}.aux{stroke:#b8671b;stroke-dasharray:10 7;stroke-width:3}.right{stroke:#b8671b;stroke-width:3;fill:none}.angle{stroke:#459331;stroke-width:3;fill:none}.highlight{stroke:#c65353;stroke-width:10;stroke-linecap:round;stroke-linejoin:round;fill:none;opacity:1}.highlight .spot{stroke-width:6;fill:#f8e9e9}.highlight .area{fill:#c65353;fill-opacity:.16;stroke-width:5}.dots{fill:#193548;stroke:white;stroke-width:2}.dots .selected-point{fill:#c65353}.v-letter.v-selected{fill:#c65353}.v-small{font-size:20px;fill:#526a79}</style><rect width="920" height="810" rx="20" fill="white"/><text x="460" y="47" text-anchor="middle" class="v-title">圆的要素综合识别图</text><text x="460" y="83" text-anchor="middle" class="v-small">先指图说名称，再用字母写出对象</text><g transform="translate(0,80)"><g class="base"><circle cx="430" cy="370" r="240"/><path d="M70 50 H850 M70 130 H850 M70 370 H850"/>${line('C','D')}${line('O','C','inner')}${line('O','D','inner')}${line('A','C','inner')}${line('A','D','inner')}${line('O','T','inner')}${line('T','H','aux')}${line('O','M','aux')}<path class="right" d="M${C[0]+14} 370 v-14 h-14 M430 144 h14 v-14 M430 64 h14 v-14"/></g><path class="angle" d="M404.19 333.14 A45 45 0 0 0 404.19 406.86 M621.21 344.60 A55 55 0 0 0 621.21 395.40"/><g class="highlight">${highlights[k]||''}</g><g class="dots">${Object.entries(pts).map(([name,p])=>`<circle class="${selected.has(name)?'selected-point':''}" cx="${p[0]}" cy="${p[1]}" r="${selected.has(name)?7:5.5}"/>`).join('')}</g>${Object.entries({O:[442,399],A:[683,401],B:[161,401],C:[C[0]-23,C[1]-17],D:[D[0]-24,D[1]+32],M:[C[0]-10,404],T:[441,114],H:[441,34],N:[543,255],P:[789,251]}).map(([n,p])=>`<text x="${p[0]}" y="${p[1]}" class="v-letter${selected.has(n)?' v-selected':''}">${n}</text>`).join('')}<text class="v-letter${selectedLines.includes('n')?' v-selected':''}" x="870" y="58" font-style="italic">n</text><text class="v-letter${selectedLines.includes('l')?' v-selected':''}" x="870" y="138" font-style="italic">l</text><text class="v-letter${selectedLines.includes('m')?' v-selected':''}" x="867" y="379" font-style="italic">m</text><text x="460" y="665" text-anchor="middle" class="v-note">O是圆心；AB经过O；OM⊥CD；l⊥OT；OH⊥n。</text><text x="460" y="702" text-anchor="middle" class="v-small">大写字母表示点；小写l、m、n表示直线。</text></g></svg>`;
 }
 return {items,svg};
})();
