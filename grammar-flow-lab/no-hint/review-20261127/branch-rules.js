(()=>{'use strict';
const n=(id,title,text,children=[])=>({id,title,text,children});
window.REVIEW_GRAMMAR_BRANCHES={
 coordinate:[
  n('meaning','按前后意思选','先读空格两边，判断并列、转折、选择还是结果。',[
   n('and','并列：and','连接并列的人、事物或动作。例：She reads and writes every day.'),
   n('but','转折：but / yet','前后意思有转折。例：He was tired, but he kept working.'),
   n('or','选择／否则：or','选择：Tea or coffee?\n否则：Hurry up, or you will be late.'),
   n('so','结果：so','前面说原因，后面说结果。例：It rained, so we stayed inside.\n不要在同一组因果结构中重复使用 because 和 so。')]),
  n('pairs','成对连接结构','先找已经出现的半组搭配，再检查两边结构是否对应。',[
   n('both','both … and …','两者都。例：She likes both music and art.'),
   n('either','either … or …','两者中任一个。例：You can come either today or tomorrow.'),
   n('neither','neither … nor …','两者都不。例：Neither Tom nor Jack is here.'),
   n('notonly','not only … but also …','不但……而且……。例：He can not only sing but also dance.\n若 also 已给出，空格不要重复填写。')])
 ],
 subordinate:[
  n('adverbial','状语从句','主句结构通常已经完整，从句补充时间、原因、条件等。',[
   n('reason','原因','because 常说明直接原因；as、since 也可表示原因。\n例：I stayed home because I was ill.\nbecause of 后接名词等，不能直接接这个完整分句。'),
   n('condition','条件','if：如果；unless：除非／如果不。\n例：If it rains tomorrow, we will stay home.\n注意主句将来、条件从句用一般现在时的常见结构。'),
   n('time','时间','when、while、before、after、until 等，要根据时间关系选择。\n例：Wash your hands before you eat.\nwhile 引导的时间从句通常表示持续的动作或状态。'),
   n('concession','让步','although / though：虽然。\n例：Although he was tired, he kept working.\n通常不再在主句重复加 but。'),
   n('result','结果','so + 形容词／副词 + that；such + 名词短语 + that。\n例：He was so tired that he fell asleep.')]),
  n('object','宾语从句','先看从句缺不缺主语、宾语等成分，再判断含义；从句一般用陈述语序。',[
   n('statement','陈述一件事：that','从句结构完整、含义是陈述时，常用 that。\n例：I think that he is right.\nthat 本身不在这个从句里作主语或宾语。'),
   n('whether','是否：whether / if','例：I wonder whether he will come.\n出现 whether … or not，或介词后引导“是否”的从句等情况，通常用 whether。'),
   n('missing','缺主语或宾语：what / who 等','看缺的是人还是事物。\n例：Tell me what makes you happy.（what 作主语）\n例：I know who she is looking for.（who 指人，作介词 for 的宾语）'),
   n('adverb','缺地点、时间、方式等','where：在哪里；when：何时；why：为什么；how：怎样。\n例：I wonder where he lives.\n先检查从句结构，不能只按中文猜词。')]),
  n('relative','定语从句','先找从句修饰的名词，再看引导词在从句里起什么作用。',[
   n('people','修饰人','who / that 常作主语；who / whom / that 可作宾语，要结合结构。\n例：The girl who is singing is my sister.'),
   n('things','修饰物','which / that 可指物，作主语或宾语。\n例：This is the book that I bought yesterday.'),
   n('whose','所属关系：whose','whose 后接名词，表达“谁的”。\n例：I know the boy whose father is a doctor.'),
   n('wherewhen','地点／时间：where / when','先行词虽是地点或时间，也要看从句是否缺状语。\nThis is the school where I study.\nThis is the school that I visited.（visited 后缺宾语，不能填 where）')])
 ],
 article:[
  n('indefinite','泛指一个：a / an','可数名词单数，第一次提到或泛指一个，常需 a/an。',[
   n('sound','按紧跟的发音选择','辅音音素前用 a，元音音素前用 an。\na book；a university；an apple；an hour。\n看发音，不只看字母；an old book 要看 old 的发音。')]),
  n('definite','特指：the','前文提过同一个事物、双方都知道所指，或在语境中可唯一确定时，常用 the。\n例：I saw a dog. The dog was small.\n还可见于序数词、形容词最高级等结构，但要检查完整短语。'),
  n('zero','可能不用冠词','泛指的复数名词、不可数名词前常不用冠词；已有 my、this 等限定词时，不能再随意加 a/the。\n例：Books are useful. / I like music. / This is my book.')
 ],
 'other-det':[
  n('possessive','物主限定词','my、your、his、her、its、our、their 后面接名词。\n例：This is her bag.\n要结合上下文判断所属，不能只看空格后面有名词。'),
  n('demonstrative','指示词','this / that 对应单数；these / those 对应复数。\n例：this book / these books。还要根据语境判断远近和所指。'),
  n('quantity','数量词','先分可数／不可数，再看数量、肯定否定和上下文。',[
   n('manymuch','many / much；few / little','many、few、a few 修饰可数名词复数；much、little、a little 修饰不可数名词。\nfew/little 偏“几乎没有”；a few/a little 偏“有一些”。'),
   n('someany','some / any','some 常用于肯定句；any 常用于疑问句、否定句。\n表示请求、建议、希望得到肯定答复的问句，也可用 some。'),
   n('each','each / every 等','each、every 后通常接单数可数名词；both 指两者都，all 指三者及以上全部或整体。\n例：Every student has a book. / Both boys are here.')])
 ],
 fixed:[
  n('verb','动词搭配','把动词、空格、后面的内容连读。\nlisten to music；look after a child；help sb with sth；come from a place。\n同一动词可搭配不同介词，要结合意思判断。'),
  n('adjective','形容词搭配','be interested in：对……感兴趣；be good at：擅长；be afraid of：害怕；be proud of：为……自豪。\n介词后可接名词、代词或动词-ing。'),
  n('noun','名词搭配','the reason for：……的原因；the key to：……的钥匙／关键。\n注意这里的 to 可是介词，不能一律当作不定式标记。'),
  n('phrase','其他成组表达','instead of + 名词／代词／doing；because of + 名词等；with the help of：在……的帮助下。\n先看空格前后已经给了哪些词，每空只补缺少的部分。')
 ],
 relation:[
  n('time','时间介词','at 7 o’clock；on Monday；in May；on a cold morning。\n具体某一天或某一天的上午／下午／晚上通常用 on；for 后接时长，since 后接起点。'),
  n('place','地点与位置','in the room；on the table；at the station。\nbetween 常用于两个明确对象之间；among 常用于一群人或事物之中。'),
  n('movement','方向与来源','to：朝向；from：来自；into：进入；out of：从……里出来。\n例：She walked into the room. 要根据句意区分静止位置与移动方向。'),
  n('manner','方式与工具','by bus / by bike；on foot；with a pen；in English。\nby + 交通工具与 on/in + 冠词等 + 交通工具是不同结构，要检查后面的词。')
 ],
 'pronoun-slot':[
  n('subjectobject','先看缺主语还是宾语','谓语前可能缺主语：he、she、they 等；动词或介词后可能缺宾语：him、her、them 等。\n例：She likes him. / I sit next to her. 同时核对上下文指代。'),
  n('possessive','是否表达所属','后面有名词，考虑 my、her、their 等；后面不再接名词，考虑 mine、hers、theirs 等。\n例：This is her bag. / This bag is hers.'),
  n('reflexive','动作是否回到自身','myself、yourself、himself、herself、itself、ourselves、yourselves、themselves。\n例：She taught herself English. / Help yourselves to some fruit.'),
  n('it','it 的常见用法','可指前文单数事物，也可表示天气、时间、距离，或作形式主语。\n例：It is raining. / It is easy to learn. 要根据句子结构区分。'),
  n('indefinite','不定代词与替代词','someone、anything、nothing 等要看肯定否定和所指。\none 可替代前文同类事物；it 常指前文同一个事物。\n例：I lost my pen, so I bought a new one.')
 ],
 'structure-slot':[
  n('to','to：先分不定式还是介词','want to do / decide to do 中，to 是不定式标记，后接动词原形。\nlook forward to doing 中，to 是介词；不能看到 to 就一律接动词原形。'),
  n('patterns','成对句型','as + 原级 + as；too + 形容词／副词 + to do；so … that …；such … that …。\n例：He is as tall as his brother. / She is too young to go alone.'),
  n('auxiliary','助动词或 be 动词','如果常见三类都不合适，再检查句型是否缺 do/does/did、be 或 have 等。\n例：Do you like music? / She is reading.\n不能机械地见到动词就补助动词。')
 ],
 'noun-slot':[
  n('count','可数：单数还是复数','看数量词、限定词和句意。two、many、a few 等后一般接可数名词复数。',[
   n('regular','规则复数','通常加 -s；以 s、x、ch、sh 等结尾常加 -es；辅音字母 + y 结尾改 y 为 i，再加 -es。\nbook→books；box→boxes；city→cities。'),
   n('irregular','不规则复数','child→children；man→men；woman→women；foot→feet；tooth→teeth；mouse→mice。\nsheep 单复数同形。部分词需要单独记。')]),
  n('uncountable','不可数名词','information、advice、homework、news 等在常见这些含义下不可数，不能机械加 -s。\n例：some advice / two pieces of advice。'),
  n('possessive','名词所有格','单数名词通常加 ’s；以 -s 结尾的规则复数通常只加 ’；不以 -s 结尾的复数仍加 ’s。\na girl’s bag；the girls’ bags；children’s books。'),
  n('conversion','可能转换词性','先看空格在句中起什么作用，不能只想单复数。\ncare→careful→carefully；success→successful；danger→dangerous。\n例：Be careful. / Drive carefully.')
 ],
 finite:[
  n('tense','时态','先找时间和上下文，再判断动作是经常发生、过去发生、正在进行，还是尚未发生。',[
   n('present','一般现在时','用法：习惯、事实等。结构：动词原形／第三人称单数；be 用 am/is/are。\n线索：usually、often、every day 等。\n例：She walks to school every day.'),
   n('past','一般过去时','用法：过去发生的动作或状态。结构：过去式；be 用 was/were。\n线索：yesterday、last week、two days ago 等。\n例：They visited the museum yesterday.'),
   n('future','一般将来时','常见结构：will + 动词原形；am/is/are going to + 动词原形。\n例：We will leave tomorrow. / She is going to study tonight.\n注意时间、条件状语从句中的常见“主将从现”。'),
   n('continuous','现在进行时','结构：am/is/are + doing。常表示此刻或现阶段正在进行。\n例：Look! The children are playing.\n有些表示状态的动词通常不用进行时，不能只靠 now 判断。'),
   n('pastcontinuous','过去进行时','结构：was/were + doing。表示过去某时正在进行。\n例：I was reading at eight last night.\n常结合具体过去时间或 when/while 从句判断。'),
   n('perfect','现在完成时（了解）','结构：have/has + 过去分词。强调过去动作与现在的联系，或持续到现在的情况。\n例：I have finished my homework.\n注意 have/has 与不规则过去分词；本页不另外增加完成时练习。')]),
  n('voice','语态','看主语是动作的发出者，还是承受者。',[
   n('active','主动语态','主语发出动作。例：People use English in many countries.\n再结合上下文确定时态和主谓一致。'),
   n('passive','被动语态','基本结构：be + 过去分词，be 随时态、主语变化。\n例：English is used in many countries.',[
    n('presentpassive','一般现在时被动','am/is/are + 过去分词。例：The room is cleaned every day.'),
    n('pastpassive','一般过去时被动','was/were + 过去分词。例：The bridge was built last year.'),
    n('futurepassive','将来／情态动词被动','will be + 过去分词；情态动词 + be + 过去分词。\n例：The work will be finished tomorrow. / Rules must be followed.')])]),
  n('agreement','主谓一致','找真正的主语，检查人称和单复数，不能只看离动词最近的名词。',[
   n('person','一般现在时与人称','第三人称单数主语：实义动词常用 -s/-es 形式。\n例：He likes music. / They like music.\nI am；he/she/it is；you/we/they are。'),
   n('true-subject','别被中间成分干扰','例：The boy with two dogs is my friend.\n主语是 The boy，不是 dogs；with 后的短语不能改变主语的单复数。'),
   n('special','常见特殊结构','there be 常按后面的名词判断；either…or、neither…nor 等作主语时通常按就近原则。\n例：There is a book on the desk. / Either you or he is wrong.')])
 ],
 nonfinite:[
  n('to-do','to do','表示目的，或由前面的动词等决定形式。',[
   n('purpose','表示目的','例：He went to the library to borrow a book.\n回答“为了什么”，常用 to + 动词原形。'),
   n('verb-pattern','常见搭配','want/decide/hope/plan to do；ask/tell sb to do。\n例：She decided to leave. / He told me to wait.'),
   n('bare','注意不带 to 的形式','情态动词后接动词原形；let/make sb do，help sb (to) do 等也要记。\n例：Let him go. / You should listen carefully.')]),
  n('doing','doing','可由介词、动词搭配决定，也可作主语等。',[
   n('after-prep','介词后','例：She is good at drawing. / Thank you for helping me.\n介词后若接动词，通常用 -ing 形式。'),
   n('after-verb','动词搭配后','enjoy/finish/keep/practise doing；mind doing 等。\n例：He enjoys reading. 不同动词后的搭配要积累。'),
   n('subject','作主语','例：Swimming is good exercise.\n动词-ing 短语作主语，谓语通常用单数形式。'),
   n('contrast','to do 与 doing 意思可能不同','stop doing：停止正在做的事；stop to do：停下来去做另一件事。\nremember doing：记得做过；remember to do：记得要做。')]),
  n('done','done（了解）','过去分词可表示被动等关系；也用于完成时、被动语态结构。\n例：a broken window；a book written by a famous writer。\n先判断是否属于谓语的一部分，不要只看词尾像 -ed 就认定是过去时。')
 ],
 'adj-slot':[
  n('part','形容词还是副词','先看修饰的对象与空格的句子作用。',[
   n('adjective','形容词','常修饰名词，或放在 be、look、feel 等系动词后作表语。\na beautiful garden；She looks happy.'),
   n('adverb','副词','常修饰动词、形容词或其他副词。\nShe sings beautifully. / He runs very quickly.\n不能机械地把所有词都加 -ly；friendly 是形容词，fast 可作副词。')]),
  n('degree','原级、比较级、最高级','看比较对象、范围和结构，而不只看某个提示词。',[
   n('positive','原级','as…as 中间用原级。例：He is as tall as his brother.\nvery 后常接原级；much 可修饰比较级。'),
   n('comparative','比较级','两者比较常用 -er 或 more + 原级；than 是常见线索。\n例：This book is more interesting than that one.\n不要重复写 more better。'),
   n('superlative','最高级','在某个范围内比较“最……”，常用 -est 或 most + 原级。\n例：She is the tallest student in our class.\n结合完整结构检查是否已有 the 或其他限定词。'),
   n('irregular','不规则变化','good/well→better→best；bad/badly→worse→worst；many/much→more→most；little→less→least。')]),
  n('negative','是否需要反义或否定形式','根据整句意思检查前后关系，如 happy→unhappy、possible→impossible、careful→careless。\n例：It was impossible to finish in one minute. 不要只检查词尾而忽略句意。')
 ],
 'given-pronoun-slot':[
  n('subject','主格','I、you、he、she、it、we、they 常作主语。\n例：She likes English.'),
  n('object','宾格','me、you、him、her、it、us、them 常作动词或介词宾语。\n例：Please help him. / Sit next to me.'),
  n('possessive','物主代词','后面接名词：my、your、his、her、its、our、their。\n不再接名词：mine、yours、his、hers、ours、theirs。\n例：This is her pen. / This pen is hers.'),
  n('reflexive','反身代词','主语与宾语指同一个人／物，或 by oneself 等结构，可能需要反身代词。\n例：He hurt himself. / She did it by herself.\n复数形式要注意 ourselves、yourselves、themselves。')
 ],
 special:[
  n('one','one → first','“第一”是 first，不能写 oneth。例：This is the first lesson.'),
  n('two','two → second','“第二”是 second。例：He came second in the race.'),
  n('three','three → third','“第三”是 third，注意拼写。例：Turn left at the third crossing.')
 ],
 spelling:[
  n('five','five → fifth','ve 改为 f，再加 th：fifth。不要写 fiveth。'),
  n('eight','eight → eighth','原词已有 t，只加 h。不要写 eightth。'),
  n('nine','nine → ninth','先去末尾 e，再加 th。不要写 nineth。'),
  n('twelve','twelve → twelfth','ve 改为 f，再加 th；保留 l。不要写 twelveth。')
 ],
 tens:[
  n('rule','整十数的变化规则','twenty、thirty 等末尾 y 改成 ie，再加 th，得到 -ieth。\n不是所有以 y 结尾的单词都套这条规则。'),
  n('examples','常见整十数','twenty→twentieth；thirty→thirtieth；forty→fortieth；fifty→fiftieth。\n注意 forty 没有 u。')
 ],
 compound:[
  n('last','只变最后一个词','twenty-one→twenty-first；thirty-two→thirty-second。\n前面的整十数保持不变，不能写 twentieth-first。'),
  n('hyphen','核对连字符与个位','保留复合数词的连字符，并检查最后一个词的特殊变化。\n例：twenty-five→twenty-fifth。')
 ],
 regular:[
  n('th','多数变序数词加 th','four→fourth；six→sixth；seven→seventh；ten→tenth。\n仍需先排除特殊变化。'),
  n('cardinal','语境可能仍需基数词','表示数量通常用基数词；表示顺序通常用序数词。\nthree books 对比 the third book。\nPage Three、Room Five 等编号可用基数词。'),
  n('hundred','hundred / thousand 等','确切数量后一般不加 -s：two hundred students。\n表示笼统数量用 hundreds of / thousands of 等。\n序数词形式则是 hundredth、thousandth，要看语境。')
 ]
};
})();
