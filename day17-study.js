(() => {
  "use strict";

  const storageKey = "honghao-day17";
  const lessons = [
    {
      id: "tonight_places", day: "tonight", type: "matching", badge: "信息匹配 · 课堂完成",
      title: "休闲场所介绍", note: "先找人物需求中的关键词，再选择最合适的场所。A—F 中有一个多余选项。",
      options: [
        ["A", "Play Field", "This is a great place to stay active. It has lots of sports areas and spaces. Family and friends can go there and have a great time together."],
        ["B", "Peace Cinema", "It is the most popular cinema in town. It has the best sound, the biggest screen and the most comfortable seats. Most importantly, it has the latest films."],
        ["C", "The Creative Corner", "This place is famous for its many interesting exhibits. Visitors can enjoy learning about art and the artists’ creative ideas."],
        ["D", "Happy Farm", "This is a place where you can enjoy nature. You can pick fresh fruit and vegetables here. It’s both fun and educational for all ages!"],
        ["E", "Green Park", "Located right in the middle of the city, this well-kept place offers beautiful views and a variety of running routes. It’s a perfect place to relax in nature."],
        ["F", "Sunshine Beach", "This is a beautiful place with soft sand and amazing views. Visitors can do lots of beach activities while feeling the gentle wind of the sea."]
      ],
      people: [
        "David is a big fan of action movies. He knows a new film about Chinese Kung Fu is coming soon. He plans to watch it next Saturday.",
        "Susan often spends her weekends in the countryside. She especially enjoys picking fruit and vegetables with her kids. It’s both relaxing and interesting.",
        "Mark loves nature and really enjoys being outdoors. He likes to go running in the park and be in nature. He thinks it is very peaceful.",
        "Anna loves to relax on the beach. She enjoys taking slow walks and feeling the gentle wind. The beach is her favourite place to enjoy the beauty of the sea.",
        "Daniel really loves art. He likes trying out different ways to make art. He gets excited about going to art shows to get new ideas."
      ],
      answers: ["B", "D", "E", "F", "C"],
      explanations: [
        "David 想看最新的动作电影，对应 B 电影院。",
        "Susan 喜欢和孩子采摘水果、蔬菜，对应 D 农场。",
        "Mark 喜欢在公园跑步、亲近自然，对应 E 公园。",
        "Anna 喜欢沙滩、海风和散步，对应 F 海滩。",
        "Daniel 喜欢艺术展和创意，对应 C 创意角。"
      ]
    },
    {
      id: "tonight_chen", day: "tonight", type: "grammar", badge: "语法填空 · 老师带练",
      title: "Chen Lijun and Yue Opera", note: "第一次做语法填空，先判断空格需要什么词性或句型，再从 A、B、C 中选择。",
      paragraphs: [
        "Thirty [[1]] (excellence) young people from different fields were awarded the 2025 China Youth May 4th Medal. Chen Lijun is one of them.",
        "Born in 1992 in Zhejiang Province, Chen Lijun is a famous Yue Opera [[2]] (act) at Zhejiang Xiaobaihua Yue Opera Theatre. She [[3]] (begin) to study the art form at the age of 13. With her tall height and bright character, her teachers encouraged her [[4]] (play) xiaosheng roles.",
        "Chen is known [[5]] her xiaosheng role in New Dragon Gate Inn, a Yue Opera show. In [[6]] show, Chen played the role of a handsome man. Her role had the charm of both a man and a woman, showing a unique kind of beauty. Her performance was so successful [[7]] many people liked it.",
        "‘At first, most of the audience were regular opera fans. But later, new audience, many of them are young people, began showing up.’ Chen told China Daily, ‘Traditional Chinese opera must [[8]] (pass) on, but more importantly, it needs to be brought to a wider audience.’",
        "Before, I didn’t know [[9]] Chen Lijun was. But now I know her a lot and she has become my cultural icon by mixing modern performance techniques with classic stories. Her story proves that passion and creativity can make ancient art shine [[10]] (bright)."
      ],
      questions: [
        [["A", "excellent"], ["B", "excellence"], ["C", "excellently"]],
        [["A", "act"], ["B", "actor"], ["C", "action"]],
        [["A", "began"], ["B", "begins"], ["C", "beginning"]],
        [["A", "play"], ["B", "playing"], ["C", "to play"]],
        [["A", "for"], ["B", "as"], ["C", "by"]],
        [["A", "a"], ["B", "an"], ["C", "the"]],
        [["A", "that"], ["B", "what"], ["C", "because"]],
        [["A", "pass"], ["B", "be passed"], ["C", "passing"]],
        [["A", "who"], ["B", "what"], ["C", "where"]],
        [["A", "bright"], ["B", "brightly"], ["C", "brightness"]]
      ],
      answers: ["A", "B", "A", "C", "A", "C", "A", "B", "A", "B"],
      explanations: [
        "修饰 young people 要用形容词 excellent。",
        "Chen Lijun 是一名演员，空格需要表示人的名词 actor。",
        "13岁时开始，讲过去的事，用 began。",
        "encourage sb. to do sth.：鼓励某人做某事。",
        "be known for：因……而出名。",
        "这里特指前面提到的那场表演，用 the。",
        "so ... that ...：如此……以至于……。",
        "戏曲是‘被传承’，must 后用 be passed。",
        "know who she was：知道她是谁。",
        "修饰动词 shine 要用副词 brightly。"
      ]
    },
    {
      id: "holiday1_volunteers", day: "holiday1", type: "matching", badge: "信息匹配 · 假期作业",
      title: "Volunteer Jobs", note: "圈出人物的能力、地点和时间，再匹配志愿者工作。A—F 中有一个多余选项。",
      options: [
        ["A", "Special Travellers Needed", "Do you like travelling during May Day holiday? We are going to many parks in our city. Bring a big bag with you, and we will pick up rubbish and keep the parks clean."],
        ["B", "Volunteers Wanted for GZ Metro", "There are 19 subway lines now working in Guangzhou, so we need lots of volunteers from middle schools to show the way at weekends. The volunteers must know Guangzhou well."],
        ["C", "Teachers Needed in Art School", "To help students know more about Chinese traditional art, we need teachers to teach drawing and paper cutting. If you’re good at art, welcome to join us!"],
        ["D", "Volunteers Wanted in the City Museum", "There will be an exhibition about local culture. We need volunteers to guide foreign visitors and introduce the information about the exhibits. If you’re interested in it and good at English, come and join us!"],
        ["E", "Volunteers Wanted in Medical School", "To collect information about healthcare, we need volunteers to pay home visits and do some interviews."],
        ["F", "Volunteers Wanted in the Red Cross", "A free medical check for the old will be held in the community at the weekend. Volunteers with nursing and medical backgrounds are welcomed to help."]
      ],
      people: [
        "Li Ping is a nursing student. She wants to help the old with what she has learnt.",
        "Zhao Jun is always worried about the environment of the city. He wants to help pick up rubbish in the public places.",
        "Cheng Guo does well in her Art lessons. She wants to be an Art teacher in the future.",
        "Wang Mei lives in Guangzhou and goes to school by subway. She knows all the lines well. She is free every Saturday afternoon.",
        "Li Hua is good at speaking English. He likes to introduce things about China to foreign friends."
      ],
      answers: ["F", "A", "C", "B", "D"],
      explanations: [
        "Li Ping 学护理并想帮助老人，对应 F 红十字会体检。",
        "Zhao Jun 想在公共场所捡垃圾，对应 A 公园清洁。",
        "Cheng Guo 擅长美术并想当美术老师，对应 C 艺术学校。",
        "Wang Mei 熟悉广州地铁线，周六有空，对应 B 地铁志愿者。",
        "Li Hua 英语好，喜欢向外国朋友介绍中国，对应 D 博物馆讲解。"
      ]
    },
    {
      id: "holiday2_rosie", day: "holiday2", type: "grammar", badge: "语法填空 · 假期作业",
      title: "Rosie’s Journey for Wisdom", note: "先看括号里的提示词，再判断要不要变词性、时态或形式。",
      paragraphs: [
        "Once upon a time, there lived a little girl named Rosie. She was very smart and interested in exploring new things.",
        "One sunny day, Rosie found [[1]] ancient map while playing. It [[2]] (hide) inside a tree. The map led to the Fountain of Wisdom. It was said that the fountain could give great wisdom to anyone who drank water from it. Rosie wanted to become even [[3]] (smart), so she started her journey.",
        "Along the way, she [[4]] (meet) different kinds of animals facing their own challenges. A squirrel couldn’t find nuts because everything was covered with snow. A family of birds needed help [[5]] (build) their homes after a storm. Although Rosie wanted to reach the fountain as [[6]] (quick) as possible, she stopped to help every animal she met.",
        "Days turned into weeks, and finally, Rosie arrived at the Fountain of Wisdom. She drank the cool water right away. She waited for a long time, [[7]] she didn’t become smarter at all. Even so, she still kept helping other animals on her way back home. Each time she lent a hand, her heart was filled [[8]] warm memories. Finally, she realized that the true wisdom she had gained came from helping others.",
        "When Rosie arrived home, she shared [[9]] she had learnt during the journey with her family. And this experience taught her that wisdom is not only from books, but also from [[10]] (kind) and helping others."
      ],
      questions: [
        [["A", "a"], ["B", "an"], ["C", "the"]],
        [["A", "hid"], ["B", "was hidden"], ["C", "hides"]],
        [["A", "smart"], ["B", "smarter"], ["C", "smartest"]],
        [["A", "meets"], ["B", "met"], ["C", "was meeting"]],
        [["A", "to build"], ["B", "building"], ["C", "built"]],
        [["A", "quick"], ["B", "quickly"], ["C", "quicker"]],
        [["A", "so"], ["B", "or"], ["C", "but"]],
        [["A", "with"], ["B", "from"], ["C", "for"]],
        [["A", "who"], ["B", "what"], ["C", "where"]],
        [["A", "kind"], ["B", "kindly"], ["C", "kindness"]]
      ],
      answers: ["B", "B", "B", "B", "A", "B", "C", "A", "B", "C"],
      explanations: [
        "ancient 以元音音素开头，用 an。",
        "地图被藏在树里，用一般过去时的被动语态 was hidden。",
        "even 后结合 become 表示‘更聪明’，用比较级 smarter。",
        "故事讲过去发生的事，用 met。",
        "need help to do sth.：需要帮助做某事。",
        "修饰 reach 要用副词 quickly；as ... as 中用原级。",
        "前后意思转折：等了很久，但是没有变聪明，用 but。",
        "be filled with：充满……。",
        "shared what she had learnt：分享她学到的东西。",
        "介词 from 后用名词 kindness。"
      ]
    },
    {
      id: "holiday3_zam", day: "holiday3", type: "grammar", badge: "语法填空 · 假期作业",
      title: "A Solo Journey Across the Atlantic", note: "最后一天综合练习冠词、时态、介词、被动语态、词性和代词。",
      paragraphs: [
        "Zam Lachlan, aged 21, from the United Kingdom, became the first woman and the youngest person to row from mainland Europe to mainland South America with no one else to help her. Her incredible journey began on October 27th when she set off from Portugal in [[1]] special rowing boat. It [[2]] (take) her just over 97 days to cross the Atlantic. On February 1st, she successfully arrived [[3]] French Guiana. ‘Nobody knew I was coming,’ she said. ‘But I [[4]] (welcome) by many local fishermen who cheered and clapped for me.’",
        "The young [[5]] (adventure) faced many challenges along the way. A strong wind once turned her boat over, [[6]] (cause) her to hurt her arm and break a finger. There were also scary moments when a huge ship almost crashed into her small boat. She even got hit by a flying fish at one point! However, Zam also experienced many [[7]] (wonder) things that few people ever get to see. ‘The sunrises and night skies were really exciting,’ she said. ‘The trip gave me many memories. They will stay with me for life.’",
        "[[8]] the journey was difficult, Zam never gave up. ‘I took on a big challenge and succeeded,’ Zam said [[9]] (proud). ‘I hope my effort will inspire others to challenge [[10]] (they).’"
      ],
      questions: [
        [["A", "a"], ["B", "an"], ["C", "the"]],
        [["A", "takes"], ["B", "took"], ["C", "taking"]],
        [["A", "at"], ["B", "on"], ["C", "in"]],
        [["A", "welcomed"], ["B", "was welcomed"], ["C", "welcome"]],
        [["A", "adventure"], ["B", "adventurer"], ["C", "adventurous"]],
        [["A", "causing"], ["B", "caused"], ["C", "cause"]],
        [["A", "wonder"], ["B", "wonderful"], ["C", "wonderfully"]],
        [["A", "Although"], ["B", "Because"], ["C", "If"]],
        [["A", "proud"], ["B", "pride"], ["C", "proudly"]],
        [["A", "them"], ["B", "their"], ["C", "themselves"]]
      ],
      answers: ["A", "B", "C", "B", "B", "A", "B", "A", "C", "C"],
      explanations: [
        "第一次提到这艘特殊的船，用 a。",
        "旅程发生在过去，用 took。",
        "arrive in + 较大的地区或国家。",
        "她受到欢迎，用一般过去时的被动语态 was welcomed。",
        "空格作主语，表示‘冒险者’，用名词 adventurer。",
        "逗号后表示自然产生的结果，用 causing。",
        "修饰 things 要用形容词 wonderful。",
        "前后是让步关系：虽然旅程困难，但她没有放弃。",
        "修饰 said 要用副词 proudly。",
        "challenge oneself：挑战自己；others 对应 themselves。"
      ]
    }
  ];

  function loadState() {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); }
    catch (_) { return {}; }
  }

  function saveTask(id, data) {
    const state = loadState();
    state.studyTasks ||= {};
    state.studyTasks[id] = { ...(state.studyTasks[id] || {}), ...data };
    if (typeof saved !== "undefined") saved.studyTasks = state.studyTasks;
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function taskState(id) {
    return loadState().studyTasks?.[id] || { answers: [], submitted: false };
  }

  function passageHtml(paragraph, answers, result, correctAnswers) {
    return paragraph.replace(/\[\[(\d+)\]\]/g, (_, raw) => {
      const index = Number(raw) - 1;
      const value = answers[index];
      let className = value ? "blank-pill filled" : "blank-pill";
      if (result && value) className += value === correctAnswers[index] ? " correct" : " incorrect";
      return `<span class="${className}" data-blank="${index}">${value || raw}</span>`;
    });
  }

  function renderGrammar(task) {
    const state = taskState(task.id);
    const answers = Array.isArray(state.answers) ? state.answers : [];
    const card = document.createElement("article");
    card.className = "task-card";
    card.dataset.task = task.id;
    card.innerHTML = `
      <header class="task-head"><div><span class="task-badge">${task.badge}</span><h3>${task.title}</h3><p>${task.note}</p></div><span class="done-mark">${state.submitted ? "✓ 已提交" : ""}</span></header>
      <div class="task-body">
        <div class="passage">${task.paragraphs.map(p => `<p>${passageHtml(p, answers, state.submitted, task.answers)}</p>`).join("")}</div>
        <div class="choice-list">${task.questions.map((choices, index) => `
          <div class="choice-row" data-question="${index}"><span class="choice-number">${index + 1}</span><div class="choice-buttons">
            ${choices.map(([letter, word]) => `<button type="button" class="option-btn${answers[index] === letter ? " selected" : ""}${state.submitted && letter === task.answers[index] ? " correct" : ""}${state.submitted && answers[index] === letter && letter !== task.answers[index] ? " incorrect" : ""}" data-letter="${letter}">${letter}. ${word}</button>`).join("")}
          </div></div>`).join("")}</div>
        <div class="task-actions"><button type="button" class="submit-task">提交答案</button><button type="button" class="reset-task">重新作答</button><p class="task-result">${state.submitted ? scoreText(task, answers) : ""}</p></div>
        <div class="explanations">${state.submitted ? task.explanations.map((text, i) => `<div class="explanation"><strong>${i + 1}. ${task.answers[i]}</strong>　${text}</div>`).join("") : ""}</div>
      </div>`;

    card.querySelectorAll(".option-btn").forEach(button => button.addEventListener("click", () => {
      const row = button.closest(".choice-row");
      const index = Number(row.dataset.question);
      const next = taskState(task.id);
      const nextAnswers = Array.isArray(next.answers) ? [...next.answers] : [];
      nextAnswers[index] = button.dataset.letter;
      saveTask(task.id, { answers: nextAnswers, submitted: false });
      rerenderTask(card, task);
    }));
    bindActions(card, task);
    return card;
  }

  function renderMatching(task) {
    const state = taskState(task.id);
    const answers = Array.isArray(state.answers) ? state.answers : [];
    const card = document.createElement("article");
    card.className = "task-card";
    card.dataset.task = task.id;
    card.innerHTML = `
      <header class="task-head"><div><span class="task-badge">${task.badge}</span><h3>${task.title}</h3><p>${task.note}</p></div><span class="done-mark">${state.submitted ? "✓ 已提交" : ""}</span></header>
      <div class="task-body">
        <div class="match-layout">
          <div class="match-options">${task.options.map(([letter, title, text]) => `<div class="match-option"><strong>${letter}. ${title}</strong>${text}</div>`).join("")}</div>
          <div class="people-list">${task.people.map((person, index) => `<div class="person-row" data-question="${index}"><p><strong>${index + 1}.</strong> ${person}</p><div class="letter-buttons">${task.options.map(([letter]) => `<button type="button" class="letter-btn${answers[index] === letter ? " selected" : ""}${state.submitted && letter === task.answers[index] ? " correct" : ""}${state.submitted && answers[index] === letter && letter !== task.answers[index] ? " incorrect" : ""}" data-letter="${letter}">${letter}</button>`).join("")}</div></div>`).join("")}</div>
        </div>
        <div class="task-actions"><button type="button" class="submit-task">提交答案</button><button type="button" class="reset-task">重新作答</button><p class="task-result">${state.submitted ? scoreText(task, answers) : ""}</p></div>
        <div class="explanations">${state.submitted ? task.explanations.map((text, i) => `<div class="explanation"><strong>${i + 1}. ${task.answers[i]}</strong>　${text}</div>`).join("") : ""}</div>
      </div>`;

    card.querySelectorAll(".letter-btn").forEach(button => button.addEventListener("click", () => {
      const index = Number(button.closest(".person-row").dataset.question);
      const letter = button.dataset.letter;
      const next = taskState(task.id);
      const nextAnswers = Array.isArray(next.answers) ? [...next.answers] : [];
      nextAnswers.forEach((used, usedIndex) => { if (used === letter && usedIndex !== index) nextAnswers[usedIndex] = ""; });
      nextAnswers[index] = letter;
      saveTask(task.id, { answers: nextAnswers, submitted: false });
      rerenderTask(card, task);
    }));
    bindActions(card, task);
    return card;
  }

  function scoreText(task, answers) {
    const score = task.answers.reduce((sum, answer, index) => sum + (answers[index] === answer ? 1 : 0), 0);
    return `本题得分：${score} / ${task.answers.length}`;
  }

  function bindActions(card, task) {
    card.querySelector(".submit-task").addEventListener("click", () => {
      const state = taskState(task.id);
      const answers = Array.isArray(state.answers) ? state.answers : [];
      if (task.answers.some((_, index) => !answers[index])) {
        card.querySelector(".task-result").textContent = "还有题目没有选择，请先全部完成。";
        card.querySelector(".task-result").scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      saveTask(task.id, { answers, submitted: true, completedAt: new Date().toISOString() });
      rerenderTask(card, task);
    });
    card.querySelector(".reset-task").addEventListener("click", () => {
      saveTask(task.id, { answers: [], submitted: false, completedAt: null });
      rerenderTask(card, task);
    });
  }

  function rerenderTask(card, task) {
    const next = task.type === "grammar" ? renderGrammar(task) : renderMatching(task);
    card.replaceWith(next);
  }

  function renderPanels() {
    const host = document.getElementById("studyPanels");
    const days = [
      ["tonight", "今晚课堂", "先做信息匹配，再由老师带着完成第一篇语法填空。"],
      ["holiday1", "假期第1天", "完成志愿者信息匹配，重点练习抓关键词。"],
      ["holiday2", "假期第2天", "完成 Rosie 的语法填空，注意时态和词形变化。"],
      ["holiday3", "假期第3天", "完成大西洋冒险语法填空，做一次综合检查。"]
    ];
    days.forEach(([day, title, note], index) => {
      const panel = document.createElement("section");
      panel.className = "study-panel";
      panel.dataset.day = day;
      panel.hidden = index !== 0;
      panel.innerHTML = `<div class="day-note"><strong>${title}</strong><span>${note}</span></div>`;
      lessons.filter(task => task.day === day).forEach(task => panel.append(task.type === "grammar" ? renderGrammar(task) : renderMatching(task)));
      host.append(panel);
    });
  }

  document.querySelectorAll(".study-tab").forEach(tab => tab.addEventListener("click", () => {
    document.querySelectorAll(".study-tab").forEach(item => item.classList.toggle("active", item === tab));
    document.querySelectorAll(".study-panel").forEach(panel => { panel.hidden = panel.dataset.day !== tab.dataset.day; });
  }));

  renderPanels();
})();
