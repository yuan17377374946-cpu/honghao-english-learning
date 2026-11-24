/* Bounded symbolic arithmetic. No eval, Function, or numerical spot checks. */
(function(root){
const clean=p=>{for(const k in p)if(Math.abs(p[k])<1e-10)delete p[k];return p;};
const add=(a,b,s=1)=>{const r={...a};for(const k in b)r[k]=(r[k]||0)+s*b[k];return clean(r);};
function mul(a,b){const r={};for(const i in a)for(const j in b){const k=(i+j).split('').sort().join('');if(k.length>12)throw Error('式子太复杂');r[k]=(r[k]||0)+a[i]*b[j];}if(Object.keys(r).length>150)throw Error('式子太复杂');return clean(r);}
const val=n=>({p:n===0?{}:{'':n},d:{'':1}});
const combine=(a,b,op)=>{if(op==='+')return{p:add(mul(a.p,b.d),mul(b.p,a.d)),d:mul(a.d,b.d)};if(op==='-')return{p:add(mul(a.p,b.d),mul(b.p,a.d),-1),d:mul(a.d,b.d)};if(op==='*')return{p:mul(a.p,b.p),d:mul(a.d,b.d)};if(!Object.keys(b.p).length)throw Error('不能除以0');return{p:mul(a.p,b.d),d:mul(a.d,b.p)};};
function normalize(s){return String(s).normalize('NFKC').toLowerCase().replace(/[−–—﹣]/g,'-').replace(/[×·⋅]/g,'*').replace(/[÷]/g,'/').replace(/\s/g,'').replace(/²/g,'^2').replace(/³/g,'^3').replace(/[【\[]/g,'(').replace(/[】\]]/g,')');}
function parse(input,allowed=null){let s=normalize(input); // NFKC transforms superscripts; restore before normalization instead.
 s=normalize(String(input).replace(/²/g,'^2').replace(/³/g,'^3'));
 if(/^[a-z]=/.test(s))s=s.slice(2);
 if(!s||s.length>160||/[^0-9a-z+*/().^\-]/.test(s))throw Error('请只填写数字、字母和运算符');
 const raw=s.match(/(?:\d+(?:\.\d*)?|\.\d+)|[a-z]|[+*/().^\-]/g)||[];let t=[];
 for(const token of raw){const last=t[t.length-1];if(last&&(/[a-z0-9)]$/.test(last))&&(/^[a-z(]/.test(token)||(/^\d|^\./.test(token)&&/[a-z)]$/.test(last))))t.push('*');t.push(token);}
 let i=0,depth=0;const isVar=x=>/^[a-z]$/.test(x||'');
 function primary(){if(++depth>40)throw Error('括号太多');let r;const x=t[i++];if(x==='('){r=sum();if(t[i++]!==')')throw Error('请补全括号');}else if(isVar(x)){if(allowed&&!allowed.includes(x))throw Error('请使用题目指定的字母');r={p:{[x]:1},d:{'':1}};}else if(x&&/^(\d|\.)/.test(x)){const n=Number(x);if(!Number.isFinite(n)||n>1e9)throw Error('数字太大');r=val(n);}else throw Error('式子没有写完整');depth--;return r;}
 function power(){let r=primary();if(t[i]==='^'){i++;const sign=t[i]==='-'?-1:1;if(sign===-1)i++;const exp=Number(t[i++]);if(!Number.isInteger(exp)||exp<0||exp>4||sign===-1)throw Error('这里只支持0至4次方');let out=val(1);for(let n=0;n<exp;n++)out=combine(out,r,'*');r=out;}return r;}
 function unary(){if(t[i]==='+'){i++;return unary();}if(t[i]==='-'){i++;return combine(val(-1),unary(),'*');}return power();}
 function product(){let r=unary();while(t[i]==='*'||t[i]==='/'){const op=t[i++];r=combine(r,unary(),op);}return r;}
 function sum(){let r=product();while(t[i]==='+'||t[i]==='-'){const op=t[i++];r=combine(r,product(),op);}return r;}
 const r=sum();if(i!==t.length)throw Error('请检查运算符和括号');if(!Object.keys(r.d).length)throw Error('分母不能为0');return r;}
function equalExpr(input,expected){try{const letters=[...new Set(normalize(expected).match(/[a-z]/g)||[])];const a=parse(input,letters),b=parse(expected,letters);if(Object.keys(a.d).some(k=>k!=='')&&!Object.keys(b.d).some(k=>k!==''))return{correct:false,message:'请检查除数：这个式子应对题目允许的字母取值都成立'};const diff=add(mul(a.p,b.d),mul(b.p,a.d),-1);const scale=Math.max(1,...Object.values(mul(a.p,b.d)).map(Math.abs),...Object.values(mul(b.p,a.d)).map(Math.abs));return{correct:Object.values(diff).every(v=>Math.abs(v)<=1e-8*scale)};}catch(e){return{correct:false,message:e.message};}}
function numeric(input){const r=parse(input,[]);if(Object.keys(r.p).some(k=>k!=='')||Object.keys(r.d).some(k=>k!==''))throw Error('请填写计算结果');return(r.p['']||0)/(r.d['']||0);}
function grade(q,answers){return q.tasks.map((t,i)=>{const answer=answers[i];let r;
 if(t.type==='choice')r={correct:String(answer)===t.expected};
 else if(t.type==='order')r={correct:Array.isArray(answer)&&JSON.stringify(answer)===JSON.stringify(t.expected)};
 else if(t.type==='select'){const a=Array.isArray(answer)?[...answer].map(Number).sort((a,b)=>a-b):[];r={correct:JSON.stringify(a)===JSON.stringify([...t.expected].sort((a,b)=>a-b))};}
 else if(t.type==='match'){const details=t.expected.map((x,j)=>Number(answer?.[j])===x&&answer?.[j]!==undefined&&answer?.[j]!==null);r={correct:details.every(Boolean),details};if(!r.correct)r.message='再检查第'+details.map((ok,j)=>!ok?j+1:null).filter(x=>x!==null).join('、')+'组配对。';}
 else if(t.type==='expr')r=equalExpr(answer??'',t.expected);
 else try{r={correct:Math.abs(numeric(answer??'')-Number(t.expected))<=1e-8*Math.max(1,Math.abs(Number(t.expected)))};}catch(e){r={correct:false,message:e.message};}
 if(!r.correct&&!r.message)r.message=t.feedback||'再对照题意检查这一问。';return r;
 });}
function snapshot(q){const r={table:null,diagram:null,values:{}};for(const k of ['id','day','title','story','tasks','hint','work','map','diagram','table','values','mode','revision','independent'])if(q[k]!==undefined)r[k]=q[k];return JSON.parse(JSON.stringify(r));}
function migrate(state,data){if((state.bankRevision||1)>=(data.revision||1))return state;const old=Object.fromEntries((data.legacyBank||[]).map(q=>[q.id,q]));
 for(const id of Object.keys(state.records||{})){const q=old[id];if(!q)continue;for(const e of [state.records[id]?.first,state.records[id]?.last,state.mistakes?.[id]?.first])if(e&&!e.question)e.question=snapshot(q);}
 for(const session of [state.session,...Object.values(state.savedSessions||{})])if(session?.queue)session.queue.forEach((item,i)=>{const q=old[item.id],next=data.bank.find(q=>q.id===item.id);if(!q||item.question)return;if(i===session.index)item.question=snapshot(item.variant?{...q,...q.variant}:q);else if(i>session.index&&session.mode==='review')item.question=item.variant?snapshot({...next,...next.variant}):(state.mistakes?.[item.id]?.first?.question||snapshot(next));});
 state.bankRevision=data.revision;return state;
}
function fresh(){return{version:1,records:{},mistakes:{},drafts:{},session:null};}
function record(state,qid,answers,results,assisted,mode='main',variant=false){const now=new Date().toISOString(),ok=results.every(x=>x.correct),rec=state.records[qid]||(state.records[qid]={first:null,attempts:0,mastered:false});
 const event={answers:JSON.parse(JSON.stringify(answers)),results:results.map(x=>x.correct),assisted:!!assisted,at:now};rec.attempts++;rec.last=event;
 if(mode!=='review'&&!rec.first)rec.first=event;
 if(mode==='review'){
   const m=state.mistakes[qid];if(m){if(variant)m.variantPassed=ok&&!assisted;else m.originalPassed=ok&&!assisted;
   m.lastAt=now;m.reviewCount=(m.reviewCount||0)+1;if(!ok||assisted){m.pending=true;rec.mastered=false;}else if(m.originalPassed&&m.variantPassed){m.pending=false;rec.mastered=true;}}
 }else if(!ok||assisted){const m=state.mistakes[qid]||(state.mistakes[qid]={first:event,pending:true,originalPassed:false,variantPassed:false,reviewCount:0});m.pending=true;m.originalPassed=false;m.variantPassed=false;m.tags=[...new Set(qid&&results.map((r,i)=>!r.correct?i:null).filter(x=>x!==null))];m.lastAt=now;rec.mastered=false;
 }else if(!state.mistakes[qid]?.pending)rec.mastered=true;
 return{ok,assisted,mastered:rec.mastered};}
function validateState(s,ids){if(!s||s.version!==1||typeof s.records!=='object'||!s.records||Array.isArray(s.records)||typeof s.mistakes!=='object'||!s.mistakes)throw Error('备份格式不正确');const valid=new Set(ids);const r=fresh();for(const id of valid){const rec=s.records[id];if(rec&&typeof rec==='object'&&rec.first&&Array.isArray(rec.first.results)&&typeof rec.first.answers==='object'){r.records[id]=rec;if(s.mistakes[id]&&typeof s.mistakes[id]==='object')r.mistakes[id]=s.mistakes[id];}}return r;}
root.MathQuestLogic={parse,equalExpr,numeric,grade,fresh,record,validateState,snapshot,migrate};if(typeof module!=='undefined')module.exports=root.MathQuestLogic;
})(typeof window!=='undefined'?window:globalThis);
