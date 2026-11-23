const assert=require('node:assert/strict');
const {days,bank}=require('./dist/data.js');
const L=require('./dist/logic.js');
assert.equal(days.length,5);assert.equal(bank.filter(q=>!q.bonus).length,30);assert.equal(bank.filter(q=>q.bonus).length,10);assert.equal(new Set(bank.map(q=>q.id)).size,40);
let fields=0;
for(const d of days){assert.equal(bank.filter(q=>q.day===d.id&&!q.bonus).length,6);assert.equal(bank.filter(q=>q.day===d.id&&q.bonus).length,2);}
for(const original of bank)for(const [variant,q]of [[false,original],[true,{...original,...original.variant}]]){
 assert.ok(q.story.length>15);assert.ok(q.hint);assert.equal(q.map.length,3);assert.ok(q.work.length>=2);assert.ok(q.tasks.length>=2);assert.notEqual(original.story,original.variant.story);
 const answers={};q.tasks.forEach((t,i)=>{fields++;answers[i]=t.expected;if(t.type==='choice')assert.ok(t.options[Number(t.expected)]);if(t.type==='order')assert.equal(t.expected.length,t.options.length);});
 assert.ok(L.grade(q,answers).every(x=>x.correct),`${original.id} variant=${variant}: ${JSON.stringify(L.grade(q,answers))}`);
}
const cases=[['5+1.5m','1.5m+5',true],['5×(a+3)','5a+15',true],['2a+2b','2(a+b)',true],['a*a-16','a²-16',true],['a²-16','a^2-16',true],['2(a-3)','2a-6',true],['(84-a)÷4','21-a/4',true],['(96-16)/n','80/n',true],['a-12','12-a',false],['50-3p','(50-p)*3',false],['84-a/4','(84-a)/4',false],['15a','12+3a',false],['12n','12+n',false],['-a^2','a^2',false],['1/0','5',false],['alert(1)','1',false],['document.cookie','1',false],['Math.random()','1',false],['a^999','1',false],['1e309','1',false],['5+1.5x','5+1.5m',false]];
for(const[a,b,want]of cases)assert.equal(L.equalExpr(a,b).correct,want,`${a} vs ${b}`);
assert.equal(L.numeric('(80-8)/6'),12);assert.ok(Math.abs(L.numeric('(8.75-5)/1.5')-2.5)<1e-10);
let s=L.fresh(),q=bank[0],wrong={0:'0',1:'5+b',2:'13'},good=Object.fromEntries(q.tasks.map((t,i)=>[i,t.expected]));
L.record(s,q.id,wrong,L.grade(q,wrong),false);assert.ok(s.mistakes[q.id].pending);const first=JSON.stringify(s.records[q.id].first);
L.record(s,q.id,good,L.grade(q,good),false);assert.ok(s.mistakes[q.id].pending,'main repeat cannot bypass review');
L.record(s,q.id,good,L.grade(q,good),false,'review',false);assert.ok(s.mistakes[q.id].pending,'original alone does not master');
const v={...q,...q.variant},vg=Object.fromEntries(v.tasks.map((t,i)=>[i,t.expected]));
L.record(s,q.id,vg,L.grade(v,vg),true,'review',true);assert.ok(s.mistakes[q.id].pending,'assisted variant does not master');
L.record(s,q.id,vg,L.grade(v,vg),false,'review',true);assert.equal(s.mistakes[q.id].pending,false);assert.ok(s.records[q.id].mastered);assert.equal(JSON.stringify(s.records[q.id].first),first);
const restored=L.validateState(JSON.parse(JSON.stringify(s)),bank.map(q=>q.id));assert.equal(JSON.stringify(restored.records),JSON.stringify(s.records));assert.throws(()=>L.validateState({version:2},[]));
const assisted=L.fresh();L.record(assisted,q.id,good,L.grade(q,good),true);assert.ok(assisted.mistakes[q.id].pending);assert.equal(assisted.records[q.id].mastered,false);
console.log(`PASS: 40 original scenarios + 40 transfer variants; ${fields} answer fields; symbolic equivalence, meaningful distractors, mistake lifecycle, assistance and backup checks.`);
// Independently specified arithmetic checks for every scenario, not copied from answer keys.
const applicationCases={
'd1-1':[{b:8},40],'d1-2':[{a:36},48],'d1-3':[{m:18},42],'d1-4':[{n:24},8],'d1-5':[{p:3600},2800],'d1-6':[{x:50},44],
'd2-1':[{a:8},43],'d2-2':[{b:8},55],'d2-3':[{a:15,b:9},48],'d2-4':[{p:12},14],'d2-5':[{a:20},16],'d2-6':[{n:8},44],
'd3-1':[{m:2},8],'d3-2':[{m:480},1020],'d3-3':[{t:9},54],'d3-4':[{t:12},54],'d3-5':[{n:5},16],'d3-6':[{n:4},.9],
'd4-1':[{x:24},8],'d4-2':[{t:12},80],'d4-3':[{a:42},12],'d4-4':[{m:2.5},8.75],'d4-5':[{x:13},27],'d4-6':[{n:8},44],
'd5-1':[{a:9},12],'d5-2':[{a:4,b:3},14],'d5-3':[{a:4},16],'d5-4':[{p:9},56],'d5-5':[{n:6},1.2],'d5-6':[{n:5},16],
'b1-1':[{a:20},28],'b1-2':[{a:5},31],'b2-1':[{p:8},11],'b2-2':[{a:2},18],'b3-1':[{n:4},225],'b3-2':[{t:8},60],
'b4-1':[{a:28},8],'b4-2':[{n:18},46],'b5-1':[{a:8},48],'b5-2':[{a:8},4]
};
for(const[id,[values,result]]of Object.entries(applicationCases)){const expr=bank.find(q=>q.id===id).tasks.find(t=>t.type==='expr').expected;const substituted=expr.replace(/[a-z]/g,c=>`(${values[c]})`);assert.ok(Math.abs(L.numeric(substituted)-result)<1e-8,`${id}: arithmetic quantity relation`);}
console.log('PASS: 40 independently calculated quantity-relation cases.');
