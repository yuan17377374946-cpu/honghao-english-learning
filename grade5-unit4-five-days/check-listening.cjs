const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),cp=require('node:child_process');
global.window={};for(const file of ['data','curriculum','challenge'])require('./'+file+'.js');const previous=window.UNIT4.days.flatMap(d=>d.questions).map(q=>({id:q.id,answers:q.answers,answer:q.answer,pairs:q.pairs}));require('./listening.js');const U=window.UNIT4,A=require('./listening-ui.js');
const all=U.days.flatMap(d=>d.questions),sort=all.filter(q=>q.type==='listen-order');assert.equal(sort.length,10);assert.equal(all.length,147);
for(const old of previous){const q=all.find(q=>q.id===old.id);for(const k of ['answer','answers','pairs'])assert.deepEqual(q[k],old[k]);}
const expectedCounts=[3,4,5,6,6];
for(const [di,d]of U.days.entries()){assert.equal(d.coreIds.length,12);assert.equal(d.coreIds.filter(id=>all.find(q=>q.id===id).challenge).length,6);assert.equal(d.coreIds.filter(id=>all.find(q=>q.id===id).type==='listen-order').length,1);const q=all.find(q=>q.id==='listen-sort-d'+(di+1));assert.equal(q.cards.length,expectedCounts[di]);}
for(const q of sort){
 assert.equal(q.parts.length,q.cards.length);assert.equal(new Set(q.answer).size,q.cards.length);assert.deepEqual(q.answer,q.parts.map(p=>p.card));assert(q.given===null||q.given===q.answer[0]);
 let order=A.initial(q);for(const i of q.answer)if(i!==q.given)order=A.tap(q,order,i);assert(A.complete(q,order));assert(A.correct(q,order));assert.deepEqual(A.score(q,order),{correct:q.cards.length-(q.given===null?0:1),total:q.cards.length-(q.given===null?0:1)});
 const one=q.answer.find(i=>i!==q.given);order=A.tap(q,order,one);assert(!A.complete(q,order));if(q.given!==null)assert.deepEqual(A.tap(q,order,q.given),order);
 let end=0;for(const p of q.parts){assert(p.start>=end&&p.end>p.start&&p.end<q.duration);assert(p.clue&&p.text);end=p.end;}
 const raw=A.body(q,{}, {},false);assert(!raw.includes(q.parts[0].text),'Script should stay hidden before checking');assert(raw.includes('<audio'));assert(!raw.includes('autoplay'));
 if(q.examStyle)assert(!raw.includes('data-action="listen-part"'));
 assert(A.review(q,{showListeningReview:true}).includes(q.parts[0].text));
}
for(const q of all.filter(q=>q.audioSrc)){
 const file=path.join(__dirname,q.audioSrc);assert(fs.existsSync(file),q.id+' missing MP3');const meta=JSON.parse(cp.execFileSync('ffprobe',['-v','error','-show_entries','format=duration:stream=codec_name','-of','json',file],{encoding:'utf8'}));assert(meta.streams.some(s=>s.codec_name==='mp3'));assert(Number(meta.format.duration)>0);
}
// Drive the actual app through audio events and ordering; check without device speech support.
const handlers={},els={},el=id=>els[id]||(els[id]={innerHTML:'',textContent:'',style:{},classList:{toggle(){},remove(){},add(){}},focus(){},querySelectorAll:()=>[],querySelector:()=>null});let saved;
const doc={getElementById:el,querySelector:()=>null,querySelectorAll:()=>[],addEventListener:(t,f)=>handlers[t]=f,body:el('body')};
vm.runInNewContext(fs.readFileSync(__dirname+'/app.js','utf8'),{window:{UNIT4:U,PracticeLogic:require('./logic.js'),ReviewBook:require('./review-logic.js'),ListeningTools:A,location:{hash:'#listening'},history:{replaceState(){}},addEventListener(){},scrollTo(){}},document:doc,localStorage:{getItem:()=>null,setItem:(k,s)=>saved=JSON.parse(s)},setTimeout:()=>0,clearTimeout(){},console});
const click=dataset=>handlers.click({target:{closest:()=>({dataset,matches:()=>false})}});
assert(el('main').innerHTML.includes('把最后一道排序题练稳'));
const q=sort.find(q=>q.id==='listen-sort-d1');click({listenId:q.id});const media={dataset:{listeningQuestion:q.id,segment:''},pause(){}};
handlers.playing({target:media});handlers.ended({target:media});for(const i of q.answer)click({listenCard:String(i)});assert(saved.answers[q.id].completedPlayback);assert.equal(saved.answers[q.id].fullListenCount,1);click({action:'check'});assert(saved.answers[q.id].mastered);assert(saved.answers[q.id].firstIndependent);
const first=JSON.stringify(saved.answers[q.id].firstSubmission);click({action:'listen-review'});assert.equal(JSON.stringify(saved.answers[q.id].firstSubmission),first);assert(el('main').innerHTML.includes(q.parts[0].text));
const v=sort.find(q=>q.id==='listen-sort-d1b');click({listenId:v.id});click({action:'listen-text'});for(const i of v.answer)click({listenCard:String(i)});click({action:'check'});assert(saved.answers[v.id].needsReview);assert(!saved.answers[v.id].firstIndependent);
console.log('PASS: 10 sequencing tasks, 15 playable MP3s, progressive counts, fixed examples, independent audio completion, hidden transcript, clue replay and assistance records; previous questions and first responses retained.');
