(() => {
  const trace = (d, tone = "blue", seconds = 1.25) =>
    `<path class="motion-trace ${tone}" d="${d}" pathLength="1" stroke-dasharray="1 1"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="${seconds}s" fill="freeze"/></path>`;
  const region = (d, tone = "amber") =>
    `<path class="motion-region ${tone}" d="${d}"><animate attributeName="opacity" from="0" to="1" dur=".85s" fill="freeze"/></path>`;
  const tag = (x,y,value) => `<text class="motion-tag" x="${x}" y="${y}">${value}</text>`;
  const dot = d => `<circle class="motion-dot" r="5"><animateMotion path="${d}" dur="1.55s" fill="freeze"/></circle>`;
  const frame = (caption,values,marks) => ({caption,values,marks});
  const semicircle = (x,y,w,up=true) => `M${x} ${y}a${w/2} ${w/2} 0 0 ${up ? 1 : 0} ${w} 0`;
  const circle = (x,y,r) => `M${x-r} ${y}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0Z`;
  const starArcs = "M210 30A60 60 0 0 0 270 90A60 60 0 0 0 210 150A60 60 0 0 0 150 90A60 60 0 0 0 210 30Z";
  const leaf = "M150 145A72 72 0 0 1 222 73V117.5A108 108 0 0 1 150 145Z";
  const leafExtra = "M222 37H258A108 108 0 0 1 222 117.5Z";
  const halfFill = "M110 130A100 100 0 0 1 310 130Z";
  const quarterA = "M150 37H258A108 108 0 0 1 150 145Z";
  const quarterC = "M222 145H150A72 72 0 0 1 222 73Z";
  const dogCorners = [[164,139],[164,103],[200,103],[200,139]];
  const dogRadii = [16,11,6,1];
  const dogDurations = [2.9,2.5,2.15,1.7];
  const dogCaptions = [
    "小狗从 A 点起跑。绳子绕着拴绳点转，整条绳子都能转动。",
    "绳子贴住第一面墙。看小狗怎样以左上角为圆心继续跑。",
    "绳子再贴住上面一面墙。能转动的那一段从右上角拉到小狗。",
    "绳子已经贴住三面墙。小狗只用最后 1 dm 绕过右下角，跑到底边就停。"
  ];
  function dogQuarter(index) {
    const [x,y] = dogCorners[index];
    const radius = dogRadii[index] * 7.2;
    const startAngle = Math.PI + index * Math.PI / 2;
    const points = Array.from({length:25}, (_, i) => {
      const angle = startAngle + (i / 24) * Math.PI / 2;
      return [(x + radius * Math.cos(angle)).toFixed(2), (y + radius * Math.sin(angle)).toFixed(2)];
    });
    return {points, arc:`M${points[0].join(" ")} A${radius} ${radius} 0 0 1 ${points.at(-1).join(" ")}`};
  }

  function runningDog(seconds, index) {
    const leg = (x,y,swing) => `<g transform="translate(${x} ${y})"><path d="M0 0l1.2 5h3" class="dog-leg"/>
      <animateTransform attributeName="transform" additive="sum" type="rotate" values="${swing};${-swing};${swing}" dur="${seconds/6}s" repeatCount="6"/></g>`;
    return `<g transform="scale(${index < 2 ? 1 : -1} 1)">
      <g transform="scale(${index === 3 ? .73 : 1})">
        <path d="M-9-1Q-17-2-16-8" class="dog-leg"/>
        ${leg(-7,2,-23)}${leg(3,2,22)}
        <ellipse cx="-4" cy="-1" rx="8.5" ry="5.6" class="dog-coat"/>
        <path d="M0-4Q1-11 7-11Q12-11 13-7L17-6V-3Q14 0 7 0H3Z" class="dog-coat"/>
        <path d="M5-9Q0-10 1-5Q2-1 5-4Z" class="dog-ear"/>
        <path d="M2-3L3 2" class="dog-collar"/>
        <circle cx="9.5" cy="-7.3" r="1" class="dog-ear"/>
        <circle cx="16" cy="-5.3" r="1.2" class="dog-ear"/>
      </g>
    </g>`;
  }

  function dogFrame(index) {
    const [x,y] = dogCorners[index];
    const [startX,startY] = dogCorners[0];
    const {points,arc} = dogQuarter(index);
    const [initialX,initialY] = points[0];
    const seconds = dogDurations[index];
    const distance = dogRadii[index];
    const wall = dogCorners.slice(0,index+1).map(point => point.join(",")).join(" ");
    const moving = (attribute,axis) =>
      `<animate attributeName="${attribute}" values="${points.map(point=>point[axis]).join(";")}" dur="${seconds}s" fill="freeze"/>`;
    const earlierArcs = dogCorners.slice(0,index).map((_,i)=>`<path class="dog-track" d="${dogQuarter(i).arc}"/>`).join("");
    const total = index === 3 ? "，四段合计 53.38 dm" : "";
    const values = index === 0 ? "还可转动 16 dm" : `16－${index}×5＝${distance} dm${total}`;
    const marks = `<g class="dog-motion">
      <rect class="dog-house" x="164" y="103" width="36" height="36" rx="2"/>
      <text class="dog-house-name" x="182" y="127">屋</text>
      ${earlierArcs}${trace(arc,"blue",seconds)}
      <polyline class="dog-rope-wall" points="${wall}"/>
      <line class="dog-rope-free" x1="${x}" y1="${y}" x2="${initialX}" y2="${initialY}">${moving("x2",0)}${moving("y2",1)}</line>
      <circle class="dog-anchor" cx="${startX}" cy="${startY}" r="2.5"/>
      <circle class="dog-pivot" cx="${x}" cy="${y}" r="4"/>
      <g transform="translate(${initialX} ${initialY})">
        <animateTransform attributeName="transform" type="translate" values="${points.map(point=>point.join(" ")).join(";")}" dur="${seconds}s" fill="freeze"/>
        ${runningDog(seconds,index)}
      </g>
      <text class="dog-legend" x="325" y="68">绳长始终 16 dm</text>
      <path class="dog-rope-wall" d="M263 89h14"/>
      <text class="dog-legend wall" x="329" y="94">贴墙 ${index*5} dm</text>
      <path class="dog-rope-free" d="M263 115h14"/>
      <text class="dog-legend free" x="329" y="120">转动 ${distance} dm</text>
    </g>`;
    return {...frame(dogCaptions[index],values,marks),duration:seconds};
  }
  const cutFrames = mode => [
    frame("把上下两块的弯边分别描出来。两条弯边可以拼回一个整圆。",mode ? "原来的圆周长＝两条弯边之和" : "r＝5 cm，两条弯边合计 31.4 cm",
      trace(semicircle(58,111,130))+trace(semicircle(232,77,130,false))),
    frame("剪开的地方变成两条边。每一块半圆都有自己的一条直径。",mode ? "多出 8 cm＝2 条直径，每条 4 cm" : "每条直径 10 cm，一共新增 20 cm",
      trace("M58 111H188M232 77H362","green")+tag(123,153,mode?"4 cm":"10 cm")+tag(297,54,mode?"4 cm":"10 cm")),
    frame(mode?"只看左边这一块，周长沿边走，面积在里面涂。":"两条弯边加两条直径，才是两块半圆的周长和。",mode?"周长 10.28 cm，面积 6.28 cm²":"31.4＋10＋10＝51.4 cm",
      trace(mode?"M58 111a65 65 0 0 1 130 0Z":"M58 111a65 65 0 0 1 130 0ZM232 77a65 65 0 0 0 130 0Z")+ (mode?region("M58 111a65 65 0 0 1 130 0Z"):""))
  ];
  const box = (x,y,w,h) => `M${x} ${y}h${w}v${h}h-${w}Z`;
  const leftSquare = box(77,35,110,110);
  const diamond = "M289 35L344 90L289 145L234 90Z";
  const twoSquares = (leftValue,rightValue,last) => [
    frame("先看左图。圆的直径正好横跨整个正方形。",leftValue,trace("M77 90H187M77 35H187")+tag(132,24,"边长＝直径")),
    frame("再看右图。两条垂直直径把里面的方形分成四个直角三角形。",rightValue,
      region("M289 90V35L344 90Z")+trace("M234 90H344M289 35V145")+tag(321,77,"底和高都是 r")),
    last
  ];
  const bundling = (x,y,w,h) => ({
    straight: `M${x} ${y-17}h${w}M${x+w+17} ${y}v${h}M${x+w} ${y+h+17}h-${w}M${x-17} ${y+h}v-${h}`,
    curved: `M${x+w} ${y-17}a17 17 0 0 1 17 17M${x+w+17} ${y+h}a17 17 0 0 1 -17 17M${x} ${y+h+17}a17 17 0 0 1 -17 -17M${x-17} ${y}a17 17 0 0 1 17 -17`
  });
  const steel = bundling(192,65,34,34);
  const bottlesA = bundling(76,67,34,34);
  const bottlesB = bundling(218,85,102,0);
  const starCorners = "M150 30H210A60 60 0 0 1 150 90ZM270 30V90A60 60 0 0 1 210 30ZM270 150H210A60 60 0 0 1 270 90ZM150 150V90A60 60 0 0 1 210 150Z";
  function flipTriangle() {
    const arcs = ["M50 135a64 64 0 0 1 96 -55.43","M146 79.57a64 64 0 0 1 96 55.43","","M242 135a64 64 0 0 1 96 -55.43"];
    const points = [[50,135],[146,79.57],[242,135],[242,135]];
    const captions = [
      "第一次绕右下角翻。B 从左下角抬起，沿弧走到三角形上方。",
      "第二次换下一个着地点。B 从上方沿弧落到地面。",
      "第三次绕 B 自己翻。三角形在转，蓝色的 B 点一直留在原地。",
      "第四次再换一个着地点。B 从地上抬起，画出第三条弧。"
    ];
    const stages = arcs.map((arc,index)=>{
      const start = 50+64*index;
      const pivot = start+64;
      const [bx,by] = points[index];
      const piece = `<g>
        ${region(`M${start} 135l32 -55.43 32 55.43Z`)}${trace(`M${pivot} 135L${bx} ${by}`,"green",.35)}
        <circle class="motion-dot" cx="${bx}" cy="${by}" r="5"/>
        <animateTransform attributeName="transform" type="rotate" from="0 ${pivot} 135" to="120 ${pivot} 135" dur="1.9s" fill="freeze"/>
      </g>`;
      return {...frame(captions[index],arc ? "绕着地点转 120°，B 到圆心的距离为 10 cm。" : "B 就是圆心，这一次 B 走了 0 cm。",
        trace("M40 135H382")+arcs.slice(0,index).filter(Boolean).map(d=>trace(d,"blue",.3)).join("")+
        (arc ? trace(arc,"blue",1.9) : "")+piece+
        `<circle class="motion-dot" cx="${pivot}" cy="135" r="3"/>`+tag(pivot,155,index===2?"圆心就是 B":"这次的圆心")),hideBase:true,duration:1.9};
    });
    stages.push({...frame("把 B 走过的三段弧放到同一个圆上，每段转过 120°。","120°＋120°＋120°＝360°，路程 2×3.14×10＝62.8 cm。",
      [0,1,2].map(i=>{
        const p = a=>[210+58*Math.cos(a),90+58*Math.sin(a)].join(" ");
        return trace(`M${p(i*2*Math.PI/3)}A58 58 0 0 1 ${p((i+1)*2*Math.PI/3)}`,i===1?"green":"blue");
      }).join("")+trace("M210 90H268","green")+tag(246,81,"10 cm")),hideBase:true});
    return stages;
  }

  const figures = {
    "p7-choice2":[
      frame("沿大半圆从 A 走到 B。它的直径是整条 AB。","大弧长＝π×AB÷2",trace(semicircle(80,142,260))+tag(210,162,"AB")),
      frame("再沿三段小弧从 A 走到 B。三个小直径首尾接在一起。","三个小直径的和＝AB",trace(semicircle(80,142,260*2/9),"green")+trace(semicircle(80+260*2/9,142,260*3/9),"green")+trace(semicircle(80+260*5/9,142,260*4/9),"green")+trace("M80 142H340","green")),
      frame("两条路线一样长。两人同时出发、同时到达，所以速度一样。","大弧长＝三条小弧长之和",trace(semicircle(80,142,260))+trace("M80 142H340","green"))],
    "p5-fill6":[
      frame("从圆心量到圆边是半径；两段半径拼成直径。","2 cm＋2 cm＝4 cm",trace("M110 130H210M210 130H310","green")+tag(160,153,"2 cm")+tag(260,153,"2 cm")),
      frame("先沿弯边描，再补上底下的一条直边。","弧长 6.28 cm＋直径 4 cm",trace(semicircle(110,130,200))+trace("M110 130H310","green")+tag(210,152,"4 cm")),
      frame("现在涂里面。它占原来整圆的一半。","3.14×2²÷2＝6.28 cm²",region(halfFill)+tag(210,100,"半个圆"))],
    "p5-shade1":[
      frame("从顶边中点开始，沿着中间阴影的四段弧描一圈。","边长 8 dm，每段弧的半径 4 dm",trace(starArcs)+tag(181,22,"4 dm")),
      frame("给四角涂色。每角是一块四分之一圆。","4 个四分之一圆＝1 个整圆",region(starCorners)+tag(105,92,"每角 ¼ 圆")),
      frame("从整张方纸减去四角，剩下中间。","8×8－3.14×4²＝13.76 dm²",region(starArcs))],
    "p5-shade2":[
      frame("先沿两条弯边描，再走完底边。中间接缝在里面。","两段 ¼ 圆弧，底边 3＋3＝6 cm",trace("M102 140A92 92 0 0 1 194 48A92 92 0 0 0 286 140")+trace("M102 140H286","green")+tag(151,162,"6 cm")),
      frame("把左边这块绕接缝的上端转 90°，填进右边空白。","挖掉和补进的面积一样大",`<g>${region("M194 140H102A92 92 0 0 1 194 48Z")}<animateTransform attributeName="transform" type="rotate" from="0 194 48" to="-90 194 48" dur="1.35s" fill="freeze"/></g>`),
      frame("补完是一张边长 3 cm 的方纸。","面积 3×3＝9 cm²，原周长 15.42 cm",region(box(194,48,92,92))+tag(240,104,"3 cm × 3 cm"))],
    "p35-fill6":[
      frame("尺上两个读数之间，就是量角器滚一整周的距离。","37.7－12＝25.7 cm",trace("M50 133H255")+tag(155,154,"25.7 cm")),
      frame("从弯边走到底边。若半径是 x，直径就有 2 个 x。","弧 3.14x ＋ 直边 2x＝25.7",trace(semicircle(50,120,110))+trace("M50 120H160","green")+tag(105,54,"3.14x")+tag(105,110,"2x")),
      frame("弯边有 3.14 个 x，直径有 2 个 x。把这两段在数轴上首尾接起来。","3.14x＋2x＝(3.14＋2)x＝5.14x。",
        trace("M50 150H176")+trace("M176 150H255","green")+tag(112,169,"3.14x")+tag(214,169,"2x")),
      frame("5.14 个 x 一共是 25.7 cm。两边同时除以 5.14，求出一份 x。","5.14x÷5.14＝25.7÷5.14，x＝5 cm。",
        trace("M310 120H365","green")+tag(337,109,"5 cm")),
      frame("最后只涂量角器的一面，它是半个圆。","3.14×5×5÷2＝39.25 cm²。",
        region("M255 120A55 55 0 0 1 365 120Z")+tag(310,105,"r＝5 cm"))],
    "p40-solve2":cutFrames(false),
    "p47-q23":cutFrames(true),
    "p18-explore1":[
      frame("先沿上方的大弧走。","大直径 8 dm，弧长 12.56 dm",trace(semicircle(115,115,180))),
      frame("再沿两条小弧走，一条向上，一条向下。","4＋4＝8 dm，小弧合计 12.56 dm",trace(semicircle(115,115,90),"green")+trace(semicircle(205,115,90,false),"green")),
      frame("把走过的三段相加，正好是一个整圆的周长。","12.56＋12.56＝25.12 dm",trace(semicircle(115,115,180))+trace(semicircle(115,115,90))+trace(semicircle(205,115,90,false)))],
    "p18-explore2":[
      frame("看第一个图。两条小直径拼成大直径。","3＋5＝8 dm",trace("M22 108H132")+tag(77,85,"3＋5＝8")),
      frame("同样比较第二和第三个图。朝下的小弧也有自己的直径。","2＋2＋4＝8，3＋2＋3＝8 dm",trace("M155 108H265M287 108H397")+tag(210,85,"2＋2＋4")+tag(342,85,"3＋2＋3")),
      frame("每组小弧的总长都等于对应的大弧长，所以三个周长一样。","每个图形的周长＝π×8",trace([22,155,287].map(x=>semicircle(x,108,110)).join("")))],
    "p18-explore3":[
      frame("四个 6 m 首尾接起来，得到大半圆的直径。","4×6＝24 m",trace("M90 126H330")+tag(210,170,"24 m")),
      frame("沿两条路线描一遍。两边都是用 24 m 来算半圆弧长。","两条路线各 37.68 m",trace(semicircle(90,126,240))+[0,1,2,3].map(i=>trace(semicircle(90+i*60,126,60,i%2===0),"green")).join("")),
      frame("路一样长。用每分钟走的距离比较，20 比 15 大。","天天 20 m/分，龙龙 15 m/分",dot(semicircle(90,126,240))+tag(210,70,"同样的路程"))],
    "p5-choice7":twoSquares("左图边长 2r，正方形面积 4r²","右图四个小三角形，合计 2r²",
      frame("左图要问圆占外方多少。分子取圆，分母取外方。","πr²÷4r²＝π/4。",
        region(circle(132,90,55))+trace(leftSquare,"green")),
      ).concat(frame("右图要问内方占圆多少。分子取内方，分母取圆。","2r²÷πr²＝2/π。",
        region(diamond,"green")+trace(circle(289,90,55)))),
    "p40-solve5":twoSquares("左图给方的面积 12 dm²，所以 r²＝3","右图给半径 2 dm，每个小三角形面积 2 dm²",
      frame("左图涂圆，右图涂方。分别算出各自的面积。","左圆 9.42 dm²，右方 8 dm²",region(circle(132,90,55))+region(diamond,"green"))),
    "p42-explore3":twoSquares("左图边长 a，方与圆面积比 4∶π","右图圆直径 a，圆与方面积比 π∶2",
      frame("换成直径 10 cm，正方形的两条对角线都等于 10 cm。","10×10÷2＝50 cm²",region(diamond)+trace("M234 90H344M289 35V145")+tag(289,82,"10 cm"))),
    "p53-choice7":twoSquares("左图外方的面积 4r²","右图内方的面积 2r²",
      frame("两边各自做减法，比较留下的部分。","左边 0.86r²，右边 1.14r²",trace(leftSquare)+trace(diamond,"green")+tag(132,151,"0.86r²")+tag(289,151,"1.14r²"))),
    "p8-solve3":[
      frame("沿两个接缝切开，先找出两段一样长的直路。","每段 3 m × 1 m，合计 6 m²",region(box(112,22,53,18))+region(box(236,111,18,53))+tag(139,36,"3 m")+tag(278,144,"3 m")),
      frame("再看弯道。宽 1 m 加在内半径上。","内半径 4 m，外半径 5 m",trace("M165 111H236","green")+trace("M165 111V22")+tag(201,105,"4 m")+tag(151,80,"5 m")),
      frame("给直角弯道涂色。它只占整个圆环的四分之一。","6＋3.14×(5²－4²)÷4＝13.065 m²",region("M165 22A89 89 0 0 1 254 111H236A71 71 0 0 0 165 40Z"))],
    "p16-solve4":[
      frame("先描两处大半圆。两块场地一样大。","两个大半圆的直径都是 10 m",trace(semicircle(27,125,160))+trace(semicircle(233,125,160))+tag(107,138,"10 m")+tag(313,138,"10 m")),
      frame("分别找出被挖走的小半圆。A 挖两块，B 挖一块。","A：2 m、6 m；B：8 m",trace(semicircle(27,125,32),"green")+trace(semicircle(59,125,96),"green")+trace(semicircle(249,125,128),"green")+tag(43,143,"2")+tag(107,143,"6")+tag(313,143,"8")),
      frame("A 挖走的面积更少，剩下的绿地更大。","A 剩 23.55 m²，B 剩 14.13 m²",region("M27 125a80 80 0 0 1 160 0H155a48 48 0 0 0-96 0a16 16 0 0 0-32 0Z"))],
    "p58-solve4":[
      frame("先看鱼池半径，再把小路宽度加上去。","内半径 3 m，外半径 3＋1＝4 m",trace("M210 133V55","green")+trace("M210 55V29")+tag(234,83,"3 m")+tag(233,45,"1 m")),
      frame("给上面弯曲的半圈涂色。","半圆环面积 10.99 m²",region("M106 133a104 104 0 0 1 208 0H288a78 78 0 0 0-156 0Z")),
      frame("底下还有一条长方形，沿外半圆直径铺开。","底边 8 m × 宽 1 m，总面积 18.99 m²",region(box(106,133,208,26))+tag(210,151,"8 m × 1 m"))],
    "p6-solve3":[
      frame("第一圈是绳子原来能够到的边界。","原半径 8 m",trace(circle(195,90,63))+trace("M195 90H258","green")+tag(222,111,"8 m")),
      frame("绳子多 1 m，边界向外扩成另一个同心圆。","新半径 8＋1＝9 m",trace(circle(195,90,71))+trace("M195 90H266","green")+tag(230,111,"9 m")),
      frame("新多出来的草地只有两圈中间这一圈。","3.14×(9²－8²)＝53.38 m²",region(circle(195,90,71)+circle(195,90,63)))],
    "p42-explore4c":dogCorners.map((_,index)=>dogFrame(index)),
    "p8-required2":[
      frame("先涂大扇形。圆心在 A，半径是 AB。","AB＝6 cm，大扇形面积 28.26 cm²",region(quarterA)+trace("M150 37V145")+tag(127,72,"A")),
      frame("再涂小扇形。圆心在 C，半径是 CB。","CB＝4 cm，小扇形面积 12.56 cm²",region(quarterA)+region(quarterC,"green")+trace("M150 145H222","green")),
      frame("圈出长方形里的叶片和长方形外的小块。把两个扇形加起来，再减整个长方形。","28.26＋12.56－6×4＝16.82 cm²",region(leaf)+region(leafExtra)+trace(box(150,37,72,108)))],
    "p19-fill10":[
      frame("先找出两个圆都盖住的那一块，把它当成 1 份。","公共部分＝1 份",`<g clip-path="url(#practice-circle-b)">${region(circle(170,90,48))}</g>`+tag(201,108,"1 份")),
      frame("同一块是 A 的三分之一、B 的七分之一。","A 总共 3 份，B 总共 7 份",trace(circle(170,90,48))+trace(circle(243,90,67),"green")+tag(141,122,"3 份")+tag(270,124,"7 份")),
      frame("两边各扣掉同一个公共部分，再比剩下的。","(3－1)∶(7－1)＝1∶3",tag(149,121,"2 份")+tag(269,121,"6 份"))],
    "p50-q26":[
      frame("先描平行四边形的底与高。底是直径，高是半径。","底 6 cm，高 3 cm",trace("M162 108H282M222 48V108")+tag(223,147,"6 cm")+tag(244,82,"3 cm")),
      frame("左边去掉一块四分之一圆，右边补回同样大的一块。","两个 ¼ 圆面积相等",region("M222 108V48A60 60 0 0 0 162 108Z")+region("M222 108V48A60 60 0 0 1 282 108Z","green")),
      frame("把右边要加的四分之一圆沿竖线翻到左边。两块大小完全相同，因此左边减掉的量与右边加上的量抵消。",
        "－四分之一圆面积＋四分之一圆面积＝0。",
        region("M222 108V48A60 60 0 0 0 162 108Z")+
        `<g transform="translate(222 0)"><g>${region("M0 108V48A60 60 0 0 1 60 108Z","green")}<animateTransform attributeName="transform" type="scale" from="1 1" to="-1 1" dur="1.7s" fill="freeze"/></g></g>`),
      frame("一减一加抵消。现在只需要比较左边多边形和右边小三角形。","13.5－4.5＝9 cm²",trace("M102 48H222V108H162Z")+trace("M222 48L282 108H222Z","green"))],
    "p7-choice7":[
      frame("先涂大半圆。直径是 2 dm，所以半径是 1 dm。","半圆面积 1.57 dm²",region("M130 145A80 80 0 0 1 290 145Z")+tag(210,111,"r＝1 dm")),
      frame("再涂 45° 扇形。它的半径是 2 dm。","扇形面积也是 1.57 dm²",region("M130 145L243.137 31.863A160 160 0 0 1 290 145Z","green")+tag(259,129,"r＝2 dm")),
      frame("把两个图形叠起来。黄色部分既在半圆里，也在 45° 扇形里，两边都要减这同一块。","半圆剩下 1.57－公共面积，扇形也剩下 1.57－公共面积。",
        region("M130 145L210 65A80 80 0 0 1 290 145Z")+trace("M130 145A80 80 0 0 1 290 145Z")+trace("M130 145L243.137 31.863A160 160 0 0 1 290 145Z","green")),
      frame("减完同一块后，只留下左边和右边的两片月牙。","左阴影面积＝右阴影面积。",region("M130 145A80 80 0 0 1 210 65ZM210 65L243.137 31.863A160 160 0 0 1 290 145A80 80 0 0 0 210 65Z"))],
    "p8-challenge":[
      frame("先把圆的半径设为 x。长方形高是 x，上边再伸出 4.28 cm。","宽 x，长 x＋4.28",trace("M175 80V145M175 80H240")+trace("M240 80H358","green")+tag(209,69,"x")+tag(154,121,"x")),
      frame("圆面积等于长方形面积，分别把它们写出来。","3.14×x×x＝(x＋4.28)×x。",
        trace(circle(175,80,65))+trace(box(175,80,183,65),"green")),
      frame("两边都有一个乘上的 x。半径大于 0，两边可以同时除以 x。","3.14x＝x＋4.28。",
        trace("M175 80V145")+trace("M175 145H358","green")+tag(155,113,"x")),
      frame("两边都减去 1 个 x，剩下 2.14 个 x 等于 4.28。再两边都除以 2.14。","2.14x＝4.28，x＝4.28÷2.14＝2 cm。",
        trace("M175 80H240")+trace("M240 80H358","green")+tag(208,69,"2 cm")+tag(299,69,"4.28 cm")),
      frame("把阴影涂出来，再看外面三条直边和一条圆弧。","阴影面积 9.42 cm²，周长 15.7 cm",region("M175 145A65 65 0 0 0 240 80H358V145Z")+trace("M175 145A65 65 0 0 0 240 80H358V145Z"))],
    "p36-challenge":[
      frame("圆心在 AB 中间。用两条半径把半圆分成上下两块。","AB＝20 cm，r＝10 cm",trace("M145 30V150M145 90H205")+tag(169,82,"10 cm")),
      frame("上面多出来的弓形，和下面缺掉的弓形大小相同。","上下两个弓形等面积",region("M145 30A60 60 0 0 1 205 90Z")+region("M145 150A60 60 0 0 0 205 90Z","green")),
      {...frame("沿水平的半径把上方弓形翻下来。它与下方的缺口正好重合。","弓形大小没变，只换了位置。",
        region("M145 150L205 90L265 150ZM145 150A60 60 0 0 0 205 90Z","green")+
        `<g transform="translate(0 90)"><g>${region("M145 -60A60 60 0 0 1 205 0Z")}<animateTransform attributeName="transform" type="scale" from="1 1" to="1 -1" dur="1.7s" fill="freeze"/></g></g>`+trace("M145 90H205")),duration:1.7},
      frame("补完以后，两块阴影合成整个三角形 BDC。","底 20 cm，高 10 cm，面积 20×10÷2＝100 cm²。",
        region("M145 150L205 90L265 150Z")+trace("M205 90V150","green")+tag(206,162,"底 20 cm")+tag(228,123,"10 cm"))],
    "p6-solve4":[
      frame("从钢管端面看，先沿外侧四条直线描。","4×10＝40 cm",trace(steel.straight)+tag(210,126,"4 段，每段 10 cm")),
      frame("再描四角的弧。四段各是四分之一圆。","4 段弧＝1 个圆周＝31.4 cm",trace(steel.curved,"green")),
      frame("把直线和弧连成一圈。两端各捆两圈。","(40＋31.4)×4＝285.6 cm",trace(steel.straight)+trace(steel.curved,"green"))],
    "p39-choice5":[
      frame("先看两种摆法露出来的弧。都能拼成一个整圆。","两种的弧长都是 πd",trace(bottlesA.curved)+trace(bottlesB.curved)),
      frame("再数直线部分。左图四段各 1 个直径，右图上下各 3 个直径。","左 4d，右 6d",trace(bottlesA.straight,"green")+trace(bottlesB.straight,"green")+tag(93,161,"4d")+tag(269,161,"6d")),
      frame("弧长相同，只比直线。左图更省。","6d－4d＝2d",trace(bottlesA.straight)+trace(bottlesA.curved))],
    "p35-fill10":[
      frame("先把正方形分成四个一样大的小方格。","每格边长 2r",trace("M210 26V154M146 90H274")+tag(178,96,"2r")),
      frame("只看其中一格。一个小圆刚好碰到四条边。","小圆 πr²，小方格 4r²",region(circle(178,58,32))+trace(box(146,26,64,64))),
      frame("四格都一样，整张纸的利用率跟一格相同。","π÷4×100%≈78.5%",[178,242].flatMap(x=>[58,122].map(y=>region(circle(x,y,32)))).join(""))],
    "p7-fill5":[
      frame("杆的左端固定。端点离固定点 4 m。","半径 4 m",trace("M130 140H258")+tag(195,129,"4 m")),
      {...frame("整根杆绕左端抬起来。看杆尖怎样画出四分之一圆弧。","半径始终是 4 m，转过 90°。",
        trace("M258 140A128 128 0 0 0 130 12","blue",1.7)+
        `<g><path class="motion-trace green" d="M130 140H258"/><circle class="motion-dot" cx="258" cy="140" r="5"/><animateTransform attributeName="transform" type="rotate" from="0 130 140" to="-90 130 140" dur="1.7s" fill="freeze"/></g>`+
        tag(153,117,"90°")),duration:1.7},
      frame("端点只走整圆周长的四分之一。","2×3.14×4÷4＝6.28 m",trace("M258 140A128 128 0 0 0 130 12")+tag(252,47,"弧长 6.28 m"))],
    "p7-fill9":[
      frame("滚动时先跟着圆心走，从左圆心到右圆心。","5×18.84＝94.2 cm",trace("M97 113H323")+dot("M97 113H323")+tag(210,131,"94.2 cm")),
      frame("在两头各补一段。每段正好是圆心到挡板的距离。","左补 3 cm，右补 3 cm",trace("M65 113H97M323 113H355","green")+tag(82,98,"3 cm")+tag(338,98,"3 cm")),
      frame("把两头补上的长度与圆心路程连起来。","94.2＋3＋3＝100.2 cm",trace("M65 145H355")+tag(210,162,"100.2 cm"))],
    "p7-fill10":flipTriangle(),
    "p8-solve6":[
      frame("圆沿上边扫过宽 2 cm 的带，沿下边也扫过宽 2 cm 的带。","2＋2＝4 cm，中间正好接上",region(box(102,36,216,54))+region(box(102,90,216,54),"green")+tag(210,63,"2 cm")+tag(210,117,"2 cm")),
      frame("放大想象左上角。角上的小方格边长为半径 1 cm，圆只扫到其中四分之一圆。","一角＝1²－3.14×1²÷4",region("M75 36H102A27 27 0 0 0 75 63Z")+tag(115,22,"小方格 1 cm")),
      frame("其余三个角跟左上角一样。把四角剩下的面积加起来。","4－3.14＝0.86 cm²",region("M75 36H102A27 27 0 0 0 75 63ZM345 36H318A27 27 0 0 1 345 63ZM75 144H102A27 27 0 0 1 75 117ZM345 144H318A27 27 0 0 0 345 117Z"))]
  };
  window.circlePracticeAnimations = figures;
})();
