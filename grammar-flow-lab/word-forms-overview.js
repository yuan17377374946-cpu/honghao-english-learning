(()=>{'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const card=(id,title,covers,heads,rows,note='')=>({id,title,covers,heads,rows,note});
const standard=['什么情况','怎样变化','例子与提醒'];
const sources={
 verbs:['British Council · 动词现在时与过去式','https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-simple'],
 past:['British Council · 过去式','https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/past-simple'],
 spelling:['Cambridge · 动词拼写规则','https://dictionary.cambridge.org/grammar/british-grammar/spelling-and-verb-forms'],
 nouns:['British Council · 名词单复数','https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/count-nouns'],
 uncount:['British Council · 不可数名词','https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/uncount-nouns'],
 degrees:['British Council · 比较级与最高级','https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/comparative-superlative-adjectives'],
 adverbs:['British Council · 方式副词','https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/adverbials-manner'],
 pronouns:['British Council · 人称与物主代词','https://learnenglishteens.britishcouncil.org/grammar/a1-a2-grammar/personal-pronouns-possessives'],
 reflexive:['British Council · 反身代词','https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/reflexive-pronouns'],
 numbers:['Cambridge · 数量与顺序表达','https://dictionary.cambridge.org/grammar/british-grammar/number']
};
const entries={
 verb:{intro:'先确定原形、三单、过去式、过去分词还是 -ing，再查对应的拼写变化。',refs:['verbs','past','spelling'],cards:[
 card('verb-base','原形与 to do：先认结构',['base','inf'],standard,[
 ['情态动词后','用动词原形','can swim；should study；must go'],
 ['do / does / did 作助动词','后面的实义动词用原形','does not watch；did not go，不写 did not went'],
 ['hope / want / decide 等搭配','常接 to ＋动词原形','hope to visit；decide to leave'],
 ['to 是介词时','不能直接套 to do，要按结构判断','look forward to seeing you；be used to getting up early']
 ],'动词原形和不定式不是一回事。题干已经给了 to，空格里通常只补后面的动词形式。'),
 card('verb-third','第三人称单数：-s / -es / -ies',['vs','ves','vy','vhas'],standard,[
 ['一般情况','直接加 -s','play → plays；read → reads'],
 ['s、x、ch、sh 等词尾','加 -es','pass → passes；fix → fixes；watch → watches；wash → washes'],
 ['辅音字母 ＋ y','去 y，加 -ies','study → studies；carry → carries'],
 ['元音字母 ＋ y','保留 y，加 -s','enjoy → enjoys；stay → stays'],
 ['常用特殊形式','按词记忆','go → goes；do → does；have → has'],
 ['be 的现在时','按主语选择 am / is / are','I am；he / she / it is；you / we / they are']
 ],'只有需要一般现在时第三人称单数谓语时才这样变。主语单数不代表任何结构里的动词都加 -s。'),
 card('verb-ed','规则过去式与过去分词：-ed',['ed','d','ied','ded'],standard,[
 ['一般规则动词','加 -ed','clean → cleaned；watch → watched'],
 ['词尾已有 e','只加 -d','live → lived；love → loved'],
 ['辅音字母 ＋ y','去 y，加 -ied','study → studied；carry → carried'],
 ['元音字母 ＋ y','直接加 -ed','play → played；enjoy → enjoyed'],
 ['末尾重读闭音节，且以单个元音字母＋单个辅音字母结尾','通常双写末尾辅音，再加 -ed','stop → stopped；plan → planned；prefer → preferred'],
 ['w、x、y 结尾；或末尾不重读等','通常不双写','snow → snowed；fix → fixed；visit → visited']
 ],'规则动词的过去式与过去分词同形，但它们在句中的作用不同。travel 等词还存在英美拼写差异。'),
 card('verb-ing','-ing：直接加、去 e、双写、ie 变 y',['ing','inge','ding','ie'],standard,[
 ['一般情况','直接加 -ing','play → playing；study → studying'],
 ['末尾不发音的 e','通常去 e，再加 -ing','make → making；write → writing'],
 ['ee 结尾、be 等','保留 e，再加 -ing','see → seeing；agree → agreeing；be → being'],
 ['末尾重读闭音节，单元音字母＋单辅音字母','通常双写末尾辅音，再加 -ing','run → running；sit → sitting；begin → beginning'],
 ['w、x、y 通常不双写','直接加 -ing','snow → snowing；fix → fixing；play → playing'],
 ['ie 结尾的常用词','把 ie 改成 y，再加 -ing','lie → lying；die → dying；tie → tying']
 ],'辅音字母＋y 变 -ing 时保留 y，不变成 i。-ing 既可能参与进行时，也可能用于介词后、动词搭配中，要看完整结构。'),
 card('verb-irregular','常用不规则动词三态',['past','pp'],['原形','过去式','过去分词'],[
 ['be','was / were','been'],['have','had','had'],['do','did','done'],['go','went','gone'],
 ['come','came','come'],['see','saw','seen'],['write','wrote','written'],['choose','chose','chosen'],
 ['take','took','taken'],['give','gave','given'],['eat','ate','eaten'],['run','ran','run'],
 ['buy','bought','bought'],['make','made','made'],['teach','taught','taught'],['build','built','built'],
 ['begin','began','begun'],['read','read（读 /red/）','read（读 /red/）'],['cut / put','cut / put','cut / put'],
 ['lie（躺；位于）','lay','lain'],['lie（说谎）','lied','lied']
 ],'过去式不等于过去分词。被动语态用 be ＋过去分词；完成时用 have / has ＋过去分词（先了解，不要求今晚做完成时题）。')
 ]},
 noun:{intro:'先分可数与不可数，再看数量；需要复数时按词尾变化，表示所属时再处理所有格。',refs:['nouns','uncount'],cards:[
 card('noun-regular','规则复数：-s / -es / -ies',['ns','nes','ny'],standard,[
 ['一般可数名词','直接加 -s','book → books；student → students'],
 ['s、ss、x、ch、sh 等常见词尾','加 -es','bus → buses；class → classes；box → boxes；watch → watches；dish → dishes'],
 ['辅音字母 ＋ y','去 y，加 -ies','city → cities；baby → babies'],
 ['元音字母 ＋ y','保留 y，加 -s','boy → boys；toy → toys；key → keys']
 ],'先确认需要复数，再看词尾。不是所有 ch 结尾都套 -es，例如 stomach → stomachs；z 结尾的 quiz → quizzes 要多写一个 z。'),
 card('noun-endings','f / fe 与 o 结尾：例外单独记',['vesn','oes'],standard,[
 ['部分 f / fe 结尾','把 f / fe 改成 -ves','leaf → leaves；wife → wives；life → lives；knife → knives；wolf → wolves'],
 ['另一些 f / fe 结尾','直接加 -s','roof → roofs；belief → beliefs；chief → chiefs；safe → safes'],
 ['部分 o 结尾常用词','加 -es','tomato → tomatoes；potato → potatoes；hero → heroes'],
 ['另一些 o 结尾','直接加 -s','photo → photos；piano → pianos；radio → radios；zoo → zoos']
 ],'f / fe 和 o 都不能一概而论。有的词两种形式都可以，如 scarf → scarves / scarfs；具体词查词典。'),
 card('noun-irregular','不规则复数与单复数同形',['ni','same'],['类型','单数与复数','使用提醒'],[
 ['词中元音变化','man → men；woman → women；foot → feet；tooth → teeth；mouse → mice','不能直接加 -s'],
 ['特殊变化','child → children；person → people','people 常表示“人们”，按复数看；person 的常用复数是 people'],
 ['单复数同形','one sheep / two sheep；one deer / three deer','有单复数意义，但拼写不变'],
 ['常见其他同形词','a fish / several fish；one Chinese / two Chinese','fish 表示不同种类时也可用 fishes；不能把同形误当成不可数']
 ]),
 card('noun-uncount','不可数名词与数量表达',['uncount'],standard,[
 ['在当前意思下不可数','通常不加复数 -s','information；advice；homework；furniture；news'],
 ['表示一些','按可数性分别处理','some books，但 some advice，不写 advices'],
 ['表示明确数量','把量词变复数，核心不可数名词不变','two pieces of advice；three pieces of information'],
 ['看起来以 s 结尾','仍要查词义与数','news 在常用意义下不可数：The news is good.']
 ],'可数性要结合词义：chicken 可指不可数的鸡肉，也可指可数的小鸡。不要只看中文或 some 就加 -s。'),
 card('noun-possessive','所有格：’s 与 s’',['poss','possp','possi'],standard,[
 ['单数对象的所属','通常加 ’s','a student’s book；the girl’s bike'],
 ['以 s 结尾的规则复数','先变复数，再加 ’','students → students’ books；girls → girls’ bikes'],
 ['不以 s 结尾的复数','复数后仍加 ’s','children’s books；men’s room；women’s shoes']
 ],'students 表示多个学生；student’s 表示一个学生的；students’ 表示多个学生的。题目要的是哪一个，先读清楚。')
 ]},
 degree:{intro:'先判断空位需要形容词还是副词，再判断原级、比较级或最高级，最后处理拼写。',refs:['degrees','adverbs'],cards:[
 card('degree-regular','比较级与最高级：规则变化',['er','re','ry','rd','more'],standard,[
 ['多数单音节词','加 -er / -est','cold → colder → coldest；fast → faster → fastest'],
 ['词尾已有 e','加 -r / -st','close → closer → closest；nice → nicer → nicest'],
 ['常见辅音字母＋y 结尾的双音节词','去 y，改为 -ier / -iest','happy → happier → happiest；easy → easier → easiest'],
 ['单音节短词，单个元音字母＋单个辅音字母结尾','通常双写末尾辅音，再加词尾','big → bigger → biggest；hot → hotter → hottest'],
 ['w、x、y 等不套双写','按具体词变化','new → newer → newest；slow → slower → slowest'],
 ['多数双音节、较长形容词；多数 -ly 副词','在前面加 more / most','careful → more careful → most careful；carefully → more carefully → most carefully']
 ],'不能叠加两套变化：不写 more bigger。部分双音节词有两种常用形式，如 cleverer / more clever；以词典和题意为准。'),
 card('degree-irregular','不规则比较等级',['ri'],['原级','比较级','最高级'],[
 ['good / well','better','best'],['bad / badly','worse','worst'],['many / much','more','most'],
 ['little（数量少）','less','least'],['far','farther / further','farthest / furthest']
 ],'little 表示“少量”时用 less / least，比较物体大小通常用 smaller / smallest。最高级前是否需要 the，要看句子；the 不属于词形本身。'),
 card('degree-adverb','形容词变副词：-ly 与特殊形式',['ly','ily','le','well','asame','true'],standard,[
 ['一般常用形容词','直接加 -ly','careful → carefully；warm → warmly；slow → slowly'],
 ['常见辅音字母＋y 结尾的多音节形容词','去 y，再加 -ily','happy → happily；easy → easily'],
 ['常见辅音字母＋le 结尾','把词尾 e 改成 y','simple → simply；gentle → gently；terrible → terribly'],
 ['部分 -ic 结尾','通常加 -ally','basic → basically；scientific → scientifically；public → publicly 需另记'],
 ['特殊拼写','单独记忆','true → truly；whole → wholly；good → well'],
 ['形容词、副词同形','保持原形，按意思使用','fast → fast；hard → hard；late → late'],
 ['加 -ly 后意思变了','不是普通“变副词”','hard＝努力地，hardly＝几乎不；late＝晚，lately＝最近'],
 ['本身以 -ly 结尾的形容词','不能再机械加 -ly','friendly / lovely 是形容词；可用 in a friendly way 表达方式']
 ],'不是所有 y 结尾都用 -ily：shy → shyly。词尾只是线索，还要查这个词的实际形式。'),
 card('degree-function','先选词性，再选比较等级',[],['判断方向','常见位置或线索','对比例子'],[
 ['形容词','常描述名词或主语的状态','a careful driver；The driver is careful.'],
 ['副词','常修饰动作、形容词或其他副词','drive carefully；really interesting；very quickly'],
 ['比较级','结合两者比较与 than 等语境','This road is wider than that one.'],
 ['最高级','结合范围、“最……”等语境','the widest road in the town'],
 ['原级','as ... as / not as ... as 等结构','as tall as；not as quickly as']
 ],'be 后不能一律填形容词：is carefully checked 中 carefully 修饰 checked。先看完整结构。')
 ]},
 pronoun:{intro:'代词主要按人称、单复数与句子作用选形式，不靠统一加后缀。先看“谁、对谁、谁的、自己”。',refs:['pronouns','reflexive'],cards:[
 card('pronoun-table','代词变化对照表',['obj','det','ind','self'],['主格','宾格','形容词性物主代词','名词性物主代词','反身代词'],[
 ['I','me','my','mine','myself'],['you（单数）','you','your','yours','yourself'],['he','him','his','his','himself'],
 ['she','her','her','hers','herself'],['it','it','its','—（通常不用）','itself'],['we','us','our','ours','ourselves'],
 ['you（复数）','you','your','yours','yourselves'],['they','them','their','theirs','themselves']
 ],'its 不等于 it’s：its 表示“它的”，it’s 是 it is 或 it has 的缩写。物主代词不加所有格撇号。'),
 card('pronoun-position','主格、宾格、物主：按位置选',[],['要表达什么','选哪类形式','例子'],[
 ['谁做动作','常用主格作主语','She knows me.'],
 ['动作对谁；介词指向谁','常用宾格','Help him.；with us'],
 ['谁的＋名词','形容词性物主代词','my book；their teacher'],
 ['谁的，名词已经省略','名词性物主代词','This book is mine.（＝my book）']
 ],'his 作两类物主代词时拼写相同；her 可作宾格，也可作形容词性物主代词。不能只背一个中文意思。'),
 card('pronoun-reflexive','反身代词：-self 与 -selves',[],['情况','表达','例子'],[
 ['动作指回主语自己','用对应反身代词','She taught herself.'],
 ['强调亲自、本人','用反身代词强调','I made it myself.'],
 ['表示独自、靠自己','by ＋反身代词','He finished it by himself.'],
 ['复数形式','注意 -selves','ourselves；yourselves；themselves']
 ],'不能只因为主语是人就填反身代词。She talked to him. 说的是另一个人，不能随意换成 herself。')
 ]},
 number:{intro:'先分“几个”与“第几个”。确定是顺序，再用序数词变化；数量表达仍可能保留基数词。',refs:['numbers'],cards:[
 card('number-ordinal','基数词变序数词：规则与特殊变化',['th','123','89','512','ty','compound'],standard,[
 ['一般情况','加 -th','four → fourth；six → sixth；ten → tenth'],
 ['一、二、三','整体特殊变化','one → first；two → second；three → third'],
 ['五、十二','ve 改成 f，再加 -th','five → fifth；twelve → twelfth'],
 ['八、九','注意 t 和不发音的 e','eight → eighth；nine → ninth'],
 ['整十数 -ty','改成 -tieth','twenty → twentieth；thirty → thirtieth；forty → fortieth'],
 ['几十几','前面的整十部分不变，只变个位','twenty-one → twenty-first；thirty-two → thirty-second'],
 ['整百、整千','按具体数词变为序数词','hundred → hundredth；thousand → thousandth']
 ],'eight 只补 h；nine 先去 e。复合数词要保留需要的连字符。'),
 card('number-spelling','常考拼写与数字缩写',[],['基数词','序数词','数字写法'],[
 ['one / two / three','first / second / third','1st / 2nd / 3rd'],['five / eight / nine','fifth / eighth / ninth','5th / 8th / 9th'],
 ['eleven / twelve / thirteen','eleventh / twelfth / thirteenth','11th / 12th / 13th'],
 ['twenty / thirty / forty','twentieth / thirtieth / fortieth','20th / 30th / 40th'],
 ['twenty-one / twenty-two / twenty-three','twenty-first / twenty-second / twenty-third','21st / 22nd / 23rd']
 ],'数字缩写看末两位：以 11、12、13 结尾用 th，例如 111th、112th、113th；其余再按末位 1、2、3 选 st、nd、rd。'),
 card('number-meaning','别把数量与顺序混在一起',[],['意思','写法','提醒'],[
 ['几个','three books；twenty students','用基数词，不因后面有名词就变序数词'],
 ['第几个','the third book；her twelfth birthday','有 her 等限定词时，不额外叠加 the'],
 ['明确几百、几千','two hundred；three thousand','hundred / thousand 前有明确数词时不加 -s'],
 ['数百、数千','hundreds of；thousands of','这里用复数加 of，不写 two hundreds of']
 ])
 ]},
 family:{intro:'先确定目标词性，再记具体词族。后缀有常见规律，但不能把所有词都套成同一种变化。',refs:['adverbs'],cards:[
 card('family-noun','动词／形容词变名词',['fn'],['原词','名词','怎么记'],[
 ['develop','development','常见 -ment 词族'],['decide','decision','词干变化一起记，不写 decideion'],
 ['important','importance','-ant 与 -ance 的对应词族'],['happy','happiness','去 y，再接 -iness'],
 ['teach','teacher','表示做事的人，常见 -er / -or 词族'],['kind','kindness','常见 -ness 词族'],
 ['succeed','success','整体词族，不能机械加统一后缀']
 ],'名词词尾可能是 -ment、-tion / -sion、-ness、-ance 等；这里是常见词族示例，不是任意原词都能自由加后缀。'),
 card('family-adjective','名词变形容词：按含义与词族',['fa'],['原词','形容词','意思与提醒'],[
 ['care','careful / careless','小心的／粗心的；-ful 与 -less 意思不同'],['danger','dangerous','危险的；常见 -ous 词族'],
 ['rain','rainy','下雨的；常见 -y 词族'],['health','healthy','健康的；注意词尾 y'],
 ['success','successful','成功的；-ful 只写一个 l'],['beauty','beautiful','美丽的；拼写随词族记'],
 ['use','useful / useless','有用的／无用的']
 ],'要同时看词性和意思。句子需要否定含义时，不能只因为认出 care 就一律写 careful。'),
 card('family-feeling','-ing 与 -ed 形容词：按含义判断',['fing','fed'],['动词词族','令人……的','感到……的'],[
 ['interest','interesting','interested'],['amaze','amazing','amazed'],['excite','exciting','excited'],
 ['bore','boring','bored'],['surprise','surprising','surprised']
 ],'不按“人用 -ed、物用 -ing”机械划分。an interesting teacher 表示“让人觉得有趣的老师”；an excited child 表示“感到兴奋的孩子”。'),
 card('family-chain','把一个词族连起来记',[],['名词／原词','形容词','副词'],[
 ['care','careful / careless','carefully / carelessly'],['danger','dangerous','dangerously'],['health','healthy','healthily'],
 ['success','successful','successfully'],['beauty','beautiful','beautifully'],['happiness / happy','happy / unhappy','happily / unhappily'],
 ['importance / important','important','importantly']
 ],'写出新词以后，再查句中是否还需要复数、比较级等第二步变化。important → importance 是变词性；本课中的 importance 表示“重要性”，通常按不可数名词使用。')
 ]}
};
function html(cat){const entry=entries[cat];if(!entry)return '';return `<p class="forms-overview-intro">${esc(entry.intro)}</p><div class="forms-rule-grid">${entry.cards.map(c=>`<details class="forms-rule-card" data-overview-card="${esc(c.id)}"><summary><span>${esc(c.title)}</span><span class="forms-rule-icon" aria-hidden="true"></span></summary><div class="forms-rule-body"><div class="forms-rule-table-wrap" role="region" aria-label="${esc(c.title)}" tabindex="0"><table><caption class="forms-sr-only">${esc(c.title)}</caption><thead><tr>${c.heads.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${c.rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${esc(cell)}</th>`:`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${c.note?`<p class="forms-rule-note"><b>留意：</b>${esc(c.note)}</p>`:''}</div></details>`).join('')}</div><p class="forms-overview-sources">规则核对：${entry.refs.map(k=>`<a href="${esc(sources[k][1])}" target="_blank" rel="noopener">${esc(sources[k][0])}</a>`).join(' · ')}。</p>`;}
window.WORD_FORMS_OVERVIEW={entries,html};
})();
