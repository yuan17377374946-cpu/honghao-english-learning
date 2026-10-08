(() => {
  "use strict";

  const STORAGE_KEY = "honghao-day20-phonics-v2";
  const state = Object.assign({
    tab: "learn", groupStatus: {}, selectAnswers: {}, selectSubmitted: false,
    selectWrongOnly: false, chunkSolved: {}, chunkBuilds: {}, fillAnswers: {},
    fillSubmitted: false, fillWrongOnly: false, dictation: {}, hints: {}
  }, readState());

  const groups = [
    {
      id:"short-a", title:"第一组：先听清中间的短音 /æ/",
      intro:"字母 a 在这些单词里发短音 /æ/。先听中间的声音，再找 a。",
      words:[
        {word:"lamp",ipa:"/læmp/",zh:"灯",chunks:["l","a","mp"],note:"a → /æ/；听到中间音，想到字母 a。"},
        {word:"impact",ipa:"/ˈɪmpækt/",zh:"影响",chunks:["im","pact"],note:"pact 中的 a 发 /æ/，可以分成 im + pact。"},
        {word:"fancy",ipa:"/ˈfænsi/",zh:"精美的；花哨的",chunks:["fan","cy"],note:"a → /æ/；结尾 y 在这里发 /i/。"}
      ]
    },
    {
      id:"vowel-teams", title:"第二组：两个元音字母可以合发一个长音",
      intro:"看到 ie、oo 时，先把两个字母看成一个声音块，不要拆开读。",
      words:[
        {word:"belief",ipa:"/bɪˈliːf/",zh:"信念；看法",chunks:["be","lief"],note:"ie → /iː/；重读后半部分 lief。"},
        {word:"fool",ipa:"/fuːl/",zh:"欺骗；愚弄",chunks:["f","oo","l"],note:"oo → /uː/；两个 o 合起来发一个长音。"}
      ]
    },
    {
      id:"silent-e", title:"第三组：结尾 e 不发音，却会改变前面的元音",
      intro:"a_e、i_e、o_e 中，最后的 e 通常不发音，前面的元音读字母音。prove 是特殊词。",
      words:[
        {word:"displace",ipa:"/dɪsˈpleɪs/",zh:"排开；取代",chunks:["dis","place"],note:"place 中 a_e → /eɪ/；拆成 dis + place。"},
        {word:"milestone",ipa:"/ˈmaɪlstəʊn/",zh:"里程碑；重要事件",chunks:["mile","stone"],note:"mile 中 i_e → /aɪ/；stone 中 o_e → /əʊ/。"},
        {word:"prove",ipa:"/pruːv/",zh:"证明；证实",chunks:["pr","o","ve"],note:"特殊情况：prove 中的 o 发 /uː/，需要单独记住。",special:true}
      ]
    },
    {
      id:"word-chunks", title:"第四组：长单词先拆成词块",
      intro:"长单词不按字母个数背。先听节奏，再记熟悉的小词、前缀或结尾。",
      words:[
        {word:"outstanding",ipa:"/aʊtˈstændɪŋ/",zh:"优秀的；杰出的",chunks:["out","stand","ing"],note:"out + stand + ing，三个词块分别记。"},
        {word:"background",ipa:"/ˈbækɡraʊnd/",zh:"背景",chunks:["back","ground"],note:"back + ground，两个熟悉的小词组成大词。"},
        {word:"hardly",ipa:"/ˈhɑːdli/",zh:"几乎不",chunks:["hard","ly"],note:"hard + ly；-ly 是常见结尾。"},
        {word:"application",ipa:"/ˌæplɪˈkeɪʃən/",zh:"应用；申请",chunks:["ap","pli","ca","tion"],note:"结尾 tion → /ʃən/；把 tion 当成一个整体记。"}
      ]
    }
  ];

  function parseWord(entry) {
    const [word, zh, chunkText] = entry.split("|");
    return {word, zh, chunks:chunkText.split("+")};
  }
  const similarGroups = [
    ["a → /æ/","听到短音 /æ/，先想到字母 a",[
      "cat|猫|c+a+t","map|地图|m+a+p","bag|包|b+a+g","hand|手|h+a+nd","stand|站立|st+a+nd",
      "black|黑色的|bl+a+ck","back|后面；回来|b+a+ck","plan|计划|pl+a+n","lamp|灯|l+a+mp","fancy|精美的|fan+cy"
    ]],
    ["ie → /iː/","把 ie 看成一个声音块",[
      "belief|信念|be+lief","field|田野|f+ie+ld","piece|一片|p+ie+ce","chief|首领|ch+ie+f",
      "brief|简短的|br+ie+f","thief|小偷|th+ie+f","niece|侄女；外甥女|n+ie+ce"
    ]],
    ["oo → /uː/","两个 o 合起来发一个长音",[
      "fool|愚弄|f+oo+l","food|食物|f+oo+d","moon|月亮|m+oo+n","room|房间|r+oo+m",
      "school|学校|sch+oo+l","cool|凉爽的|c+oo+l","spoon|勺子|sp+oo+n","tooth|牙齿|t+oo+th"
    ]],
    ["a_e → /eɪ/","最后的 e 不读，前面的 a 读长音",[
      "make|制作|m+a+ke","name|名字|n+a+me","game|游戏|g+a+me","same|相同的|s+a+me",
      "late|迟的|l+a+te","place|地方|pl+a+ce","displace|取代|dis+place"
    ]],
    ["i_e → /aɪ/","最后的 e 不读，前面的 i 读长音",[
      "time|时间|t+i+me","five|五|f+i+ve","like|喜欢|l+i+ke","mile|英里|m+i+le",
      "smile|微笑|sm+i+le","while|当……时|wh+i+le","milestone|里程碑|mile+stone"
    ]],
    ["o_e → /əʊ/","最后的 e 不读，前面的 o 读长音",[
      "home|家|h+o+me","hope|希望|h+o+pe","note|笔记|n+o+te","stone|石头|st+o+ne",
      "phone|电话|ph+o+ne","milestone|里程碑|mile+stone"
    ]],
    ["tion → /ʃən/","听到词尾 /ʃən/，注意常见词块 tion",[
      "action|行动|ac+tion","station|车站|sta+tion","nation|国家|na+tion","attention|注意|at+ten+tion",
      "education|教育|ed+u+ca+tion","information|信息|in+for+ma+tion","application|应用；申请|ap+pli+ca+tion"
    ]],
    ["常见词块","听到几个熟悉的小词，把它们按顺序合起来",[
      "background|背景|back+ground","homework|家庭作业|home+work","classroom|教室|class+room",
      "notebook|笔记本|note+book","football|足球|foot+ball","raincoat|雨衣|rain+coat",
      "outside|在外面|out+side","outstanding|杰出的|out+stand+ing","sunshine|阳光|sun+shine"
    ]],
    ["前缀与后缀","先认出开头或结尾，再拼中间的基本词",[
      "unhappy|不高兴的|un+happy","dislike|不喜欢|dis+like","rewrite|重写|re+write","useful|有用的|use+ful",
      "careless|粗心的|care+less","quickly|迅速地|quick+ly","hardly|几乎不|hard+ly","teacher|老师|teach+er"
    ]]
  ].map(([label, tip, entries]) => ({label, tip, words:entries.map(parseWord)}));

  const anchorWords = groups.flatMap(group => group.words);
  const allSimilarWords = similarGroups.flatMap(group => group.words);
  const studyWords = [...anchorWords, ...allSimilarWords.filter(item => !anchorWords.some(anchor => anchor.word === item.word))];

  const selectQuestions = [
    {word:"hand",answer:"h + a + nd",options:["h + a + nd","h + e + nd","h + o + nd"],note:"hand 中 /æ/ 对应字母 a。"},
    {word:"field",answer:"f + ie + ld",options:["f + ee + ld","f + ie + ld","f + ea + ld"],note:"field 中 ie 发 /iː/。"},
    {word:"school",answer:"sch + oo + l",options:["sch + ou + l","sch + oo + l","sch + u + l"],note:"school 中 oo 发 /uː/。"},
    {word:"place",answer:"pl + a + ce",options:["pl + a + ce","pl + e + ce","pl + i + ce"],note:"place 是 a_e 结构。"},
    {word:"smile",answer:"sm + i + le",options:["sm + a + le","sm + i + le","sm + o + le"],note:"smile 是 i_e 结构。"},
    {word:"stone",answer:"st + o + ne",options:["st + a + ne","st + i + ne","st + o + ne"],note:"stone 是 o_e 结构。"},
    {word:"station",answer:"sta + tion",options:["sta + sion","sta + tion","sta + cion"],note:"station 结尾 /ʃən/ 拼作 tion。"},
    {word:"raincoat",answer:"rain + coat",options:["rain + coat","rain + cot","ran + coat"],note:"raincoat 由 rain 和 coat 组成。"},
    {word:"unhappy",answer:"un + happy",options:["in + happy","un + hapy","un + happy"],note:"un- 表示否定，后面接 happy。"},
    {word:"quickly",answer:"quick + ly",options:["quick + li","quick + ly","quik + ly"],note:"quickly 由 quick 和副词结尾 -ly 组成。"}
  ];
  const chunkQuestions = [
    ["black",["bl","a","ck"]], ["piece",["p","ie","ce"]], ["room",["r","oo","m"]],
    ["game",["g","a","me"]], ["smile",["sm","i","le"]], ["stone",["st","o","ne"]],
    ["information",["in","for","ma","tion"]], ["outside",["out","side"]],
    ["raincoat",["rain","coat"]], ["careless",["care","less"]]
  ].map(([word, chunks]) => ({word, chunks}));
  const fillQuestions = [
    {word:"cat",display:"c_t",answer:"a",options:["a","e","o"],note:"cat 中 /æ/ 对应字母 a。"},
    {word:"black",display:"bl_ck",answer:"a",options:["e","a","u"],note:"black 中 /æ/ 对应字母 a。"},
    {word:"field",display:"f__ld",answer:"ie",options:["ee","ie","ea"],note:"field 中 /iː/ 拼作 ie。"},
    {word:"school",display:"sch__l",answer:"oo",options:["ou","oo","u"],note:"school 中 /uː/ 拼作 oo。"},
    {word:"name",display:"n_me",answer:"a",options:["a","i","o"],note:"name 是 a_e 结构。"},
    {word:"time",display:"t_me",answer:"i",options:["e","a","i"],note:"time 是 i_e 结构。"},
    {word:"home",display:"h_me",answer:"o",options:["u","o","a"],note:"home 是 o_e 结构。"},
    {word:"nation",display:"na____",answer:"tion",options:["sion","tion","cion"],note:"nation 结尾 /ʃən/ 拼作 tion。"},
    {word:"quickly",display:"quick__",answer:"ly",options:["li","ley","ly"],note:"副词 quickly 结尾拼作 -ly。"},
    {word:"unhappy",display:"un_____",answer:"happy",options:["hapy","happy","happe"],note:"unhappy 由 un + happy 组成。"}
  ];
  const dictationWords = ["plan","chief","spoon","hope","education"];

  let pronunciationAudio = null;
  let playAllTimer = null;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  function readState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch (_) { return {}; }
  }
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); updateProgress(); }
  function wordData(word) { return studyWords.find(item => item.word === word); }
  function shuffled(items, seed = 0) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = (seed * 7 + i * 3) % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  function speakWithBrowser(text, rate = .86) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB"; utterance.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(v => /^en-GB/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang)) || null;
    window.speechSynthesis.speak(utterance);
  }
  function speak(text, rate = .86) {
    if (rate < .8) { speakWithBrowser(text, rate); return; }
    const fallback = () => speakWithBrowser(text, rate);
    if (pronunciationAudio) { pronunciationAudio.pause(); pronunciationAudio = null; }
    const audio = document.createElement("audio");
    pronunciationAudio = audio; audio.preload = "auto"; audio.playbackRate = rate; audio.onerror = fallback;
    audio.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`;
    const promise = audio.play(); if (promise && promise.catch) promise.catch(fallback);
  }

  function renderLearn() {
    const host = $("#ruleGroups"); host.innerHTML = "";
    groups.forEach(group => {
      const section = document.createElement("section"); section.className = "rule-group";
      const title = document.createElement("div"); title.className = "rule-title";
      const copy = document.createElement("div"); copy.innerHTML = `<h3>${group.title}</h3><p>${group.intro}</p>`;
      const status = document.createElement("div"); status.className = "group-status";
      [["know","✓ 会按声音拼"],["review","↻ 还要练"]].forEach(([value,label]) => {
        const button = document.createElement("button");
        button.className = `status-btn ${state.groupStatus[group.id] === value ? "selected" : ""}`;
        button.dataset.status = value; button.type = "button"; button.textContent = label;
        button.onclick = () => { state.groupStatus[group.id] = value; save(); renderLearn(); };
        status.append(button);
      });
      title.append(copy, status);
      const grid = document.createElement("div"); grid.className = "word-grid";
      group.words.forEach(item => {
        const card = document.createElement("article"); card.className = `word-card ${item.special ? "special" : ""}`;
        card.innerHTML = `<div class="word-top"><div><h4>${item.word}</h4><span class="ipa">${item.ipa}</span></div><div class="audio-actions"><button class="audio-btn normal" type="button">🔊</button><button class="audio-btn slow" type="button">🐢</button></div></div><p class="meaning">${item.zh}</p><div class="chunks">${item.chunks.map(chunk => `<span class="part">${chunk}</span>`).join("")}</div><p class="rule-note">${item.note}</p>`;
        card.querySelector(".normal").onclick = () => speak(item.word, .9);
        card.querySelector(".slow").onclick = () => speak(item.word, .62);
        grid.append(card);
      });
      section.append(title, grid); host.append(section);
    });
    renderSimilarBank();
  }
  function renderSimilarBank() {
    const host = $("#similarBank"); host.innerHTML = "";
    similarGroups.forEach((group, index) => {
      const details = document.createElement("details"); details.className = "similar-group"; details.open = index === 0;
      details.innerHTML = `<summary><span>${group.label}</span><small>${group.tip}</small><b>${group.words.length}词</b></summary><div class="word-cloud"></div>`;
      const cloud = details.querySelector(".word-cloud");
      group.words.forEach(item => {
        const button = document.createElement("button"); button.type = "button"; button.className = "word-chip";
        button.innerHTML = `<strong>${item.word}</strong><span>${item.chunks.join(" + ")}</span><small>${item.zh}</small>`;
        button.onclick = () => speak(item.word, .82); cloud.append(button);
      });
      host.append(details);
    });
  }

  function renderChoiceQuiz(kind, questions, config) {
    const answers = state[`${kind}Answers`]; const submitted = state[`${kind}Submitted`];
    const visible = state[`${kind}WrongOnly`] ? questions.filter(q => answers[q.word] !== q.answer) : questions;
    const host = $(config.host); host.innerHTML = "";
    visible.forEach((question, index) => {
      const selected = answers[question.word];
      const prompt = kind === "fill" ? question.display.replace(/_+/g, match => `<span class="blank">${match}</span>`) : `第 ${index + 1} 题`;
      const card = document.createElement("article"); card.className = "quiz-card";
      card.innerHTML = `<div class="quiz-head"><strong>${prompt}</strong><button class="audio-btn" type="button">🔊 听单词</button></div><div class="choice-row ${kind === "select" ? "wide" : ""}"></div><p class="feedback"></p>`;
      card.querySelector(".audio-btn").onclick = () => speak(question.word, .82);
      const row = card.querySelector(".choice-row");
      question.options.forEach(option => {
        const button = document.createElement("button"); button.type = "button";
        button.className = `choice ${selected === option ? "selected" : ""}`; button.textContent = option;
        if (submitted) {
          if (option === question.answer) button.classList.add("correct");
          else if (selected === option) button.classList.add("wrong");
          button.disabled = true;
        }
        button.onclick = () => { answers[question.word] = option; save(); renderChoiceQuiz(kind, questions, config); };
        row.append(button);
      });
      const feedback = card.querySelector(".feedback");
      if (submitted) {
        const correct = selected === question.answer;
        feedback.className = `feedback ${correct ? "good" : "bad"}`;
        feedback.textContent = `${correct ? "✓ 正确。" : `正确答案：${question.answer}。`}${question.note}`;
      } else feedback.textContent = kind === "select" ? "先听完整发音，再选词块。" : "先听，再补上缺少的部分。";
      host.append(card);
    });
    const answered = visible.filter(q => answers[q.word]).length;
    $(config.counter).textContent = `${answered} / ${visible.length}`;
    $(config.submit).disabled = answered < visible.length || submitted; $(config.submit).hidden = submitted;
    const wrong = questions.filter(q => answers[q.word] !== q.answer);
    $(config.retry).hidden = !submitted || !wrong.length;
    if (submitted) {
      const score = questions.length - wrong.length;
      $(config.result).textContent = `得分 ${score} / ${questions.length}${score === questions.length ? "，全部正确！" : `，还有 ${wrong.length} 题需要再练。`}`;
      $(config.result).className = score === questions.length ? "perfect" : "";
    } else { $(config.result).textContent = ""; $(config.result).className = ""; }
  }
  const selectConfig = {host:"#selectQuiz",counter:"#selectCounter",submit:"#submitSelect",retry:"#retrySelect",result:"#selectResult"};
  const fillConfig = {host:"#fillQuiz",counter:"#fillCounter",submit:"#submitFill",retry:"#retryFill",result:"#fillResult"};
  const renderSelectQuiz = () => renderChoiceQuiz("select", selectQuestions, selectConfig);
  const renderFillQuiz = () => renderChoiceQuiz("fill", fillQuestions, fillConfig);

  function renderChunkQuiz() {
    const host = $("#chunkQuiz"); host.innerHTML = "";
    chunkQuestions.forEach((question, index) => {
      const solved = Boolean(state.chunkSolved[question.word]); const build = state.chunkBuilds[question.word] || [];
      const options = shuffled(question.chunks.map((chunk, i) => ({chunk, i})), index + 1);
      const card = document.createElement("article"); card.className = `chunk-card ${solved ? "done" : ""}`;
      card.innerHTML = `<div class="chunk-title"><h3>${index + 1}. ${wordData(question.word).zh}</h3><button class="audio-btn" type="button">🔊 听单词</button></div><div class="build-line ${build.length ? "" : "empty"}">${build.length ? build.map(x => x.chunk).join(" | ") : "按听到的顺序点击下面的词块"}</div><div class="chunk-options"></div><div class="chunk-controls"><p class="chunk-feedback ${solved ? "good" : ""}">${solved ? "✓ 拼写正确" : ""}</p><button class="hint-btn reset" type="button">重新排列</button></div>`;
      card.querySelector(".audio-btn").onclick = () => speak(question.word, .78);
      const optionHost = card.querySelector(".chunk-options");
      options.forEach(option => {
        const button = document.createElement("button"); button.type = "button"; button.className = "chunk-btn"; button.textContent = option.chunk;
        button.disabled = solved || build.some(item => item.i === option.i);
        button.onclick = () => {
          const next = [...(state.chunkBuilds[question.word] || []), option]; state.chunkBuilds[question.word] = next;
          if (next.length === question.chunks.length) {
            if (next.map(x => x.chunk).join("") === question.word) { state.chunkSolved[question.word] = true; toast("拼写正确！"); }
            else { state.chunkBuilds[question.word] = []; toast("顺序不对，再听一次试试。", true); }
          }
          save(); renderChunkQuiz();
        };
        optionHost.append(button);
      });
      card.querySelector(".reset").onclick = () => { state.chunkBuilds[question.word] = []; save(); renderChunkQuiz(); };
      host.append(card);
    });
    $("#chunkCounter").textContent = `${chunkQuestions.filter(q => state.chunkSolved[q.word]).length} / ${chunkQuestions.length}`;
  }

  function renderDictation() {
    const host = $("#dictationList"); host.innerHTML = "";
    dictationWords.forEach((word, index) => {
      const item = wordData(word); const entry = state.dictation[word] || {value:"",correct:false,tries:0};
      const canHint = entry.tries >= 2;
      const card = document.createElement("article"); card.className = `dictation-card ${entry.correct ? "done" : ""}`;
      card.innerHTML = `<div class="dictation-no">${index + 1}</div><div class="dictation-main"><label>中文提示：${item.zh}</label><div class="dictation-input-row"><input class="dictation-input ${entry.correct ? "correct" : ""}" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" value="${escapeHtml(entry.value || "")}" placeholder="听发音后输入完整单词"><button class="check-btn" type="button">检查</button></div><p class="dictation-feedback">${entry.correct ? "✓ 拼写正确" : entry.tries ? `已经尝试 ${entry.tries} 次，先按声音拆词块。` : "先听发音，尝试独立拼写。"}</p>${state.hints[word] ? `<div class="hint-box">词块提示：${item.chunks.join(" | ")}</div>` : ""}</div><div class="dictation-actions"><button class="audio-btn normal" type="button">🔊 正常</button><button class="audio-btn slow" type="button">🐢 慢速</button><button class="hint-btn show-hint" type="button" ${canHint ? "" : "disabled"}>${canHint ? "显示词块" : "尝试2次后提示"}</button></div>`;
      const input = card.querySelector("input");
      card.querySelector(".normal").onclick = () => speak(word, .9); card.querySelector(".slow").onclick = () => speak(word, .6);
      card.querySelector(".show-hint").onclick = () => { if (!canHint) return; state.hints[word] = !state.hints[word]; save(); renderDictation(); };
      const check = () => {
        const value = input.value.trim().toLowerCase(); const current = state.dictation[word] || {tries:0};
        state.dictation[word] = {value, correct:value === word, tries:(current.tries || 0) + 1};
        save(); renderDictation(); if (value === word) toast("正确！已经把声音和词块对应上了。");
      };
      card.querySelector(".check-btn").onclick = check; input.onkeydown = event => { if (event.key === "Enter") check(); };
      input.oninput = () => { const current = state.dictation[word] || {tries:0,correct:false}; state.dictation[word] = {...current,value:input.value}; save(); };
      host.append(card);
    });
    const correct = dictationWords.filter(word => state.dictation[word]?.correct).length;
    $("#dictationCounter").textContent = `${correct} / ${dictationWords.length}`;
    const summary = $("#finalSummary"); summary.hidden = correct < dictationWords.length;
    if (correct === dictationWords.length) summary.innerHTML = `<h3>迁移拼写完成</h3><p>这5个词没有在前面的题目中重点练过。能够拼出来，说明已经开始把发音规律用到新词上。</p>`;
  }

  function escapeHtml(value) { const div = document.createElement("div"); div.textContent = value; return div.innerHTML; }
  function moduleDone(tab) {
    if (tab === "learn") return groups.every(group => state.groupStatus[group.id]);
    if (tab === "select") return state.selectSubmitted;
    if (tab === "chunks") return chunkQuestions.every(q => state.chunkSolved[q.word]);
    if (tab === "fill") return state.fillSubmitted;
    if (tab === "dictation") return dictationWords.every(word => state.dictation[word]?.correct);
    return false;
  }
  function updateProgress() {
    const tabs = ["learn","select","chunks","fill","dictation"]; const done = tabs.filter(moduleDone).length;
    $("#overallProgress").textContent = `${done} / ${tabs.length}`; $("#progressBar").style.width = `${done / tabs.length * 100}%`;
    $$(".tab").forEach(button => button.classList.toggle("done", moduleDone(button.dataset.tab)));
  }
  function showTab(tab) {
    if (!["learn","select","chunks","fill","dictation"].includes(tab)) tab = "learn";
    state.tab = tab; save();
    ["learn","select","chunks","fill","dictation"].forEach(id => { $("#" + id).hidden = id !== tab; });
    $$(".tab").forEach(button => button.classList.toggle("active", button.dataset.tab === tab));
    if (tab === "select") renderSelectQuiz(); if (tab === "chunks") renderChunkQuiz();
    if (tab === "fill") renderFillQuiz(); if (tab === "dictation") renderDictation();
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function toast(message, warning = false) {
    const host = $("#toast"); host.textContent = message; host.hidden = false; host.style.borderColor = warning ? "#e1b171" : "#9dc8ae";
    clearTimeout(toast.timer); toast.timer = setTimeout(() => { host.hidden = true; }, 1900);
  }
  function submitChoice(kind, render) { state[`${kind}Submitted`] = true; state[`${kind}WrongOnly`] = false; save(); render(); }
  function retryChoice(kind, questions, render) {
    const answers = state[`${kind}Answers`];
    questions.filter(q => answers[q.word] !== q.answer).forEach(q => delete answers[q.word]);
    state[`${kind}Submitted`] = false; state[`${kind}WrongOnly`] = true; save(); render();
  }

  $$(".tab").forEach(button => button.onclick = () => showTab(button.dataset.tab));
  $("#submitSelect").onclick = () => submitChoice("select", renderSelectQuiz);
  $("#retrySelect").onclick = () => retryChoice("select", selectQuestions, renderSelectQuiz);
  $("#submitFill").onclick = () => submitChoice("fill", renderFillQuiz);
  $("#retryFill").onclick = () => retryChoice("fill", fillQuestions, renderFillQuiz);
  $("#playAll").onclick = () => {
    if (playAllTimer) { clearTimeout(playAllTimer); playAllTimer = null; $("#playAll").textContent = "🔊 依次听12词"; return; }
    let index = 0; $("#playAll").textContent = "⏹ 停止朗读";
    const next = () => {
      if (index >= anchorWords.length) { playAllTimer = null; $("#playAll").textContent = "🔊 依次听12词"; return; }
      speak(anchorWords[index++].word, .82); playAllTimer = setTimeout(next, 1550);
    };
    next();
  };

  renderLearn(); renderSelectQuiz(); renderChunkQuiz(); renderFillQuiz(); renderDictation();
  showTab(state.tab || "learn"); updateProgress();
})();
