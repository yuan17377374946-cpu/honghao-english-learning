'use strict';
const assert=require('node:assert/strict');
const dir=require('node:fs').existsSync(require('node:path').join(__dirname,'dist/data.js'))?'./dist/':'./';
global.window={};require(dir+'data.js');require(dir+'curriculum.js');require(dir+'challenge.js');require(dir+'listening.js');
const u=window.UNIT4, qs=u.days.flatMap(d=>d.questions), ids=new Set();
assert.equal(u.days.length,5);assert.equal(u.vocab.length,24);assert.equal(qs.length,147);
for(const q of qs){
 assert(!ids.has(q.id),`重复ID：${q.id}`);ids.add(q.id);assert(q.prompt&&q.hint&&q.why,q.id);
 if(['choice','listen','reading','edit'].includes(q.type)){const opts=q.type==='edit'?q.replacements:q.options;assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<opts.length,q.id);}
 if(q.type==='order'){assert.deepEqual([...q.tokens].sort(),[...q.answer].sort(),`${q.id} 词块不匹配`);}
 if(q.type==='cloze')assert(q.fields.length&&q.fields.every(f=>f.text&&f.answers.length),q.id);
 if(q.table)assert(q.table.rows.every(r=>r.length===q.table.headers.length),q.id);
 if(q.type==='input')assert(q.answers.length&&q.answers.every(a=>typeof a==='string'&&a),q.id);
 if(q.type==='match'){assert.equal(new Set(q.pairs.map(p=>p[0])).size,q.pairs.length,q.id);assert.equal(new Set(q.pairs.map(p=>p[1])).size,q.pairs.length,q.id);}
 if(q.type==='sort')assert(q.items.every(p=>Number.isInteger(p[1])&&p[1]>=0&&p[1]<q.bins.length),q.id);
 if(q.type==='edit')assert(q.bad>=0&&q.bad<q.tokens.length,q.id);
 if(q.type==='reading')assert(q.evidence.length&&q.evidence.every(i=>i>=0&&i<q.passage.length),q.id);
}
for(const [word]of u.vocab)assert(qs.some(q=>q.type==='match'&&q.pairs.some(p=>p[0]===word)),`词表遗漏：${word}`);
for(const d of u.days){assert.equal(d.coreIds.length,12);assert(d.coreIds.every(id=>d.questions.some(q=>q.id===id&&!q.optional)));}
for(const [word]of u.vocab)assert.equal(qs.filter(q=>q.word===word).length,1,`拼写入口遗漏或重复：${word}`);
for(let d=1;d<=5;d++)for(let i=1;i<=(d===5?12:16);i++)assert(ids.has(`d${d}q${i}`),'旧题ID未保留');
assert.equal(qs.filter(q=>!q.optional).length,60);
assert.equal(qs.filter(q=>!q.optional&&q.type==='listen').length,4);
assert.equal(qs.filter(q=>!q.optional&&q.type==='write').length,5);
console.log('内容验证通过：147题，60个每日任务、87个选做；24个词条均有认读及拼写；4道基础听力、5次进阶开放表达；原76题ID保留。');

