const point = (x, y, r, angle) => [x + r * Math.cos(angle * Math.PI / 180), y + r * Math.sin(angle * Math.PI / 180)].map(n => +n.toFixed(3));
const curveTo = (r, end, span) => `A${r} ${r} 0 ${Math.abs(span) > 180 ? 1 : 0} ${span > 0 ? 1 : 0} ${end.join(' ')}`;
const polygon = (points, kind = 'shape') => path(`M${points.map(p => p.join(' ')).join('L')}Z`, kind);
const box = (x, y, w, h, kind = 'shape') => path(`M${x} ${y}h${w}v${h}h-${w}Z`, kind);
const pie = (x, y, r, from, to) => `M${x} ${y}L${point(x,y,r,from).join(' ')}${curveTo(r,point(x,y,r,to),to-from)}Z`;
const even = d => `<path class="shade" fill-rule="evenodd" d="${d}"/>`;
const square = (x,y,side) => `M${x} ${y}h${side}v${side}h-${side}Z`;
const disk = (x,y,r) => `M${x-r} ${y}a${r} ${r} 0 1 1 ${2*r} 0a${r} ${r} 0 1 1 ${-2*r} 0Z`;

function arcStudy(key) {
  const outer = arc(65,174,290);
  if (key === 'route') return path(outer) + path(arc(65,174,290/6)) + path(arc(65+290/6,174,290/3)) +
    path(arc(210,174,145)) + line(65,174,355,174,'guide') + label(45,179,'M') + label(376,179,'N') +
    label(89,204,'2 cm') + label(162,204,'4 cm') + label(283,204,'6 cm');
  if (key === 'moon') {
    const y = 174, left = 65, split = 137.5, end = 355;
    return path(outer + 'A108.75 108.75 0 0 0 137.5 174A36.25 36.25 0 0 0 65 174Z','shade') +
      path(outer) + path(arc(left,y,72.5)) + path(arc(split,y,217.5)) + line(left,y,end,y,'guide') +
      label(101,205,'2 cm') + label(246,205,'6 cm');
  }
  const half = arc(90,173,240);
  const note = {'half-6':'墙长 6 m','half-cake':'完整周长 51.4 cm','half-wall':'墙','half-fence':'围一圈 20.56 m'};
  return path(half+'Z','neutral') + path(half) + line(90,173,330,173) +
    ((key === 'half-wall' || key === 'half-6') ? line(72,179,348,179,'ghost') : '') +
    (key === 'half-wall' ? label(210,107,'篱笆 14.13 m') : '') + label(210,207,note[key]);
}

function concentric(key) {
  const x=210,y=113,r=83,s=55;
  const outer = circle(x,y,r);
  const inner = circle(x,y,s);
  if (key==='square-circle-diamond') return box(127,30,166,166) + outer +
    polygon([[x,30],[293,y],[x,196],[127,y]]) + line(127,y,293,y,'guide') + line(x,30,x,196,'guide') + dot(x,y);
  if (key==='circle-square-circle') {
    const q=r/Math.sqrt(2);
    return outer+box(x-q,y-q,2*q,2*q)+circle(x,y,q)+dot(x,y);
  }
  if (key==='square-circle') return even(square(127,30,166)+disk(x,y,r))+outer+box(127,30,166,166);
  if (key==='ring-square') return outer+inner+even(square(127,113,83)+pie(x,y,s,90,180))+
    box(127,113,83,83)+path(pie(x,y,s,90,180))+label(158,103,'R')+label(227,149,'r')+dot(x,y);
  if (key==='ring-tri') {
    const t = (r) => `M${x} ${y-r}L${x+r} ${y}L${x} ${y+r}Z`;
    return even(t(r)+t(s))+outer+inner+path(t(r))+path(t(s))+line(127,y,293,y,'guide');
  }
  return even(disk(x,y,r)+disk(x,y,s))+outer+inner+dot(x,y)+line(x,y,293,y,'measure')+label(245,104,'r')+label(281,138,'R');
}

function annular(x,y,outer,inner,from,to) {
  const a=point(x,y,outer,from), b=point(x,y,outer,to);
  const c=point(x,y,inner,to), d=point(x,y,inner,from);
  const body=`M${a.join(' ')}${curveTo(outer,b,to-from)}L${c.join(' ')}${curveTo(inner,d,from-to)}Z`;
  return path(body,'shade')+path(body)+line(x,y,...d,'guide')+line(x,y,...c,'guide');
}

