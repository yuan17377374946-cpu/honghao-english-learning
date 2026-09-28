(() => {
  "use strict";
  const storageKey = "honghao-day18";
  const sectionIds = ["readAloud", "listenChoose", "answerQuestions", "retell", "askQuestions"];
  const extraDictionary = {
    wind:"风", power:"能量；动力", ancient:"古代的", times:"时代；次数", move:"移动", large:"大的", ships:"船（复数）", century:"世纪", technology:"技术", possible:"可能的", produce:"产生", electricity:"电力", farms:"农场（复数）", built:"建造（过去分词）", sea:"海洋",
    plan:"计划", summer:"夏天", holiday:"假期", visit:"参观；拜访", paris:"巴黎", watch:"观看", olympics:"奥运会", twice:"两次", patient:"病人", meet:"见面", free:"有空的；免费的", tomorrow:"明天", dress:"连衣裙", party:"聚会", madam:"女士", colour:"颜色", conversation:"对话", probably:"可能；大概", clothes:"衣服",
    neighbour:"邻居", asked:"询问；请求", take:"拿；带；照顾", care:"照顾", busy:"忙碌的", volunteered:"主动提出", agreed:"同意", fed:"喂养", walked:"遛；步行", clean:"干净的", matter:"事情；要紧", tiring:"令人疲惫的", mind:"想法；头脑", pleasant:"令人愉快的", lovely:"可爱的", friend:"朋友",
    safety:"安全", education:"教育", friday:"星期五", police:"警察", officer:"官员；警官", invited:"被邀请", guest:"嘉宾", protect:"保护", ourselves:"我们自己", danger:"危险", role:"角色", play:"表演；玩", postcards:"明信片（复数）", presents:"礼物（复数）", meaningful:"有意义的"
  };
  const dictionary = { ...(window.DAY17_DICTIONARY || {}), ...extraDictionary };
  let state = loadState();
  const activeRecorders = new Map();

  function loadState() {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); }
    catch (_) { return {}; }
  }
  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  document.querySelectorAll("audio[data-audio]").forEach(audio => {
    audio.src = (window.DAY18_ASSET_BASE || "") + audio.dataset.audio;
  });

  state.completed ||= {};
  state.choices ||= {};
  state.textAnswers ||= {};
  state.words ||= {};

  function updateProgress() {
    const done = sectionIds.filter(id => state.completed[id]).length;
    document.getElementById("progressCount").textContent = `${done} / ${sectionIds.length}`;
    document.querySelectorAll("[data-complete]").forEach(button => {
      const completed = Boolean(state.completed[button.dataset.complete]);
      button.classList.toggle("completed", completed);
      button.textContent = completed ? "✓ 已完成这一关" : "完成这一关";
    });
    if (Number.isInteger(state.choiceScore)) document.getElementById("choiceScore").textContent = `听选信息：${state.choiceScore} / 6`;
  }

  document.querySelectorAll("[data-complete]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.complete;
    state.completed[id] = !state.completed[id];
    saveState();
    updateProgress();
  }));

  document.querySelectorAll(".transcript-toggle").forEach(button => button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    target.hidden = !target.hidden;
    button.textContent = target.hidden ? button.textContent.replace("隐藏", "显示").replace("收起", "核对") : button.textContent.replace("显示", "隐藏").replace("核对", "收起");
  }));

  document.querySelectorAll(".question").forEach(question => {
    const id = question.dataset.question;
    question.querySelectorAll(".choices button").forEach(button => {
      button.classList.toggle("selected", state.choices[id] === button.dataset.value);
      button.addEventListener("click", () => {
        state.choices[id] = button.dataset.value;
        saveState();
        question.querySelectorAll(".choices button").forEach(item => item.classList.toggle("selected", item === button));
        question.classList.remove("checked");
        question.querySelectorAll(".choices button").forEach(item => item.classList.remove("correct", "wrong"));
      });
    });
  });

  document.getElementById("checkChoices").addEventListener("click", () => {
    const questions = [...document.querySelectorAll(".question")];
    const missing = questions.filter(question => !state.choices[question.dataset.question]);
    if (missing.length) {
      document.getElementById("choiceResult").textContent = `还有${missing.length}题没有选择。`;
      missing[0].scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    let score = 0;
    questions.forEach(question => {
      const selected = state.choices[question.dataset.question];
      const correct = question.dataset.answer;
      if (selected === correct) score += 1;
      question.classList.add("checked");
      question.querySelectorAll(".choices button").forEach(button => {
        button.classList.toggle("correct", button.dataset.value === correct);
        button.classList.toggle("wrong", button.dataset.value === selected && selected !== correct);
      });
    });
    state.choiceScore = score;
    state.completed.listenChoose = true;
    saveState();
    document.getElementById("choiceResult").textContent = `本组得分：${score} / 6。记得把正确答案开口读出来。`;
    updateProgress();
  });

  document.querySelectorAll("[data-answer-text]").forEach(field => {
    field.value = state.textAnswers[field.dataset.answerText] || "";
    field.addEventListener("input", () => {
      state.textAnswers[field.dataset.answerText] = field.value;
      saveState();
    });
  });

  document.querySelectorAll(".answer-toggle").forEach(button => button.addEventListener("click", () => {
    if (button.classList.contains("revealed")) return;
    button.classList.add("revealed");
    button.textContent = `参考：${button.dataset.answer}`;
  }));

  document.querySelectorAll(".timer-btn").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.running === "true") return;
    const total = Number(button.dataset.seconds);
    let remaining = total;
    const original = button.innerHTML;
    button.dataset.running = "true";
    button.classList.add("running");
    button.textContent = `⏱ 剩余 ${remaining} 秒`;
    const timer = setInterval(() => {
      remaining -= 1;
      button.textContent = `⏱ 剩余 ${remaining} 秒`;
      if (remaining <= 0) {
        clearInterval(timer);
        button.dataset.running = "false";
        button.classList.remove("running");
        button.classList.add("done");
        button.textContent = "✓ 准备时间结束，再来一次";
        setTimeout(() => { button.classList.remove("done"); button.innerHTML = original; }, 2500);
      }
    }, 1000);
  }));

  document.querySelectorAll(".record-btn").forEach(button => button.addEventListener("click", async () => {
    const box = button.closest(".recorder");
    const id = box.dataset.recorder;
    const existing = activeRecorders.get(id);
    if (existing?.recorder?.state === "recording") {
      existing.recorder.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      box.querySelector(".record-status").textContent = "当前浏览器不支持录音，请换用最新版Chrome。";
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        const playback = box.querySelector(".record-playback");
        if (playback.src) URL.revokeObjectURL(playback.src);
        playback.src = URL.createObjectURL(blob);
        playback.hidden = false;
        button.classList.remove("recording");
        button.textContent = "● 重新录音";
        box.querySelector(".record-status").textContent = "录音完成，请回放检查。";
      };
      recorder.start();
      activeRecorders.set(id, { recorder, stream });
      button.classList.add("recording");
      button.textContent = "■ 停止录音";
      box.querySelector(".record-status").textContent = "正在录音……";
    } catch (_) {
      box.querySelector(".record-status").textContent = "没有获得麦克风权限，可以先使用文字练习。";
    }
  }));

  function normalizeWord(word) { return word.toLowerCase().replace(/’/g, "'").replace(/'s$/, ""); }
  function translationFor(raw) {
    const key = normalizeWord(raw);
    const candidates = [key];
    if (key.endsWith("ies")) candidates.push(`${key.slice(0, -3)}y`);
    if (key.endsWith("ed")) candidates.push(key.slice(0, -2), key.slice(0, -1));
    if (key.endsWith("s")) candidates.push(key.slice(0, -1));
    return candidates.map(item => dictionary[item]).find(Boolean) || "本题中的词语";
  }
  function closeTips() { document.querySelectorAll(".word-tip").forEach(tip => tip.remove()); }
  function markEverywhere(word) { document.querySelectorAll(`.study-word[data-word="${CSS.escape(word)}"]`).forEach(span => span.classList.add("marked")); }
  document.querySelectorAll(".click-words").forEach(area => {
    const walker = document.createTreeWalker(area, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) if (!walker.currentNode.parentElement?.closest("button,.study-word")) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const parts = node.nodeValue.split(/([A-Za-z]+(?:[’'][A-Za-z]+)*)/g);
      if (parts.length === 1) return;
      const fragment = document.createDocumentFragment();
      parts.forEach(part => {
        if (!/^[A-Za-z]+(?:[’'][A-Za-z]+)*$/.test(part)) { fragment.append(document.createTextNode(part)); return; }
        const word = normalizeWord(part);
        const span = document.createElement("span");
        span.className = `study-word${state.words[word] ? " marked" : ""}`;
        span.dataset.word = word;
        span.textContent = part;
        span.addEventListener("click", event => {
          event.stopPropagation(); closeTips(); state.words[word] = true; saveState(); markEverywhere(word);
          const tip = document.createElement("span"); tip.className = "word-tip"; tip.textContent = translationFor(part); span.append(tip);
        });
        fragment.append(span);
      });
      node.replaceWith(fragment);
    });
  });
  document.addEventListener("click", closeTips);
  updateProgress();
})();
