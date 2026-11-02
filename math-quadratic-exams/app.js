'use strict';
const $=s=>document.querySelector(s);
let questions=[],state={type:'全部',year:'全部',category:'全部',search:'',unlearned:false,mode:'all',sort:'exam'},records={};
try{records=JSON.parse(localStorage.getItem('sz-quadratic-records-v1')||'{}')}catch{}
if(!records||typeof records!=='object'||Array.isArray(records))records={};
const escaped=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const record=id=>records[id]||{};
const storeRecords=()=>{try{localStorage.setItem('sz-quadratic-records-v1',JSON.stringify(records))}catch{toast('当前浏览器无法保存练习记录')}};
let toastTimer;function toast(t){$('#toast').textContent=t;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2300)}
function updateProgress(){const done=questions.filter(q=>record(q.id).mastered).length;$('#progressFraction').textContent=`${done} / ${questions.length}`;$('#progressBar').style.width=`${done/questions.length*100}%`;$('#mistakesCount').textContent=questions.filter(q=>record(q.id).mistake).length}
function buttons(values,key,container,kind='filter-button'){$(container).innerHTML=values.map(v=>{const count=questions.filter(q=>v==='全部'||String(q[key])===String(v)).length;return `<button class="${kind} ${String(state[key])===String(v)?'selected':''}" data-filter="${key}" data-value="${escaped(v)}" aria-pressed="${String(state[key])===String(v)}"><span>${escaped(v)}</span>${kind==='filter-button'?`<small>${count}</small>`:''}</button>`}).join('')}
function renderFilters(){buttons(['全部','中考真题','模拟题','期中题'],'type','#typeFilters');buttons(['全部',2024,2023,2022],'year','#yearFilters','year-button');buttons(['全部','图象与性质','最值与参数','平移与交点','利润应用','实际建模','动点与几何'],'category','#categoryFilters')}
function filteredQuestions(){let a=questions.filter(q=>(state.type==='全部'||q.type===state.type)&&(state.year==='全部'||String(q.year)===String(state.year))&&(state.category==='全部'||q.category===state.category)&&(!state.unlearned||!record(q.id).mastered)&&(state.mode!=='mistakes'||record(q.id).mistake));if(state.search){const s=state.search.toLocaleLowerCase();a=a.filter(q=>`${q.title} ${q.source} ${q.category} ${q.focus} ${q.year} 专题${q.section} 第${q.number}题 ${q.searchText}`.toLocaleLowerCase().includes(s))}return a.sort((a,b)=>state.sort==='exam'?(Number(b.type==='中考真题')-Number(a.type==='中考真题')||b.year-a.year||a.section-b.section||a.number-b.number):state.sort==='year'?(b.year-a.year||a.section-b.section||a.number-b.number):(a.section-b.section||a.number-b.number))}
function images(q,kind){return q[kind].map((im,i)=>`<img loading="lazy" decoding="async" width="${im.width}" height="${im.height}" src="${im.src}" alt="${escaped(q.year+'年 '+q.title+' '+(kind==='question'?'原题':'原解析')+' 第'+(i+1)+'部分')}" data-zoom="${im.src}" data-caption="${escaped(q.year+'年 · '+q.title+' · 原书第'+(im.pdfPage-2)+'页')}">`).join('')}

