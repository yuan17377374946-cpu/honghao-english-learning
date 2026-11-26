const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const D=require('./challenge.js'),L=require('./logic.js');
assert.equal(D.bank.length,60);assert.equal(D.bank.filter(q=>q.challenge).length,20);assert.equal(new Set(D.bank.map(q=>q.id)).size,60);
for(const d of D.days){const qs=D.bank.filter(q=>q.day===d.id&&!q.bonus);assert.equal(qs.length,6);assert.equal(qs.filter(q=>q.challenge).length,4);assert.equal(D.bank.filter(q=>q.day===d.id&&q.bonus).length,6);}
// Values independently calculated from the stories, rather than accepting the stored formula as the oracle.
const probes=[
 [{a:12},[14],{a:10},[2]], [{b:6},[5],{n:4},[13,21]], [{x:12},[27],{p:5},[19,35]], [{a:50,b:30},[20/12],{a:80,b:25},[55]],
 [{n:10,a:1.5},[61],{k:8,b:2},[69]], [{n:12,a:18},[226],{m:9,c:6.5},[82.5]], [{n:25},[8],{x:20},[5]], [{a:8,b:12},[23],{x:15,y:20},[23]],
 [{t:16},[84],{p:3},[33]], [{n:11},[30],{k:10},[23]], [{n:5},[30],{k:4},[12]], [{m:4},[11],{t:4},[23]],
 [{},[],{},[17]], [{x:17},[6],{},[]], [{},[18],{n:6},[56]], [{x:16},[90],{a:7},[35]],
 [{a:10},[21],{x:8},[24]], [{a:6,b:2},[26],{p:6,q:2},[30]], [{n:8},[82],{k:6},[46.5]], [{a:6},[24],{b:7.5},[10]]
];
const numericOracles=[[[],[2]],[[],[]],[[],[]],[[],[]],[[61], [2]],[[226],[82.5]],[[],[15]],[[],[23]],[[16],[3]],[[2,11],[10]],[[],[]],[[1.5,4],[5]],[[10],[17]],[[52],[8]],[[16],[6]],[[16],[7]],[[10],[32]],[[],[30]],[[8],[6]],[[],[1]]];
const fresh=D.bank.filter(q=>q.challenge);
for(let j=0;j<fresh.length;j++)for(const transfer of [0,1]){
 const q=transfer?{...fresh[j],...fresh[j].variant}:fresh[j],vars=probes[j][transfer*2],want=probes[j][transfer*2+1],exprs=q.tasks.filter(t=>t.type==='expr');
 assert.equal(exprs.length,want.length,q.id);
 exprs.forEach((t,i)=>{const expr=t.expected.replace(/[a-z]/g,v=>'('+vars[v]+')');assert.ok(Math.abs(L.numeric(expr)-want[i])<1e-8,q.id+' formula '+expr);});
 assert.deepEqual(q.tasks.filter(t=>t.type==='number').map(t=>Number(t.expected)),numericOracles[j][transfer],q.id+' numerical answer');
 assert(q.hint&&q.work.length>=2&&q.variant!==q);assert.notEqual(fresh[j].story,fresh[j].variant.story);
 const ans=Object.fromEntries(q.tasks.map((t,i)=>[i,t.expected]));assert(L.grade(q,ans).every(r=>r.correct),q.id);
}
// Every legacy question remains available for old mistakes and saved snapshots.
for(let day=1;day<=5;day++)for(let i=1;i<=6;i++)assert(D.bank.some(q=>q.id===`d${day}-${i}`));
let rendered=0;
for(const original of D.bank)for(const transfer of [false,true]){
 const q=transfer?{...original,...original.variant}:original,s=L.fresh();s.bankRevision=2;s.session={challengeRevision:1,mode:'main',day:q.day,queue:[{id:q.id,variant:transfer,question:L.snapshot(q)}],index:0,answers:{},outcomes:[],checked:null};
 const els={},el=id=>els[id]||(els[id]={innerHTML:'',textContent:'',classList:{add(){},remove(){},toggle(){}},focus(){},addEventListener(){},prepend(){}}),doc={querySelector:el,querySelectorAll:()=>[],getElementById:el,addEventListener(){},body:el('body')};
 vm.runInNewContext(fs.readFileSync(__dirname+'/app.js','utf8'),{window:{MathQuestData:D,MathQuestLogic:L,addEventListener(){},scrollTo(){}},document:doc,localStorage:{getItem:()=>JSON.stringify(s),setItem(){}},location:{hash:'#play'},setTimeout:()=>0,clearTimeout(){},console});
 assert(el('#app').innerHTML.includes(q.title),q.id+' render');rendered++;
}
console.log('PASS: 20 new multi-step challenges + 20 different-scene variants; independent formula and numeric oracles; all '+rendered+' screens render; 40 legacy questions retained.');
