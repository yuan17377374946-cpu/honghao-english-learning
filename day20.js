(() => {
  "use strict";

  const STORAGE_KEY = "honghao-day20-phonics-v1";
  const state = Object.assign({
    tab: "learn", groupStatus: {}, letterAnswers: {}, letterSubmitted: false,
    letterWrongOnly: false, chunkSolved: {}, chunkBuilds: {}, dictation: {}, hints: {}
  }, readState());

  const groups = [
    {
      id: "short-a", title: "第一组：先听清中间的短音 /æ/",
      intro: "字母 a 在这些单词里发短音 /æ/。先听中间的声音，再找 a。",
      words: [
        { word:"lamp", ipa:"/læmp/", zh:"灯", chunks:["l","a","mp"], note:"a → /æ/；听到 /læmp/ 的中间音，想到字母 a。" },
        { word:"impact", ipa:"/ˈɪmpækt/", zh:"影响", chunks:["im","pact"], note:"pact 中的 a 也发 /æ/，可以分成 im + pact。" },
        { word:"fancy", ipa:"/ˈfænsi/", zh:"精美的；花哨的", chunks:["fan","cy"], note:"a → /æ/；结尾 y 在这里发 /i/。" }
      ]
    },
    {
      id: "vowel-teams", title: "第二组：两个元音字母可以合发一个长音",
      intro: "看到 ie、oo 时，先把两个字母看成一个声音块，不要拆开读。",
      words: [
        { word:"belief", ipa:"/bɪˈliːf/", zh:"信念；看法", chunks:["be","lief"], note:"ie → /iː/；重读后半部分 lief。" },
        { word:"fool", ipa:"/fuːl/", zh:"欺骗；愚弄", chunks:["f","oo","l"], note:"oo → /uː/；两个 o 合起来发一个长音。" }
      ]
    },
    {
      id: "silent-e", title: "第三组：结尾 e 不发音，却会改变前面的元音",
      intro: "a_e、i_e、o_e 中，最后的 e 通常不发音，前面的元音读字母音。prove 是本组特殊词。",
      words: [
        { word:"displace", ipa:"/dɪsˈpleɪs/", zh:"排开；取代", chunks:["dis","place"], note:"place 中 a_e → /eɪ/；拆成 dis + place。" },
        { word:"milestone", ipa:"/ˈmaɪlstəʊn/", zh:"里程碑；重要事件", chunks:["mile","stone"], note:"mile 中 i_e → /aɪ/；stone 中 o_e → /əʊ/。" },
        { word:"prove", ipa:"/pruːv/", zh:"证明；证实", chunks:["pr","o","ve"], note:"特殊情况：prove 中的 o 发 /uː/，需要单独记住。", special:true }
      ]
    },
    {
      id: "word-chunks", title: "第四组：长单词先拆成词块",
      intro: "长单词不按字母个数背。先听节奏，再记熟悉的小词、前缀或结尾。",
      words: [
        { word:"outstanding", ipa:"/aʊtˈstændɪŋ/", zh:"优秀的；杰出的", chunks:["out","stand","ing"], note:"out + stand + ing，三个词块分别记。" },
        { word:"background", ipa:"/ˈbækɡraʊnd/", zh:"背景", chunks:["back","ground"], note:"back + ground，两个熟悉的小词组成大词。" },
        { word:"hardly", ipa:"/ˈhɑːdli/", zh:"几乎不", chunks:["hard","ly"], note:"hard + ly；-ly 是常见结尾，通常读 /li/。" },
        { word:"application", ipa:"/ˌæplɪˈkeɪʃən/", zh:"应用；申请", chunks:["ap","pli","ca","tion"], note:"结尾 tion → /ʃən/；把 tion 当成一个整体记。" }
      ]
    }
  ];

  const allWords = groups.flatMap(group => group.words);
  const letterQuestions = [
    { word:"lamp", display:"l_mp", answer:"a", options:["a","e","o"], note:"lamp 中间的 /æ/ 对应字母 a。" },
    { word:"impact", display:"imp_ct", answer:"a", options:["a","e","i"], note:"impact 的后半部分 pact 中，a 发 /æ/。" },
    { word:"fancy", display:"f_ncy", answer:"a", options:["o","a","u"], note:"fancy 的第一个音节 fan 中，a 发 /æ/。" },
    { word:"belief", display:"bel__f", answer:"ie", options:["ee","ie","ea"], note:"belief 中 ie 发长音 /iː/。" },
    { word:"fool", display:"f__l", answer:"oo", options:["ou","oo","u"], note:"fool 中 oo 合起来发 /uː/。" },
    { word:"displace", display:"displ_ce", answer:"a", options:["i","a","o"], note:"place 是 a_e 结构，a 发 /eɪ/。" },
    { word:"milestone", display:"m_le", answer:"i", options:["i","a","o"], note:"mile 是 i_e 结构，i 发 /aɪ/。" },
    { word:"outstanding", display:"outstand___", answer:"ing", options:["eng","ing","ang"], note:"outstanding 结尾是常见词块 -ing。" },
    { word:"background", display:"backgr__nd", answer:"ou", options:["au","ou","ow"], note:"ground 中 ou 发 /aʊ/。" },
    { word:"hardly", display:"hard__", answer:"ly", options:["li","ley","ly"], note:"副词 hardly 结尾拼作 -ly。" },
    { word:"application", display:"applica____", answer:"tion", options:["sion","tion","cion"], note:"application 结尾 /ʃən/ 拼作 tion。" },
    { word:"prove", display:"pr_ve", answer:"o", options:["u","oo","o"], note:"prove 是特殊词，拼写仍是 o_e，但 o 发 /uː/。" }
  ];

  const chunkQuestions = [
    { word:"outstanding", chunks:["out","stand","ing"] },
    { word:"background", chunks:["back","ground"] },
    { word:"milestone", chunks:["mile","stone"] },
    { word:"displace", chunks:["dis","place"] },
    { word:"hardly", chunks:["hard","ly"] },
    { word:"application", chunks:["ap","pli","ca","tion"] }
  ];

  const dictationWords = ["lamp","fancy","fool","displace","background"];
  let pronunciationAudio = null;
  let playAllTimer = null;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  function readState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch (_) { return {}; }
  }
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); updateProgress(); }
  function shuffled(items, seed = 0) {
    return [...items].sort((a, b) => ((String(a).charCodeAt(0) + seed * 7) % 11) - ((String(b).charCodeAt(0) + seed * 3) % 11));
  }
  function wordData(word) { return allWords.find(item => item.word === word); }

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
    pronunciationAudio = audio; audio.preload = "auto"; audio.playbackRate = rate;
    audio.onerror = fallback;
    audio.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`;
    const promise = audio.play();
    if (promise && promise.catch) promise.catch(fallback);
  }

  function renderLearn() {
    const host = $("#ruleGroups"); host.innerHTML = "";
    groups.forEach(group => {
      const section = document.createElement("section"); section.className = "rule-group";
      const title = document.createElement("div"); title.className = "rule-title";
      const copy = document.createElement("div"); copy.innerHTML = `<h3>${group.title}</h3><p>${group.intro}</p>`;
      const status = document.createElement("div"); status.className = "group-status";
      [["know","✓ 会按声音拼"],["review","↻ 还要练"]].forEach(([value,label]) => {
        const button = document.createElement("button"); button.className = `status-btn ${state.groupStatus[group.id] === value ? "selected" : ""}`;
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
  }

  function renderLetterQuiz() {
    const host = $("#letterQuiz"); host.innerHTML = "";
    const visible = state.letterWrongOnly
      ? letterQuestions.filter(q => state.letterAnswers[q.word] !== q.answer) : letterQuestions;
    visible.forEach((question, index) => {
      const card = document.createElement("article"); card.className = "quiz-card";
      const selected = state.letterAnswers[question.word];
      const display = question.display.replace(/_+/g, match => `<span class="blank">${match}</span>`);
      card.innerHTML = `<div class="quiz-head"><strong>${display}</strong><button class="audio-btn" type="button">🔊 听单词</button></div><div class="choice-row"></div><p class="feedback"></p>`;
      card.querySelector(".audio-btn").onclick = () => speak(question.word, .82);
      const row = card.querySelector(".choice-row");
      question.options.forEach(option => {
        const button = document.createElement("button"); button.type = "button"; button.className = `choice ${selected === option ? "selected" : ""}`; button.textContent = option;
        if (state.letterSubmitted) {
          if (option === question.answer) button.classList.add("correct");
          else if (selected === option) button.classList.add("wrong");
          button.disabled = true;
        }
        button.onclick = () => { state.letterAnswers[question.word] = option; save(); renderLetterQuiz(); };
        row.append(button);
      });
      const feedback = card.querySelector(".feedback");
      if (state.letterSubmitted) {
        const correct = selected === question.answer; feedback.className = `feedback ${correct ? "good" : "bad"}`;
        feedback.textContent = `${correct ? "✓ 正确。" : `正确答案：${question.answer}。`}${question.note}`;
      } else feedback.textContent = `${index + 1}. 先听，再选择缺少的字母。`;
      host.append(card);
    });
    const answered = letterQuestions.filter(q => state.letterAnswers[q.word]).length;
    $("#letterCounter").textContent = `${answered} / 12`;
    $("#submitLetters").disabled = answered < 12 || state.letterSubmitted;
    $("#submitLetters").hidden = state.letterSubmitted;
    const wrong = letterQuestions.filter(q => state.letterAnswers[q.word] !== q.answer);
    $("#retryLetters").hidden = !state.letterSubmitted || !wrong.length;
    if (state.letterSubmitted) {
      const score = 12 - wrong.length; $("#letterResult").textContent = `得分 ${score} / 12${score === 12 ? "，全部正确！" : `，还有 ${wrong.length} 题需要再练。`}`;
      $("#letterResult").className = score === 12 ? "perfect" : "";
    } else { $("#letterResult").textContent = ""; $("#letterResult").className = ""; }
  }

  function renderChunkQuiz() {
    const host = $("#chunkQuiz"); host.innerHTML = "";
    chunkQuestions.forEach((question, index) => {
      const solved = Boolean(state.chunkSolved[question.word]);
      const build = state.chunkBuilds[question.word] || [];
      const options = shuffled(question.chunks.map((chunk, i) => ({ chunk, i })), index + 1);
      const card = document.createElement("article"); card.className = `chunk-card ${solved ? "done" : ""}`;
      card.innerHTML = `<div class="chunk-title"><h3>${index + 1}. ${wordData(question.word).zh}</h3><button class="audio-btn" type="button">🔊 听单词</button></div><div class="build-line ${build.length ? "" : "empty"}">${build.length ? build.map(x => x.chunk).join(" | ") : "按听到的顺序点击下面的词块"}</div><div class="chunk-options"></div><div class="chunk-controls"><p class="chunk-feedback ${solved ? "good" : ""}">${solved ? "✓ 拼写正确" : ""}</p><button class="hint-btn reset" type="button">重新排列</button></div>`;
      card.querySelector(".audio-btn").onclick = () => speak(question.word, .78);
      const optionHost = card.querySelector(".chunk-options");
      options.forEach(option => {
        const used = build.some(item => item.i === option.i);
        const button = document.createElement("button"); button.type = "button"; button.className = "chunk-btn"; button.textContent = option.chunk; button.disabled = solved || used;
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
      card.querySelector(".reset").onclick = () => { state.chunkBuilds[question.word] = []; if (!solved) delete state.chunkSolved[question.word]; save(); renderChunkQuiz(); };
      host.append(card);
    });
    $("#chunkCounter").textContent = `${chunkQuestions.filter(q => state.chunkSolved[q.word]).length} / 6`;
  }

  function renderDictation() {
    const host = $("#dictationList"); host.innerHTML = "";
    dictationWords.forEach((word, index) => {
      const item = wordData(word); const entry = state.dictation[word] || { value:"", correct:false, tries:0 };
      const card = document.createElement("article"); card.className = `dictation-card ${entry.correct ? "done" : ""}`;
      card.innerHTML = `<div class="dictation-no">${index + 1}</div><div class="dictation-main"><label>中文提示：${item.zh}</label><div class="dictation-input-row"><input class="dictation-input ${entry.correct ? "correct" : ""}" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" value="${escapeHtml(entry.value || "")}" placeholder="听发音后输入完整单词"><button class="check-btn" type="button">检查</button></div><p class="dictation-feedback">${entry.correct ? "✓ 拼写正确" : entry.tries ? `已经尝试 ${entry.tries} 次，再听一遍。` : "先点击右侧发音按钮。"}</p>${state.hints[word] ? `<div class="hint-box">词块提示：${item.chunks.join(" | ")}</div>` : ""}</div><div class="dictation-actions"><button class="audio-btn normal" type="button">🔊 正常</button><button class="audio-btn slow" type="button">🐢 慢速</button><button class="hint-btn show-hint" type="button">显示词块</button></div>`;
      const input = card.querySelector("input");
      card.querySelector(".normal").onclick = () => speak(word, .9);
      card.querySelector(".slow").onclick = () => speak(word, .6);
      card.querySelector(".show-hint").onclick = () => { state.hints[word] = !state.hints[word]; save(); renderDictation(); };
      const check = () => {
        const value = input.value.trim().toLowerCase(); const current = state.dictation[word] || { tries:0 };
        state.dictation[word] = { value, correct:value === word, tries:(current.tries || 0) + 1 };
        save(); renderDictation(); if (value === word) toast("正确！声音和拼写对应上了。");
      };
      card.querySelector(".check-btn").onclick = check;
      input.onkeydown = event => { if (event.key === "Enter") check(); };
      input.oninput = () => { const current = state.dictation[word] || { tries:0, correct:false }; state.dictation[word] = { ...current, value:input.value }; save(); };
      host.append(card);
    });
    const correct = dictationWords.filter(word => state.dictation[word]?.correct).length;
    $("#dictationCounter").textContent = `${correct} / 5`;
    const summary = $("#finalSummary"); summary.hidden = correct < 5;
    if (correct === 5) summary.innerHTML = `<h3>今天的5词听写完成了</h3><p>已经能够把部分发音规律用于拼写。下一次遇到新词时，继续先听声音，再找字母组合和词块。</p>`;
  }

  function escapeHtml(value) { const div = document.createElement("div"); div.textContent = value; return div.innerHTML; }
  function moduleDone(tab) {
    if (tab === "learn") return groups.every(group => state.groupStatus[group.id]);
    if (tab === "letters") return state.letterSubmitted;
    if (tab === "chunks") return chunkQuestions.every(q => state.chunkSolved[q.word]);
    if (tab === "dictation") return dictationWords.every(word => state.dictation[word]?.correct);
    return false;
  }
  function updateProgress() {
    const tabs = ["learn","letters","chunks","dictation"]; const done = tabs.filter(moduleDone).length;
    $("#overallProgress").textContent = `${done} / 4`; $("#progressBar").style.width = `${done / 4 * 100}%`;
    $$(".tab").forEach(button => button.classList.toggle("done", moduleDone(button.dataset.tab)));
  }
  function showTab(tab) {
    state.tab = tab; save();
    ["learn","letters","chunks","dictation"].forEach(id => { $("#" + id).hidden = id !== tab; });
    $$(".tab").forEach(button => button.classList.toggle("active", button.dataset.tab === tab));
    if (tab === "letters") renderLetterQuiz(); if (tab === "chunks") renderChunkQuiz(); if (tab === "dictation") renderDictation();
    window.scrollTo({ top:0, behavior:"smooth" });
  }
  function toast(message, warning = false) {
    const host = $("#toast"); host.textContent = message; host.hidden = false; host.style.borderColor = warning ? "#e1b171" : "#9dc8ae";
    clearTimeout(toast.timer); toast.timer = setTimeout(() => { host.hidden = true; }, 1900);
  }

  $$(".tab").forEach(button => button.onclick = () => showTab(button.dataset.tab));
  $("#submitLetters").onclick = () => { state.letterSubmitted = true; state.letterWrongOnly = false; save(); renderLetterQuiz(); };
  $("#retryLetters").onclick = () => {
    const wrongWords = letterQuestions.filter(q => state.letterAnswers[q.word] !== q.answer).map(q => q.word);
    wrongWords.forEach(word => delete state.letterAnswers[word]); state.letterSubmitted = false; state.letterWrongOnly = true; save(); renderLetterQuiz();
  };
  $("#playAll").onclick = () => {
    if (playAllTimer) { clearTimeout(playAllTimer); playAllTimer = null; $("#playAll").textContent = "🔊 依次听12词"; return; }
    let index = 0; $("#playAll").textContent = "⏹ 停止朗读";
    const next = () => { if (index >= allWords.length) { playAllTimer = null; $("#playAll").textContent = "🔊 依次听12词"; return; } speak(allWords[index++].word, .82); playAllTimer = setTimeout(next, 1550); };
    next();
  };

  renderLearn(); renderLetterQuiz(); renderChunkQuiz(); renderDictation(); showTab(state.tab || "learn"); updateProgress();
})();
