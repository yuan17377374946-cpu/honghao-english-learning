window.UNIT4 = (() => {
const C=(skill,prompt,options,answer,why,hint,extra={})=>({type:'choice',skill,prompt,options,answer,why,hint,...extra});
const I=(skill,prompt,answers,why,hint,extra={})=>({type:'input',skill,prompt,answers,why,hint,...extra});
const O=(skill,prompt,tokens,answer,why,hint)=>({type:'order',skill,prompt,tokens,answer,why,hint});
const M=(skill,prompt,pairs,why,hint)=>({type:'match',skill,prompt,pairs,why,hint});
const S=(skill,prompt,bins,items,why,hint)=>({type:'sort',skill,prompt,bins,items,why,hint});
const E=(skill,prompt,tokens,bad,replacements,answer,why,hint)=>({type:'edit',skill,prompt,tokens,bad,replacements,answer,why,hint});
const R=(skill,prompt,passage,options,answer,evidence,why,hint)=>({type:'reading',skill,prompt,passage,options,answer,evidence,why,hint});
const vocab=[
['goal','目标'],['drink','喝'],['healthily','健康地'],['exercise','锻炼；运动'],['survey','调查'],['top','居首的；最高的'],['test','测试'],['October','十月'],['complete','完成；使完整'],['sentence','句子'],['November','十一月'],['match','比赛'],['late','迟到的'],['be late for school','上学迟到'],['before','在……以前'],['sell','卖'],['buy','买'],['medicine','药'],['hurry','赶紧；匆忙地走'],['classroom','教室'],['afraid','害怕的'],['set','创造（纪录）'],['record','纪录'],['metre','米']
];
const goals=[['do better in school','在学校表现得更好'],['eat and drink healthily','健康饮食'],['make new friends','结交新朋友'],['learn something new','学习新事物'],['read more','多读书'],['be clean and tidy','保持干净整洁'],['exercise more','多锻炼']];
const diary=['On 11 October, Lingling wants to join the girls’ basketball team. The test is tomorrow.','On 12 October, Amy is in, but Lingling is out. Lingling feels sad.','On 14 October, Amy plays basketball with Lingling. Lingling is going to work hard. She says, “I can make it next time.”','On 26 October, there is going to be a test again. Lingling is still not sure, but she is going to try again.','On 28 October, Lingling is in! She is happy.'];
const story=['The boy’s father is ill. The family has little money.','Before school, the boy has to sell things and buy medicine for his father.','It is a long way. Today there are too many people. The boy hurries to school, but he is still late.','His teacher says, “Don’t be late again.” The boy feels sad.','He cuts a word into his desk. He is not going to be late again.'];
const days=[
{title:'认识我的目标',en:'Find my goal',color:'#2b5cff',intro:'先认出词语，再帮小伙伴找到适合自己的目标。',focus:'24个词条分批见面 · 七类目标 · 健康表达',steps:['目标配对','词语侦探','拼写小站','生活选择'],notes:[['目标从这里选',goals.map(p=>p.join('：')).join('\n')],['healthy / healthily','healthy 描述人或食物：healthy food；healthily 描述动作：eat healthily。']],questions:[
M('七类目标','把目标和中文配成对。',goals.slice(0,4),'把词放在整个短语里记：do better in school 是“在学校表现得更好”。','每次先点一个英文，再点一个中文。'),
M('七类目标','还有三个小目标，把它们找出来。',goals.slice(4),'read more、be clean and tidy、exercise more 都可以接在 I want to 后面。','tidy 表示整洁；exercise 表示锻炼。'),
M('词表①','给这六张词卡找到意思。',vocab.slice(0,6),'healthily 是“健康地”；exercise 可以表示锻炼或运动。','留意 goal（目标）和 survey（调查）。'),
C('生活中的目标','Lily每天找不到自己的书。她最需要哪个目标？',['be clean and tidy','drink more water','exercise more'],0,'把书和用品整理好，对应 be clean and tidy。','先找和“收拾整齐”有关的目标。'),
S('healthy / healthily','给空格选一个合适的词。',['healthy','healthily'],[['We want to be ___.',0],['We eat and drink ___.',1],['This is ___ food.',0],['She eats ___.',1]],'be healthy 描述状态；eat healthily 描述怎样吃。','看空格前面：be 后描述状态，eat 后描述动作。'),
I('词表拼写','“目标”怎么拼？',['goal'],'goal；have a goal 表示“有一个目标”。','四个字母，开头是 g。',{placeholder:'输入一个英文单词'}),
C('词语搭配','做班级小调查，应写 a class ___。',['survey','medicine','metre'],0,'a class survey 是一次班级调查。','想想哪一个词表示“调查”。'),
O('something new','把“我想学习新事物”拼成一句话。',['new.','learn','I','something','to','want'],['I','want','to','learn','something','new.'],'something new：形容词放在 something 后。','先拼 I want to；new 放在 something 后面。'),
I('healthily 拼写','We eat ______.（健康地）',['healthily'],'healthy 变 y 为 i，再加 ly，得到 healthily。','从 healthy 变成副词，注意 y 的变化。'),
C('目标与行动','Ben想多读书。哪项行动最贴合？',['Read for ten minutes after dinner.','Buy a new basketball.','Watch TV every night.'],0,'每天晚饭后读十分钟，动作和目标相关，也很具体。','目标是 read more，找直接帮助阅读的行动。'),
M('词表②','这六个词，你认识几个？',vocab.slice(6,12),'月份 October、November 的首字母要大写。','test 是测试；match 是比赛。'),
I('月份拼写','“十月”怎么拼？注意首字母。',['October'],'October 的 O 要大写。','O 开头，一共7个字母。',{caseSensitive:true}),
I('月份拼写','“十一月”怎么拼？注意首字母。',['November'],'November 的 N 要大写。','N 开头，一共8个字母。',{caseSensitive:true}),
C('词语放进句子','Please complete the sentence. 这句话要你做什么？',['补全句子','参加比赛','进行调查'],0,'complete 是完成；sentence 是句子。','把 complete 和 sentence 连起来理解。'),
{...C('听音选义','听一听，选出它的意思。',['比赛','测试','目标'],0,'match 是体育比赛；a basketball match 是一场篮球比赛。','如果声音无法播放，可以切换成看词模式。'),type:'listen',audio:'match'},
C('目标辨认','“我想结交新朋友”对应哪个目标？',['make new friends','learn something new','do better in school'],0,'make new friends 表示结交新朋友。','friends 是朋友。')
]},
{title:'把愿望变成计划',en:'Build my plan',color:'#148752',intro:'帮句子装好零件，再把“我想”变成“我打算”。',focus:'want to · am / is / are going to · 动词原形',steps:['昨日热身','句子拼装','圈错修理','具体行动'],notes:[['两种表达','I want to + 动词原形：我想做什么。\nI am going to + 动词原形：我打算怎么做。'],['先看主语','I 用 am；he / she / it、单个人用 is；you / we / they、复数人用 are。'],['别漏掉 be','going to 前要有 am / is / are；后面的动作使用动词原形。']],questions:[
I('间隔复习','We eat ______.（健康地）',['healthily'],'eat healthily，副词修饰动作。','形容词 healthy 要变成副词。'),
C('间隔复习','learn ___',['something new','new something','something newly'],0,'something new，形容词放后面。','回想昨天拼过的句子。'),
M('词表③','把故事里会用到的词配好。',vocab.slice(12,18),'sell 是卖；buy 是买。be late for school 要整体记。','同一个商品，卖家 sell，买家 buy。'),
S('be 动词','给每个主语选好 be 动词。',['am','is','are'],[['I',0],['Amy',1],['we',2],['Amy and I',2],['our school',1]],'Amy and I 是两个人，用 are；our school 是一个学校，用 is。','先判断主语是我、单数，还是复数。'),
O('want to','拼出：我想学做饭。',['cook.','to','I','learn','want','to'],['I','want','to','learn','to','cook.'],'I want to learn to cook. 两个 to 都有自己的搭配。','I want to …；learn to cook 是学做饭。'),
C('动词原形','She is going to ___ more books.',['reads','read','reading'],1,'going to 后用 read 原形，不因为 she 再加 s。','找到 going to，再检查紧接的动作。'),
E('修好漏词','句子少了一个词。点“going”前的空格，再修好它。',['I','___','going','to','exercise.'],1,['am','is','are'],0,'I 对应 am，不能省略。','这是 I am going to 的结构。'),
E('主语搭配','点出需要修改的词，再选正确替换。',['Amy','are','going','to','read.'],1,['am','is','be'],1,'Amy 是单个人，用 is。','先看主语有几个人。'),
E('动词原形','这句里有一个词形不对。点出它，再修好。',['He','is','going','to','reads.'],4,['read.','reading.','to read.'],0,'going to 后面是动词原形 read。','不要让 she / he 干扰 going to 后面的动词。'),
O('计划句拼装','拼出：我们打算明天去跑步。',['tomorrow.','go','are','We','running','going','to'],['We','are','going','to','go','running','tomorrow.'],'We are going to go running tomorrow. go running 是活动搭配。','going to 后先放原形 go，再接 running。'),
C('正确句辨认','哪一句可以保留，不需要修改？',["I’m going to go swimming.","I’m going to swimming.","I going to swim."],0,'going to go swimming 正确，to 后的原形是 go。','找完整的 be going to，再检查后面的第一个动词。'),
I('want to','I want ______ English.（学习）',['to learn'],'want to learn：想学习。这个空要填两个词。','want 后面需要 to + 动词原形。',{placeholder:'填两个英文词'}),
C('第三人称单数','Amy ___ to learn to swim.',['want','wants','wanting'],1,'这里是一般现在时的 wants to，Amy 用 wants。','这句没有 is going to；先看完整结构。'),
S('目标与行动','这些句子是在说愿望，还是行动计划？',['愿望 / 目标','行动计划'],[['I want to get better at English.',0],["I’m going to read English after dinner.",1],['I want to be healthy.',0],["I’m going to drink more water.",1]],'want to 说想实现的目标；be going to 说打算采取的行动。','看句子的核心：want to，还是 am going to。'),
C('把计划写具体','“提高英语”这个目标，哪项计划最具体？',['I am going to work hard.','I am going to read English for ten minutes every evening.','I want to be better.'],1,'动作、时长和时间都清楚，更容易照着做。','找“做什么＋多久＋什么时候”都清楚的句子。'),
I('独立拼装','Amy ______ going to learn to paint.',['is'],'Amy 是单个人，用 is。','不要漏掉 be 动词。')
]},
{title:'问清楚，再出发',en:'Ask and arrange',color:'#9b5a12',intro:'改变句子、安排时间，也把“将有”和“参加”分清。',focus:'否定与问答 · There be · 时间和频次',steps:['昨日热身','问答接力','计划日历','易错分辨'],notes:[['否定与问句','not 放在 be 后面。问句把 am / is / are 提到主语前，不另外加 Do / Does。'],['将来有','There is going to be a match. 将有一场比赛。\nWe are going to have a test. 我们将参加一次测试。'],['时间','on Friday / on 11 October；in October；tomorrow / next month 前通常不加介词。']],questions:[
I('间隔复习','They ______ going to read.',['are'],'They 对应 are。','主语是复数。'),
C('间隔复习','She is going to ___ to cook.',['learns','learn','learning'],1,'going to 后用 learn 原形；后面 learn to cook。','先看 going to 紧接的动词。'),
M('词表④','把最后六个词条配好。',vocab.slice(18),'set a record 是创造纪录；one metre / two metres。','record 在这里是名词“纪录”。'),
O('否定句','拼出：Amy明天不打算读书。',['read','is','tomorrow.','Amy','to','not','going'],['Amy','is','not','going','to','read','tomorrow.'],'not 放在 is 后：is not going to。','先拼 Amy is，再加 not。'),
O('一般疑问句','把“他们打算打篮球吗？”拼出来。',['going','basketball?','they','to','Are','play'],['Are','they','going','to','play','basketball?'],'Are 移到主语 they 前；句末问号。','先找 be 动词，让它站到句首。'),
C('肯定简答','Are you going to learn to cook?',['Yes, I am.',"Yes, I’m.",'Yes, you are.'],0,'别人问 you，你回答 I；肯定简答使用完整的 I am。','回答的人是“我”，肯定简答不能把 I am 缩在句尾。'),
C('否定简答','Is Amy going to run?（作否定回答）',["No, she isn’t.","No, she doesn’t.","No, I’m not."],0,'Is Amy …? 用 she is / she isn’t 回答。','问句用 is，回答也要跟着 is。'),
M('问答配对','看看在问什么，再找对应回答。',[['What are you going to do?','I’m going to swim.'],['When are you going to read?','Tonight.'],['Where is he going to swim?','At the pool.'],['Who are you going to play with?','With Amy.']],'What 问活动，When 问时间，Where 问地点，Who … with 问同伴。','先看开头的疑问词，不要只看答案中相同的单词。'),
E('问句修理','点出问句里的错误，再修好。',['Does','she','going','to','cook?'],0,['Is','Are','Do'],0,'be going to 的问句移动 be：Is she going to cook?','不另外请 does 帮忙。'),
E('将来有','找出并修好错误词。',['There','is','going','to','have','a','test.'],4,['be','has','having'],0,'There is going to be，后面的 be 保留原形。','There be 结构不会变成 There have。'),
S('be / have','每句最后的空格，该选 be 还是 have？',['be','have'],[['There is going to ___ a match.',0],['We are going to ___ a test.',1],['Our school is going to ___ a match.',1],['There are going to ___ two tests.',0]],'There 作开头，用 be；We / Our school 作主语，可以用 have。','先看句首是不是 There。'),
S('时间介词','把时间表达放到合适的位置。',['on','in','不加介词'],[['Friday',0],['October',1],['11 October',0],['tomorrow',2],['next month',2]],'星期、具体日期前用 on；月份前用 in；tomorrow、next month 前不加介词。','区分“一整个月”和“具体哪一天”。'),
I('频次','four ______ a week（一周四次）',['times'],'three / four times a week；time 在这里表示次数。','四次，需要复数形式。'),
C('问活动','想问“你周日打算做什么”，哪句合适？',['What are you going to do on Sunday?','When are you going to swim?','Where are you going to go?'],0,'What … do 问打算做什么。','题目要活动，不是时间或地点。'),
C('日历读图','周计划：周一、周三、周五去跑步。How often does she run?',['Once a week.','Three times a week.','Every day.'],1,'一周有三个跑步日，所以是 three times a week。','数清楚跑步的天数。'),
I('否定祈使句','Don’t ______ late again.（不要再迟到了）',['be'],'Don’t be late；late 是形容词，需要 be。','Don’t 后接动词原形。')
]},
{title:'故事里的小侦探',en:'Read and discover',color:'#b94361',intro:'顺着日期找变化，沿着线索找原因，再去拼读小站。',focus:'篮球日记 · A word 因果 · ai / ay',steps:['昨日热身','篮球日记','故事线索','语音小站'],notes:[['篮球故事','想加入 → 第一次落选 → 朋友帮助 → 努力训练 → 再试一次 → 入选。'],['迟到的原因','父亲生病、家里钱少 → 卖东西买药 → 路远、人多 → 匆忙赶到仍迟到。'],['ai / ay','本课常读 /eɪ/：afraid、fail；may、okay、today。great 也有这个音，但拼写是 ea。said 是例外。']],questions:[
C('间隔复习','There is going to ___ a test.',['have','be','has'],1,'There is going to be，表示将有。','回想昨天的将来“有”。'),
C('间隔复习','Are you going to read?（肯定回答）',['Yes, I am.',"Yes, I’m.",'Yes, she is.'],0,'Yes, I am. 是完整的肯定简答。','谁在回答？使用 I。'),
R('阅读找依据','Why is Lingling sad on 12 October?',diary,['Amy is in, but Lingling is out.','She does not like basketball.','Amy is late for school.'],0,[1],'12 October 那一行说明 Amy 入选、玲玲落选。','先找 12 October。答案还需要点选一条原文依据。'),
R('词义看语境','故事中的“I can make it”最接近什么意思？',diary,['我能制造它。','我能成功做到。','我能买到它。'],1,[2],'make it 在努力争取入选的故事里表示成功、做到。','结合努力和再次尝试的情节理解。'),
O('故事排序','按课文经过排列这五步。',['最后入选','朋友帮助、努力训练','想加入篮球队','再参加测试','第一次落选'],['想加入篮球队','第一次落选','朋友帮助、努力训练','再参加测试','最后入选'],'玲玲没有第一次就成功，而是在帮助和努力之后再试。','先找故事的愿望，再找最后的结果。'),
R('阅读看态度','On 26 October, what is Lingling going to do?',diary,['Give up basketball.','Try again.','Buy medicine.'],1,[3],'still not sure 不等于放弃；她仍打算 try again。','看 26 October 这一行的 but 后面。'),
R('阅读找原因','Why does the boy sell things?',story,['To buy medicine for his father.','To buy a basketball.','To make a school survey.'],0,[1],'卖东西是为了给父亲买药。','先找 sell things 后面紧接的行动。'),
R('阅读找原因','Why is the boy still late today?',story,['He plays basketball before school.','It is a long way and there are too many people.','He wants to sleep in the classroom.'],1,[2],'第三句给出路远、人多的线索。','把“为什么卖东西”和“为什么迟到”这两个问题分开。'),
O('因果排序','把迟到故事的线索连成顺序。',['匆忙去学校，仍然迟到','给父亲买药','父亲生病，家里钱少','上学前卖东西'],['父亲生病，家里钱少','上学前卖东西','给父亲买药','匆忙去学校，仍然迟到'],'先有家庭困难，再有卖东西和买药，最后赶到学校。','先找最早的原因。'),
M('故事短语','把故事里的短语配成对。',[['buy medicine for my father','给父亲买药'],['hurry to school','匆忙赶往学校'],['be afraid of water','害怕水'],['set a world record','创造一项世界纪录']],'介词也要连着记：for my father、to school、of water。','不要只记主要名词，介词也在短语里。'),
S('ai / ay 拼写','按拼写分组，不要只听发音。',['含 ai','含 ay','这两组都不含'],[['afraid',0],['fail',0],['may',1],['today',1],['okay',1],['great',2]],'great 含 ea；虽然也读 /eɪ/，不能放入 ai 或 ay。','直接观察字母组合。'),
C('语音辨认','这组词通常都有哪个音：rain / train / play？',['/eɪ/','/aɪ/','/ɪ/'],0,'本题中的 ai、ay 都读 /eɪ/。','读起来像字母 A 的名称音。'),
C('避免过度套规则','含 ai 就一定读 /eɪ/ 吗？',['一定，所有词都一样。','不一定，例如 said 常读 /sed/。'],1,'字母组合有常见规律，也有例外。','清单里提醒过 said。'),
I('用词搭配','I listen ______ English songs.',['to'],'listen to English songs，to 不能省。','listen 后的介词是哪个？'),
C('动作搭配','哪一句没有错误？',['He is afraid to try.','He is afraid of try.','He afraid of water.'],0,'be afraid to do 和 be afraid of doing 都可使用。','to 后原形；of 后用名词或 -ing；be 不能漏。'),
I('at 后的形式','I want to get better at ______. (swim)',['swimming'],'at 是介词，后接 swimming。','swim 的最后一个 m 要双写，再加 ing。')
]},
{title:'做一个更好的自己',en:'Make it my own',color:'#148752',intro:'把这一周学到的表达，用在一个你真想完成的小目标上。',focus:'混合运用 · 阅读计划 · 独立表达',steps:['旧词再见','句子体检','计划阅读','我的目标卡'],notes:[['写作顺序','一个目标＋三项具体行动。选自己能做到的事，可以写什么时候做、做多久或一周几次。'],['写完自查','目标明确；行动相关；be 不漏；going to 后用原形；句首大写、句末标点。'],['开放表达','自己的计划可以有不同写法。参考答案只是例子，开放题交给老师或按清单自查。']],questions:[
M('核心词再现','把这些容易忘的词再配一次。',[vocab[2],vocab[8],vocab[17],vocab[20],vocab[22],vocab[23]],'healthily、complete、medicine、afraid、record、metre 都回到完整词义。','慢一点，先辨认再配对。'),
I('词表拼写','The boy buys some ______ for his father.（药）',['medicine'],'medicine；这里 some medicine 不加 s。','m 开头，注意中间的 i。'),
I('词表拼写','Please complete the ______.（句子，单数）',['sentence'],'sentence，词尾是 ce。','s 开头，一共8个字母。'),
E('混合改错','这句只有一处错，找出并修好。',['She','eats','healthy.'],2,['healthily.','health.','healthier.'],0,'eat 是动作，要用副词 healthily。','不是问食物怎么样，而是怎样吃。'),
E('混合改错','这句只有一处错，找出并修好。',['I','want','learn','English.'],2,['to learn','learning','learns'],0,'want to learn，不能漏 to。','回忆 want to do 的完整结构。'),
C('不误改正确句','哪句可以直接放进计划卡？',["I’m going to go running tomorrow.",'I am going to runs tomorrow.','I going to run tomorrow.'],0,'going to 后是原形 go；go running 是固定活动搭配。','先检查有没有 be，再检查 to 后的第一个动词。'),
S('动词搭配','给动词选择形式。',['swim','swimming'],[['learn to ___',0],['be good at ___',1],['be afraid of ___',1],['can ___',0]],'to / can 后面用原形；at / of 后面用名词或 -ing。','先看紧挨着动词前面的结构。'),
R('读懂计划','What does Mia want to get better at?',['I’m Mia. I want to get better at English.','I’m going to read English for ten minutes after dinner on Monday and Wednesday.','On Friday, I’m going to talk with Amy in English. We are going to practise together.'],['English.','Basketball.','Cooking.'],0,[0],'第一句写出她的目标：提高英语。','先找 want to。'),
R('读懂计划','When is Mia going to talk with Amy?',['I’m Mia. I want to get better at English.','I’m going to read English for ten minutes after dinner on Monday and Wednesday.','On Friday, I’m going to talk with Amy in English. We are going to practise together.'],['On Monday.','On Wednesday.','On Friday.'],2,[2],'第三句写出和 Amy 练习的时间是 Friday。','When 问时间，找到 talk with Amy 所在句。'),
C('目标与行动','目标：be healthy。哪项行动最需要调整？',['Drink more water.','Eat more vegetables.','Go to bed very late every night.'],2,'每晚很晚睡与健康目标不一致，可以调整为 go to bed early。','看行动是否真正帮助目标。'),
O('独立句子拼装','拼出：下个月将有一场比赛。',['match','be','There','next','is','a','going','month.','to'],['There','is','going','to','be','a','match','next','month.'],'There is going to be a match next month. next month 前不加介词。','先拼“将有”的完整结构。'),
{type:'write',skill:'我的目标卡',prompt:'选一个你真想完成的目标，写4句话：一个目标＋三项行动。',starter:'I want to …\nI’m going to …\nI’m going to …\nI’m going to …',example:'I want to get better at English.\nI’m going to read English for ten minutes after dinner.\nI’m going to listen to English songs on Wednesday.\nI’m going to talk with my friend in English on Friday.',checks:['我写清楚了一个目标。','我写了三项相关、能做到的行动。','我检查了 am / is / are 和动词原形。','我检查了拼写、句首大写和句末标点。'],hint:'可以选健康、阅读、英语、新技能或整理房间。至少一项行动写清什么时候做或做多久。',why:'这道题没有唯一答案。完成自查后，请老师看看你的表达，或把计划读给家人听。'}
]}
];
const stages=[[0,0,1,3,1,2,1,2,2,3,1,2,2,1,1,3],[0,0,0,1,1,1,2,2,2,1,2,1,1,3,3,1],[0,0,0,1,1,1,1,1,3,3,3,2,2,1,2,3],[0,0,1,1,1,1,2,2,2,2,3,3,3,2,2,2],[0,0,0,1,1,1,1,2,2,1,1,3]];
days[1].steps[0]='热身与认词';days[2].steps[0]='热身与认词';days[3].steps[2]='故事与搭配';
days.forEach((d,di)=>d.questions.forEach((q,qi)=>{q.stage=stages[di][qi];q.id=`d${di+1}q${qi+1}`;q.day=di;}));
return {days,vocab,goals,diary,story,source:'依据周六19页《Unit 4 A better me 详细知识清单》编排。故事为课文内容的简写，练习情境为配套原创。',version:1};
})();
