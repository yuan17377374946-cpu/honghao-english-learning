(() => {
  const themes = {
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
      wrong: []
    };
  }

  function getState(themeKey) {
    const total = themes[themeKey].words.length;
    const current = saved.games[themeKey];
    if (!current || !Array.isArray(current.remaining) || current.remaining.some(i => i < 0 || i >= total)) {
      saved.games[themeKey] = freshState(themeKey);
      persist();
    }
    return saved.games[themeKey];
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
    const state = getState(activeTheme);
    const deck = [];
    state.remaining.forEach(index => {
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

  function chooseCard(card) {
    if (locked || card.classList.contains("gone")) return;
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
      const state = getState(activeTheme);
      state.remaining = state.remaining.filter(index => index !== pairIndex);
      persist();
      firstCard = null;
      locked = false;
      updateScore();
      if (state.remaining.length === 0) window.setTimeout(showClear, 260);
    }, 430);
  }

  function handleWrong(cardA, cardB) {
    const state = getState(activeTheme);
    state.errors += 1;
    [Number(cardA.dataset.pair), Number(cardB.dataset.pair)].forEach(index => {
      if (!state.wrong.includes(index)) state.wrong.push(index);
    });
    persist();
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
    const total = themes[activeTheme].words.length;
    const state = getState(activeTheme);
    document.getElementById("doneCount").textContent = `${total - state.remaining.length} / ${total}`;
    document.getElementById("errorCount").textContent = String(state.errors);
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
    saved.games[activeTheme] = freshState(activeTheme);
    persist();
    firstCard = null;
    locked = false;
    clearModal.hidden = true;
    setFeedback("新一轮开始！", "");
    renderBoard();
  }

  function showClear() {
    const theme = themes[activeTheme];
    const state = getState(activeTheme);
    document.getElementById("clearTitle").textContent = `${theme.icon} ${theme.label} · ${theme.zh}`;
    document.getElementById("clearStats").innerHTML = `<span>完成 ${theme.words.length} 组</span><span>错误 ${state.errors} 次</span>`;
    const mistakeList = document.getElementById("mistakeList");
    if (state.wrong.length) {
      const items = state.wrong.map(index => `<li><strong>${theme.words[index][0]}</strong> — ${theme.words[index][1]}</li>`).join("");
      mistakeList.className = "mistake-list";
      mistakeList.innerHTML = `<h3>本关易错词</h3><ul>${items}</ul>`;
    } else {
      mistakeList.className = "mistake-list clean";
      mistakeList.innerHTML = "全部一次配对成功，没有易错词！";
    }
    clearModal.hidden = false;
  }

  function backToLevels() {
    clearModal.hidden = true;
    gamePlay.hidden = true;
    gameHome.hidden = false;
    activeTheme = null;
    firstCard = null;
    locked = false;
  }

  document.getElementById("gameBack").addEventListener("click", backToLevels);
  document.getElementById("homeBtn").addEventListener("click", backToLevels);
  document.getElementById("shuffleBtn").addEventListener("click", reshuffle);
  document.getElementById("restartBtn").addEventListener("click", restart);
  document.getElementById("playAgainBtn").addEventListener("click", restart);
  renderLevels();
})();
