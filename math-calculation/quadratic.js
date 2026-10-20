(()=>{'use strict';
const $=id=>document.getElementById(id),KEY='math-completing-square-v1',esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const examples=[
{a:1,b:6,c:-7,label:'正系数',roots:[1,-7]},
{a:1,b:-4,c:-5,label:'负系数',roots:[5,-1]},
{a:2,b:-4,c:-6,label:'先化成1',roots:[3,-1]},
{a:1,b:3,c:-1,label:'出现分数',roots:[(-3+Math.sqrt(13))/2,(-3-Math.sqrt(13))/2]},
{a:1,b:4,c:4,label:'两个相同的根',roots:[-2]},
{a:1,b:2,c:3,label:'没有实数根',roots:[]}
];
const questions=[
{a:1,b:2,c:-3,roots:[1,-3]}, {a:1,b:6,c:5,roots:[-1,-5]},
{a:1,b:-6,c:5,roots:[1,5]}, {a:1,b:-2,c:-8,roots:[4,-2]},
{a:2,b:4,c:-6,roots:[1,-3]}, {a:3,b:-6,c:-9,roots:[3,-1]},
{a:1,b:3,c:-1,roots:[(-3+Math.sqrt(13))/2,(-3-Math.sqrt(13))/2]},
{a:1,b:4,c:4,roots:[-2]}
];
let state={version:1,current:0,records:{}},geo=0,ex=0,exStep=0,pStep=0,pShow=false;
try{const s=JSON.parse(localStorage.getItem(KEY));if(s?.version===1&&s.records&&typeof s.records==='object'&&!Array.isArray(s.records))state={...state,...s};}catch{}
if(!Number.isInteger(state.current)||state.current<0||state.current>=questions.length)state.current=0;
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{toast('记录未能保存，请先导出。');}}
function toast(t){$('toast').textContent=t;$('toast').style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').style.display='none',3200);}
function f(n){if(Math.abs(n)<1e-12)return '0';if(Number.isInteger(n))return String(n).replace('-','−');for(let d=2;d<=100;d++){const k=Math.round(n*d);if(Math.abs(n*d-k)<1e-9)return `${String(k).replace('-','−')}/${d}`;}return String(n);}
function term(n,suffix,first=false){if(!n)return '';const sign=n<0?'−':first?'':'+';return `${sign} ${Math.abs(n)===1&&suffix?'':f(Math.abs(n))}${suffix}`.trim();}
function eq(q){return [term(q.a,'x²',true),term(q.b,'x'),term(q.c,'')].filter(Boolean).join(' ')+' = 0';}
function square(h){return h===0?'x²':`(x ${h<0?'−':'+'} ${f(Math.abs(h))})²`;}
function rootExpr(d){const n=Math.sqrt(d);if(Math.abs(n-Math.round(n))<1e-10)return f(Math.round(n));for(let den=2;den<=10;den++){if(Number.isInteger(d*den*den))return `√${d*den*den}/${den}`;}return `√(${f(d)})`;}
function rootText(q){if(!q.roots.length)return '没有实数根';if(q.roots.length===1)return `x₁ = x₂ = ${f(q.roots[0])}`;if(q.b===3&&q.a===1&&q.c===-1)return 'x₁ = (−3 + √13)/2，x₂ = (−3 − √13)/2';return `x₁ = ${f(q.roots[0])}，x₂ = ${f(q.roots[1])}`;}
function steps(q){const b=q.b/q.a,h=b/2,k=-q.c/q.a,d=k+h*h;const left=`x² ${term(b,'x')}`;const arr=[];
 if(q.a!==1)arr.push({name:'二次项系数化成1',math:`方程两边同时除以 ${q.a}：x² ${term(b,'x')} ${term(q.c/q.a,'')} = 0`,note:'每一项都要除，包括右边的0。之后再看新的一次项系数。'});
 arr.push({name:'常数项移到右边',math:`${left} = ${f(k)}`,note:'移项变号；左边只留下含x的项。'});
 arr.push({name:'找出要补的数',math:`一次项系数：${f(b)} → 一半：${f(h)} → 平方：(${f(h)})² = ${f(h*h)}`,note:'先除以2，再平方；一次项系数为负数时，补的平方仍然非负。'});
 arr.push({name:'左右两边同时加',math:`${left} + ${f(h*h)} = ${f(k)} + ${f(h*h)}`,note:'只给左边加一个数，会改变方程。左右两边必须一起加。'});
 arr.push({name:'左边写成完全平方',math:`${square(h)} = ${f(d)}`,note:`展开${square(h)}，中间项应该是${f(b)}x，常数项应该是${f(h*h)}。`});
 if(d<0){arr.push({name:'判断是否有实数根',math:`${square(h)} ≥ 0，但右边 ${f(d)} < 0`,note:'实数的平方不可能是负数，所以这个方程没有实数根。'});return arr;}
 arr.push({name:'两边开平方',math:`x ${h<0?'−':'+'} ${f(Math.abs(h))} = ${d===0?'0':'± '+rootExpr(d)}`,note:d===0?'右边为0时，得到两个相等的实数根。':'右边大于0，开平方要保留正、负两种情况。'});
 arr.push({name:'分别求根并检查',math:rootText(q),note:'把两个根分别代入原方程，检查是否成立；两个相同的根只需验算一次。'});return arr;
}
function drawGeo(){const texts=[['原来有两块面积','一块是x²，另一块是6x。现在还没有拼成正方形。'],['把6x分成两个3x','分别摆在右边和下边。右下角缺了一个3×3的小正方形。'],['补上面积9','所以 x² + 6x + 9 = (x + 3)²。一次项系数6的一半是3，再平方得到9。'],['回到方程两边','若 x² + 6x = 7，两边同时加9，就得到 (x + 3)² = 16。']];
 $('diagram').innerHTML=`<svg viewBox="0 0 420 370" role="img" aria-label="${texts[geo].join('。')}"><rect x="35" y="45" width="160" height="160" fill="#e0ebc8" stroke="#7b9560"/><text x="103" y="134">x²</text>${geo===0?'<rect x="207" y="45" width="180" height="160" fill="#c6dfcb" stroke="#668f72"/><text x="282" y="134">6x</text>':'<rect x="195" y="45" width="90" height="160" fill="#c6dfcb" stroke="#668f72"/><text x="228" y="134">3x</text><rect x="35" y="205" width="160" height="90" fill="#c6dfcb" stroke="#668f72"/><text x="103" y="258">3x</text><rect x="195" y="205" width="90" height="90" fill="'+(geo>=2?'#ecd597':'none')+'" stroke="#b7984d" stroke-dasharray="'+(geo>=2?'0':'6 5')+'"/><text x="230" y="258">'+(geo>=2?'9':'？')+'</text><text x="105" y="32">x</text><text x="235" y="32">3</text><text x="302" y="132">x</text><text x="302" y="256">3</text>'}${geo===3?'<text x="57" y="338">x² + 6x + 9 = (x + 3)²</text>':''}</svg>`;
 $('diagramText').innerHTML=`<b>${geo+1} / 4 · ${texts[geo][0]}</b><p>${texts[geo][1]}</p>`;$('geoPrev').disabled=geo===0;$('geoNext').disabled=geo===3;}
function stepHTML(s,i){return `<div class="workedStep"><b>${i+1} · ${s.name}</b><div class="formula">${s.math}</div><p>${s.note}</p></div>`;}
function drawExample(){const q=examples[ex],ss=steps(q);$('exampleTabs').innerHTML=examples.map((v,i)=>`<button data-ex="${i}" class="${ex===i?'active':''}">${v.label}</button>`).join('');document.querySelectorAll('[data-ex]').forEach(b=>b.onclick=()=>{ex=Number(b.dataset.ex);exStep=0;drawExample();});$('exampleEquation').textContent=eq(q);$('exampleSteps').innerHTML=ss.slice(0,exStep).map(stepHTML).join('')+`<p class="exampleCounter">已展开 ${exStep} / ${ss.length} 步</p>`;$('examplePrev').disabled=exStep===0;$('exampleNext').disabled=exStep===ss.length;}
// 输入只支持数字、四则运算和平方根，不执行输入代码。
function numeric(raw){let s=String(raw).trim().toLowerCase().replace(/根号|sqrt/g,'√').replace(/[\s]/g,'').replace(/[−–—－]/g,'-').replace(/[×·]/g,'*').replace(/÷/g,'/').replace(/（/g,'(').replace(/）/g,')');if(!s||s.length>100||/[^0-9.√+*/()\-]/.test(s))throw Error('请用数字、分数或根式填写。');let i=0;
 function atom(){if(s[i]==='+'){i++;return atom();}if(s[i]==='-'){i++;return -atom();}if(s[i]==='√'){i++;const n=atom();if(n<0)throw Error('平方根内不能是负数');return Math.sqrt(n);}if(s[i]==='('){i++;const n=sum();if(s[i++]!==')')throw Error('括号不配对');return n;}const m=s.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);if(!m)throw Error('请检查输入格式');i+=m[0].length;return Number(m[0]);}
 function product(){let n=atom();while(i<s.length){const c=s[i];if(c==='*'||c==='/'){i++;const b=atom();n=c==='*'?n*b:n/b;}else if(c==='√'||c==='(')n*=atom();else break;}return n;}
 function sum(){let n=product();while(s[i]==='+'||s[i]==='-'){const c=s[i++],b=product();n=c==='+'?n+b:n-b;}return n;}
 const n=sum();if(i!==s.length||!Number.isFinite(n))throw Error('请检查输入格式');return n;}
const close=(a,b)=>Math.abs(a-b)<1e-9;
function expected(q){const h=q.b/q.a/2,k=-q.c/q.a;return[k,h,h*h,k+h*h,...q.roots];}
function grade(q,values){const exp=expected(q),nums=values.map(numeric),flags=nums.slice(0,4).map((v,i)=>close(v,exp[i]));const given=nums.slice(4).sort((a,b)=>a-b),roots=q.roots.slice().sort((a,b)=>a-b),ok=given.length===roots.length&&given.every((v,i)=>close(v,roots[i]));return[...flags,...q.roots.map(()=>ok)];}
function record(){return state.records[state.current]||(state.records[state.current]={draft:[],help:false});}
function drawPractice(){const q=questions[state.current],r=record(),labels=['移项后，右边的数','一次项系数的一半','左右两边都要补的数','配方后，右边的数',q.roots.length===1?'方程的根（重根填一次）':'第一个根','另一个根'];
 $('practiceNav').innerHTML=questions.map((q,i)=>`<button data-p="${i}" class="${i===state.current?'active':''}" aria-label="第${i+1}题">${i+1}${state.records[i]?.first?' ✓':''}</button>`).join('');document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{state.current=Number(b.dataset.p);pStep=0;pShow=false;save();drawPractice();});
 $('practiceCard').innerHTML=`<div class="exerciseMeta"><span class="phase">${state.current<4?'基础练习':state.current<6?'先化二次项系数':'进阶 / 特殊情况'}</span><span>配套自编 · 第${state.current+1}题</span></div><div class="formula">${eq(q)}</div>${q.a!==1?'<p class="muted">本题先把二次项系数化成1，再填写下面的过程。</p>':''}<div class="practiceGrid">${labels.slice(0,q.roots.length+4).map((l,i)=>`<label>${i+1}. ${l}<input id="field${i}" autocomplete="off" aria-label="${l}" value="${esc(r.draft[i]||'')}"><span class="fieldHint">${i===0?'移项前先确认二次项系数是1。':i===2?'将上一步的数平方。':i===4?'例如：(−3+√13)/2':'可输入分数，如 3/2。'}</span></label>`).join('')}</div><div class="actions"><button id="checkPractice" class="primary">${r.first?'检查订正':'检查配方过程'}</button><button id="showPracticeSteps">${pShow?'收起本题解析':'本题分步解析'}</button><button id="nextPractice">${state.current===7?'回到第一题':'下一题 →'}</button></div>${r.first?`<div class="firstLabel">首次检查：${r.first.flags.every(Boolean)?'整题正确':'还需检查'}${r.first.help?'（已参考本题解析）':''}。首次记录已保留，后续检查记为订正。</div>`:''}<div id="checks"></div><div id="practiceSolution"></div>`;
 const fields=labels.slice(0,q.roots.length+4).map((_,i)=>$('field'+i));fields.forEach((e,i)=>e.oninput=()=>{r.draft[i]=e.value;save();});
 $('checkPractice').onclick=()=>{const values=fields.map(e=>e.value.trim());if(values.some(s=>!s)){toast('先把配方过程和方程的根填完整。');return;}let flags;try{flags=grade(q,values);}catch(e){toast(e.message);return;}r.draft=values.slice();r.latest=flags;if(!r.first)r.first={values:values.slice(),flags:flags.slice(),help:r.help};save();fields.forEach((e,i)=>e.setAttribute('aria-invalid',String(!flags[i])));drawPractice();};
 $('showPracticeSteps').onclick=()=>{pShow=!pShow;pStep=0;if(pShow&&!r.first){r.help=true;save();}drawPractice();};$('nextPractice').onclick=()=>{state.current=(state.current+1)%8;pStep=0;pShow=false;save();drawPractice();};
 if(r.latest){$('checks').innerHTML=r.latest.map((v,i)=>`<div class="${v?'':'bad'}">${v?'✓':'待检查'} · ${labels[i]}${!v?'：'+['检查移项变号；二次项系数是否已经化成1。','看清新的一次项系数，再除以2，负号保留。','用一次项系数的一半，再平方。','右边原来的数也要加上补的数。','开平方保留正负；两个根可以交换顺序。','检查是否漏掉负根，两个根可以交换顺序。'][i]:''}</div>`).join('');}
 if(pShow){const ss=steps(q);$('practiceSolution').innerHTML=ss.slice(0,pStep).map(stepHTML).join('')+`<p class="exampleCounter">本题解析 ${pStep} / ${ss.length}</p><div class="actions"><button id="pPrev" ${pStep===0?'disabled':''}>上一步</button><button id="pNext" ${pStep===ss.length?'disabled':''}>下一步</button></div>`;$('pPrev').onclick=()=>{pStep--;drawPractice();};$('pNext').onclick=()=>{pStep++;drawPractice();};}
 const rs=Object.values(state.records).filter(r=>r.first),firstOK=rs.filter(r=>r.first.flags.every(Boolean)).length,corrected=rs.filter(r=>!r.first.flags.every(Boolean)&&r.latest?.every(Boolean)).length;$('practiceSummary').textContent=`已检查 ${rs.length} / 8 题 · 首次全对 ${firstOK} 题 · 订正后全对 ${corrected} 题。重点看是移项、配方还是求根这一步需要继续练。`;
}
$('geoPrev').onclick=()=>{geo--;drawGeo();};$('geoNext').onclick=()=>{geo++;drawGeo();};$('geoReset').onclick=()=>{geo=0;drawGeo();};$('examplePrev').onclick=()=>{exStep--;drawExample();};$('exampleNext').onclick=()=>{exStep++;drawExample();};$('exampleReset').onclick=()=>{exStep=0;drawExample();};
$('exportQuadratic').onclick=()=>{const u=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download='配方法-练习记录.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};
window.QuadraticCheck={questions,examples,expected,grade,numeric,steps,eq};drawGeo();drawExample();drawPractice();
})();
