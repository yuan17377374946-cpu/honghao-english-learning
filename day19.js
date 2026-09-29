(() => {
  "use strict";

  const STORAGE_KEY = "honghao-day19";
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (_) { saved = {}; }
  saved.games ||= {};
  saved.classwork ||= { cloze: {}, grammar: {} };
  saved.knowledge ||= {};
  saved.marks ||= {};
  const persist = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

  const unit1 = [
    ["outstanding", "杰出的；优秀的"], ["old-fashioned", "老式的；过时的"], ["classical", "古典的"],
    ["ordinary", "普通的；平凡的"], ["lamp", "灯"], ["poet", "诗人"],
    ["convinced", "确信的；深信的"], ["philosopher", "哲学家"], ["dramatist", "剧作家"],
    ["judgement", "判断；评价"], ["evaluation", "评价；评估"], ["consider", "认为；考虑"],
    ["background", "背景"], ["significant", "重要的；意义重大的"], ["milestone", "里程碑；重大事件"],
    ["manage", "设法做到；管理"], ["impact", "影响"], ["truth", "真理；事实"],
    ["concentrated", "专心的；全神贯注的"], ["belief", "信念；看法"],
    ["with something in mind", "心里想着某事"], ["in addition to", "除……以外（还）"],
    ["be fond of", "喜欢"], ["reach for", "伸手去拿"], ["fight for", "为……而奋斗"]
  ];

  const unit2 = [
    ["firm", "坚固的；牢固的"], ["ignorance", "无知"], ["application", "应用；申请"],
    ["fancy", "精美的；花哨的"], ["satisfied", "满意的"], ["prince", "王子"],
    ["displace", "取代；排开"], ["fool", "欺骗；愚弄"], ["prison", "监狱"],
    ["wire", "金属丝；电线"], ["prove", "证明"], ["hardly", "几乎不"],
    ["balanced", "平衡的"], ["reject", "拒绝"], ["thus", "因此；从而"],
    ["be satisfied with", "对……感到满意"], ["fill…with", "用……装满……"],
    ["run over", "溢出"], ["go straight to", "径直去……"], ["lightning rod", "避雷针"],
    ["as a whole", "整体上"], ["get something across", "把某事讲清楚"]
  ];

  const keyPhrases = [
    ["grow up in a family that…", "在一个……的家庭中长大"], ["have a talent for", "在……方面有天赋"],
    ["spend a lot of time doing", "花大量时间做……"], ["build one’s knowledge", "积累知识"],
    ["be made up of", "由……组成"], ["name…after…", "以……的名字命名"],
    ["take…for example", "以……为例"], ["thanks to", "多亏；由于"],
    ["be considered to be", "被认为是……"], ["be remembered for", "因……而被铭记"],
    ["manage to do", "设法完成……"], ["by accident", "偶然；意外地"],
    ["be made completely of", "完全由……制成"], ["think about", "思考；考虑"],
    ["of the same weight", "重量相同的"], ["send…to prison", "把……送进监狱"],
    ["come up with", "想出；提出"], ["prove that", "证明……"],
    ["be translated as", "被翻译为……"], ["respect the laws of nature", "尊重自然规律"],
    ["have a lasting impact on", "对……产生长久影响"], ["live in harmony with", "与……和谐相处"],
    ["think outside the box", "跳出固有思维"], ["one step at a time", "一步一步地"]
  ];

  const gameThemes = {
    unit1: { icon: "🔭", label: "UNIT 1", zh: "教材单词与词组", accent: "Great people · 25组", words: unit1 },
    unit2: { icon: "💡", label: "UNIT 2", zh: "教材单词与词组", accent: "Great ideas · 22组", words: unit2 },
    phrases: { icon: "📚", label: "KEY PHRASES", zh: "课文重点词组", accent: "两单元课文 · 24组", words: keyPhrases }
  };

  const clozeData = {
    paragraphs: [
      "Wang Zhenyi was an {{1}} woman scholar in the Qing dynasty. She grew up in a family that valued education and was {{2}} learning. {{3}} mathematics and astronomy, she also had a talent for poetry.",
      "When Wang studied difficult science books, she kept one goal {{4}}: ordinary people should be able to understand science. She stayed {{5}} on her work and {{6}} to rewrite a difficult maths book in a clearer way.",
      "At only 24, she created a simpler method of calculation. This was a {{7}} achievement. She was later {{8}} to be one of the great women scholars in Chinese history. Naming a crater on Venus after her was an important {{9}}, and her work continues to have an {{10}} today."
    ],
    items: [
      { options:["ordinary","outstanding","old-fashioned"], answer:"outstanding", note:"outstanding表示“杰出的”，符合人物介绍。" },
      { options:["fond of","afraid of","different from"], answer:"fond of", note:"be fond of表示“喜欢”。" },
      { options:["Because of","Instead of","In addition to"], answer:"In addition to", note:"此处表示“除数学和天文学以外，她还……”。" },
      { options:["in mind","by accident","as a whole"], answer:"in mind", note:"keep something in mind表示“把某事记在心里”。" },
      { options:["balanced","concentrated","satisfied"], answer:"concentrated", note:"stay concentrated on表示“保持专注于”。" },
      { options:["managed","rejected","fooled"], answer:"managed", note:"manage to do表示“设法完成某事”。" },
      { options:["fancy","firm","significant"], answer:"significant", note:"significant表示“重要的；意义重大的”。" },
      { options:["considered","displaced","reached"], answer:"considered", note:"be considered to be表示“被认为是”。" },
      { options:["background","milestone","judgement"], answer:"milestone", note:"milestone表示“里程碑；重大事件”。" },
      { options:["application","impact","truth"], answer:"impact", note:"have an impact表示“产生影响”。" }
    ]
  };

  const grammarData = {
    paragraphs: [
      "King Hiero was not {{1}} with simply looking at his golden crown. He wanted to know whether it was {{2}} made of gold, so he asked Archimedes {{3}} he could test it without breaking it.",
      "While Archimedes was taking a bath, some water {{4}} over. He realized that an object {{5}} water when it was put into a full pot. To {{6}} the truth, he compared the crown with gold of the same weight.",
      "It was clear {{7}} the crown pushed out more water. Archimedes gave the king {{8}} firm answer: another metal had been mixed with the gold. The crown maker {{9}} to prison, and Archimedes’ idea became a {{10}} example of solving a problem through careful observation."
    ],
    items: [
      { options:["satisfy","satisfied","satisfying"], answer:"satisfied", note:"be satisfied with是固定搭配。" },
      { options:["complete","completely","completion"], answer:"completely", note:"修饰made要用副词completely。" },
      { options:["whether","that","which"], answer:"whether", note:"表示“是否能检验”，使用whether。" },
      { options:["runs","ran","running"], answer:"ran", note:"故事发生在过去，使用一般过去时。" },
      { options:["displaces","is displaced","displacing"], answer:"displaces", note:"主语an object是动作执行者，且说明一般规律。" },
      { options:["prove","proved","proving"], answer:"prove", note:"to后接动词原形，构成不定式。" },
      { options:["what","whether","that"], answer:"that", note:"It was clear that…中that引导真正的主语从句。" },
      { options:["a","an","the"], answer:"a", note:"第一次提到一个明确答复，firm以辅音音素开头。" },
      { options:["sent","was sent","is sent"], answer:"was sent", note:"制造者“被送进”监狱，使用一般过去时的被动语态。" },
      { options:["significance","significant","significantly"], answer:"significant", note:"修饰名词example要用形容词。" }
    ]
  };

  const q = (id, prompt, options, answer, explanation) => ({ id, prompt, options, answer, explanation });

  function meaningQuestions(prefix, entries, offset = 0) {
    const meanings = entries.map(item => item[1]);
    return entries.map((item, index) => {
      const answer = item[1];
      const distractors = [meanings[(index + 3) % meanings.length], meanings[(index + 8) % meanings.length]].filter((value, i, arr) => value !== answer && arr.indexOf(value) === i);
      for (let step = 1; distractors.length < 2; step += 1) {
        const candidate = meanings[(index + step) % meanings.length];
        if (candidate !== answer && !distractors.includes(candidate)) distractors.push(candidate);
      }
      const raw = [answer, ...distractors];
      const shift = (index + offset) % 3;
      const options = raw.slice(shift).concat(raw.slice(0, shift));
      return q(`${prefix}-${index + 1}`, `“${item[0]}”的中文意思是？`, options, answer, `${item[0]} — ${item[1]}`);
    });
  }

  const unit1Grammar = [
    q("u1g-1","I am surprised ___ Wang finished the difficult work at such a young age.",["that","what","whether"],"that","形容词surprised后用that从句说明感到惊讶的事情。"),
    q("u1g-2","We are sure ___ hard work can lead to progress.",["why","that","when"],"that","be sure that…表示“确信……”。"),
    q("u1g-3","I am not certain ___ he will join us or not.",["whether","that","who"],"whether","有or not时用whether表示“是否”。"),
    q("u1g-4","The teacher is not sure ___ book the student needs.",["which","that","whether"],"which","空格后有名词book，要用which表示“哪一本”。"),
    q("u1g-5","She was amazed ___ quickly Wang learnt astronomy.",["how","what","that"],"how","how修饰副词quickly，表示“多么快”。"),
    q("u1g-6","He is unsure ___ to explain the idea clearly.",["how","whether","that"],"how","how to do表示“怎样做”。"),
    q("u1g-7","It is clear ___ Wang valued education.",["that","what","who"],"that","It is clear that…中that引导真正的主语从句。"),
    q("u1g-8","I am glad ___ you understand the story.",["whether","that","which"],"that","be glad that…表示“很高兴……”。"),
    q("u1g-9","She is not certain ___ moved the lamp.",["who","that","whether"],"who","从句缺少表示人的主语，使用who。"),
    q("u1g-10","选择正确的句子。",["I am sure he can that do it.","I am sure that he can do it.","I sure that he can do it."],"I am sure that he can do it.","正确结构是主语＋be动词＋形容词＋that从句。"),
    q("u1g-11","在“She was happy that her book was easy to understand.”中，that从句说明什么？",["她高兴的原因或内容","她做事的时间","她去过的地点"],"她高兴的原因或内容","that从句补充说明形容词happy的具体内容。"),
    q("u1g-12","I’m not sure ___ the answer is correct.",["whether","what","how many"],"whether","表示“不确定答案是否正确”，用whether。")
  ];

  const unit2Grammar = [
    q("u2g-1","“Archimedes was a great thinker.”属于哪种句子？",["陈述句","一般疑问句","感叹句"],"陈述句","这句话陈述一个事实。"),
    q("u2g-2","“Did he solve the problem?”属于哪种问句？",["特殊疑问句","一般疑问句","选择疑问句"],"一般疑问句","可以用Yes或No回答。"),
    q("u2g-3","“Why did the water run over?”属于哪种问句？",["特殊疑问句","一般疑问句","选择疑问句"],"特殊疑问句","句首有疑问词Why。"),
    q("u2g-4","“Was the crown gold or another metal?”属于哪种问句？",["选择疑问句","一般疑问句","陈述句"],"选择疑问句","句中用or提供两个选择。"),
    q("u2g-5","“Fill the pot with water.”属于哪种句子？",["祈使句","感叹句","陈述句"],"祈使句","句子用动词原形开头，表示指令。"),
    q("u2g-6","“What a clever idea it is!”属于哪种句子？",["感叹句","特殊疑问句","祈使句"],"感叹句","What＋名词短语构成感叹句。"),
    q("u2g-7","“How clever Archimedes was!”属于哪种句子？",["感叹句","陈述句","一般疑问句"],"感叹句","How＋形容词＋主语＋谓语构成感叹句。"),
    q("u2g-8","Where did Archimedes get the idea___",["?","!","."],"?","特殊疑问句句末使用问号。"),
    q("u2g-9","“Did Franklin invent the lightning rod?”最合适的回答是：",["Yes, he did.","A lightning rod.","In America."],"Yes, he did.","一般疑问句通常用Yes或No回答。"),
    q("u2g-10","“Is the object heavy or light?”最合适的回答是：",["It is heavy.","Yes, it is.","Because it is metal."],"It is heavy.","选择疑问句要从给出的选项中作出选择。"),
    q("u2g-11","祈使句的肯定形式通常以什么开头？",["动词原形","主语I","助动词did"],"动词原形","肯定祈使句通常省略主语you，以动词原形开头。"),
    q("u2g-12","选择正确的否定祈使句。",["Don’t touch the wire.","Not touch the wire.","Doesn’t touch the wire."],"Don’t touch the wire.","否定祈使句使用Don’t＋动词原形。"),
    q("u2g-13","陈述句最基本的结构通常是：",["主语＋谓语","疑问词＋助动词","What＋名词"],"主语＋谓语","陈述句用主语和谓语陈述事实或观点。"),
    q("u2g-14","选择正确的What感叹句。",["What a great idea it is!","What great an idea it is!","What is a great idea!"],"What a great idea it is!","单数可数名词结构为What＋a/an＋形容词＋名词＋主语＋谓语。"),
    q("u2g-15","选择正确的How感叹句。",["How useful the idea is!","How the idea is useful!","How a useful idea is!"],"How useful the idea is!","How＋形容词＋主语＋谓语。")
  ];

  const mainTextQuestions = [
    q("text-1","王贞仪主要研究了哪些领域？",["数学和天文学","医学和化学","音乐和绘画"],"数学和天文学","课文介绍她是数学家和天文学家，同时也有诗歌才能。"),
    q("text-2","王贞仪小时候从谁那里学习天文学？",["祖父","父亲","祖母"],"祖父","她向父亲学数学、向祖父学天文学、向祖母学诗歌。"),
    q("text-3","她为什么重写梅文鼎的计算书？",["让内容更清楚、更容易理解","把它改成诗歌","证明旧书完全错误"],"让内容更清楚、更容易理解","她认识到科学文字应该写得清楚，让普通人也能理解。"),
    q("text-4","金星上的环形山为什么以王贞仪命名？",["纪念她的成就","因为她发现了金星","因为她活到了九十岁"],"纪念她的成就","国际天文学联合会用她的名字命名金星上的一个环形山，以纪念她。"),
    q("text-5","国王让阿基米德解决什么问题？",["王冠是否完全由黄金制成","王冠有多漂亮","怎样制作更大的王冠"],"王冠是否完全由黄金制成","国王怀疑王冠不是纯金的。"),
    q("text-6","阿基米德在什么情况下想到了解决办法？",["洗澡时看到水溢出","吃饭时看到金碗","散步时看到闪电"],"洗澡时看到水溢出","进入装满水的浴缸时，水溢出的现象启发了他。"),
    q("text-7","他怎样比较王冠和黄金？",["比较同重量物体排开的水量","比较它们的颜色","把王冠直接打碎"],"比较同重量物体排开的水量","王冠排出的水比同重量黄金更多，说明混入了其他金属。"),
    q("text-8","真相查明后，王冠制造者怎么样了？",["被送进监狱","得到了奖励","成为了王子"],"被送进监狱","国王发现自己受骗，把制造者送进了监狱。")
  ];

  const cultureQuestions = [
    q("culture-1","陈望道为什么误把墨汁当成红糖蘸粽子？",["他太专心翻译《共产党宣言》","房间里完全没有灯","他想做一个实验"],"他太专心翻译《共产党宣言》","故事用“真理的味道是甜的”表现他的专注和信念。"),
    q("culture-2","弗莱明的青霉素发现最初来自什么？",["一次偶然观察","国王下达的任务","一次闪电实验"],"一次偶然观察","他发现培养皿中的霉菌周围没有细菌，由此发现青霉素。"),
    q("culture-3","富兰克林的风筝实验与哪项发明有关？",["避雷针","蒸汽机","望远镜"],"避雷针","该实验帮助证明闪电与电有关，并推动了避雷针的发明。"),
    q("culture-4","《道德经》中“道”常被翻译为什么？",["Way","Truth","Power"],"Way","课文说明Dao常被译为Way。"),
    q("culture-5","老子的思想提倡怎样的生活？",["简单、平和、平衡并尊重自然","控制自然的一切","只追求速度和竞争"],"简单、平和、平衡并尊重自然","课文强调尊重自然规律、与自然和谐相处。"),
    q("culture-6","“think outside the box”主要表示什么？",["不受限制地创造性思考","把答案写在盒子外面","只按照旧方法做事"],"不受限制地创造性思考","它表示跳出固有思维，从不同角度寻找办法。")
  ];

  const u1Meaning = meaningQuestions("u1", unit1, 0);
  const u2Meaning = meaningQuestions("u2", unit2, 1);
  const phraseMeaning = meaningQuestions("phrase", keyPhrases, 2);
  const quizLevels = [
    { id:"u1a", title:"Unit 1 单词清单 A", description:"前13组教材词汇", questions:u1Meaning.slice(0,13) },
    { id:"u1b", title:"Unit 1 单词清单 B", description:"后12组教材词汇与短语", questions:u1Meaning.slice(13) },
    { id:"u2a", title:"Unit 2 单词清单 A", description:"前11组教材词汇", questions:u2Meaning.slice(0,11) },
    { id:"u2b", title:"Unit 2 单词清单 B", description:"后11组教材词汇与短语", questions:u2Meaning.slice(11) },
    { id:"p1", title:"Unit 1 课文重点词组", description:"12组常用搭配", questions:phraseMeaning.slice(0,12) },
    { id:"p2", title:"Unit 2 课文重点词组", description:"12组常用搭配", questions:phraseMeaning.slice(12) },
    { id:"g1", title:"Unit 1 语法清单", description:"形容词＋that从句、疑问词从句", questions:unit1Grammar },
    { id:"g2", title:"Unit 2 语法清单", description:"陈述句、疑问句、祈使句、感叹句", questions:unit2Grammar },
    { id:"texts", title:"两篇主课文", description:"王贞仪与阿基米德", questions:mainTextQuestions },
    { id:"culture", title:"听力与文化拓展", description:"陈望道、弗莱明、富兰克林、老子等", questions:cultureQuestions }
  ];

  const totalKnowledgeQuestions = quizLevels.reduce((sum, level) => sum + level.questions.length, 0);

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  document.querySelectorAll("[data-tab]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-tab]").forEach(item => item.classList.toggle("active", item === button));
      document.querySelectorAll("main > .panel").forEach(panel => { panel.hidden = panel.id !== button.dataset.tab; });
      window.scrollTo({ top: document.querySelector(".tabs").offsetTop - 6, behavior: "smooth" });
    });
  });

  // Matching games
  const gameLevelGrid = document.getElementById("gameLevelGrid");
  const gameHome = document.getElementById("gameHome");
  const gamePlay = document.getElementById("gamePlay");
  const cardBoard = document.getElementById("cardBoard");
  const gameFeedback = document.getElementById("gameFeedback");
  const gameClearModal = document.getElementById("gameClearModal");
  let activeTheme = null;
  let firstCard = null;
  let gameLocked = false;
  let reviewMode = false;
  let reviewRemaining = [];
  let reviewErrors = 0;
  let reviewTotal = 0;

  function freshGameState(themeKey) {
    return { remaining:gameThemes[themeKey].words.map((_, index) => index), errors:0, wrong:[], completedOrder:[] };
  }
  function gameState(themeKey) {
    const total = gameThemes[themeKey].words.length;
    const state = saved.games[themeKey];
    if (!state || !Array.isArray(state.remaining) || state.remaining.some(index => index < 0 || index >= total)) saved.games[themeKey] = freshGameState(themeKey);
    saved.games[themeKey].wrong ||= [];
    saved.games[themeKey].completedOrder ||= [];
    return saved.games[themeKey];
  }
  function renderGameLevels() {
    gameLevelGrid.innerHTML = "";
    Object.entries(gameThemes).forEach(([themeKey, theme]) => {
      const state = gameState(themeKey);
      const button = document.createElement("button");
      button.type = "button"; button.className = "level-card";
      button.innerHTML = `<span class="icon">${theme.icon}</span><strong>${theme.label} · ${theme.zh}</strong><small>${theme.accent}</small><span class="count">${state.remaining.length ? `剩余 ${state.remaining.length} 组` : "已通关"}</span>`;
      button.addEventListener("click", () => openGame(themeKey));
      gameLevelGrid.append(button);
    });
    persist();
  }
  function openGame(themeKey) {
    activeTheme = themeKey; reviewMode = false; reviewRemaining = []; reviewErrors = 0; reviewTotal = 0; firstCard = null; gameLocked = false;
    const theme = gameThemes[themeKey];
    document.getElementById("gameLabel").textContent = `${theme.icon} ${theme.label}`;
    document.getElementById("gameTitle").textContent = `${theme.label} · ${theme.zh}`;
    gameHome.hidden = true; gamePlay.hidden = false; gameClearModal.hidden = true;
    setGameFeedback("请选择任意两张卡片", ""); renderBoard();
    if (gameState(themeKey).remaining.length === 0) showGameClear();
  }
  function currentRemaining() { return reviewMode ? reviewRemaining : gameState(activeTheme).remaining; }
  function currentErrors() { return reviewMode ? reviewErrors : gameState(activeTheme).errors; }
  function renderBoard() {
    const theme = gameThemes[activeTheme];
    const deck = [];
    currentRemaining().forEach(index => {
      const [en, zh] = theme.words[index];
      deck.push({ pair:index, kind:"en", text:en }, { pair:index, kind:"zh", text:zh });
    });
    cardBoard.innerHTML = "";
    shuffle(deck).forEach(item => {
      const button = document.createElement("button");
      button.type = "button"; button.className = "match-card"; button.textContent = item.text;
      button.dataset.pair = String(item.pair); button.dataset.kind = item.kind;
      button.addEventListener("click", () => chooseCard(button));
      cardBoard.append(button);
    });
    updateGameScore();
  }
  let pronunciationAudio = null;
  function speakWithBrowser(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replaceAll("…", " "));
    utterance.lang = "en-US"; utterance.rate = .82;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(voice => /^en/i.test(voice.lang)) || null;
    window.speechSynthesis.speak(utterance);
  }
  function speak(text) {
    const cleanText = text.replaceAll("…", " ").trim();
    if (pronunciationAudio) { pronunciationAudio.pause(); pronunciationAudio.currentTime = 0; }
    let fallbackUsed = false;
    const fallback = () => { if (!fallbackUsed) { fallbackUsed = true; speakWithBrowser(cleanText); } };
    const audio = document.getElementById("day19Pronunciation") || document.createElement("audio");
    if (!audio.id) { audio.id = "day19Pronunciation"; audio.hidden = true; document.body.append(audio); }
    pronunciationAudio = audio; audio.preload = "auto"; audio.playbackRate = .9; audio.onerror = fallback;
    audio.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&type=2`;
    audio.load();
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") playPromise.catch(fallback);
  }
  function chooseCard(card) {
    if (gameLocked || card.classList.contains("gone")) return;
    if (card.dataset.kind === "en") speak(card.textContent);
    if (card === firstCard) { card.classList.remove("selected"); firstCard = null; setGameFeedback("已取消选择", ""); return; }
    card.classList.add("selected");
    if (!firstCard) { firstCard = card; setGameFeedback("再选择一张卡片", ""); return; }
    const second = card;
    const correct = firstCard.dataset.pair === second.dataset.pair && firstCard.dataset.kind !== second.dataset.kind;
    gameLocked = true;
    if (correct) handleGameCorrect(firstCard, second); else handleGameWrong(firstCard, second);
  }
  function handleGameCorrect(a, b) {
    const index = Number(a.dataset.pair); const pair = gameThemes[activeTheme].words[index];
    a.classList.remove("selected"); b.classList.remove("selected"); a.classList.add("correct"); b.classList.add("correct");
    setGameFeedback(`✓ ${pair[0]} — ${pair[1]}`, "good");
    setTimeout(() => {
      a.classList.add("gone"); b.classList.add("gone");
      if (reviewMode) reviewRemaining = reviewRemaining.filter(item => item !== index);
      else {
        const state = gameState(activeTheme); state.remaining = state.remaining.filter(item => item !== index);
        if (!state.completedOrder.includes(index)) state.completedOrder.push(index); persist();
      }
      firstCard = null; gameLocked = false; updateGameScore();
      if (!currentRemaining().length) setTimeout(showGameClear, 260);
    }, 430);
  }
  function handleGameWrong(a, b) {
    const indexes = [Number(a.dataset.pair), Number(b.dataset.pair)];
    a.classList.add("wrong"); b.classList.add("wrong");
    if (reviewMode) reviewErrors += 1;
    else {
      const state = gameState(activeTheme); state.errors += 1;
      indexes.forEach(index => { if (!state.wrong.includes(index)) state.wrong.push(index); }); persist();
    }
    setGameFeedback("这两张不是一组，再想一想", "bad"); updateGameScore();
    setTimeout(() => { a.classList.remove("selected","wrong"); b.classList.remove("selected","wrong"); firstCard = null; gameLocked = false; }, 520);
  }
  function setGameFeedback(text, kind) { gameFeedback.textContent = text; gameFeedback.className = `game-feedback ${kind}`.trim(); }
  function updateGameScore() {
    const total = reviewMode ? reviewTotal : gameThemes[activeTheme].words.length;
    const remaining = currentRemaining().length;
    document.getElementById("doneCount").textContent = `${total - remaining} / ${total}`;
    document.getElementById("errorCount").textContent = String(currentErrors());
  }
  function showGameClear() {
    const state = gameState(activeTheme); const theme = gameThemes[activeTheme];
    const recent = reviewMode ? state.completedOrder.slice(-10) : state.completedOrder.slice(-10);
    document.getElementById("clearTitle").textContent = reviewMode ? "最后10组复习完成" : `${theme.label} 通关成功`;
    document.getElementById("clearStats").innerHTML = `<span>完成 ${reviewMode ? recent.length : theme.words.length} 组</span><span>错误 ${currentErrors()} 次</span>`;
    const list = document.getElementById("gameReviewList");
    list.innerHTML = `<strong>${reviewMode ? "本轮复习词组" : "最后完成的10组"}</strong><ul>${recent.map(index => `<li>${theme.words[index][0]} — ${theme.words[index][1]}</li>`).join("")}</ul>`;
    document.getElementById("practiceLastBtn").hidden = reviewMode || !recent.length;
    gameClearModal.hidden = false; renderGameLevels();
  }
  document.getElementById("gameBack").addEventListener("click", () => { gamePlay.hidden = true; gameHome.hidden = false; renderGameLevels(); });
  document.getElementById("shuffleBtn").addEventListener("click", () => { cardBoard.classList.add("shuffling"); setTimeout(() => { renderBoard(); cardBoard.classList.remove("shuffling"); }, 320); });
  document.getElementById("restartBtn").addEventListener("click", () => { saved.games[activeTheme] = freshGameState(activeTheme); persist(); openGame(activeTheme); });
  document.getElementById("playAgainBtn").addEventListener("click", () => { saved.games[activeTheme] = freshGameState(activeTheme); persist(); openGame(activeTheme); });
  document.getElementById("gameHomeBtn").addEventListener("click", () => { gameClearModal.hidden = true; gamePlay.hidden = true; gameHome.hidden = false; renderGameLevels(); });
  document.getElementById("practiceLastBtn").addEventListener("click", () => {
    const state = gameState(activeTheme); reviewRemaining = state.completedOrder.slice(-10); reviewTotal = reviewRemaining.length; reviewMode = true; reviewErrors = 0; firstCard = null; gameLocked = false; gameClearModal.hidden = true; renderBoard();
  });

  // Clickable meanings in the two reading passages
  const readingDictionary = {
    a:"一个",able:"能够的",achievement:"成就",after:"在……以后",afraid:"害怕的",also:"也",an:"一个",and:"和；并且",another:"另一个",answer:"答案；回答",archimedes:"阿基米德",asked:"询问；请求",astronomy:"天文学",at:"在",bath:"洗澡；浴缸",be:"是；成为",became:"成为",been:"已经；曾经",book:"书",books:"书（复数）",breaking:"打破；破坏",because:"因为",by:"通过；被",calculation:"计算",careful:"仔细的",chinese:"中国的；中文",clear:"清楚的",clearer:"更清楚的",compared:"比较",continues:"继续",could:"能够",crater:"环形山",created:"创造",crown:"王冠",difficult:"困难的",different:"不同的",dynasty:"朝代",education:"教育",example:"例子",family:"家庭",for:"为了；对于",from:"从；来自",full:"满的",gave:"给",goal:"目标",gold:"黄金",golden:"金色的；黄金制的",great:"伟大的；很棒的",grew:"成长",had:"有（过去式）",have:"有",he:"他",her:"她的；她",hiero:"希伦国王",his:"他的",history:"历史",idea:"想法",important:"重要的",in:"在……里面",into:"进入",is:"是",it:"它；形式主语",kept:"保持；保留",king:"国王",know:"知道",later:"后来",learning:"学习",looking:"看；观察",made:"制作；使得",maker:"制造者",mathematics:"数学",maths:"数学",metal:"金属",method:"方法",mind:"头脑；心里",mixed:"混合",more:"更多；更加",naming:"命名",not:"不",object:"物体",observation:"观察",of:"……的",on:"在……上；关于",one:"一个；一",only:"仅仅",ordinary:"普通的",out:"出去；向外",over:"越过；溢出",people:"人们",poetry:"诗歌",pot:"容器；锅",problem:"问题",pushed:"推动；排开",put:"放置",qing:"清朝",realized:"意识到",rewrite:"重写",same:"相同的",scholar:"学者",scholars:"学者（复数）",science:"科学",she:"她",should:"应该",simpler:"更简单的",simply:"仅仅；简单地",so:"所以；如此",solving:"解决",some:"一些",stayed:"保持；停留",studied:"学习；研究",taking:"进行；拿取",talent:"天赋",test:"检验；测试",that:"那个；引导从句",the:"这个；那个（特指）",this:"这个",through:"通过",to:"去；向；用于不定式",today:"今天；如今",truth:"真相；真理",understand:"理解",up:"向上；完全",valued:"重视",venus:"金星",wang:"王",wanted:"想要",was:"是（过去式）",water:"水",way:"方式；道路",weight:"重量",when:"当……时",whether:"是否",while:"当……的时候",with:"和；用；带有",without:"没有",woman:"女性；女人",women:"女性（复数）",work:"工作；作品",zhenyi:"贞仪",
    outstanding:"杰出的；优秀的","old-fashioned":"老式的；过时的",classical:"古典的",lamp:"灯",poet:"诗人",convinced:"确信的",philosopher:"哲学家",dramatist:"剧作家",judgement:"判断；评价",evaluation:"评价；评估",consider:"认为；考虑",considered:"认为；被认为",background:"背景",significant:"重要的；意义重大的",significance:"重要性；意义",significantly:"显著地；重要地",milestone:"里程碑",manage:"设法做到；管理",managed:"设法做到了",impact:"影响",concentrated:"专心的",belief:"信念",firm:"坚定的；牢固的",ignorance:"无知",application:"应用；申请",fancy:"精美的；花哨的",satisfied:"满意的",satisfy:"使满意",satisfying:"令人满意的",prince:"王子",displace:"排开；取代",displaces:"排开",displaced:"排开了；被取代",displacing:"排开；取代",fool:"欺骗；愚弄",fooled:"欺骗了",prison:"监狱",wire:"金属丝；电线",prove:"证明",proved:"证明了",proving:"证明",hardly:"几乎不",balanced:"平衡的",reject:"拒绝",rejected:"拒绝了",thus:"因此",complete:"完全的；完成",completely:"完全地",completion:"完成",runs:"流动；跑",ran:"流动了；跑了",running:"流动；跑步",sent:"送；派（过去式）",what:"什么；多么",which:"哪一个",instead:"代替；反而",addition:"增加；附加",accident:"意外；偶然",whole:"整体",fond:"喜欢的",reached:"伸手；到达"
  };

  [...unit1, ...unit2].forEach(([english, chinese]) => {
    const key = english.toLowerCase();
    if (/^[a-z-]+$/.test(key) && !readingDictionary[key]) readingDictionary[key] = chinese;
  });

  function normalizeWord(word) { return String(word || "").toLowerCase().replace(/’/g, "'").replace(/^[^a-z]+|[^a-z'-]+$/g, ""); }
  function lookupMeaning(word) {
    const key = normalizeWord(word);
    if (readingDictionary[key]) return readingDictionary[key];
    const candidates = [];
    if (key.endsWith("'s")) candidates.push(key.slice(0, -2));
    if (key.endsWith("ies")) candidates.push(key.slice(0, -3) + "y");
    if (key.endsWith("ing")) candidates.push(key.slice(0, -3), key.slice(0, -3) + "e");
    if (key.endsWith("ed")) candidates.push(key.slice(0, -2), key.slice(0, -1));
    if (key.endsWith("es")) candidates.push(key.slice(0, -2), key.slice(0, -1));
    if (key.endsWith("s")) candidates.push(key.slice(0, -1));
    const base = candidates.find(candidate => readingDictionary[candidate]);
    return base ? readingDictionary[base] : "暂未收录释义";
  }

  const meaningToast = document.createElement("div");
  meaningToast.className = "meaning-toast"; meaningToast.hidden = true;
  meaningToast.innerHTML = '<strong id="meaningWord"></strong><span id="meaningText"></span><button type="button" aria-label="关闭中文释义">×</button>';
  document.body.append(meaningToast);
  meaningToast.querySelector("button").addEventListener("click", () => { meaningToast.hidden = true; });

  function sameWordButtons(key) { return [...document.querySelectorAll(".reading-word")].filter(button => button.dataset.wordKey === key); }
  function showMeaning(button) {
    const key = button.dataset.wordKey; const wasMarked = button.classList.contains("marked");
    sameWordButtons(key).forEach(item => item.classList.toggle("marked", !wasMarked));
    if (wasMarked) {
      delete saved.marks[key]; meaningToast.hidden = true;
    } else {
      saved.marks[key] = "unknown";
      meaningToast.querySelector("#meaningWord").textContent = button.textContent;
      meaningToast.querySelector("#meaningText").textContent = `中文：${lookupMeaning(key)}`;
      meaningToast.hidden = false; speak(button.textContent);
    }
    persist();
  }

  function makePassageWordsClickable(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !/[A-Za-z]/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        if (node.parentElement && node.parentElement.closest(".reading-word")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.nodeValue.split(/([A-Za-z]+(?:[’'][A-Za-z]+)?(?:-[A-Za-z]+)?)/g).forEach(piece => {
        if (!/^[A-Za-z]/.test(piece)) { fragment.append(document.createTextNode(piece)); return; }
        const key = normalizeWord(piece); const button = document.createElement("button");
        button.type = "button"; button.className = "reading-word"; button.textContent = piece; button.dataset.wordKey = key;
        button.title = "点击查看中文意思"; button.classList.toggle("marked", Boolean(saved.marks[key]));
        button.addEventListener("click", () => showMeaning(button)); fragment.append(button);
      });
      node.replaceWith(fragment);
    });
  }

  // Classwork passages
  function renderClasswork(section, data) {
    const answers = saved.classwork[section] ||= {};
    const passage = document.getElementById(`${section}Passage`);
    const questionHost = document.getElementById(`${section}Questions`);
    const progress = document.getElementById(`${section}Progress`);
    const submit = document.getElementById(`${section}Submit`);
    const result = document.getElementById(`${section}Result`);
    const blankValue = number => answers[number] || "_____";
    passage.innerHTML = data.paragraphs.map(paragraph => `<p>${paragraph.replace(/\{\{(\d+)\}\}/g, (_, number) => `<span class="inline-blank ${answers[number] ? "" : "empty"}" data-blank="${number}">${blankValue(number)}</span>`)}</p>`).join("");
    makePassageWordsClickable(passage);
    questionHost.innerHTML = "";
    data.items.forEach((item, index) => {
      const row = document.createElement("div"); row.className = "choice-row"; row.dataset.number = String(index + 1);
      row.innerHTML = `<strong class="choice-number">${index + 1}.</strong><div class="choice-buttons"></div><p class="explanation" hidden></p>`;
      item.options.forEach((option, optionIndex) => {
        const button = document.createElement("button"); button.type = "button"; button.dataset.value = option; button.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`;
        button.classList.toggle("selected", answers[index + 1] === option);
        button.addEventListener("click", () => {
          answers[index + 1] = option; delete answers.submitted;
          row.querySelectorAll("button").forEach(itemButton => itemButton.classList.toggle("selected", itemButton === button));
          row.querySelector(".explanation").hidden = true;
          row.querySelectorAll("button").forEach(itemButton => itemButton.classList.remove("answer-correct","answer-wrong"));
          const blank = passage.querySelector(`[data-blank="${index + 1}"]`);
          blank.textContent = option; blank.classList.remove("empty"); makePassageWordsClickable(blank);
          result.textContent = ""; persist(); updateClassworkProgress(section, data);
        });
        row.querySelector(".choice-buttons").append(button);
      });
      questionHost.append(row);
    });
    function review() {
      let score = 0;
      data.items.forEach((item, index) => {
        const row = questionHost.querySelector(`[data-number="${index + 1}"]`); const selected = answers[index + 1];
        row.querySelectorAll("button").forEach(button => {
          button.classList.toggle("answer-correct", button.dataset.value === item.answer);
          button.classList.toggle("answer-wrong", button.dataset.value === selected && selected !== item.answer);
        });
        const note = row.querySelector(".explanation"); note.hidden = false;
        note.textContent = `${selected === item.answer ? "✓" : `正确答案：${item.answer}。`} ${item.note}`;
        if (selected === item.answer) score += 1;
      });
      answers.submitted = true; answers.score = score; persist();
      result.textContent = `得分 ${score} / ${data.items.length}`; result.className = score === data.items.length ? "perfect" : "";
    }
    submit.onclick = review;
    updateClassworkProgress(section, data);
    if (answers.submitted) review();
  }
  function updateClassworkProgress(section, data) {
    const answers = saved.classwork[section];
    const done = data.items.filter((_, index) => answers[index + 1]).length;
    document.getElementById(`${section}Progress`).textContent = `已完成 ${done} / ${data.items.length}`;
    document.getElementById(`${section}Submit`).disabled = done !== data.items.length;
  }

  // Knowledge checklist
  const quizLevelGrid = document.getElementById("quizLevelGrid");
  const checklistHome = document.getElementById("checklistHome");
  const quizPlay = document.getElementById("quizPlay");
  let currentLevel = null;
  let retryIds = null;
  function levelState(id) { return saved.knowledge[id] ||= { answers:{}, submitted:false, score:0, wrong:[] }; }
  function renderQuizLevels() {
    quizLevelGrid.innerHTML = "";
    quizLevels.forEach((level, index) => {
      const state = levelState(level.id); const answered = level.questions.filter(item => state.answers[item.id]).length;
      const button = document.createElement("button"); button.type = "button"; button.className = `quiz-level-card ${state.submitted ? "completed" : ""}`;
      button.innerHTML = `<span class="level-no">${index + 1}</span><div><h3>${level.title}</h3><p>${level.description} · ${level.questions.length}题</p></div><span class="status">${state.submitted ? `${state.score}/${level.questions.length}` : `${answered}/${level.questions.length}`}</span>`;
      button.addEventListener("click", () => openQuiz(level.id)); quizLevelGrid.append(button);
    });
    updateKnowledgeSummary(); persist();
  }
  function updateKnowledgeSummary() {
    let answered = 0, completed = 0, correct = 0;
    quizLevels.forEach(level => {
      const state = levelState(level.id); answered += level.questions.filter(item => state.answers[item.id]).length;
      if (state.submitted) { completed += 1; correct += state.score; }
    });
    document.getElementById("totalProgress").textContent = `${answered} / ${totalKnowledgeQuestions}`;
    document.getElementById("checklistSummary").innerHTML = `<div class="summary-card"><strong>${completed} / ${quizLevels.length}</strong>已提交关卡</div><div class="summary-card"><strong>${correct}</strong>已确认答对</div><div class="summary-card"><strong>${quizLevels.reduce((sum, level) => sum + levelState(level.id).wrong.length, 0)}</strong>当前错题</div>`;
  }
  function openQuiz(levelId) {
    currentLevel = quizLevels.find(level => level.id === levelId); retryIds = null;
    checklistHome.hidden = true; quizPlay.hidden = false;
    document.getElementById("quizKicker").textContent = `CHECKPOINT ${quizLevels.indexOf(currentLevel) + 1} / ${quizLevels.length}`;
    document.getElementById("quizTitle").textContent = currentLevel.title;
    document.getElementById("quizDescription").textContent = currentLevel.description;
    renderQuizQuestions();
  }
  function renderQuizQuestions() {
    const state = levelState(currentLevel.id);
    const questions = retryIds ? currentLevel.questions.filter(item => retryIds.includes(item.id)) : currentLevel.questions;
    const host = document.getElementById("quizList"); host.innerHTML = "";
    questions.forEach((item, index) => {
      const card = document.createElement("article"); card.className = "quiz-card"; card.dataset.id = item.id;
      card.innerHTML = `<p class="prompt">${index + 1}. ${item.prompt}</p><div class="options"></div><p class="quiz-feedback" hidden></p>`;
      item.options.forEach((option, optionIndex) => {
        const button = document.createElement("button"); button.type = "button"; button.dataset.value = option; button.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`;
        button.classList.toggle("selected", state.answers[item.id] === option);
        button.addEventListener("click", () => {
          state.answers[item.id] = option; state.submitted = false;
          card.querySelectorAll("button").forEach(optionButton => { optionButton.classList.toggle("selected", optionButton === button); optionButton.classList.remove("answer-correct","answer-wrong"); });
          card.querySelector(".quiz-feedback").hidden = true; persist(); updateQuizCounter();
          document.getElementById("quizResult").textContent = ""; document.getElementById("retryWrong").hidden = true;
        });
        card.querySelector(".options").append(button);
      });
      host.append(card);
    });
    document.getElementById("retryWrong").hidden = !state.submitted || !state.wrong.length;
    document.getElementById("quizResult").textContent = state.submitted ? `本关得分 ${state.score} / ${currentLevel.questions.length}` : "";
    document.getElementById("quizResult").className = state.submitted && state.score === currentLevel.questions.length ? "perfect" : "";
    updateQuizCounter();
    if (state.submitted) reviewQuiz();
  }
  function visibleQuizQuestions() { return retryIds ? currentLevel.questions.filter(item => retryIds.includes(item.id)) : currentLevel.questions; }
  function updateQuizCounter() {
    const state = levelState(currentLevel.id); const questions = visibleQuizQuestions();
    const answered = questions.filter(item => state.answers[item.id]).length;
    document.getElementById("quizCounter").textContent = `${answered} / ${questions.length}`;
    document.getElementById("quizSubmit").disabled = answered !== questions.length;
    updateKnowledgeSummary();
  }
  function reviewQuiz() {
    const state = levelState(currentLevel.id); let score = 0; const wrong = [];
    currentLevel.questions.forEach(item => { if (state.answers[item.id] === item.answer) score += 1; else wrong.push(item.id); });
    document.querySelectorAll("#quizList .quiz-card").forEach(card => {
      const item = currentLevel.questions.find(question => question.id === card.dataset.id); const selected = state.answers[item.id];
      card.querySelectorAll("button").forEach(button => {
        button.classList.toggle("answer-correct", button.dataset.value === item.answer);
        button.classList.toggle("answer-wrong", button.dataset.value === selected && selected !== item.answer);
      });
      const feedback = card.querySelector(".quiz-feedback"); feedback.hidden = false;
      feedback.textContent = `${selected === item.answer ? "✓" : `正确答案：${item.answer}。`} ${item.explanation}`;
    });
    state.submitted = true; state.score = score; state.wrong = wrong; persist();
    document.getElementById("quizResult").textContent = `本关得分 ${score} / ${currentLevel.questions.length}`;
    document.getElementById("quizResult").className = score === currentLevel.questions.length ? "perfect" : "";
    document.getElementById("retryWrong").hidden = !wrong.length; renderQuizLevels();
  }
  document.getElementById("quizSubmit").addEventListener("click", reviewQuiz);
  document.getElementById("quizBack").addEventListener("click", () => { quizPlay.hidden = true; checklistHome.hidden = false; retryIds = null; renderQuizLevels(); });
  document.getElementById("retryWrong").addEventListener("click", () => {
    const state = levelState(currentLevel.id); retryIds = [...state.wrong]; retryIds.forEach(id => delete state.answers[id]); state.submitted = false; persist(); renderQuizQuestions(); window.scrollTo({ top:document.querySelector(".tabs").offsetTop, behavior:"smooth" });
  });

  renderGameLevels();
  renderClasswork("cloze", clozeData);
  renderClasswork("grammar", grammarData);
  renderQuizLevels();
})();
