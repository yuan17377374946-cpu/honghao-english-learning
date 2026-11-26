window.WORD_FORMS_DATA={
  "version": "2026-11-26-wf1",
  "cats": [
    {
      "id": "verb",
      "title": "动词",
      "desc": "三单、过去式、过去分词、-ing、原形与不定式"
    },
    {
      "id": "noun",
      "title": "名词",
      "desc": "单复数、不可数名词与所有格"
    },
    {
      "id": "degree",
      "title": "形容词与副词",
      "desc": "比较等级与形容词变副词"
    },
    {
      "id": "pronoun",
      "title": "代词",
      "desc": "宾格、物主代词与反身代词"
    },
    {
      "id": "number",
      "title": "数词",
      "desc": "基数词变序数词"
    },
    {
      "id": "family",
      "title": "词性转换",
      "desc": "按意思记常见词族"
    }
  ],
  "rules": {
    "base": {
      "id": "base",
      "cat": "verb",
      "group": "原形与不定式",
      "label": "保留动词原形",
      "text": "情态动词后用动词原形；do / does / did 后的实义动词也用原形。",
      "example": "can play；does not study",
      "pool": "base"
    },
    "inf": {
      "id": "inf",
      "cat": "verb",
      "group": "原形与不定式",
      "label": "to ＋动词原形",
      "text": "本题要求不定式结构，要保留 to。句中见到 to，仍要判断它是否是不定式标记。",
      "example": "hope to visit",
      "pool": "base"
    },
    "vs": {
      "id": "vs",
      "cat": "verb",
      "group": "第三人称单数",
      "label": "直接加 -s",
      "text": "一般动词直接加 -s；元音字母＋y 结尾也直接加 -s。",
      "example": "read → reads；enjoy → enjoys",
      "pool": "vs"
    },
    "ves": {
      "id": "ves",
      "cat": "verb",
      "group": "第三人称单数",
      "label": "常见词尾加 -es",
      "text": "常见以 s、x、ch、sh、o 结尾的动词，三单加 -es。",
      "example": "finish → finishes；go → goes",
      "pool": "vs"
    },
    "vy": {
      "id": "vy",
      "cat": "verb",
      "group": "第三人称单数",
      "label": "辅音字母＋y → -ies",
      "text": "辅音字母＋y 结尾：改 y 为 i，再加 -es。元音字母＋y 结尾直接加 -s。",
      "example": "carry → carries；stay → stays",
      "pool": "vs"
    },
    "vhas": {
      "id": "vhas",
      "cat": "verb",
      "group": "第三人称单数",
      "label": "不规则三单，单独记",
      "text": "少量常用动词的三单需要单独记忆。be 的现在时还要按主语选择。",
      "example": "have → has；he is",
      "pool": "vs"
    },
    "ed": {
      "id": "ed",
      "cat": "verb",
      "group": "过去式与过去分词",
      "label": "直接加 -ed",
      "text": "一般规则动词加 -ed。规则动词的过去式与过去分词通常同形。",
      "example": "help → helped",
      "pool": "past"
    },
    "d": {
      "id": "d",
      "cat": "verb",
      "group": "过去式与过去分词",
      "label": "词尾 e，只加 -d",
      "text": "规则动词以 e 结尾时，直接加 -d。",
      "example": "love → loved",
      "pool": "past"
    },
    "ied": {
      "id": "ied",
      "cat": "verb",
      "group": "过去式与过去分词",
      "label": "辅音字母＋y → -ied",
      "text": "辅音字母＋y 结尾，改 y 为 i 再加 -ed；元音字母＋y 通常直接加 -ed。",
      "example": "carry → carried；enjoy → enjoyed",
      "pool": "past"
    },
    "ded": {
      "id": "ded",
      "cat": "verb",
      "group": "过去式与过去分词",
      "label": "符合条件，双写再加 -ed",
      "text": "末尾是重读闭音节，结尾为一个元音字母＋一个辅音字母，通常双写末尾辅音再加词尾；w、x、y 通常不双写。",
      "example": "drop → dropped；fix → fixed",
      "pool": "past"
    },
    "past": {
      "id": "past",
      "cat": "verb",
      "group": "过去式与过去分词",
      "label": "不规则过去式，单独记",
      "text": "这里需要过去式；不要与过去分词混淆，也不能机械加 -ed。",
      "example": "see → saw → seen",
      "pool": "past"
    },
    "pp": {
      "id": "pp",
      "cat": "verb",
      "group": "过去式与过去分词",
      "label": "不规则过去分词，单独记",
      "text": "这里需要过去分词，它可能与过去式不同。被动结构中的形式要单独核对。",
      "example": "see → saw → seen；be seen",
      "pool": "past"
    },
    "ing": {
      "id": "ing",
      "cat": "verb",
      "group": "-ing 形式",
      "label": "直接加 -ing",
      "text": "一般直接加 -ing；词尾 w、x、y 通常不双写。see 的 ee 和 be 的 e 要保留，直接加 -ing。",
      "example": "read → reading；fix → fixing",
      "pool": "ing"
    },
    "inge": {
      "id": "inge",
      "cat": "verb",
      "group": "-ing 形式",
      "label": "去不发音的 e，再加 -ing",
      "text": "词尾是不发音的 e 时，通常先去 e 再加 -ing。不要把发音的元音字母也删掉。",
      "example": "make → making",
      "pool": "ing"
    },
    "ding": {
      "id": "ding",
      "cat": "verb",
      "group": "-ing 形式",
      "label": "符合条件，双写再加 -ing",
      "text": "末尾是重读闭音节，结尾为一个元音字母＋一个辅音字母，通常双写末尾辅音再加 -ing；w、x、y 通常不双写。",
      "example": "sit → sitting；fix → fixing",
      "pool": "ing"
    },
    "ie": {
      "id": "ie",
      "cat": "verb",
      "group": "-ing 形式",
      "label": "ie 改成 y，再加 -ing",
      "text": "常见 ie 结尾的动词先把 ie 改为 y，再加 -ing。",
      "example": "tie → tying",
      "pool": "ing"
    },
    "ns": {
      "id": "ns",
      "cat": "noun",
      "group": "名词复数",
      "label": "直接加 -s",
      "text": "一般可数名词加 -s；元音字母＋y 结尾也直接加 -s。",
      "example": "book → books；toy → toys",
      "pool": "np"
    },
    "nes": {
      "id": "nes",
      "cat": "noun",
      "group": "名词复数",
      "label": "常见词尾加 -es",
      "text": "常见以 s、x、ch、sh 等结尾的名词，复数加 -es。",
      "example": "bus → buses；dish → dishes",
      "pool": "np"
    },
    "ny": {
      "id": "ny",
      "cat": "noun",
      "group": "名词复数",
      "label": "辅音字母＋y → -ies",
      "text": "辅音字母＋y 结尾，改 y 为 i 再加 -es。元音字母＋y 结尾直接加 -s。",
      "example": "baby → babies；toy → toys",
      "pool": "np"
    },
    "vesn": {
      "id": "vesn",
      "cat": "noun",
      "group": "名词复数",
      "label": "部分 f / fe → -ves",
      "text": "有些 f / fe 结尾的名词改成 -ves，要记具体词；其他词可能直接加 -s。",
      "example": "life → lives；belief → beliefs",
      "pool": "np"
    },
    "oes": {
      "id": "oes",
      "cat": "noun",
      "group": "名词复数",
      "label": "这个 o 结尾的词加 -es",
      "text": "部分 o 结尾的常用名词加 -es，不能推广到所有 o 结尾的词。",
      "example": "tomato → tomatoes",
      "pool": "np"
    },
    "ni": {
      "id": "ni",
      "cat": "noun",
      "group": "名词复数",
      "label": "不规则复数，单独记",
      "text": "本题的名词复数是不规则形式，不能直接在单数后加 -s。",
      "example": "person → people；mouse → mice",
      "pool": "np"
    },
    "same": {
      "id": "same",
      "cat": "noun",
      "group": "名词复数",
      "label": "单复数同形",
      "text": "有些可数名词的单数、复数拼写相同，数量要结合句子判断。",
      "example": "sheep → sheep",
      "pool": "np"
    },
    "uncount": {
      "id": "uncount",
      "cat": "noun",
      "group": "不可数名词",
      "label": "保持不可数名词的形式",
      "text": "本题中的名词不可数，不能因为 some 表示一些就直接加 -s。数量可借助 a piece of 等表达。",
      "example": "some advice；two pieces of information",
      "pool": "np"
    },
    "poss": {
      "id": "poss",
      "cat": "noun",
      "group": "所有格",
      "label": "单数名词后加 ’s",
      "text": "表示单数对象的所属，通常在名词后加 ’s。",
      "example": "the girl’s bike",
      "pool": "poss"
    },
    "possp": {
      "id": "possp",
      "cat": "noun",
      "group": "所有格",
      "label": "先变复数，再在 s 后加 ’",
      "text": "表示多个对象的所属：先写出以 s 结尾的复数，再在 s 后加撇号。",
      "example": "the girls’ bikes",
      "pool": "poss"
    },
    "possi": {
      "id": "possi",
      "cat": "noun",
      "group": "所有格",
      "label": "不以 s 结尾的复数加 ’s",
      "text": "先写出不规则复数；复数不以 s 结尾时，所有格仍加 ’s。",
      "example": "the men’s room",
      "pool": "poss"
    },
    "er": {
      "id": "er",
      "cat": "degree",
      "group": "比较级与最高级",
      "label": "较短的词加 -er / -est",
      "text": "本题的词较短，比较级加 -er，最高级加 -est，先确认要求的是哪种。",
      "example": "tall → taller → tallest",
      "pool": "deg"
    },
    "re": {
      "id": "re",
      "cat": "degree",
      "group": "比较级与最高级",
      "label": "词尾 e：只加 -r / -st",
      "text": "词尾已有 e，比较级只加 -r，最高级只加 -st，不要重复写 e。",
      "example": "nice → nicer → nicest",
      "pool": "deg"
    },
    "ry": {
      "id": "ry",
      "cat": "degree",
      "group": "比较级与最高级",
      "label": "改 y 为 i，再加词尾",
      "text": "这类常见辅音字母＋y 结尾的形容词，改 y 为 i，再加 -er / -est。",
      "example": "easy → easier → easiest",
      "pool": "deg"
    },
    "rd": {
      "id": "rd",
      "cat": "degree",
      "group": "比较级与最高级",
      "label": "符合条件，双写再加词尾",
      "text": "本题是单音节短词，以一个元音字母＋一个辅音字母结尾，双写末尾辅音再加 -er / -est。",
      "example": "hot → hotter → hottest",
      "pool": "deg"
    },
    "more": {
      "id": "more",
      "cat": "degree",
      "group": "比较级与最高级",
      "label": "前面加 more / most",
      "text": "本题用 more / most 构成比较等级，保留原词；如果目标需要副词，先把形容词变副词。",
      "example": "more beautiful；most carefully",
      "pool": "deg"
    },
    "ri": {
      "id": "ri",
      "cat": "degree",
      "group": "比较级与最高级",
      "label": "不规则比较等级，单独记",
      "text": "本题的比较等级需要单独记，不能机械加 -er / -est 或 more。",
      "example": "good / well → better → best；bad → worse → worst",
      "pool": "deg"
    },
    "ly": {
      "id": "ly",
      "cat": "degree",
      "group": "形容词变副词",
      "label": "直接加 -ly",
      "text": "本题把形容词变成副词，直接加 -ly。",
      "example": "slow → slowly",
      "pool": "adv"
    },
    "ily": {
      "id": "ily",
      "cat": "degree",
      "group": "形容词变副词",
      "label": "改 y 为 i，再加 -ly",
      "text": "这类常见辅音字母＋y 结尾的形容词，改 y 为 i，再加 -ly。",
      "example": "easy → easily",
      "pool": "adv"
    },
    "le": {
      "id": "le",
      "cat": "degree",
      "group": "形容词变副词",
      "label": "这个 -le 词尾改成 -ly",
      "text": "这类常见形容词变副词时，把词尾的 e 改成 y。",
      "example": "gentle → gently",
      "pool": "adv"
    },
    "well": {
      "id": "well",
      "cat": "degree",
      "group": "形容词变副词",
      "label": "特殊副词形式，单独记",
      "text": "本题对应的副词需要单独记，不能机械在形容词后加 -ly。",
      "example": "good → well",
      "pool": "adv"
    },
    "asame": {
      "id": "asame",
      "cat": "degree",
      "group": "形容词变副词",
      "label": "形容词、副词同形",
      "text": "本题的形容词和对应副词同形；加 -ly 可能变成意思不同的另一个词。",
      "example": "fast → fast；hard＝努力地；hardly＝几乎不",
      "pool": "adv"
    },
    "true": {
      "id": "true",
      "cat": "degree",
      "group": "形容词变副词",
      "label": "这个词去 e，再加 -ly",
      "text": "true 的副词先去掉 e 再加 -ly，这个拼写单独记，不推广到所有 e 结尾的形容词。",
      "example": "true → truly",
      "pool": "adv"
    },
    "obj": {
      "id": "obj",
      "cat": "pronoun",
      "group": "代词形式",
      "label": "用人称代词宾格",
      "text": "常用在动词或介词后，表示动作指向的对象。",
      "example": "he → him；give him a book",
      "pool": "pro"
    },
    "det": {
      "id": "det",
      "cat": "pronoun",
      "group": "代词形式",
      "label": "用形容词性物主代词",
      "text": "表示所属，后面还直接接名词。",
      "example": "he → his；his book",
      "pool": "pro"
    },
    "ind": {
      "id": "ind",
      "cat": "pronoun",
      "group": "代词形式",
      "label": "用名词性物主代词",
      "text": "表示所属，后面不再直接带被所属的名词。",
      "example": "my book → mine",
      "pool": "pro"
    },
    "self": {
      "id": "self",
      "cat": "pronoun",
      "group": "代词形式",
      "label": "用反身代词",
      "text": "这里表达某人自己；动作指向与主语同一人时常用反身代词，还要分清单复数。",
      "example": "he → himself；we → ourselves",
      "pool": "pro"
    },
    "th": {
      "id": "th",
      "cat": "number",
      "group": "序数词",
      "label": "一般加 -th",
      "text": "一般基数词变序数词时加 -th；常见例外要另记。",
      "example": "four → fourth；six → sixth",
      "pool": "num"
    },
    "123": {
      "id": "123",
      "cat": "number",
      "group": "序数词",
      "label": "一、二、三单独记",
      "text": "one、two、three 的序数词是不规则形式，不能直接加 -th。",
      "example": "one → first；two → second；three → third",
      "pool": "num"
    },
    "512": {
      "id": "512",
      "cat": "number",
      "group": "序数词",
      "label": "五、十二变词尾再加 -th",
      "text": "five、twelve 的词尾 ve 变成 f，再加 -th。",
      "example": "five → fifth；twelve → twelfth",
      "pool": "num"
    },
    "89": {
      "id": "89",
      "cat": "number",
      "group": "序数词",
      "label": "八、九的特殊拼写",
      "text": "eight 已有 t，只补 h；nine 去掉 e 后加 -th。",
      "example": "eight → eighth；nine → ninth",
      "pool": "num"
    },
    "ty": {
      "id": "ty",
      "cat": "number",
      "group": "序数词",
      "label": "整十 -ty → -tieth",
      "text": "整十的基数词变序数词，把词尾 -ty 改成 -tieth。",
      "example": "thirty → thirtieth",
      "pool": "num"
    },
    "compound": {
      "id": "compound",
      "cat": "number",
      "group": "序数词",
      "label": "几十几通常只变个位",
      "text": "十位仍用基数词，个位变为序数词，通常保留连字符。",
      "example": "twenty-two → twenty-second",
      "pool": "num"
    },
    "fn": {
      "id": "fn",
      "cat": "family",
      "group": "常见词族",
      "label": "按词族写出名词",
      "text": "目标需要名词。名词词尾并不统一，记具体词族，不把所有词都加相同后缀。",
      "example": "develop → development；decide → decision",
      "pool": "fam"
    },
    "fa": {
      "id": "fa",
      "cat": "family",
      "group": "常见词族",
      "label": "按意思写出形容词",
      "text": "结合目标意思写具体词族，-ful、-less、-ous、-y 等不能随意互换。",
      "example": "care → careful / careless；danger → dangerous",
      "pool": "fam"
    },
    "fing": {
      "id": "fing",
      "cat": "family",
      "group": "常见词族",
      "label": "表示令人……的形容词",
      "text": "本题描述令人产生感受的特点，使用这一词族的 -ing 形容词。按含义判断，不机械分人和物。",
      "example": "interest → interesting",
      "pool": "emotion"
    },
    "fed": {
      "id": "fed",
      "cat": "family",
      "group": "常见词族",
      "label": "表示感到……的形容词",
      "text": "本题描述感到怎样，使用这一词族的 -ed 形容词。仍要结合具体含义。",
      "example": "interest → interested",
      "pool": "emotion"
    }
  },
  "kinds": {
    "base": "动词原形",
    "third": "动词第三人称单数",
    "past": "过去式",
    "pp": "过去分词",
    "ing": "-ing 形式",
    "inf": "to ＋动词原形",
    "plural": "名词复数",
    "uncount": "不可数名词的形式",
    "poss": "单数名词所有格",
    "possp": "复数名词所有格",
    "comp": "形容词比较级",
    "super": "形容词最高级",
    "adv": "副词原级",
    "advcomp": "副词比较级",
    "advsuper": "副词最高级",
    "obj": "人称代词宾格",
    "det": "形容词性物主代词",
    "ind": "名词性物主代词",
    "self": "反身代词",
    "ordinal": "序数词",
    "noun": "名词",
    "adj": "形容词"
  },
  "questions": [
    {
      "id": "q1",
      "cat": "verb",
      "kind": "third",
      "root": "play",
      "answers": [
        "plays"
      ],
      "rule": "vs",
      "goal": "动词第三人称单数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "vs",
        "vhas",
        "ves",
        "vy"
      ],
      "formOptions": [
        "past",
        "third",
        "base",
        "inf"
      ],
      "wrong": {}
    },
    {
      "id": "q2",
      "cat": "verb",
      "kind": "third",
      "root": "study",
      "answers": [
        "studies"
      ],
      "rule": "vy",
      "goal": "动词第三人称单数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "vhas",
        "vs",
        "ves",
        "vy"
      ],
      "formOptions": [
        "base",
        "pp",
        "past",
        "third"
      ],
      "wrong": {
        "studys": "study 的 y 前是辅音字母 d，三单不能直接加 s。"
      }
    },
    {
      "id": "q3",
      "cat": "verb",
      "kind": "third",
      "root": "watch",
      "answers": [
        "watches"
      ],
      "rule": "ves",
      "goal": "动词第三人称单数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "vy",
        "vs",
        "ves",
        "vhas"
      ],
      "formOptions": [
        "base",
        "inf",
        "third",
        "pp"
      ],
      "wrong": {}
    },
    {
      "id": "q4",
      "cat": "verb",
      "kind": "third",
      "root": "go",
      "answers": [
        "goes"
      ],
      "rule": "ves",
      "goal": "动词第三人称单数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "vs",
        "vy",
        "ves",
        "vhas"
      ],
      "formOptions": [
        "pp",
        "base",
        "past",
        "third"
      ],
      "wrong": {}
    },
    {
      "id": "q5",
      "cat": "verb",
      "kind": "third",
      "root": "do",
      "answers": [
        "does"
      ],
      "rule": "ves",
      "goal": "动词第三人称单数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ves",
        "vhas",
        "vs",
        "vy"
      ],
      "formOptions": [
        "pp",
        "ing",
        "past",
        "third"
      ],
      "wrong": {}
    },
    {
      "id": "q6",
      "cat": "verb",
      "kind": "third",
      "root": "have",
      "answers": [
        "has"
      ],
      "rule": "vhas",
      "goal": "动词第三人称单数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "vy",
        "vs",
        "vhas",
        "ves"
      ],
      "formOptions": [
        "third",
        "inf",
        "base",
        "ing"
      ],
      "wrong": {}
    },
    {
      "id": "q7",
      "cat": "verb",
      "kind": "third",
      "root": "fix",
      "answers": [
        "fixes"
      ],
      "rule": "ves",
      "goal": "动词第三人称单数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "vhas",
        "vs",
        "ves",
        "vy"
      ],
      "formOptions": [
        "inf",
        "third",
        "past",
        "base"
      ],
      "wrong": {}
    },
    {
      "id": "q8",
      "cat": "verb",
      "kind": "third",
      "root": "wash",
      "answers": [
        "washes"
      ],
      "rule": "ves",
      "goal": "动词第三人称单数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ves",
        "vhas",
        "vy",
        "vs"
      ],
      "formOptions": [
        "base",
        "inf",
        "third",
        "pp"
      ],
      "wrong": {}
    },
    {
      "id": "q9",
      "cat": "verb",
      "kind": "past",
      "root": "clean",
      "answers": [
        "cleaned"
      ],
      "rule": "ed",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ded",
        "ied",
        "ed",
        "past"
      ],
      "formOptions": [
        "ing",
        "past",
        "pp",
        "third"
      ],
      "wrong": {}
    },
    {
      "id": "q10",
      "cat": "verb",
      "kind": "past",
      "root": "live",
      "answers": [
        "lived"
      ],
      "rule": "d",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "d",
        "past",
        "ied",
        "pp"
      ],
      "formOptions": [
        "third",
        "pp",
        "inf",
        "past"
      ],
      "wrong": {}
    },
    {
      "id": "q11",
      "cat": "verb",
      "kind": "past",
      "root": "study",
      "answers": [
        "studied"
      ],
      "rule": "ied",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ied",
        "pp",
        "ed",
        "d"
      ],
      "formOptions": [
        "inf",
        "past",
        "ing",
        "base"
      ],
      "wrong": {
        "studyed": "先把 y 改为 i，再加过去式词尾。"
      }
    },
    {
      "id": "q12",
      "cat": "verb",
      "kind": "past",
      "root": "stop",
      "answers": [
        "stopped"
      ],
      "rule": "ded",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "d",
        "past",
        "ded",
        "ied"
      ],
      "formOptions": [
        "past",
        "ing",
        "pp",
        "inf"
      ],
      "wrong": {
        "stoped": "stop 符合双写条件，检查末尾的 p。"
      }
    },
    {
      "id": "q13",
      "cat": "verb",
      "kind": "past",
      "root": "plan",
      "answers": [
        "planned"
      ],
      "rule": "ded",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "past",
        "d",
        "ded",
        "ed"
      ],
      "formOptions": [
        "inf",
        "base",
        "past",
        "pp"
      ],
      "wrong": {
        "planed": "plan 符合双写条件，检查末尾的 n。"
      }
    },
    {
      "id": "q14",
      "cat": "verb",
      "kind": "past",
      "root": "play",
      "answers": [
        "played"
      ],
      "rule": "ed",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ied",
        "ed",
        "ded",
        "d"
      ],
      "formOptions": [
        "pp",
        "third",
        "past",
        "ing"
      ],
      "wrong": {}
    },
    {
      "id": "q15",
      "cat": "verb",
      "kind": "past",
      "root": "write",
      "answers": [
        "wrote"
      ],
      "rule": "past",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ded",
        "past",
        "ed",
        "d"
      ],
      "formOptions": [
        "ing",
        "third",
        "inf",
        "past"
      ],
      "wrong": {
        "written": "written 是过去分词，本题要求过去式。",
        "writed": "write 是不规则动词，过去式不能直接加 ed。"
      }
    },
    {
      "id": "q16",
      "cat": "verb",
      "kind": "past",
      "root": "go",
      "answers": [
        "went"
      ],
      "rule": "past",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "past",
        "d",
        "pp",
        "ded"
      ],
      "formOptions": [
        "past",
        "base",
        "ing",
        "pp"
      ],
      "wrong": {
        "gone": "gone 是过去分词，本题要求过去式。",
        "goed": "go 是不规则动词，过去式不能直接加 ed。"
      }
    },
    {
      "id": "q17",
      "cat": "verb",
      "kind": "past",
      "root": "do",
      "answers": [
        "did"
      ],
      "rule": "past",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "pp",
        "past",
        "ied",
        "ed"
      ],
      "formOptions": [
        "pp",
        "ing",
        "past",
        "third"
      ],
      "wrong": {}
    },
    {
      "id": "q18",
      "cat": "verb",
      "kind": "past",
      "root": "choose",
      "answers": [
        "chose"
      ],
      "rule": "past",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "d",
        "pp",
        "ied",
        "past"
      ],
      "formOptions": [
        "inf",
        "third",
        "pp",
        "past"
      ],
      "wrong": {
        "chosen": "chosen 是过去分词，本题要求过去式。"
      }
    },
    {
      "id": "q19",
      "cat": "verb",
      "kind": "past",
      "root": "buy",
      "answers": [
        "bought"
      ],
      "rule": "past",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ied",
        "pp",
        "ed",
        "past"
      ],
      "formOptions": [
        "ing",
        "base",
        "inf",
        "past"
      ],
      "wrong": {}
    },
    {
      "id": "q20",
      "cat": "verb",
      "kind": "past",
      "root": "have",
      "answers": [
        "had"
      ],
      "rule": "past",
      "goal": "过去式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "d",
        "past",
        "pp",
        "ded"
      ],
      "formOptions": [
        "past",
        "pp",
        "base",
        "inf"
      ],
      "wrong": {}
    },
    {
      "id": "q21",
      "cat": "verb",
      "kind": "pp",
      "root": "write",
      "answers": [
        "written"
      ],
      "rule": "pp",
      "goal": "过去分词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "past",
        "ied",
        "pp",
        "ed"
      ],
      "formOptions": [
        "pp",
        "past",
        "ing",
        "inf"
      ],
      "wrong": {
        "wrote": "wrote 是过去式，本题要求过去分词。",
        "writed": "write 的过去分词不能直接加 ed。",
        "writen": "检查中间辅音是否写全。"
      }
    },
    {
      "id": "q22",
      "cat": "verb",
      "kind": "pp",
      "root": "go",
      "answers": [
        "gone"
      ],
      "rule": "pp",
      "goal": "过去分词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "pp",
        "past",
        "ied",
        "ded"
      ],
      "formOptions": [
        "pp",
        "base",
        "ing",
        "third"
      ],
      "wrong": {
        "went": "went 是过去式，本题要求过去分词。"
      }
    },
    {
      "id": "q23",
      "cat": "verb",
      "kind": "pp",
      "root": "do",
      "answers": [
        "done"
      ],
      "rule": "pp",
      "goal": "过去分词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ed",
        "d",
        "ied",
        "pp"
      ],
      "formOptions": [
        "past",
        "inf",
        "third",
        "pp"
      ],
      "wrong": {}
    },
    {
      "id": "q24",
      "cat": "verb",
      "kind": "pp",
      "root": "choose",
      "answers": [
        "chosen"
      ],
      "rule": "pp",
      "goal": "过去分词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "past",
        "ded",
        "ied",
        "pp"
      ],
      "formOptions": [
        "inf",
        "base",
        "pp",
        "past"
      ],
      "wrong": {
        "chose": "chose 是过去式，本题要求过去分词。",
        "choosen": "检查这个不规则过去分词中间的元音。"
      }
    },
    {
      "id": "q25",
      "cat": "verb",
      "kind": "pp",
      "root": "buy",
      "answers": [
        "bought"
      ],
      "rule": "pp",
      "goal": "过去分词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ied",
        "pp",
        "d",
        "past"
      ],
      "formOptions": [
        "inf",
        "third",
        "ing",
        "pp"
      ],
      "wrong": {}
    },
    {
      "id": "q26",
      "cat": "verb",
      "kind": "pp",
      "root": "have",
      "answers": [
        "had"
      ],
      "rule": "pp",
      "goal": "过去分词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "past",
        "ded",
        "ed",
        "pp"
      ],
      "formOptions": [
        "ing",
        "inf",
        "past",
        "pp"
      ],
      "wrong": {}
    },
    {
      "id": "q27",
      "cat": "verb",
      "kind": "ing",
      "root": "play",
      "answers": [
        "playing"
      ],
      "rule": "ing",
      "goal": "-ing 形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "inge",
        "ing",
        "ie",
        "ding"
      ],
      "formOptions": [
        "base",
        "inf",
        "third",
        "ing"
      ],
      "wrong": {}
    },
    {
      "id": "q28",
      "cat": "verb",
      "kind": "ing",
      "root": "write",
      "answers": [
        "writing"
      ],
      "rule": "inge",
      "goal": "-ing 形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ie",
        "ding",
        "ing",
        "inge"
      ],
      "formOptions": [
        "ing",
        "past",
        "pp",
        "inf"
      ],
      "wrong": {
        "writeing": "词尾不发音的 e 要先去掉。"
      }
    },
    {
      "id": "q29",
      "cat": "verb",
      "kind": "ing",
      "root": "run",
      "answers": [
        "running"
      ],
      "rule": "ding",
      "goal": "-ing 形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ding",
        "ie",
        "inge",
        "ing"
      ],
      "formOptions": [
        "ing",
        "base",
        "pp",
        "inf"
      ],
      "wrong": {
        "runing": "run 符合双写条件，检查末尾辅音。"
      }
    },
    {
      "id": "q30",
      "cat": "verb",
      "kind": "ing",
      "root": "lie",
      "answers": [
        "lying"
      ],
      "rule": "ie",
      "goal": "-ing 形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ding",
        "ing",
        "inge",
        "ie"
      ],
      "formOptions": [
        "ing",
        "past",
        "inf",
        "pp"
      ],
      "wrong": {
        "lieing": "ie 结尾先改成 y，再加 ing。"
      }
    },
    {
      "id": "q31",
      "cat": "verb",
      "kind": "ing",
      "root": "die",
      "answers": [
        "dying"
      ],
      "rule": "ie",
      "goal": "-ing 形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "inge",
        "ding",
        "ing",
        "ie"
      ],
      "formOptions": [
        "inf",
        "third",
        "base",
        "ing"
      ],
      "wrong": {
        "dieing": "先把 ie 改成 y，再加 ing。"
      }
    },
    {
      "id": "q32",
      "cat": "verb",
      "kind": "ing",
      "root": "see",
      "answers": [
        "seeing"
      ],
      "rule": "ing",
      "goal": "-ing 形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ie",
        "ing",
        "inge",
        "ding"
      ],
      "formOptions": [
        "ing",
        "past",
        "base",
        "pp"
      ],
      "wrong": {
        "seing": "see 的 ee 要保留，不能把发音的元音删掉。"
      }
    },
    {
      "id": "q33",
      "cat": "verb",
      "kind": "ing",
      "root": "stop",
      "answers": [
        "stopping"
      ],
      "rule": "ding",
      "goal": "-ing 形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ding",
        "ing",
        "inge",
        "ie"
      ],
      "formOptions": [
        "ing",
        "base",
        "pp",
        "past"
      ],
      "wrong": {}
    },
    {
      "id": "q34",
      "cat": "verb",
      "kind": "ing",
      "root": "fix",
      "answers": [
        "fixing"
      ],
      "rule": "ing",
      "goal": "-ing 形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ing",
        "inge",
        "ding",
        "ie"
      ],
      "formOptions": [
        "base",
        "ing",
        "past",
        "third"
      ],
      "wrong": {
        "fixxing": "词尾 x 通常不双写。"
      }
    },
    {
      "id": "q35",
      "cat": "verb",
      "kind": "ing",
      "root": "be",
      "answers": [
        "being"
      ],
      "rule": "ing",
      "goal": "-ing 形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ie",
        "ding",
        "inge",
        "ing"
      ],
      "formOptions": [
        "past",
        "pp",
        "ing",
        "base"
      ],
      "wrong": {
        "bing": "be 的 e 要保留。"
      }
    },
    {
      "id": "q36",
      "cat": "verb",
      "kind": "inf",
      "root": "write",
      "answers": [
        "to write"
      ],
      "rule": "inf",
      "goal": "to ＋动词原形",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "base",
        "inf"
      ],
      "formOptions": [
        "inf",
        "ing",
        "past",
        "third"
      ],
      "wrong": {}
    },
    {
      "id": "q37",
      "cat": "verb",
      "kind": "inf",
      "root": "visit",
      "answers": [
        "to visit"
      ],
      "rule": "inf",
      "goal": "to ＋动词原形",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "inf",
        "base"
      ],
      "formOptions": [
        "pp",
        "base",
        "ing",
        "inf"
      ],
      "wrong": {}
    },
    {
      "id": "q38",
      "cat": "verb",
      "kind": "base",
      "root": "play",
      "answers": [
        "play"
      ],
      "rule": "base",
      "goal": "情态动词 can 后的动词形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "inf",
        "base"
      ],
      "formOptions": [
        "inf",
        "past",
        "base",
        "third"
      ],
      "wrong": {}
    },
    {
      "id": "q39",
      "cat": "verb",
      "kind": "base",
      "root": "study",
      "answers": [
        "study"
      ],
      "rule": "base",
      "goal": "情态动词 can 后的动词形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "inf",
        "base"
      ],
      "formOptions": [
        "base",
        "third",
        "ing",
        "past"
      ],
      "wrong": {}
    },
    {
      "id": "q40",
      "cat": "verb",
      "kind": "base",
      "root": "go",
      "answers": [
        "go"
      ],
      "rule": "base",
      "goal": "情态动词 can 后的动词形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "base",
        "inf"
      ],
      "formOptions": [
        "pp",
        "base",
        "inf",
        "past"
      ],
      "wrong": {}
    },
    {
      "id": "q41",
      "cat": "noun",
      "kind": "plural",
      "root": "book",
      "answers": [
        "books"
      ],
      "rule": "ns",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ns",
        "oes",
        "ni",
        "nes"
      ],
      "formOptions": [
        "poss",
        "plural",
        "uncount",
        "possp"
      ],
      "wrong": {}
    },
    {
      "id": "q42",
      "cat": "noun",
      "kind": "plural",
      "root": "box",
      "answers": [
        "boxes"
      ],
      "rule": "nes",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "vesn",
        "ni",
        "ns",
        "nes"
      ],
      "formOptions": [
        "plural",
        "uncount",
        "possp",
        "poss"
      ],
      "wrong": {}
    },
    {
      "id": "q43",
      "cat": "noun",
      "kind": "plural",
      "root": "watch",
      "answers": [
        "watches"
      ],
      "rule": "nes",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ni",
        "ny",
        "nes",
        "oes"
      ],
      "formOptions": [
        "plural",
        "uncount",
        "possp",
        "poss"
      ],
      "wrong": {}
    },
    {
      "id": "q44",
      "cat": "noun",
      "kind": "plural",
      "root": "city",
      "answers": [
        "cities"
      ],
      "rule": "ny",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "vesn",
        "ny",
        "uncount",
        "same"
      ],
      "formOptions": [
        "possp",
        "plural",
        "poss",
        "uncount"
      ],
      "wrong": {
        "citys": "辅音字母＋y 结尾，复数要处理 y。"
      }
    },
    {
      "id": "q45",
      "cat": "noun",
      "kind": "plural",
      "root": "boy",
      "answers": [
        "boys"
      ],
      "rule": "ns",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "nes",
        "uncount",
        "ns",
        "oes"
      ],
      "formOptions": [
        "poss",
        "possp",
        "plural",
        "uncount"
      ],
      "wrong": {}
    },
    {
      "id": "q46",
      "cat": "noun",
      "kind": "plural",
      "root": "leaf",
      "answers": [
        "leaves"
      ],
      "rule": "vesn",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "uncount",
        "ny",
        "same",
        "vesn"
      ],
      "formOptions": [
        "poss",
        "uncount",
        "plural",
        "possp"
      ],
      "wrong": {}
    },
    {
      "id": "q47",
      "cat": "noun",
      "kind": "plural",
      "root": "wife",
      "answers": [
        "wives"
      ],
      "rule": "vesn",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "same",
        "ny",
        "vesn",
        "ni"
      ],
      "formOptions": [
        "possp",
        "poss",
        "uncount",
        "plural"
      ],
      "wrong": {}
    },
    {
      "id": "q48",
      "cat": "noun",
      "kind": "plural",
      "root": "roof",
      "answers": [
        "roofs"
      ],
      "rule": "ns",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ny",
        "same",
        "ns",
        "ni"
      ],
      "formOptions": [
        "plural",
        "uncount",
        "possp",
        "poss"
      ],
      "wrong": {}
    },
    {
      "id": "q49",
      "cat": "noun",
      "kind": "plural",
      "root": "tomato",
      "answers": [
        "tomatoes"
      ],
      "rule": "oes",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ni",
        "oes",
        "same",
        "vesn"
      ],
      "formOptions": [
        "possp",
        "poss",
        "uncount",
        "plural"
      ],
      "wrong": {}
    },
    {
      "id": "q50",
      "cat": "noun",
      "kind": "plural",
      "root": "photo",
      "answers": [
        "photos"
      ],
      "rule": "ns",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ns",
        "nes",
        "uncount",
        "same"
      ],
      "formOptions": [
        "possp",
        "uncount",
        "poss",
        "plural"
      ],
      "wrong": {
        "photoes": "photo 的复数直接加 s。"
      }
    },
    {
      "id": "q51",
      "cat": "noun",
      "kind": "plural",
      "root": "child",
      "answers": [
        "children"
      ],
      "rule": "ni",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ni",
        "nes",
        "ns",
        "vesn"
      ],
      "formOptions": [
        "possp",
        "uncount",
        "poss",
        "plural"
      ],
      "wrong": {
        "childs": "child 的复数是不规则形式，不能直接加 s。"
      }
    },
    {
      "id": "q52",
      "cat": "noun",
      "kind": "plural",
      "root": "man",
      "answers": [
        "men"
      ],
      "rule": "ni",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ni",
        "vesn",
        "ns",
        "oes"
      ],
      "formOptions": [
        "possp",
        "uncount",
        "plural",
        "poss"
      ],
      "wrong": {}
    },
    {
      "id": "q53",
      "cat": "noun",
      "kind": "plural",
      "root": "woman",
      "answers": [
        "women"
      ],
      "rule": "ni",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "uncount",
        "oes",
        "ni",
        "same"
      ],
      "formOptions": [
        "uncount",
        "poss",
        "possp",
        "plural"
      ],
      "wrong": {}
    },
    {
      "id": "q54",
      "cat": "noun",
      "kind": "plural",
      "root": "foot",
      "answers": [
        "feet"
      ],
      "rule": "ni",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "same",
        "ns",
        "ni",
        "uncount"
      ],
      "formOptions": [
        "uncount",
        "poss",
        "plural",
        "possp"
      ],
      "wrong": {}
    },
    {
      "id": "q55",
      "cat": "noun",
      "kind": "plural",
      "root": "tooth",
      "answers": [
        "teeth"
      ],
      "rule": "ni",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "uncount",
        "ny",
        "ni",
        "oes"
      ],
      "formOptions": [
        "possp",
        "uncount",
        "poss",
        "plural"
      ],
      "wrong": {}
    },
    {
      "id": "q56",
      "cat": "noun",
      "kind": "plural",
      "root": "sheep",
      "answers": [
        "sheep"
      ],
      "rule": "same",
      "goal": "名词复数",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "uncount",
        "same",
        "ny",
        "vesn"
      ],
      "formOptions": [
        "possp",
        "uncount",
        "poss",
        "plural"
      ],
      "wrong": {
        "sheeps": "sheep 的单复数拼写相同。"
      }
    },
    {
      "id": "q57",
      "cat": "noun",
      "kind": "uncount",
      "root": "information",
      "answers": [
        "information"
      ],
      "rule": "uncount",
      "goal": "some 后这个不可数名词的形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "vesn",
        "nes",
        "uncount",
        "ny"
      ],
      "formOptions": [
        "plural",
        "uncount",
        "poss",
        "possp"
      ],
      "wrong": {
        "informations": "information 在本题不可数，不直接加 s。"
      }
    },
    {
      "id": "q58",
      "cat": "noun",
      "kind": "uncount",
      "root": "advice",
      "answers": [
        "advice"
      ],
      "rule": "uncount",
      "goal": "some 后这个不可数名词的形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ny",
        "uncount",
        "nes",
        "same"
      ],
      "formOptions": [
        "possp",
        "plural",
        "uncount",
        "poss"
      ],
      "wrong": {
        "advices": "advice 在本题不可数，不直接加 s。"
      }
    },
    {
      "id": "q59",
      "cat": "noun",
      "kind": "uncount",
      "root": "news",
      "answers": [
        "news"
      ],
      "rule": "uncount",
      "goal": "some 后这个不可数名词的形式",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "uncount",
        "vesn",
        "nes",
        "ni"
      ],
      "formOptions": [
        "possp",
        "plural",
        "poss",
        "uncount"
      ],
      "wrong": {}
    },
    {
      "id": "q60",
      "cat": "noun",
      "kind": "poss",
      "root": "boy",
      "answers": [
        "boy's"
      ],
      "rule": "poss",
      "goal": "一个男孩的：单数所有格",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "poss",
        "possi",
        "possp"
      ],
      "formOptions": [
        "uncount",
        "plural",
        "poss",
        "possp"
      ],
      "wrong": {}
    },
    {
      "id": "q61",
      "cat": "noun",
      "kind": "poss",
      "root": "child",
      "answers": [
        "child's"
      ],
      "rule": "poss",
      "goal": "一个孩子的：单数所有格",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "poss",
        "possp",
        "possi"
      ],
      "formOptions": [
        "possp",
        "uncount",
        "plural",
        "poss"
      ],
      "wrong": {}
    },
    {
      "id": "q62",
      "cat": "noun",
      "kind": "possp",
      "root": "student",
      "answers": [
        "students'"
      ],
      "rule": "possp",
      "goal": "学生们的：先变复数再写所有格",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "possp",
        "possi",
        "poss"
      ],
      "formOptions": [
        "poss",
        "plural",
        "possp",
        "uncount"
      ],
      "wrong": {
        "student's": "你写的是一个学生的；本题是学生们的，先变复数。",
        "students": "复数方向对了，还需要表示所属的撇号。"
      }
    },
    {
      "id": "q63",
      "cat": "noun",
      "kind": "possp",
      "root": "child",
      "answers": [
        "children's"
      ],
      "rule": "possi",
      "goal": "孩子们的：先变复数再写所有格",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "possi",
        "poss",
        "possp"
      ],
      "formOptions": [
        "poss",
        "uncount",
        "possp",
        "plural"
      ],
      "wrong": {
        "child's": "本题是孩子们的，先写不规则复数。",
        "children": "复数方向对了，还需要表示所属。"
      }
    },
    {
      "id": "q64",
      "cat": "degree",
      "kind": "comp",
      "root": "cold",
      "answers": [
        "colder"
      ],
      "rule": "er",
      "goal": "形容词比较级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "er",
        "more",
        "re",
        "rd"
      ],
      "formOptions": [
        "advcomp",
        "adv",
        "comp",
        "super"
      ],
      "wrong": {
        "cloder": "先保留 cold 的字母顺序，再加比较级词尾。"
      }
    },
    {
      "id": "q65",
      "cat": "degree",
      "kind": "super",
      "root": "cold",
      "answers": [
        "coldest"
      ],
      "rule": "er",
      "goal": "形容词最高级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "er",
        "rd",
        "ri",
        "more"
      ],
      "formOptions": [
        "adv",
        "advcomp",
        "comp",
        "super"
      ],
      "wrong": {}
    },
    {
      "id": "q66",
      "cat": "degree",
      "kind": "comp",
      "root": "close",
      "answers": [
        "closer"
      ],
      "rule": "re",
      "goal": "形容词比较级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ry",
        "re",
        "more",
        "rd"
      ],
      "formOptions": [
        "super",
        "adv",
        "comp",
        "advcomp"
      ],
      "wrong": {
        "closeer": "close 已有 e，比较级只加 r。"
      }
    },
    {
      "id": "q67",
      "cat": "degree",
      "kind": "super",
      "root": "close",
      "answers": [
        "closest"
      ],
      "rule": "re",
      "goal": "形容词最高级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ri",
        "re",
        "er",
        "ry"
      ],
      "formOptions": [
        "comp",
        "super",
        "adv",
        "advcomp"
      ],
      "wrong": {}
    },
    {
      "id": "q68",
      "cat": "degree",
      "kind": "comp",
      "root": "big",
      "answers": [
        "bigger"
      ],
      "rule": "rd",
      "goal": "形容词比较级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ri",
        "more",
        "rd",
        "er"
      ],
      "formOptions": [
        "comp",
        "advcomp",
        "super",
        "adv"
      ],
      "wrong": {}
    },
    {
      "id": "q69",
      "cat": "degree",
      "kind": "super",
      "root": "big",
      "answers": [
        "biggest"
      ],
      "rule": "rd",
      "goal": "形容词最高级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "re",
        "ri",
        "ry",
        "rd"
      ],
      "formOptions": [
        "adv",
        "comp",
        "advcomp",
        "super"
      ],
      "wrong": {}
    },
    {
      "id": "q70",
      "cat": "degree",
      "kind": "comp",
      "root": "happy",
      "answers": [
        "happier"
      ],
      "rule": "ry",
      "goal": "形容词比较级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ry",
        "re",
        "rd",
        "er"
      ],
      "formOptions": [
        "adv",
        "advcomp",
        "comp",
        "super"
      ],
      "wrong": {
        "happyer": "先把词尾 y 改为 i。"
      }
    },
    {
      "id": "q71",
      "cat": "degree",
      "kind": "super",
      "root": "happy",
      "answers": [
        "happiest"
      ],
      "rule": "ry",
      "goal": "形容词最高级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "rd",
        "er",
        "ry",
        "re"
      ],
      "formOptions": [
        "comp",
        "advcomp",
        "adv",
        "super"
      ],
      "wrong": {}
    },
    {
      "id": "q72",
      "cat": "degree",
      "kind": "comp",
      "root": "good",
      "answers": [
        "better"
      ],
      "rule": "ri",
      "goal": "形容词比较级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "re",
        "er",
        "more",
        "ri"
      ],
      "formOptions": [
        "super",
        "advcomp",
        "comp",
        "adv"
      ],
      "wrong": {}
    },
    {
      "id": "q73",
      "cat": "degree",
      "kind": "super",
      "root": "good",
      "answers": [
        "best"
      ],
      "rule": "ri",
      "goal": "形容词最高级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "re",
        "ry",
        "ri",
        "more"
      ],
      "formOptions": [
        "comp",
        "adv",
        "advcomp",
        "super"
      ],
      "wrong": {}
    },
    {
      "id": "q74",
      "cat": "degree",
      "kind": "comp",
      "root": "careful",
      "answers": [
        "more careful"
      ],
      "rule": "more",
      "goal": "形容词比较级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "rd",
        "ri",
        "re",
        "more"
      ],
      "formOptions": [
        "comp",
        "advcomp",
        "adv",
        "super"
      ],
      "wrong": {}
    },
    {
      "id": "q75",
      "cat": "degree",
      "kind": "super",
      "root": "careful",
      "answers": [
        "most careful"
      ],
      "rule": "more",
      "goal": "形容词最高级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "er",
        "re",
        "more",
        "ri"
      ],
      "formOptions": [
        "comp",
        "advcomp",
        "adv",
        "super"
      ],
      "wrong": {}
    },
    {
      "id": "q76",
      "cat": "degree",
      "kind": "adv",
      "root": "warm",
      "answers": [
        "warmly"
      ],
      "rule": "ly",
      "goal": "副词原级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ly",
        "le",
        "true",
        "well"
      ],
      "formOptions": [
        "adv",
        "advcomp",
        "comp",
        "super"
      ],
      "wrong": {}
    },
    {
      "id": "q77",
      "cat": "degree",
      "kind": "adv",
      "root": "happy",
      "answers": [
        "happily"
      ],
      "rule": "ily",
      "goal": "副词原级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ily",
        "asame",
        "ly",
        "well"
      ],
      "formOptions": [
        "super",
        "comp",
        "advcomp",
        "adv"
      ],
      "wrong": {
        "happyly": "先把词尾 y 改为 i，再加 ly。"
      }
    },
    {
      "id": "q78",
      "cat": "degree",
      "kind": "adv",
      "root": "simple",
      "answers": [
        "simply"
      ],
      "rule": "le",
      "goal": "副词原级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "asame",
        "le",
        "well",
        "true"
      ],
      "formOptions": [
        "adv",
        "comp",
        "super",
        "advcomp"
      ],
      "wrong": {
        "simplely": "simple 的词尾 e 要处理。"
      }
    },
    {
      "id": "q79",
      "cat": "degree",
      "kind": "adv",
      "root": "good",
      "answers": [
        "well"
      ],
      "rule": "well",
      "goal": "副词原级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "asame",
        "ily",
        "well",
        "le"
      ],
      "formOptions": [
        "adv",
        "super",
        "comp",
        "advcomp"
      ],
      "wrong": {
        "goodly": "good 对应的常用副词要单独记。"
      }
    },
    {
      "id": "q80",
      "cat": "degree",
      "kind": "adv",
      "root": "fast",
      "answers": [
        "fast"
      ],
      "rule": "asame",
      "goal": "副词原级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ly",
        "asame",
        "ily",
        "well"
      ],
      "formOptions": [
        "super",
        "comp",
        "advcomp",
        "adv"
      ],
      "wrong": {}
    },
    {
      "id": "q81",
      "cat": "degree",
      "kind": "adv",
      "root": "hard",
      "answers": [
        "hard"
      ],
      "rule": "asame",
      "goal": "副词原级，表示“努力地”",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "asame",
        "true",
        "ily",
        "well"
      ],
      "formOptions": [
        "advcomp",
        "adv",
        "comp",
        "super"
      ],
      "wrong": {
        "hardly": "hardly 是几乎不；本题要求努力地。"
      }
    },
    {
      "id": "q82",
      "cat": "degree",
      "kind": "adv",
      "root": "true",
      "answers": [
        "truly"
      ],
      "rule": "true",
      "goal": "副词原级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ily",
        "true",
        "well",
        "asame"
      ],
      "formOptions": [
        "adv",
        "comp",
        "advcomp",
        "super"
      ],
      "wrong": {
        "truely": "true 的副词需要先去掉 e。"
      }
    },
    {
      "id": "q83",
      "cat": "degree",
      "kind": "advcomp",
      "root": "carefully",
      "answers": [
        "more carefully"
      ],
      "rule": "more",
      "goal": "副词比较级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ry",
        "more",
        "re",
        "er"
      ],
      "formOptions": [
        "adv",
        "advcomp",
        "super",
        "comp"
      ],
      "wrong": {}
    },
    {
      "id": "q84",
      "cat": "degree",
      "kind": "advsuper",
      "root": "quickly",
      "answers": [
        "most quickly"
      ],
      "rule": "more",
      "goal": "副词最高级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "rd",
        "more",
        "ry",
        "ri"
      ],
      "formOptions": [
        "advsuper",
        "advcomp",
        "super",
        "adv"
      ],
      "wrong": {}
    },
    {
      "id": "q85",
      "cat": "degree",
      "kind": "advcomp",
      "root": "fast",
      "answers": [
        "faster"
      ],
      "rule": "er",
      "goal": "副词比较级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "rd",
        "ri",
        "more",
        "er"
      ],
      "formOptions": [
        "advcomp",
        "adv",
        "super",
        "comp"
      ],
      "wrong": {}
    },
    {
      "id": "q86",
      "cat": "degree",
      "kind": "advsuper",
      "root": "fast",
      "answers": [
        "fastest"
      ],
      "rule": "er",
      "goal": "副词最高级",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "rd",
        "ry",
        "ri",
        "er"
      ],
      "formOptions": [
        "advsuper",
        "comp",
        "adv",
        "super"
      ],
      "wrong": {}
    },
    {
      "id": "q87",
      "cat": "pronoun",
      "kind": "obj",
      "root": "she",
      "answers": [
        "her"
      ],
      "rule": "obj",
      "goal": "人称代词宾格",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "self",
        "det",
        "ind",
        "obj"
      ],
      "formOptions": [
        "det",
        "obj",
        "self",
        "ind"
      ],
      "wrong": {}
    },
    {
      "id": "q88",
      "cat": "pronoun",
      "kind": "obj",
      "root": "he",
      "answers": [
        "him"
      ],
      "rule": "obj",
      "goal": "人称代词宾格",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "det",
        "ind",
        "obj",
        "self"
      ],
      "formOptions": [
        "self",
        "det",
        "obj",
        "ind"
      ],
      "wrong": {}
    },
    {
      "id": "q89",
      "cat": "pronoun",
      "kind": "obj",
      "root": "I",
      "answers": [
        "me"
      ],
      "rule": "obj",
      "goal": "人称代词宾格",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ind",
        "obj",
        "det",
        "self"
      ],
      "formOptions": [
        "ind",
        "obj",
        "det",
        "self"
      ],
      "wrong": {}
    },
    {
      "id": "q90",
      "cat": "pronoun",
      "kind": "obj",
      "root": "we",
      "answers": [
        "us"
      ],
      "rule": "obj",
      "goal": "人称代词宾格",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "self",
        "ind",
        "det",
        "obj"
      ],
      "formOptions": [
        "obj",
        "self",
        "det",
        "ind"
      ],
      "wrong": {}
    },
    {
      "id": "q91",
      "cat": "pronoun",
      "kind": "obj",
      "root": "they",
      "answers": [
        "them"
      ],
      "rule": "obj",
      "goal": "人称代词宾格",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "det",
        "ind",
        "self",
        "obj"
      ],
      "formOptions": [
        "self",
        "obj",
        "det",
        "ind"
      ],
      "wrong": {}
    },
    {
      "id": "q92",
      "cat": "pronoun",
      "kind": "det",
      "root": "she",
      "answers": [
        "her"
      ],
      "rule": "det",
      "goal": "形容词性物主代词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "det",
        "obj",
        "self",
        "ind"
      ],
      "formOptions": [
        "det",
        "self",
        "ind",
        "obj"
      ],
      "wrong": {}
    },
    {
      "id": "q93",
      "cat": "pronoun",
      "kind": "det",
      "root": "we",
      "answers": [
        "our"
      ],
      "rule": "det",
      "goal": "形容词性物主代词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "self",
        "ind",
        "obj",
        "det"
      ],
      "formOptions": [
        "self",
        "ind",
        "obj",
        "det"
      ],
      "wrong": {
        "ours": "本题需要能放在名词前的物主代词。"
      }
    },
    {
      "id": "q94",
      "cat": "pronoun",
      "kind": "det",
      "root": "you",
      "answers": [
        "your"
      ],
      "rule": "det",
      "goal": "形容词性物主代词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "det",
        "ind",
        "obj",
        "self"
      ],
      "formOptions": [
        "det",
        "ind",
        "obj",
        "self"
      ],
      "wrong": {}
    },
    {
      "id": "q95",
      "cat": "pronoun",
      "kind": "det",
      "root": "it",
      "answers": [
        "its"
      ],
      "rule": "det",
      "goal": "形容词性物主代词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "obj",
        "det",
        "ind",
        "self"
      ],
      "formOptions": [
        "obj",
        "det",
        "ind",
        "self"
      ],
      "wrong": {
        "it's": "it’s 表示 it is 或 it has，不表示所属。"
      }
    },
    {
      "id": "q96",
      "cat": "pronoun",
      "kind": "ind",
      "root": "she",
      "answers": [
        "hers"
      ],
      "rule": "ind",
      "goal": "名词性物主代词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "det",
        "self",
        "obj",
        "ind"
      ],
      "formOptions": [
        "self",
        "ind",
        "obj",
        "det"
      ],
      "wrong": {
        "her": "本题后面不直接带名词，要用名词性物主代词。"
      }
    },
    {
      "id": "q97",
      "cat": "pronoun",
      "kind": "ind",
      "root": "I",
      "answers": [
        "mine"
      ],
      "rule": "ind",
      "goal": "名词性物主代词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "self",
        "obj",
        "ind",
        "det"
      ],
      "formOptions": [
        "det",
        "self",
        "obj",
        "ind"
      ],
      "wrong": {}
    },
    {
      "id": "q98",
      "cat": "pronoun",
      "kind": "ind",
      "root": "they",
      "answers": [
        "theirs"
      ],
      "rule": "ind",
      "goal": "名词性物主代词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "self",
        "det",
        "ind",
        "obj"
      ],
      "formOptions": [
        "det",
        "ind",
        "obj",
        "self"
      ],
      "wrong": {}
    },
    {
      "id": "q99",
      "cat": "pronoun",
      "kind": "self",
      "root": "he",
      "answers": [
        "himself"
      ],
      "rule": "self",
      "goal": "反身代词：他自己",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "self",
        "obj",
        "det",
        "ind"
      ],
      "formOptions": [
        "self",
        "obj",
        "det",
        "ind"
      ],
      "wrong": {}
    },
    {
      "id": "q100",
      "cat": "pronoun",
      "kind": "self",
      "root": "she",
      "answers": [
        "herself"
      ],
      "rule": "self",
      "goal": "反身代词：她自己",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "obj",
        "ind",
        "det",
        "self"
      ],
      "formOptions": [
        "self",
        "obj",
        "det",
        "ind"
      ],
      "wrong": {}
    },
    {
      "id": "q101",
      "cat": "pronoun",
      "kind": "self",
      "root": "we",
      "answers": [
        "ourselves"
      ],
      "rule": "self",
      "goal": "反身代词：我们自己",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "det",
        "self",
        "ind",
        "obj"
      ],
      "formOptions": [
        "ind",
        "det",
        "self",
        "obj"
      ],
      "wrong": {}
    },
    {
      "id": "q102",
      "cat": "pronoun",
      "kind": "self",
      "root": "they",
      "answers": [
        "themselves"
      ],
      "rule": "self",
      "goal": "反身代词：他们自己",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "ind",
        "obj",
        "self",
        "det"
      ],
      "formOptions": [
        "obj",
        "ind",
        "self",
        "det"
      ],
      "wrong": {}
    },
    {
      "id": "q103",
      "cat": "pronoun",
      "kind": "self",
      "root": "you",
      "answers": [
        "yourself"
      ],
      "rule": "self",
      "goal": "反身代词：你自己",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "obj",
        "ind",
        "self",
        "det"
      ],
      "formOptions": [
        "obj",
        "ind",
        "det",
        "self"
      ],
      "wrong": {}
    },
    {
      "id": "q104",
      "cat": "pronoun",
      "kind": "self",
      "root": "you",
      "answers": [
        "yourselves"
      ],
      "rule": "self",
      "goal": "反身代词：你们自己",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "obj",
        "det",
        "self",
        "ind"
      ],
      "formOptions": [
        "obj",
        "det",
        "self",
        "ind"
      ],
      "wrong": {}
    },
    {
      "id": "q105",
      "cat": "number",
      "kind": "ordinal",
      "root": "four",
      "answers": [
        "fourth"
      ],
      "rule": "th",
      "goal": "序数词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "89",
        "ty",
        "th",
        "123"
      ],
      "formOptions": [
        "ordinal",
        "adv",
        "plural"
      ],
      "wrong": {}
    },
    {
      "id": "q106",
      "cat": "number",
      "kind": "ordinal",
      "root": "one",
      "answers": [
        "first"
      ],
      "rule": "123",
      "goal": "序数词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "123",
        "ty",
        "89",
        "compound"
      ],
      "formOptions": [
        "ordinal",
        "adv",
        "plural"
      ],
      "wrong": {}
    },
    {
      "id": "q107",
      "cat": "number",
      "kind": "ordinal",
      "root": "two",
      "answers": [
        "second"
      ],
      "rule": "123",
      "goal": "序数词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "123",
        "th",
        "compound",
        "ty"
      ],
      "formOptions": [
        "ordinal",
        "adv",
        "plural"
      ],
      "wrong": {}
    },
    {
      "id": "q108",
      "cat": "number",
      "kind": "ordinal",
      "root": "three",
      "answers": [
        "third"
      ],
      "rule": "123",
      "goal": "序数词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "123",
        "ty",
        "89",
        "512"
      ],
      "formOptions": [
        "adv",
        "ordinal",
        "plural"
      ],
      "wrong": {
        "threeth": "three 的序数词不规则，单独记。"
      }
    },
    {
      "id": "q109",
      "cat": "number",
      "kind": "ordinal",
      "root": "five",
      "answers": [
        "fifth"
      ],
      "rule": "512",
      "goal": "序数词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "compound",
        "512",
        "89",
        "ty"
      ],
      "formOptions": [
        "ordinal",
        "adv",
        "plural"
      ],
      "wrong": {
        "fiveth": "five 变序数词，词尾 ve 要处理。"
      }
    },
    {
      "id": "q110",
      "cat": "number",
      "kind": "ordinal",
      "root": "eight",
      "answers": [
        "eighth"
      ],
      "rule": "89",
      "goal": "序数词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "compound",
        "ty",
        "89",
        "512"
      ],
      "formOptions": [
        "ordinal",
        "adv",
        "plural"
      ],
      "wrong": {
        "eightth": "eight 已有 t，不再重复加 t。"
      }
    },
    {
      "id": "q111",
      "cat": "number",
      "kind": "ordinal",
      "root": "nine",
      "answers": [
        "ninth"
      ],
      "rule": "89",
      "goal": "序数词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "th",
        "89",
        "512",
        "compound"
      ],
      "formOptions": [
        "plural",
        "adv",
        "ordinal"
      ],
      "wrong": {
        "nineth": "nine 先去 e 再加 th。"
      }
    },
    {
      "id": "q112",
      "cat": "number",
      "kind": "ordinal",
      "root": "twelve",
      "answers": [
        "twelfth"
      ],
      "rule": "512",
      "goal": "序数词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "123",
        "512",
        "compound",
        "th"
      ],
      "formOptions": [
        "adv",
        "plural",
        "ordinal"
      ],
      "wrong": {
        "twelveth": "twelve 变序数词要处理 ve。"
      }
    },
    {
      "id": "q113",
      "cat": "number",
      "kind": "ordinal",
      "root": "twenty",
      "answers": [
        "twentieth"
      ],
      "rule": "ty",
      "goal": "序数词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "123",
        "512",
        "89",
        "ty"
      ],
      "formOptions": [
        "ordinal",
        "plural",
        "adv"
      ],
      "wrong": {
        "twentyth": "整十的 ty 要改成 tieth。"
      }
    },
    {
      "id": "q114",
      "cat": "number",
      "kind": "ordinal",
      "root": "twenty-one",
      "answers": [
        "twenty-first"
      ],
      "rule": "compound",
      "goal": "序数词",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "123",
        "th",
        "compound",
        "89"
      ],
      "formOptions": [
        "plural",
        "adv",
        "ordinal"
      ],
      "wrong": {}
    },
    {
      "id": "q115",
      "cat": "family",
      "kind": "noun",
      "root": "important",
      "answers": [
        "importance"
      ],
      "rule": "fn",
      "goal": "名词：重要性",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fa",
        "fn"
      ],
      "formOptions": [
        "adv",
        "adj",
        "noun"
      ],
      "wrong": {
        "importantly": "本题需要名词，-ly 副词不符合目标。"
      }
    },
    {
      "id": "q116",
      "cat": "family",
      "kind": "noun",
      "root": "happy",
      "answers": [
        "happiness"
      ],
      "rule": "fn",
      "goal": "名词：幸福",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fn",
        "fa"
      ],
      "formOptions": [
        "adv",
        "adj",
        "noun"
      ],
      "wrong": {
        "happyness": "构成这个名词时 y 要改成 i。"
      }
    },
    {
      "id": "q117",
      "cat": "family",
      "kind": "noun",
      "root": "decide",
      "answers": [
        "decision"
      ],
      "rule": "fn",
      "goal": "名词：决定",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fn",
        "fa"
      ],
      "formOptions": [
        "noun",
        "adv",
        "adj"
      ],
      "wrong": {}
    },
    {
      "id": "q118",
      "cat": "family",
      "kind": "noun",
      "root": "develop",
      "answers": [
        "development"
      ],
      "rule": "fn",
      "goal": "名词：发展",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fn",
        "fa"
      ],
      "formOptions": [
        "noun",
        "adj",
        "adv"
      ],
      "wrong": {}
    },
    {
      "id": "q119",
      "cat": "family",
      "kind": "noun",
      "root": "teach",
      "answers": [
        "teacher"
      ],
      "rule": "fn",
      "goal": "名词：教师",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fa",
        "fn"
      ],
      "formOptions": [
        "noun",
        "adv",
        "adj"
      ],
      "wrong": {}
    },
    {
      "id": "q120",
      "cat": "family",
      "kind": "adj",
      "root": "care",
      "answers": [
        "careful"
      ],
      "rule": "fa",
      "goal": "形容词：小心的",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fn",
        "fa"
      ],
      "formOptions": [
        "adv",
        "noun",
        "adj"
      ],
      "wrong": {}
    },
    {
      "id": "q121",
      "cat": "family",
      "kind": "adj",
      "root": "care",
      "answers": [
        "careless"
      ],
      "rule": "fa",
      "goal": "形容词：粗心的",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fn",
        "fa"
      ],
      "formOptions": [
        "adv",
        "noun",
        "adj"
      ],
      "wrong": {}
    },
    {
      "id": "q122",
      "cat": "family",
      "kind": "adj",
      "root": "danger",
      "answers": [
        "dangerous"
      ],
      "rule": "fa",
      "goal": "形容词：危险的",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fa",
        "fn"
      ],
      "formOptions": [
        "adj",
        "noun",
        "adv"
      ],
      "wrong": {}
    },
    {
      "id": "q123",
      "cat": "family",
      "kind": "adj",
      "root": "rain",
      "answers": [
        "rainy"
      ],
      "rule": "fa",
      "goal": "形容词：多雨的",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fa",
        "fn"
      ],
      "formOptions": [
        "noun",
        "adv",
        "adj"
      ],
      "wrong": {}
    },
    {
      "id": "q124",
      "cat": "family",
      "kind": "adj",
      "root": "interest",
      "answers": [
        "interesting"
      ],
      "rule": "fing",
      "goal": "形容词：令人感兴趣的",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fed",
        "fing"
      ],
      "formOptions": [
        "adv",
        "noun",
        "adj"
      ],
      "wrong": {}
    },
    {
      "id": "q125",
      "cat": "family",
      "kind": "adj",
      "root": "interest",
      "answers": [
        "interested"
      ],
      "rule": "fed",
      "goal": "形容词：感兴趣的",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fed",
        "fing"
      ],
      "formOptions": [
        "adv",
        "noun",
        "adj"
      ],
      "wrong": {}
    },
    {
      "id": "q126",
      "cat": "family",
      "kind": "adj",
      "root": "amaze",
      "answers": [
        "amazing"
      ],
      "rule": "fing",
      "goal": "形容词：令人惊奇的",
      "mode": "forms",
      "stem": "",
      "clue": "",
      "ruleOptions": [
        "fing",
        "fed"
      ],
      "formOptions": [
        "adj",
        "noun",
        "adv"
      ],
      "wrong": {
        "amazeing": "先去不发音的 e，再加 ing。"
      }
    },
    {
      "id": "q127",
      "cat": "verb",
      "kind": "pp",
      "root": "clean",
      "answers": [
        "cleaned"
      ],
      "rule": "ed",
      "goal": "过去分词",
      "mode": "context",
      "stem": "The classroom is {{blank}} every day.",
      "clue": "教室是被打扫的，is 后需要过去分词；规则动词过去式与过去分词通常同形。",
      "ruleOptions": [
        "ied",
        "ed",
        "past",
        "pp"
      ],
      "formOptions": [
        "third",
        "pp",
        "past",
        "ing"
      ],
      "wrong": {}
    },
    {
      "id": "q128",
      "cat": "verb",
      "kind": "third",
      "root": "study",
      "answers": [
        "studies"
      ],
      "rule": "vy",
      "goal": "动词第三人称单数",
      "mode": "context",
      "stem": "Mia usually {{blank}} English after dinner.",
      "clue": "usually 表示习惯；主语 Mia 是第三人称单数。",
      "ruleOptions": [
        "vy",
        "vhas",
        "ves",
        "vs"
      ],
      "formOptions": [
        "ing",
        "past",
        "base",
        "third"
      ],
      "wrong": {
        "studys": "study 的 y 前是辅音字母 d，三单不能直接加 s。"
      }
    },
    {
      "id": "q129",
      "cat": "verb",
      "kind": "past",
      "root": "write",
      "answers": [
        "wrote"
      ],
      "rule": "past",
      "goal": "过去式",
      "mode": "context",
      "stem": "Leo {{blank}} a short email yesterday and sent it to his teacher.",
      "clue": "yesterday 与 sent 指向过去的动作；Leo 发出写的动作。",
      "ruleOptions": [
        "ed",
        "ded",
        "pp",
        "past"
      ],
      "formOptions": [
        "third",
        "past",
        "ing",
        "pp"
      ],
      "wrong": {
        "written": "written 是过去分词，本题要求过去式。",
        "writed": "write 是不规则动词，过去式不能直接加 ed。"
      }
    },
    {
      "id": "q130",
      "cat": "verb",
      "kind": "pp",
      "root": "write",
      "answers": [
        "written"
      ],
      "rule": "pp",
      "goal": "过去分词",
      "mode": "context",
      "stem": "The email was {{blank}} by Leo yesterday.",
      "clue": "was 与 by Leo 表示被写出来；was 后需要过去分词。",
      "ruleOptions": [
        "ied",
        "ed",
        "pp",
        "d"
      ],
      "formOptions": [
        "pp",
        "base",
        "third",
        "inf"
      ],
      "wrong": {
        "wrote": "wrote 是过去式，本题要求过去分词。",
        "writed": "write 的过去分词不能直接加 ed。",
        "writen": "检查中间辅音是否写全。"
      }
    },
    {
      "id": "q131",
      "cat": "verb",
      "kind": "ing",
      "root": "run",
      "answers": [
        "running"
      ],
      "rule": "ding",
      "goal": "-ing 形式",
      "mode": "context",
      "stem": "Look! Ben is {{blank}} towards us.",
      "clue": "Look 与 is 表示正在进行的动作，本空需要 -ing。",
      "ruleOptions": [
        "ie",
        "ing",
        "inge",
        "ding"
      ],
      "formOptions": [
        "ing",
        "third",
        "inf",
        "past"
      ],
      "wrong": {
        "runing": "run 符合双写条件，检查末尾辅音。"
      }
    },
    {
      "id": "q132",
      "cat": "verb",
      "kind": "inf",
      "root": "visit",
      "answers": [
        "to visit"
      ],
      "rule": "inf",
      "goal": "to ＋动词原形",
      "mode": "context",
      "stem": "Mia hopes {{blank}} the museum tomorrow.",
      "clue": "检查 hope to do 搭配；答案需带 to。",
      "ruleOptions": [
        "base",
        "inf"
      ],
      "formOptions": [
        "ing",
        "pp",
        "inf",
        "past"
      ],
      "wrong": {}
    },
    {
      "id": "q133",
      "cat": "verb",
      "kind": "base",
      "root": "play",
      "answers": [
        "play"
      ],
      "rule": "base",
      "goal": "动词原形",
      "mode": "context",
      "stem": "Leo can {{blank}} the piano very well.",
      "clue": "can 是情态动词，它后面的动词用原形。",
      "ruleOptions": [
        "inf",
        "base"
      ],
      "formOptions": [
        "base",
        "ing",
        "pp",
        "third"
      ],
      "wrong": {}
    },
    {
      "id": "q134",
      "cat": "noun",
      "kind": "plural",
      "root": "child",
      "answers": [
        "children"
      ],
      "rule": "ni",
      "goal": "名词复数",
      "mode": "context",
      "stem": "Two {{blank}} are waiting at the gate.",
      "clue": "Two 表示两个，可数名词需要复数。",
      "ruleOptions": [
        "ni",
        "vesn",
        "uncount",
        "same"
      ],
      "formOptions": [
        "plural",
        "possp",
        "uncount",
        "poss"
      ],
      "wrong": {
        "childs": "child 的复数是不规则形式，不能直接加 s。"
      }
    },
    {
      "id": "q135",
      "cat": "noun",
      "kind": "possp",
      "root": "student",
      "answers": [
        "students'"
      ],
      "rule": "possp",
      "goal": "复数名词所有格",
      "mode": "context",
      "stem": "These bags belong to the students. They are the {{blank}} bags.",
      "clue": "这些包属于这群学生，要先变复数，再表示所属。",
      "ruleOptions": [
        "possi",
        "possp",
        "poss"
      ],
      "formOptions": [
        "uncount",
        "possp",
        "plural",
        "poss"
      ],
      "wrong": {
        "student's": "你写的是一个学生的；本题是学生们的，先变复数。",
        "students": "复数方向对了，还需要表示所属的撇号。"
      }
    },
    {
      "id": "q136",
      "cat": "noun",
      "kind": "uncount",
      "root": "advice",
      "answers": [
        "advice"
      ],
      "rule": "uncount",
      "goal": "不可数名词的形式",
      "mode": "context",
      "stem": "My teacher gave me some useful {{blank}}.",
      "clue": "advice 在这里不可数；some 不会使它直接加 s。",
      "ruleOptions": [
        "uncount",
        "ni",
        "same",
        "ns"
      ],
      "formOptions": [
        "possp",
        "poss",
        "plural",
        "uncount"
      ],
      "wrong": {
        "advices": "advice 在本题不可数，不直接加 s。"
      }
    },
    {
      "id": "q137",
      "cat": "degree",
      "kind": "comp",
      "root": "cold",
      "answers": [
        "colder"
      ],
      "rule": "er",
      "goal": "形容词比较级",
      "mode": "context",
      "stem": "Today is {{blank}} than yesterday.",
      "clue": "than 提示比较，这里比较两天的温度。",
      "ruleOptions": [
        "ri",
        "more",
        "re",
        "er"
      ],
      "formOptions": [
        "super",
        "adv",
        "comp",
        "advcomp"
      ],
      "wrong": {
        "cloder": "先保留 cold 的字母顺序，再加比较级词尾。"
      }
    },
    {
      "id": "q138",
      "cat": "degree",
      "kind": "super",
      "root": "tall",
      "answers": [
        "tallest"
      ],
      "rule": "er",
      "goal": "形容词最高级",
      "mode": "context",
      "stem": "Sara is the {{blank}} student in her class.",
      "clue": "the 与 in her class 指向班级范围内的最高级。",
      "ruleOptions": [
        "ry",
        "re",
        "er",
        "more"
      ],
      "formOptions": [
        "comp",
        "super",
        "advcomp",
        "adv"
      ],
      "wrong": {}
    },
    {
      "id": "q139",
      "cat": "degree",
      "kind": "adv",
      "root": "happy",
      "answers": [
        "happily"
      ],
      "rule": "ily",
      "goal": "副词原级",
      "mode": "context",
      "stem": "The children played {{blank}} in the park.",
      "clue": "空格说明玩得怎么样，修饰 played。",
      "ruleOptions": [
        "well",
        "ly",
        "ily",
        "true"
      ],
      "formOptions": [
        "comp",
        "adv",
        "super",
        "advcomp"
      ],
      "wrong": {
        "happyly": "先把词尾 y 改为 i，再加 ly。"
      }
    },
    {
      "id": "q140",
      "cat": "degree",
      "kind": "advcomp",
      "root": "careful",
      "answers": [
        "more carefully"
      ],
      "rule": "more",
      "goal": "副词比较级",
      "mode": "context",
      "stem": "She answered the question {{blank}} than before.",
      "clue": "修饰 answered 需副词；than before 又要求比较级。",
      "ruleOptions": [
        "ry",
        "re",
        "more",
        "ri"
      ],
      "formOptions": [
        "advcomp",
        "super",
        "adv",
        "comp"
      ],
      "wrong": {
        "more careful": "比较级方向对了，但修饰 answered 需要副词。",
        "carefully": "副词方向对了，than before 还要求比较级。"
      }
    },
    {
      "id": "q141",
      "cat": "pronoun",
      "kind": "self",
      "root": "he",
      "answers": [
        "himself"
      ],
      "rule": "self",
      "goal": "反身代词",
      "mode": "context",
      "stem": "Tom hurt {{blank}} while running.",
      "clue": "动作指向主语 Tom 自己，要用反身代词。",
      "ruleOptions": [
        "self",
        "ind",
        "obj",
        "det"
      ],
      "formOptions": [
        "obj",
        "self",
        "det",
        "ind"
      ],
      "wrong": {}
    },
    {
      "id": "q142",
      "cat": "pronoun",
      "kind": "obj",
      "root": "she",
      "answers": [
        "her"
      ],
      "rule": "obj",
      "goal": "人称代词宾格",
      "mode": "context",
      "stem": "I met Lily and gave {{blank}} a book.",
      "clue": "gave 后表示给谁，人称代词作宾语。",
      "ruleOptions": [
        "det",
        "obj",
        "self",
        "ind"
      ],
      "formOptions": [
        "det",
        "obj",
        "self",
        "ind"
      ],
      "wrong": {}
    },
    {
      "id": "q143",
      "cat": "pronoun",
      "kind": "det",
      "root": "we",
      "answers": [
        "our"
      ],
      "rule": "det",
      "goal": "形容词性物主代词",
      "mode": "context",
      "stem": "These are {{blank}} books.",
      "clue": "后面还有 books，表达我们的书。",
      "ruleOptions": [
        "self",
        "det",
        "ind",
        "obj"
      ],
      "formOptions": [
        "ind",
        "det",
        "self",
        "obj"
      ],
      "wrong": {
        "ours": "本题需要能放在名词前的物主代词。"
      }
    },
    {
      "id": "q144",
      "cat": "pronoun",
      "kind": "ind",
      "root": "she",
      "answers": [
        "hers"
      ],
      "rule": "ind",
      "goal": "名词性物主代词",
      "mode": "context",
      "stem": "This bike belongs to her. It is {{blank}}.",
      "clue": "表达她的，空后不再直接带名词。",
      "ruleOptions": [
        "det",
        "obj",
        "ind",
        "self"
      ],
      "formOptions": [
        "ind",
        "self",
        "det",
        "obj"
      ],
      "wrong": {
        "her": "本题后面不直接带名词，要用名词性物主代词。"
      }
    },
    {
      "id": "q145",
      "cat": "number",
      "kind": "ordinal",
      "root": "five",
      "answers": [
        "fifth"
      ],
      "rule": "512",
      "goal": "序数词",
      "mode": "context",
      "stem": "May is the {{blank}} month of the year.",
      "clue": "五月是第五个月，表示顺序。",
      "ruleOptions": [
        "89",
        "th",
        "512",
        "ty"
      ],
      "formOptions": [
        "plural",
        "ordinal",
        "adv"
      ],
      "wrong": {
        "fiveth": "five 变序数词，词尾 ve 要处理。"
      }
    },
    {
      "id": "q146",
      "cat": "number",
      "kind": "ordinal",
      "root": "three",
      "answers": [
        "third"
      ],
      "rule": "123",
      "goal": "序数词",
      "mode": "context",
      "stem": "He finished the race in {{blank}} place, behind two other runners.",
      "clue": "有两人在他前面，这里表示第三名。",
      "ruleOptions": [
        "512",
        "89",
        "compound",
        "123"
      ],
      "formOptions": [
        "plural",
        "adv",
        "ordinal"
      ],
      "wrong": {
        "threeth": "three 的序数词不规则，单独记。"
      }
    },
    {
      "id": "q147",
      "cat": "family",
      "kind": "noun",
      "root": "important",
      "answers": [
        "importance"
      ],
      "rule": "fn",
      "goal": "名词",
      "mode": "context",
      "stem": "We understood the {{blank}} of working together.",
      "clue": "这里表达合作的重要性，需要名词。",
      "ruleOptions": [
        "fn",
        "fa"
      ],
      "formOptions": [
        "adj",
        "adv",
        "noun"
      ],
      "wrong": {
        "importantly": "本题需要名词，-ly 副词不符合目标。"
      }
    },
    {
      "id": "q148",
      "cat": "family",
      "kind": "adj",
      "root": "care",
      "answers": [
        "careful"
      ],
      "rule": "fa",
      "goal": "形容词",
      "mode": "context",
      "stem": "Please be {{blank}} with the glass. It breaks easily.",
      "clue": "后句说玻璃易碎，要求小心；be 后描述状态。",
      "ruleOptions": [
        "fn",
        "fa"
      ],
      "formOptions": [
        "adv",
        "noun",
        "adj"
      ],
      "wrong": {}
    },
    {
      "id": "q149",
      "cat": "family",
      "kind": "adj",
      "root": "excite",
      "answers": [
        "excited"
      ],
      "rule": "fed",
      "goal": "形容词",
      "mode": "context",
      "stem": "The children felt {{blank}} about the coming trip.",
      "clue": "这里表达孩子们感到兴奋，描述感受。",
      "ruleOptions": [
        "fed",
        "fing"
      ],
      "formOptions": [
        "adv",
        "noun",
        "adj"
      ],
      "wrong": {
        "exciting": "本题表达感到兴奋，不是令人兴奋。"
      }
    },
    {
      "id": "q150",
      "cat": "family",
      "kind": "adj",
      "root": "interest",
      "answers": [
        "interesting"
      ],
      "rule": "fing",
      "goal": "形容词",
      "mode": "context",
      "stem": "The story was so {{blank}} that I read it twice.",
      "clue": "故事吸引人，描述令人感兴趣的特点。",
      "ruleOptions": [
        "fed",
        "fing"
      ],
      "formOptions": [
        "noun",
        "adv",
        "adj"
      ],
      "wrong": {}
    },
    {
      "id": "q151",
      "cat": "noun",
      "kind": "plural",
      "root": "city",
      "answers": [
        "cities"
      ],
      "rule": "ny",
      "goal": "名词复数",
      "mode": "context",
      "stem": "We visited three beautiful {{blank}} during the holiday.",
      "clue": "three 表示三个，city 需要复数。",
      "ruleOptions": [
        "nes",
        "ny",
        "vesn",
        "same"
      ],
      "formOptions": [
        "poss",
        "uncount",
        "plural",
        "possp"
      ],
      "wrong": {
        "citys": "辅音字母＋y 结尾，复数要处理 y。"
      }
    }
  ],
  "tonight": [
    "q2",
    "q15",
    "q21",
    "q28",
    "q29",
    "q51",
    "q77",
    "q108",
    "q92",
    "q115",
    "q130",
    "q132",
    "q135",
    "q137",
    "q140",
    "q144",
    "q145",
    "q150"
  ]
};
