/* 第三轮课程校对：保留原76题ID，补充缺口，区分基础任务和加练。 */
(() => {
  const u=window.UNIT4;
  const C=(id,skill,prompt,options,answer,why,hint,extra={})=>({id,type:'choice',skill,prompt,options,answer,why,hint,...extra});
  const L=(id,skill,prompt,audio,options,answer,why,hint)=>({...C(id,skill,prompt,options,answer,why,hint),type:'listen',audio});
  const O=(id,skill,prompt,tokens,answer,why,hint)=>({id,type:'order',skill,prompt,tokens,answer,why,hint});
  const W=(id,skill,prompt,starter,example,checks,hint,extra={})=>({id,type:'write',skill,prompt,starter,example,checks,hint,why:'这道题有多种合理表达。自查后交给老师核对，不自动判为语言正确。',...extra});
  const originals=u.days.flatMap(d=>d.questions);
  const additions=[
    [0,C('d1-survey','读调查表','根据表格，班级里排在前两位的目标是哪一组？',[
      'read more / exercise more','read more / be clean and tidy','exercise more / make new friends'
    ],0,'8票和6票排在前两位，对应 read more 与 exercise more。','先比较票数，再核对对应目标。',{
      table:{caption:'班级目标小调查：20人，每人选一个最想实现的目标',headers:['目标','票数'],rows:[['read more','8'],['exercise more','6'],['be clean and tidy','4'],['make new friends','2']]},stage:3
    })],
    [0,L('d1-listen-goal','听句子找目标','听Leo的话，他最想改善什么？','I want to be clean and tidy. I am going to put my books on the shelf after school.',[
      'Keep his things tidy.','Read more books.','Make new friends.'
    ],0,'他说想保持整洁，放学后会把书放在书架上。不能只听到 books 就选 read more。','先听 I want to 后面的目标，再听行动是否与它一致。')],
    [1,{id:'d2-context',type:'cloze',skill:'把句型放回日记',prompt:'用 be going to + 动词原形表示将来的计划，补全下面五句。',intro:'每空填完整的“am / is / are + going to + 括号内动词的原形”，不用抄整句。先看主语，选择合适的 be 动词。',
      fields:[
        {text:'There ___ a basketball match next month. (be)',answers:['is going to be']},
        {text:'Amy and I ___ hard. (work)',answers:['are going to work']},
        {text:'I ___ running four times a week. (go)',answers:['am going to go']},
        {text:'Amy ___ basketball games on TV. (watch)',answers:['is going to watch']},
        {text:'We ___ the other teams, too. (study)',answers:['are going to study']}
      ],why:'依次是 is going to be、are going to work、am going to go、is going to watch、are going to study。每次都先看主语，再用动词原形。',hint:'不要只写 be 动词，也不要只写动作；每个空都需要完整的 be going to + 动词原形。',stage:1}],
    [1,L('d2-listen-people','听人物和行动','听计划，Amy打算做什么？','Amy is going to watch basketball games on TV. Lingling is going to go running. They are going to work hard.',[
      'Go running.','Watch basketball games on TV.','Learn to swim.'
    ],1,'Amy 看篮球比赛，Lingling 去跑步。两人的行动不能混在一起。','听到 Amy 后，留意紧接着的动作。')],
    [1,W('d2-one-plan','自己写一句计划','想一件你明天真能做到的事，用 be going to + 动词原形表示将来的计划。以 I am going to 开头，写一句完整英文，并写明时间。','I am going to … tomorrow.','I am going to read for ten minutes tomorrow.',[
      '我写了完整的 I am going to 和动词原形。','我写的事情能做到，也说明了时间。'
    ],'先想“明天做什么”，再检查 am 有没有漏，going to 后的动作有没有用原形。',{writingGuide:'写1句：计划做什么＋什么时候。',compact:true,stage:3})],
    [2,O('d3-wh-question','独立拼问句','想问“你周日打算做什么”，按 What + be + 主语 + going to do 的顺序拼句。',[
      'do','you','Sunday?','are','to','What','on','going'
    ],['What','are','you','going','to','do','on','Sunday?'],'What are you going to do on Sunday? What 问活动，are 放在 you 前，do 保留。','先放 What，再找到和 you 搭配的 be 动词。')],
    [2,L('d3-listen-time','听计划的变化','她最后打算什么时候读书？','I am not going to read on Friday. I am going to read on Saturday morning.',[
      'On Friday.','On Saturday morning.','On Sunday morning.'
    ],1,'Friday 是被否定的时间；最后的计划是 Saturday morning。','别听到第一个时间就选，留意 not 和后面修正的计划。')],
    [2,{id:'d3-am-not',type:'input',skill:'完整改写否定句',prompt:'把 I am going to stay up late. 改成否定句，使用 am not going to。',answers:["I am not going to stay up late.","I’m not going to stay up late."],why:'I am not going to stay up late. 或 I’m not going to stay up late. 不使用 amn’t。',hint:'not 放在 am 后；句子里的其他词保留。',stage:3}],
    [3,{...C('d4-help','阅读看原因','What helps Lingling join the team? 选择答案，并点选直接支持它的原文。',[
      'Amy’s help and Lingling’s hard work.','Amy’s help, without Lingling’s practice.','Lingling’s hard work, without anyone’s help.'
    ],0,'14 October 的句子同时写了 Amy 陪练和玲玲打算努力，两方面都帮助了她。','选择能包括原文两条线索的答案，不要只选其中一条。'),type:'reading',passage:u.diary,evidence:[2],stage:1}],
    [3,W('d4-short-answer','用英文回答原因','Why does the boy sell things? 读短文，用一句英文回答。','He sells things to …','He sells things to buy medicine for his father.\n也可以回答：To buy medicine for his father.',[
      '我的回答说明了卖东西的目的。','我写到了给父亲买药，没有只重复“上学迟到”。'
    ],'Why 问原因或目的；读第二句，想想他卖东西是为了做什么。',{passage:u.story.slice(0,3),writingGuide:'用1句英文回答目的；可以使用 to + 动词原形。',compact:true,stage:2})],
    [3,{id:'d4-quotes',type:'match',skill:'名言里的行动',prompt:'读懂这三句话强调的意思，再和右边的小行动配对。',pairs:[
      ['Keep going.','练习遇到困难，第二天继续。'],
      ['Start with a small step.','先每天读两行，再慢慢增加。'],
      ['It’s OK to fail.','第一次没做到，调整后再试。']
    ],why:'对应课本“坚持行动、从小事开始、允许失败”的三个意思。这里用简短英语转述，不要求背名人原句。',hint:'分别找出“继续”“先从小事做起”“接受失败”的行动。',stage:3}],
    [4,C('d5-timetable','让计划符合时间','Mia想和Amy一起练英语。两人什么时候都有空？',[
      'Monday at 7:00 pm.','Wednesday at 7:00 pm.','Friday at 7:00 pm.'
    ],2,'只有周五晚上7点两人都写着 Free；其他两天分别有一个人要上课。','要同时检查两个人的安排。',{
      table:{caption:'放学后的安排',headers:['时间','Mia','Amy'],rows:[['Monday, 7:00 pm','Free（有空）','Music lesson（音乐课）'],['Wednesday, 7:00 pm','Swimming lesson（游泳课）','Free（有空）'],['Friday, 7:00 pm','Free（有空）','Free（有空）']]},stage:2
    })],
    [4,C('d5-dialogue','让对话接得自然','Amy: I’m going to learn to swim. What about you?\nBen应该怎样接，才能回答Amy的问题？',[
      'I’m going to learn to cook.','Yes, she is going to swim.','I learned to cook yesterday.'
    ],0,'What about you? 承接前面的将来计划，问对方打算做什么。Ben 应说自己的计划。','看看 you 指谁，再判断前面谈的是过去还是接下来的计划。',{stage:1})]
  ];

  const byId=Object.fromEntries(originals.map(q=>[q.id,q]));
  // 避免把开放的语法差异当作错误：把拼句要求限定为本单元教授的结构。
  byId.d3q4.prompt='按 not 放在 be 后的结构，拼出：Amy明天不打算读书。';
  byId.d3q15.skill='读周计划';
  byId.d3q15.prompt='根据这张周计划，How often does she run?';
  byId.d3q15.table={caption:'一周跑步计划',headers:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],rows:[['Run','Rest','Run','Rest','Run','Rest','Rest']]};
  // 语音判断必须提供可听的材料；看词模式单独记录。
  byId.d4q12.type='listen';byId.d4q12.audio='rain. train. play.';
  byId.d4q12.prompt='听这三个词，它们共有哪个音？';
  byId.d4q10.skill='课内短语';byId.d4q10.prompt='把本单元出现的短语配成对。';
  // 把“分类句式”和“理解句意”分开，不将 want to 和 going to 一律等同于目标/行动。
  byId.d2q14.skill='辨认两种表达';
  byId.d2q14.prompt='按句子实际使用的表达分类。';
  byId.d2q14.bins=['使用 want to','使用 be going to'];
  byId.d2q14.why='want to 常用来说愿望；be going to 常用来说计划。两种句式都可以谈同一件事，不能只凭内容就判断语法结构。';
  byId.d2q14.hint='看句子里用的是 want to 还是 am going to。';
  // 调整过于离题的干扰项：答案要读懂语境才能选出。
  byId.d1q10.options=['Read for ten minutes after dinner.','Buy books and leave them on the shelf.','Talk about books without reading them.'];
  byId.d1q10.why='第一项把阅读变成实际行动；买书和谈论书本身不能代替阅读。';
  byId.d4q6.options=['She has no doubts about the test.','She is going to try again, even though she is not sure.','She is not going to take the test again.'];
  byId.d4q6.why='她仍没有把握，但仍打算再试；not sure 不等于放弃，也不等于已经充满把握。';
  byId.d5q9.options=['On Monday and Wednesday.','Every evening.','On Friday.'];
  byId.d5q9.why='On Monday and Wednesday 是她读书的时间；与 Amy 练习是 Friday，要对准题目中的活动。';

  // 题干说明动作、目标句型与作答范围，不让学生猜任务要求。
  byId.d1q2.prompt='把左边三个英文目标和右边的中文意思一一配对。';
  byId.d1q11.prompt='把这六个英文词和中文意思一一配对。';
  byId.d1q8.prompt='用 want to + 动词原形，把“我想学习新事物”拼成完整的英文句子。';
  byId.d2q4.prompt='为每一行的主语选择对应的 be 动词：am、is 或 are。';
  byId.d2q5.prompt='用 want to + 动词原形，按顺序点词块，拼出“我想学做饭”。';
  byId.d2q8.prompt='下面是 be going to + 动词原形的将来时句子。有一处错误，点出错误词，再选择正确替换。';
  byId.d2q9.prompt='下面用 be going to + 动词原形表示将来的计划。有一个词形错误，点出它，再选择正确替换。';
  byId.d2q10.prompt='用 be going to + 动词原形表示将来的计划，按顺序点词块，拼出“我们打算明天去跑步”。';
  byId.d2q14.prompt='逐句看使用了哪种结构，再选择分类：want to + 动词原形，或 be going to + 动词原形。';
  byId.d3q3.prompt='把左边六个英文词和右边的中文意思一一配对。';
  byId.d3q4.prompt='用 be going to + 动词原形的否定形式（not 放在 be 后），拼出“Amy明天不打算读书”。';
  byId.d3q5.prompt='用 be going to + 动词原形的一般疑问句，拼出“他们打算打篮球吗？”';
  byId.d3q6.prompt='别人问你 Are you going to learn to cook? 请选择正确的肯定简短回答。';
  byId.d3q7.prompt='别人问你 Is Amy going to run? 请选择正确的否定简短回答。';
  byId.d3q12.prompt='为每个时间表达选择前面需要的介词：on、in 或“不加介词”。';
  byId.d5q11.prompt='用 There be 的将来时结构 There is going to be，拼出“下个月将有一场比赛”。';
  byId.d5q12.prompt='选一个你真想完成的目标，写4句英文：第1句用 I want to + 动词原形写目标；后3句用 I am going to + 动词原形写行动计划。至少一项行动写清时间或时长。';
  const wordDays=[0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4];
  u.vocab.forEach(([word,meaning],i)=>{
    let q=originals.find(q=>q.type==='input'&&q.answers?.length===1&&q.answers[0]===word);
    if(!q){q={id:`word-${i+1}`,type:'input',skill:'词表独立拼写',prompt:`请写本单元词表里的${word.includes(' ')?'完整短语':'单词原形'}：${meaning}。`,answers:word==='metre'?['metre','meter']:[word],why:word==='metre'?'课本采用英式拼写 metre；美式拼写 meter 也正确。':`${word}：${meaning}。`,hint:word==='be late for school'?'这个短语从 be 开始，写出“上学迟到”的完整表达。':'先回想词表中的英文。写完逐个字母检查，不要用其他近义词替代本单元的词。',caseSensitive:word==='October'||word==='November',stage:2};additions.push([wordDays[i],q]);}
    q.word=word;
  });
  additions.forEach(([di,q])=>{q.day=di;q.stage??=q.type==='write'?3:q.type==='listen'?[3,3,2,3,2][di]:1;u.days[di].questions.push(q);});
  const coreIds=[
    ['d1q1','d1q2','d1q3','d1q4','d1q5','d1q6','d1q8','d1q9','d1q10','d1q11','d1-survey','d1-listen-goal'],
    ['d2q1','d2q3','d2q4','d2q5','d2q6','d2q13','d2q8','d2q9','d2q10','d2-context','d2-listen-people','d2-one-plan'],
    ['d3q3','d3q4','d3q5','d3q6','d3q7','d3q8','d3q9','d3q10','d3q11','d3q12','d3-wh-question','d3-listen-time'],
    ['d4q1','d4q3','d4q4','d4q5','d4q6','d4q7','d4q8','d4q9','d4q11','d4q12','d4-help','d4-short-answer'],
    ['d5q1','d5q2','d5q3','d5q4','d5q5','d5q6','d5q8','d5q9','d5q11','d5q12','d5-timetable','d5-dialogue']
  ];
  // 写作作为最后的整合任务；其余基础任务保留原题ID。
  coreIds[4]=['d5q1','d5q2','d5q3','d5q4','d5q5','d5q6','d5q8','d5q9','d5q11','d5-timetable','d5-dialogue','d5q12'];
  u.days.forEach((d,di)=>{d.coreIds=coreIds[di];d.questions.forEach(q=>{q.optional=!coreIds[di].includes(q.id);q.extension=['d4q13','d4q15','d4q16','d5q7'].includes(q.id);});});
  u.days[0].focus='认读与目标 · 调查表 · 听懂目标';
  u.days[1].focus='愿望与计划 · 语境填空 · 自己写一句';
  u.days[2].focus='否定与问答 · 时间表达 · 听懂变化';
  u.days[3].focus='篮球日记 · 故事因果 · 听辨 ai / ay';
  u.days[4].focus='综合运用 · 真实时间安排 · 我的目标卡';
  u.days[1].notes.push(['完整语境','be going to 不仅要会选一个词，也要会按主语写出整个表达：is going to be、are going to work、am going to go。']);
  u.days[3].notes.push(['用英文短答','Why 问原因或目的，可以使用 Because … 或 To … 回答。合理表达不只有参考示例一种，短答交给老师核对。']);
  ['#58cc02','#1cb0f6','#ffbd3e','#ad82f5','#ff8567'].forEach((color,i)=>{u.days[i].color=color;});
  u.contentRevision=5;
  u.coverage=[
    ['24个词条','每个词都有认读配对和独立拼写入口；基础任务选重点，其余可加练。'],
    ['七类目标','七类全部进入配对，另有情境选择、目标调查表和听句理解。'],
    ['核心句型','want to 与 be going to；be 的人称变化、动词原形、否定和问答；完整日记语境填空。'],
    ['时间与语境','星期、月份、具体日期、明天/下个月；读时间表，听懂计划变化。'],
    ['两篇课文','时间线、原因、结果和关键词义；选原文依据；一题英文开放短答。'],
    ['语音与听力','ai / ay 常见发音；四题基础听句/听词活动。设备合成朗读，非教材原配录音。'],
    ['表达与写作','先写一句自己的计划，再用英文短答，最后写目标和三项行动；开放题由老师核对。'],
    ['补充与选做','名言理解、完整否定改写、其他词条拼写及拓展搭配。原配听力的数字与人物答案仍需原录音核实。']
  ];
})();