function rulerPartThree(){
  const sketch=(upper)=>{
    const px=x=>180+22*x,py=y=>300-22*y;
    const curve=(fn)=>Array.from({length:121},(_,i)=>{const x=-2.2+4.4*i/120;return (i?'L':'M')+px(x).toFixed(1)+','+py(fn(x)).toFixed(1)}).join(' ');
    const qy=upper?10:6, qlabel=upper?'Q(−h, k+10)':'Q(−h, k+6)';
    return `<figure class="p3-figure"><figcaption>${upper?'情况一：Q 在 AB 上方，a = −½':'情况二：Q 在 AB 下方，a = ½'}</figcaption><svg viewBox="0 0 360 365" role="img" aria-label="${upper?'开口向下的C2顶点Q在线段AB上方2个单位，C1顶点P在AB下方8个单位':'开口向上的C2顶点Q在线段AB下方2个单位，C1顶点P在AB下方8个单位'}"><line x1="180" y1="47" x2="180" y2="316" stroke="#87978d" stroke-dasharray="5 5"/><text x="190" y="43" class="p3-axis-label">对称轴 x = −h</text><path d="${curve(x=>2*x*x)}" stroke="#164e45" stroke-width="2.5" fill="none"/><path d="${curve(x=>(upper?-.5:.5)*x*x+qy)}" stroke="#bc663e" stroke-width="2.5" fill="none"/><line x1="136" y1="124" x2="224" y2="124" stroke="#253d36" stroke-width="3"/><path d="M180 124h7v7" fill="none" stroke="#687b6d"/><g fill="#253d36"><circle cx="136" cy="124" r="3.5"/><circle cx="224" cy="124" r="3.5"/><circle cx="180" cy="124" r="3"/></g><circle cx="180" cy="300" r="4" fill="#164e45"/><circle cx="180" cy="${py(qy)}" r="4" fill="#bc663e"/><text x="113" y="116">A</text><text x="234" y="116">B</text><text x="159" y="117">M</text><text x="188" y="313" fill="#164e45">P(−h, k)</text><text x="188" y="${upper?70:186}" fill="#a7512b">${upper?qlabel:'Q'}</text><path d="M83 124h9M87.5 124v176M83 300h9" fill="none" stroke="#164e45" stroke-width="1.5"/><text x="28" y="216" fill="#164e45">PM = 8</text><path d="M273 ${Math.min(124,py(qy))}h9M277.5 ${Math.min(124,py(qy))}v44M273 ${Math.max(124,py(qy))}h9" fill="none" stroke="#bc663e" stroke-width="1.5"/><text x="286" y="${upper?105:150}" fill="#a7512b">QM = 2</text><text x="152" y="145" class="p3-small-label">2</text><text x="201" y="145" class="p3-small-label">2</text><text x="18" y="343" class="p3-small-label">绿色：C₁　橙色：C₂　AB = 4</text>${upper?'':'<text x="18" y="360" class="p3-small-label">Q 的坐标：(−h, k+6)</text>'}</svg></figure>`;
  };
  return `<section class="part3-full" id="s16q01-part3-full" aria-labelledby="part3-heading">
<style>
.part3-full{margin:24px 0 10px;padding:24px;border:1px solid #cbd9c4;border-radius:12px;background:#fafcf7;color:#253d36;font-size:16px;line-height:1.9;scroll-margin-top:105px}
.part3-full h4{font-size:23px;line-height:1.5;margin:0 0 12px;color:#164e45}.part3-full h5{font-size:18px;line-height:1.6;margin:0 0 10px;color:#164e45}.part3-full p{margin:8px 0}.part3-full .p3-step{padding:21px 0;border-top:1px solid #dce5d5}.part3-full .p3-step:last-child{padding-bottom:0}
.part3-full .p3-formula{font:20px/1.8 Georgia,"Times New Roman","Microsoft YaHei",serif;overflow-wrap:anywhere;margin:12px 0;padding:10px 14px;background:white;border-radius:7px;border:1px solid #e0e8d9}
.part3-full .p3-note{padding:12px 15px;background:#eef3e7;border-left:3px solid #7a9c69;margin:14px 0}.part3-full .p3-correction{background:#fff2e9;border-left-color:#c56d45}.part3-full .p3-diagrams{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0}.part3-full .p3-figure{margin:0;background:white;border:1px solid #dce5d5;border-radius:9px;padding:12px}.part3-full figcaption{font-size:15px;font-weight:650;color:#164e45;line-height:1.7}.part3-full svg{display:block;width:100%;height:auto;margin-top:6px;overflow:visible}.part3-full svg text{font:14px "Microsoft YaHei",sans-serif}.part3-full svg .p3-axis-label{font-size:12px;fill:#788779}.part3-full svg .p3-small-label{font-size:12px;fill:#63765e}
.part3-full .p3-case{background:white;border:1px solid #dce5d5;border-radius:8px;padding:14px 16px;margin:14px 0}.part3-full .p3-case strong{color:#a7512b}.part3-full .p3-answer{font-size:23px;color:#164e45;font-weight:700}.part3-full details{margin-top:12px}.part3-full details>summary{cursor:pointer;color:#164e45;font-weight:650}.p3-jump{font-size:14px;padding:12px 15px;background:#eef3e7;border:1px solid #dce5d5;border-radius:7px;margin:0 0 16px}.p3-jump a{text-decoration:underline;color:#164e45}
@media(max-width:720px){.part3-full{padding:16px;font-size:16px}.part3-full h4{font-size:21px}.part3-full .p3-diagrams{grid-template-columns:1fr}.part3-full .p3-formula{font-size:18px;padding:10px}}
</style>
<h4 id="part3-heading">第（3）问｜完整解析与简图</h4>
<p>先看 AB 的中点，再求两个顶点到 AB 的距离，最后分类求 a。每一步都从题目条件出发。</p>
<div class="p3-note"><b>题目条件</b><br>C₁：y₁ = 2(x+h)<sup>2</sup>+k；C₂：y₂ = a(x+h)<sup>2</sup>+b（a ≠ 0）。两条抛物线都经过 A、B；AB ∥ x 轴，AB = 4；顶点 P、Q 到线段 AB 的距离之和为 10。</div>
<div class="p3-step"><h5>① 先读顶点式：h、k、b 分别在哪里？</h5>
<p>令 x+h=0，得到 x=−h。因此两条抛物线的对称轴都是 <b>x=−h</b>。</p>
<p>C₁ 的顶点是 <b>P(−h, k)</b>；C₂ 的顶点是 <b>Q(−h, b)</b>。注意：<b>b 是 Q 的纵坐标，题干没有写错</b>；它不一定等于 k。</p>
</div>
<div class="p3-step"><h5>② AB 长 4，为什么左右各是 2？</h5>
<p>因为 AB 平行于 x 轴，所以 A、B 的纵坐标相同。它们在同一条抛物线上，且是两个不同的点，因此关于对称轴对称。</p>
<p>设对称轴与 AB 交于 M，则 M 是 AB 的中点：</p>
<div class="p3-formula">AM = MB = AB ÷ 2 = 4 ÷ 2 = 2</div>
<p>按图中 A 在左、B 在右，可得：</p>
<div class="p3-formula">x<sub>A</sub> = −h−2，　x<sub>B</sub> = −h+2</div>
<p>P、M、Q 都在竖直的对称轴上，而 M 在线段 AB 内，所以 PM、QM 正是两个顶点到线段 AB 的距离。</p>
</div>
<div class="p3-step"><h5>③ “8+k”和距离 8，到底从哪里来？</h5>
<p>A 在 C₁ 上，把 x<sub>A</sub>=−h−2 代入 y₁=2(x+h)<sup>2</sup>+k：</p>
<div class="p3-formula">y<sub>A</sub> = 2[(−h−2)+h]<sup>2</sup>+k<br>= 2×(−2)<sup>2</sup>+k<br>= 2×4+k<br>= 8+k</div>
<p>由于 AB 水平，A、M、B 的纵坐标都是 <b>8+k</b>。于是：</p>
<div class="p3-formula">A(−h−2, 8+k)，B(−h+2, 8+k)<br>M(−h, 8+k)，P(−h, k)</div>
<p>两个点在同一条竖直线上，距离等于纵坐标之差的绝对值：</p>
<div class="p3-formula">PM = |(8+k)−k| = |8| = 8</div>
<div class="p3-note"><b>这个 8 的来源：</b>AB 对半分得到 2，再用 C₁ 的系数 2 计算 2×2<sup>2</sup>=8。k 表示纵向位置，整体上下平移不会改变 PM。</div>
</div>
<div class="p3-step"><h5>④ 距离和为 10，为什么会出现两种情况？</h5>
<div class="p3-formula">PM + QM = 10<br>QM = 10−8 = 2</div>
<p>题目只说“距离为 2”，没有限定 Q 在 AB 的哪一侧。<b>Q 可以在 AB 上方 2 个单位，也可以在 AB 下方 2 个单位。</b></p>
<p>下面两图省略坐标轴，以 P 的位置作为绘图基准；两图采用相同刻度。P、M、Q 的横坐标均为 −h。</p>
<div class="p3-diagrams">${sketch(true)}${sketch(false)}</div>
<p>AB 的纵坐标为 8+k，Q 的纵坐标为 b，所以：</p>
<div class="p3-formula">|b−(8+k)| = 2</div>
<p>因此 b 的两种可能值是 <b>k+10</b> 和 <b>k+6</b>。</p>
</div>
<div class="p3-step"><h5>⑤ 分别代入 A 点，求出 a</h5>
<div class="p3-case"><strong>情况一：Q 在 AB 上方</strong>
<p>Q 比 AB 高 2，所以 b=(8+k)+2=k+10。</p>
<div class="p3-formula">C₂：y₂ = a(x+h)<sup>2</sup>+k+10</div>
<p>A(−h−2, 8+k) 也在 C₂ 上，代入得：</p>
<div class="p3-formula">8+k = a[(−h−2)+h]<sup>2</sup>+k+10<br>8+k = 4a+k+10<br>8 = 4a+10<br>4a = −2<br>a = −½</div>
<p>a&lt;0，C₂ 开口向下，顶点 Q 在 AB 上方，与简图一致。</p></div>
<div class="p3-case"><strong>情况二：Q 在 AB 下方</strong>
<p>Q 比 AB 低 2，所以 b=(8+k)−2=k+6。</p>
<div class="p3-formula">C₂：y₂ = a(x+h)<sup>2</sup>+k+6</div>
<p>再次将 A(−h−2, 8+k) 代入：</p>
<div class="p3-formula">8+k = a[(−h−2)+h]<sup>2</sup>+k+6<br>8+k = 4a+k+6<br>8 = 4a+6<br>4a = 2<br>a = ½</div>
<p>a&gt;0，C₂ 开口向上，顶点 Q 在 AB 下方，与简图一致。</p></div>
<p class="p3-answer">所以：a = −½ 或 a = ½。</p>
</div>
<div class="p3-step"><h5>⑥ 回头检查：b 用到哪里了？两种答案都满足条件吗？</h5>
<p>b 没有消失，而是先由距离条件变成了 k+10 或 k+6，再代回 C₂。计算时两边都有 k，因此 k 被消去了。</p>
<p>a=−½、b=k+10 时，A、B 的函数值都是 −½×4+k+10=k+8；Q 到 AB 的距离为 2。</p>
<p>a=½、b=k+6 时，A、B 的函数值都是 ½×4+k+6=k+8；Q 到 AB 的距离也为 2。两种情况的距离和都是 8+2=10，均符合题意。</p>
<div class="p3-note p3-correction"><b>原解析笔误更正：</b>原图中 B 点的纵坐标“8+n”应为“8+k”。题干 C₂ 中的常数 b 是正确的，不应改成 k。</div>
<details><summary>理解完整过程后，再看简便写法</summary>
<p>对 C₂，将 A 的横坐标代入，AB 的纵坐标是 4a+b，顶点 Q 的纵坐标是 b。</p>
<div class="p3-formula">QM = |(4a+b)−b| = |4a|<br>8+|4a| = 10<br>|4a| = 2<br>a = ±½</div>
<p>这也说明：求 a 时，水平位置 h 和纵向位置 k、b 都会被消去，不需要求它们的具体数值。</p>
</details>
</div></section>`;
}