function annularStudy(key) {
  if(key==='sector-1a') return annular(154,176,125,75,-90,0)+label(128,76,'2 dm')+label(231,205,'外半径 5 dm')+label(142,196,'O');
  if(key==='sector-1b') return annular(210,120,92,69,-90,0)+annular(210,120,92,69,90,180)+label(179,42,'1 dm')+label(161,108,'4 dm')+label(227,143,'O');
  if(key==='sector-2a') return annular(210,118,96,64,90,360)+label(258,106,'6 cm')+label(185,200,'2 cm')+label(224,145,'O');
  return annular(272,177,138,92,180,240)+label(224,208,'6 cm')+label(201,49,'3 cm')+label(232,152,'60°')+label(285,195,'O');
}

function grazing(key) {
  if(key==='leaf-10') {
    const leaf='M130 195A160 160 0 0 1 290 35A160 160 0 0 1 130 195Z';
    return path(leaf,'shade')+path(leaf)+box(130,35,160,160)+label(210,220,'10 m')+label(114,204,'A')+label(305,32,'B');
  }
  if(key==='dog') {
    const x=216,y=120,r=86,a=43;
    return [pie(x,y,r,-90,180),pie(x,y-a,a,-180,-90),pie(x-a,y,a,180,270)].map(d=>path(d,'shade')+path(d)).join('')+
      box(x-a,y-a,a,a,'neutral')+box(x-a,y-a,a,a)+dot(x,y)+label(229,140,'A')+label(196,102,'屋')+label(265,111,'6 m')+label(194,68,'3 m');
  }
  const x=210,y=177,r=124,a=62;
  return [pie(x,y,r,180,270),pie(x,y-a,a,-90,0),pie(x-a,y,a,90,180)].map(d=>path(d,'shade')+path(d)).join('')+
    line(x-a,y,x,y,'trace')+line(x,y,x,y-a,'trace')+dot(x,y)+label(224,197,'O')+label(181,199,'2 m')+label(234,151,'2 m')+label(160,117,'4 m');
}

function cans(key) {
  if(key==='cans-three') {
    const x=210,y=64,r=34,offset=59;
    const centers=[[x,y],[x-r,y+offset],[x+r,y+offset]];
    return centers.map(([cx,cy])=>circle(cx,cy,r,'neutral')+circle(cx,cy,r)).join('')+
      `<path d="M${x} ${y}L${x-r} ${y+offset}H${x+r}Z" fill="none" stroke="#1373bf" stroke-width="2"/>`+
      path('M180.55 47L146.55 106A34 34 0 0 0 176 157H244A34 34 0 0 0 273.45 106L239.45 47A34 34 0 0 0 180.55 47Z','trace')+
      label(210,193,'直径 6.5 cm');
  }
  const r=23, row=[[50,107],[96,107],[142,107],[188,107]], square=[[290,84],[336,84],[290,130],[336,130]];
  return row.concat(square).map(([x,y])=>circle(x,y,r,'neutral')+circle(x,y,r)).join('')+
    `<rect class="trace" x="27" y="84" width="184" height="46" rx="23"/><rect class="trace" x="267" y="61" width="92" height="92" rx="23"/>`+
    label(119,176,'一行四罐')+label(313,176,'两行两列')+label(210,211,'每个罐底直径 8 cm');
}

function cutAndFit(key) {
  if (key==='quadrant-square') {
    const x=126,y=193,r=154,s=109;
    return even(pie(x,y,r,270,360)+square(x,y-s,s))+path(pie(x,y,r,270,360))+box(x,y-s,s,s)+line(x,y,x+s,y-s,'guide');
  }
  if (key==='parallelogram-circle') {
    return circle(210,128,70)+polygon([[140,128],[280,128],[350,58],[210,58]])+dot(210,128)+
      label(123,133,'B')+label(291,147,'C')+label(203,45,'A')+label(367,62,'D')+label(210,154,'O');
  }
  if (key==='semi-overlap') {
    const p='M125 196a85 85 0 0 1 170 0Z',q='M295 26a85 85 0 0 0 0 170Z';
    return even(p+q)+path(p)+path(q)+box(125,26,170,170)+label(210,224,'8 cm');
  }
  if (key==='tri-square') {
    const tri='M65 48V188H345Z', quarter=pie(205,48,140,90,180);
    return even(tri+square(65,48,140)+quarter)+path(tri)+box(65,48,140,140)+path('M65 48A140 140 0 0 0 205 188')+
      label(135,213,'8 cm')+label(275,213,'8 cm')+label(42,118,'8');
  }
  if (key==='sector-semi') {
    const half=arc(88,180,228)+'Z', sector=pie(316,180,228,180,225);
    return even(half+sector)+path(half)+path(sector)+line(202,180,202,66,'guide')+
      label(202,207,'12 cm')+label(276,166,'45°');
  }
  if (key==='four-leaves') {
    const d='M210 36A80 80 0 0 1 290 116A80 80 0 0 1 210 36Z';
    return box(130,36,160,160)+[0,90,180,270].map(a=>`<g transform="rotate(${a} 210 116)">${path(d,'shade')+path(d)}</g>`).join('')+
      label(210,225,'10 cm')+label(325,121,'10 cm');
  }
  const x=210,y=115,r=80,q=r/Math.sqrt(2);
  const leaf=`M${x} ${y-q}A${r} ${r} 0 0 1 ${x} ${y+q}A${r} ${r} 0 0 1 ${x} ${y-q}Z`;
  const diamond=`M${x} ${y-q}L${x+q} ${y}L${x} ${y+q}L${x-q} ${y}Z`;
  return even(leaf+diamond)+circle(x-q,y,r)+circle(x+q,y,r)+path(diamond);
}

