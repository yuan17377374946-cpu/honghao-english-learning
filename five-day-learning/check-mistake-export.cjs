'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const data={},listeners={};let copied='',downloaded='';
const ctx={window:{},document:{currentScript:{src:'https://example.test/repo/five-day-learning/mistake-export.js'},addEventListener:(name,fn)=>listeners[name]=fn,createElement:()=>({click(){downloaded=this.download;},remove(){}}),body:{append(){}}},localStorage:{getItem:key=>data[key]||null},URL,Blob,navigator:{clipboard:{writeText:async text=>{copied=text;}}},setTimeout(){}};
vm.createContext(ctx);
for(const f of ['question-catalog.js','mistake-export.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8'),ctx);
const api=ctx.window.MistakeExport,cat=ctx.window.QUESTION_CATALOG;
assert.equal(cat.length,207);assert.equal(new Set(cat.map(q=>q.code)).size,207);
assert.equal(new Set(cat.map(q=>q.subject+':'+q.id)).size,207);
assert.equal(api.collect().rows.length,0);
const en=cat.filter(q=>q.subject==='english'&&q.objective),ma=cat.filter(q=>q.subject==='math');
data['miaosang-u4-five-days-v1']=JSON.stringify({answers:{
 [en[0].id]:{everWrong:true,needsReview:true},
 [en[1].id]:{firstCorrect:false,mastered:true,needsReview:false},
 [en[2].id]:{skipped:true,needsReview:true,collected:true},
 [en[3].id]:{done:true,helped:true,firstCorrect:true,needsReview:true},
 [en[4].id]:{done:true,firstCorrect:true,mastered:true},
 [en[5].id]:{draft:{text:'unfinished'}},
 [cat.find(q=>!q.objective).id]:{needsReview:true}
}});
data['math-letter-island-v1']=JSON.stringify({records:{},mistakes:{
 [ma[0].id]:{pending:true,first:{results:[false,true]}},
 [ma[1].id]:{pending:false,first:{results:[false]}},
 [ma[2].id]:{pending:true,first:{results:[false],skipped:true}},
 [ma[3].id]:{pending:true,first:{results:[true],assisted:true}},
 [ma[4].id]:{pending:false,everWrong:true,first:{results:[true],assisted:true}}
}});
let rows=api.collect().rows;assert.equal(rows.length,9);assert.equal(rows.filter(q=>q.wrong).length,5);
assert.equal(api.collect('english').rows.length,4);assert.equal(api.collect('both',true).rows.length,6);
const report=api.textReport();assert(report.includes('答错 5 题'));assert(report.includes('周一'));assert(report.includes('已掌握'));assert(report.includes('暂时跳过'));
for(const q of rows){assert(report.includes('原题ID：'+q.id));assert(report.includes('?question='+q.id));assert(report.includes(q.code));}
assert(!api.textReport('english').includes('原题ID：'+ma[0].id));
assert(api.panel().includes('一键复制错题编号'));
const status={},area={value:'',focus(){},select(){this.selected=true;}},fallback={hidden:true},panel={dataset:{mxSubject:'both'},querySelector:s=>({'[data-mx-filter]':{value:'all'},'[data-mx-status]':status,'[data-mx-text]':area,'[data-mx-fallback]':fallback}[s])};
const click=action=>listeners.click({target:{closest:()=>({dataset:{mx:action},closest:()=>panel})}});
(async()=>{
 await click('copy');assert.equal(copied,api.textReport());assert(status.textContent.includes('已复制'));
 ctx.navigator.clipboard.writeText=async()=>{throw Error('denied');};await click('copy');assert.equal(fallback.hidden,false);assert(area.selected);assert(area.value.includes('E1-'));
 ctx.URL=class extends URL{static createObjectURL(){return 'blob:test';}static revokeObjectURL(){}};await click('download');assert.equal(downloaded,'梦梦-五天闯关-错题编号.txt');
 data['miaosang-u4-five-days-v1']='broken';assert(api.collect().error);assert(api.textReport().includes('部分记录无法读取'));
 console.log('PASS: both subjects, 207 unique codes, correct/unanswered exclusion, history/mastery, skips/help separated, links, pending filter, copy success/fallback, TXT, invalid storage.');
})().catch(e=>{console.error(e);process.exitCode=1;});