function card(q,i){const r=record(q.id),typeClass=q.type==='模拟题'?'mock':q.type==='期中题'?'midterm':'';return `<article class="question-card" id="${q.id}" data-id="${q.id}"><div class="card-top"><span class="q-index">${String(i+1).padStart(2,'0')}</span><span class="badge ${typeClass}">${q.year}年 · ${q.type}</span><span class="year-badge">${escaped(q.category)}</span><span class="mastery-flag">${r.mastered?'✓ 已掌握':''}</span></div><details class="question-detail" ${i===0?'open':''}><summary class="question-summary"><h3 class="question-title"><span>${escaped(q.title)}</span><span class="expand-icon" aria-hidden="true">＋</span></h3><div class="question-meta"><span>${escaped(q.source.replace(/^\d+·广东深圳·/,''))}</span><span class="dot">·</span><span>专题${String(q.section).padStart(2,'0')} 第${q.number}题</span><span class="dot">·</span><span>原书 p.${q.page}</span><span class="dot">·</span><span>PDF 第${q.pdfPage}页</span></div></summary><div class="question-body"><p class="focus-line"><b>考查什么</b>${escaped(q.focus)}</p>${q.note?`<p class="source-note"><b>原文核对提示：</b>${escaped(q.note)}</p>`:''}<div class="source-images">${images(q,'question')}</div><p class="image-hint">点击原题图片，可放大查看</p><details class="solution"><summary><span class="sol-arrow" aria-hidden="true">›</span> 查看答案与解析</summary>${q.id==='s16q01'?'<p class="p3-jump"><a href="#s16q01-part3-full">第（3）问看不懂？跳到完整解析与两种情况简图 ↓</a></p>':''}<p class="solution-note">以下为原汇编解析，保留原图文。</p><div class="source-images">${images(q,'solution')}</div>${q.id==='s16q01'?rulerPartThree():''}</details><div class="practice-actions"><button class="mistake-btn" data-action="mistake" aria-pressed="${!!r.mistake}">${r.mistake?'● 已加入错题':'＋ 加入错题'}</button><button class="mastered-btn" data-action="mastered" aria-pressed="${!!r.mastered}">${r.mastered?'✓ 已掌握':'○ 标记已掌握'}</button></div><label><span class="sr-only">${escaped(q.title)}的学习笔记</span><textarea class="notes" data-note="${q.id}" placeholder="写下这道题卡住的地方，或一句解题提醒…">${escaped(r.note||'')}</textarea></label></div></details></article>`}
function render(){renderFilters();const list=filteredQuestions();$('#questionList').innerHTML=list.map(card).join('');$('#resultHeading').innerHTML=`${state.mode==='mistakes'?'我的错题':state.type==='全部'?'全部题目':escaped(state.type)} <span>${list.length}</span>`;$('#emptyState').hidden=!!list.length;$('#emptyMessage').textContent=state.mode==='mistakes'?'在题目下方点击“加入错题”，就能在这里集中复习。':'换个关键词，或清除筛选后继续查看。';$('#listFooter').hidden=!list.length;$('#filterSummary').textContent=[state.mode==='mistakes'?'我的错题':'',state.type!=='全部'?state.type:'',state.year!=='全部'?`${state.year}年`:'',state.category!=='全部'?state.category:'',state.unlearned?'未掌握':''].filter(Boolean).join(' / ')||'从基础到综合，按自己的节奏练习。';$('#libraryNav').classList.toggle('active',state.mode==='all');$('#mistakesNav').classList.toggle('active',state.mode==='mistakes');$('#unlearnedBtn').setAttribute('aria-pressed',String(state.unlearned));updateProgress()}
function reset(){state={type:'全部',year:'全部',category:'全部',search:'',unlearned:false,mode:'all',sort:'exam'};$('#searchInput').value='';$('#sortSelect').value='exam';render()}
document.addEventListener('click',e=>{const f=e.target.closest('[data-filter]');if(f){state[f.dataset.filter]=f.dataset.value;render();return}const action=e.target.closest('[data-action]');if(action){const article=action.closest('.question-card'),id=article.dataset.id,key=action.dataset.action;records[id]={...record(id),[key]:!record(id)[key]};storeRecords();const r=record(id);action.setAttribute('aria-pressed',String(!!r[key]));action.textContent=key==='mastered'?(r.mastered?'✓ 已掌握':'○ 标记已掌握'):(r.mistake?'● 已加入错题':'＋ 加入错题');article.querySelector('.mastery-flag').textContent=r.mastered?'✓ 已掌握':'';updateProgress();toast(key==='mastered'?(r.mastered?'已标记掌握，继续保持。':'已取消掌握标记'):(r.mistake?'已加入我的错题':'已从错题中移除'));if((key==='mastered'&&state.unlearned&&r.mastered)||(key==='mistake'&&state.mode==='mistakes'&&!r.mistake))render();return}const im=e.target.closest('[data-zoom]');if(im){$('#zoomImage').src=im.dataset.zoom;$('#zoomImage').alt=im.alt;$('#imageCaption').textContent=im.dataset.caption;$('#imageDialog').showModal()}});
document.addEventListener('input',e=>{if(e.target.matches('[data-note]')){const id=e.target.dataset.note;records[id]={...record(id),note:e.target.value};storeRecords()}});
$('#searchInput').addEventListener('input',e=>{state.search=e.target.value.trim();render()});$('#sortSelect').addEventListener('change',e=>{state.sort=e.target.value;render()});$('#unlearnedBtn').addEventListener('click',()=>{state.unlearned=!state.unlearned;render()});$('#resetFilters').addEventListener('click',reset);$('#clearEmpty').addEventListener('click',reset);$('#libraryNav').addEventListener('click',()=>{state.mode='all';render();$('#practice').scrollIntoView()});$('#mistakesNav').addEventListener('click',()=>{state.mode='mistakes';state.type=state.year=state.category='全部';state.search='';state.unlearned=false;$('#searchInput').value='';render();$('#practice').scrollIntoView()});$('#closeDialog').addEventListener('click',()=>$('#imageDialog').close());$('#imageDialog').addEventListener('click',e=>{if(e.target===$('#imageDialog'))$('#imageDialog').close()});
let priorOpen=[];function preparePrint(){if(!priorOpen.length)priorOpen=[...document.querySelectorAll('.question-detail')].map(d=>[d,d.open]);priorOpen.forEach(([d])=>d.open=true)}window.addEventListener('beforeprint',preparePrint);window.addEventListener('afterprint',()=>{priorOpen.forEach(([d,open])=>d.open=open);priorOpen=[]});$('#printBtn').addEventListener('click',async()=>{if(!filteredQuestions().length)return toast('请先选择需要打印的题目');preparePrint();const button=$('#printBtn');button.disabled=true;toast('正在准备原题图片…');await Promise.allSettled([...document.querySelectorAll('.question-body > .source-images img')].map(im=>{im.loading='eager';return im.decode()}));button.disabled=false;window.print()});
fetch('questions.json').then(r=>{if(!r.ok)throw Error('data');return r.json()}).then(data=>{questions=data;render();if(location.hash==='#s16q01-part3-full'){const target=$('#s16q01-part3-full');target.closest('.solution').open=true;target.closest('.question-detail').open=true;requestAnimationFrame(()=>target.scrollIntoView({behavior:'instant',block:'start'}))}}).catch(()=>{$('#questionList').innerHTML='<div class="empty-state"><h3>题目暂时没有加载成功</h3><p>请刷新页面后重试。</p><button class="primary-btn" onclick="location.reload()">重新加载</button></div>'});
