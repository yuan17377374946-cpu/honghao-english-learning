const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
global.window={};for(const f of ['data.js','curriculum.js','challenge.js'])require('./'+f);
const U=window.UNIT4,handlers={},els={},el=id=>els[id]||(els[id]={innerHTML:'',textContent:'',style:{},classList:{toggle(){},remove(){}},focus(){},querySelectorAll:()=>[]});let saved;
vm.runInNewContext(fs.readFileSync(__dirname+'/app.js','utf8'),{window:{UNIT4:U,PracticeLogic:require('./logic.js'),ReviewBook:require('./review-logic.js'),location:{hash:'#day-2'},history:{replaceState(){}},addEventListener(){},scrollTo(){}},document:{getElementById:el,querySelectorAll:()=>[],querySelector:()=>null,addEventListener:(t,f)=>handlers[t]=f,body:el('body')},localStorage:{getItem:()=>null,setItem:(k,s)=>saved=JSON.parse(s)},setTimeout:()=>0,clearTimeout(){},console});
const click=dataset=>handlers.click({target:{closest:()=>({dataset,matches:()=>false})}});
const input=(id,dataset,value)=>handlers.input({target:{id,dataset,value,classList:{remove(){}}}});
click({action:'start-challenge'});assert(el('main').innerHTML.includes('第 1 / 6 关'));
input('',{field:'0'},'are going to clean');click({action:'skip'});
assert(saved.answers['deep-e2-1'].needsReview);assert.equal(saved.answers['deep-e2-1'].firstCorrect,undefined);assert.equal(saved.answers['deep-e2-1'].draft.fields[0],'are going to clean');assert(el('main').innerHTML.includes('第 2 / 6 关'));
input('answer-input',{},'She is going to learn to swim next month.');click({action:'check'});assert(saved.answers['deep-e2-2'].mastered);
click({reviewId:'deep-e2-1'});['are going to clean','is going to learn','am going to make'].forEach((v,i)=>input('',{field:String(i)},v));click({action:'check'});assert(saved.answers['deep-e2-1'].mastered);assert.equal(saved.answers['deep-e2-1'].firstSubmission.skipped,true);
click({day:'1'});const di=U.days[1].questions.findIndex(q=>q.id==='deep-e2-6');click({qindex:String(di)});input('write-input',{},'I am not going to read at the library.');click({action:'skip'});assert.equal(saved.answers['deep-e2-6'].done,false);assert.equal(saved.answers['deep-e2-6'].draft.text,'I am not going to read at the library.');
console.log('PASS: direct challenge entry, partial skip, preserved first response, independent review, and unfinished writing draft survive the full UI event flow.');
// Finishing the challenge lane must not force the student back through warm-ups.
for(const q of U.days[1].questions.filter(q=>q.challenge&&q.type!=='write')){click({day:'1'});click({qindex:String(U.days[1].questions.indexOf(q))});click({action:'skip'});}
click({day:'1'});click({qindex:String(di)});input('write-input',{},'I am not going to read at the library on Saturday. I am going to read at home on Saturday.');
const write=U.days[1].questions[di];write.checks.forEach((_,i)=>handlers.change({target:{dataset:{check:String(i)},checked:true}}));click({action:'check'});
click({day:'1'});click({action:'start-challenge'});assert(el('main').innerHTML.includes('六个进阶，完成！'));assert(el('main').innerHTML.includes('按需补练热身'));
console.log('PASS: challenge completion is distinct from the full-day total and does not require repeating warm-ups.');
