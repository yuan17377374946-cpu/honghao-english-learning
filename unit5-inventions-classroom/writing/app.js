'use strict';
(() => {
  const SCENES = window.WRITING_SCENES;
  const NOTES = window.WRITING_REVIEW;
  const CMP = window.WRITING_COMPARISON;
  const KEY = 'hongren-unit5-writing-20261127-v1';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let state = {version:1,view:'review',scene:'books',filter:'all',cn:false,big:false,focus:false,records:{},essays:{},reviewed:[]};
  let storageOK = true;
  try { const saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved?.version === 1) state = {...state,...saved}; } catch (_) { storageOK = false; }
  if (!SCENES.some(s => s.id === state.scene)) state.scene = SCENES[0].id;
  if (!['review','grammar','scenes','compose'].includes(state.view)) state.view = 'review';
  if (!['all','simple','modern'].includes(state.filter)) state.filter = 'all';
  const query = new URLSearchParams(location.search);
  if (['review','grammar','scenes','compose'].includes(query.get('view'))) state.view = query.get('view');
  if (SCENES.some(s => s.id === query.get('scene'))) state.scene = query.get('scene');
  state.cmpAnswers = state.cmpAnswers || {};
  let toastTimer, returnFocus;
  const current = () => SCENES.find(s => s.id === state.scene);
  function record(id = state.scene) {
    const r = state.records[id] ||= {before:'',after:'',reason:'',open:[false,false,false],maxSupport:0,assessment:''};
    const active = r.open.lastIndexOf(true);
    r.open = r.open.map((_,i) => i === active);
    return r;
  }
  function essay(id = state.scene) { return state.essays[id] ||= {title:SCENES.find(s => s.id === id).kind === 'simple' ? 'My Favourite Simple Machine' : 'My Favourite Invention',intro:'',text:'',checks:{},modelOpen:false,modelSeen:false}; }
  function toast(message) { const t = $('#toast'); t.textContent = message; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 3600); }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageOK = true; }
    catch (_) { if (storageOK) toast('当前浏览器无法保存，请先用“保存课堂记录”导出草稿。'); storageOK = false; }
  }
  function announce(message) { $('#status').textContent = message; }
  function filled(r) { return ['before','after','reason'].filter(k => r[k]?.trim()).length; }
  function wordCount(text) { return (text.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) || []).length; }
  function taskLabel(s) { return s.kind === 'simple' ? 'A卷 · 简单机械' : 'B卷 · 现代发明'; }
  function translation(text) { return state.cn ? `<span class="translation">${esc(text)}</span>` : ''; }
  function picture(s, col) {
    const files = ['scenes-01-04-u15.png','scenes-05-08-u15.png','scenes-09-12-u15.png'];
    return `<div class="scene-picture" role="img" aria-label="${esc(col ? s.afterAlt : s.beforeAlt)}" style="--col:${col};--row:${s.row}"><img src="assets/${files[s.sheet-1]}" alt="" aria-hidden="true" decoding="async"></div>`;
  }
  function compare(s) { return `<div class="compare"><figure><figcaption><span>${esc(s.beforeLabel || 'BEFORE')}</span><small>${esc(s.beforeCn || '使用前')}</small></figcaption>${picture(s,0)}</figure><figure class="after"><figcaption><span>${esc(s.afterLabel || 'AFTER')}</span><small>${esc(s.afterCn || '使用后')}</small></figcaption>${picture(s,1)}</figure></div>`; }
  function review() {
    return `<section class="page-heading"><div><p class="eyebrow">RECALL · SAY · CHECK</p><h1>先回忆昨天，再写今天的句子。</h1><p>先不看答案，自己说一说；点击卡片，再对照笔记。</p></div><button class="button primary" data-view="grammar">先练比较级与最高级</button></section>
    <div class="intro-cards"><section class="card"><span class="tag simple">A卷 · 第22页</span><h2 class="en">My Favourite Simple Machine</h2><p>选轮子、斜坡或杠杆，说明没有它时的困难、有了它后的帮助，再说自己的想法。</p></section><section class="card"><span class="tag modern">B卷 · 第24页</span><h2>我最喜欢的现代发明</h2><p>它是什么？以前没有它时，人们怎样生活或出行？现在怎样帮助人们？为什么喜欢它？</p></section></div>
    <div class="review-grid">${NOTES.map((n,i) => `<details class="note-card" data-review="${i}"><summary>${esc(n.title)}<small class="en">${esc(n.question)}</small></summary><div class="note-answer"><p class="en">${n.answer}</p><p class="muted">${esc(n.note)}</p><label class="language-toggle"><input type="checkbox" data-reviewed="${i}" ${state.reviewed.includes(i)?'checked':''}> 我能自己说清楚了</label></div></details>`).join('')}</div>
    <div class="review-bottom"><p>今晚建议先选：搬书、轮椅过校门、洗衣机、手机。<br>其余场景随时切换，课堂按实际进度安排。</p><button class="button primary" data-view="grammar">先分清形容词和副词</button></div>`;
  }
  function grammar() {
    const questions = CMP.pairs.flatMap(p => p.questions);
    const checked = questions.filter(q => state.cmpAnswers[q.id]?.checked);
    const correct = checked.filter(q => state.cmpAnswers[q.id].choice === q.answer).length;
    return `<section class="page-heading"><div><p class="eyebrow">COMPARE · EXPLAIN · USE</p><h1>easier，还是 more easily？</h1><p>先看空格说明谁，再看比较几个，最后检查怎样变。</p></div><button class="button primary" data-view="scenes">练完，回到12组图片</button></section>
    <section class="grammar-pair"><article class="card"><span class="tag simple">形容词 · 人或事物怎么样</span><p class="en grammar-example">The ramp makes our <strong>work easier</strong>.</p><p>工作变得更轻松。easier说明<strong>work</strong>怎么样。</p><p class="en">easy → easier → the easiest</p></article><article class="card"><span class="tag modern">副词 · 动作做得怎么样</span><p class="en grammar-example">We <strong>move</strong> boards <strong>more easily</strong> with a ramp.</p><p>搬木板的动作更轻松。more easily说明<strong>move</strong>这个动作。</p><p class="en">easily → more easily → the most easily</p></article></section>
    <section class="card grammar-guide"><h2>做题时，按这三步想</h2><ol><li><b>说明谁？</b> 人或事物的特点、状态用形容词；动作怎样进行通常用副词。不能只看空格前一个词。</li><li><b>比较几个？</b> 两者比较用比较级，常见than；三者及以上中选“最……”用最高级，常见of the three / in the class。</li><li><b>怎样变？</b> easy → easier / easiest；easily → more easily / most easily。fast、early作副词时也用-er / -est。</li></ol><p class="grammar-note">形容词最高级前通常有the；副词最高级前的the常可省略。题干已有the时，不重复填写。</p>
    <details class="grammar-details"><summary>展开变化规则和词形表</summary><div class="grammar-rules">${CMP.rules.map(([a,b])=>`<p><b>${esc(a)}</b><br><span class="en">${esc(b)}</span></p>`).join('')}</div><div class="grammar-table-wrap"><table class="grammar-table"><thead><tr><th>类型</th><th>原级</th><th>比较级</th><th>最高级</th></tr></thead><tbody>${CMP.rows.map(row=>`<tr>${row.map((v,i)=>`<td class="${i?'en':''}">${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="grammar-note">另外记：much / many → more → most；little（少）→ less → least。最高级前是否加the，要放回句子判断。</p></details></section>
    <section class="grammar-practice"><header class="grammar-practice-head"><h2>成对做，再说出理由</h2><p id="cmp-progress" role="status">已核对 ${checked.length}/12 题 · 当前答对 ${correct} 题</p></header><p class="muted">先选词，试着说“它说明谁、比较几个”。每组两句可以分别核对，提示和答案需要时再展开。</p><div class="grammar-pair-grid">${CMP.pairs.map(pair=>`<article class="card grammar-exercise"><h3>${esc(pair.title)}</h3>${pair.questions.map(q=>{const r=state.cmpAnswers[q.id]||{},ok=r.choice===q.answer;return `<section class="cmp-question" id="${q.id}"><label for="answer-${q.id}" class="en">${esc(q.prompt)}</label><div class="cmp-controls"><select id="answer-${q.id}" data-cmp-choice="${q.id}" aria-label="第${q.id.slice(4)}题选词"><option value="">选择填法</option>${q.options.map(o=>`<option ${r.choice===o?'selected':''} value="${esc(o)}">${esc(o)}</option>`).join('')}</select><button class="button" data-cmp-check="${q.id}">核对</button></div><details class="cmp-hint"><summary>想一想</summary><p>${esc(q.hint)}</p></details><div class="cmp-feedback ${ok?'correct':'retry'}" ${r.checked?'':'hidden'} role="status"><b>${ok?'这题选对了':'再对照这句话想一想'}</b><p class="en">${esc(q.prompt.startsWith('改正：')?q.prompt.slice(3).replace('slowlyer',q.answer).replace('most easiest',q.answer):q.prompt.replace('____',q.answer))}</p><p>${esc(q.why)}</p></div></section>`;}).join('')}</article>`).join('')}</div></section><div class="review-bottom"><p>回到杠杆、斜坡和轮子的图片，再各说一句：<br><span class="en">It makes our work easier. / We move things more easily.</span></p><button class="button primary" data-view="scenes">去图片里用一用</button></div>`;
  }
  function navigation() {
    const visible = SCENES.filter(s => state.filter === 'all' || s.kind === state.filter);
    return `<aside class="scene-nav" aria-label="场景选择"><h2>选一幅图，开口说</h2><div class="filters">${[['all','全部'],['simple','简单机械'],['modern','现代发明']].map(([v,l]) => `<button class="filter" data-filter="${v}" aria-pressed="${state.filter===v}">${l}</button>`).join('')}</div><div class="scene-list">${visible.map(s => { const i = SCENES.indexOf(s); const r = record(s.id); return `<button class="scene-link ${s.id===state.scene?'active':''}" data-scene="${s.id}" aria-current="${s.id===state.scene?'true':'false'}"><span class="num">${String(i+1).padStart(2,'0')}</span><span>${s.title}</span>${filled(r)===3?'<span class="done" aria-label="三栏已填写">✓</span>':''}</button>`; }).join('')}</div><p class="draft-count">已填写 ${SCENES.filter(s => filled(record(s.id))>0).length}/12 组<br>草稿保存在当前浏览器</p></aside>`;
  }
  function hintContent(s, step) {
    if (step === 0) return s.phrases.map(([en,cn]) => `<div class="phrase"><b class="en">${esc(en)}</b>${translation(cn)}</div>`).join('') + (s.verbHelp ? `<p class="verb-help"><small>PAST FORMS · 过去式</small><span class="en">${esc(s.verbHelp)}</span></p>` : '');
    const roles = ['BEFORE / WITHOUT IT · 困难或原来的做法','AFTER / WITH IT · 用途或变化','MY IDEA / RESULT · 想法或结果'];
    if (step === 1) return s.frames.map(([en,cn],i) => `<div class="frame en"><small class="slot-label">${roles[i]}</small>${esc(en).replace(/____/g,'<span class="gap">____</span>')}${translation(cn)}</div>`).join('');
    return s.refs.map((sentence,i) => `<p class="reference en"><small>${roles[i]}</small>${esc(sentence)}</p>`).join('');
  }
  function support(s) {
    const r = record();
    const steps = [['短语','想不到词时看'],['句型','不知道怎么连时看'],['参考句','写完以后再对照']];
    return `<aside class="support" aria-label="分步写作提示"><div class="support-head"><h2>需要帮助时，再展开</h2><button data-hide-hints>全部收起</button></div><p class="support-intro">先用熟悉的词说一句。短语优先复用Unit 1—5课内表达和以前学过的基础词；需要时再看句型和参考句。</p><label class="language-toggle"><input type="checkbox" data-cn ${state.cn?'checked':''}> 显示短语和句型的中文说明</label>
      <div class="support-steps">${steps.map(([title,sub],i) => `<section class="support-step" style="--step:${i}"><button data-hint="${i}" title="${sub}" aria-label="${i+1} · ${title}" aria-expanded="${!!r.open[i]}" aria-controls="hint-${i}"><span>${i+1} · ${title}</span></button><div class="support-body" id="hint-${i}" ${r.open[i]?'':'hidden'}>${hintContent(s,i)}</div></section>`).join('')}</div>
      ${r.maxSupport?`<p class="hint-used">本组曾查看：${['','短语','句型','参考句'][r.maxSupport]}。收起后仍会保留这条记录。</p>`:''}
      <details class="teacher-note"><summary>详细笔记与易错点</summary><p>${esc(s.note)}</p><p><strong>再问一句：</strong>${esc(s.questionCn)}</p></details>
      <div class="teacher-note"><p>老师记录这次表现</p><div class="assessment">${[['independent','独立完成'],['prompted','提示后完成'],['review','再练一次']].map(([v,l]) => `<button data-assess="${v}" class="${r.assessment===v?'active':''}" aria-pressed="${r.assessment===v}">${l}</button>`).join('')}</div><p class="muted" style="font-size:12px">表现由老师判断；查看提示的记录单独保留。</p></div>
    </aside>`;
  }
  function scenes() {
    const s = current(), r = record(), i = SCENES.indexOf(s);
    return `<div class="class-layout">${navigation()}<section class="scene-stage"><header class="scene-heading"><div><span class="tag ${s.kind}">${taskLabel(s)}</span><h1>${esc(s.title)}</h1><p class="subtitle en">${esc(s.en)}</p></div><span class="scene-count">${i+1} / 12</span></header>${compare(s)}
      <div class="picture-tools"><button class="button" data-zoom>放大对比图</button><button class="button" data-focus aria-pressed="${state.focus}">${state.focus?'显示场景目录':'收起目录，放大课堂'}</button><button class="button" data-big aria-pressed="${state.big}">大字 ${state.big?'开':'关'}</button></div>
      <div class="picture-question"><span class="en">${esc(s.question)}</span>${state.cn?`<small>${esc(s.questionCn)}</small>`:''}</div>
      <section class="draft-card"><div class="draft-title"><h2>轮到你写</h2><span class="save-label" id="save-label">${storageOK?'草稿保存在当前浏览器':'请导出草稿'}</span></div><div class="writing-fields">${[['before','1 · 左图：困难或原来的做法'],['after','2 · 右图：工具的用途或带来的变化'],['reason','3 · 再加一句：原因、感受或其他用途']].map(([k,l]) => `<label>${l}<textarea data-draft="${k}" aria-label="${l}" rows="2" spellcheck="true" lang="en" autocomplete="off" placeholder="Write your own sentence here.">${esc(r[k])}</textarea></label>`).join('')}</div>
      <div class="scene-bottom"><div class="pager"><button class="button" data-prev ${i===0?'disabled':''}>上一组</button><button class="button" data-next ${i===SCENES.length-1?'disabled':''}>下一组</button></div><button class="button primary" data-view="compose">用这组写作文</button></div></section>
    </section>${support(s)}</div>`;
  }
  const checklist = [
    ['topic','我写的是题目要求的简单机械或现代发明。'],
    ['before','我写清楚了使用前的困难或以前的生活。'],
    ['after','我写了它现在怎样帮助人们。'],
    ['reason','我写出了自己的想法或喜欢的原因。'],
    ['language','我检查了动词形式、单复数、大小写和标点。']
  ];
  function compose() {
    const s = current(), e = essay(), r = record();
    return `<section class="page-heading"><div><p class="eyebrow">MY IDEAS · MY SENTENCES</p><h1>把自己写的句子，连成一篇。</h1><p>先选对象，再写开头，把前后变化和喜欢的原因说清楚。</p></div><button class="button" data-view="scenes">回到这组图片</button></section><div class="compose-layout">
      <aside class="card compose-nav"><span class="tag ${s.kind}">${taskLabel(s)}</span><label for="compose-scene">选择写作对象与场景</label><select id="compose-scene" data-compose-scene>${SCENES.map(x => `<option value="${x.id}" ${x.id===s.id?'selected':''}>${x.title} · ${x.kind==='simple'?'简单机械':'现代发明'}</option>`).join('')}</select><div class="outline"><div><b>1</b><span>它是什么？</span></div><div><b>2</b><span>以前 / 没有它时怎样？</span></div><div><b>3</b><span>现在 / 有了它后怎样？</span></div><div><b>4</b><span>为什么喜欢它？</span></div></div><p class="model-note">本组已经填写 ${filled(r)}/3 栏。<br>先写自己的开头，再点“整理我的句子”，把开头和本组句子放进正文。</p><p class="source-note">任务要求依据已上传单元卷：A卷第22页第十四题、B卷第24页第十二题。练习场景、图像和参考句为本课堂配套创作；不把参考写法作为唯一答案。</p></aside>
      <section class="card compose-draft"><label for="essay-title">作文标题</label><input class="title-input" id="essay-title" data-title value="${esc(e.title)}" lang="en"><label for="essay-intro">先写开头：我喜欢的是什么？</label><textarea class="intro-input en" id="essay-intro" data-intro rows="2" lang="en" spellcheck="true" placeholder="Write your own opening sentence.">${esc(e.intro || '')}</textarea><details class="teacher-note intro-guide"><summary>不会写开头？看句型</summary><p class="en">${s.kind === 'simple' ? 'My favourite simple machine is ____.' : 'My favourite invention is ____.'}</p><p>本组介绍的对象是 <b class="en">${esc(s.object)}</b>，把它放进空格。用自己的句子介绍也可以。</p></details><label for="essay">我的作文</label><textarea class="essay en" id="essay" data-essay lang="en" spellcheck="true" placeholder="Start with your own introduction. Then use your sentences about before and after.">${esc(e.text)}</textarea><p class="word-count" id="word-count">正文 ${wordCount(e.text)} 词 · 按完整意思写，不为凑字数重复句子。</p><div class="compose-actions"><button class="button primary" data-build>整理我的句子</button><button class="button" data-copy>复制作文</button><button class="button" data-model aria-expanded="${!!e.modelOpen}" aria-controls="essay-model">${e.modelOpen?'收起参考短文':'写完后，对照参考短文'}</button></div><div id="essay-model" ${e.modelOpen?'':'hidden'}><p class="model-note">一种可接受的写法。保留自己的表达，不必改成和参考短文一模一样。</p><p class="model en">${esc(s.model)}</p></div>${e.modelSeen?'<p class="model-note">已查看过本场景参考短文，记录会保留。</p>':''}</section>
      <aside class="card compose-check"><h2 style="font-size:22px">写完，自己读一遍。</h2><div class="checklist">${checklist.map(([k,l]) => `<label><input type="checkbox" data-check="${k}" ${e.checks[k]?'checked':''}><span>${l}</span></label>`).join('')}</div><details class="teacher-note"><summary>用这些句型检查表达</summary><p class="en">My favourite … is …<br>Before, people …<br>Without it, it is hard to …<br>Now, we use … to …<br>It helps us …<br>I like it because …</p><p>Before / Long ago写过去的事时注意过去式；Without / With也能对比当前不同条件，不必硬改成过去时。</p></details><button class="button blue" style="margin-top:18px" data-export>保存课堂记录</button></aside>
    </div>`;
  }
  function render({focus=false}={}) {
    const top = window.scrollY;
    document.body.classList.toggle('text-large', !!state.big);
    document.body.classList.toggle('focus-scene', !!state.focus && state.view === 'scenes');
    $$('[data-view]', $('.lesson-route')).forEach(b => { b.classList.toggle('active', b.dataset.view === state.view); b.setAttribute('aria-current', b.dataset.view === state.view ? 'step' : 'false'); });
    $('#main').innerHTML = state.view === 'review' ? review() : state.view === 'compose' ? compose() : state.view === 'grammar' ? grammar() : scenes();
    document.title = state.view === 'scenes' ? `${current().title} · 宏仁Unit 5作文课` : '宏仁 · Unit 5 看图写作文';
    if (focus) { $('#main').focus({preventScroll:true}); window.scrollTo(0,0); } else window.scrollTo(0,top);
    $$('.scene-picture img').forEach(img => img.addEventListener('error', () => {
      const box = img.parentElement; box.innerHTML = `<span class="image-fallback">${esc(box.getAttribute('aria-label'))}</span>`;
    }, {once:true}));
  }
  function setView(view) { state.view = view; save(); render({focus:true}); announce(`已进入${{review:'笔记复习',grammar:'比较级与最高级',scenes:'场景写句子',compose:'作文草稿'}[view]}`); }
  function chooseScene(id) {
    if (!SCENES.some(s => s.id === id)) return;
    state.scene = id;
    if (state.filter !== 'all' && current().kind !== state.filter) state.filter = current().kind;
    save(); render({focus:true});
  }
  function zoom() {
    returnFocus = document.activeElement;
    const el = document.createElement('div'); el.className = 'zoom'; el.id = 'zoom'; el.setAttribute('role','dialog'); el.setAttribute('aria-modal','true'); el.setAttribute('aria-labelledby','zoom-title');
    el.innerHTML = `<div class="zoom-inner"><div class="zoom-head"><h2 id="zoom-title">${esc(current().title)}</h2><button class="button" data-close-zoom>关闭大图</button></div>${compare(current())}</div>`;
    document.body.appendChild(el); document.body.classList.add('zoom-open'); $('[data-close-zoom]').focus();
  }
  function closeZoom() { $('#zoom')?.remove(); document.body.classList.remove('zoom-open'); returnFocus?.focus(); }
  function downloadRecords() {
    const lines = ['宏仁 · Unit 5 看图写作文',new Date().toLocaleString('zh-CN'),''];
    SCENES.forEach(s => { const r = record(s.id), e = state.essays[s.id]; if (!filled(r) && !e?.text?.trim() && !e?.intro?.trim() && !r.maxSupport && !r.assessment) return;
      lines.push(`${SCENES.indexOf(s)+1}. ${s.title}`,`BEFORE: ${r.before}`,`AFTER: ${r.after}`,`补充: ${r.reason}`,`曾查看提示: ${['无','短语','句型','参考句'][r.maxSupport]}`,`老师记录: ${{independent:'独立完成',prompted:'提示后完成',review:'再练一次'}[r.assessment] || '未记录'}`);
      if (e?.intro) lines.push(`自己写的开头: ${e.intro}`);
      if (e?.text) lines.push('',e.title,e.text,`曾查看参考短文: ${e.modelSeen?'是':'否'}`);
      lines.push('');
    });
    const comparisonQuestions = CMP.pairs.flatMap(p => p.questions);
    if (comparisonQuestions.some(q => state.cmpAnswers[q.id]?.choice)) {
      lines.push('比较级与最高级练习');
      comparisonQuestions.forEach(q => { const r = state.cmpAnswers[q.id]; if (r?.choice) lines.push(`${q.id}: ${q.prompt}`,`选择: ${r.choice} · ${r.checked ? (r.choice===q.answer?'核对后正确':'核对后需再练') : '尚未核对'}`); });
    }
    const url = URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'Hongren-Unit5-Writing-20261127.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url),500);
    toast('课堂记录已准备下载，请留意浏览器下载列表。');
  }
  function mergeDrafts() {
    const r = record(), e = essay();
    const sentences = [e.intro || '',...['before','after','reason'].map(k => r[k])].map(v => v.trim()).filter(Boolean);
    const text = sentences.join('\n');
    if (!text) return toast('先回到图片旁，写下自己的句子，再整理进作文。');
    if (e.text.trim()) {
      if (e.lastMergedIntro && e.intro?.trim() && e.lastMergedIntro !== e.intro.trim() && e.text.includes(e.lastMergedIntro)) e.text = e.text.replace(e.lastMergedIntro,e.intro.trim());
      const missing = sentences.filter(v => !e.text.includes(v));
      if (!missing.length) { e.lastMergedIntro = e.intro?.trim() || ''; save(); render(); return toast('这些句子已经在草稿里了，不重复加入。'); }
      const intro = e.intro?.trim();
      const addIntro = intro && missing.includes(intro);
      const tail = missing.filter(v => v !== intro);
      e.text = (addIntro ? intro+'\n' : '') + e.text.trimEnd() + (tail.length ? '\n'+tail.join('\n') : '');
    } else e.text = text;
    e.lastMergedIntro = e.intro?.trim() || '';
    save(); render(); toast(e.intro?.trim() ? '已整理好你写的开头和句子。再读一遍，调整衔接。' : '已放入你写的句子。再补开头，读一遍，调整衔接。');
  }
  document.addEventListener('click', async event => {
    if (event.target.id === 'zoom') return closeZoom();
    const b = event.target.closest('button'); if (!b || b.disabled) return;
    const d = b.dataset;
    if (d.closeZoom !== undefined) return closeZoom();
    if (d.view) return setView(d.view);
    if (d.cmpCheck) {
      const r = state.cmpAnswers[d.cmpCheck];
      if (!r?.choice) return toast('先选一个填法，再核对。');
      r.checked = true; save(); render(); $(`[data-cmp-check="${d.cmpCheck}"]`)?.focus({preventScroll:true}); return;
    }
    if (d.scene) return chooseScene(d.scene);
    if (d.filter) { state.filter = d.filter; if (d.filter !== 'all' && current().kind !== d.filter) state.scene = SCENES.find(s => s.kind === d.filter).id; save(); return render(); }
    if (d.hint !== undefined) {
      const r = record(), i = Number(d.hint), opening = !r.open[i]; r.open = [false,false,false]; r.open[i] = opening; if (opening) r.maxSupport = Math.max(r.maxSupport,i+1); save(); render(); $(`[data-hint="${i}"]`)?.focus({preventScroll:true}); return;
    }
    if (d.hideHints !== undefined) { record().open = [false,false,false]; save(); return render(); }
    if (d.assess) { record().assessment = d.assess; save(); return render(); }
    if (d.prev !== undefined || d.next !== undefined) { const i = SCENES.indexOf(current()) + (d.next !== undefined ? 1 : -1); if (SCENES[i]) chooseScene(SCENES[i].id); return; }
    if (d.zoom !== undefined) return zoom();
    if (d.big !== undefined) { state.big = !state.big; save(); return render(); }
    if (d.focus !== undefined) { state.focus = !state.focus; save(); return render(); }
    if (d.build !== undefined) return mergeDrafts();
    if (d.model !== undefined) { const e = essay(); e.modelOpen = !e.modelOpen; if (e.modelOpen) e.modelSeen = true; save(); return render(); }
    if (d.copy !== undefined) {
      const e = essay(); if (!e.text.trim()) return toast('先写下自己的作文。');
      try { await navigator.clipboard.writeText(e.title+'\n\n'+e.text); toast('作文已复制。'); }
      catch (_) { $('#essay').focus(); $('#essay').select(); toast('请按 Ctrl+C 或长按复制选中的作文。'); } return;
    }
    if (d.export !== undefined || b.id === 'export') return downloadRecords();
    if (b.id === 'fullscreen') {
      try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); }
      catch (_) { toast('浏览器暂未允许全屏，可以使用浏览器的全屏功能。'); }
    }
  });
  document.addEventListener('input', e => {
    const d = e.target.dataset;
    if (d.draft) { record()[d.draft] = e.target.value; save(); const l = $('#save-label'); if (l) l.textContent = storageOK ? '已保存到当前浏览器' : '请导出草稿'; }
    if (d.essay !== undefined) { essay().text = e.target.value; save(); $('#word-count').textContent = `正文 ${wordCount(e.target.value)} 词 · 按完整意思写，不为凑字数重复句子。`; }
    if (d.title !== undefined) { essay().title = e.target.value; save(); }
    if (d.intro !== undefined) { essay().intro = e.target.value; save(); }
  });
  document.addEventListener('change', e => {
    const d = e.target.dataset;
    if (d.cmpChoice) { state.cmpAnswers[d.cmpChoice] = {choice:e.target.value,checked:false}; save(); render(); $(`[data-cmp-choice="${d.cmpChoice}"]`)?.focus({preventScroll:true}); return; }
    if (d.cn !== undefined) { state.cn = e.target.checked; save(); render(); }
    if (d.composeScene !== undefined) chooseScene(e.target.value);
    if (d.check) { essay().checks[d.check] = e.target.checked; save(); }
    if (d.reviewed !== undefined) { const n = Number(d.reviewed); state.reviewed = state.reviewed.filter(v => v !== n); if (e.target.checked) state.reviewed.push(n); save(); }
  });
  document.addEventListener('keydown', e => {
    if ($('#zoom')) {
      if (e.key === 'Escape') closeZoom();
      if (e.key === 'Tab') { e.preventDefault(); $('[data-close-zoom]').focus(); }
      return;
    }
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (state.view === 'scenes' && e.altKey && ['ArrowLeft','ArrowRight'].includes(e.key)) { e.preventDefault(); const i = SCENES.indexOf(current()) + (e.key === 'ArrowRight'?1:-1); if (SCENES[i]) chooseScene(SCENES[i].id); }
  });
  if (!storageOK) toast('当前浏览器无法读取旧记录，可继续上课并导出草稿。');
  render();
})();
