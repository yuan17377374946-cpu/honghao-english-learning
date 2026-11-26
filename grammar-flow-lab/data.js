window.GRAMMAR_DATA={
  "version": "2026-11-26-v2",
  "sources": {
    "sz22": {
      "title": "2022年深圳市中考英语",
      "kind": "中考真题",
      "locator": "语法填空",
      "file": "2022年广东省深圳市中考英语真题（解析卷）.docx",
      "url": "https://zy.21cnjy.com/15211703",
      "download": "https://hskb.com/zhongkao/resources/files/m-2759af7e20a0d92047.zip"
    },
    "sz24": {
      "title": "2024年深圳市中考英语",
      "kind": "中考真题",
      "locator": "语法填空（整理卷以第1—10空编号）",
      "file": "2024年广东省深圳市中考英语真题（解析卷）.docx",
      "url": "https://zy.21cnjy.com/20739846",
      "download": "https://hskb.com/zhongkao/resources/files/m-bafbd2c1d9cf4762e1.zip"
    },
    "ns25": {
      "title": "2025年深圳市南山区九年级中考一模英语",
      "kind": "区级模拟题",
      "locator": "语法填空",
      "file": "2025年广东省深圳南山区九年级中考一模-英语试题（解析版）.docx",
      "url": "https://hskb.com/zhongkao/resources/?subject=英语&year=2025",
      "download": "https://hskb.com/zhongkao/resources/files/m-48b745d3611cd1e5ad.zip"
    },
    "ns2w25": {
      "title": "南山区第二外国语集团2024—2025学年九下英语一模",
      "kind": "集团模拟题",
      "locator": "语法填空",
      "file": "广东省深圳市南山区第二外国语集团2024-2025学年九年级下学期一模英语试卷（解析版）.docx",
      "url": "https://hskb.com/zhongkao/resources/?subject=英语&year=2025",
      "download": "https://hskb.com/zhongkao/resources/files/m-f94d9b3e137c717faa.zip"
    },
    "joint25": {
      "title": "2025年南山外国语集团、南二外集团英语一模",
      "kind": "集团模拟题",
      "locator": "语法填空",
      "file": "2025年广东省深圳市南山外国语集团&南二外集团中考一模英语试卷（解析版）.docx",
      "url": "https://hskb.com/zhongkao/resources/?subject=英语&year=2025",
      "download": "https://hskb.com/zhongkao/resources/files/m-fe9def981672a7660f.zip"
    }
  },
  "questions": [
    {
      "id": "musicians",
      "source": "sz22",
      "number": "第38题",
      "tag": "名词复数",
      "stem": "Lang Lang is one of the leading {{blank}} in the classical music world.",
      "prompt": "musician",
      "answers": [
        "musicians"
      ],
      "steps": [
        {
          "id": "musicians-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            },
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "musician"
          ]
        },
        {
          "id": "musicians-pos",
          "title": "认词性",
          "prompt": "提示词 musician 在这里的基本词性是什么？",
          "options": [
            {
              "text": "动词",
              "correct": false,
              "feedback": "先按词义认身份：musician 表示“音乐家”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "数词",
              "correct": false,
              "feedback": "先按词义认身份：musician 表示“音乐家”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "代词",
              "correct": false,
              "feedback": "先按词义认身份：musician 表示“音乐家”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "形容词",
              "correct": false,
              "feedback": "先按词义认身份：musician 表示“音乐家”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "名词",
              "correct": true,
              "feedback": "musician：音乐家，基本词性是名词。空位最后需要的词性还要继续判断。"
            }
          ],
          "explain": "musician：音乐家，基本词性是名词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：musician 表示“音乐家”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "musician"
          ]
        },
        {
          "id": "musicians-slot",
          "title": "G1 判断空位",
          "prompt": "one of the leading 后面，仍然需要表示“音乐家”的名词吗？",
          "options": [
            {
              "text": "否",
              "correct": false,
              "feedback": "leading 是“杰出的”，在修饰后面的名词，不需要再放一个形容词。"
            },
            {
              "text": "是",
              "correct": true,
              "feedback": "one of 后面要说一群人中的一个，核心名词仍是“音乐家”。"
            }
          ],
          "explain": "one of 后面要说一群人中的一个，核心名词仍是“音乐家”。",
          "hint": "leading 是“杰出的”，在修饰后面的名词，不需要再放一个形容词。",
          "clues": [
            "one of",
            "leading"
          ],
          "conclusion": "one of 后面要说一群人中的一个，核心名词仍是“音乐家”。"
        },
        {
          "id": "musicians-plural",
          "title": "判断数量",
          "prompt": "one of … 表示“……中的一个”，of 后面的这群音乐家用什么数？",
          "options": [
            {
              "text": "不变：表示职业的名词不用复数",
              "correct": false,
              "feedback": "不要只盯着 one；请把 one of 整体看。"
            },
            {
              "text": "复数：先有一群，再选其中一个",
              "correct": true,
              "feedback": "one of + 限定词 + 可数名词复数。one 指被选出的一个；of 后面是所属群体。"
            },
            {
              "text": "单数：因为前面有 one",
              "correct": false,
              "feedback": "不要只盯着 one；请把 one of 整体看。"
            }
          ],
          "explain": "one of + 限定词 + 可数名词复数。one 指被选出的一个；of 后面是所属群体。",
          "hint": "不要只盯着 one；请把 one of 整体看。",
          "clues": [
            "one of"
          ]
        }
      ],
      "translation": "朗朗是古典音乐界杰出的音乐家之一。",
      "reason": "空位仍需名词；one of 的群体名词用复数，所以 musician 加 -s。",
      "formHint": "musician 是可数名词；本题复数规则直接加 -s。",
      "context": "",
      "vocab": [
        [
          "leading",
          "杰出的；领先的"
        ],
        [
          "classical",
          "古典的"
        ]
      ],
      "challenge": false,
      "clues": [
        "one of"
      ],
      "answerHints": {
        "musician": "最后一步已经选了复数；你写的还是单数。看看词尾是否加上了复数标记。",
        "musicianss": "复数词尾只加一次，不要重复加 s。"
      },
      "caseSensitive": false,
      "scene": "朗朗与音乐",
      "checkHint": "你已经选了复数。再看音乐家这个可数名词的词尾，不能仍保留单数。",
      "contextRequired": false
    },
    {
      "id": "warmly",
      "source": "sz22",
      "number": "第36题",
      "tag": "形容词变副词",
      "stem": "The show was {{blank}} welcomed by the audience.",
      "prompt": "warm",
      "answers": [
        "warmly"
      ],
      "steps": [
        {
          "id": "warmly-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            },
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "warm"
          ]
        },
        {
          "id": "warmly-pos",
          "title": "认词性",
          "prompt": "提示词 warm 在这里的基本词性是什么？",
          "options": [
            {
              "text": "形容词",
              "correct": true,
              "feedback": "warm：温暖的；热情的，基本词性是形容词。空位最后需要的词性还要继续判断。"
            },
            {
              "text": "名词",
              "correct": false,
              "feedback": "先按词义认身份：warm 表示“温暖的；热情的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "动词",
              "correct": false,
              "feedback": "先按词义认身份：warm 表示“温暖的；热情的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "代词",
              "correct": false,
              "feedback": "先按词义认身份：warm 表示“温暖的；热情的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "数词",
              "correct": false,
              "feedback": "先按词义认身份：warm 表示“温暖的；热情的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            }
          ],
          "explain": "warm：温暖的；热情的，基本词性是形容词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：warm 表示“温暖的；热情的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "warm"
          ]
        },
        {
          "id": "warmly-slot",
          "title": "G2 看修饰对象",
          "prompt": "空格在 welcomed 前，是在说明什么？",
          "options": [
            {
              "text": "有多少位观众",
              "correct": false,
              "feedback": "把 was … welcomed 合起来看：演出受到欢迎。空格说明“欢迎得怎么样”。"
            },
            {
              "text": "演出是一场什么样的演出",
              "correct": false,
              "feedback": "把 was … welcomed 合起来看：演出受到欢迎。空格说明“欢迎得怎么样”。"
            },
            {
              "text": "观众欢迎得怎么样",
              "correct": true,
              "feedback": "这里是“热烈地欢迎”。was welcomed 已组成被动结构，空格修饰 welcomed 这个动作。"
            }
          ],
          "explain": "这里是“热烈地欢迎”。was welcomed 已组成被动结构，空格修饰 welcomed 这个动作。",
          "hint": "把 was … welcomed 合起来看：演出受到欢迎。空格说明“欢迎得怎么样”。",
          "clues": [
            "was",
            "welcomed"
          ]
        },
        {
          "id": "warmly-form",
          "title": "决定词形",
          "prompt": "修饰 welcomed 这个动作，优先用哪种形式？",
          "options": [
            {
              "text": "形容词比较级",
              "correct": false,
              "feedback": "不要因为前面有 was，就直接填形容词；空后还有 welcomed。"
            },
            {
              "text": "名词复数",
              "correct": false,
              "feedback": "不要因为前面有 was，就直接填形容词；空后还有 welcomed。"
            },
            {
              "text": "副词",
              "correct": true,
              "feedback": "修饰这个动作，用副词。原句没有比较的意思。"
            }
          ],
          "explain": "修饰这个动作，用副词。原句没有比较的意思。",
          "hint": "不要因为前面有 was，就直接填形容词；空后还有 welcomed。",
          "clues": [
            "welcomed"
          ]
        }
      ],
      "translation": "这场演出受到观众的热烈欢迎。",
      "reason": "warm 修饰 welcomed，需变副词 warmly；was welcomed 是完整的被动结构。",
      "formHint": "warm 变副词：在词尾加 -ly。",
      "context": "",
      "vocab": [
        [
          "audience",
          "观众"
        ],
        [
          "welcome",
          "欢迎"
        ]
      ],
      "challenge": false,
      "clues": [
        "was",
        "welcomed"
      ],
      "answerHints": {
        "warm": "你已经判断在说明“欢迎得怎么样”，这里要把形容词变成修饰动作的副词。",
        "warmily": "warm 不以 y 结尾，不需要改字母再加副词词尾。"
      },
      "caseSensitive": false,
      "scene": "雪山音乐会",
      "checkHint": "最后一步选的是修饰动作的副词。核对 warm 的副词词尾。",
      "contextRequired": false
    },
    {
      "id": "Her",
      "source": "ns2w25",
      "number": "第43题",
      "tag": "代词与大小写",
      "stem": "{{blank}} role is to inspire young people and promote the importance of sports and cultural exchange.",
      "prompt": "she",
      "answers": [
        "Her"
      ],
      "steps": [
        {
          "id": "Her-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            },
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "she"
          ]
        },
        {
          "id": "Her-pos",
          "title": "认词性",
          "prompt": "提示词 she 在这里的基本词性是什么？",
          "options": [
            {
              "text": "动词",
              "correct": false,
              "feedback": "先按词义认身份：she 表示“她”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "名词",
              "correct": false,
              "feedback": "先按词义认身份：she 表示“她”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "形容词",
              "correct": false,
              "feedback": "先按词义认身份：she 表示“她”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "数词",
              "correct": false,
              "feedback": "先按词义认身份：she 表示“她”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "代词",
              "correct": true,
              "feedback": "she：她，基本词性是代词。空位最后需要的词性还要继续判断。"
            }
          ],
          "explain": "she：她，基本词性是代词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：she 表示“她”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "she"
          ]
        },
        {
          "id": "Her-meaning",
          "title": "G3 判断代词作用",
          "prompt": "空后有名词 role，这里要表达什么？",
          "options": [
            {
              "text": "她的（后面不再接名词）",
              "correct": false,
              "feedback": "she 代替人，不是名词。role 是“角色”，这里表达所属关系。"
            },
            {
              "text": "她（作主语）",
              "correct": false,
              "feedback": "she 代替人，不是名词。role 是“角色”，这里表达所属关系。"
            },
            {
              "text": "她自己",
              "correct": false,
              "feedback": "she 代替人，不是名词。role 是“角色”，这里表达所属关系。"
            },
            {
              "text": "她的角色",
              "correct": true,
              "feedback": "这里表示“她的角色”。空格后还跟名词，要用形容词性物主代词。"
            }
          ],
          "explain": "这里表示“她的角色”。空格后还跟名词，要用形容词性物主代词。",
          "hint": "she 代替人，不是名词。role 是“角色”，这里表达所属关系。",
          "clues": [
            "role"
          ]
        },
        {
          "id": "Her-possessive",
          "title": "选择代词形式",
          "prompt": "“她的＋名词”需要哪一类代词？",
          "options": [
            {
              "text": "反身代词",
              "correct": false,
              "feedback": "对照：she＝她；her + 名词＝她的……；hers＝她的（不带名词）；herself＝她自己。"
            },
            {
              "text": "形容词性物主代词",
              "correct": true,
              "feedback": "空格表示所属，后面还接 role，要选能放在名词前面的物主代词。"
            },
            {
              "text": "人称代词主格",
              "correct": false,
              "feedback": "对照：she＝她；her + 名词＝她的……；hers＝她的（不带名词）；herself＝她自己。"
            }
          ],
          "explain": "空格表示所属，后面还接 role，要选能放在名词前面的物主代词。",
          "hint": "对照：she＝她；her + 名词＝她的……；hers＝她的（不带名词）；herself＝她自己。",
          "clues": [
            "role"
          ]
        },
        {
          "id": "Her-capital",
          "title": "检查位置",
          "prompt": "这个空是整句话的第一个词吗？",
          "options": [
            {
              "text": "否",
              "correct": false,
              "feedback": "前一句已经结束；本空是新句的开头。"
            },
            {
              "text": "是",
              "correct": true,
              "feedback": "本空位于句首。先确定代词形式，写答案时再把首字母大写。"
            }
          ],
          "explain": "本空位于句首。先确定代词形式，写答案时再把首字母大写。",
          "hint": "前一句已经结束；本空是新句的开头。",
          "clues": [],
          "conclusion": "本空位于句首。"
        }
      ],
      "translation": "她的角色是激励年轻人，并推动体育和文化交流。",
      "reason": "she → her，表示“她的”；后面有 role。这个空在句首，最终写 Her。",
      "formHint": "先写形容词性物主代词，再检查句首大写。",
      "context": "Feng Yu, the captain of China’s artistic swimming team and a gold medalist at the 2024 Paris Olympics, was chosen as the ambassador (大使) for these events.",
      "vocab": [
        [
          "role",
          "角色；职责"
        ],
        [
          "inspire",
          "激励"
        ]
      ],
      "challenge": false,
      "clues": [
        "role"
      ],
      "answerHints": {
        "she": "后面有 role，要表达“她的角色”，不能用“她”的主格。",
        "hers": "这种“她的”后面不直接带名词；本题后面还有 role。",
        "herself": "反身代词表示“她自己”，本题需要表示所属的“她的”。"
      },
      "caseSensitive": true,
      "scene": "体育与交流",
      "checkHint": "这里是“她的＋名词”；再检查这个空位于句首。",
      "contextRequired": false
    },
    {
      "id": "circle",
      "source": "sz24",
      "number": "第8空（整理卷编号）",
      "tag": "冠词",
      "stem": "Before each race, the team would stand in {{blank}} circle and cheer loudly.",
      "prompt": "",
      "answers": [
        "a"
      ],
      "steps": [
        {
          "id": "circle-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "没有提示词，走无提示词通道",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            },
            {
              "text": "有提示词，先认它的词性",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": []
        },
        {
          "id": "circle-N1",
          "title": "N1 看连接",
          "prompt": "目标空本身是在连接两个句子，或两个并列成分吗？",
          "options": [
            {
              "text": "否",
              "correct": true,
              "feedback": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
            },
            {
              "text": "是",
              "correct": false,
              "feedback": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。"
            }
          ],
          "explain": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。",
          "hint": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。",
          "clues": [],
          "conclusion": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
        },
        {
          "id": "circle-N2",
          "title": "N2 看名词短语",
          "prompt": "circle 是可数名词单数；这里是否缺少限定词？",
          "options": [
            {
              "text": "否",
              "correct": false,
              "feedback": "看空后的 circle：一个圈，是可数名词单数。"
            },
            {
              "text": "是",
              "correct": true,
              "feedback": "circle 表示“圈”。这里需要限定词，不是连接两个句子。"
            }
          ],
          "explain": "circle 表示“圈”。这里需要限定词，不是连接两个句子。",
          "hint": "看空后的 circle：一个圈，是可数名词单数。",
          "clues": [
            "circle"
          ],
          "conclusion": "circle 表示“圈”。"
        },
        {
          "id": "circle-article",
          "title": "判断冠词",
          "prompt": "这里表示“围成一个圈”，选冠词时下一步应看什么？",
          "options": [
            {
              "text": "只看词尾有没有 e",
              "correct": false,
              "feedback": "a / an 按紧随其后的发音选择；不是看首字母名称，也不是所有名词前都用 the。"
            },
            {
              "text": "只要名词前面就一律填 the",
              "correct": false,
              "feedback": "a / an 按紧随其后的发音选择；不是看首字母名称，也不是所有名词前都用 the。"
            },
            {
              "text": "是否泛指，以及 circle 开头的发音",
              "correct": true,
              "feedback": "这里泛指一个圈；circle 以辅音音素 /s/ 开头，按发音选择不定冠词。"
            }
          ],
          "explain": "这里泛指一个圈；circle 以辅音音素 /s/ 开头，按发音选择不定冠词。",
          "hint": "a / an 按紧随其后的发音选择；不是看首字母名称，也不是所有名词前都用 the。",
          "clues": [
            "circle"
          ]
        }
      ],
      "translation": "每次比赛前，队伍会围成一个圈，大声欢呼。",
      "reason": "这里是 in a circle；circle 为辅音音素开头的可数名词单数。",
      "formHint": "泛指一个、辅音音素开头，使用不定冠词 a。",
      "context": "",
      "vocab": [
        [
          "circle",
          "圈"
        ],
        [
          "cheer",
          "欢呼"
        ]
      ],
      "challenge": false,
      "clues": [
        "circle"
      ],
      "answerHints": {
        "an": "circle 开头是辅音 /s/。a / an 由发音决定，再选一次。",
        "the": "这里表示“围成一个圈”，没有指向前文某个特定的圈。"
      },
      "caseSensitive": false,
      "scene": "龙舟赛前",
      "checkHint": "这里泛指一个圈；再按 circle 开头的辅音 /s/ 检查冠词。",
      "contextRequired": false
    },
    {
      "id": "interested",
      "source": "ns25",
      "number": "第41题",
      "tag": "介词搭配",
      "stem": "Because of this, young people are becoming more interested {{blank}} technology.",
      "prompt": "",
      "answers": [
        "in"
      ],
      "steps": [
        {
          "id": "interested-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "没有提示词，走无提示词通道",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            },
            {
              "text": "有提示词，先认它的词性",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": []
        },
        {
          "id": "interested-N1",
          "title": "N1 看连接",
          "prompt": "目标空本身是在连接两个句子，或两个并列成分吗？",
          "options": [
            {
              "text": "否",
              "correct": true,
              "feedback": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
            },
            {
              "text": "是",
              "correct": false,
              "feedback": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。"
            }
          ],
          "explain": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。",
          "hint": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。",
          "clues": [],
          "conclusion": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
        },
        {
          "id": "interested-N2",
          "title": "N2 看名词短语",
          "prompt": "technology 在这里泛指技术；空格是在为它补限定词吗？",
          "options": [
            {
              "text": "否",
              "correct": true,
              "feedback": "这里不是补一个、一项或特指标记，而是检查 interested 后的搭配。"
            },
            {
              "text": "是",
              "correct": false,
              "feedback": "不可数名词也可以有 the；本题是否缺限定词，还要看 interested 与 technology 如何连接。"
            }
          ],
          "explain": "这里不是补一个、一项或特指标记，而是检查 interested 后的搭配。",
          "hint": "不可数名词也可以有 the；本题是否缺限定词，还要看 interested 与 technology 如何连接。",
          "clues": [
            "interested",
            "technology"
          ],
          "conclusion": "这里不是补一个、一项或特指标记，而是检查 interested 后的搭配。"
        },
        {
          "id": "interested-N3",
          "title": "N3 查介词搭配",
          "prompt": "interested 与后面的 technology 是否构成“对……感兴趣”的搭配？",
          "options": [
            {
              "text": "否",
              "correct": false,
              "feedback": "把 interested 与后面的事物一起看，不用先翻译整篇。"
            },
            {
              "text": "是",
              "correct": true,
              "feedback": "这里表达“对……感兴趣”，需要 interested 与事物之间的固定介词。"
            }
          ],
          "explain": "这里表达“对……感兴趣”，需要 interested 与事物之间的固定介词。",
          "hint": "把 interested 与后面的事物一起看，不用先翻译整篇。",
          "clues": [
            "interested"
          ],
          "conclusion": "这里表达“对……感兴趣”，需要 interested 与事物之间的固定介词。"
        }
      ],
      "translation": "因此，年轻人对技术越来越感兴趣。",
      "reason": "固定搭配 be interested in，becoming 说明兴趣正在增加，不改变介词搭配。",
      "formHint": "回想：be interested in…，对……感兴趣。",
      "context": "",
      "vocab": [
        [
          "technology",
          "技术"
        ]
      ],
      "challenge": false,
      "clues": [
        "interested"
      ],
      "answerHints": {
        "on": "这不是“在……上”的关系；回想 be interested 后的固定介词。",
        "at": "这里表达“对技术感兴趣”；检查 interested 的固定搭配。"
      },
      "caseSensitive": false,
      "scene": "年轻人与科技",
      "checkHint": "回到 interested 与后面事物组成的“对……感兴趣”搭配。",
      "contextRequired": false
    },
    {
      "id": "contrast",
      "source": "sz22",
      "number": "第44题",
      "tag": "连接词",
      "stem": "Before Lang Lang played the third piece, his fingers became a little cold, {{blank}} he showed no fear of the heavy snow and the thin air.",
      "prompt": "",
      "answers": [
        "but",
        "yet"
      ],
      "steps": [
        {
          "id": "contrast-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "没有提示词，走无提示词通道",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            },
            {
              "text": "有提示词，先认它的词性",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": []
        },
        {
          "id": "contrast-N1",
          "title": "N1 看连接",
          "prompt": "目标空本身是在连接两个句子，或两个并列成分吗？",
          "options": [
            {
              "text": "否",
              "correct": false,
              "feedback": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。"
            },
            {
              "text": "是",
              "correct": true,
              "feedback": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
            }
          ],
          "explain": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。",
          "hint": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。",
          "clues": [],
          "conclusion": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
        },
        {
          "id": "contrast-relation",
          "title": "读两边关系",
          "prompt": "“手指有点冷”与“他没有畏惧”之间是什么关系？",
          "options": [
            {
              "text": "转折：虽然冷，但仍不害怕",
              "correct": true,
              "feedback": "前面有困难，后面却没有畏惧。选表示转折的并列连词，接下来自己写出。"
            },
            {
              "text": "顺承：只是并列列举两件事",
              "correct": false,
              "feedback": "只读目标空两侧的意思：cold 与 no fear 形成转折，不是“因为冷，所以不害怕”。"
            },
            {
              "text": "因果：因为冷，所以不害怕",
              "correct": false,
              "feedback": "只读目标空两侧的意思：cold 与 no fear 形成转折，不是“因为冷，所以不害怕”。"
            }
          ],
          "explain": "前面有困难，后面却没有畏惧。选表示转折的并列连词，接下来自己写出。",
          "hint": "只读目标空两侧的意思：cold 与 no fear 形成转折，不是“因为冷，所以不害怕”。",
          "clues": [
            "cold",
            "no fear"
          ]
        }
      ],
      "translation": "演奏第三首曲子前，他的手指有点冷，但他并不畏惧大雪和稀薄的空气。",
      "reason": "空格连接两个完整分句，两边形成转折关系，but / yet 均可。",
      "formHint": "这里可用表示“但是”的并列连词；不是填 although。",
      "context": "",
      "vocab": [
        [
          "fear",
          "畏惧"
        ],
        [
          "thin air",
          "稀薄的空气"
        ]
      ],
      "challenge": false,
      "clues": [
        "cold",
        "no fear"
      ],
      "answerHints": {
        "and": "这里不只是平行列举，两边存在“虽然有困难，却不畏惧”的转折。",
        "so": "“冷”不能推出“不害怕”，因此不是因果关系。",
        "although": "本空在前一完整分句之后连接第二句，要用这里适合的并列转折连词。"
      },
      "caseSensitive": false,
      "scene": "雪山上的演奏",
      "checkHint": "前面手指冷，后面却没有畏惧，需要表达转折。",
      "contextRequired": false
    },
    {
      "id": "closer",
      "source": "sz22",
      "number": "第45题",
      "tag": "形容词比较级",
      "stem": "… build a {{blank}} relationship between the two countries than before …",
      "prompt": "close",
      "answers": [
        "closer"
      ],
      "steps": [
        {
          "id": "closer-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            },
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "close"
          ]
        },
        {
          "id": "closer-pos",
          "title": "认词性",
          "prompt": "提示词 close 在这里的基本词性是什么？",
          "options": [
            {
              "text": "代词",
              "correct": false,
              "feedback": "先按词义认身份：close 表示“亲密的；紧密的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "名词",
              "correct": false,
              "feedback": "先按词义认身份：close 表示“亲密的；紧密的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "动词",
              "correct": false,
              "feedback": "先按词义认身份：close 表示“亲密的；紧密的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "形容词",
              "correct": true,
              "feedback": "close：亲密的；紧密的，基本词性是形容词。空位最后需要的词性还要继续判断。"
            },
            {
              "text": "数词",
              "correct": false,
              "feedback": "先按词义认身份：close 表示“亲密的；紧密的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            }
          ],
          "explain": "close：亲密的；紧密的，基本词性是形容词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：close 表示“亲密的；紧密的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "close"
          ]
        },
        {
          "id": "closer-slot",
          "title": "G2 看修饰对象",
          "prompt": "空格后面是 relationship，这个空在修饰什么？",
          "options": [
            {
              "text": "名词 relationship，描述关系怎样",
              "correct": true,
              "feedback": "空格直接修饰 relationship（关系），需要形容词。"
            },
            {
              "text": "动作 build，描述怎么建立",
              "correct": false,
              "feedback": "不要只因为句中有 build 就认定修饰动作；紧接空格的是 relationship。"
            },
            {
              "text": "数词 two，说明数量",
              "correct": false,
              "feedback": "不要只因为句中有 build 就认定修饰动作；紧接空格的是 relationship。"
            }
          ],
          "explain": "空格直接修饰 relationship（关系），需要形容词。",
          "hint": "不要只因为句中有 build 就认定修饰动作；紧接空格的是 relationship。",
          "clues": [
            "relationship"
          ]
        },
        {
          "id": "closer-compare",
          "title": "检查比较",
          "prompt": "than before 是否在把现在与以前作比较？",
          "options": [
            {
              "text": "是",
              "correct": true,
              "feedback": "有“比以前”的比较，需要形容词比较级。"
            },
            {
              "text": "否",
              "correct": false,
              "feedback": "这不是单纯描述紧密，而是在说“比以前更紧密”。"
            }
          ],
          "explain": "有“比以前”的比较，需要形容词比较级。",
          "hint": "这不是单纯描述紧密，而是在说“比以前更紧密”。",
          "clues": [
            "than before"
          ],
          "conclusion": "有“比以前”的比较，需要形容词比较级。"
        },
        {
          "id": "closer-spelling",
          "title": "检查变形方法",
          "prompt": "close 以不发音的 e 结尾，构成比较级怎么变？",
          "options": [
            {
              "text": "再加一个 -er，写 closeer",
              "correct": false,
              "feedback": "先完整保留原词，再按规则加词尾；不要改乱原词的字母顺序。"
            },
            {
              "text": "保留 close，只加 -r",
              "correct": true,
              "feedback": "原词以不发音的 e 结尾，直接加 -r。写的时候保留原词的字母顺序。"
            },
            {
              "text": "把中间字母交换位置",
              "correct": false,
              "feedback": "先完整保留原词，再按规则加词尾；不要改乱原词的字母顺序。"
            }
          ],
          "explain": "原词以不发音的 e 结尾，直接加 -r。写的时候保留原词的字母顺序。",
          "hint": "先完整保留原词，再按规则加词尾；不要改乱原词的字母顺序。",
          "clues": [
            "close"
          ]
        }
      ],
      "translation": "……在两国之间建立比以前更加紧密的关系……",
      "reason": "close 修饰 relationship；than before 提示比较级，close + r = closer。",
      "formHint": "close 已经有 e，比较级只加 -r。",
      "context": "“I hope we will do more cultural exchanges in the future so as to understand each other better and build a ___ (close) relationship between the two countries than before,” added Lang Lang.",
      "vocab": [
        [
          "relationship",
          "关系"
        ]
      ],
      "challenge": false,
      "clues": [
        "relationship",
        "than before"
      ],
      "answerHints": {
        "close": "than before 提示与以前比较，不能保留原级。",
        "closeer": "close 已有 e，比较级只需补一个字母，不要把 e 重复写。",
        "clsoer": "比较级方向对了；原词 close 中的字母顺序不能交换。",
        "cloder": "本题原词是 close，检查原词里的 s，不要换成 d。"
      },
      "caseSensitive": false,
      "scene": "文化交流",
      "checkHint": "这里需要比较级；保留 close 的字母顺序，词尾已有 e。",
      "contextRequired": false
    },
    {
      "id": "third",
      "source": "sz22",
      "number": "第43题",
      "tag": "序数词",
      "stem": "Before Lang Lang played the {{blank}} piece, his fingers became a little cold …",
      "prompt": "three",
      "answers": [
        "third"
      ],
      "steps": [
        {
          "id": "third-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            },
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "three"
          ]
        },
        {
          "id": "third-pos",
          "title": "认词性",
          "prompt": "提示词 three 在这里的基本词性是什么？",
          "options": [
            {
              "text": "代词",
              "correct": false,
              "feedback": "先按词义认身份：three 表示“三”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "名词",
              "correct": false,
              "feedback": "先按词义认身份：three 表示“三”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "形容词",
              "correct": false,
              "feedback": "先按词义认身份：three 表示“三”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "数词",
              "correct": true,
              "feedback": "three：三，基本词性是数词。空位最后需要的词性还要继续判断。"
            },
            {
              "text": "动词",
              "correct": false,
              "feedback": "先按词义认身份：three 表示“三”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            }
          ],
          "explain": "three：三，基本词性是数词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：three 表示“三”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "three"
          ]
        },
        {
          "id": "third-ordinal",
          "title": "G3 判断数量还是顺序",
          "prompt": "the ___ piece 表示“三首曲子”，还是“第三首曲子”？",
          "options": [
            {
              "text": "三次：表示频率",
              "correct": false,
              "feedback": "如果是三首，通常说 three pieces。这里是 the … piece。"
            },
            {
              "text": "三首：表示数量",
              "correct": false,
              "feedback": "如果是三首，通常说 three pieces。这里是 the … piece。"
            },
            {
              "text": "第三首：表示顺序",
              "correct": true,
              "feedback": "这里的 piece 是单数，前面有 the；结合演奏顺序，是“第三首”。"
            }
          ],
          "explain": "这里的 piece 是单数，前面有 the；结合演奏顺序，是“第三首”。",
          "hint": "如果是三首，通常说 three pieces。这里是 the … piece。",
          "clues": [
            "the",
            "piece"
          ]
        }
      ],
      "translation": "在朗朗演奏第三首曲子之前，他的手指有点冷……",
      "reason": "这里表示第几个，用序数词 third；不是 three pieces。",
      "formHint": "three 的序数词是不规则的 third，不是 threeth。",
      "context": "",
      "vocab": [
        [
          "piece",
          "此处指一首曲子"
        ]
      ],
      "challenge": false,
      "clues": [
        "the",
        "piece"
      ],
      "answerHints": {
        "three": "这里是“第三首”，不是“三首”；piece 仍是单数。",
        "threeth": "three 的序数词是不规则形式，不能直接加 th。"
      },
      "caseSensitive": false,
      "scene": "演奏的曲目",
      "checkHint": "这里表示演奏顺序；three 的序数词需要单独记。",
      "contextRequired": false
    },
    {
      "id": "proudly",
      "source": "sz24",
      "number": "第10空（整理卷编号）",
      "tag": "修饰动作",
      "stem": "… said Ole {{blank}}.",
      "prompt": "proud",
      "answers": [
        "proudly"
      ],
      "steps": [
        {
          "id": "proudly-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            },
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "proud"
          ]
        },
        {
          "id": "proudly-pos",
          "title": "认词性",
          "prompt": "提示词 proud 在这里的基本词性是什么？",
          "options": [
            {
              "text": "名词",
              "correct": false,
              "feedback": "先按词义认身份：proud 表示“自豪的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "形容词",
              "correct": true,
              "feedback": "proud：自豪的，基本词性是形容词。空位最后需要的词性还要继续判断。"
            },
            {
              "text": "代词",
              "correct": false,
              "feedback": "先按词义认身份：proud 表示“自豪的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "动词",
              "correct": false,
              "feedback": "先按词义认身份：proud 表示“自豪的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "数词",
              "correct": false,
              "feedback": "先按词义认身份：proud 表示“自豪的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            }
          ],
          "explain": "proud：自豪的，基本词性是形容词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：proud 表示“自豪的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "proud"
          ]
        },
        {
          "id": "proudly-slot",
          "title": "G2 看修饰对象",
          "prompt": "这里的空格是在说“Ole 是什么样的人”，还是“他说得怎么样”？",
          "options": [
            {
              "text": "直接修饰人名 Ole",
              "correct": false,
              "feedback": "人名挨着空格，不代表空格一定修饰人名。先看这个词在句中做什么。"
            },
            {
              "text": "说明“说得怎么样”，修饰 said",
              "correct": true,
              "feedback": "这里是“自豪地说”，修饰 said 这个动作。"
            },
            {
              "text": "表示有多少人说话",
              "correct": false,
              "feedback": "人名挨着空格，不代表空格一定修饰人名。先看这个词在句中做什么。"
            }
          ],
          "explain": "这里是“自豪地说”，修饰 said 这个动作。",
          "hint": "人名挨着空格，不代表空格一定修饰人名。先看这个词在句中做什么。",
          "clues": [
            "said"
          ]
        },
        {
          "id": "proudly-form",
          "title": "决定词形",
          "prompt": "要修饰 said 这个动作，优先考虑什么词？",
          "options": [
            {
              "text": "名词",
              "correct": false,
              "feedback": "描述“说得怎么样”，对应副词。"
            },
            {
              "text": "基数词",
              "correct": false,
              "feedback": "描述“说得怎么样”，对应副词。"
            },
            {
              "text": "副词",
              "correct": true,
              "feedback": "用副词表示“自豪地”。没有比较语境，不需要比较级。"
            }
          ],
          "explain": "用副词表示“自豪地”。没有比较语境，不需要比较级。",
          "hint": "描述“说得怎么样”，对应副词。",
          "clues": [
            "said"
          ]
        }
      ],
      "translation": "……奥勒自豪地说。",
      "reason": "proud 修饰 said，变副词 proudly。",
      "formHint": "proud 后直接加 -ly。",
      "context": "Ole 讲述自己参加龙舟赛的体会。原文引语中说：“Taking part in this sport, we realized the importance of cooperation.”（参加这项运动，我们认识到了合作的重要性。）目标空位于引语后的 said Ole ___ (proud)。",
      "vocab": [
        [
          "proud",
          "自豪的"
        ]
      ],
      "challenge": false,
      "clues": [
        "said"
      ],
      "answerHints": {
        "proud": "这里不是描述一个自豪的人，而是修饰 said 这个动作，需要副词。",
        "proudily": "proud 不以 y 结尾，直接接副词词尾，不额外插入 i。"
      },
      "caseSensitive": false,
      "scene": "龙舟体验",
      "checkHint": "空格说明“说得怎么样”，核对 proud 的副词形式。",
      "contextRequired": false
    },
    {
      "id": "from",
      "source": "sz24",
      "number": "第6空（整理卷编号）",
      "tag": "介词与来源",
      "stem": "My teammates are international students coming {{blank}} different countries.",
      "prompt": "",
      "answers": [
        "from"
      ],
      "steps": [
        {
          "id": "from-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "有提示词，先认它的词性",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            },
            {
              "text": "没有提示词，走无提示词通道",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": []
        },
        {
          "id": "from-N1",
          "title": "N1 看连接",
          "prompt": "目标空本身是在连接两个句子，或两个并列成分吗？",
          "options": [
            {
              "text": "是",
              "correct": false,
              "feedback": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。"
            },
            {
              "text": "否",
              "correct": true,
              "feedback": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
            }
          ],
          "explain": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。",
          "hint": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。",
          "clues": [],
          "conclusion": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
        },
        {
          "id": "from-N2",
          "title": "N2 看名词短语",
          "prompt": "different countries 已表示“不同的国家”；这里是在给它补冠词吗？",
          "options": [
            {
              "text": "是",
              "correct": false,
              "feedback": "不要只看空后有名词；先把 coming … different countries 连起来理解。"
            },
            {
              "text": "否",
              "correct": true,
              "feedback": "空位不是补冠词，而是说明这些学生来自哪里。"
            }
          ],
          "explain": "空位不是补冠词，而是说明这些学生来自哪里。",
          "hint": "不要只看空后有名词；先把 coming … different countries 连起来理解。",
          "clues": [
            "coming",
            "different countries"
          ],
          "conclusion": "空位不是补冠词，而是说明这些学生来自哪里。"
        },
        {
          "id": "from-N3",
          "title": "N3 查介词搭配",
          "prompt": "coming 与国家连用，是否在表达“来自哪里”？",
          "options": [
            {
              "text": "否",
              "correct": false,
              "feedback": "想一想“来自中国”中的“来自”怎么说，形式变化不改变这个搭配。"
            },
            {
              "text": "是",
              "correct": true,
              "feedback": "这里表达“来自”；come 变成 coming，原有的介词搭配仍然保留。"
            }
          ],
          "explain": "这里表达“来自”；come 变成 coming，原有的介词搭配仍然保留。",
          "hint": "想一想“来自中国”中的“来自”怎么说，形式变化不改变这个搭配。",
          "clues": [
            "coming"
          ],
          "conclusion": "这里表达“来自”；come 变成 coming，原有的介词搭配仍然保留。"
        }
      ],
      "translation": "我的队友是来自不同国家的国际学生。",
      "reason": "come from 表示来自。这里的 coming 修饰 students，不影响介词使用。",
      "formHint": "come from…＝来自……。",
      "context": "",
      "vocab": [
        [
          "teammate",
          "队友"
        ],
        [
          "international",
          "国际的"
        ]
      ],
      "challenge": false,
      "clues": [
        "coming"
      ],
      "answerHints": {
        "in": "句子问的是这些队友来自哪些国家，不是在说他们处于哪里。",
        "to": "这里表达来源，不是去往某个目的地。"
      },
      "caseSensitive": false,
      "scene": "国际队友",
      "checkHint": "把 coming 和 different countries 连起来，回忆“来自”的搭配。",
      "contextRequired": false
    },
    {
      "id": "piano",
      "source": "sz22",
      "number": "第39题",
      "tag": "乐器前的冠词",
      "stem": "… this was his first time to play {{blank}} piano at the top of a snowy mountain.",
      "prompt": "",
      "answers": [
        "the"
      ],
      "steps": [
        {
          "id": "piano-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "有提示词，先认它的词性",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            },
            {
              "text": "没有提示词，走无提示词通道",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": []
        },
        {
          "id": "piano-N1",
          "title": "N1 看连接",
          "prompt": "目标空本身是在连接两个句子，或两个并列成分吗？",
          "options": [
            {
              "text": "是",
              "correct": false,
              "feedback": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。"
            },
            {
              "text": "否",
              "correct": true,
              "feedback": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
            }
          ],
          "explain": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。",
          "hint": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。",
          "clues": [],
          "conclusion": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
        },
        {
          "id": "piano-N2",
          "title": "N2 看名词短语",
          "prompt": "piano 前是否需要检查限定词或冠词的用法？",
          "options": [
            {
              "text": "否",
              "correct": false,
              "feedback": "本空不连接两个句子；piano 是名词。接着查演奏乐器的表达。"
            },
            {
              "text": "是",
              "correct": true,
              "feedback": "这里需要看 play 与乐器名词构成的演奏搭配。"
            }
          ],
          "explain": "这里需要看 play 与乐器名词构成的演奏搭配。",
          "hint": "本空不连接两个句子；piano 是名词。接着查演奏乐器的表达。",
          "clues": [
            "play",
            "piano"
          ],
          "conclusion": "这里需要看 play 与乐器名词构成的演奏搭配。"
        },
        {
          "id": "piano-article",
          "title": "确定使用依据",
          "prompt": "这里主要依据哪一种表达规则？",
          "options": [
            {
              "text": "演奏乐器的固定表达",
              "correct": true,
              "feedback": "这里表示演奏钢琴，使用演奏乐器的常用冠词搭配；不是在数一台钢琴。打球类又是另一种表达。"
            },
            {
              "text": "所有 play 后面都填同一冠词",
              "correct": false,
              "feedback": "看整体 play … piano，不要只按“第一次提到”机械套 a。"
            },
            {
              "text": "第一次提到“一台钢琴”",
              "correct": false,
              "feedback": "看整体 play … piano，不要只按“第一次提到”机械套 a。"
            }
          ],
          "explain": "这里表示演奏钢琴，使用演奏乐器的常用冠词搭配；不是在数一台钢琴。打球类又是另一种表达。",
          "hint": "看整体 play … piano，不要只按“第一次提到”机械套 a。",
          "clues": [
            "play",
            "piano"
          ]
        }
      ],
      "translation": "……这是他第一次在雪山顶弹钢琴。",
      "reason": "演奏钢琴用 play the piano；不把 play 后面的球类、乐器混在一起。",
      "formHint": "play the piano 是“弹钢琴”的常用表达。",
      "context": "",
      "vocab": [
        [
          "snowy",
          "多雪的"
        ]
      ],
      "challenge": false,
      "clues": [
        "play",
        "piano"
      ],
      "answerHints": {
        "a": "这里表达演奏钢琴，不是在介绍“一台钢琴”。",
        "an": "这里不是数量表达；先按“演奏乐器”的常用搭配判断。"
      },
      "caseSensitive": false,
      "scene": "山顶演出",
      "checkHint": "把 play 与 piano 连起来，核对“弹钢琴”的常用表达。",
      "contextRequired": false
    },
    {
      "id": "himself",
      "source": "joint25",
      "number": "第37题",
      "tag": "反身代词",
      "stem": "But later, Ao Bing sacrifices (牺牲) {{blank}} to protect Chentang Pass.",
      "prompt": "he",
      "answers": [
        "himself"
      ],
      "steps": [
        {
          "id": "himself-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            },
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "he"
          ]
        },
        {
          "id": "himself-pos",
          "title": "认词性",
          "prompt": "提示词 he 在这里的基本词性是什么？",
          "options": [
            {
              "text": "名词",
              "correct": false,
              "feedback": "先按词义认身份：he 表示“他”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "形容词",
              "correct": false,
              "feedback": "先按词义认身份：he 表示“他”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "数词",
              "correct": false,
              "feedback": "先按词义认身份：he 表示“他”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "动词",
              "correct": false,
              "feedback": "先按词义认身份：he 表示“他”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "代词",
              "correct": true,
              "feedback": "he：他，基本词性是代词。空位最后需要的词性还要继续判断。"
            }
          ],
          "explain": "he：他，基本词性是代词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：he 表示“他”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "he"
          ]
        },
        {
          "id": "himself-meaning",
          "title": "G3 判断代词作用",
          "prompt": "敖丙为了保护陈塘关，牺牲的是谁？",
          "options": [
            {
              "text": "另一个男孩：他人作宾语",
              "correct": false,
              "feedback": "先看谁做动作，再看动作指向谁；这里讲的是“牺牲自己”。"
            },
            {
              "text": "他的某个东西：表示所属",
              "correct": false,
              "feedback": "先看谁做动作，再看动作指向谁；这里讲的是“牺牲自己”。"
            },
            {
              "text": "他自己：宾语与主语是同一个人",
              "correct": true,
              "feedback": "主语 Ao Bing 与被牺牲的人是同一个人，需要反身代词。"
            }
          ],
          "explain": "主语 Ao Bing 与被牺牲的人是同一个人，需要反身代词。",
          "hint": "先看谁做动作，再看动作指向谁；这里讲的是“牺牲自己”。",
          "clues": [
            "Ao Bing",
            "sacrifices"
          ]
        },
        {
          "id": "himself-form",
          "title": "选择形式",
          "prompt": "表示“他自己”，应使用哪类代词？",
          "options": [
            {
              "text": "反身代词",
              "correct": true,
              "feedback": "用 he 对应的反身代词。接下来把“他自己”写出来。"
            },
            {
              "text": "形容词性物主代词",
              "correct": false,
              "feedback": "he＝他，him＝他（宾格），his＝他的，himself＝他自己。"
            },
            {
              "text": "人称代词主格",
              "correct": false,
              "feedback": "he＝他，him＝他（宾格），his＝他的，himself＝他自己。"
            }
          ],
          "explain": "用 he 对应的反身代词。接下来把“他自己”写出来。",
          "hint": "he＝他，him＝他（宾格），his＝他的，himself＝他自己。",
          "clues": []
        }
      ],
      "translation": "但后来，敖丙为了保护陈塘关牺牲了自己。",
      "reason": "动作的承受者与主语 Ao Bing 是同一人，用 himself。",
      "formHint": "he 对应的反身代词：him + self。",
      "context": "",
      "vocab": [
        [
          "protect",
          "保护"
        ]
      ],
      "challenge": false,
      "clues": [
        "Ao Bing",
        "sacrifices"
      ],
      "answerHints": {
        "him": "him 只表达“他”作宾语；这里要明确表示同一个人“自己”。",
        "his": "his 表示“他的”，不能表达“牺牲他自己”。",
        "he": "动词后不能用主格；这里动作又指向主语自己。"
      },
      "caseSensitive": false,
      "scene": "敖丙的选择",
      "checkHint": "动作的承受者和主语 Ao Bing 是同一人；核对“他自己”的形式。",
      "contextRequired": false
    },
    {
      "id": "chosen",
      "source": "sz22",
      "number": "第41题",
      "tag": "过去时被动",
      "stem": "“The piece ‘Jasmine Flower’ {{blank}} specially for this show,” Lang Lang said.",
      "prompt": "choose",
      "answers": [
        "was chosen"
      ],
      "steps": [
        {
          "id": "chosen-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            },
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "choose"
          ]
        },
        {
          "id": "chosen-pos",
          "title": "认词性",
          "prompt": "提示词 choose 在这里的基本词性是什么？",
          "options": [
            {
              "text": "代词",
              "correct": false,
              "feedback": "先按词义认身份：choose 表示“选择”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "形容词",
              "correct": false,
              "feedback": "先按词义认身份：choose 表示“选择”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "动词",
              "correct": true,
              "feedback": "choose：选择，基本词性是动词。空位最后需要的词性还要继续判断。"
            },
            {
              "text": "数词",
              "correct": false,
              "feedback": "先按词义认身份：choose 表示“选择”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "名词",
              "correct": false,
              "feedback": "先按词义认身份：choose 表示“选择”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            }
          ],
          "explain": "choose：选择，基本词性是动词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：choose 表示“选择”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "choose"
          ]
        },
        {
          "id": "chosen-V1",
          "title": "V1 看动词组合",
          "prompt": "目标空是否与前面的助动词或情态动词构成同一谓语？",
          "options": [
            {
              "text": "是",
              "correct": false,
              "feedback": "找的是与本空配套的 be / have / can 等。不要把别处分句里的动词算到这里。"
            },
            {
              "text": "否",
              "correct": true,
              "feedback": "这里没有与目标空配套的助动词或情态动词，继续找本句谓语。"
            }
          ],
          "explain": "这里没有与目标空配套的助动词或情态动词，继续找本句谓语。",
          "hint": "找的是与本空配套的 be / have / can 等。不要把别处分句里的动词算到这里。",
          "clues": [],
          "conclusion": "这里没有与目标空配套的助动词或情态动词，继续找本句谓语。"
        },
        {
          "id": "chosen-V2",
          "title": "V2 找已有谓语",
          "prompt": "空格所在句的主干中，已经有表达动作或状态、带时态的谓语了吗？",
          "options": [
            {
              "text": "是",
              "correct": false,
              "feedback": "只看目标空所属的句子主干。引号外的 said、其他分句里的谓语，不能替代本句谓语。"
            },
            {
              "text": "否",
              "correct": true,
              "feedback": "先找主语，再找它对应的谓语。带 to 或 -ing 的词不能单凭形式算谓语。"
            }
          ],
          "explain": "先找主语，再找它对应的谓语。带 to 或 -ing 的词不能单凭形式算谓语。",
          "hint": "只看目标空所属的句子主干。引号外的 said、其他分句里的谓语，不能替代本句谓语。",
          "clues": [],
          "conclusion": "先找主语，再找它对应的谓语。"
        },
        {
          "id": "chosen-voice",
          "title": "判断主动还是被动",
          "prompt": "主语 The piece（这首曲子）是自己选择，还是被人选择？",
          "options": [
            {
              "text": "曲子主动选择：用主动语态",
              "correct": false,
              "feedback": "把主语换成中文“这首曲子”：应是“被挑选”，不是“挑选别人”。"
            },
            {
              "text": "看到 said 就不需要本句谓语",
              "correct": false,
              "feedback": "把主语换成中文“这首曲子”：应是“被挑选”，不是“挑选别人”。"
            },
            {
              "text": "曲子被选择：用被动语态",
              "correct": true,
              "feedback": "曲子不能主动做选择，它是被选中的。引号外的 said 不代替引号内的谓语。"
            }
          ],
          "explain": "曲子不能主动做选择，它是被选中的。引号外的 said 不代替引号内的谓语。",
          "hint": "把主语换成中文“这首曲子”：应是“被挑选”，不是“挑选别人”。",
          "clues": [
            "The piece",
            "Lang Lang said"
          ]
        },
        {
          "id": "chosen-tense",
          "title": "组合时态与语态",
          "prompt": "上下文在回顾这场已举行的演出，应怎样组成谓语？",
          "options": [
            {
              "text": "一般过去时主动：只改成过去式",
              "correct": false,
              "feedback": "这一空没有预先给出 be，答案需要补齐整个被动结构。"
            },
            {
              "text": "只写过去分词，不写 be",
              "correct": false,
              "feedback": "这一空没有预先给出 be，答案需要补齐整个被动结构。"
            },
            {
              "text": "一般过去时被动：was / were + 过去分词",
              "correct": true,
              "feedback": "用一般过去时被动。先按单数主语 piece 选 be 的过去式，再接 choose 的过去分词，两个词都要写。"
            }
          ],
          "explain": "用一般过去时被动。先按单数主语 piece 选 be 的过去式，再接 choose 的过去分词，两个词都要写。",
          "hint": "这一空没有预先给出 be，答案需要补齐整个被动结构。",
          "clues": [
            "The piece",
            "said"
          ]
        }
      ],
      "translation": "“《茉莉花》是专门为这场演出挑选的，”朗朗说。",
      "reason": "本句缺完整谓语；曲子被挑选，演出为过去语境，主语单数，所以 was chosen。",
      "formHint": "完整结构：单数主语 + was + choose 的过去分词。",
      "context": "Chinese pianist Lang Lang played “Loving Dream”, “Jasmine Flower” and “Goldberg Variations” at the highest railway station in central Switzerland.",
      "vocab": [
        [
          "specially",
          "专门地"
        ],
        [
          "choose",
          "选择；挑选"
        ]
      ],
      "challenge": true,
      "clues": [
        "The piece",
        "said"
      ],
      "answerHints": {
        "chosen": "词形方向对了，但这里没有现成的 be，完整被动谓语还缺一个词。",
        "chose": "chose 是过去式；这里需要被动结构中的过去分词，并补上 be。"
      },
      "caseSensitive": false,
      "scene": "演出选曲",
      "checkHint": "这一空缺完整的被动谓语；检查单数主语对应的 be 过去式与过去分词。",
      "contextRequired": false
    },
    {
      "id": "draw",
      "source": "sz22",
      "number": "第42题",
      "tag": "非谓语与搭配",
      "stem": "“I played this beautiful piece from my own culture, hoping {{blank}} the audience’s interest in learning more about China through the beauty of Chinese music.”",
      "prompt": "draw",
      "answers": [
        "to draw"
      ],
      "steps": [
        {
          "id": "draw-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            },
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "draw"
          ]
        },
        {
          "id": "draw-pos",
          "title": "认词性",
          "prompt": "提示词 draw 在这里的基本词性是什么？",
          "options": [
            {
              "text": "动词",
              "correct": true,
              "feedback": "draw：吸引；画，基本词性是动词。空位最后需要的词性还要继续判断。"
            },
            {
              "text": "形容词",
              "correct": false,
              "feedback": "先按词义认身份：draw 表示“吸引；画”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "名词",
              "correct": false,
              "feedback": "先按词义认身份：draw 表示“吸引；画”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "代词",
              "correct": false,
              "feedback": "先按词义认身份：draw 表示“吸引；画”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "数词",
              "correct": false,
              "feedback": "先按词义认身份：draw 表示“吸引；画”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            }
          ],
          "explain": "draw：吸引；画，基本词性是动词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：draw 表示“吸引；画”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "draw"
          ]
        },
        {
          "id": "draw-V1",
          "title": "V1 看动词组合",
          "prompt": "目标空是否与前面的助动词或情态动词构成同一谓语？",
          "options": [
            {
              "text": "是",
              "correct": false,
              "feedback": "找的是与本空配套的 be / have / can 等。不要把别处分句里的动词算到这里。"
            },
            {
              "text": "否",
              "correct": true,
              "feedback": "这里没有与目标空配套的助动词或情态动词，继续找本句谓语。"
            }
          ],
          "explain": "这里没有与目标空配套的助动词或情态动词，继续找本句谓语。",
          "hint": "找的是与本空配套的 be / have / can 等。不要把别处分句里的动词算到这里。",
          "clues": [],
          "conclusion": "这里没有与目标空配套的助动词或情态动词，继续找本句谓语。"
        },
        {
          "id": "draw-V2",
          "title": "V2 找已有谓语",
          "prompt": "空格所在句的主干中，已经有表达动作或状态、带时态的谓语了吗？",
          "options": [
            {
              "text": "否",
              "correct": false,
              "feedback": "只看目标空所属的句子主干。引号外的 said、其他分句里的谓语，不能替代本句谓语。"
            },
            {
              "text": "是",
              "correct": true,
              "feedback": "先找主语，再找它对应的谓语。带 to 或 -ing 的词不能单凭形式算谓语。"
            }
          ],
          "explain": "先找主语，再找它对应的谓语。带 to 或 -ing 的词不能单凭形式算谓语。",
          "hint": "只看目标空所属的句子主干。引号外的 said、其他分句里的谓语，不能替代本句谓语。",
          "clues": [],
          "conclusion": "先找主语，再找它对应的谓语。"
        },
        {
          "id": "draw-V3",
          "title": "V3 查并列",
          "prompt": "目标空是否与已有谓语并列，表达另一项动作？",
          "options": [
            {
              "text": "是",
              "correct": false,
              "feedback": "不要因为前面有动词，就直接填 -ing；看两个动作是否是同一层次的并列。"
            },
            {
              "text": "否",
              "correct": true,
              "feedback": "有已有谓语，还要排除并列谓语；本空再按搭配与句中作用判断。"
            }
          ],
          "explain": "有已有谓语，还要排除并列谓语；本空再按搭配与句中作用判断。",
          "hint": "不要因为前面有动词，就直接填 -ing；看两个动作是否是同一层次的并列。",
          "clues": [],
          "conclusion": "有已有谓语，还要排除并列谓语；本空再按搭配与句中作用判断。"
        },
        {
          "id": "draw-pattern",
          "title": "检查前词搭配",
          "prompt": "这里是“希望吸引观众的兴趣”，应检查哪个搭配？",
          "options": [
            {
              "text": "can do sth.",
              "correct": false,
              "feedback": "不要看到 hoping 就把后面的动词也加 -ing；查的是 hope 后接什么形式。"
            },
            {
              "text": "finish doing sth.",
              "correct": false,
              "feedback": "不要看到 hoping 就把后面的动词也加 -ing；查的是 hope 后接什么形式。"
            },
            {
              "text": "hope to do sth.",
              "correct": true,
              "feedback": "原句是 hoping，仍按 hope to do sth.。答案要包含不定式标记和后面的动词原形。"
            }
          ],
          "explain": "原句是 hoping，仍按 hope to do sth.。答案要包含不定式标记和后面的动词原形。",
          "hint": "不要看到 hoping 就把后面的动词也加 -ing；查的是 hope 后接什么形式。",
          "clues": [
            "hoping"
          ]
        }
      ],
      "translation": "“我演奏了自己文化中的这首优美曲子，希望通过中国音乐之美吸引观众更多地了解中国。”",
      "reason": "主句已有 I played；draw 不是并列谓语，按 hope to do 的搭配填 to draw。",
      "formHint": "hope to do sth.；答案需带 to，不能只填动词。",
      "context": "",
      "vocab": [
        [
          "draw interest",
          "吸引兴趣"
        ],
        [
          "audience",
          "观众"
        ]
      ],
      "challenge": true,
      "clues": [
        "I played",
        "hoping"
      ],
      "answerHints": {
        "draw": "搭配所需的不定式标记还没有写全。",
        "drawing": "不要被前面的 hoping 诱导；hope 后面常用 to do。"
      },
      "caseSensitive": false,
      "scene": "音乐与文化",
      "checkHint": "按 hope to do 检查不定式是否完整，不要受前面的 hoping 影响。",
      "contextRequired": false
    },
    {
      "id": "importance",
      "source": "sz24",
      "number": "第9空（整理卷编号）",
      "tag": "形容词变名词",
      "stem": "“Taking part in this sport, we realized the {{blank}} of cooperation.”",
      "prompt": "important",
      "answers": [
        "importance"
      ],
      "steps": [
        {
          "id": "importance-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            },
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "important"
          ]
        },
        {
          "id": "importance-pos",
          "title": "认词性",
          "prompt": "提示词 important 在这里的基本词性是什么？",
          "options": [
            {
              "text": "名词",
              "correct": false,
              "feedback": "先按词义认身份：important 表示“重要的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "数词",
              "correct": false,
              "feedback": "先按词义认身份：important 表示“重要的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "形容词",
              "correct": true,
              "feedback": "important：重要的，基本词性是形容词。空位最后需要的词性还要继续判断。"
            },
            {
              "text": "代词",
              "correct": false,
              "feedback": "先按词义认身份：important 表示“重要的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "动词",
              "correct": false,
              "feedback": "先按词义认身份：important 表示“重要的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            }
          ],
          "explain": "important：重要的，基本词性是形容词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：important 表示“重要的”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "important"
          ]
        },
        {
          "id": "importance-slot",
          "title": "G2 先判断空位",
          "prompt": "the ___ of cooperation 中，空位需要表达哪一种意思？",
          "options": [
            {
              "text": "合作做得“重要地”：需要副词",
              "correct": false,
              "feedback": "同时看 the 与后面的 of cooperation，再读“意识到合作的……”是什么意思。"
            },
            {
              "text": "合作的“重要性”：需要名词",
              "correct": true,
              "feedback": "这里说“合作的重要性”。需要名词，不能因为提示词是形容词就只在形容词、副词中选。"
            },
            {
              "text": "一个“重要的”合作：直接用形容词",
              "correct": false,
              "feedback": "同时看 the 与后面的 of cooperation，再读“意识到合作的……”是什么意思。"
            }
          ],
          "explain": "这里说“合作的重要性”。需要名词，不能因为提示词是形容词就只在形容词、副词中选。",
          "hint": "同时看 the 与后面的 of cooperation，再读“意识到合作的……”是什么意思。",
          "clues": [
            "the",
            "of cooperation"
          ]
        },
        {
          "id": "importance-conversion",
          "title": "决定变形方向",
          "prompt": "既然空位需要名词，important 应怎样处理？",
          "options": [
            {
              "text": "变成表示“重要性”的名词",
              "correct": true,
              "feedback": "空位需要表示“重要性”的名词。这是词性转换，不能直接加 -ly 或按复数加 -s。"
            },
            {
              "text": "只在词尾加 -ly",
              "correct": false,
              "feedback": "先定需要的词性，再回忆词族；这里不是“重要地”。"
            },
            {
              "text": "原形不变，因为前面有 the",
              "correct": false,
              "feedback": "先定需要的词性，再回忆词族；这里不是“重要地”。"
            }
          ],
          "explain": "空位需要表示“重要性”的名词。这是词性转换，不能直接加 -ly 或按复数加 -s。",
          "hint": "先定需要的词性，再回忆词族；这里不是“重要地”。",
          "clues": [
            "important"
          ]
        }
      ],
      "translation": "“参加这项运动，我们认识到了合作的重要性。”",
      "reason": "the ___ of cooperation 结合语义需要名词 importance；important 不只有变副词一条路。",
      "formHint": "词族：important（重要的）→ importance（重要性）。",
      "context": "",
      "vocab": [
        [
          "realize",
          "认识到"
        ],
        [
          "cooperation",
          "合作"
        ]
      ],
      "challenge": true,
      "clues": [
        "the",
        "of cooperation"
      ],
      "answerHints": {
        "important": "你已经选了名词；important 仍是形容词，不能直接表示“重要性”。",
        "importantly": "-ly 通常变副词，本题 the … of 中需要名词。",
        "importantness": "important 的常用名词形式需要单独记；不能机械加 ness。"
      },
      "caseSensitive": false,
      "scene": "运动与合作",
      "checkHint": "这里需要表示“重要性”的名词，核对 important 的词族变化。",
      "contextRequired": false
    },
    {
      "id": "called",
      "source": "ns25",
      "number": "第43题",
      "tag": "情态动词被动",
      "stem": "In fact, companies like DeepSeek can {{blank}} leaders in the tech world nowadays.",
      "prompt": "call",
      "answers": [
        "be called"
      ],
      "steps": [
        {
          "id": "called-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            },
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "call"
          ]
        },
        {
          "id": "called-pos",
          "title": "认词性",
          "prompt": "提示词 call 在这里的基本词性是什么？",
          "options": [
            {
              "text": "数词",
              "correct": false,
              "feedback": "先按词义认身份：call 表示“称呼；叫作”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "形容词",
              "correct": false,
              "feedback": "先按词义认身份：call 表示“称呼；叫作”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "代词",
              "correct": false,
              "feedback": "先按词义认身份：call 表示“称呼；叫作”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "动词",
              "correct": true,
              "feedback": "call：称呼；叫作，基本词性是动词。空位最后需要的词性还要继续判断。"
            },
            {
              "text": "名词",
              "correct": false,
              "feedback": "先按词义认身份：call 表示“称呼；叫作”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            }
          ],
          "explain": "call：称呼；叫作，基本词性是动词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：call 表示“称呼；叫作”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "call"
          ]
        },
        {
          "id": "called-V1",
          "title": "V1 看动词组合",
          "prompt": "目标空是否与前面的助动词或情态动词构成同一谓语？",
          "options": [
            {
              "text": "否",
              "correct": false,
              "feedback": "找的是与本空配套的 be / have / can 等。不要把别处分句里的动词算到这里。"
            },
            {
              "text": "是",
              "correct": true,
              "feedback": "把前面的助动词与目标空合起来看，再决定整个结构。"
            }
          ],
          "explain": "把前面的助动词与目标空合起来看，再决定整个结构。",
          "hint": "找的是与本空配套的 be / have / can 等。不要把别处分句里的动词算到这里。",
          "clues": [
            "can"
          ],
          "conclusion": "把前面的助动词与目标空合起来看，再决定整个结构。"
        },
        {
          "id": "called-voice",
          "title": "判断动作关系",
          "prompt": "这些公司是“称呼别人”，还是“被称为领先者”？",
          "options": [
            {
              "text": "出现 can 就只能填 call 一个词",
              "correct": false,
              "feedback": "把公司放回句中理解：“这样的公司可以被称为……”。"
            },
            {
              "text": "公司在称呼其他人",
              "correct": false,
              "feedback": "把公司放回句中理解：“这样的公司可以被称为……”。"
            },
            {
              "text": "公司被称为领先者",
              "correct": true,
              "feedback": "主语 companies 是被称呼的一方，需要被动。can 后面的原形是 be，而不是把整个被动结构省掉。"
            }
          ],
          "explain": "主语 companies 是被称呼的一方，需要被动。can 后面的原形是 be，而不是把整个被动结构省掉。",
          "hint": "把公司放回句中理解：“这样的公司可以被称为……”。",
          "clues": [
            "companies",
            "can"
          ]
        },
        {
          "id": "called-form",
          "title": "组合完整形式",
          "prompt": "情态动词后的被动结构应该怎样组成？",
          "options": [
            {
              "text": "can + 过去式",
              "correct": false,
              "feedback": "can 后用动词原形；被动结构中的 be 要保留，并用原形。"
            },
            {
              "text": "can + is + 过去分词",
              "correct": false,
              "feedback": "can 后用动词原形；被动结构中的 be 要保留，并用原形。"
            },
            {
              "text": "can + be + 过去分词",
              "correct": true,
              "feedback": "情态动词被动是 can be done。can 已给出，本空需补 be 和 call 的过去分词，不能漏写。"
            }
          ],
          "explain": "情态动词被动是 can be done。can 已给出，本空需补 be 和 call 的过去分词，不能漏写。",
          "hint": "can 后用动词原形；被动结构中的 be 要保留，并用原形。",
          "clues": [
            "can"
          ]
        }
      ],
      "translation": "事实上，像DeepSeek这样的公司如今可以被称为科技界的领先者。",
      "reason": "can 已给出；公司是被称呼的对象，空格需填 be called，而非只写 called。",
      "formHint": "can be done；空里要保留 be，call 的过去分词加 -ed。",
      "context": "",
      "vocab": [
        [
          "leader",
          "领先者；领导者"
        ],
        [
          "nowadays",
          "如今"
        ]
      ],
      "challenge": true,
      "clues": [
        "companies",
        "can"
      ],
      "answerHints": {
        "called": "还缺被动结构中的 be；can 后的 be 必须用原形。",
        "call": "can 后用原形没有错，但本句是被动，需要组成“被称为”。"
      },
      "caseSensitive": false,
      "scene": "科技公司",
      "checkHint": "检查 can 后的完整被动结构，以及 call 的过去分词词尾。",
      "contextRequired": false
    },
    {
      "id": "amazing",
      "source": "ns25",
      "number": "第44题",
      "tag": "动词变形容词",
      "stem": "Using their products lets people see the {{blank}} things technology can do—like making things faster, smarter, and better.",
      "prompt": "amaze",
      "answers": [
        "amazing"
      ],
      "steps": [
        {
          "id": "amazing-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "有提示词，先认它的词性",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            },
            {
              "text": "没有提示词，走无提示词通道",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": [
            "amaze"
          ]
        },
        {
          "id": "amazing-pos",
          "title": "认词性",
          "prompt": "提示词 amaze 在这里的基本词性是什么？",
          "options": [
            {
              "text": "动词",
              "correct": true,
              "feedback": "amaze：使惊奇，基本词性是动词。空位最后需要的词性还要继续判断。"
            },
            {
              "text": "名词",
              "correct": false,
              "feedback": "先按词义认身份：amaze 表示“使惊奇”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "代词",
              "correct": false,
              "feedback": "先按词义认身份：amaze 表示“使惊奇”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "数词",
              "correct": false,
              "feedback": "先按词义认身份：amaze 表示“使惊奇”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            },
            {
              "text": "形容词",
              "correct": false,
              "feedback": "先按词义认身份：amaze 表示“使惊奇”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。"
            }
          ],
          "explain": "amaze：使惊奇，基本词性是动词。空位最后需要的词性还要继续判断。",
          "hint": "先按词义认身份：amaze 表示“使惊奇”。人或事物的名称常是名词；描述性质常是形容词；she / he 等是代词。",
          "clues": [
            "amaze"
          ]
        },
        {
          "id": "amazing-V1",
          "title": "V1 看动词组合",
          "prompt": "目标空是否与前面的助动词或情态动词构成同一谓语？",
          "options": [
            {
              "text": "是",
              "correct": false,
              "feedback": "找的是与本空配套的 be / have / can 等。不要把别处分句里的动词算到这里。"
            },
            {
              "text": "否",
              "correct": true,
              "feedback": "这里没有与目标空配套的助动词或情态动词，继续找本句谓语。"
            }
          ],
          "explain": "这里没有与目标空配套的助动词或情态动词，继续找本句谓语。",
          "hint": "找的是与本空配套的 be / have / can 等。不要把别处分句里的动词算到这里。",
          "clues": [],
          "conclusion": "这里没有与目标空配套的助动词或情态动词，继续找本句谓语。"
        },
        {
          "id": "amazing-V2",
          "title": "V2 找已有谓语",
          "prompt": "空格所在句的主干中，已经有表达动作或状态、带时态的谓语了吗？",
          "options": [
            {
              "text": "是",
              "correct": true,
              "feedback": "先找主语，再找它对应的谓语。带 to 或 -ing 的词不能单凭形式算谓语。"
            },
            {
              "text": "否",
              "correct": false,
              "feedback": "只看目标空所属的句子主干。引号外的 said、其他分句里的谓语，不能替代本句谓语。"
            }
          ],
          "explain": "先找主语，再找它对应的谓语。带 to 或 -ing 的词不能单凭形式算谓语。",
          "hint": "只看目标空所属的句子主干。引号外的 said、其他分句里的谓语，不能替代本句谓语。",
          "clues": [],
          "conclusion": "先找主语，再找它对应的谓语。"
        },
        {
          "id": "amazing-V3",
          "title": "V3 查并列",
          "prompt": "目标空是否与已有谓语并列，表达另一项动作？",
          "options": [
            {
              "text": "是",
              "correct": false,
              "feedback": "不要因为前面有动词，就直接填 -ing；看两个动作是否是同一层次的并列。"
            },
            {
              "text": "否",
              "correct": true,
              "feedback": "有已有谓语，还要排除并列谓语；本空再按搭配与句中作用判断。"
            }
          ],
          "explain": "有已有谓语，还要排除并列谓语；本空再按搭配与句中作用判断。",
          "hint": "不要因为前面有动词，就直接填 -ing；看两个动作是否是同一层次的并列。",
          "clues": [],
          "conclusion": "有已有谓语，还要排除并列谓语；本空再按搭配与句中作用判断。"
        },
        {
          "id": "amazing-slot",
          "title": "先判断空位",
          "prompt": "the ___ things 中，本空是在表达一个独立动作，还是在修饰 things？",
          "options": [
            {
              "text": "另起一个谓语，写过去式",
              "correct": false,
              "feedback": "把 the ___ things 一起看，不能只盯着 the。"
            },
            {
              "text": "只要在 the 后就一定填名词",
              "correct": false,
              "feedback": "把 the ___ things 一起看，不能只盯着 the。"
            },
            {
              "text": "修饰 things，需要形容词",
              "correct": true,
              "feedback": "这里已有名词 things；空格要说明这些事情“令人惊奇”。动词提示词也可能要变成形容词。"
            }
          ],
          "explain": "这里已有名词 things；空格要说明这些事情“令人惊奇”。动词提示词也可能要变成形容词。",
          "hint": "把 the ___ things 一起看，不能只盯着 the。",
          "clues": [
            "the",
            "things"
          ]
        },
        {
          "id": "amazing-ed-ing",
          "title": "分清描述对象",
          "prompt": "描述“令人惊奇的事情”，应采用哪一种意义？",
          "options": [
            {
              "text": "事物令人产生感受：用 -ing 形容词",
              "correct": true,
              "feedback": "这里描述 things 令人惊奇，需要 -ing 形容词；不是说事情自己感到惊奇。"
            },
            {
              "text": "一律按主句时态写过去式",
              "correct": false,
              "feedback": "先判断是在说“令人……”还是“感到……”。不能机械地按人用 -ed、物用 -ing。"
            },
            {
              "text": "人感到惊奇：用 -ed 形容词",
              "correct": false,
              "feedback": "先判断是在说“令人……”还是“感到……”。不能机械地按人用 -ed、物用 -ing。"
            }
          ],
          "explain": "这里描述 things 令人惊奇，需要 -ing 形容词；不是说事情自己感到惊奇。",
          "hint": "先判断是在说“令人……”还是“感到……”。不能机械地按人用 -ed、物用 -ing。",
          "clues": [
            "things"
          ]
        }
      ],
      "translation": "使用他们的产品，让人们看到技术能做到的令人惊奇的事情，例如让事情更快、更智能、更好。",
      "reason": "原词 amaze 是动词，但空位修饰名词 things，需要形容词 amazing。",
      "formHint": "amaze → amazing：去掉词尾不发音的 e，再加 -ing。",
      "context": "",
      "vocab": [
        [
          "product",
          "产品"
        ],
        [
          "amaze",
          "使惊奇"
        ]
      ],
      "challenge": true,
      "clues": [
        "lets",
        "the",
        "things"
      ],
      "answerHints": {
        "amaze": "空位要修饰 things，需要把动词变成形容词。",
        "amazeing": "-ing 方向正确；amaze 词尾不发音的 e 要先去掉。",
        "amazed": "这里描述事情“令人惊奇”，不是说事情自己“感到惊奇”。"
      },
      "caseSensitive": false,
      "scene": "技术与生活",
      "checkHint": "空位描述“令人惊奇的事”，需要 -ing 形容词；amaze 词尾的 e 要处理。",
      "contextRequired": false
    },
    {
      "id": "company",
      "source": "ns25",
      "number": "第37题",
      "tag": "上下文特指",
      "stem": "AI is the main technology behind {{blank}} company.",
      "prompt": "",
      "answers": [
        "the"
      ],
      "steps": [
        {
          "id": "company-has",
          "title": "看提示词",
          "prompt": "括号里有没有提示词？",
          "options": [
            {
              "text": "有提示词，先认它的词性",
              "correct": false,
              "feedback": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。"
            },
            {
              "text": "没有提示词，走无提示词通道",
              "correct": true,
              "feedback": "先确认题目有没有给词；给词不代表一定改变词形。"
            }
          ],
          "explain": "先确认题目有没有给词；给词不代表一定改变词形。",
          "hint": "看空格旁边有没有括号及括号里的单词。不要把原句中普通的词当成提示词。",
          "clues": []
        },
        {
          "id": "company-N1",
          "title": "N1 看连接",
          "prompt": "目标空本身是在连接两个句子，或两个并列成分吗？",
          "options": [
            {
              "text": "否",
              "correct": true,
              "feedback": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
            },
            {
              "text": "是",
              "correct": false,
              "feedback": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。"
            }
          ],
          "explain": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。",
          "hint": "分别看目标空两边。判断的是这个空的作用，不是句中其他连接词的作用。",
          "clues": [],
          "conclusion": "先看目标空两侧的结构，不是看到句子里有逗号就填连词。"
        },
        {
          "id": "company-N2",
          "title": "N2 看名词短语",
          "prompt": "company 是可数名词单数，前面是否缺少限定词？",
          "options": [
            {
              "text": "是",
              "correct": true,
              "feedback": "空格前 behind 是介词；空后 company 这个名词短语仍需限定。"
            },
            {
              "text": "否",
              "correct": false,
              "feedback": "不要看到前面有 behind 就再填一个介词；看后面的 company。"
            }
          ],
          "explain": "空格前 behind 是介词；空后 company 这个名词短语仍需限定。",
          "hint": "不要看到前面有 behind 就再填一个介词；看后面的 company。",
          "clues": [
            "company",
            "behind"
          ],
          "conclusion": "空格前 behind 是介词；空后 company 这个名词短语仍需限定。"
        },
        {
          "id": "company-context",
          "title": "回前文确定所指",
          "prompt": "前文刚介绍 DeepSeek，这里的 company 指的是哪一家？",
          "options": [
            {
              "text": "任意一家没提过的公司",
              "correct": false,
              "feedback": "打开上下文，寻找 company 是否已经被介绍。"
            },
            {
              "text": "前文已经介绍的那家公司",
              "correct": true,
              "feedback": "这里再次指向前文已经介绍的 DeepSeek 公司，应选定冠词。"
            },
            {
              "text": "无法指代，因为 company 是不可数名词",
              "correct": false,
              "feedback": "打开上下文，寻找 company 是否已经被介绍。"
            }
          ],
          "explain": "这里再次指向前文已经介绍的 DeepSeek 公司，应选定冠词。",
          "hint": "打开上下文，寻找 company 是否已经被介绍。",
          "clues": [
            "company"
          ]
        }
      ],
      "translation": "人工智能是这家公司背后的主要技术。",
      "reason": "前文已介绍 DeepSeek，这里 company 再次指代同一家公司，使用 the。",
      "formHint": "特指前文介绍过的那家公司，使用定冠词。",
      "context": "DeepSeek is a technology company that has recently burst onto the scene. Since it started, the company has created many new products that make our lives easier.",
      "vocab": [
        [
          "behind",
          "在……背后"
        ],
        [
          "main",
          "主要的"
        ]
      ],
      "challenge": true,
      "clues": [
        "company"
      ],
      "answerHints": {
        "a": "这不是首次介绍任意一家公司；前文已经说过 DeepSeek。",
        "an": "先判断这里是特指，再检查冠词；不要只按“单数前加 a/an”处理。"
      },
      "caseSensitive": false,
      "scene": "认识DeepSeek",
      "checkHint": "前文已经介绍 DeepSeek，company 再次指同一家公司。",
      "contextRequired": true
    }
  ],
  "note": "原题摘句用于逐空训练；非目标空需要时已用原解析答案补全。省略部分以 … 标出；中文提示、判断选项与解析路线为教学编写。原资料为网络整理卷，模拟题单独标注，不冒称中考真题。"
};
