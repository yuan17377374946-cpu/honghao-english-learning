const questions=[
  {
    "source": "2023湖南湘潭中考",
    "url": "https://zy.21cnjy.com/19925358",
    "given": "直角三角形ABC的直角在A，AD垂直于斜边BC，D为垂足。①证明△ABD与△CBA相似；②已知AB=6、BC=10，计算BD。",
    "p": {
      "A": [
        3.6,
        4.8
      ],
      "B": [
        0,
        0
      ],
      "C": [
        10,
        0
      ],
      "D": [
        3.6,
        0
      ]
    },
    "edges": [
      "AB",
      "BC",
      "CA",
      "AD"
    ],
    "steps": [
      {
        "text": "AD⊥BC，故∠ADB=90°；∠CAB=90°。同时，BD与BC在同一射线上，所以∠ABD=∠CBA。",
        "pair": null
      },
      {
        "text": "两角分别相等，△ABD∼△CBA。对应顺序：A↔C，B↔B，D↔A。",
        "pair": [
          "ABD",
          "CBA"
        ]
      },
      {
        "text": "由对应边成比例：BD/BA=AB/BC。代入BD/6=6/10，解得BD=18/5=3.6。",
        "pair": [
          "ABD",
          "CBA"
        ]
      }
    ],
    "aux": [],
    "labels": [
      [
        "AB",
        "6",
        0,
        -18,
        4
      ],
      [
        "BC",
        "10",
        0,
        0,
        25
      ],
      [
        "BD",
        "3.6",
        3,
        0,
        -15
      ]
    ],
    "right": [
      [
        "B",
        "A",
        "C",
        0
      ],
      [
        "A",
        "D",
        "B",
        0
      ]
    ]
  },
  {
    "source": "2013江苏无锡中考",
    "url": "https://m.qingguo.com/topic/detail/171171.html",
    "given": "梯形ABCD中，上、下底AD与BC平行，AD=1，BC=4。两条对角线AC、BD交于O。求△AOD与△BOC的面积比。",
    "p": {
      "A": [
        1.5,
        3
      ],
      "B": [
        0,
        0
      ],
      "C": [
        4,
        0
      ],
      "D": [
        2.5,
        3
      ],
      "O": [
        2,
        2.4
      ]
    },
    "edges": [
      "AB",
      "BC",
      "CD",
      "DA",
      "AC",
      "BD"
    ],
    "steps": [
      {
        "text": "AD∥BC，所以∠ADO=∠CBO，∠DAO=∠BCO，两组均为内错角。",
        "pair": null
      },
      {
        "text": "由两角相等可得△AOD∼△COB，且相似比AD/CB=1/4。",
        "pair": [
          "AOD",
          "COB"
        ]
      },
      {
        "text": "相似三角形面积之比等于相似比的平方，所以S△AOD∶S△BOC=1∶16。",
        "pair": [
          "AOD",
          "COB"
        ]
      }
    ],
    "aux": [],
    "labels": [
      [
        "AD",
        "1",
        0,
        0,
        -20
      ],
      [
        "BC",
        "4",
        0,
        0,
        25
      ]
    ],
    "right": []
  },
  {
    "source": "2023山东菏泽中考 · 第（1）问",
    "url": "https://jx.panqjy.cn/doc-17007638.html",
    "given": "矩形ABCD中，E在DC上，F在BC上，AE与DF垂直，相交于G。请证明△ADE∼△DCF。本题只做原题第（1）问。",
    "p": {
      "A": [
        0,
        4
      ],
      "B": [
        0,
        0
      ],
      "C": [
        6,
        0
      ],
      "D": [
        6,
        4
      ],
      "E": [
        6,
        2
      ],
      "F": [
        4.666666666666667,
        0
      ],
      "G": [
        5.4,
        2.2
      ]
    },
    "edges": [
      "AB",
      "BC",
      "CD",
      "DA",
      "AE",
      "DF"
    ],
    "steps": [
      {
        "text": "矩形的相邻边互相垂直，E在DC上、F在BC上，所以∠ADE=∠DCF=90°。",
        "pair": null
      },
      {
        "text": "AE⊥DF，所以∠DAE+∠ADF=90°。矩形中AD⊥DC，所以∠CDF+∠ADF=90°。同角的余角相等，故∠DAE=∠CDF。",
        "pair": null
      },
      {
        "text": "由∠ADE=∠DCF、∠DAE=∠CDF，可得△ADE∼△DCF。对应顶点：A↔D，D↔C，E↔F。",
        "pair": [
          "ADE",
          "DCF"
        ]
      }
    ],
    "aux": [],
    "labels": [],
    "right": [
      [
        "A",
        "D",
        "E",
        0
      ],
      [
        "D",
        "C",
        "F",
        0
      ],
      [
        "A",
        "G",
        "D",
        0
      ]
    ]
  },
  {
    "source": "2022山东东营中考",
    "url": "https://zy.21cnjy.com/19925358",
    "given": "△ABC内接矩形EFGH，E、H分别在AB、AC上，F、G在BC上，且EH=2EF。已知BC=8，A到BC的高AD=6，求EH。",
    "p": {
      "A": [
        2,
        6
      ],
      "B": [
        0,
        0
      ],
      "C": [
        8,
        0
      ],
      "D": [
        2,
        0
      ],
      "E": [
        0.8,
        2.4
      ],
      "F": [
        0.8,
        0
      ],
      "G": [
        5.6,
        0
      ],
      "H": [
        5.6,
        2.4
      ],
      "K": [
        2,
        2.4
      ]
    },
    "edges": [
      "AB",
      "BC",
      "CA",
      "AD",
      "EF",
      "FG",
      "GH",
      "HE"
    ],
    "steps": [
      {
        "text": "设EH=x，则EF=x/2。令K为AD与EH的交点。EH∥BC，矩形两条平行边之间的距离相等，所以DK=EF=x/2。",
        "pair": null
      },
      {
        "text": "AK=AD−DK=6−x/2。由EH∥BC，可得△AEH∼△ABC。对应高的比也等于相似比，因此EH/BC=AK/AD。",
        "pair": [
          "AEH",
          "ABC"
        ]
      },
      {
        "text": "代入x/8=(6−x/2)/6。交叉相乘：6x=48−4x，所以10x=48，EH=4.8。",
        "pair": [
          "AEH",
          "ABC"
        ]
      }
    ],
    "aux": [
      [
        "DK",
        1
      ]
    ],
    "labels": [
      [
        "BC",
        "8",
        0,
        0,
        25
      ],
      [
        "AD",
        "6",
        0,
        25,
        0
      ],
      [
        "EH",
        "x",
        1,
        0,
        -17
      ],
      [
        "EF",
        "x/2",
        1,
        -22,
        0
      ]
    ],
    "right": [
      [
        "A",
        "D",
        "B",
        0
      ],
      [
        "E",
        "F",
        "G",
        0
      ],
      [
        "F",
        "G",
        "H",
        0
      ]
    ]
  },
  {
    "source": "2023山东东营中考",
    "url": "https://gd.zggdsq.com/doc/3852.html",
    "given": "等边△ABC中，D在BC上，E在AB上，并且∠ADE=60°。已知BD=4DC，DE=2.4，求AD。",
    "p": {
      "A": [
        2.5,
        4.330127018922193
      ],
      "B": [
        0,
        0
      ],
      "C": [
        5,
        0
      ],
      "D": [
        4,
        0
      ],
      "E": [
        0.4,
        0.6928203230275509
      ]
    },
    "edges": [
      "AB",
      "BC",
      "CA",
      "AD",
      "DE"
    ],
    "steps": [
      {
        "text": "等边三角形中，∠DBE=∠ACD=60°，BC=AC。D在BC上，因此∠BDE+∠ADE+∠ADC=180°。",
        "pair": null
      },
      {
        "text": "代入∠ADE=60°，得∠BDE=120°−∠ADC。又△ACD中，∠CAD=120°−∠ADC，所以∠BDE=∠CAD。",
        "pair": null
      },
      {
        "text": "两角分别相等，△BDE∼△CAD。对应：B↔C，D↔A，E↔D。因此BD/CA=DE/AD。",
        "pair": [
          "BDE",
          "CAD"
        ]
      },
      {
        "text": "BD=4DC，BC=5DC=AC，所以BD/CA=4/5。故2.4/AD=4/5，解得AD=3。",
        "pair": [
          "BDE",
          "CAD"
        ]
      }
    ],
    "aux": [],
    "labels": [
      [
        "DE",
        "2.4",
        0,
        -20,
        -10
      ],
      [
        "AD",
        "3",
        4,
        23,
        0
      ]
    ],
    "right": []
  },
  {
    "source": "2023年湖南常德中考 · 第15题 · 独立复测",
    "url": "https://www.yeyulingfeng.com/wendang/345985.html",
    "given": "在Rt△ABC中，∠ABC=90°，AB=8，BC=6。旋转前D在AB上，AD=2，DE∥BC交AC于E。将△ADE绕A顺时针旋转到图示位置，求旋转后BD/CE的值。",
    "p": {
      "A": [
        0,
        0
      ],
      "B": [
        8,
        0
      ],
      "C": [
        8,
        6
      ],
      "D": [
        1.2855752193730787,
        -1.532088886237956
      ],
      "E": [
        2.434641884051546,
        -0.5679074717081469
      ]
    },
    "edges": [
      "AB",
      "BC",
      "CA",
      "AD",
      "AE",
      "DE",
      "BD",
      "CE"
    ],
    "review": true,
    "steps": [
      {
        "text": "∠ABC=90°，由勾股定理，AC=√(8²+6²)=10。",
        "pair": null
      },
      {
        "text": "旋转前DE∥BC，所以△ADE∼△ABC，AD/AE=AB/AC=8/10=4/5。<br>旋转不改变AD、AE的长度，因此旋转后这个边比仍然成立。若需要核对，AE=2÷(4/5)=2.5。",
        "pair": null
      },
      {
        "text": "AB转到AD与AC转到AE，转过的是同一个角，因此∠DAB=∠EAC。这个夹角正好夹在上述两组对应边之间。",
        "pair": null
      },
      {
        "text": "AD/AE=AB/AC，且∠DAB=∠EAC，所以△ADB∼△AEC（SAS）。<b>A↔A、D↔E、B↔C。</b>",
        "pair": [
          "ADB",
          "AEC"
        ]
      },
      {
        "text": "DB对应EC，故DB/EC=AB/AC=8/10。<span class=\"answer\">BD/CE=4/5。</span>",
        "pair": [
          "ADB",
          "AEC"
        ]
      }
    ],
    "aux": [],
    "extra": [],
    "labels": [
      [
        "AB",
        "8",
        0,
        0,
        23
      ],
      [
        "BC",
        "6",
        0,
        26,
        0
      ],
      [
        "AD",
        "2",
        0,
        -24,
        -8
      ],
      [
        "AC",
        "10",
        1,
        -22,
        -12
      ],
      [
        "AE",
        "2.5",
        2,
        0,
        27
      ]
    ],
    "right": [
      [
        "A",
        "B",
        "C",
        0
      ],
      [
        "A",
        "D",
        "E",
        0
      ]
    ]
  },
  {
    "source": "2023浙江嘉兴、舟山中考 · 第9题",
    "url": "https://zhekaotong.cn/papers/2e8768ea-c6fc-4662-9543-f1698feac62d",
    "given": "P是△ABC的重心，D是AC的中点。过P作PE∥AC交BC于E，过D作DF∥BC交直线EP于F。四边形CDFE面积为6，求△ABC的面积。",
    "p": {
      "A": [
        0,
        6
      ],
      "B": [
        6,
        0
      ],
      "C": [
        0,
        0
      ],
      "D": [
        0,
        3
      ],
      "P": [
        2,
        2
      ],
      "E": [
        2,
        0
      ],
      "F": [
        2,
        3
      ]
    },
    "edges": [
      "AB",
      "BC",
      "CA",
      "PE",
      "EF",
      "DF"
    ],
    "steps": [
      {
        "text": "连接BD。因为P是重心，D是AC的中点，所以B、P、D共线，BP∶PD=2∶1。设S△BCD=T，则S△ABC=2T。",
        "pair": null
      },
      {
        "text": "PE∥CD，故△BEP∼△BCD，BP/BD=2/3，面积比为4/9。所以S△BEP=4T/9。",
        "pair": [
          "BEP",
          "BCD"
        ]
      },
      {
        "text": "DF∥BE，故△PBE∼△PDF，PB/PD=2，面积比为4。因此S△PDF=T/9。",
        "pair": [
          "PBE",
          "PDF"
        ]
      },
      {
        "text": "四边形CDFE可看成△BCD减去△BEP，再加上△PDF，所以6=T−4T/9+T/9=2T/3。得T=9，S△ABC=18。",
        "pair": null
      }
    ],
    "aux": [
      [
        "BD",
        1
      ]
    ],
    "labels": [],
    "right": []
  },
  {
    "source": "2023年四川成都中考 · B卷第26题（1） · 独立复测",
    "url": "https://jx.panqjy.cn/doc-15876023.html",
    "given": "在等腰直角△ABC中，∠C=90°。D是斜边AB的中点，E在AC内部，DE⊥DF，F在线段BC上。证明AE+BF=(√2/2)AB。只取原题n=1时的第（1）问。",
    "p": {
      "A": [
        0,
        6
      ],
      "B": [
        6,
        0
      ],
      "C": [
        0,
        0
      ],
      "D": [
        3,
        3
      ],
      "E": [
        0,
        2
      ],
      "F": [
        4,
        0
      ]
    },
    "edges": [
      "AB",
      "BC",
      "CA",
      "DE",
      "DF"
    ],
    "review": true,
    "steps": [
      {
        "text": "n=1，AD=DB，所以D是斜边AB的中点。连接CD。等腰直角△ABC中，CD⊥AB，AD=CD，∠DAE=∠DCF=45°。",
        "pair": null
      },
      {
        "text": "四边形CEDF中，∠ECF=∠EDF=90°，是一组互补的对角。又AD⊥CD，DE⊥DF，图中锐角∠ADE=∠CDF（两边分别垂直）。",
        "pair": null
      },
      {
        "text": "∠DAE=∠DCF，AD=CD，∠ADE=∠CDF，因此<span class=\"answer\">△ADE≌△CDF（ASA）。</span>这是相似比为1的特殊情形。",
        "pair": [
          "ADE",
          "CDF"
        ]
      },
      {
        "text": "由全等可得AE=CF。E在AC上运动时，图示构型中F位于BC上，因此<b>AE+BF=CF+BF=BC。</b>",
        "pair": [
          "ADE",
          "CDF"
        ]
      },
      {
        "text": "等腰直角△ABC中，AB=√2BC，所以BC=(√2/2)AB。<span class=\"answer\">AE+BF=(√2/2)AB，得证。</span>端点位置可由F与B或C重合直接核对。",
        "pair": [
          "ADE",
          "CDF"
        ]
      }
    ],
    "aux": [
      [
        "CD",
        1
      ]
    ],
    "extra": [],
    "labels": [
      [
        "AD",
        "AD=CD",
        1,
        24,
        -12
      ],
      [
        "AE",
        "AE=CF",
        4,
        -32,
        0
      ]
    ],
    "right": [
      [
        "A",
        "C",
        "B",
        0
      ],
      [
        "E",
        "D",
        "F",
        0
      ],
      [
        "A",
        "D",
        "C",
        1
      ]
    ]
  }
];
