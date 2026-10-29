const fs=require('fs'),vm=require('vm'),assert=require('assert');
const data=JSON.parse(fs.readFileSync(__dirname+'/dist/data.json','utf8'));
const app=fs.readFileSync(__dirname+'/dist/app.js','utf8');
const nodes={},events={},disk={};
function node(id){return nodes[id]||=( {textContent:'',innerHTML:'',value:'',style:{},setAttribute(){},click(){}} )}
node('#app-data').textContent=JSON.stringify(data);
const ctx=vm.createContext({console,JSON,Date,Math,Blob,URL,Set,Number,String,Object,Array,clearTimeout,setTimeout:()=>1,location:{hash:''},history:{replaceState(){}},window:{scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>disk[k],setItem:(k,v)=>disk[k]=v},document:{querySelector:node,getElementById:id=>node('#'+id),addEventListener:(name,fn)=>events[name]=fn,documentElement:{style:{setProperty(){}}},createElement:()=>node('link')}});
vm.runInContext(app,ctx);
const run=s=>vm.runInContext(s,ctx);
const click=(action,extras={})=>events.click({target:{closest:()=>({disabled:false,dataset:{action,...extras}})}});
assert.equal(run('allItems().length'),102);
for(const tab of ['start','transform','words','listen','read','practice','review']){click('tab',{id:tab});assert(!node('#content').innerHTML.includes('undefined'),tab+' undefined');assert(node('#content').innerHTML.length>200,tab+' empty')}
for(const route of ['be','modal','do'])for(let i=0;i<20;i++){run(`state.route='${route}';state.ex=${i};state.step=2`);const html=run('renderTransform()');assert(html.includes('特殊疑问句'));assert(!html.includes('undefined'));}
for(let i=0;i<data.wh.length;i++){run(`state.wh=${i}`);assert(run('renderWords()').includes(data.wh[i].q))}
// Every complete, correct response should record success, across all 102 questions.
run("state.tab='listen'");
for(let i=0;i<data.listening.length;i++){const q=data.listening[i];run(`state.lid=${i}`);click('listen-type',{value:q.type});click('listen-kind',{value:q.kind});click('listen-choice',{index:String(q.answer)});click('listen-check');assert.equal(run(`state.records['${q.id}'].lastCorrect`),true);}
// Transcript can be hidden again after submission.
click('listen-text');assert(!node('#content').innerHTML.includes('class="transcript en"'));click('listen-text');assert(node('#content').innerHTML.includes('class="transcript en"'));
run("state.tab='read'");
for(let ri=0;ri<data.readings.length;ri++)for(let qi=0;qi<4;qi++){const q=data.readings[ri].questions[qi];run(`state.rid=${ri};state.rq=${qi}`);click('read-choice',{index:String(q[3])});click('read-check');assert.equal(run(`state.records['r${ri+1}q${qi+1}'].lastCorrect`),true);assert(node('#content').innerHTML.includes('line evidence'));}
click('read-evidence');assert(!node('#content').innerHTML.includes('line evidence'));
run("state.tab='practice'");
for(const typ of ['choice','order','fix','produce']){const list=data.practice.filter(q=>q.type===typ);click('filter',{id:typ});for(let i=0;i<list.length;i++){const q=list[i];click('practice-jump',{index:String(i)});if(typ==='choice')click('practice-choice',{index:String(q.answer)});else if(typ==='order')for(let j=0;j<q.chunks.length;j++)click('pick',{index:String(j)});else events.input({target:{id:'written',value:q.model}});click('practice-check');assert.equal(run(`state.records['${q.id}'].lastCorrect`),true,q.id)}}
assert.equal(run('Object.keys(state.records).length'),102);assert.equal(node('#rail-progress').textContent,'102 / 102 题已作答');assert.equal(node('#rail-bar').style.width,'100%');
// Wrong-answer recovery and review routing must work, with previous wrong retained as history.
click('filter',{id:'choice'});click('practice-retry');click('practice-choice',{index:'1'});click('practice-check');assert.equal(run("state.records.c1.lastCorrect"),false);click('tab',{id:'review'});assert(node('#content').innerHTML.includes('___ he at home?'));click('review-open',{id:'c1'});assert.equal(run('state.tab'),'practice');assert.equal(run('state.pid'),0);click('practice-choice',{index:'0'});click('practice-check');assert.equal(run("state.records.c1.lastCorrect"),true);assert.equal(run("state.records.c1.wrongEver"),true);
// Device voice absence has an explicit fallback; written answers survive navigation within a session.
click('speak',{text:'Hello',slow:'false'});assert(node('#toast').textContent.includes('暂无英语语音'));
click('filter',{id:'produce'});click('practice-retry');events.input({target:{id:'written',value:'WHERE DOES HE LIVE'}});click('practice-check');assert.equal(run('scratch.p1.correct'),true);
assert(disk['honghao-questions-v1']);assert.equal(JSON.parse(disk['honghao-questions-v1']).records.p1.lastCorrect,true);
console.log('PASS: all 60 example groups, 7 views, 102 correct submissions, wrong-answer recovery, transcript/evidence toggles, storage, voice fallback, input normalization.');
