(() => {
  const ink = (d, tone="blue") => `<path class="bank-ink ${tone}" d="${d}" pathLength="1" stroke-dasharray="1 1"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.25s" fill="freeze"/></path>`;
  const fill = (d, tone="amber", delay=0) => `<path class="bank-paint ${tone}" d="${d}" opacity="0"><animate attributeName="opacity" from="0" to="1" begin="${delay}s" dur=".55s" fill="freeze"/></path>`;
  const tag = (x,y,value,tone="") => `<text class="bank-tag ${tone}" x="${x}" y="${y}" text-anchor="middle">${value}</text>`;
  const node = (x,y) => `<circle class="bank-node" cx="${x}" cy="${y}" r="4"><animate attributeName="r" values="0;6;4" dur=".75s" fill="freeze"/></circle>`;
  const mark = (d, value, x=210, y=232) => ink(d)+tag(x,y,value);
  const block = (d, value, x=210, y=232, tone) => fill(d,tone)+tag(x,y,value);
  const travel = (d, body, seconds=1.75) => `<g>${body}<animateMotion path="${d}" dur="${seconds}s" fill="freeze"/></g>`;
  const turn = (d,x,y,angle) => `<g>${fill(d,"blue")}<animateTransform attributeName="transform" type="rotate" from="0 ${x} ${y}" to="${angle} ${x} ${y}" dur="1.55s" fill="freeze"/></g>`;
  const marker = '<circle class="bank-node" cx="0" cy="0" r="5"/>';
  const from = (caption, values, marks, options={}) => ({caption,values,marks,...options});
  const guided = (row, items) => items.map(([caption,marks],i) => from(caption,row.steps[i],marks));
  const half = arc(90,173,240);
  const halfShape = half+"Z";
  const upper = arc(65,174,290);
  const routeSmall = arc(65,174,290/6)+arc(65+290/6,174,290/3)+arc(210,174,145);
  const moonSmall = arc(65,174,72.5)+arc(137.5,174,217.5);
  const circleRing = disk(210,113,83)+disk(210,113,55);
  const quadrant = pie(126,193,154,270,360);
  const innerSquare = square(126,84,109);
  const outsideSquare = square(127,30,166);
  const centerDiamond = "M210 30L293 113L210 196L127 113Z";
  const leaf = "M130 195A160 160 0 0 1 290 35A160 160 0 0 1 130 195Z";
  const leafA = pie(130,195,160,270,360);
  const leafB = pie(290,35,160,90,180);
  const blue = "blue";
  const dogHead = '<g transform="translate(-3 -7)"><ellipse class="bank-dog" cx="-4" cy="3" rx="8" ry="5"/><path class="bank-dog" d="M0 0Q0-6 6-6Q9-6 10-2L14-1V2L5 4Z"/><path class="bank-dog-leg" d="M-11 3Q-16 2-16-2M-8 7l1 4h3M0 7l2 4h3M3-4l-1 5"/><circle cx="8" cy="-3" r="1" fill="#583a26"/></g>';
  const dogSector = pie(216,120,86,-90,180);
  const dogCorner1 = pie(216,77,43,-180,-90);
  const dogCorner2 = pie(173,120,43,180,270);
  const sheepSector = pie(210,177,124,180,270);
  const sheepCorners = pie(210,115,62,-90,0)+pie(148,177,62,90,180);

  function shapeData(figure, selector, indices) {
    const candidates=[...figure.querySelectorAll(selector)];
    return (indices ? indices.map(i=>candidates[i]).filter(Boolean) : candidates).map(el => {
      if (el.tagName.toLowerCase()==="circle") return disk(+el.getAttribute("cx"),+el.getAttribute("cy"),+el.getAttribute("r"));
      return el.getAttribute("d") || "";
    }).join("");
  }

  function annulus(x,y,r,s,fromAngle,toAngle) {
    const a=point(x,y,r,fromAngle), b=point(x,y,r,toAngle), c=point(x,y,s,toAngle), d=point(x,y,s,fromAngle);
    return `M${a.join(" ")}${curveTo(r,b,toAngle-fromAngle)}L${c.join(" ")}${curveTo(s,d,fromAngle-toAngle)}Z`;
  }

  function radialFrame(x,y,r,s,fromAngle,toAngle,labels) {
    const outer=point(x,y,r,toAngle), inner=point(x,y,s,toAngle);
    const sweep=point(x,y,r,fromAngle);
    return [
      [labels[0], ink(`M${x} ${y}L${outer.join(" ")}`)+ink(`M${inner.join(" ")}L${outer.join(" ")}`,"green")+tag(328,34,labels[1])],
      [labels[2], ink(`M${sweep.join(" ")}${curveTo(r,outer,toAngle-fromAngle)}`)+tag(327,39,labels[3])],
      ["给保留下来的环形部分涂色，再用相应的圆周占比。",block(annulus(x,y,r,s,fromAngle,toAngle),labels[4])]
    ];
  }

  function quarterSquare() {
    const pieces = [
      {x:109,y:43,angle:90,end:90,tone:"blue"},
      {x:49,y:103,angle:270,end:180,tone:"amber"},
      {x:109,y:153,angle:90,end:270,tone:"blue"},
      {x:49,y:213,angle:270,end:360,tone:"amber"}
    ];
    const legTriangle = "M0 0H60L0 60Z";
    const diagonal = "M60 0L0 60";
    const pieceDrawing = tone => `<path class="bank-paint ${tone}" d="${legTriangle}"/><path class="bank-ink green" d="${diagonal}"/>`;
    const startingLabels = tag(79,30,"原正方形 60 cm²")+tag(79,140,"复制一张 60 cm²");
    const cut = pieces.map(({x,y,angle,tone},i) =>
      `<g transform="translate(${x} ${y}) rotate(${angle})">${fill(legTriangle,tone,i*.12)}${ink(diagonal,"green")}</g>`
    ).join("")+startingLabels+tag(94,63,"30")+tag(63,93,"30")+tag(94,173,"30")+tag(63,203,"30")+
      tag(294,111,"两张正方形，各剪两块")+tag(294,143,"一共 4 块");
    const move = ({x,y,angle,end,tone}, begin) => `<g transform="translate(${x} ${y})">
      <animateTransform attributeName="transform" type="translate" from="${x} ${y}" to="303 119" begin="${begin}s" dur="1.05s" fill="freeze"/>
      <g transform="rotate(${angle})">
        <animateTransform attributeName="transform" type="rotate" from="${angle}" to="${end}" begin="${begin}s" dur="1.05s" fill="freeze"/>
        ${pieceDrawing(tone)}
      </g>
    </g>`;
    const place = (piece,x,y,angle) => `<g transform="translate(${x} ${y}) rotate(${angle})">${pieceDrawing(piece.tone)}</g>`;
    const later = (content, seconds) => `<g opacity="0"><animate attributeName="opacity" from="0" to="1" begin="${seconds}s" dur=".23s" fill="freeze"/>${content}</g>`;
    const diamond = "M303 59L363 119L303 179L243 119Z";
    const workbench = startingLabels+path(square(49,43,60),"guide")+path(square(49,153,60),"guide")+path(diamond,"guide")+node(303,119);
    const [first,second,third,fourth] = pieces;
    const placedLeft = place(first,303,119,first.end)+place(second,303,119,second.end);
    const placedAll = placedLeft+place(third,303,119,third.end)+place(fourth,303,119,fourth.end);
    const firstPair = workbench+move(first,.1)+move(second,1.18)+
      place(third,third.x,third.y,third.angle)+place(fourth,fourth.x,fourth.y,fourth.angle)+
      later(ink("M291 119V107H303M291 119V131H303","green")+tag(317,123,"拼图中心")+tag(270,87,"r")+tag(270,157,"r"),2.25);
    const lastPair = workbench+placedLeft+move(third,.1)+move(fourth,1.18)+
      later(ink(diamond,"green")+tag(303,37,"四条绿色斜边都长 r")+tag(338,85,"r")+tag(338,159,"r")+tag(266,159,"r")+tag(266,85,"r"),2.25);
    const areaOfSquare = placedAll+ink(diamond,"green")+tag(303,37,"边长都是 r")+
      tag(320,101,"30")+tag(320,139,"30")+tag(286,139,"30")+tag(286,101,"30")+
      tag(123,100,"4 块，每块 30 cm²")+tag(123,145,"总面积 120 cm²")+tag(303,215,"r × r＝120 cm²");
    const circleCenter=[282,116], demoR=84;
    const fullCircle=disk(...circleCenter,demoR);
    const fullCircleScene = fill(square(44,74,84),"amber")+ink("M44 74H128","green")+tag(86,62,"边长 r")+tag(86,122,"r × r＝120")+
      tag(163,117,"→")+fill(fullCircle,"blue",.35)+ink(fullCircle)+ink("M282 116H366","green")+node(282,116)+
      tag(322,106,"半径 r")+tag(282,228,"整圆 3.14 × 120＝376.8 cm²");
    const quarters = [-90,0,90,180].map((angle,index) =>
      fill(pie(...circleCenter,demoR,angle,angle+90),index===0?"amber":"blue",.3+index*.22)
    ).join("");
    const quarterCircleScene = quarters+ink(fullCircle)+ink("M198 116H366M282 32V200","green")+
      tag(95,101,"整圆 376.8 cm²")+tag(95,140,"平均分 4 份")+
      later(tag(320,82,"94.2")+tag(320,159,"94.2")+tag(243,159,"94.2")+tag(243,82,"94.2"),1.5)+
      tag(282,228,"橙色一份就是题目里的扇形");
    return [
      from("从圆心沿虚线走到弧上的顶点。这条对角线就是半径 r。","小正方形的面积是 60 cm²。",ink("M126 193L235 84")+node(126,193)+node(235,84)+tag(192,128,"r")+tag(108,216,"圆心")),
      from("把原正方形沿对角线剪开，只有两块。再取一个一模一样的正方形，也沿对角线剪开，这才凑齐四块。","每块 60÷2＝30 cm²。每块的斜边都是原正方形的对角线，长 r。",cut,{hideBase:true}),
      from("先移动原正方形剪出的两块。把它们的直角放到同一个点，一块朝上，一块朝下，两条绿色斜边留在外侧。","中间先放进两个 90°，还空着两个直角位置。",firstPair,{hideBase:true,duration:3.6}),
      from("再把另两块放到右侧，直角也朝中间。看四条绿色斜边，它们就是拼出来的正方形的四条边。","每条绿色斜边都来自原方形的对角线，长度都是半径 r。",lastPair,{hideBase:true,duration:3.6}),
      from("给四块三角形各写上 30。拼图的面积一方面是 4×30，另一方面是边长乘边长，也就是 r×r。","同一张拼图的面积：r×r＝4×30＝120 cm²。",areaOfSquare,{hideBase:true}),
      from("回到圆。左边这个方块的一条边，和右边从圆心画出的半径一样长。整圆面积公式需要的正是 r×r，所以把 120 放进公式。","整圆面积＝3.14×r×r＝3.14×120＝376.8 cm²。",fullCircleScene,{hideBase:true}),
      from("用两条互相垂直的直径把整圆切成四个一样大的扇形。原题的扇形就是橙色这一份。","一份的面积＝376.8÷4＝94.2 cm²。",quarterCircleScene,{hideBase:true}),
      from("从扇形里去掉小正方形，只剩正方形上方和右方的两块阴影。","94.2－60＝34.2 cm²",block(quadrant+innerSquare,"阴影 34.2 cm²",212,225)+ink(innerSquare,"green"))
    ];
  }

  function squareBetweenCircles() {
    const x=210, y=113, outerR=83, r=outerR/Math.sqrt(2);
    const left=x-r, right=x+r, top=y-r, bottom=y+r;
    const outer=disk(x,y,outerR), inner=disk(x,y,r);
    const outline=square(left,top,2*r);
    const axis=`M${left} ${y}H${right}M${x} ${top}V${bottom}`;
    const grid=[square(left,top,r),square(x,top,r),square(left,y,r),square(x,y,r)];
    const gridCenters=[[x-r/2,y-r/2],[x+r/2,y-r/2],[x-r/2,y+r/2],[x+r/2,y+r/2]];
    const fourTriangles=[
      `M${left} ${top}H${right}L${x} ${y}Z`,
      `M${right} ${top}V${bottom}L${x} ${y}Z`,
      `M${right} ${bottom}H${left}L${x} ${y}Z`,
      `M${left} ${bottom}V${top}L${x} ${y}Z`
    ];
    const greenRadius=(a,b) => `<path class="bank-ink green" d="M${a} ${y}H${b}"/>`;
    const blueRadius=(a,b) => `<path class="bank-ink" d="M${a} ${y}H${b}"/>`;
    const matchingSide=`<g>
      <animateTransform attributeName="transform" type="translate" from="0 0" to="0 ${-r}" begin=".2s" dur="1.5s" fill="freeze"/>
      ${blueRadius(left,x)}${greenRadius(x,right)}
      ${tag(x-r/2,y-10,"r")}${tag(x+r/2,y-10,"r")}
    </g>`;
    return [
      from("先看外圆。把正方形对角线描出来，它经过圆心，两个端点都在外圆上。","对角线是外圆的直径。从圆心到任意一个角的长度是外圆半径 R。",
        ink(outer,"green")+ink(`M${left} ${bottom}L${right} ${top}`)+node(x,y)+tag(240,90,"R")+tag(210,231,"对角线＝2R")),
      from("两条对角线把正方形分成四个一样大的直角三角形。看上面那块，夹住直角的两条边都长 R。","每个三角形面积是 R×R÷2。四块面积一共是 12 cm²，所以 R×R＝12÷2＝6 cm²。",
        fourTriangles.map((d,i)=>fill(d,i%2?"blue":"amber",i*.24)).join("")+
        ink(`M${left} ${top}L${right} ${bottom}M${left} ${bottom}L${right} ${top}`)+
        tag(188,92,"R")+tag(231,92,"R")+tag(210,223,"4 × (R×R÷2)＝12")),
      from("现在看内圆。从左边的切点画到圆心，再从圆心画到右边的切点。蓝、绿两段各是一条半径。","内圆的直径＝r＋r＝2r。",
        ink(inner,"green")+ink(`M${left} ${y}H${x}`)+ink(`M${x} ${y}H${right}`,"green")+
        node(left,y)+node(x,y)+node(right,y)+tag(x-r/2,y-13,"r")+tag(x+r/2,y-13,"r")+
        tag(210,223,"两条半径拼成一条直径")),
      from("把蓝绿两段一起向上平移。看两个端点，正好分别落在正方形上边的两个角。","这条线只是平移，长度没变。所以正方形的一条边也等于 r＋r。",
        ink(outline)+path(`M${left} ${y}H${right}`,"guide")+matchingSide+
        node(left,top)+node(right,top)+tag(210,223,"正方形的边长＝2r"),{duration:1.9}),
      from("沿中间各画一条横线和竖线，把正方形分成四格。横着每一格宽 r，竖着每一格也高 r。","一小格的面积是 r×r。四小格合在一起，就是题目给的 12 cm²。",
        grid.map((d,i)=>fill(d,i%2?"blue":"amber",.25+i*.18)).join("")+ink(outline)+ink(axis,"green")+
        gridCenters.map(([gx,gy])=>tag(gx,gy+5,"r×r")).join("")+tag(210,47,"r　　＋　　r")+
        tag(left-15,y-r/2+5,"r")+tag(left-15,y+r/2+5,"r")+tag(210,223,"4 个 r×r＝12 cm²")),
      from("把 12 平方厘米平均分给这四格。看涂亮的这一小格，它的长和宽都是 r。","每格 12÷4＝3 cm²，所以 r×r＝3 cm²。",
        fill(grid[0])+ink(outline)+ink(axis)+gridCenters.map(([gx,gy])=>tag(gx,gy+5,"3")).join("")+
        tag(210,223,"12÷4＝3 cm²")),
      from("求圆面积只需要半径乘半径。外圆用 6，内圆用 3，分别乘 3.14。","外圆：3.14×6＝18.84 cm²。内圆：3.14×3＝9.42 cm²。",
        fill(disk(107,113,65),"blue")+ink(disk(107,113,65))+fill(disk(306,113,65/Math.sqrt(2)),"green",.35)+
        ink(disk(306,113,65/Math.sqrt(2)),"green")+tag(107,108,"外圆 R×R＝6")+tag(306,108,"内圆 r×r＝3")+
        tag(107,202,"18.84 cm²")+tag(306,202,"9.42 cm²"),{hideBase:true})
    ];
  }

  function scaleFrames(row,index) {
    const compare = (r1,r2,left,right) => ink(disk(108,112,r1))+ink(disk(300,112,r2),"green")+
      ink(`M108 112h${r1}M300 112h${r2}`,"green")+node(108,112)+node(300,112)+tag(108,222,left)+tag(300,222,right);
    const board = (caption,i,marks) => from(caption,row.steps[i],marks,{hideBase:true});
    if(index===0) return [
      board("左边是原来的圆，右边把半径延长 1 cm。沿圆边比较周长。",0,compare(40,62,"原半径","半径 ＋1 cm")),
      board("现在只让直径加 1 cm。半径只加了 0.5 cm。",1,compare(40,51,"原直径","直径 ＋1 cm"))];
    if(index===2) return [
      board("小圆横跨整个圆的直径，和大圆从中心到边缘的一段半径一样长。",0,
        compare(37,74,"小圆","大圆")+ink("M71 112H145M300 112H374","green")+tag(108,84,"直径 4 cm")+tag(332,86,"半径 4 cm")),
      board("把两条半径放在一起比。小圆半径只有大圆的一半，所以周长也只有一半。",1,compare(37,74,"2 cm","4 cm"))];
    if(index===3) return [
      board("先看直径。半径是原来的 3 倍，整条直径也拉长到 3 倍。",0,compare(24,72,"d","3d")+ink("M84 112H132M228 112H372")),
      board("再看面积。宽和高都按 3 倍放大，所以面积是 3×3。",1,fill(disk(108,112,24))+fill(disk(300,112,72),blue)+tag(108,215,"原面积")+tag(300,215,"面积 ×9")),
      board("最后回到圆边。周长里只乘一次半径。",2,compare(24,72,"周长 C","周长 3C"))];
    if(index===4) return [
      board("把原周长画成一份，放大后是一模一样的三份。",0,fill(square(80,50,46),blue)+[80,126,172].map((x,i)=>fill(square(x,116,46),"amber",i*.18)).join("")+tag(105,37,"原周长")+tag(232,150,"75.36 m")),
      board("把放大后的周长平均分三份，取其中一份。",1,[80,126,172].map(x=>ink(square(x,100,46))).join("")+fill(square(80,100,46),blue)+tag(150,185,"每份 25.12 m"))];
    return [
      board("先看半径。把原半径平均分成四份，拿掉一份。",0,ink("M70 97H350M70 87v20M140 87v20M210 87v20M280 87v20M350 87v20")+ink("M70 97H280","green")+tag(180,140,"剩下 3/4")),
      board("把半径从整段缩到四分之三。面积会按半径倍数的平方变化。",1,fill(disk(210,113,84))+fill(disk(210,113,63),blue)+tag(210,115,"剩下 9/16")),
      board("只涂新圆外面的一圈。那就是减少的面积。",2,fill(disk(210,113,84)+disk(210,113,63))+tag(210,115,"减少 7/16"))];
  }

  const builders = {
    route: row => guided(row,[
      ["先沿直径方向看三段。2、4、6 拼成一整段。",mark("M65 174H355","2＋4＋6＝12 cm",210,229)],
      ["沿上方的大弧从 M 描到 N。",mark(upper,"大半圆弧 18.84 cm",210,229)],
      ["再从 M 沿着三个小弧走到 N。",mark(routeSmall,"三条小弧合计 18.84 cm",210,229)],
      ["两边都是同样的总直径乘 π 再除以 2。",ink(upper)+ink(routeSmall,"green")+tag(210,230,"两条路线一样长")]]),
    moon: row => guided(row,[
      ["先把 2 cm 和 6 cm 拼起来，得到大半圆的直径。",mark("M65 174H355","大直径 8 cm")],
      ["沿阴影边缘走一圈，只经过三条弧。",ink(upper)+ink(moonSmall,"green")+tag(210,230,"外弧 ＋ 两段内弧")],
      ["把三段半圆弧的长度相加。",mark(upper+moonSmall,"25.12 cm")]]),
    "half-6": row => guided(row,[
      ["围墙就是直径。标出圆心，左右各是一半。",ink("M90 173H330")+node(210,173)+tag(152,159,"3 m")+tag(270,159,"3 m")],
      ["要铺水泥的区域就是这半个圆。",block(halfShape,"面积 14.13 m²",210,130)],
      ["把每平方米的用量乘上面积。",block(halfShape,"14.13 × 20＝282.6 kg",210,130)]]),
    "half-cake": row => guided(row,[
      ["沿礼饼完整描一圈。弧边是 3.14r，直边是 2r。",ink(half)+ink("M90 173H330","green")+tag(210,95,"弧边 3.14r")+tag(210,165,"直边 2r")],
      ["周长里一共有 5.14 个 r。用 51.4 除以 5.14。",ink("M90 173H210","green")+node(210,173)+tag(145,156,"r＝10 cm")],
      ["把半个礼饼涂上色。用半径算半圆面积。",block(halfShape,"157 cm²",210,130)]]),
    "half-wall": row => guided(row,[
      ["沿竹篱笆描弧线。下面的直边由墙代替。",ink(half)+tag(210,229,"篱笆弧长 14.13 m")],
      ["弧长等于 3.14 个 r，所以能反推半径。",ink("M90 173H210","green")+node(210,173)+tag(151,149,"r＝4.5 m")],
      ["圈内铺开的整个区域是半圆。",block(halfShape,"31.7925 m²",210,129)]]),
    "half-fence": row => guided(row,[
      ["篱笆沿弯边走一段，再沿直边回到起点。",ink(half)+ink("M90 173H330","green")+tag(210,229,"3.14r＋2r")],
      ["把 20.56 m 平均分成 5.14 个半径长。",ink("M210 173H330","green")+node(210,173)+tag(273,152,"r＝4 m")],
      ["把鸡棚能占的半圆区域涂出来。",block(halfShape,"25.12 m²",210,129)]]),
    rings: row => row.number==="2" ? guided(row,[
      ["从 25.12 cm 的周长反推原半径，再从原半径扣掉 1 cm。",ink("M210 113H293")+ink("M210 113H265","green")+tag(309,105,"4 cm")+tag(245,144,"3 cm")],
      ["先看原来的整圆，再叠上缩小后的圆。",fill(disk(210,113,83))+fill(disk(210,113,55),blue,.3)+tag(210,222,"50.24 cm² → 28.26 cm²")],
      ["两圆之间这一圈就是减少的面积。",block(circleRing,"减少 21.98 cm²")]]) : guided(row,[
      ["把外圆、内圆的半径都放大到两倍。两个面积各扩大四倍。",ink("M210 113H293")+ink("M210 113H265","green")+tag(210,223,"R → 2R　r → 2r")],
      ["大圆和小圆同时乘 4，相减得到的圆环也乘 4。",block(circleRing,"圆环面积 ×4")]]),
    "square-circle-diamond": row => guided(row,[
      ["圆面积除以 3.14，先求半径的平方。",ink("M210 113H293","green")+tag(265,101,"r＝10 cm")],
      ["外方的边长等于圆的直径。",ink(outsideSquare)+ink("M127 113H293","green")+tag(210,222,"20²＝400 cm²")],
      ["沿圆的直径把内方分成两个一样大的三角形。",fill("M127 113L210 30L293 113Z",blue)+fill("M127 113H293L210 196Z","amber",.25)+ink("M127 113H293","green")+tag(210,222,"20×10÷2×2＝200 cm²")]]),
    "circle-square-circle": squareBetweenCircles,
    "square-circle": row => guided(row,[
      ["方形边长是 2r。把方形与圆的面积都写成含 r² 的式子。",ink(outsideSquare)+ink("M127 113H293","green")+tag(210,222,"方形 4r²　圆 3.14r²")],
      ["涂出的四个角一共是 4.3 cm²。先求一个 r²。",block(outsideSquare+disk(210,113,83),"0.86r²＝4.3")],
      ["把 r²＝5 代回两个面积式。",ink(outsideSquare)+ink(disk(210,113,83),"green")+tag(210,222,"方形 20 cm²　圆 15.7 cm²")]]),
    "sector-1a": row => guided(row,radialFrame(154,176,125,75,-90,0,["沿半径找到外弧和内弧。外半径扣掉环宽。","5－2＝3 dm","把整个环补齐再想：题目只取一个直角。","90° ÷ 360°＝1/4","12.56 dm²"])),
    "sector-1b": row => {
      const one=annulus(210,120,92,69,-90,0);
      return guided(row,[
        ["沿一条半径看：外半径 4，扣掉 1，内半径 3。",ink("M210 120H302")+ink("M279 120H302","green")+tag(317,100,"4－1＝3 dm")],
        ["把下面的四分之一环移到上方，拼成半个圆环。",fill(one,blue)+turn(annulus(210,120,92,69,90,180),210,120,90)+tag(210,235,"1/4＋1/4＝1/2　10.99 dm²")]]);
    },
    "sector-2a": row => guided(row,radialFrame(210,118,96,64,90,360,["从外半径 6 cm 扣掉环宽 2 cm。","内半径 4 cm","沿着留下来的外弧绕一圈的大半段。","270°＝3/4 圈","47.1 cm²"])),
    "sector-2b": row => guided(row,radialFrame(272,177,138,92,180,240,["从内弧沿半径再往外量 3 cm。","外半径 9 cm","把 60° 放回整圈里比较。","60°＝1/6 圈","23.55 cm²"])),
    "leaf-10": row => guided(row,[
      ["蓝色和绿色分别是一头牛绳子能扫到的区域。",fill(leafA,blue)+fill(leafB,"green",.3)+tag(210,233,"两条绳子都是 10 m")],
      ["两块合起来盖满正方形。中间颜色叠在一起，就是两头都能到的地方。",ink(square(130,35,160))+fill(leaf)+tag(210,232,"正方形 100 m²")],
      ["把两个四分之一圆的面积相加，再减去整个方形，留下多算一次的叶片。",block(leaf,"157－100＝57 m²")]]),
    dog: row => guided(row,[
      ["小狗先绕 A 跑外面的大半圈加一个直角。屋子挡住剩下的一个直角。",fill(dogSector,blue)+travel("M216 34A86 86 0 1 1 130 120",dogHead)+tag(328,206,"半径 6 m")],
      ["绳子贴上一面 3 m 的墙，能继续转的绳子剩 3 m。",ink("M216 120V77M216 120H173","green")+node(216,77)+node(173,120)+tag(315,201,"6－3＝3 m")],
      ["小狗可以从两个相邻墙角各多绕一个四分之一圆。",fill(dogCorner1)+fill(dogCorner2,"green",.3)+tag(320,208,"增加 14.13 m²")],
      ["把大块和两块小扇形相加。",fill(dogSector,blue)+fill(dogCorner1+dogCorner2)+tag(210,229,"合计 98.91 m²")]]),
    sheep: row => guided(row,[
      ["绳子从 O 出发，只扫到两面墙夹出的直角。",block(sheepSector,"半径 4 m",151,129,blue)],
      ["绕到墙端以后，绳子先贴住 2 m 的墙，剩下的 2 m 还能绕。",ink("M148 177H210V115","green")+node(148,177)+node(210,115)+tag(304,184,"4－2＝2 m")],
      ["左右两个墙端各加一块四分之一圆。",block(sheepCorners,"新增 6.28 m²",308,213)],
      ["大块加上两小块。",fill(sheepSector,blue)+fill(sheepCorners)+tag(307,222,"合计 18.84 m²")]]),
    "quadrant-square": quarterSquare
  };

  const triangle = (r) => `M210 ${113-r}L${210+r} 113L210 ${113+r}Z`;
  const semis = ["M125 196a85 85 0 0 1 170 0Z","M295 26a85 85 0 0 0 0 170Z"];
  const smallLeaf = "M210 36A80 80 0 0 1 290 116A80 80 0 0 1 210 36Z";
  const rollingOutline = "M152 59H266V173H152Z";
  const carpetTrack = "M105 65.1H315A55.9 55.9 0 0 1 315 176.9H105A55.9 55.9 0 0 1 105 65.1Z";
  const halfOld = arc(107,186,180)+"Z";
  const cornerSum = (row,figure,isTriangle) => {
    const parts=[...figure.querySelectorAll('path.shape')].slice(1);
    const n=parts.length;
    const original=parts.map((p,i)=>fill(p.getAttribute("d"),i%2 ? "blue" : "amber",i*.22)).join("");
    const total=isTriangle ? 180 : 360;
    const start=isTriangle ? 180 : -90;
    const outline = isTriangle ? pie(210,132,74,180,360) : disk(210,115,74);
    const angleOf = (d) => {
      const m=d.match(/M([^ ]+) ([^L]+)L([^ ]+) ([^A]+)A[^ ]+ [^ ]+ 0 [01] [01] ([^ ]+) ([^Z]+)/);
      const [cx,cy,x1,y1,x2,y2]=m.slice(1).map(Number);
      const delta=Math.atan2(y2-cy,x2-cx)-Math.atan2(y1-cy,x1-cx);
      return Math.abs(((delta*180/Math.PI+540)%360)-180);
    };
    let angle=start;
    const sameRadius = parts.map((p,i)=>{
      const next=i===n-1 ? start+total : angle+angleOf(p.getAttribute("d"));
      const shape=fill(pie(210,isTriangle?132:115,74,angle,next),i%2?"blue":"amber",i*.25);
      angle=next;
      return shape;
    }).join("");
    return [
      from("依次标出每个角上的扇形。这些扇形的半径一样。",isTriangle ? "3 个角，半径都是 5 cm" : "4 个角，半径都是 8 cm",original),
      from("让扇形用同一个圆心，沿着边一块接一块拼起来。",row.steps[0],sameRadius+ink(outline)+tag(210,225,`圆心角一共 ${total}°`),{hideBase:true}),
      ...row.steps.slice(1).map((step,i)=>from(
        isTriangle ? "三个扇形合成半个圆，直接用半圆面积公式。" : i===0 ? "拼成整圆以后，用半径 8 cm 求整圆面积。" : "回到梯形，用整个梯形的面积减去四个角。",
        step, isTriangle || i===0 ? block(outline,isTriangle?"39.25 cm²":"200.96 cm²") : ink(shapeData(figure,"path.shape",[0]))+original+tag(210,239,"空白 99.04 cm²"),{hideBase:isTriangle||i===0}))
    ];
  };

  const circleGrid = (row,figure) => {
    const basic=row.diagram==="grid-123";
    const counts=basic?[1,2,3]:[2,3,4];
    const all=[...figure.querySelectorAll('circle.shape')];
    const place=(which,value) => {
      const n=counts[which], before=counts.slice(0,which).reduce((total,c)=>total+c*c,0);
      const disks=all.slice(before,before+n*n).map(c=>disk(+c.getAttribute("cx"),+c.getAttribute("cy"),+c.getAttribute("r")));
      const x=38+122*which;
      return ink(square(x,57,101))+disks.map((d,i)=>fill(d,which===1?blue:"amber",(i%n)*.13)).join("")+tag(x+50.5,218,value);
    };
    if(basic) return guided(row,[
      ["先数每边圆的个数。每个圆的直径都是方框边长分出来的一份。",place(0,"1×1")+place(1,"2×2")+place(2,"3×3")],
      ["圆变小了，同时个数增加。两种变化恰好抵消。",place(0,"πa²÷4")+place(1,"πa²÷4")+place(2,"πa²÷4")],
      ["从三个相同的方框里各减去一样多的圆面积，剩下的阴影也相同。",block(shapeData(figure,"path.shade"),"三块阴影一样大")]]);
    if(row.number==="2（1）") return guided(row,[
      ["先看左边。每边两个圆，一个圆的直径是 12 cm，半径是 6 cm。",place(0,"r＝6 cm")],
      ["再看中间。每边三个圆，一个圆的直径是 8 cm，半径是 4 cm。",place(1,"r＝4 cm")+tag(210,238,"两人各剪 452.16 cm²")]]);
    return guided(row,[
      ["只看最右一组。边长 24 cm，分给每边四个圆。",place(2,"直径 6 cm，r＝3 cm")],
      ["给 16 个小圆涂色，用单片面积乘 16。",place(2,"16×3.14×3²")+tag(210,239,"452.16 cm²")],
      ["三种分法虽然圆片大小不同，总面积都一样。",place(0,"452.16")+place(1,"452.16")+place(2,"452.16")]]);
  };

  Object.assign(builders,{
    "parallelogram-circle": row => guided(row,[
      ["先核对图上的两处关键关系。题目需要说清 B、O、C 的位置，以及 AD 是否相切。",node(140,128)+node(210,128)+node(280,128)+node(210,58)+tag(210,226,"先补条件，才能确定面积")],
      ["假设 BC 是直径，AD 在 A 点相切。底边就是 2r，高就是 r。",ink("M140 128H280")+ink("M210 128V58","green")+tag(242,95,"高 r")+tag(210,191,"底 2r")],
      ["用 24 cm² 求 r²，再把圆涂出来。",block(disk(210,128,70),"有补充条件时：37.68 cm²")]]),
    "ring-square": (row,figure) => guided(row,[
      ["题中给 100 cm² 的是左下角这一块。",block(shapeData(figure,"path.shade"),"R²－3.14r²÷4＝100")],
      ["真正要算的圆环是整整一圈。",block(circleRing,"圆环面积＝3.14(R²－r²)")],
      ["比较两个式子里 r² 前的数。知道第一个，仍求不出第二个的差。",ink(square(127,113,83))+ink(disk(210,113,83),"green")+tag(210,224,"条件不足")]]),
    "ring-tri": row => guided(row,[
      ["大三角形的底跨过整个圆，高是一条半径。小三角形同理。",ink("M210 30V196")+ink("M210 113H293","green")+ink("M210 58V168")+tag(317,103,"高 R")+tag(316,132,"底 2R")],
      ["把大、小三角形之间那一圈涂出来。它给出了半径平方的差。",block(triangle(83)+triangle(55),"R²－r²＝50")],
      ["现在把同一个平方差用到圆环面积里。",block(circleRing,"3.14×50＝157 cm²")]]),
    "cans-four": row => guided(row,[
      ["先看一排，上下两段直线各跨三个直径。",ink("M50 84H188M50 130H188")+tag(119,73,"每段 3×8 cm")+tag(120,154,"一圈 73.12 cm")],
      ["再看两行两列。四段直线各是一个直径，弧线总长仍是一个圆周。",ink("M290 61H336M359 84V130M336 153H290M267 130V84","green")+tag(314,47,"每段 8 cm")+tag(313,166,"一圈 57.12 cm")],
      ["两种弧长相同，只比直线段。",ink("M50 84H188M50 130H188")+ink("M290 61H336M359 84V130M336 153H290M267 130V84","green")+tag(210,235,"两行两列省 16 cm")]]),
    "cans-three": row => guided(row,[
      ["先描三条直线。每一段和两个相邻圆心之间的距离相同。",ink("M180.55 47L146.55 106M176 157H244M273.45 106L239.45 47")+tag(210,221,"3×6.5＝19.5 cm")],
      ["再看三个转弯。它们转过的角度加起来是一整圈。",ink("M146.55 106A34 34 0 0 0 176 157M244 157A34 34 0 0 0 273.45 106M239.45 47A34 34 0 0 0 180.55 47","green")+tag(210,221,"弧长合计 20.41 cm")],
      ["描完轮廓，再加接头用掉的 7 cm。",mark("M180.55 47L146.55 106A34 34 0 0 0 176 157H244A34 34 0 0 0 273.45 106L239.45 47A34 34 0 0 0 180.55 47Z","19.5＋20.41＋7＝46.91 cm")]]),
    "semi-overlap": row => guided(row,[
      ["依次涂两个半圆。中间那一块被两种颜色都盖到。",fill(semis[0],blue)+fill(semis[1],"green",.35)+tag(210,240,"两个半圆共 50.24 cm²")],
      ["单独圈中间的白叶片。用两个四分之一圆减去一个小正方形。",block("M295 196A85 85 0 0 1 210 111A85 85 0 0 1 295 196Z","一片叶形 9.12 cm²",210,240)],
      ["两次涂色都盖过叶片，因此要扣两次。剩下才是题目的阴影。",block(semis.join(""),"50.24－2×9.12＝32 cm²",210,240)]]),
    "tri-square": row => guided(row,[
      ["沿整个直角三角形的边走一圈，标出 16 cm 的底和 8 cm 的高。",ink("M65 48V188H345Z")+tag(204,235,"16×8÷2＝64 cm²")],
      ["左下角是方形里减去四分之一圆后留下的空白。",block(square(65,48,140)+pie(205,48,140,90,180),"空白 13.76 cm²",210,235)],
      ["从大三角形里减掉这块空白。",block("M65 48V188H345Z"+square(65,48,140)+pie(205,48,140,90,180),"64－13.76＝50.24 cm²",210,235)]]),
    "sector-semi": row => {
      const half=arc(88,180,228)+"Z", big=pie(316,180,228,180,225);
      return guided(row,[
        ["给半圆和 45° 扇形分别涂色。它们整块的面积相同。",fill(half,blue)+fill(big,"green",.32)+tag(210,230,"两块各 56.52 cm²")],
        ["只看右边的小弓形。它是小四分之一圆减去一个三角形。",block("M202 66A114 114 0 0 1 316 180Z","一块 10.26 cm²",289,84)],
        ["两块图形去掉同一个公共部分，留下的两块面积一样。",block(half+big,"两块合计 20.52 cm²",210,232)],
        ["沿两块阴影的边走，数出三段实际边界。",ink(arc(88,180,228))+ink("M88 180"+curveTo(228,point(316,180,228,225),45),"green")+ink(`M316 180L${point(316,180,228,225).join(" ")}`)+tag(210,232,"18.84＋9.42＋12＝40.26 cm")]]);
    },
    "four-leaves": row => guided(row,[
      ["先只看右上角的一片。两段弧都来自半径 5 cm 的四分之一圆。",ink("M210 36H290V116H210Z","green")+ink(smallLeaf)+tag(345,61,"r＝5 cm")],
      ["两块四分之一圆加起来，减去小正方形，就是一片叶子。",block(smallLeaf,"一片 14.25 cm²",337,102)],
      ["把同样的叶形依次涂到四个位置。", [0,90,180,270].map((a,i)=>`<g transform="rotate(${a} 210 116)">${fill(smallLeaf,"amber",i*.22)}</g>`).join("")+tag(210,241,"4×14.25＝57 cm²")]]),
    "diamond-leaf": (row,figure) => guided(row,[
      ["先沿旋转的正方形走一圈。16 cm 平均分给四条边。",ink(shapeData(figure,"path.shape"))+tag(210,222,"每边 4 cm")],
      ["在正方形里找两条相交的弧。中间白叶形是两个四分之一圆的交集。",block("M210 58.431A80 80 0 0 1 210 171.569A80 80 0 0 1 210 58.431Z","白叶形 9.12 cm²")],
      ["从整张正方形减去白色叶形。",block(shapeData(figure,"path.shade"),"16－9.12＝6.88 cm²")]]),
    "para-sectors": (row,figure) => guided(row,[
      ["沿平行四边形找底，再向对边作垂线找高。",ink("M88 184H172")+ink("M193 79V184","green")+tag(130,208,"底 4 cm")+tag(232,133,"高 5 cm")],
      ["标出两个一样大的 45° 扇形。两块拼起来正好 90°。",fill(shapeData(figure,"path.shape",[1]),blue)+fill(shapeData(figure,"path.shape",[2]),"green",.25)+tag(210,235,"45°＋45°＝90°")],
      ["用平行四边形的面积减去拼出来的直角扇形。",block(shapeData(figure,"path.shade"),"20－12.56＝7.44 cm²")]]),
    "rect-sectors": (row,figure) => guided(row,[
      ["沿外框确认长 4 cm、宽 2 cm。",ink("M100 58H320V168H100Z")+tag(210,229,"4×2＝8 cm²")],
      ["先涂左边的大扇形。它的半径等于长方形的宽。",block(shapeData(figure,"path.shape",[1]),"r＝2 cm，面积 3.14 cm²")],
      ["再涂右边两个小扇形，各自的半径只有 1 cm。",block(shapeData(figure,"path.shape",[2,3]),"两块合计 1.57 cm²")],
      ["从整张长方形扣掉三块扇形。",block(shapeData(figure,"path.shade"),"8－3.14－1.57＝3.29 cm²")]]),
    "trap-sectors": (row,figure) => cornerSum(row,figure,false),
    "tri-sectors": (row,figure) => cornerSum(row,figure,true),
    "grid-123": circleGrid,
    "grid-234": circleGrid,
    "overlap-equal": row => guided(row,[
      ["把三角形和扇形各涂一遍。两块多出来的阴影一样大，公共部分也相同，所以整块也一样大。",fill("M240 38L90 188H240Z",blue)+fill(pie(240,38,168,90,135),"green",.3)+tag(218,235,"两块整图形各 50 cm²")],
      ["在等腰直角三角形顶端 A 标出 45°。",ink("M240 38L90 188M240 38V188")+tag(217,96,"45°")],
      ["扇形只占整圆八分之一，整圆相当于八块。",block(pie(240,38,168,90,135),"50×8＝400 cm²",210,231)]]),
    "overlap-diff": row => guided(row,[
      ["右边半圆以 AC 为直径。先涂整块半圆。",fill("M181 35A83 83 0 0 1 181 201Z",blue)+ink("M181 35V201","green")+tag(153,131,"6 cm")+tag(249,81,"r＝3 cm")],
      ["半圆和三角形都盖住中间。把公共部分抵消，面积差就是两块阴影的差。",fill("M181 35A83 83 0 0 1 181 201ZM181 35V201H290Z")+tag(250,231,"三角形面积 9 cm²")],
      ["三角形的高 AC 已知，沿底边标出要找的 AB。",ink("M181 201H290")+ink("M181 35V201","green")+tag(245,222,"AB＝3 cm")]]),
    "inclusion-rect": (row,figure) => guided(row,[
      ["先涂大扇形，再涂小扇形。分别看它们沿哪一条边取半径。",fill(pie(278,36,162,90,180),blue)+fill(pie(116,144,108,270,360),"green",.35)+tag(215,228,"28.26 dm² ＋ 12.56 dm²")],
      ["长方形里面全被盖住。有一块盖了两次，另有一块跑到了外面。",ink("M116 36H278V144H116Z")+block(shapeData(figure,"path.shade"),"一次多算的部分＋跑到外面的部分")],
      ["从两扇形的面积和中减掉整个长方形。",block(shapeData(figure,"path.shade"),"28.26＋12.56－24＝16.82 dm²")]]),
    "inclusion-tri": (row,figure) => guided(row,[
      ["先给半圆涂色。它的直径是三角形的一条直角边。",block("M130 42A72 72 0 0 1 130 186Z","半径 4 cm，面积 25.12 cm²",210,232,blue)],
      ["再涂 45° 扇形。它的半径是 8 cm。",block(pie(274,42,144,135,180),"扇形面积也是 25.12 cm²",210,232,"green")],
      ["沿三条边描出整个三角形。",ink("M130 42V186L274 42Z")+tag(210,231,"三角形 32 cm²")],
      ["把半圆与扇形相加，再减掉整个三角形。",block(shapeData(figure,"path.shade"),"25.12＋25.12－32＝18.24 cm²")]]),
    "inclusion-unclear": row => guided(row,[
      ["先标出题图明确给出的长和宽。",ink("M104 189H320M320 45V189")+tag(210,236,"已知：长 6 cm、宽 4 cm")],
      ["沿两条弧和斜线描一遍，看看哪些端点和圆心需要确认。",ink("M104 189A108 108 0 0 1 320 189")+ink("M320 45A72 72 0 0 0 320 189","green")+ink("M104 189L270 95")+tag(223,71,"圆心和端点？")],
      ["只靠外框的尺寸，无法确定图里每块阴影。",ink("M104 45H320V189H104Z")+tag(210,236,"现有条件不能唯一确定面积")]]),
    barrel: row => guided(row,[
      ["先看油桶滚一圈。圆周拉直，就是圆心前进的距离。",ink(disk(96,125,31))+tag(211,220,"一圈 1.256 m")],
      ["让油桶从左端滚到右端，跟踪中间的圆心。",travel("M96 125H324",'<circle class="bank-wheel" r="31"/>'+marker)+ink("M96 125H324")+tag(210,215,"5 圈，圆心走 6.28 m")],
      ["圆心在两端都离车厢端面一个半径，各补 0.2 m。",ink("M65 125H96M324 125H355","green")+tag(89,209,"0.2 m")+tag(338,209,"0.2 m")+tag(210,230,"车厢长 6.68 m")]]),
    carpet: row => guided(row,[
      ["把地毯拆成中间长方形和两头半圆。两个半圆拼成一个整圆。",fill("M105 78H315V164H105Z",blue)+fill("M105 78A43 43 0 0 0 105 164ZM315 78A43 43 0 0 1 315 164Z","green",.3)+tag(210,216,"地毯面积 318.5 dm²")],
      ["让机器人贴着边走。到弯道处，它的圆心比地毯边缘还向外 1.5 dm。",travel(carpetTrack,'<circle class="bank-wheel" r="12.9"/>'+marker)+ink(carpetTrack)+tag(210,216,"圆心转弯半径 6.5 dm")],
      ["数圆心走过的两条直线和两条半圆弧。",ink(carpetTrack)+tag(210,220,"2×24＋2×3.14×6.5＝88.82 dm")]]),
    coin: (row,figure) => guided(row,[
      ["先涂四条直边旁边的条带。每条带宽等于硬币的直径。",fill("M115 43H305V81H115ZM115 195H305V233H115ZM77 81H115V195H77ZM305 81H343V195H305Z",blue)+tag(210,144,"带宽 2 cm，合计 64 cm²")],
      ["四个转弯分别扫出一个四分之一圆，合起来是一个半径 2 cm 的圆。",fill(pie(115,81,38,180,270)+pie(305,81,38,270,360)+pie(305,195,38,0,90)+pie(115,195,38,90,180))+tag(210,143,"四角合计 12.56 cm²")],
      ["把四条带和四个转角合在一起。",fill(shapeData(figure,"path.shade"))+tag(210,143,"64＋12.56＝76.56 cm²")]]),
    "rolling-square": (row,figure) => [
      from("看四条边扫过的带子。中间还剩一个边长 4 cm 的小正方形。",row.steps[0],block(square(190,97,38),"中间 4×4＝16 cm²",210,220)),
      from("再涂四个最靠墙角的空隙。每个角都要从小方格中减掉四分之一圆。","4×4²－3.14×4²＝13.76 cm²",block(shapeData(figure,"path.shade",[0,1,2,3]),"四角共 13.76 cm²")),
      from("把中间空白和四角空隙一起涂出。","16＋13.76＝29.76 cm²",block(shapeData(figure,"path.shade"),"滚不到 29.76 cm²")),
      from("最后只跟着圆心走。它走的每条边都离墙 4 cm。",row.steps[2],ink(rollingOutline)+travel(rollingOutline,marker)+tag(210,228,"每边 12 cm，一圈 48 cm"))
    ],
    "rotate-half": row => guided(row,[
      ["先沿 AB 找旋转半径。B 到固定点 A 的距离是半圆的整条直径。",ink("M107 186H287")+node(107,186)+tag(195,211,"AB＝6 cm")],
      ["让半圆绕 A 逆时针转 60°。转前和转后的半圆面积一样。",turn(halfOld,107,186,-60)+tag(315,126,"转 60°")],
      ["沿 B 到 C 的弧扫出 60° 扇形。等大的半圆抵消以后，阴影面积就等于这个扇形。",block(pie(107,186,180,-60,0),"扇形面积 18.84 cm²")]])
  });

  window.circleBankMotion = {
    build(row,figure) {
      if (!row.diagram) {
        return scaleFrames(row,Number(row.number)-1);
      }
      return builders[row.diagram](row,figure);
    }
  };
})();