function cornerSectors(key) {
  if (key==='rect-sectors') {
    const shapes=[pie(100,58,110,0,90),pie(320,58,55,90,180),pie(320,168,55,180,270)];
    return even('M100 58H320V168H100Z'+shapes.join(''))+box(100,58,220,110)+shapes.map(d=>path(d)).join('')+
      label(210,41,'4 cm')+label(67,121,'2 cm')+label(349,95,'1 cm');
  }
  const geometry={
    'para-sectors':{points:[[88,184],[172,184],[277,79],[193,79]],r:84,cut:[0,2],length:'底 4 cm · 高 5 cm'},
    'trap-sectors':{points:[[95,179],[325,179],[275,63],[145,63]],r:52,cut:[0,1,2,3],length:'扇形半径均为 8 cm'},
    'tri-sectors':{points:[[100,179],[316,179],[147,44]],r:52,cut:[0,1,2],length:'扇形半径均为 5 cm'}
  };
  const {points,r,cut,length}=geometry[key];
  const outline=`M${points.map(p=>p.join(' ')).join('L')}Z`;
  const angle=(vertex,target)=>Math.atan2(target[1]-vertex[1],target[0]-vertex[0])*180/Math.PI;
  const parts=cut.map(i=>{
    const v=points[i], start=angle(v,points[(i+1)%points.length]), end=angle(v,points[(i+points.length-1)%points.length]);
    const span=((end-start+540)%360)-180;
    return pie(...v,r,start,start+span);
  });
  return (key==='para-sectors'?even(outline+parts.join('')):parts.map(d=>path(d,'shade')).join(''))+
    path(outline)+parts.map(d=>path(d)).join('')+label(210,219,length);
}

function gridCircles(key) {
  const cells=key==='grid-123'?[1,2,3]:[2,3,4], side=101;
  return cells.map((n,index)=>{
    const x=38+122*index, y=57, d=side/n;
    let circles='';
    let fills='';
    for(let row=0;row<n;row++) for(let col=0;col<n;col++) {
      const cx=x+d*(col+.5), cy=y+d*(row+.5);
      circles+=circle(cx,cy,d/2);
      fills+=disk(cx,cy,d/2);
    }
    const title=key==='grid-123'?['甲','乙','丙'][index]:['阳阳','果果','优优'][index];
    return even(square(x,y,side)+fills)+box(x,y,side,side)+circles+label(x+side/2,192,title);
  }).join('');
}

function overlapping(key) {
  if(key==='overlap-equal') {
    const tri='M240 38L90 188H240Z', sector=pie(240,38,168,90,135);
    return even(tri+sector)+path(tri)+path(sector)+label(250,32,'A')+label(76,204,'B')+
      label(257,185,'C')+label(246,227,'F')+label(135,148,'E')+label(170,181,'①','amber')+label(223,205,'②','amber');
  }
  if(key==='overlap-diff') {
    const x=181, y=118, r=83, tri='M181 35V201H290Z';
    const semi=`M${x} 35A83 83 0 0 1 ${x} 201Z`;
    return even(tri+semi)+circle(x,y,r)+path(tri)+label(167,33,'C')+label(167,220,'A')+label(306,211,'B')+
      label(232,93,'S₂','amber')+label(254,188,'S₁','amber');
  }
  if(key==='inclusion-rect') {
    const a=[116,36], b=[116,144], c=[278,144], d=[278,36], e=[278,198], f=[224,144];
    const small=pie(...b,108,270,360), big=pie(...d,162,90,180), rect='M116 36H278V144H116Z';
    return even(small+big+rect)+path(small)+path(big)+path(rect)+
      [[a,'A',-13,-8],[b,'B',-13,18],[c,'C',13,10],[d,'D',13,-6],[e,'E',13,10],[f,'F',0,-8]].map(([p,t,dx,dy])=>label(p[0]+dx,p[1]+dy,t)).join('')+
      label(197,27,'6 dm')+label(306,97,'4 dm');
  }
  if(key==='inclusion-tri') {
    const tri='M130 42V186L274 42Z', semi='M130 42A72 72 0 0 1 130 186Z', sector=pie(274,42,144,135,180);
    return even(tri+semi+sector)+path(tri)+path(semi)+path(sector)+label(118,36,'A')+label(118,204,'B')+label(286,38,'C');
  }
  const outline='M104 45H320V189H104Z', arc1='M104 189A108 108 0 0 1 320 189', arc2='M320 45A72 72 0 0 0 320 189';
  return path(outline)+path(arc1)+path(arc2)+line(104,189,270,95)+
    label(212,217,'6 cm')+label(349,125,'4 cm');
}

