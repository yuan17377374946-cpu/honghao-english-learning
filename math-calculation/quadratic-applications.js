(()=>{'use strict';
const Q=window.SQUARE_APPLICATIONS,A=window.QuadraticCheck,$=id=>document.getElementById(id),f=A.f;
let current=0,part=0,step=0,show=false;
const coefficient=n=>n===1?'':f(n).includes('/')?'('+f(n)+')':f(n);
const cost=q=>`${coefficient(q.a)}x² + ${q.b}x + ${q.c}`;
const squareTerm=(a,x)=>`${coefficient(a)}${x}²`;
function tasks(q){return [
 `根据表中数据，求收入y与${q.count}x的函数关系式，并计算当x = ${q.given}时，${q.object}的收入为多少元？`,
 `当收入等于成本时，${q.object}达到收支平衡。求此时x的值，并写出收支平衡时收入y与x满足的关系式。`,
 `经营方案调整后，${q.price}提高，收入与数量的关系调整为y = mx，成本关系保持不变。已知当数量为${q.target}${q.unit}时，净收益（收入−成本）取得最大值，求符合条件的m值，并说明理由。`
 ];}
function worked(q,part){const h=(q.p-q.b)/(2*q.a),constant=q.c/q.a,d=h*h-constant,m=q.b+2*q.a*q.target,max=q.a*q.target*q.target-q.c;
 if(part===0)return [
 {name:'看表格，确定函数类型',math:`${q.p} ÷ 1 = ${q.p}；${2*q.p} ÷ 2 = ${q.p}；各组 y/x = ${q.p}`,note:`每增加1${q.unit}，收入增加${q.p}元，按本题模型，收入与数量成正比例。`},
 {name:'设正比例函数，求系数',math:`设 y = kx；代入 x = 1，y = ${q.p}：k = ${q.p}`,note:'这里没有额外固定收入，用正比例函数y=kx表示。'},
 {name:'写出关系式并代入',math:`y = ${q.p}x；x = ${q.given}时，y = ${q.p} × ${q.given} = ${q.p*q.given}（元）`,note:`答：收入与数量的关系式为y = ${q.p}x，此时收入${q.p*q.given}元。`}
 ];
 if(part===1)return [
 {name:'把收支平衡翻译成等式',math:`${q.p}x = ${cost(q)}`,note:'收支平衡就是收入等于成本，也就是净收益为0。'},
 {name:'移项，整理为一元二次方程',math:`${coefficient(q.a)}x² − ${q.p-q.b}x + ${q.c} = 0`,note:'所有项移到一边，再合并同类项。'},
 {name:'二次项系数化成1，再移常数',math:`x² − ${f(2*h)}x + ${f(constant)} = 0 → x² − ${f(2*h)}x = −${f(constant)}`,note:`方程两边的每一项都除以${f(q.a)}；常数项移到右边要变号。`},
 {name:'取一次项系数的一半，再平方',math:`−${f(2*h)} ÷ 2 = −${f(h)}；(−${f(h)})² = ${f(h*h)}`,note:'括号内带负号，但需要补的平方数为正数。'},
 {name:'两边同时补数',math:`x² − ${f(2*h)}x + ${f(h*h)} = −${f(constant)} + ${f(h*h)} = ${f(d)}`,note:'左右两边都加同一个数，才能保证方程的解不变。'},
 {name:'配成平方并开方',math:`(x − ${f(h)})² = ${f(d)} → x − ${f(h)} = ±${f(Math.sqrt(d))}`,note:'右边大于0，开平方时正负两种情况都要保留。'},
 {name:'求两个根，结合实际解释',math:`x = ${f(h)} ± ${f(Math.sqrt(d))}，所以 x = ${q.roots[0]} 或 ${q.roots[1]}`,note:`两个数都是正整数，都符合数量要求。当数量为${q.roots[0]}${q.unit}或${q.roots[1]}${q.unit}时，收支平衡。`},
 {name:'代回检验，并写出平衡时的关系',math:`x = ${q.roots[0]}：收入 = 成本 = ${q.p*q.roots[0]}；x = ${q.roots[1]}：收入 = 成本 = ${q.p*q.roots[1]}（元）`,note:`收支平衡时，y = ${cost(q)}，其中x = ${q.roots[0]}或${q.roots[1]}。这是平衡条件下的关系；原收费方案的收入函数仍是y = ${q.p}x。`}
 ];
 const shift=`${coefficient(1/(2*q.a))}(m − ${q.b})`,outside=`${coefficient(1/(4*q.a))}(m − ${q.b})²`;
 return [
 {name:'先建立净收益函数',math:`W = mx − (${cost(q)}) = −${coefficient(q.a)}x² + (m − ${q.b})x − ${q.c}`,note:'净收益等于收入减成本；减去整个成本式时，括号内每一项都要变号。'},
 {name:'提取二次项系数，为配方做准备',math:`W = −${coefficient(q.a)}[x² − ${coefficient(1/q.a)}(m − ${q.b})x] − ${q.c}`,note:'把m当作一个固定的数，仍然按“取一次项系数的一半，再平方”来配方。'},
 {name:'配成顶点式',math:`W = −${coefficient(q.a)}[x − ${shift}]² + ${outside} − ${q.c}`,note:'括号外补回对应的常数项，保证整个代数式的值不变。'},
 {name:'根据开口方向确定最大值位置',math:`−${f(q.a)} < 0，所以W在 x = ${shift} 时取得最大值`,note:'平方项最小为0，乘负数以后最大为0，因此顶点处净收益最大。'},
 {name:'用题目给定的数量求m',math:`${shift} = ${q.target} → m = ${q.b} + ${f(2*q.a)} × ${q.target} = ${f(m)}`,note:`题目给的是“${q.target}${q.unit}时收益最大”，要让顶点横坐标等于${q.target}，不是把最大收益设成${q.target}。`},
 {name:'代回验证',math:`m = ${f(m)}时，W = −${squareTerm(q.a,`(x − ${q.target})`)} + ${f(max)}`,note:`所以x = ${q.target}时，净收益最大为${f(max)}元；${f(m)} > ${q.p}，也符合${q.price}提高的条件。`}
 ];}
function result(q,part){if(part===0)return `y = ${q.p}x；x = ${q.given}时，收入${q.p*q.given}元。`;if(part===1)return `x = ${q.roots[0]}或${q.roots[1]}（${q.unit}），收支平衡。`;return `m = ${f(q.b+2*q.a*q.target)}，即${q.price}为${f(q.b+2*q.a*q.target)}元。`;}
function stepHTML(s,i){return `<div class="workedStep"><b>${i+1} · ${s.name}</b><div class="formula">${s.math}</div><p>${s.note}</p></div>`;}
function table(q){return `<div class="applicationTable"><table><tr><th scope="row">数量x（${q.unit}）</th>${[1,2,3,4,5].map(v=>`<td>${v}</td>`).join('')}</tr><tr><th scope="row">收入y（元）</th>${[1,2,3,4,5].map(v=>`<td>${q.p*v}</td>`).join('')}</tr></table></div>`;}
function variantFull(q){return `<p>【问题背景】${q.context}</p><p>【研究条件】条件1：收入y（元）与${q.count}x（${q.unit}）的对应关系如下表：</p>${table(q)}<p>条件2：运营成本ω（元）满足：ω = ${cost(q)}。</p><p>【模型构建】</p><p>（1）${tasks(q)[0]}</p><p>（2）${tasks(q)[1]}</p><p>【模型应用】</p><p>（3）${tasks(q)[2]}</p>`;}
function render(){const q=Q[current],ss=worked(q,part),names=['正比例函数与代入求值','一元二次方程 · 配方法','二次函数最大值与参数'];
 $('applicationNav').innerHTML=Q.map((v,i)=>`<button data-application="${i}" class="${current===i?'active':''}" aria-pressed="${current===i}">${v.label}</button>`).join('');
 document.querySelectorAll('[data-application]').forEach(b=>b.onclick=()=>{current=Number(b.dataset.application);part=0;step=0;show=false;render();});
 $('applicationCard').innerHTML=`<div class="exerciseMeta"><span class="phase">${q.kind} · ${current+1} / ${Q.length}</span><span>与原题相同的三个考点</span></div><h3 class="applicationTitle">${q.title}</h3><p class="applicationContext">${q.context}</p><div class="applicationConditions"><p><b>条件1</b>　收入y（元）与${q.count}x（${q.unit}）的关系如下表：</p>${table(q)}<p><b>条件2</b>　运营成本：<span class="formula">ω = ${cost(q)}</span>（元）</p></div><details class="applicationFull"><summary>展开完整${current===0?'原题（保留全部题干）':'变式题（含三个小问）'}</summary><div class="applicationOriginal">${q.full||variantFull(q)}</div>${current===0?'<a href="../math2026/?v=3#q19" target="_blank" rel="noopener">在昨天的试卷中查看第19题 ↗</a>':''}</details><div class="exampleTabs applicationParts">${names.map((name,i)=>`<button data-application-part="${i}" class="${part===i?'active':''}">第（${i+1}）问 · ${name}</button>`).join('')}</div><div class="applicationPrompt"><span class="phase">第（${part+1}）问</span><p>${tasks(q)[part]}</p></div><div class="classControls"><button id="applicationPrev" ${step===0?'disabled':''}>上一步</button><button id="applicationNext" class="primary" ${step===ss.length?'disabled':''}>${step===0?'展开第一步':step===ss.length?'已到最后一步':'下一步 →'}</button><button id="applicationRestart">从头讲</button><button id="applicationAnswerToggle" aria-expanded="${show}" aria-controls="applicationAnswer">${show?'收起答案':'显示答案与完整步骤'}</button></div><div class="classStep" id="applicationStep" aria-live="polite">${step?`<span class="stepNumber">${step} / ${ss.length}</span><h3>${ss[step-1].name}</h3><div class="formula">${ss[step-1].math}</div><p>${ss[step-1].note}</p>`:'<span class="stepNumber">先口答 / 在纸上算</span><h3>这一步准备怎么列式？</h3><p>需要时展开一步提示，也可以直接查看完整答案。</p>'}</div>${show?`<section id="applicationAnswer" class="classAnswer" aria-label="参考答案与详细步骤"><span>参考答案 · 第（${part+1}）问</span><div class="classAnswerResult formula">${result(q,part)}</div><div class="classAnswerSteps">${ss.map(stepHTML).join('')}</div></section>`:''}<div class="classQuestionNav"><button id="applicationPreviousPart" ${part===0?'disabled':''}>← 上一小问</button><a class="applicationBack" href="#practice">返回配方法练习</a><button id="applicationNextPart" class="primary">${part===2?(current===Q.length-1?'回到原题 ↻':'下一道变式 →'):'下一小问 →'}</button></div>`;
 document.querySelectorAll('[data-application-part]').forEach(b=>b.onclick=()=>{part=Number(b.dataset.applicationPart);step=0;show=false;render();});
 $('applicationPrev').onclick=()=>{if(step>0)step--;render();};$('applicationNext').onclick=()=>{if(step<ss.length)step++;render();};$('applicationRestart').onclick=()=>{step=0;show=false;render();};$('applicationAnswerToggle').onclick=()=>{show=!show;render();};
 $('applicationPreviousPart').onclick=()=>{if(part>0)part--;step=0;show=false;render();};$('applicationNextPart').onclick=()=>{if(part<2)part++;else{current=(current+1)%Q.length;part=0;}step=0;show=false;render();};
}
window.SquareApplications={worked,result,tasks,cost};render();
if(location.hash==='#applications')$('applications').scrollIntoView();
})();
