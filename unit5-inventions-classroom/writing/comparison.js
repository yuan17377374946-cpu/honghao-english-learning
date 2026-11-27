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
    }
  ]
};