function rolling(key) {
  if(key==='barrel') {
    return path('M65 71V156H355V71')+circle(96,125,31)+circle(324,125,31)+
      dot(96,125)+dot(324,125)+line(96,125,324,125,'guide')+
      label(210,107,'滚动 5 周')+label(96,188,'起点')+label(324,188,'终点')+label(120,76,'r = 0.2 m');
  }
  if(key==='carpet') {
    const rr=(x,y,w,h,kind)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" class="${kind}"/>`;
    return rr(62,78,296,86,'neutral')+rr(62,78,296,86,'shape')+rr(49.1,65.1,321.8,111.8,'guide')+
      line(105,78,105,164,'guide')+line(315,78,315,164,'guide')+
      circle(315,65.1,12.9)+dot(315,65.1)+line(315,121,358,121,'measure')+
      label(210,139,'24 dm')+label(337,113,'5 dm')+label(313,43,'机器人');
  }
  if(key==='coin') {
    const outside='M115 43H305A38 38 0 0 1 343 81V195A38 38 0 0 1 305 233H115A38 38 0 0 1 77 195V81A38 38 0 0 1 115 43Z';
    const inside='M115 81H305V195H115Z';
    return even(outside+inside)+path(outside,'guide')+path(inside)+circle(210,62,19)+
      label(210,145,'长 10 cm · 宽 6 cm')+label(266,33,'r = 1 cm');
  }
  if(key==='rolling-square') {
    const x=114,y=21,s=190,r=38;
    const corner=(cx,cy,a,b)=>even(pie(cx,cy,r,a,b)+square(cx+(a===90||a===180?-r:0),cy+(a===180||a===270?-r:0),r));
    const d=[[x+r,y+r,180,270],[x+s-r,y+r,270,360],[x+s-r,y+s-r,0,90],[x+r,y+s-r,90,180]];
    return d.map(([cx,cy,a,b])=>corner(cx,cy,a,b)).join('')+
      box(x,y,s,s)+box(x+r,y+r,s-2*r,s-2*r,'guide')+
      d.map(([cx,cy])=>circle(cx,cy,r)+dot(cx,cy)).join('')+
      box(x+2*r,y+2*r,s-4*r,s-4*r,'shade')+box(x+2*r,y+2*r,s-4*r,s-4*r)+
      label(210,237,'边长 20 cm')+label(340,53,'r = 4 cm');
  }
  const a=[107,186], r=180, b=[287,186], c=point(...a,r,-60);
  const sector=pie(...a,r,-60,0), old=arc(...a,r)+'Z';
  const newHalf=`M${a.join(' ')}A90 90 0 0 1 ${c.join(' ')}Z`;
  return even(sector+old+newHalf)+path(old)+path(sector,'guide')+path(newHalf)+
    label(96,203,'A')+label(296,203,'B')+label(c[0]+8,c[1]-8,'C')+label(154,174,'60°');
}

const diagramFamilies = [
  [arcStudy, 'route moon half-6 half-cake half-wall half-fence'],
  [concentric, 'rings square-circle-diamond circle-square-circle square-circle ring-square ring-tri'],
  [annularStudy, 'sector-1a sector-1b sector-2a sector-2b'],
  [grazing, 'leaf-10 dog sheep'],
  [cans, 'cans-four cans-three'],
  [cutAndFit, 'quadrant-square parallelogram-circle semi-overlap tri-square sector-semi four-leaves diamond-leaf'],
  [cornerSectors, 'para-sectors rect-sectors trap-sectors tri-sectors'],
  [gridCircles, 'grid-123 grid-234'],
  [overlapping, 'overlap-equal overlap-diff inclusion-rect inclusion-tri inclusion-unclear'],
  [rolling, 'barrel carpet coin rolling-square rotate-half']
];
const questionDiagrams = new Map(diagramFamilies.flatMap(([draw,keys])=>keys.split(' ').map(key=>[key,draw])));
