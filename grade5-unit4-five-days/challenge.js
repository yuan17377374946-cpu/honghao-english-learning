/* More demanding practice; original IDs and records remain available as optional tasks. */
(() => {
const U=window.UNIT4;
const C=(prompt,options,answer,why,hint)=>({type:'choice',prompt,options,answer,why,hint});
const F=(prompt,fields,why,hint)=>({type:'cloze',prompt,intro:'只填每个空格缺少的完整英文表达，不用抄整句。',fields:fields.map(([text,...answers])=>({text,answers})),why,hint});
const I=(prompt,answers,why,hint)=>({type:'input',prompt,placeholder:'写出完整英文句子',answers,why,hint});
const R=(prompt,passage,options,answer,evidence,why,hint)=>({type:'reading',prompt,passage,options,answer,evidence,why,hint});
const O=(prompt,tokens,answer,why,hint)=>({type:'order',prompt,tokens,answer,why,hint});
const W=(prompt,starter,example,checks,hint,writingGuide)=>({type:'write',prompt,starter,example,checks,hint,writingGuide,why:'这道表达题有多种合理答案。自查完成后请老师核对，系统不自动判断语法正确。'});
const days=[
[
 C('小组目标是 read more。哪一份安排既落实目标，又能检查自己是否完成？',['I am going to buy some books next month.','I am going to read for ten minutes after dinner on school days and tick my reading card.','I am going to put all my books on a new shelf.'],1,'第二项写明阅读动作、时长、时间和记录方法。买书或整理书架不等于已经阅读。','检查计划里是否真的有阅读，以及怎样知道完成了。'),
 F('根据括号提示补全短文，注意词形变化。',[['Mia wants to be ___.（健康的）','healthy'],['She eats and drinks ___.（健康地）','healthily'],['Her brother ___ every morning.（锻炼；用一般现在时）','exercises']],'be 后用形容词 healthy；描述 eat / drink 用副词 healthily；her brother 是第三人称单数，谓语用 exercises。','先判断空格在句子中起什么作用，再看主语。'),
 R('读整理行动，哪一个目标最能概括她的变化？选答案并点原文依据。',['Every evening, Eva puts her books back on the shelf. She puts dirty clothes in a basket.','Now she can find her school things quickly. She does not buy new boxes.'],['Learn something new.','Be clean and tidy.','Make new friends.'],1,[0],'归还书本、收好脏衣服，都是保持整洁的具体行动。','把几项行动放在一起想，不要只找一个相同单词。'),
 C('Leo说“I want to make new friends.”，但他每天只和同一个人说话。哪项调整最直接帮助目标？',['Talk to a new classmate and ask about his or her favourite game.','Spend every break with his usual friend and never speak to anyone else.','Write down new classmates’ names but never talk to them.'],0,'主动认识新同学并开启交流，直接帮助结交新朋友。','找能改变“交往对象没有变化”的行动。'),
 I('用 want to + 动词原形，把“她想学习新事物”写成完整英文句子。',['She wants to learn something new.'],'She wants to learn something new. She 后用 wants；new 放在 something 后。','注意主语 she，以及 something 和 new 的位置。'),
 W('你想提高英语，但每天只有10分钟。写2句英文：用 I want to 写目标，用 I am going to + 动词原形写一项具体行动，说明何时做、做多久。','I want to …\nI am going to …','I want to get better at English.\nI am going to read English for ten minutes after dinner.',['目标和行动互相对应。','行动写明时间和时长，符合每天10分钟的条件。','检查 wants / want、am 和动词原形。'],'先选一件10分钟能做到的小事，再检查是否直接帮助英语学习。','写2句：目标＋有时间和时长的行动。')
],
[
 F('用 be going to + 动词原形补全周末安排；每空把括号里的动词一起写出。',[['Amy and I ___ the classroom on Saturday. (clean)','are going to clean'],['My brother ___ something new. (learn)','is going to learn'],['I ___ a new friend at the sports club. (make)','am going to make']],'分别看 Amy and I、my brother、I，再用 are / is / am going to + 动词原形。','先圈出各句主语，别让上一个空的 be 动词影响下一个空。'),
 I('用 be going to + 动词原形写出“她下个月打算学游泳”。写完整英文句子。',['She is going to learn to swim next month.','Next month, she is going to learn to swim.'],'She is going to learn to swim next month. going to 后接 learn，learn 后还有 to swim。','句中要同时表达“打算”和“学习游泳”，不能漏掉其中一个结构。'),
 C('只看周末安排，哪句同时符合两条信息：Amy想提高英语；她已约好周日上午和Mia读英文书。',['Amy wants to get better at English, and she is going to read English books with Mia on Sunday morning.','Amy wants to get better at English, and she is going to read English books with Mia on Saturday morning.','Amy wants to get better at English, and she is going to watch an English film with Mia on Sunday morning.'],0,'要同时保留英语目标、同伴、星期和上午这几个条件。','逐条核对信息，不要只看到一个熟悉的句型就选。'),
 F('下面两句都有 be going to 的将来时结构。按括号动词补全，每空写出完整表达。',[['There ___ two tests next month. (be)','are going to be'],['Our class ___ a test next Friday. (have)','is going to have']],'There 后看 two tests 用 are going to be；Our class 作主语，写 is going to have。','区分 There be 的“有”和班级将参加测试。'),
 R('Ben的计划改了。Which plan is still possible? 选答案并点支持它的原文。',['Ben wants to join the basketball team. He is going to practise at the park on Saturday.','The park is closed on Saturday. The school playground is open, and Amy can practise there with him.'],['Practise with Amy at the school playground on Saturday.','Practise at the closed park on Saturday.','Stop practising and wait for the test.'],0,[1],'第二句给出了可用场地和同伴，换地点仍能落实训练目标。','把原计划与新增条件合起来判断。'),
 W('周六图书馆关门了，你仍想多读书。用2句英文调整计划：先用 be not going to + 动词原形说明不去哪里，再用 be going to + 动词原形写可执行的新安排，并写清时间。','I am not going to …\nI am going to …','I am not going to read at the library on Saturday.\nI am going to read at home for twenty minutes on Saturday morning.',['第一句是否定的将来计划。','第二句换了可行地点，仍帮助阅读目标，并写清时间。','两句都有 am，going to 后用动词原形。'],'目标仍是多读书；改变不能执行的地点，再确定新的行动。','写2句：取消原安排＋给出新安排。')
],
[
 F('按要求改写，只填缺少的部分；否定句和问句都用 be going to 结构。',[['Amy is going to read tonight. → Amy ___ read tonight.（改否定）','is not going to',"isn't going to"],['They are going to play basketball. → ___ play basketball?（改一般疑问句）','Are they going to'],['Are you going to learn to cook? → Yes, ___.（肯定简答）','I am']],'否定在 be 后加 not；一般疑问句把 be 提前；you 问我，回答用 I am。','三种要求各不相同，先读括号里的改写要求。'),
 I('已知回答是 At the pool. 请用 Where 和 be going to + 动词原形，对 He is going to swim at the pool. 中的地点提问。保留其他词，写完整问句。',['Where is he going to swim?'],'Where is he going to swim? 提问地点后，原地点短语不再重复；is 放在 he 前。','不是问做什么或何时做，只问地点。'),
 R('Mia想和Amy一起跑步。Which question does Mia still need to ask? 选答案并点原文依据。',['Amy: I am going to go running on Sunday.','Mia: Great! I can join you. I know the day, but I do not know the place.'],['What are you going to do?','Where are you going to go running?','When are you going to go running?'],1,[1],'已知道活动和日期，缺少的是地点，所以需要问 Where。','找对话里还没解决的信息。'),
 C('Ben每周一、周三、周五跑步，每次20分钟。若想得到回答“Three times a week.”，应该问哪一句？',['How long are you going to run each time?','How often do you run?','Where do you run?'],1,'Three times a week 说一周几次；20分钟才是每次多久。','次数、时长和地点是不同的信息。'),
 F('补全周计划，只填需要的介词；不需要介词的空格填 /。',[['We are going to have a test ___ 11 October.','on'],['I am going to learn to paint ___ November.','in'],['She is going to read ___ next Friday.','/']],'具体日期前 on，月份前 in，next Friday 前不加介词。','分清整个月、具体哪一天和带 next 的时间表达。'),
 W('Amy说“I am going to learn to cook.”，但没告诉你时间和同伴。用 be going to 结构写2个不同的英文问句：第1句用 When 问时间；第2句用 Who … with 问和谁一起。','When …?\nWho … with?','When are you going to learn to cook?\nWho are you going to learn to cook with?',['第一句询问时间，第二句询问同伴。','用 you 向Amy提问，be 动词位置正确。','保留 learn to cook，第二句没有漏 with。'],'先明确问哪类信息，再排列疑问词、be、主语和动作。','写2个完整英文问句，不用替Amy编回答。')
],
[
 R('Why does Lingling still need to work hard after Amy helps her? 选最合理解释，并点原文依据。',U.diary,['Amy can take the test for her.','Amy helps her practise, but Lingling still needs to improve and try again.','She has already joined the team on 14 October.'],1,[2,3],'朋友陪练提供帮助，但玲玲仍需自己努力、再次参加测试；朋友不能代替她入选。','对照帮助发生的时间和正式入选的时间。'),
 C('小乐总结篮球日记：“Amy入选了，所以Lingling从此不再参加测试。”这句话错在哪里？',['只错在人物名字的拼写。','把第一次落选当成最终结果，漏看了继续努力、再测试和最后入选。','故事没有提到任何测试。'],1,'这道题要把前后几天的变化连起来，不能用一次结果替代整个过程。','从落选之后继续往后读，看看人物有没有改变行动。'),
 R('Which change would most directly help the boy avoid being late, without stopping him from helping his father? 选答案并点依据。',U.story,['Plan an earlier selling time and leave enough time for the long journey.','Stop buying medicine for his father.','Run into the classroom after the lesson every day.'],0,[1,2],'他要卖东西买药，又面临路远、人多；提前安排和预留路程时间，兼顾了两件事。这是根据课文条件提出的建议。','题目要求同时顾到父亲的需要与准时到校。'),
 O('只根据故事已经发生的事情排序。注意“决定不再迟到”发生在受到提醒之后。',['决定以后不再迟到','父亲生病、家里钱少','受到老师提醒','上学前卖东西买药','路远人多，仍然迟到'],['父亲生病、家里钱少','上学前卖东西买药','路远人多，仍然迟到','受到老师提醒','决定以后不再迟到'],'顺序要同时符合事情发生的时间与因果。','先找最早的原因，再定位老师提醒前后发生了什么。'),
 F('根据短文事实补全英文摘要，使用括号中的动词。',[['Before school, the boy has to ___ things. (sell)','sell'],['He sells things to ___ medicine for his father. (buy)','buy'],['He is not going to ___ late again. (be)','be']],'has to、to 和 going to 后都要使用动词原形，不能因为 the boy 就加 s。','虽然三句的主语都是单数，也要先看动词前面的结构。'),
 W('给故事里的男孩写2句英文建议计划。用 You can + 动词原形写一项具体办法，再用 be going to + 动词原形替他写一句以 I 开头的计划，帮助他照顾父亲并尽量准时到校。','You can …\nI am going to …','You can leave home earlier.\nI am going to sell things earlier and leave enough time for school.',['办法与路远、卖东西占用时间等原因有关。','没有要求他放弃给父亲买药。','can 后用原形，I 后有 am going to。'],'建议要对准迟到原因；不要只写“不要迟到”。','写2句：一项具体建议＋男孩的一句行动计划。')
],
[
 F('计划卡有三处空缺，按括号要求填完整表达。',[['My sister ___ healthier this term. (want / be)','wants to be'],['She and I ___ running on Monday and Thursday. (be going to / go)','are going to go'],['There ___ a sports test next month. (be going to / be)','is going to be']],'要在 wishes、主语复数和 There be 之间切换，不能把三个空写成同一种形式。','每空先看主语，再看括号指定的结构。'),
 R('Which activity can Mia and Amy do together? 核对时间、地点与限制，选答案，并点选说明Amy空闲时间和场地开放情况的原文。',['Mia is free on Wednesday and Friday after 5 pm. She cannot go to the pool.','Amy is free only on Friday after 5 pm. The library is open then, but the sports hall is closed.'],['Swim at the pool on Friday at 6 pm.','Read at the library on Friday at 6 pm.','Play in the sports hall on Wednesday at 6 pm.'],1,[1],'周五6点满足两人的空闲时间，图书馆开放，且不涉及不能去的泳池。第一句也必须一起核对。','每个选项都要同时满足两人的安排和场地限制。'),
 I('用 be going to 结构写完整否定句：“他们明天不打算在图书馆读书。”',['They are not going to read at the library tomorrow.',"They aren't going to read at the library tomorrow.",'Tomorrow, they are not going to read at the library.',"Tomorrow, they aren't going to read at the library."],'They are not going to read at the library tomorrow. 否定在 are 后，地点和时间也要保留。','核对主语、否定、动作、地点与时间有没有漏。'),
 C('目标是 get better at English。哪份计划最需要重写，为什么？',['周一、周三晚饭后读英文10分钟，因为它没有写新书价格。','每天只把英文书搬到桌上，因为安排了准备动作，却没有实际读、听或说英语。','周五和同伴用英语交流，因为行动有具体同伴。'],1,'要区分为学习做准备和真正练习英语；计划要让目标对应到实际行动。','计划看起来忙，不代表目标真的在推进。'),
 F('改写目标卡，只填缺少的表达，保持题目指定的意思。',[['I am going to read on Friday. → ___ read on Friday?（用 you 向我提问）','Are you going to'],['Yes, ___.（我作肯定简答）','I am'],['I want ___ at English.（表达“提高”）','to get better']],'问句要从 I 的陈述转换为 you 的提问，回答再回到 I；最后一空还要保留 want to 的搭配。','说话人换了，人称和 be 动词也要跟着变。'),
 W('完成一张有条件的英语目标卡，写5句英文：①用 I want to 写目标；②③用 be going to + 动词原形写两项行动，各写清何时做；④假设其中一处场地关门，用否定计划取消原安排；⑤写可执行的替代计划。','I want to …\nI am going to …\nI am going to …\nI am not going to …\nI am going to …','I want to get better at English.\nI am going to read English at the library on Monday.\nI am going to talk with Amy in English on Friday.\nThe library is closed, so I am not going to read there on Monday.\nI am going to read English at home on Monday.',['两项行动都直接帮助同一目标，并写清时间。','取消与替代说的是同一项安排，时间地点不矛盾。','两种句型都完整，be、人称、原形和标点正确。'],'先检查内容能否执行，再检查英语。可写得与示例不同，提交后请老师看。','写5句：目标＋两项行动＋取消一项＋替代安排。')
]
];
U.days.forEach((d,di)=>{
 const warm=d.coreIds.slice(0,6);
 if(di<4)warm[5]=['d1-listen-goal','d2-listen-people','d3-listen-time','d4q12'][di];
 const added=days[di].map((q,i)=>({...q,id:`deep-e${di+1}-${i+1}`,day:di,stage:i<2?1:i<4?2:3,skill:({choice:'条件辨析',cloze:'语境填空',input:'整句改写',reading:'阅读推理',order:'因果排序',write:'自主表达'})[q.type],challenge:true,optional:false}));
 d.questions.push(...added);d.coreIds=[...warm,...added.map(q=>q.id)];
 warm.forEach(id=>d.questions.find(q=>q.id===id).stage=0);
 d.steps=['词句热身','语境进阶','迁移挑战','独立表达'];
 d.questions.forEach(q=>q.optional=!d.coreIds.includes(q.id));
 d.focus=['目标推理 · 词形迁移 · 独立表达','多主语计划 · 结构改写 · 调整安排','问答改写 · 信息缺口 · 自主提问','联系上下文 · 因果推断 · 提出建议','多条件安排 · 综合改写 · 应变目标卡'][di];
 d.intro+=' 先热身，再完成需要自己判断和表达的进阶任务。';
});
const writingGuides=[
 ['每天只有10分钟，怎样提高英语？',['写2句英文。第1句用 I want to + 动词原形写目标。','第2句用 I am going to + 动词原形写行动。','行动说明何时做、做多久，并符合每天10分钟的条件。']],
 ['图书馆关门了，怎样调整阅读计划？',['写2句英文，目标仍是多读书。','第1句用 I am not going to + 动词原形，取消原安排。','第2句用 I am going to + 动词原形，写可行的新地点和时间。']],
 ['向Amy问清学做饭的时间和同伴。',['写2个完整英文问句，使用 be going to + 动词原形。','第1句用 When 问什么时候；第2句用 Who … with 问和谁一起。','用 you 向Amy提问，保留 learn to cook；不用替她写回答。']],
 ['帮男孩照顾父亲，也尽量准时到校。',['写2句英文，办法要对应路远、卖东西占时间等原因。','用 You can + 动词原形给一项具体建议。','再用 I am going to + 动词原形，替男孩写一句行动计划。','不能以不再给父亲买药作为办法。']],
 ['做一张能够应对变化的英语目标卡。',['共写5句英文。第1句用 I want to + 动词原形写目标。','第2、3句用 I am going to + 动词原形写两项行动，每项写清时间。','假设其中一处场地关门，第4句用 I am not going to + 动词原形取消该安排。','第5句用 I am going to + 动词原形写替代计划，仍帮助同一个目标。']]
];
U.days.forEach((d,i)=>{const q=d.questions.find(q=>q.id===`deep-e${i+1}-6`);q.prompt=writingGuides[i][0];q.instructions=writingGuides[i][1];});
// Equivalent place expressions and standard time placement are both accepted.
const negative=U.days[4].questions.find(q=>q.id==='deep-e5-3');
negative.answers.push('They are not going to read in the library tomorrow.',"They aren't going to read in the library tomorrow.",'Tomorrow, they are not going to read in the library.',"Tomorrow, they aren't going to read in the library.");
for(const q of U.days.flatMap(d=>d.questions))if(q.type==='input'&&q.challenge)q.answers=[...new Set(q.answers.flatMap(a=>/^(Tomorrow|Next month),/.test(a)?[a,a.replace(',', '')]:[a]))];
U.contentRevision=6;U.challengeRevision=1;
U.coverage.push(['进阶任务','30道进阶题进入每天后半程：语境、词形、整句改写、阅读推理及带约束的自主表达。原题保留为补练。']);
})();
