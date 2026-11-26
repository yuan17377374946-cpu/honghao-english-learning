const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
global.window={};require('./data.js');require('./curriculum.js');const original=window.UNIT4.days.flatMap(d=>d.questions).map(q=>JSON.parse(JSON.stringify(q)));require('./challenge.js');const U=window.UNIT4,L=require('./logic.js'),B=require('./review-logic.js');
assert.equal(U.days.flatMap(d=>d.questions).filter(q=>q.challenge).length,30);
for(const d of U.days){assert.equal(d.coreIds.length,12);assert.equal(d.coreIds.filter(id=>id.startsWith('deep-')).length,6);for(const id of d.coreIds)assert(d.questions.some(q=>q.id===id));}
for(const old of original){const q=U.days.flatMap(d=>d.questions).find(q=>q.id===old.id);for(const key of ['prompt','answers','fields','options','pairs','answer','tokens'])assert.deepEqual(q[key],old[key],old.id+' legacy answer changed');}
const handlers={},els={},el=id=>els[id]||(els[id]={innerHTML:'',textContent:'',classList:{toggle(){}},focus(){},querySelectorAll:()=>[]});
const doc={getElementById:el,querySelector:()=>null,querySelectorAll:()=>[],addEventListener:(type,fn)=>handlers[type]=fn,body:el('body')};
vm.runInNewContext(fs.readFileSync(__dirname+'/app.js','utf8'),{window:{UNIT4:U,PracticeLogic:L,ReviewBook:B,location:{hash:'#home'},history:{replaceState(){}},addEventListener(){},scrollTo(){}},document:doc,localStorage:{getItem:()=>null,setItem(){}},setTimeout:()=>0,clearTimeout(){},console});
function click(dataset){const button={dataset,matches:()=>false};handlers.click({target:{closest:()=>button}});}
let rendered=0;
for(const [di,d]of U.days.entries())for(const [i,q]of d.questions.entries()){
 click({day:String(di)});click({qindex:String(i)});assert(el('main').innerHTML.includes(q.prompt.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))),q.id+' render');rendered++;
 if(q.type==='input')assert(q.answers.every(a=>L.matches(a,q.answers)));
 if(q.type==='cloze')assert(q.fields.every(f=>f.answers.every(a=>L.matches(a,f.answers))));
}
assert.equal(rendered,137);console.log('PASS: 30 deeper tasks, balanced 12/day, 107 previous questions unchanged; all 137 task screens render.');
