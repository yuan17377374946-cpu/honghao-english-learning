(() => {
  const themes = window.WORD_MATCH_THEMES || {
    sports: {
      icon: "🏀", label: "SPORTS", zh: "运动", accent: "篮球 · 球拍 · 赛道",
      words: [
        ["sports", "运动"], ["basketball", "篮球"], ["football", "足球"],
        ["volleyball", "排球"], ["tennis", "网球"], ["badminton", "羽毛球"],
        ["table tennis", "乒乓球"], ["baseball", "棒球"], ["swimming", "游泳"],
        ["running", "跑步"], ["cycling", "骑自行车"], ["skating", "滑冰"],
        ["skiing", "滑雪"], ["climbing", "攀登"], ["jumping", "跳跃"],
        ["boxing", "拳击"], ["gymnastics", "体操"]
      ]
    },
    clothes: {
      icon: "👕", label: "CLOTHES", zh: "服饰", accent: "上衣 · 鞋帽 · 配饰",
      words: [
        ["clothes", "衣服/服装"], ["T-shirt", "T恤"], ["shirt", "衬衫"],
        ["sweater", "毛衣"], ["coat", "外套"], ["jacket", "夹克"],
        ["dress", "连衣裙"], ["skirt", "裙子"], ["trousers", "长裤"],
        ["shorts", "短裤"], ["jeans", "牛仔裤"], ["shoes", "鞋"],
        ["socks", "袜子"], ["hat", "帽子"], ["cap", "鸭舌帽"],
        ["scarf", "围巾"], ["gloves", "手套"], ["uniform", "校服/制服"],
        ["boots", "靴子"], ["tie", "领带"], ["sandals", "凉鞋"]
      ]
    },
    transportation: {
      icon: "🚗", label: "TRANSPORTATION", zh: "交通工具", accent: "陆地 · 海上 · 空中",
      words: [
        ["transportation", "交通工具"], ["car", "汽车"], ["bus", "公交车"],
        ["taxi", "出租车"], ["bike", "自行车"], ["train", "火车"],
        ["subway", "地铁"], ["plane", "飞机"], ["ship", "轮船"],
        ["boat", "小船"], ["truck", "卡车"], ["motorcycle", "摩托车"],
        ["van", "面包车"], ["helicopter", "直升机"], ["scooter", "踏板车"]
      ]
    }
  };

  const levelGrid = document.getElementById("levelGrid");
  const gameHome = document.getElementById("gameHome");
  const gamePlay = document.getElementById("gamePlay");
  const cardBoard = document.getElementById("cardBoard");
  const feedback = document.getElementById("gameFeedback");
  const clearModal = document.getElementById("clearModal");
  let activeTheme = null;
  let firstCard = null;
  let locked = false;
  let reviewMode = false;
  let reviewPairs = [];
  let reviewRemaining = [];
  let reviewErrors = 0;
  let reviewWrong = [];

  saved.games ||= {};

  function persist() {
    localStorage.setItem(key, JSON.stringify(saved));
  }

  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function freshState(themeKey) {
    return {
      remaining: themes[themeKey].words.map((_, index) => index),
      errors: 0,
      wrong: [],
      completedOrder: [],
      lastTen: []
    };
  }

  function getState(themeKey) {
    const total = themes[themeKey].words.length;
    const current = saved.games[themeKey];
    if (!current || !Array.isArray(current.remaining) || current.remaining.some(i => i < 0 || i >= total)) {
      saved.games[themeKey] = freshState(themeKey);
      persist();
    }
    const state = saved.games[themeKey];
    let changed = false;
    if (!Array.isArray(state.wrong)) {
      state.wrong = [];
      changed = true;
    }
    if (!Array.isArray(state.completedOrder)) {
      state.completedOrder = [];
      changed = true;
    }
    if (!Array.isArray(state.lastTen)) {
      state.lastTen = [];
      changed = true;
    }
    if (changed) persist();
    return state;
  }

  function currentRemaining() {
    return reviewMode ? reviewRemaining : getState(activeTheme).remaining;
  }

  function currentErrors() {
    return reviewMode ? reviewErrors : getState(activeTheme).errors;
  }

  function renderLevels() {
    levelGrid.innerHTML = "";
    Object.entries(themes).forEach(([themeKey, theme]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "level-card";
      button.dataset.theme = themeKey;
      button.innerHTML = `<span class="level-icon">${theme.icon}</span><strong>${theme.label} · ${theme.zh}</strong><small>${theme.accent}</small><span class="level-count">${theme.words.length} 组单词</span>`;
      button.addEventListener("click", () => openTheme(themeKey));
      levelGrid.append(button);
    });
  }

  function openTheme(themeKey) {
    activeTheme = themeKey;
    reviewMode = false;
    reviewPairs = [];
    reviewRemaining = [];
    reviewErrors = 0;
    reviewWrong = [];
    firstCard = null;
    locked = false;
    const theme = themes[themeKey];
    const state = getState(themeKey);
    document.getElementById("gameLabel").textContent = `${theme.icon} ${theme.label} · ${theme.zh}`;
    document.getElementById("gameTitle").textContent = `${theme.label} · ${theme.zh}`;
    gameHome.hidden = true;
    gamePlay.hidden = false;
    clearModal.hidden = true;
    setFeedback("请选择任意两张卡片", "");
    renderBoard();
    if (state.remaining.length === 0) showClear();
  }

  function renderBoard() {
    const theme = themes[activeTheme];
    const deck = [];
    currentRemaining().forEach(index => {
      const [english, chinese] = theme.words[index];
      deck.push({ pair: index, kind: "en", text: english });
      deck.push({ pair: index, kind: "zh", text: chinese });
    });
    cardBoard.innerHTML = "";
    shuffle(deck).forEach(item => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "match-card";
      card.textContent = item.text;
      card.dataset.pair = String(item.pair);
      card.dataset.kind = item.kind;
      card.setAttribute("aria-label", `卡片 ${item.text}`);
      card.addEventListener("click", () => chooseCard(card));
      cardBoard.append(card);
    });
    updateScore();
  }

  function speakEnglish(text) {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(item => /^en(-|_)/i.test(item.lang) && /Google|Microsoft|Samantha|Daniel/i.test(item.name))
      || voices.find(item => /^en(-|_)/i.test(item.lang));
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }

  function chooseCard(card) {
    if (locked || card.classList.contains("gone")) return;
    if (card.dataset.kind === "en") speakEnglish(card.textContent);
    if (card === firstCard) {
      card.classList.remove("selected");
      firstCard = null;
      setFeedback("已取消选择，请重新挑选", "");
      return;
    }
    card.classList.add("selected");
    if (!firstCard) {
      firstCard = card;
      setFeedback("再选择一张卡片", "");
      return;
    }

    const secondCard = card;
    const correct = firstCard.dataset.pair === secondCard.dataset.pair && firstCard.dataset.kind !== secondCard.dataset.kind;
    locked = true;
    if (correct) handleCorrect(firstCard, secondCard);
    else handleWrong(firstCard, secondCard);
  }

  function handleCorrect(cardA, cardB) {
    const theme = themes[activeTheme];
    const pairIndex = Number(cardA.dataset.pair);
    cardA.classList.remove("selected");
    cardB.classList.remove("selected");
    cardA.classList.add("correct");
    cardB.classList.add("correct");
    setFeedback(`✓ ${theme.words[pairIndex][0]} — ${theme.words[pairIndex][1]}`, "good");
    window.setTimeout(() => {
      cardA.classList.add("gone");
      cardB.classList.add("gone");
      if (reviewMode) {
        reviewRemaining = reviewRemaining.filter(index => index !== pairIndex);
      } else {
        const state = getState(activeTheme);
        state.remaining = state.remaining.filter(index => index !== pairIndex);
        if (!state.completedOrder.includes(pairIndex)) state.completedOrder.push(pairIndex);
        persist();
      }
      firstCard = null;
      locked = false;
      updateScore();
      if (currentRemaining().length === 0) window.setTimeout(showClear, 260);
    }, 430);
  }

  function handleWrong(cardA, cardB) {
    const wrongPairs = [Number(cardA.dataset.pair), Number(cardB.dataset.pair)];
    if (reviewMode) {
      reviewErrors += 1;
      wrongPairs.forEach(index => {
        if (!reviewWrong.includes(index)) reviewWrong.push(index);
      });
    } else {
      const state = getState(activeTheme);
      state.errors += 1;
      wrongPairs.forEach(index => {
        if (!state.wrong.includes(index)) state.wrong.push(index);
      });
      persist();
    }
    updateScore();
    cardA.classList.remove("selected");
    cardB.classList.remove("selected");
    cardA.classList.add("wrong");
    cardB.classList.add("wrong");
    setFeedback("这两张卡片不匹配，再找找看", "bad");
    window.setTimeout(() => {
      cardA.classList.remove("wrong");
      cardB.classList.remove("wrong");
      firstCard = null;
      locked = false;
    }, 470);
  }

  function updateScore() {
    if (!activeTheme) return;
    const total = reviewMode ? reviewPairs.length : themes[activeTheme].words.length;
    document.getElementById("doneCount").textContent = `${total - currentRemaining().length} / ${total}`;
    document.getElementById("errorCount").textContent = String(currentErrors());
  }

  function setFeedback(message, style) {
    feedback.textContent = message;
    feedback.className = `game-feedback${style ? ` ${style}` : ""}`;
  }

  function reshuffle() {
    if (!activeTheme || locked) return;
    cardBoard.classList.add("shuffling");
    setFeedback("正在重新洗牌……", "");
    window.setTimeout(() => {
      firstCard = null;
      renderBoard();
      cardBoard.classList.remove("shuffling");
      setFeedback("剩余卡片已重新排列", "");
    }, 360);
  }

  function restart() {
    if (!activeTheme) return;
    if (reviewMode) {
      reviewRemaining = [...reviewPairs];
      reviewErrors = 0;
      reviewWrong = [];
    } else {
      saved.games[activeTheme] = freshState(activeTheme);
      persist();
    }
    firstCard = null;
    locked = false;
    clearModal.hidden = true;
    setFeedback("新一轮开始！", "");
    renderBoard();
  }

  function showClear() {
    const theme = themes[activeTheme];
    const state = getState(activeTheme);
    const lastTen = reviewMode ? reviewPairs : state.completedOrder.slice(-10);
    const errors = reviewMode ? reviewErrors : state.errors;
    const wrong = reviewMode ? reviewWrong : state.wrong;
    if (!reviewMode) {
      state.lastTen = [...lastTen];
      persist();
    }
    document.getElementById("clearTitle").textContent = reviewMode
      ? `${theme.icon} 最后10组复习完成`
      : `${theme.icon} ${theme.label} · ${theme.zh}`;
    const completedTotal = reviewMode ? lastTen.length : theme.words.length;
    document.getElementById("clearStats").innerHTML = `<span>完成 ${completedTotal} 组</span><span>错误 ${errors} 次</span>`;
    const lateList = document.getElementById("lateList");
    if (lastTen.length) {
      const items = lastTen.map(index => `<li><strong>${theme.words[index][0]}</strong><span>${theme.words[index][1]}</span></li>`).join("");
      lateList.hidden = false;
      lateList.innerHTML = `<h3>${reviewMode ? "本次重点练习词" : "本轮最后完成的10组"}</h3>${reviewMode ? "" : "<p>这些单词完成得比较晚，建议再单独练一遍。</p>"}<ul>${items}</ul>`;
    } else {
      lateList.hidden = true;
      lateList.innerHTML = "";
    }
    const mistakeList = document.getElementById("mistakeList");
    if (wrong.length) {
      const items = wrong.map(index => `<li><strong>${theme.words[index][0]}</strong> — ${theme.words[index][1]}</li>`).join("");
      mistakeList.className = "mistake-list";
      mistakeList.innerHTML = `<h3>${reviewMode ? "重点练习中的易错词" : "本关易错词"}</h3><ul>${items}</ul>`;
    } else {
      mistakeList.className = "mistake-list clean";
      mistakeList.innerHTML = "全部一次配对成功，没有易错词！";
    }
    const practiceButton = document.getElementById("practiceLastBtn");
    practiceButton.hidden = lastTen.length === 0;
    practiceButton.textContent = reviewMode ? "🎯 再练这10组" : `🎯 只练这${lastTen.length}组`;
    clearModal.hidden = false;
  }

  function practiceLastTen() {
    if (!activeTheme) return;
    const state = getState(activeTheme);
    const pairs = reviewMode ? reviewPairs : (state.lastTen.length ? state.lastTen : state.completedOrder.slice(-10));
    if (!pairs.length) return;
    reviewMode = true;
    reviewPairs = [...pairs];
    reviewRemaining = [...pairs];
    reviewErrors = 0;
    reviewWrong = [];
    firstCard = null;
    locked = false;
    clearModal.hidden = true;
    const theme = themes[activeTheme];
    document.getElementById("gameLabel").textContent = `${theme.icon} 重点复习`;
    document.getElementById("gameTitle").textContent = `${theme.label} · 最后${pairs.length}组`;
    setFeedback("只练本轮最后完成的单词", "");
    renderBoard();
  }

  function backToLevels() {
    clearModal.hidden = true;
    gamePlay.hidden = true;
    gameHome.hidden = false;
    activeTheme = null;
    reviewMode = false;
    reviewPairs = [];
    reviewRemaining = [];
    firstCard = null;
    locked = false;
  }

  document.getElementById("gameBack").addEventListener("click", backToLevels);
  document.getElementById("homeBtn").addEventListener("click", backToLevels);
  document.getElementById("shuffleBtn").addEventListener("click", reshuffle);
  document.getElementById("restartBtn").addEventListener("click", restart);
  document.getElementById("playAgainBtn").addEventListener("click", restart);
  document.getElementById("practiceLastBtn").addEventListener("click", practiceLastTen);
  renderLevels();
})();
