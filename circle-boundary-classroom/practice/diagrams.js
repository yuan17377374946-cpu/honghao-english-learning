(() => {
  const path = (d, kind = "edge") => `<path class="${kind}" d="${d}"/>`;
  const circle = (x, y, r, kind = "edge") => `<circle class="${kind}" cx="${x}" cy="${y}" r="${r}"/>`;
  const rect = (x, y, w, h, kind = "edge") => `<rect class="${kind}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  const label = (x, y, value) => `<text x="${x}" y="${y}">${value}</text>`;
  const halfArc = (x, y, w, up = true) => path(`M${x} ${y}a${w/2} ${w/2} 0 0 ${up ? 1 : 0} ${w} 0`,"boundary");
  const routes = (parts, lower = [], x = 80, y = 142, w = 260) => {
    let left = x;
    const small = parts.map((d,i) => {
      const width = d * w / parts.reduce((sum,n)=>sum+n,0);
      const arc = halfArc(left,y,width,!lower.includes(i));
      left += width;
      return arc;
    }).join("");
    return path(`M${x} ${y}h${w}`,"dash")+halfArc(x,y,w)+small;
  };
  const squareCircle = (shaded = false) =>
    rect(77,35,110,110,shaded?"fill-area":"edge")+circle(132,90,55,shaded?"paper":"edge")+
    circle(289,90,55,shaded?"fill-area":"edge")+path("M289 35L344 90L289 145L234 90Z",shaded?"paper":"edge")+
    path("M77 90H187M234 90H344M289 35V145","dash")+
    label(132,168,"外方内圆")+label(289,168,"外圆内方");
  const bundle = (x,y,columns,rows) => {
    const r=17, w=(columns-1)*2*r, h=(rows-1)*2*r;
    const points=[];
    for(let i=0;i<columns;i++) for(let j=0;j<rows;j++) points.push(circle(x+i*2*r,y+j*2*r,r));
    return points.join("")+
      path(`M${x} ${y-r}h${w}a17 17 0 0 1 17 17v${h}a17 17 0 0 1 -17 17h-${w}a17 17 0 0 1 -17 -17v-${h}a17 17 0 0 1 17 -17Z`,"boundary");
  };
  const star = "M210 30A60 60 0 0 0 270 90A60 60 0 0 0 210 150A60 60 0 0 0 150 90A60 60 0 0 0 210 30Z";
  const swap = "M102 140A92 92 0 0 1 194 48A92 92 0 0 0 286 140Z";
  const dogTrack = "M49 139A115 115 0 0 1 164 24A79 79 0 0 1 243 103A43 43 0 0 1 200 146A7 7 0 0 1 193 139";
  const sketches = {
    arcs: routes([2,3,4])+label(67,147,"A")+label(354,147,"B"),
    arcsTwo: routes([4,4],[1],115,115,180)+label(160,136,"4 dm")+label(250,101,"4 dm"),
    arcVariants: routes([3,5],[1],22,108,110)+routes([2,2,4],[2],155,108,110)+routes([3,2,3],[],287,108,110)+label(77,163,"3、5")+label(210,163,"2、2、4")+label(342,163,"3、2、3"),
    arcsFour: routes([6,6,6,6],[1,3],90,126,240)+label(76,132,"A")+label(345,132,"B")+label(120,147,"6 m")+label(180,116,"6 m")+label(240,147,"6 m")+label(300,116,"6 m"),
    half: path("M110 130A100 100 0 0 1 310 130Z","fill-area")+path("M110 130A100 100 0 0 1 310 130Z","boundary")+path("M210 130V30","dash")+label(242,85,"r = 2 cm"),
    halves: path("M58 111a65 65 0 0 1 130 0Z","fill-area")+path("M232 77a65 65 0 0 0 130 0Z","fill-area")+path("M58 111a65 65 0 0 1 130 0ZM232 77a65 65 0 0 0 130 0Z","boundary")+label(123,137,"直径")+label(297,59,"直径"),
    star: rect(150,30,120,120)+path(star,"fill-area")+path(star,"boundary")+label(305,96,"8 dm"),
    swap: rect(194,48,92,92)+path(swap,"fill-area")+path(swap,"boundary")+path("M194 48V140","dash")+label(308,99,"3 cm")+label(240,163,"3 cm"),
    rollHalf: path("M35 133H385","edge")+path("M50 120A55 55 0 0 1 160 120Z","boundary")+path("M255 120A55 55 0 0 1 365 120Z","boundary")+path("M171 90H239l-10 -7m10 7l-10 7","edge")+label(50,158,"12 cm")+label(255,158,"37.7 cm"),
    squareCircle: squareCircle(),
    squareShades: squareCircle(true),
    bend: path("M105 35H168A110 110 0 0 1 278 145V166H256V145A88 88 0 0 0 168 57H105Z","fill-area")+path("M105 35H168A110 110 0 0 1 278 145V166H256V145A88 88 0 0 0 168 57H105Z","boundary")+path("M168 35V145H278","dash")+label(135,24,"3 m")+label(207,137,"4 m")+label(311,159,"3 m")+label(312,141,"宽 1 m"),
    parks: path("M27 125a80 80 0 0 1 160 0H155a48 48 0 0 0-96 0a16 16 0 0 0-32 0Z","fill-area")+path("M233 125a80 80 0 0 1 160 0H377a64 64 0 0 0-128 0Z","fill-area")+path("M27 125a80 80 0 0 1 160 0H155a48 48 0 0 0-96 0a16 16 0 0 0-32 0ZM233 125a80 80 0 0 1 160 0H377a64 64 0 0 0-128 0Z","boundary")+label(107,156,"A 方案")+label(313,156,"B 方案"),
    pond: path("M106 133a104 104 0 0 1 208 0v26H106Z","fill-area")+path("M132 133a78 78 0 0 1 156 0Z","paper")+path("M106 133a104 104 0 0 1 208 0v26H106ZM132 133a78 78 0 0 1 156 0Z","boundary")+path("M106 133h26m156 0h26","dash")+label(210,112,"r = 3 m")+label(349,151,"1 m"),
    ring: circle(195,90,71,"fill-area")+circle(195,90,63,"paper")+circle(195,90,71,"boundary")+circle(195,90,63,"boundary")+path("M195 90h71","dash")+label(226,80,"8 m")+label(306,121,"外半径 9 m"),
    dog: rect(164,103,36,36,"paper")+path(dogTrack,"boundary")+path("M49 139H164","dash")+label(51,157,"A")+label(105,159,"16 dm")+label(184,124,"屋")+label(180,97,"5 dm"),
    leaf: path("M150 145A72 72 0 0 1 222 73V117.5A108 108 0 0 1 150 145ZM222 37H258A108 108 0 0 1 222 117.5Z","fill-area")+
      rect(150,37,72,108)+path("M150 145A108 108 0 0 0 258 37H150ZM150 145A72 72 0 0 1 222 73V145Z","boundary")+
      label(138,32,"A")+label(222,29,"D")+label(269,34,"E")+label(137,150,"B")+label(229,156,"C")+label(116,97,"6 cm")+label(185,170,"4 cm"),
    overlap: '<defs><clipPath id="practice-circle-b"><circle cx="243" cy="90" r="67"/></clipPath></defs>'+circle(170,90,48,"fill-area overlap-fill")+circle(170,90,48)+circle(243,90,67)+label(148,96,"A")+label(258,96,"B"),
    parallel: path("M102 48H222A60 60 0 0 0 162 108Z M222 48A60 60 0 0 1 282 108Z","fill-area")+path("M102 48H222L282 108H162Z")+path("M162 108a60 60 0 0 1 120 0Z","boundary")+path("M222 48v60","dash")+label(90,48,"A")+label(148,118,"B")+label(294,118,"C")+label(222,38,"D")+label(222,129,"O"),
    crescents: path("M130 145A80 80 0 0 1 210 65ZM210 65L243.137 31.863A160 160 0 0 1 290 145A80 80 0 0 0 210 65Z","fill-area")+
      path("M130 145L243.137 31.863A160 160 0 0 1 290 145ZM130 145A80 80 0 0 1 290 145Z","boundary")+
      label(183,135,"45°")+label(210,166,"2 dm"),
    equal: path("M175 145A65 65 0 0 0 240 80H358V145Z","fill-area")+circle(175,80,65)+rect(175,80,183,65)+path("M175 145A65 65 0 0 0 240 80H358V145Z","boundary")+label(299,69,"4.28 cm")+label(166,72,"O"),
    triangle: path("M145 30A60 60 0 0 1 205 90Z M205 90L265 150H145A60 60 0 0 0 205 90Z","fill-area")+path("M145 30V150H265Z")+path("M145 30A60 60 0 0 1 145 150","boundary")+path("M145 150L205 90","dash")+label(132,32,"A")+label(131,151,"B")+label(277,155,"C")+label(217,84,"D"),
    bundle: bundle(192,65,2,2)+label(210,146,"每根直径 10 cm"),
    bundleBoth: bundle(76,67,2,2)+bundle(218,85,4,1)+label(92,144,"方法一")+label(269,144,"方法二"),
    four: rect(146,26,128,128)+[178,242].flatMap(x=>[58,122].map(y=>circle(x,y,32,"fill-area"))).join("")+path("M210 26V154M146 90H274","dash"),
    gate: path("M130 140h128M130 140V12","edge")+path("M130 12a128 128 0 0 1 128 128","boundary")+label(188,162,"4 m")+label(267,141,"A"),
    stops: path("M65 55v90h290V55")+circle(97,113,32)+circle(323,113,32)+path("M97 113H323","boundary")+label(207,103,"圆心走 5 个圆周")+label(65,163,"A")+label(355,163,"B"),
    flip: Array.from({length:5},(_,i)=>path(`M${50+i*64} 135l32 -55.43 32 55.43Z`)).join("")+path("M50 135a64 64 0 0 1 96 -55.43a64 64 0 0 1 96 55.43M242 135a64 64 0 0 1 96 -55.43","boundary")+label(56,159,"B 起点")+label(342,65,"B 终点"),
    innerRoll: rect(75,36,270,108)+circle(102,63,27,"paper")+circle(318,117,27,"paper")+path("M102 63H318V117H102Z","dash")+label(210,165,"10 cm")+label(374,95,"4 cm")
  };
  window.circlePracticeDiagrams = sketches;
})();
