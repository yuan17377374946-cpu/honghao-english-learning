'use strict';
window.WRITING_COMPARISON = {
  "rows": [
    [
      "形容词",
      "slow",
      "slower",
      "the slowest"
    ],
    [
      "形容词",
      "large",
      "larger",
      "the largest"
    ],
    [
      "形容词",
      "big",
      "bigger",
      "the biggest"
    ],
    [
      "形容词",
      "easy",
      "easier",
      "the easiest"
    ],
    [
      "形容词",
      "heavy",
      "heavier",
      "the heaviest"
    ],
    [
      "形容词",
      "careful",
      "more careful",
      "the most careful"
    ],
    [
      "副词",
      "slowly",
      "more slowly",
      "the most slowly"
    ],
    [
      "副词",
      "easily",
      "more easily",
      "the most easily"
    ],
    [
      "副词",
      "carefully",
      "more carefully",
      "the most carefully"
    ],
    [
      "两种词性",
      "fast",
      "faster",
      "the fastest"
    ],
    [
      "两种词性",
      "early",
      "earlier",
      "the earliest"
    ],
    [
      "形容词 / 副词",
      "good / well",
      "better",
      "the best"
    ],
    [
      "形容词 / 副词",
      "bad / badly",
      "worse",
      "the worst"
    ],
    [
      "形容词",
      "hard",
      "harder",
      "the hardest"
    ],
    [
      "形容词",
      "long",
      "longer",
      "the longest"
    ],
    [
      "形容词",
      "bright",
      "brighter",
      "the brightest"
    ],
    [
      "副词",
      "clearly",
      "more clearly",
      "the most clearly"
    ],
    [
      "形容词",
      "useful",
      "more useful",
      "the most useful"
    ],
    [
      "形容词",
      "simple",
      "simpler",
      "the simplest"
    ]
  ],
  "rules": [
    [
      "一般加-er / -est",
      "slow → slower → slowest"
    ],
    [
      "不发音e结尾，加-r / -st",
      "large → larger → largest"
    ],
    [
      "辅音字母+y，变y为i再加",
      "easy → easier → easiest"
    ],
    [
      "部分重读闭音节词，双写末尾辅音字母",
      "big → bigger → biggest"
    ],
    [
      "较长的形容词、多数-ly副词，前加more / most",
      "careful / carefully / slowly；early例外"
    ],
    [
      "不叠加两套变化",
      "faster，不写more faster；easiest，不写most easiest"
    ]
  ],
  "pairs": [
    {
      "title": "1 · 同一幅斜坡图，换一种说法",
      "questions": [
        {
          "id": "cmp-1",
          "prompt": "The ramp makes our work ____.",
          "options": [
            "easier",
            "more easily"
          ],
          "answer": "easier",
          "why": "easier说明work（工作）变得怎样，是形容词；make + 人或事物 + 形容词。",
          "hint": "空格说明work，还是说明move这个动作？"
        },
        {
          "id": "cmp-2",
          "prompt": "With a ramp, we can move boards ____ than before.",
          "options": [
            "easier",
            "more easily"
          ],
          "answer": "more easily",
          "why": "more easily说明move（搬运）这个动作怎样进行，是副词比较级；than before表示与之前比较。",
          "hint": "先找动作词move，再看空格说明什么。"
        }
      ]
    },
    {
      "title": "2 · 三种办法、三个孩子",
      "questions": [
        {
          "id": "cmp-3",
          "prompt": "This is the ____ way to carry books of the three.",
          "options": [
            "easiest",
            "most easily"
          ],
          "answer": "easiest",
          "why": "空格修饰way（办法），用形容词；of the three提示三者中最容易，前面已有the。",
          "hint": "先找way，再看比较范围。"
        },
        {
          "id": "cmp-4",
          "prompt": "Of the three children, Ben moves the boards ____.",
          "options": [
            "easiest",
            "most easily"
          ],
          "answer": "most easily",
          "why": "空格说明moves的动作，用副词最高级most easily。副词最高级前的the可以省略。",
          "hint": "空格说明Ben这个人，还是说明他搬的动作？"
        }
      ]
    },
    {
      "title": "3 · 小心的人、小心地做事",
      "questions": [
        {
          "id": "cmp-5",
          "prompt": "Be ____ with the bottles than before.",
          "options": [
            "more careful",
            "more carefully"
          ],
          "answer": "more careful",
          "why": "be后描述人的状态，用形容词careful；than before表示比较，用more careful。",
          "hint": "be后说的是人的状态，还是具体动作？"
        },
        {
          "id": "cmp-6",
          "prompt": "Please carry the bottles ____ than before.",
          "options": [
            "more careful",
            "more carefully"
          ],
          "answer": "more carefully",
          "why": "空格说明carry（搬）的动作，用副词carefully；比较时写more carefully。",
          "hint": "先圈出carry，再判断空格的作用。"
        }
      ]
    },
    {
      "title": "4 · 三个人，谁最小心？",
      "questions": [
        {
          "id": "cmp-7",
          "prompt": "Of the three workers, Amy is the ____.",
          "options": [
            "most careful",
            "most carefully"
          ],
          "answer": "most careful",
          "why": "is后说明Amy这个人最小心，用形容词最高级；the已经在题干里。",
          "hint": "说明Amy这个人怎样，还是说明她做事的动作怎样？"
        },
        {
          "id": "cmp-8",
          "prompt": "Of the three workers, Amy carries the bottles ____.",
          "options": [
            "most careful",
            "most carefully"
          ],
          "answer": "most carefully",
          "why": "空格说明carries的动作，用副词最高级most carefully；这里省略the也正确。",
          "hint": "找到动作carries；三人比较该用哪一级？"
        }
      ]
    },
    {
      "title": "5 · fast两种词性，形式相同",
      "questions": [
        {
          "id": "cmp-9",
          "prompt": "This machine is ____ than that one.",
          "options": [
            "faster",
            "more fast"
          ],
          "answer": "faster",
          "why": "这里说明machine快，用形容词fast；比较级是faster。",
          "hint": "is后描述机器怎样，fast的比较级怎样变？"
        },
        {
          "id": "cmp-10",
          "prompt": "This machine works ____ than that one.",
          "options": [
            "faster",
            "more fast"
          ],
          "answer": "faster",
          "why": "这里说明works的动作快，用副词fast；比较级仍是faster。不是所有副词都加more。",
          "hint": "说明works这个动作；副词fast也能加-er。"
        }
      ]
    },
    {
      "title": "6 · 找出错误，换成正确形式",
      "questions": [
        {
          "id": "cmp-11",
          "prompt": "改正：The machine works slowlyer than before.",
          "options": [
            "more slower",
            "more slowly"
          ],
          "answer": "more slowly",
          "why": "说明works的动作，要用副词；slowly通常加more，不能写slowlyer。",
          "hint": "既要判断词性，也要检查变化规则。"
        },
        {
          "id": "cmp-12",
          "prompt": "改正：This is the most easiest way.",
          "options": [
            "easiest",
            "most easiest"
          ],
          "answer": "easiest",
          "why": "easy的最高级是easiest；前面已有the，不能再叠加most。",
          "hint": "最高级选-er/-est这一套，还是more/most这一套？"
        }
      ]
    },
    {
      "title": "7 · 搬箱子：困难和重量",
      "questions": [
        {
          "id": "cmp-13",
          "prompt": "Without a lever, it is ____ to lift this heavy box.",
          "options": [
            "hard",
            "hardly"
          ],
          "answer": "hard",
          "why": "hard在这里是形容词，说明抬箱子很困难；比较级harder，最高级hardest。hardly不是这里需要的意思。",
          "hint": "本句在说抬箱子困难，先选原级。"
        },
        {
          "id": "cmp-14",
          "prompt": "This box is ____ than that one.",
          "options": [
            "heavy",
            "heavier",
            "heaviest"
          ],
          "answer": "heavier",
          "why": "than提示两者比较；heavy变y为i，再加-er，成为heavier。",
          "hint": "先找than，再回忆heavy怎样变。"
        }
      ]
    },
    {
      "title": "8 · 出行花时间，工具有用途",
      "questions": [
        {
          "id": "cmp-15",
          "prompt": "Walking takes a ____ time.",
          "options": [
            "long",
            "longer",
            "longest"
          ],
          "answer": "long",
          "why": "a long time表示很长时间；这里没有作比较，直接用long。",
          "hint": "这里有没有比较两个时间？"
        },
        {
          "id": "cmp-16",
          "prompt": "Of these three tools, this cart is the ____ for carrying books.",
          "options": [
            "useful",
            "more useful",
            "most useful"
          ],
          "answer": "most useful",
          "why": "三种工具中选最有用的，用形容词最高级most useful；题干已有the。",
          "hint": "先看比较范围，再看描述的是工具还是动作。"
        }
      ]
    },
    {
      "title": "9 · 灯让房间怎样，让我们看得怎样",
      "questions": [
        {
          "id": "cmp-17",
          "prompt": "With the light on, the room is ____.",
          "options": [
            "bright",
            "brightly"
          ],
          "answer": "bright",
          "why": "is后说明room明亮，用形容词bright；brighter / brightest也可用于比较亮度。",
          "hint": "说明room的状态，还是说明某个动作？"
        },
        {
          "id": "cmp-18",
          "prompt": "The light helps us see things ____ than before.",
          "options": [
            "clear",
            "more clearly",
            "most clearly"
          ],
          "answer": "more clearly",
          "why": "说明see这个动作，用副词clearly；than before表示与以前比较，所以用more clearly。",
          "hint": "先找动作see，再看than before。"
        }
      ]
    },
    {
      "title": "10 · 作文开头和图书小车",
      "questions": [
        {
          "id": "cmp-19",
          "prompt": "My favourite ____ machine is the wheel.",
          "options": [
            "simple",
            "simply"
          ],
          "answer": "simple",
          "why": "simple修饰machine，组成simple machine；它的比较级、最高级可写simpler / simplest。",
          "hint": "空格修饰machine这个名词。"
        },
        {
          "id": "cmp-20",
          "prompt": "This cart is ____ books.",
          "options": [
            "full of",
            "most full",
            "fullest"
          ],
          "answer": "full of",
          "why": "full of books表示装满书；本句直接练词组，不需要比较级或最高级。",
          "hint": "装满书，要用哪个完整词组？"
        }
      ]
    },
    {
      "title": "11 · 不作比较时，也要会用原级",
      "questions": [
        {
          "id": "cmp-21",
          "prompt": "I like this lever. It is very ____.",
          "options": [
            "useful",
            "usefully",
            "more useful"
          ],
          "answer": "useful",
          "why": "这里描述lever有用，用形容词原级useful；very后不直接接more useful。",
          "hint": "very后要填形容词原级，还是比较级？"
        },
        {
          "id": "cmp-22",
          "prompt": "The ramp helps us move boards ____.",
          "options": [
            "easy",
            "easily",
            "easier"
          ],
          "answer": "easily",
          "why": "空格说明move这个动作，用副词原级easily；只有需要比较时才用more easily或most easily。",
          "hint": "形容词、副词先选对，再判断是否需要比较。"
        }
      ]
    },
    {
      "title": "12 · 喜欢什么，以前怎样联系家人",
      "questions": [
        {
          "id": "cmp-23",
          "prompt": "My ____ invention is the washing machine.",
          "options": [
            "favourite",
            "most favourite"
          ],
          "answer": "favourite",
          "why": "My favourite invention是本课开头句；这里不写most favourite。",
          "hint": "本课开头句怎样说“我最喜欢的发明”？"
        },
        {
          "id": "cmp-24",
          "prompt": "In the past, people ____ wrote letters to family far away.",
          "options": [
            "often",
            "oftenly"
          ],
          "answer": "often",
          "why": "often表示经常，是副词，本身就能说明动作发生的频率；不加-ly。",
          "hint": "表示“经常”，often本身能不能直接用？"
        }
      ]
    },
    {
      "title": "13 · 远行与远方的家人",
      "questions": [
        {
          "id": "cmp-25",
          "prompt": "For a long trip, planes are ____ faster than trains.",
          "options": [
            "usually",
            "usual"
          ],
          "answer": "usually",
          "why": "usually表示通常；本句用faster比较速度，用usually说明通常如此，不把usually硬变比较级。",
          "hint": "这句中表示速度比较的词已经是哪一个？"
        },
        {
          "id": "cmp-26",
          "prompt": "In the past, people often wrote letters to family ____.",
          "options": [
            "far away",
            "faraway"
          ],
          "answer": "far away",
          "why": "far away放在family后，表示家人在远方；本课直接练family far away这个搭配。",
          "hint": "这里要表达“在远方”，用两个词的短语。"
        }
      ]
    }
  ],
  "targets": [
    {
      "id": "heavy",
      "word": "heavy",
      "kind": "形容词",
      "cn": "重的",
      "comparative": "heavier",
      "superlative": "heaviest",
      "use": "a heavy box / carry heavy books",
      "practiceIds": [
        "cmp-14"
      ]
    },
    {
      "id": "hard",
      "word": "hard",
      "kind": "形容词",
      "cn": "困难的",
      "comparative": "harder",
      "superlative": "hardest",
      "use": "It is hard to lift the box.",
      "practiceIds": [
        "cmp-13"
      ]
    },
    {
      "id": "easy",
      "word": "easy",
      "kind": "形容词",
      "cn": "容易的",
      "comparative": "easier",
      "superlative": "easiest",
      "use": "make our work easier",
      "practiceIds": [
        "cmp-1",
        "cmp-3"
      ]
    },
    {
      "id": "easily",
      "word": "easily",
      "kind": "副词",
      "cn": "容易地",
      "comparative": "more easily",
      "superlative": "most easily",
      "use": "move things easily / lift it more easily",
      "practiceIds": [
        "cmp-2",
        "cmp-4",
        "cmp-22"
      ]
    },
    {
      "id": "fast",
      "word": "fast",
      "kind": "形容词 / 副词",
      "cn": "快的；快地",
      "comparative": "faster",
      "superlative": "fastest",
      "use": "travel fast / move faster",
      "practiceIds": [
        "cmp-9",
        "cmp-10"
      ]
    },
    {
      "id": "long",
      "word": "long",
      "kind": "形容词",
      "cn": "长的",
      "comparative": "longer",
      "superlative": "longest",
      "use": "a long time / walk a long way",
      "practiceIds": [
        "cmp-15"
      ]
    },
    {
      "id": "bright",
      "word": "bright",
      "kind": "形容词",
      "cn": "明亮的",
      "comparative": "brighter",
      "superlative": "brightest",
      "use": "make the room bright",
      "practiceIds": [
        "cmp-17"
      ]
    },
    {
      "id": "clearly",
      "word": "clearly",
      "kind": "副词",
      "cn": "清楚地",
      "comparative": "more clearly",
      "superlative": "most clearly",
      "use": "see things clearly",
      "practiceIds": [
        "cmp-18"
      ]
    },
    {
      "id": "useful",
      "word": "useful",
      "kind": "形容词",
      "cn": "有用的",
      "comparative": "more useful",
      "superlative": "most useful",
      "use": "It is useful. / the most useful tool",
      "practiceIds": [
        "cmp-16",
        "cmp-21"
      ]
    },
    {
      "id": "simple",
      "word": "simple",
      "kind": "形容词",
      "cn": "简单的",
      "comparative": "simpler",
      "superlative": "simplest",
      "use": "My favourite simple machine ...",
      "practiceIds": [
        "cmp-19"
      ]
    }
  ],
  "fixedWords": [
    {
      "id": "full",
      "word": "full of",
      "cn": "装满",
      "use": "a cart full of books",
      "practiceIds": [
        "cmp-20"
      ]
    },
    {
      "id": "favourite",
      "word": "favourite",
      "cn": "最喜欢的",
      "use": "My favourite invention is ...",
      "practiceIds": [
        "cmp-23"
      ]
    },
    {
      "id": "often",
      "word": "often",
      "cn": "经常",
      "use": "People often wrote letters.",
      "practiceIds": [
        "cmp-24"
      ]
    },
    {
      "id": "usually",
      "word": "usually",
      "cn": "通常",
      "use": "Planes are usually faster.",
      "practiceIds": [
        "cmp-25"
      ]
    },
    {
      "id": "far-away",
      "word": "far away",
      "cn": "在远方",
      "use": "family far away",
      "practiceIds": [
        "cmp-26"
      ]
    }
  ],
  "sceneWords": {
    "books": [
      "heavy",
      "hard",
      "easy",
      "easily",
      "simple",
      "favourite"
    ],
    "bicycle": [
      "long",
      "fast",
      "easy",
      "simple",
      "favourite"
    ],
    "wheelchair": [
      "hard",
      "simple",
      "favourite"
    ],
    "library": [
      "easy",
      "easily",
      "useful",
      "full",
      "simple",
      "favourite"
    ],
    "lever": [
      "heavy",
      "hard",
      "easily",
      "useful",
      "simple",
      "favourite"
    ],
    "opener": [
      "hard",
      "easy",
      "easily",
      "simple",
      "favourite"
    ],
    "washing": [
      "long",
      "easy",
      "favourite"
    ],
    "car": [
      "long",
      "easy",
      "favourite"
    ],
    "light": [
      "hard",
      "bright",
      "clearly",
      "easy",
      "favourite"
    ],
    "phone": [
      "often",
      "far-away",
      "easy",
      "favourite"
    ],
    "train": [
      "long",
      "fast",
      "favourite"
    ],
    "plane": [
      "long",
      "fast",
      "usually",
      "favourite"
    ]
  }
};
