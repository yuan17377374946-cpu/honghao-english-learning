window.FRIDAY_DATA = {
  "modules": [
    {
      "name": "单词入句",
      "time": "5分钟",
      "goal": "把词放回句子里认出来"
    },
    {
      "name": "混合语法",
      "time": "8分钟",
      "goal": "先找依据，再判断形式"
    },
    {
      "name": "课文阅读",
      "time": "12分钟",
      "goal": "谁 · 做什么 · 补充信息"
    },
    {
      "name": "生活中的力",
      "time": "8分钟",
      "goal": "动作 · 方向 · 大小 · 结果"
    },
    {
      "name": "自己写句子",
      "time": "9分钟",
      "goal": "先改一段，再写自己的"
    },
    {
      "name": "独立检查",
      "time": "3分钟",
      "goal": "撤掉提示，自己完成"
    }
  ],
  "vocab": [
    {
      "id": "v1",
      "prompt": "The suitcase is light.",
      "options": [
        "轻的",
        "明亮的",
        "灯"
      ],
      "answer": 0,
      "why": "这里说行李箱的重量。light有多个意思，要结合suitcase理解。",
      "context": "说出light在这句话中的意思。"
    },
    {
      "id": "v2",
      "prompt": "A force can change the speed of a toy car.",
      "options": [
        "速度",
        "颜色",
        "形状"
      ],
      "answer": 0,
      "why": "speed是速度。句子说力能改变玩具车的速度。",
      "context": "说出speed在句中的意思。"
    },
    {
      "id": "v3",
      "prompt": "The ball moves towards me.",
      "options": [
        "远离我",
        "朝向我",
        "在我上方"
      ],
      "answer": 1,
      "why": "towards me是朝向我；远离我是away from me。",
      "context": "球相对“我”朝哪里移动？"
    },
    {
      "id": "v4",
      "prompt": "A strong wind can cause a big movement.",
      "options": [
        "引起",
        "停止",
        "看见"
      ],
      "answer": 0,
      "why": "cause在这里是动词，表示引起。不要只记它作名词时“原因”的意思。",
      "context": "cause在这里表示什么？"
    },
    {
      "id": "v5",
      "prompt": "Ask yourself a question.",
      "options": [
        "你们自己",
        "我自己",
        "你自己"
      ],
      "answer": 2,
      "why": "yourself指你自己；ask yourself是问问你自己。",
      "context": "yourself指谁？"
    },
    {
      "id": "v6",
      "prompt": "The tortoise moves slowly.",
      "options": [
        "乌龟慢慢移动。",
        "乌龟跑得最快。",
        "兔子慢慢移动。"
      ],
      "answer": 0,
      "why": "tortoise是龟，slowly是慢慢地。整句需要同时理解主语和动作。",
      "context": "选出整句意思。"
    }
  ],
  "phonics": [
    {
      "id": "p1",
      "prompt": "Which word has a different vowel sound?",
      "options": [
        "light",
        "big",
        "night"
      ],
      "answer": 1,
      "why": "light、night中的igh发/aɪ/；big中的i发/ɪ/。",
      "context": "找出画线目标元音发音不同的一项：igh / i。"
    },
    {
      "id": "p2",
      "prompt": "Which word has a different vowel sound?",
      "options": [
        "six",
        "time",
        "bike"
      ],
      "answer": 0,
      "why": "six中的i发/ɪ/；time和bike中的i_e发/aɪ/。",
      "context": "比较i与i_e。"
    },
    {
      "id": "p3",
      "prompt": "Which pair has the same vowel sound?",
      "options": [
        "high — sit",
        "nine — fish",
        "kite — night"
      ],
      "answer": 2,
      "why": "kite中的i_e与night中的igh都发/aɪ/。另外两组分别是/aɪ/与/ɪ/。",
      "context": "找出元音发音相同的一组。"
    },
    {
      "id": "p4",
      "prompt": "Which pair has different vowel sounds?",
      "options": [
        "right — light",
        "sit — bike",
        "time — nine"
      ],
      "answer": 1,
      "why": "sit发/ɪ/，bike发/aɪ/；其余两组目标元音都是/aɪ/。",
      "context": "找出元音发音不同的一组。"
    }
  ],
  "warmEdits": [
    {
      "id": "we1",
      "original": "The box is light.\n理解：这个箱子是一盏灯。",
      "model": "这个箱子很轻。",
      "why": "is light在这里描述箱子的重量。先看主语是box，再结合句子理解light。",
      "hints": [
        "这句话在说箱子是什么，还是说箱子怎么样？",
        "light在重量的语境中与heavy相对。"
      ],
      "kind": "改理解",
      "correct": false,
      "diffs": [
        [
          "是一盏灯",
          "很轻"
        ]
      ],
      "context": ""
    },
    {
      "id": "we2",
      "original": "night里的igh和big里的i发音相同。",
      "model": "night里的igh发/aɪ/，big里的i发/ɪ/，发音不同。",
      "why": "单词里都有字母i，不代表发音相同。igh通常读/aɪ/。",
      "hints": [
        "先分别读night和big。",
        "night的元音和bike相同；big的元音和sit相同。"
      ],
      "kind": "改发音判断",
      "correct": false,
      "diffs": [
        [
          "相同",
          "不同"
        ]
      ],
      "context": ""
    },
    {
      "id": "we3",
      "original": "The ball moves towards me.\n理解：球远离我移动。",
      "model": "球朝我移动。",
      "why": "towards是朝向；away from才是远离。",
      "hints": [
        "先找表示方向的词。",
        "towards me表示朝着我。"
      ],
      "kind": "改理解",
      "correct": false,
      "diffs": [
        [
          "远离我",
          "朝我"
        ]
      ],
      "context": ""
    },
    {
      "id": "we4",
      "original": "It is difficult to move the desk.\n理解：移动这张桌子很困难。",
      "model": "移动这张桌子很困难。",
      "why": "理解正确。It is difficult to…说明做某事很困难，不需要为了改错而改。",
      "hints": [
        "先找真正被评价为“困难”的事情。",
        "to move the desk是移动桌子这件事。"
      ],
      "kind": "改理解",
      "correct": true,
      "diffs": [],
      "context": ""
    }
  ],
  "grammar": [
    {
      "id": "g1",
      "prompt": "There are two ropes. The red rope is ___ than the blue one.",
      "options": [
        "long",
        "longer",
        "longest"
      ],
      "answer": 1,
      "why": "than把两根绳子放在一起比较，用longer。long是原级，longest是最高级。",
      "context": ""
    },
    {
      "id": "g2",
      "prompt": "Of all the bags here, this one is ___ .",
      "options": [
        "the heaviest",
        "heavier",
        "heavy"
      ],
      "answer": 0,
      "why": "of all the bags给出全部范围，要说其中最重的，用the heaviest。",
      "context": "表达：在这里所有的包中，这个最重。"
    },
    {
      "id": "g3",
      "prompt": "This box is very ___ .",
      "options": [
        "heavier",
        "heaviest",
        "heavy"
      ],
      "answer": 2,
      "why": "very直接修饰这里的形容词原级heavy。没有比较关系。",
      "context": ""
    },
    {
      "id": "g4",
      "prompt": "The tortoise moves ___ .",
      "options": [
        "slowness",
        "slowly",
        "slowest"
      ],
      "answer": 1,
      "why": "这里需要副词原级slowly描述moves。slowness是名词；slowest表示最慢，不符合这里不作比较的要求。",
      "context": "按“乌龟慢慢移动”的意思补全句子，不作速度比较。"
    },
    {
      "id": "g5",
      "prompt": "It is easy ___ this small box.",
      "options": [
        "moving",
        "move",
        "to move"
      ],
      "answer": 2,
      "why": "It is＋形容词＋to do：做某事怎么样。to后用动词原形。",
      "context": ""
    },
    {
      "id": "g6",
      "prompt": "I use a small force ___ the drawer.",
      "options": [
        "to pull",
        "pulls",
        "pulling"
      ],
      "answer": 0,
      "why": "use…to do…表示用……来做……。这里用to pull。",
      "context": ""
    },
    {
      "id": "g7",
      "prompt": "A push makes the toy car ___ .",
      "options": [
        "moves",
        "move",
        "to move"
      ],
      "answer": 1,
      "why": "make＋宾语＋动词原形。makes是前面的谓语，后面的move保持原形。",
      "context": ""
    },
    {
      "id": "g8",
      "prompt": "The two rulers are equally long. This ruler is as ___ as that one.",
      "options": [
        "longer",
        "longest",
        "long"
      ],
      "answer": 2,
      "why": "as＋形容词原级＋as，表示一样长。",
      "context": ""
    },
    {
      "id": "g9",
      "prompt": "The blue bag costs 30 yuan. The red one costs 50 yuan. The blue bag is ___ than the red one.",
      "options": [
        "cheaper",
        "cheap",
        "the cheapest"
      ],
      "answer": 0,
      "why": "30元比50元便宜，用cheaper than。不是只看单词，而要核对价格。",
      "context": ""
    },
    {
      "id": "g10",
      "prompt": "Please walk ___ in the library.",
      "options": [
        "quiet",
        "quietly",
        "quieter"
      ],
      "answer": 1,
      "why": "walk是动作，用quietly说明轻声地走。没有比较，不用quieter。",
      "context": ""
    },
    {
      "id": "g11",
      "prompt": "When I pull the drawer open, it moves ___ me.",
      "options": [
        "away from",
        "above",
        "towards"
      ],
      "answer": 2,
      "why": "拉开抽屉时，抽屉朝拉它的人靠近，towards me。",
      "context": ""
    },
    {
      "id": "g12",
      "prompt": "Among all the children in the photo, Amy is ___ .",
      "options": [
        "the youngest",
        "younger",
        "young"
      ],
      "answer": 0,
      "why": "among all给出比较范围，表示这些孩子中最小的，用the youngest。",
      "context": "表达：照片里的所有孩子中，Amy年纪最小。"
    }
  ],
  "grammarExtra": [
    {
      "id": "gx1",
      "prompt": "The green chair is ___ than the wooden one.",
      "options": [
        "comfortable",
        "more comfortable",
        "most comfortable"
      ],
      "answer": 1,
      "why": "comfortable是较长的形容词，这里的比较级用more comfortable。",
      "context": ""
    },
    {
      "id": "gx2",
      "prompt": "These two boxes weigh the same. Box A is as ___ as Box B.",
      "options": [
        "heavy",
        "heavier",
        "heaviest"
      ],
      "answer": 0,
      "why": "as…as中间用原级heavy。",
      "context": ""
    },
    {
      "id": "gx3",
      "prompt": "This question is not as ___ as that one.",
      "options": [
        "easier",
        "easiest",
        "easy"
      ],
      "answer": 2,
      "why": "not as＋原级＋as：不如……容易。",
      "context": ""
    },
    {
      "id": "gx4",
      "prompt": "Of the five routes, this is ___ .",
      "options": [
        "shorter",
        "the shortest",
        "short"
      ],
      "answer": 1,
      "why": "五条路线中最短的一条，最高级是the shortest。",
      "context": "表达：五条路线中，这条最短。"
    },
    {
      "id": "gx5",
      "prompt": "The car moves ___ when I push it gently.",
      "options": [
        "slowly",
        "slowness",
        "slowest"
      ],
      "answer": 0,
      "why": "slowly是副词原级，说明移动方式；slowness是名词，slowest表示最慢，不符合题意。",
      "context": "按“车慢慢移动”的意思补全句子，不作比较。"
    },
    {
      "id": "gx6",
      "prompt": "She uses her fingers ___ the piano keys.",
      "options": [
        "pushing",
        "pushes",
        "to push"
      ],
      "answer": 2,
      "why": "uses…to do…，用手指来按琴键。",
      "context": ""
    },
    {
      "id": "gx7",
      "prompt": "A big push can make the cart ___ .",
      "options": [
        "moves",
        "move",
        "to move"
      ],
      "answer": 1,
      "why": "can后的make用原形，make后宾语再接动词原形move。",
      "context": ""
    },
    {
      "id": "gx8",
      "prompt": "It is difficult ___ the heavy desk alone.",
      "options": [
        "to move",
        "moving",
        "move"
      ],
      "answer": 0,
      "why": "It is difficult to do…：做……困难。",
      "context": ""
    },
    {
      "id": "gx9",
      "prompt": "The boy pushes the cart ___ from himself.",
      "options": [
        "towards",
        "to",
        "away"
      ],
      "answer": 2,
      "why": "away from表示远离，与这里的推车方向相符。",
      "context": ""
    },
    {
      "id": "gx10",
      "prompt": "Today is 20°C. Yesterday was 15°C. Today is ___ than yesterday.",
      "options": [
        "warm",
        "warmer",
        "warmest"
      ],
      "answer": 1,
      "why": "两个时间的温度比较，20°C更暖，用warmer。",
      "context": ""
    },
    {
      "id": "gx11",
      "prompt": "This is my ___ drawing. I like it more than all my other drawings.",
      "options": [
        "best",
        "the best",
        "better"
      ],
      "answer": 0,
      "why": "my已经放在前面，my best drawing不再加the。语境明确是所有作品中最喜欢的。",
      "context": "我画过至少三幅画。表达：这是我最好的一幅。"
    },
    {
      "id": "gx12",
      "prompt": "He throws the ball ___ .",
      "options": [
        "careful",
        "more careful",
        "carefully"
      ],
      "answer": 2,
      "why": "throws是动作，用副词carefully描述动作方式。",
      "context": ""
    }
  ],
  "grammarEdits": [
    {
      "id": "ge1",
      "original": "This bag is heavy than that one.",
      "model": "This bag is heavier than that one.",
      "why": "than提示两个对象作比较。heavy以辅音字母＋y结尾，变y为i再加er。",
      "hints": [
        "找出表示比较关系的词。",
        "heavy的比较级不是加more，而是变y为i加er。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "heavy",
          "heavier"
        ]
      ],
      "context": ""
    },
    {
      "id": "ge2",
      "original": "Tom is tallest boy in our class.",
      "model": "Tom is the tallest boy in our class.",
      "why": "这里是the tallest boy这个名词短语，不能漏掉最高级前的限定词the。",
      "hints": [
        "这句话说的是全班最高的男孩。",
        "检查tallest boy前面的限定词。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "tallest boy",
          "the tallest boy"
        ]
      ],
      "context": ""
    },
    {
      "id": "ge3",
      "original": "The tortoise is slowly.",
      "model": "The tortoise is slow.",
      "why": "这里用is描述乌龟的特点，需要形容词slow；如果用moves描述动作，则可以说moves slowly。",
      "hints": [
        "is后面在描述乌龟的特点，还是某个动作的方式？",
        "be动词后这里用形容词slow。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "slowly",
          "slow"
        ]
      ],
      "context": ""
    },
    {
      "id": "ge4",
      "original": "It is easy move the box.",
      "model": "It is easy to move the box.",
      "why": "It is＋形容词＋to＋动词原形。to move the box说明被评价的事情。",
      "hints": [
        "句子意思是“移动箱子很容易”。",
        "easy与move之间少了to。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "easy move",
          "easy to move"
        ]
      ],
      "context": ""
    },
    {
      "id": "ge5",
      "original": "I use a small force push the door.",
      "model": "I use a small force to push the door.",
      "why": "use…to do…表示用……来做……，不能漏to。",
      "hints": [
        "用力是为了做什么？",
        "use…to＋动词原形。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "force push",
          "force to push"
        ]
      ],
      "context": ""
    },
    {
      "id": "ge6",
      "original": "A push makes the car moves.",
      "model": "A push makes the car move.",
      "why": "make＋宾语＋动词原形，不能让后面的move再加s。",
      "hints": [
        "找出makes后面的宾语和动作。",
        "make the car move。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "moves",
          "move"
        ]
      ],
      "context": ""
    },
    {
      "id": "ge7",
      "original": "This box is very heavy.",
      "model": "This box is very heavy.",
      "why": "这是正确的原级描述，very heavy表示很重，不需要比较级。",
      "hints": [
        "有没有第二个比较对象？",
        "very在这里修饰原级形容词。"
      ],
      "kind": "英文改错",
      "correct": true,
      "diffs": [],
      "context": ""
    },
    {
      "id": "ge8",
      "original": "The green chair is comfortabler than the blue one.",
      "model": "The green chair is more comfortable than the blue one.",
      "why": "comfortable的比较级通常用more comfortable。",
      "hints": [
        "comfortabler是这个词通常使用的比较级吗？",
        "较长的形容词通常在前面加more。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "comfortabler",
          "more comfortable"
        ]
      ],
      "context": ""
    },
    {
      "id": "ge9",
      "original": "The rulers are as longer as each other.",
      "model": "The rulers are as long as each other.",
      "why": "as…as表示同等比较，中间用原级long。",
      "hints": [
        "先圈出as…as。",
        "这个结构中间用形容词原级。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "longer",
          "long"
        ]
      ],
      "context": ""
    },
    {
      "id": "ge10",
      "original": "This is my the best picture.",
      "model": "This is my best picture.",
      "why": "my和the不这样一起放在最高级名词短语前面。这里保留my，删掉the。",
      "hints": [
        "先看best前面已经有什么词。",
        "my best picture。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "my the best",
          "my best"
        ]
      ],
      "context": ""
    },
    {
      "id": "ge11",
      "original": "She runs quickly.",
      "model": "She runs quickly.",
      "why": "quickly正确地修饰runs。副词不是一律需要改成形容词。",
      "hints": [
        "这里描述的是动作。",
        "quickly就是“快速地”。"
      ],
      "kind": "英文改错",
      "correct": true,
      "diffs": [],
      "context": ""
    },
    {
      "id": "ge12",
      "original": "This question is more easier than that one.",
      "model": "This question is easier than that one.",
      "why": "easy的比较级已经是easier，前面不再加more。",
      "hints": [
        "有没有重复表示“更”的部分？",
        "easier已经是比较级。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "more easier",
          "easier"
        ]
      ],
      "context": ""
    }
  ],
  "readings": [
    {
      "id": "r1",
      "title": "两只山羊住在哪里？",
      "page": "46",
      "lines": [
        {
          "chunks": [
            {
              "text": "A long time ago, ",
              "role": "rest"
            },
            {
              "text": "two brothers, Black Goat and Brown Goat, ",
              "role": "subject"
            },
            {
              "text": "lived ",
              "role": "verb"
            },
            {
              "text": "on East Mountain together.",
              "role": "rest"
            }
          ],
          "cn": "很久以前，黑山羊和棕山羊这两兄弟一起住在东山。",
          "note": "主语很长：two brothers后面的名字说明是哪两兄弟。lived是live的过去式。"
        }
      ],
      "coach": [
        "先找到谁住在那里。",
        "lived后面补充了地点和“一起”。"
      ]
    },
    {
      "id": "r2",
      "title": "第一次争执：谁吃青草？",
      "page": "46",
      "lines": [
        {
          "chunks": [
            {
              "text": "One day, ",
              "role": "rest"
            },
            {
              "text": "they ",
              "role": "subject"
            },
            {
              "text": "saw ",
              "role": "verb"
            },
            {
              "text": "a small piece of the greenest grass.",
              "role": "rest"
            }
          ],
          "cn": "一天，它们看见了一小块最绿的草。",
          "note": "saw是see的过去式。the greenest修饰grass。"
        },
        {
          "chunks": [
            {
              "text": "Brown Goat ",
              "role": "subject"
            },
            {
              "text": "said, ",
              "role": "verb"
            },
            {
              "text": "“I’m older. I should eat the grass.”",
              "role": "rest"
            }
          ],
          "cn": "棕山羊说：“我年纪更大。我应该吃这些草。”",
          "note": "older是比较级；should后接动词原形eat。"
        },
        {
          "chunks": [
            {
              "text": "Black Goat ",
              "role": "subject"
            },
            {
              "text": "said, ",
              "role": "verb"
            },
            {
              "text": "“I’m smarter. I should eat it.”",
              "role": "rest"
            }
          ],
          "cn": "黑山羊说：“我更聪明。我应该吃它。”",
          "note": "it指前面那块草。smarter是smart的比较级。"
        },
        {
          "chunks": [
            {
              "text": "They ",
              "role": "subject"
            },
            {
              "text": "pushed ",
              "role": "verb"
            },
            {
              "text": "each other for a long time and got tired.",
              "role": "rest"
            }
          ],
          "cn": "它们互相推了很长时间，变得疲惫了。",
          "note": "先说pushed each other，再读and got tired。each other是互相，不是推自己。"
        },
        {
          "chunks": [
            {
              "text": "Black Goat ",
              "role": "subject"
            },
            {
              "text": "was ",
              "role": "verb"
            },
            {
              "text": "angry and moved to West Mountain.",
              "role": "rest"
            }
          ],
          "cn": "黑山羊很生气，搬去了西山。",
          "note": "同一个主语Black Goat，后面又有动作moved。不要把搬家的对象说反。"
        }
      ],
      "coach": [
        "谁说自己年纪更大？谁说自己更聪明？",
        "it指什么？哪只山羊搬走了？"
      ]
    },
    {
      "id": "r3",
      "title": "每天过桥：目的是什么？",
      "page": "47",
      "lines": [
        {
          "chunks": [
            {
              "text": "Every day, ",
              "role": "rest"
            },
            {
              "text": "Brown Goat ",
              "role": "subject"
            },
            {
              "text": "crossed ",
              "role": "verb"
            },
            {
              "text": "a small bridge to drink the coldest water on West Mountain.",
              "role": "rest"
            }
          ],
          "cn": "每天，棕山羊跨过一座小桥，去喝西山上最凉的水。",
          "note": "to drink说明过桥的目的；the coldest是最高级。"
        },
        {
          "chunks": [
            {
              "text": "Every day, ",
              "role": "rest"
            },
            {
              "text": "Black Goat ",
              "role": "subject"
            },
            {
              "text": "crossed ",
              "role": "verb"
            },
            {
              "text": "the bridge to eat the greenest grass on East Mountain.",
              "role": "rest"
            }
          ],
          "cn": "每天，黑山羊过桥，去吃东山上最绿的草。",
          "note": "故事是过去的事，所以有Every day也用crossed。不能只靠一个时间词判断时态。"
        }
      ],
      "coach": [
        "先说谁过桥，再说去做什么。",
        "别把Brown和Black的目的、方向互换。"
      ]
    },
    {
      "id": "r4",
      "title": "在桥上相遇：谁肯后退？",
      "page": "47",
      "lines": [
        {
          "chunks": [
            {
              "text": "One day, ",
              "role": "rest"
            },
            {
              "text": "both goats ",
              "role": "subject"
            },
            {
              "text": "were ",
              "role": "verb"
            },
            {
              "text": "on the bridge at the same time.",
              "role": "rest"
            }
          ],
          "cn": "一天，两只山羊同时在桥上。",
          "note": "both是两者都；at the same time表示同时。"
        },
        {
          "chunks": [
            {
              "text": "Brown Goat ",
              "role": "subject"
            },
            {
              "text": "said, ",
              "role": "verb"
            },
            {
              "text": "“Go back! I’m crossing first.”",
              "role": "rest"
            }
          ],
          "cn": "棕山羊说：“退回去！我要先过桥。”",
          "note": "Go back是祈使句；I’m crossing是现在进行时形式，出现在人物当时的直接引语里。"
        },
        {
          "chunks": [
            {
              "text": "Black Goat ",
              "role": "subject"
            },
            {
              "text": "said, ",
              "role": "verb"
            },
            {
              "text": "“You go back!”",
              "role": "rest"
            }
          ],
          "cn": "黑山羊说：“你退回去！”",
          "note": "这句话说明黑山羊也不愿让路。"
        }
      ],
      "coach": [
        "both和at the same time分别告诉我们什么？",
        "从哪句话看出双方都不肯让路？"
      ]
    },
    {
      "id": "r5",
      "title": "推到最后：发生了什么？",
      "page": "47",
      "lines": [
        {
          "chunks": [
            {
              "text": "They ",
              "role": "subject"
            },
            {
              "text": "pushed ",
              "role": "verb"
            },
            {
              "text": "each other with the same force.",
              "role": "rest"
            }
          ],
          "cn": "它们用同样大小的力互相推。",
          "note": "with the same force说明用力的情况。same不能误读成small。"
        },
        {
          "chunks": [
            {
              "text": "They ",
              "role": "subject"
            },
            {
              "text": "pushed ",
              "role": "verb"
            },
            {
              "text": "until they both fell into the river below the bridge.",
              "role": "rest"
            }
          ],
          "cn": "它们一直推，直到两只都掉进桥下的河里。",
          "note": "until是直到；both不能漏译；fell是fall的过去式；below the bridge补充河的位置。"
        }
      ],
      "coach": [
        "先说主句They pushed，再读until后面的结果。",
        "both、into、below分别是什么信息？"
      ]
    },
    {
      "id": "r6",
      "title": "故事结尾：只顾自己会怎样？",
      "page": "47",
      "lines": [
        {
          "chunks": [
            {
              "text": "The goats ",
              "role": "subject"
            },
            {
              "text": "got out of ",
              "role": "verb"
            },
            {
              "text": "the river and walked home.",
              "role": "rest"
            }
          ],
          "cn": "山羊们从河里出来，走回家。",
          "note": "got out of是从……出来；and后还有walked home。"
        },
        {
          "chunks": [
            {
              "text": "They ",
              "role": "subject"
            },
            {
              "text": "were ",
              "role": "verb"
            },
            {
              "text": "angry, tired and hungry.",
              "role": "rest"
            }
          ],
          "cn": "它们又生气、又疲惫、又饥饿。",
          "note": "三个形容词共同描述They的状态。"
        },
        {
          "chunks": [
            {
              "text": "And that ",
              "role": "subject"
            },
            {
              "text": "was ",
              "role": "verb"
            },
            {
              "text": "the story of the two stubborn little goats.",
              "role": "rest"
            }
          ],
          "cn": "这就是两只固执的小山羊的故事。",
          "note": "根据始终不愿让路的行为，理解stubborn是固执的。"
        }
      ],
      "coach": [
        "结尾到底是死了，还是走回家？回原文核对。",
        "哪种行为让你觉得它们stubborn？"
      ]
    },
    {
      "id": "r7",
      "title": "因果补充：小鸟怎样学会飞？",
      "page": "39",
      "lines": [
        {
          "chunks": [
            {
              "text": "Chicks ",
              "role": "subject"
            },
            {
              "text": "cannot fly ",
              "role": "verb"
            },
            {
              "text": "when they are very small, so their parents get food for them.",
              "role": "rest"
            }
          ],
          "cn": "雏鸟很小时不会飞，所以它们的父母为它们找食物。",
          "note": "when补充时间，so引出结果。注意their parents和them分别指谁。"
        },
        {
          "chunks": [
            {
              "text": "Chicks ",
              "role": "subject"
            },
            {
              "text": "move ",
              "role": "verb"
            },
            {
              "text": "their wings in the nest.",
              "role": "rest"
            }
          ],
          "cn": "雏鸟在巢里活动翅膀。",
          "note": "their wings是它们的翅膀，不是父母的翅膀。"
        },
        {
          "chunks": [
            {
              "text": "Their wings ",
              "role": "subject"
            },
            {
              "text": "get ",
              "role": "verb"
            },
            {
              "text": "strong.",
              "role": "rest"
            }
          ],
          "cn": "它们的翅膀变得强壮。",
          "note": "get strong是变得强壮；get在这里不是得到。"
        },
        {
          "chunks": [
            {
              "text": "When the chicks get big, ",
              "role": "rest"
            },
            {
              "text": "they ",
              "role": "subject"
            },
            {
              "text": "leave ",
              "role": "verb"
            },
            {
              "text": "the nest.",
              "role": "rest"
            }
          ],
          "cn": "当雏鸟长大时，它们离开鸟巢。",
          "note": "先理解When从句，再找主句they leave the nest。"
        },
        {
          "chunks": [
            {
              "text": "They ",
              "role": "subject"
            },
            {
              "text": "move ",
              "role": "verb"
            },
            {
              "text": "their wings up and down and fly in the air.",
              "role": "rest"
            }
          ],
          "cn": "它们上下扇动翅膀，在空中飞翔。",
          "note": "同一主语后有move和fly两个动作。"
        }
      ],
      "coach": [
        "哪部分是原因，哪部分是结果？",
        "逐个找清they、their、them指谁。"
      ]
    }
  ],
  "readingQuiz": [
    {
      "id": "rq1",
      "prompt": "Who moved to West Mountain?",
      "options": [
        "Brown Goat.",
        "Black Goat.",
        "Both goats."
      ],
      "answer": 1,
      "why": "第46页明确说Black Goat was angry and moved to West Mountain，不能凭名字猜。",
      "context": "",
      "evidence": "r2"
    },
    {
      "id": "rq2",
      "prompt": "Why did Brown Goat cross the bridge every day?",
      "options": [
        "To eat the greenest grass.",
        "To visit Black Goat.",
        "To drink the coldest water."
      ],
      "answer": 2,
      "why": "to drink说明Brown Goat过桥的目的。吃草是Black Goat的目的。",
      "context": "",
      "evidence": "r3"
    },
    {
      "id": "rq3",
      "prompt": "What happened after they kept pushing on the bridge?",
      "options": [
        "Both fell into the river.",
        "Only Black Goat fell.",
        "They shared the grass."
      ],
      "answer": 0,
      "why": "原文说they both fell into the river。both必须落实为“两只都”。",
      "context": "",
      "evidence": "r5"
    },
    {
      "id": "rq4",
      "prompt": "What does “stubborn” mean in this story?",
      "options": [
        "Generous.",
        "Unwilling to change or give way.",
        "Very hungry."
      ],
      "answer": 1,
      "why": "双方都命令对方退后，自己却不愿让路，由行为可推断stubborn是固执的。",
      "context": "",
      "evidence": "r4"
    },
    {
      "id": "rq5",
      "prompt": "Which lesson fits the story best?",
      "options": [
        "Always push harder.",
        "The older one is always right.",
        "Try to cooperate and give way."
      ],
      "answer": 2,
      "why": "继续争抢导致双方掉河，合作和让步才可能解决问题。这是对故事的合理归纳。",
      "context": "",
      "evidence": "r6"
    },
    {
      "id": "rq6",
      "prompt": "Why do the chicks’ parents get food for them?",
      "options": [
        "The chicks cannot fly yet.",
        "The chicks are too strong.",
        "The parents cannot fly."
      ],
      "answer": 0,
      "why": "第39页用so连接原因和结果：雏鸟太小时不能飞，所以父母给它们找食物。",
      "context": "",
      "evidence": "r7"
    }
  ],
  "readingEdits": [
    {
      "id": "re1",
      "original": "They pushed until they both fell into the river below the bridge.\n理解：它们一直推，直到一只山羊掉进河里。",
      "model": "它们一直推，直到两只都掉进桥下的河里。",
      "why": "both表示两只都，below the bridge说明河在桥下。原理解还漏了位置信息。",
      "hints": [
        "先找表示数量范围的词，再找最后的地点补充。",
        "both＝两者都；below the bridge＝在桥下。"
      ],
      "kind": "改理解",
      "correct": false,
      "diffs": [
        [
          "一只山羊",
          "两只都"
        ],
        [
          "河里",
          "桥下的河里"
        ]
      ],
      "context": ""
    },
    {
      "id": "re2",
      "original": "Black Goat crossed the bridge to eat the greenest grass on East Mountain.\n理解：棕山羊过桥去吃西山最绿的草。",
      "model": "黑山羊过桥去吃东山上最绿的草。",
      "why": "主语Black Goat是黑山羊；East Mountain是东山。先按主语、动作、目的、地点核对，不能把人物和地点换掉。",
      "hints": [
        "先核对谁过桥，再核对最后的山名。",
        "Black不是Brown，East不是West。"
      ],
      "kind": "改理解",
      "correct": false,
      "diffs": [
        [
          "棕山羊",
          "黑山羊"
        ],
        [
          "西山",
          "东山"
        ]
      ],
      "context": ""
    },
    {
      "id": "re3",
      "original": "The goats got out of the river and walked home.\n理解：山羊从河里出来，走回了家。",
      "model": "山羊从河里出来，走回了家。",
      "why": "理解正确。got out of和walked home两个动作都译出来了。",
      "hints": [
        "这句话有哪两个动作？",
        "检查是否漏掉and后面的内容。"
      ],
      "kind": "改理解",
      "correct": true,
      "diffs": [],
      "context": ""
    },
    {
      "id": "re4",
      "original": "Chicks cannot fly when they are very small, so their parents get food for them.\n理解：小鸟为父母找食物，因为父母不会飞。",
      "model": "雏鸟很小时不会飞，所以它们的父母为它们找食物。",
      "why": "原理解颠倒了谁不会飞、谁找食物、食物给谁。分别找Chicks、their parents、them。",
      "hints": [
        "谁cannot fly？谁get food？for them指给谁？",
        "their parents是找食物的人，them指雏鸟。"
      ],
      "kind": "改理解",
      "correct": false,
      "diffs": [
        [
          "小鸟为父母找食物",
          "父母为雏鸟找食物"
        ]
      ],
      "context": ""
    }
  ],
  "causes": [
    [
      "Brown Goat wanted to drink the coldest water.",
      "It crossed the bridge to West Mountain every day."
    ],
    [
      "Black Goat wanted to eat the greenest grass.",
      "It crossed the bridge to East Mountain every day."
    ],
    [
      "Both goats wanted to cross first and neither gave way.",
      "They could not pass each other on the small bridge."
    ],
    [
      "They pushed each other on the small bridge.",
      "They both fell into the river below the bridge."
    ]
  ],
  "scenes": [
    {
      "id": "s1",
      "name": "拉开抽屉",
      "kind": "drawer",
      "actor": "I",
      "action": "pull the drawer",
      "force": "a small force",
      "result": "It moves towards me.",
      "direction": "left",
      "context": "你站在抽屉前，用小力把抽屉拉开。",
      "model": "I use a small force to pull the drawer. It moves towards me.",
      "words": "pull / drawer / a small force / towards",
      "frame": "I use ___ to ___. It moves ___.",
      "hint": "先说谁拉什么，再说力的大小，最后说抽屉相对你往哪儿动。"
    },
    {
      "id": "s2",
      "name": "推动玩具车",
      "kind": "car",
      "actor": "I",
      "action": "push the toy car",
      "force": "a bigger force",
      "result": "It moves faster.",
      "direction": "right",
      "context": "同一辆玩具车、相同地面和起始状态。第二次向前推的力更大，观察到车移动得更快。",
      "model": "I use a bigger force to push the toy car. It moves faster.",
      "words": "push / toy car / a bigger force / faster",
      "frame": "I use ___ to push ___. It moves ___.",
      "hint": "这里比较两次推动同一辆车的情况，bigger和faster要相互对应。"
    },
    {
      "id": "s3",
      "name": "推秋千",
      "kind": "swing",
      "actor": "I",
      "action": "push the swing",
      "force": "a small force",
      "result": "It moves away from me.",
      "direction": "right",
      "context": "你站在秋千后面，轻轻向前推。描述推开的这一刻，不描述回摆时。",
      "model": "I use a small force to push the swing. It moves away from me.",
      "words": "push / swing / a small force / away from",
      "frame": "I use ___ to ___. It moves ___ me.",
      "hint": "推开的这一刻，秋千离你更近还是更远？"
    },
    {
      "id": "s4",
      "name": "把球投得更远",
      "kind": "ball",
      "actor": "I",
      "action": "throw the ball",
      "force": "a bigger force",
      "result": "It goes farther.",
      "direction": "right",
      "context": "同一个球、相同投掷方向，第二次用更大的力，观察到球落得更远。",
      "model": "I use a bigger force to throw the ball. It goes farther.",
      "words": "throw / ball / a bigger force / farther",
      "frame": "I use ___ to throw ___. It goes ___.",
      "hint": "farther在这里说距离更远，不是速度更快。"
    },
    {
      "id": "s5",
      "name": "拉行李箱",
      "kind": "suitcase",
      "actor": "I",
      "action": "pull the suitcase",
      "force": "a small force",
      "result": "It moves towards me.",
      "direction": "left",
      "context": "你站在行李箱旁，向自己这边拉行李箱。",
      "model": "I use a small force to pull the suitcase. It moves towards me.",
      "words": "pull / suitcase / towards",
      "frame": "I use ___ to pull ___. It moves ___.",
      "hint": "towards后面补出相对于谁。"
    },
    {
      "id": "s6",
      "name": "弹钢琴",
      "kind": "piano",
      "actor": "I",
      "action": "push the piano keys",
      "force": "a small force",
      "result": "The sound is soft.",
      "direction": "down",
      "context": "你轻轻按下琴键，声音轻柔。",
      "model": "I use a small force to push the piano keys. The sound is soft.",
      "words": "fingers / push / piano keys / soft",
      "frame": "I use ___ to push ___. The sound is ___.",
      "hint": "结果可以描述声音，不一定写moves。"
    },
    {
      "id": "s7",
      "name": "拉小提琴",
      "kind": "violin",
      "actor": "I",
      "action": "move the bow",
      "force": "pushes and pulls",
      "result": "The violin makes a sound.",
      "direction": "both",
      "context": "你用琴弓来回拉小提琴。说清推拉与发出声音的关系。",
      "model": "When I play the violin, I push and pull the bow. The violin makes a sound.",
      "words": "play the violin / push / pull / bow",
      "frame": "When I ___, I ___. The violin ___.",
      "hint": "琴弓来回运动会用到推与拉；不必套用a small force。"
    },
    {
      "id": "s8",
      "name": "拉出椅子",
      "kind": "chair",
      "actor": "I",
      "action": "pull the chair",
      "force": "a small force",
      "result": "It moves towards me.",
      "direction": "left",
      "context": "你面对椅背，把椅子从桌边拉向自己。",
      "model": "I use a small force to pull the chair. It moves towards me.",
      "words": "pull / chair / towards",
      "frame": "I use ___ to pull ___. It moves ___.",
      "hint": "先明确你的位置，再说towards me。"
    }
  ],
  "listening": [
    {
      "id": "l1",
      "spoken": "I pull the drawer. It moves towards me.",
      "question": "抽屉朝哪里移动？",
      "options": [
        "远离说话的人",
        "朝说话的人靠近",
        "向上移动"
      ],
      "answer": 1,
      "why": "听清pull和towards me，两者都指向朝说话的人靠近。"
    },
    {
      "id": "l2",
      "spoken": "It is difficult to move the heavy desk.",
      "question": "哪句话符合刚才的意思？",
      "options": [
        "桌子很轻，容易移动。",
        "桌子很重，难以移动。",
        "桌子自己移动得很快。"
      ],
      "answer": 1,
      "why": "heavy是重的，difficult to move是难以移动。"
    },
    {
      "id": "l3",
      "spoken": "I use my fingers to push the piano keys.",
      "question": "说话的人用手指做什么？",
      "options": [
        "拉窗户",
        "推小车",
        "按钢琴键"
      ],
      "answer": 2,
      "why": "use my fingers to push the piano keys：用手指按琴键。"
    },
    {
      "id": "l4",
      "spoken": "The car is slower than the plane.",
      "question": "哪一个更快？",
      "options": [
        "飞机",
        "汽车",
        "一样快"
      ],
      "answer": 0,
      "why": "汽车比飞机慢，所以飞机更快。需要转换比较方向。"
    }
  ],
  "lifeEdits": [
    {
      "id": "le1",
      "original": "I pull the drawer open. It moves away from me.",
      "model": "I pull the drawer open. It moves towards me.",
      "why": "拉开抽屉时，抽屉朝拉它的人靠近。第一句动作正确，第二句方向错了。",
      "hints": [
        "把你自己放在抽屉前面，想象拉开的动作。",
        "pull open对应towards me。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "away from",
          "towards"
        ]
      ],
      "context": "你站在抽屉前拉开它。"
    },
    {
      "id": "le2",
      "original": "A bigger push makes the same toy car move more slowly.",
      "model": "A bigger push makes the same toy car move faster.",
      "why": "本题已经给出观察结果是更快，所以应改成faster。不要脱离题目给出的同车、同条件和观察结果。",
      "hints": [
        "先读清题目给出的实验观察。",
        "更快是faster；more slowly是更慢。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "more slowly",
          "faster"
        ]
      ],
      "context": "同一玩具车、相同起始状态和地面。实验观察：较大的向前推力使车移动得更快。"
    },
    {
      "id": "le3",
      "original": "I push the swing away from me.",
      "model": "I push the swing away from me.",
      "why": "只描述推开的这一刻，这个动作和方向相符，不需要修改。",
      "hints": [
        "这里描述的是推开，还是回摆？",
        "推开这一刻，秋千离你更远。"
      ],
      "kind": "英文改错",
      "correct": true,
      "diffs": [],
      "context": "你站在秋千后面，描述推开的这一刻。"
    },
    {
      "id": "le4",
      "original": "I use a small force to push the keys. The sound are soft.",
      "model": "I use a small force to push the keys. The sound is soft.",
      "why": "sound在这里是单数形式，be动词用is。动作与轻柔声音的关系没有错。",
      "hints": [
        "先检查每句话的主语和谓语是否配合。",
        "The sound是单数。"
      ],
      "kind": "英文改错",
      "correct": false,
      "diffs": [
        [
          "are",
          "is"
        ]
      ],
      "context": "你轻轻按钢琴键。"
    }
  ],
  "paragraphEdits": [
    {
      "id": "pe1",
      "original": "I use forces every day.\nAt home, I pulls a drawer to open it.\nThe drawer move towards me.\nI use a small force close it.",
      "model": "I use forces every day.\nAt home, I pull a drawer to open it.\nThe drawer moves towards me.\nI use a small force to close it.",
      "why": "一共有3处：I后用pull；单数The drawer后用moves；use…to do…不能漏to。第一句正确。",
      "hints": [
        "逐句检查主语与动作是否配合，再看use句型。",
        "第2句主语I，第3句主语The drawer，第4句缺to。"
      ],
      "kind": "短文改错",
      "correct": false,
      "diffs": [
        [
          "pulls",
          "pull"
        ],
        [
          "move",
          "moves"
        ],
        [
          "force close",
          "force to close"
        ]
      ],
      "context": ""
    },
    {
      "id": "pe2",
      "original": "At school, I pull my chair.\nIt moves away from me.\nIt is easy move the chair.\nA small force makes it moves.",
      "model": "At school, I pull my chair.\nIt moves towards me.\nIt is easy to move the chair.\nA small force makes it move.",
      "why": "一共有3处：拉向自己的椅子应说towards me；It is easy后用to move；makes it后用动词原形move。第一句正确。",
      "hints": [
        "先检查方向，再检查两个固定句型。",
        "towards me；easy to move；makes it move。"
      ],
      "kind": "短文改错",
      "correct": false,
      "diffs": [
        [
          "away from",
          "towards"
        ],
        [
          "easy move",
          "easy to move"
        ],
        [
          "it moves",
          "it move"
        ]
      ],
      "context": "你面对椅背，把椅子向自己拉。"
    }
  ],
  "writingChoices": [
    {
      "name": "家里：抽屉",
      "hint": "At home / a small force / pull the drawer / towards me",
      "frame": "At home, I use ___ to ___. It ___.",
      "model": "At home, I use a small force to pull a drawer. It moves towards me."
    },
    {
      "name": "学校：椅子",
      "hint": "At school / pull my chair / towards me",
      "frame": "At school, I ___. It ___.",
      "model": "At school, I pull my chair. It moves towards me."
    },
    {
      "name": "公园：秋千",
      "hint": "In the park / push a swing / away from me",
      "frame": "In the park, I use ___ to ___. It ___.",
      "model": "In the park, I use a small force to push a swing. It moves away from me."
    },
    {
      "name": "运动：投球",
      "hint": "When I play basketball / throw the ball / moves through the air",
      "frame": "When I ___, I ___. The ball ___.",
      "model": "When I play basketball, I use a force to throw the ball. The ball moves through the air."
    },
    {
      "name": "音乐：钢琴",
      "hint": "When I play the piano / fingers / push the keys / sound",
      "frame": "When I ___, I use ___ to ___. The piano ___.",
      "model": "When I play the piano, I use my fingers to push the keys. The piano makes a sound."
    },
    {
      "name": "自选场景",
      "hint": "先说一个实际会发生的动作，再说它的结果。",
      "frame": "When / At / In ___, I ___. It ___.",
      "model": "When I ride my bicycle, I push the pedals. The bicycle moves forward."
    }
  ],
  "exit": [
    {
      "id": "e1",
      "prompt": "This box is more heavy than that one.",
      "task": "先判断，再写完整正确句；说明理由。",
      "model": "This box is heavier than that one.",
      "why": "heavy的比较级是heavier，不用more heavy。than表示这里在比较。"
    },
    {
      "id": "e2",
      "prompt": "It is difficult to move the box.\n理解：这个箱子很容易搬动。",
      "task": "下面的中文翻译对吗？找出译错的地方，写出正确的中文。",
      "model": "移动这个箱子很困难。",
      "why": "difficult表示“困难的”，不是“容易的”。这句话应理解为“移动这个箱子很困难”或“这个箱子很难搬动”。"
    },
    {
      "id": "e3",
      "prompt": "你拉开一个窗户，窗户朝你靠近。",
      "task": "先造两个英文句子，再判断这句要不要改：I use a small force to pull the window.",
      "model": "I pull the window to open it. It moves towards me.\n给出的I use a small force to pull the window.本身正确，不需要修改。",
      "why": "允许其他符合题意的表达。检查完整主谓、towards me及use…to…。"
    }
  ],
  "cards": [
    {
      "id": "start",
      "module": 0,
      "title": "今天，把“认识”变成“读懂”",
      "type": "intro",
      "coach": [
        "只走主线也可以，加练题按需要打开。",
        "先让学生说，卡住再逐层提示。"
      ]
    },
    {
      "id": "vocab",
      "module": 0,
      "title": "单词放回句子里",
      "type": "quiz",
      "key": "vocab",
      "source": "本单元词汇 · 自编情境",
      "coach": [
        "先读主语和动作，别只盯目标词。",
        "选完再用中文说整句。"
      ]
    },
    {
      "id": "phonics",
      "module": 0,
      "title": "看见i，读音都一样吗？",
      "type": "quiz",
      "key": "phonics",
      "source": "语音复习 · 自编练习",
      "coach": [
        "让他先分别读单词，再比较。",
        "igh和i_e常见/aɪ/；短元音i常见/ɪ/。"
      ]
    },
    {
      "id": "warm-edit",
      "module": 0,
      "title": "小老师：解释对了吗？",
      "type": "edit",
      "key": "warmEdits",
      "main": 2,
      "source": "词义与语音 · 自编改错",
      "coach": [
        "先判断解释是否准确，再修改。",
        "改完用原句核对一次。"
      ]
    },
    {
      "id": "grammar",
      "module": 1,
      "title": "混在一起，你会判断吗？",
      "type": "quiz",
      "key": "grammar",
      "extra": "grammarExtra",
      "source": "12题主练＋12题加练 · 自编",
      "coach": [
        "选之前先说依据：对象、范围，还是动作？",
        "不要只用看到某个词就套答案的办法。"
      ]
    },
    {
      "id": "grammar-edit",
      "module": 1,
      "title": "自己找到错，再改完整",
      "type": "edit",
      "key": "grammarEdits",
      "main": 4,
      "source": "4题主练＋8题加练 · 自编",
      "coach": [
        "先听他读完整句子，再问检查依据。",
        "有正确句，不是每一句都需要改。"
      ]
    },
    {
      "id": "r1",
      "module": 2,
      "title": "两只山羊住在哪里？",
      "type": "read",
      "key": "r1",
      "source": "课本第46页 · 原文逐句",
      "coach": [
        "先找到谁住在那里。",
        "lived后面补充了地点和“一起”。"
      ]
    },
    {
      "id": "r2",
      "module": 2,
      "title": "第一次争执：谁吃青草？",
      "type": "read",
      "key": "r2",
      "source": "课本第46页 · 原文逐句",
      "coach": [
        "谁说自己年纪更大？谁说自己更聪明？",
        "it指什么？哪只山羊搬走了？"
      ]
    },
    {
      "id": "r3",
      "module": 2,
      "title": "每天过桥：目的是什么？",
      "type": "read",
      "key": "r3",
      "source": "课本第47页 · 原文逐句",
      "coach": [
        "先说谁过桥，再说去做什么。",
        "别把Brown和Black的目的、方向互换。"
      ]
    },
    {
      "id": "r4",
      "module": 2,
      "title": "在桥上相遇：谁肯后退？",
      "type": "read",
      "key": "r4",
      "source": "课本第47页 · 原文逐句",
      "coach": [
        "both和at the same time分别告诉我们什么？",
        "从哪句话看出双方都不肯让路？"
      ]
    },
    {
      "id": "r5",
      "module": 2,
      "title": "推到最后：发生了什么？",
      "type": "read",
      "key": "r5",
      "source": "课本第47页 · 原文逐句",
      "coach": [
        "先说主句They pushed，再读until后面的结果。",
        "both、into、below分别是什么信息？"
      ]
    },
    {
      "id": "r6",
      "module": 2,
      "title": "故事结尾：只顾自己会怎样？",
      "type": "read",
      "key": "r6",
      "source": "课本第47页 · 原文逐句",
      "coach": [
        "结尾到底是死了，还是走回家？回原文核对。",
        "哪种行为让你觉得它们stubborn？"
      ]
    },
    {
      "id": "r7",
      "module": 2,
      "title": "因果补充：小鸟怎样学会飞？",
      "type": "read",
      "key": "r7",
      "source": "课本第39页 · 原文逐句",
      "coach": [
        "哪部分是原因，哪部分是结果？",
        "逐个找清they、their、them指谁。"
      ]
    },
    {
      "id": "causes",
      "module": 2,
      "title": "把起因和结果接起来",
      "type": "causes",
      "source": "课本第48页 · 因果梳理，答案为参考表述",
      "coach": [
        "先遮住结果，只给原因，让他回忆。",
        "第3组原因可有多种符合故事的表述。"
      ]
    },
    {
      "id": "reading-quiz",
      "module": 2,
      "title": "答案在哪里？回原文找",
      "type": "quiz",
      "key": "readingQuiz",
      "source": "基于课文 · 自编阅读检查",
      "coach": [
        "先说答案，再指出原文依据。",
        "寓意题区分故事事实和归纳结论。"
      ]
    },
    {
      "id": "reading-edit",
      "module": 2,
      "title": "不是认识词，就算读懂了",
      "type": "edit",
      "key": "readingEdits",
      "main": 2,
      "source": "课本原句＋自编理解判断",
      "coach": [
        "让他先点出或读出对应英文证据。",
        "人物、动作、数量、地点逐项核对。"
      ]
    },
    {
      "id": "scenes",
      "module": 3,
      "title": "一步一步，说清生活中的力",
      "type": "scene",
      "source": "结合课本第44—45页 · 自编情境",
      "coach": [
        "一次只问一个问题：谁？做什么？多大力？什么结果？",
        "先口头说完整，再看句架。接受其他合理表达。"
      ]
    },
    {
      "id": "listen",
      "module": 3,
      "title": "先听，再说你听懂了什么",
      "type": "listen",
      "key": "listening",
      "source": "自编听说练习 · 配套合成音频",
      "coach": [
        "点击播放按钮或音频条，可以暂停和重复播放。",
        "这里不是课本听力原录音。先不展示文字。"
      ]
    },
    {
      "id": "life-edit",
      "module": 3,
      "title": "句子通顺，情境就对吗？",
      "type": "edit",
      "key": "lifeEdits",
      "main": 2,
      "source": "动作、方向与结果 · 自编改错",
      "coach": [
        "先把自己放进图中，再判断方向。",
        "比较速度题先读清实验条件和观察结果。"
      ]
    },
    {
      "id": "paragraph-edit",
      "module": 4,
      "title": "先帮别人改一小段",
      "type": "edit",
      "key": "paragraphEdits",
      "main": 1,
      "source": "每段3处错误 · 自编短文",
      "coach": [
        "每次只改一处，再通读整句。",
        "正确的句子也要保留。"
      ]
    },
    {
      "id": "writing",
      "module": 4,
      "title": "现在，写你自己的生活",
      "type": "writing",
      "source": "作文迁移 · 至少6句话",
      "coach": [
        "先口头回答四个问题，再连成句子。",
        "参考句只在卡住后展开，允许不同的正确表达。"
      ]
    },
    {
      "id": "exit",
      "module": 5,
      "title": "关掉提示，自己来一次",
      "type": "exit",
      "source": "3项独立检查 · 自编",
      "coach": [
        "提交前不提示，观察他是否主动检查。",
        "提交后再核对，按实际表现记录。"
      ]
    },
    {
      "id": "finish",
      "module": 5,
      "title": "留下今天真正需要复习的地方",
      "type": "summary",
      "source": "课堂记录只保存在当前浏览器",
      "coach": [
        "记录实际表现，不把看过答案当作独立完成。",
        "周末A卷保留独立完成，课堂练的是同类方法。"
      ]
    }
  ]
};

