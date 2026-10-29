import json
from pathlib import Path
ROOT=Path(__file__).parent

def parts(*pairs): return [[text,role] for text,role in pairs if text]
def cap(s): return s[0].upper()+s[1:]
examples=[]
# 主语 | be | 其余信息 | 中文 | 疑问词 | 问句保留信息 | 中文问句
be_rows='''
He|is|at school|他在学校。|Where||他在哪里？
They|are|in the library|他们在图书馆。|Where||他们在哪里？
The bag|is|blue|这个书包是蓝色的。|What colour||这个书包是什么颜色的？
She|is|twelve years old|她十二岁。|How old||她多大？
The boys|are|happy|男孩们很开心。|How||男孩们感觉怎么样？
The meeting|is|on Friday|会议在星期五。|When||会议在什么时候？
Tom|is|late because of the rain|汤姆因为下雨而迟到。|Why|late|汤姆为什么迟到？
The shoes|are|eighty yuan|这双鞋八十元。|How much||这双鞋多少钱？
The station|is|two kilometres away|车站在两千米外。|How far|from here|车站离这里多远？
Her name|is|Lucy|她的名字是露西。|What|her name|她叫什么名字？
The keys|are|on the desk|钥匙在书桌上。|Where||钥匙在哪里？
Your brother|is|in Grade Nine|你的哥哥在九年级。|What grade|in|你的哥哥在几年级？
The weather|is|warm today|今天天气暖和。|What|the weather like today|今天天气怎么样？
The book|is|about animals|这本书讲动物。|What|the book about|这本书是关于什么的？
The children|are|at the park|孩子们在公园。|Where||孩子们在哪里？
She|was|at home yesterday|她昨天在家。|Where|yesterday|她昨天在哪里？
They|were|tired after the game|他们比赛后很累。|How|after the game|他们比赛后感觉怎么样？
The film|was|two hours long|这部电影时长两小时。|How long||这部电影多长？
The bus|was|late because of the traffic|公交车因为交通拥堵而晚点。|Why|late|公交车为什么晚点？
The students|were|in the museum on Sunday|学生们星期日在博物馆。|Where|on Sunday|学生们星期日在哪里？
'''
for i,line in enumerate(be_rows.strip().splitlines()):
    sub,b,rest,zh,w,remain,qzh=line.split('|')
    # Certain complement questions repeat the noun instead of the original subject.
    qsub=sub; qrest=remain
    if i==9: qsub='her name';qrest=''
    if i==12: qsub='the weather';qrest='like today'
    if i==13: qsub='the book';qrest='about'
    sublow=sub if sub in ['Tom','Lucy','I'] else sub[0].lower()+sub[1:]
    examples.append(dict(id=f'be-{i+1}',route='be',s=parts((sub,'sub'),(b,'aux'),(rest,'rest')),y=parts((cap(b),'aux'),(sublow,'sub'),(rest,'rest')),q=parts((w,'wh'),(b,'aux'),(qsub if qsub in ['Tom','I'] else qsub[0].lower()+qsub[1:],'sub'),(qrest,'rest')),zh=zh,yzh=zh.rstrip('。')+'吗？',qzh=qzh,tip=f'把 {b} 移到主语前；不再加 do / does / did。特殊疑问句用 {w} 替换要问的信息。'))

modal_rows='''
She|can|swim|她会游泳。|What|do|她会做什么？
They|can|meet at the school gate|他们可以在校门口见面。|Where|meet|他们可以在哪里见面？
Tom|can|come on Saturday|汤姆可以星期六来。|When|come|汤姆什么时候可以来？
We|can|get there by bus|我们可以坐公交车到那里。|How|get there|我们可以怎样到那里？
You|can|borrow three books|你可以借三本书。|How many books|borrow|你可以借几本书？
She|can|stay for two days|她可以待两天。|How long|stay|她可以待多久？
He|can|run five kilometres|他能跑五千米。|How far|run|他能跑多远？
You|can|ask Mr Li for help|你可以向李老师求助。|Who|ask for help|你可以向谁求助？
We|should|leave at seven|我们应该七点出发。|When|leave|我们应该什么时候出发？
You|should|put the box under the table|你应该把箱子放在桌子下面。|Where|put the box|你应该把箱子放在哪里？
She|should|take an umbrella|她应该带一把伞。|What|take|她应该带什么？
We|should|save water because it is important|我们应该节约用水，因为水很重要。|Why|save water|我们为什么应该节约用水？
They|will|visit the museum tomorrow|他们明天将参观博物馆。|What|visit tomorrow|他们明天将参观什么？
The train|will|arrive at nine|火车将九点到达。|When|arrive|火车将什么时候到达？
She|will|travel by train|她将坐火车旅行。|How|travel|她将怎样出行？
We|will|stay in Shenzhen|我们将住在深圳。|Where|stay|我们将住在哪里？
He|could|ride a bike at six|他六岁时会骑自行车。|What|do at six|他六岁时会做什么？
You|must|finish the work before Friday|你必须在星期五之前完成工作。|When|finish the work|你必须什么时候完成工作？
The team|will|need ten chairs|这个团队将需要十把椅子。|How many chairs|need|这个团队将需要多少把椅子？
You|can|keep the book for a week|你可以保留这本书一周。|How long|keep the book|你可以保留这本书多久？
'''
for i,line in enumerate(modal_rows.strip().splitlines()):
    sub,m,rest,zh,w,remain,qzh=line.split('|');sl=sub if sub in ['Tom','I'] else sub[0].lower()+sub[1:]
    examples.append(dict(id=f'modal-{i+1}',route='modal',s=parts((sub,'sub'),(m,'aux'),(rest,'verb')),y=parts((cap(m),'aux'),(sl,'sub'),(rest,'verb')),q=parts((w,'wh'),(m,'aux'),(sl,'sub'),(remain,'verb')),zh=zh,yzh=zh.rstrip('。')+'吗？',qzh=qzh,tip=f'把 {m} 移到主语前；后面的动词用原形。疑问词要与被替换的信息对应。'))

# 主语 | 原动词 | 原信息 | do/does/did | 动词原形 | 疑问词 | 保留信息 | 中文 | 中文问句
ordinary_rows='''
He|plays|football after school|does|play|When|football|他放学后踢足球。|他什么时候踢足球？
They|live|in Shenzhen|do|live|Where||他们住在深圳。|他们住在哪里？
She|goes|to school by bus|does|go|How|to school|她坐公交车去上学。|她怎样去上学？
Tom|likes|science|does|like|What subject||汤姆喜欢科学。|汤姆喜欢什么学科？
You|get up|at seven|do|get up|What time||你七点起床。|你几点起床？
He|reads|every evening|does|read|How often||他每天晚上阅读。|他多久阅读一次？
They|bought|some fruit yesterday|did|buy|What|yesterday|他们昨天买了一些水果。|他们昨天买了什么？
She|visited|her aunt last Sunday|did|visit|Who|last Sunday|她上个星期日看望了姨妈。|她上个星期日看望了谁？
The lesson|starts|at eight|does|start|When||课八点开始。|课什么时候开始？
You|need|two eggs|do|need|How many eggs||你需要两个鸡蛋。|你需要几个鸡蛋？
The ticket|costs|thirty yuan|does|cost|How much||这张票三十元。|这张票多少钱？
He|walked|for an hour|did|walk|How long||他走了一个小时。|他走了多久？
They|went|to the park yesterday|did|go|Where|yesterday|他们昨天去了公园。|他们昨天去了哪里？
She|studies|English because she enjoys it|does|study|Why|English|她学英语，因为她喜欢英语。|她为什么学英语？
We|have|lunch at school|do|have|Where|lunch|我们在学校吃午饭。|我们在哪里吃午饭？
He|wrote|a letter last night|did|write|What|last night|他昨晚写了一封信。|他昨晚写了什么？
Your parents|work|in a hospital|do|work|Where||你的父母在医院工作。|你的父母在哪里工作？
Amy|takes|the red bus|does|take|Which bus||埃米坐红色的公交车。|埃米坐哪一辆公交车？
The children|cleaned|the classroom after lunch|did|clean|When|the classroom|孩子们午饭后打扫了教室。|孩子们什么时候打扫了教室？
He|drinks|two glasses of milk every day|does|drink|How much milk|every day|他每天喝两杯牛奶。|他每天喝多少牛奶？
'''
for i,line in enumerate(ordinary_rows.strip().splitlines()):
    sub,v,rest,a,base,w,remain,zh,qzh=line.split('|');sl=sub if sub in ['Tom','Amy','I'] else sub[0].lower()+sub[1:]
    examples.append(dict(id=f'do-{i+1}',route='do',s=parts((sub,'sub'),(v,'verb'),(rest,'rest')),y=parts((cap(a),'aux'),(sl,'sub'),(base,'verb'),(rest,'rest')),q=parts((w,'wh'),(a,'aux'),(sl,'sub'),(base,'verb'),(remain,'rest')),zh=zh,yzh=zh.rstrip('。')+'吗？',qzh=qzh,tip=f'用 {a} 帮助提问，原动词 {v} → {base}。do 用于现在时非三单主语；does 用于现在时三单；did 用于一般过去时。'))

wh=[]
wh_rows='''
What|什么；做什么|事物或活动|What do you do after school?|I play basketball.|放学后你做什么？|我打篮球。|别只认 what，要连着后面的名词或动词一起理解。
Who|谁|人|Who helped you?|My teacher.|谁帮助了你？|我的老师。|这里 who 本身是主语，不加 did。
Whose|谁的|归属|Whose bag is this?|It is Lucy’s.|这是谁的书包？|这是露西的。|who 问“谁”，whose 问“谁的”。
Which|哪一个|范围内的选择|Which bus do you take?|The red one.|你坐哪辆公交车？|红色的那辆。|which 后面可以接名词，如 which book。
Where|哪里|地点|Where does she live?|Near the park.|她住在哪里？|公园附近。|地点回答常见 in / on / at / near 开头。
When|什么时候|时间|When will they come?|On Friday.|他们什么时候来？|星期五。|日期、星期、时刻等都可能回答 when。
What time|几点|具体时刻|What time does the lesson start?|At eight.|课几点开始？|八点。|更侧重钟表上的具体时刻。
Why|为什么|原因|Why are you late?|The bus was late.|你为什么迟到？|公交车晚点了。|回答可以说明原因，不一定有 because。
How|怎样；如何|方式或状态|How do you go to school?|By bus.|你怎样去上学？|坐公交车。|How are you? 问状态；How do you…? 常问方式。
How old|多大|年龄|How old is your sister?|She is twelve.|你的妹妹多大？|她十二岁。|old 和 how 合起来看。
How many|多少个|可数事物的数量|How many books do you need?|Three.|你需要几本书？|三本。|how many 后通常接可数名词复数。
How much|多少；多少钱|不可数名词的量或价格|How much milk do you need?|Two glasses.|你需要多少牛奶？|两杯。|How much is it? 问价格；How much water…? 问量。
How often|多久一次|频率|How often do you read?|Every evening.|你多久阅读一次？|每天晚上。|every day / twice a week 是频率；for two days 是时长。
How long|多长；多久|长度或持续时间|How long will you stay?|For two days.|你会待多久？|两天。|按语境判断物体长度还是时间长度。
How far|多远|距离|How far is the station?|Two kilometres away.|车站多远？|两千米远。|ten minutes’ walk 也可以表达距离。
How soon|多久以后|到未来某事发生还要多久|How soon will he return?|In two days.|他多久以后回来？|两天后。|常见回答 in + 一段时间；与 how long 区分。
'''
for i,line in enumerate(wh_rows.strip().splitlines()):
    word,meaning,kind,q,a,qzh,azh,note=line.split('|');wh.append(dict(id=f'w{i}',word=word,meaning=meaning,kind=kind,q=q,a=a,qzh=qzh,azh=azh,note=note))

# 每条听力：问题 | 类型 | 所问信息 | 三个答案 | 正确序号 | 解析
listening_rows='''
Is your brother at home?|一般疑问句|是否|Yes, he is.~At seven.~By bus.|0|Is 提到主语前，问是否在家。回答 he is 与 your brother 对应。
Do you walk to school?|一般疑问句|是否|Near the park.~No, I take the bus.~At eight.|1|Do 开头，问是否步行上学。No 后的具体说明也要听清。
Can Lucy swim?|一般疑问句|是否|On Sunday.~For an hour.~Yes, she can.|2|Can 开头，问能力；回答保留 can，主语 Lucy 对应 she。
Did they finish the work?|一般疑问句|是否|Yes, they did.~They are at school.~Three books.|0|Did 表示过去的提问。用 did 回答，不能改成 do。
Are the students ready?|一般疑问句|是否|At the school gate.~Yes, they are.~Twice a week.|1|Are 开头，问学生们是否准备好；复数 students 对应 they。
Will you join us tomorrow?|一般疑问句|是否|Yesterday.~In the library.~Yes, I will.|2|Will 开头，问明天是否参加。you 的回答从说话人角度改成 I。
Does he like science?|一般疑问句|是否|Yes, he does.~By train.~Twelve years old.|0|Does 开头，问是否喜欢科学。回答用 does。
Was she late yesterday?|一般疑问句|是否|At nine.~No, she was on time.~Two kilometres.|1|Was 开头，问昨天是否迟到；on time 表示准时。
What does he do after school?|特殊疑问句|活动或事物|At five.~At school.~He plays football.|2|What…do 问做什么，选活动；两个 do/does 的作用不同。
Who called you last night?|特殊疑问句|人或归属|My aunt.~Last night.~At home.|0|Who 是主语，问谁打电话给你；没有 did 也仍然是特殊疑问句。
Where did they go yesterday?|特殊疑问句|地点|By bus.~To the museum.~On Sunday.|1|Where 问目的地；by bus 是方式，不能回答去哪里。
When does the film start?|特殊疑问句|时间或时刻|At the cinema.~With my friend.~At half past seven.|2|When 问时间。不要因为 film 就选电影院。
Why is she tired?|特殊疑问句|原因|She went to bed late.~In her room.~She is fourteen.|0|说明晚睡就是原因；正确回答不必出现 because。
How do you get to school?|特殊疑问句|方式或状态|At seven.~By bike.~Near the shop.|1|How do you get… 问交通方式；by bike 表示骑自行车。
How often do you play basketball?|特殊疑问句|频率|For two hours.~In two days.~Twice a week.|2|How often 问频率；for two hours 是时长，in two days 是两天后。
How long will you stay here?|特殊疑问句|时长或长度|For three days.~Three times a week.~In three days.|0|How long 问停留多久；for three days 表示三天的时长。
How soon will the bus arrive?|特殊疑问句|多久以后|For ten minutes.~In ten minutes.~Every ten minutes.|1|How soon 问距离到达还要多久；in ten minutes 表示十分钟后。
How far is the library from here?|特殊疑问句|距离|For ten minutes.~At ten.~About two kilometres.|2|How far 问距离；不要把时刻和时长混进来。
How many students are in your class?|特殊疑问句|数量或价格|Forty.~Four times a week.~Forty yuan.|0|How many students 问学生人数，forty yuan 是价格。
How much is the ticket?|特殊疑问句|数量或价格|Two tickets.~Thirty yuan.~At half past six.|1|How much is… 问价格，要选金额。
Which bag is yours?|特殊疑问句|选择|It is Lucy’s.~At school.~The blue one.|2|Which 问哪一个，回答蓝色的那个；Lucy’s 回答的是别人的归属。
Whose book is this?|特殊疑问句|人或归属|It is Tom’s.~The red one.~On the desk.|0|Whose 问谁的。Tom’s 表示汤姆的，不是问书的位置。
How old is your sister?|特殊疑问句|年龄|At twelve.~She is twelve.~Twelve yuan.|1|How old 问年龄；at twelve 是十二点，twelve yuan 是十二元。
What time did you leave home?|特殊疑问句|时间或时刻|By bus.~Near the school.~At seven this morning.|2|What time 问具体时刻。did 提醒这是过去发生的事情。
'''
listening=[]
for i,line in enumerate(listening_rows.strip().splitlines()):
    q,typ,kind,opts,ans,exp=line.split('|');listening.append(dict(id=f'l{i+1}',q=q,type=typ,kind=kind,options=opts.split('~'),answer=int(ans),explain=exp))

readings=[dict(id='r1',title='一次图书馆活动',tag='基础 · 时间 / 地点 / 原因 / 数量',sentences=[
['Last Saturday, Amy and her brother went to the city library.','上个星期六，埃米和哥哥去了市图书馆。'],
['They took the bus because it was raining.','因为下雨，他们乘坐了公交车。'],
['They arrived at nine in the morning.','他们早上九点到达。'],
['A teacher showed them how to find books about animals.','一位老师教他们怎样找到关于动物的书。'],
['Amy borrowed two books, and her brother borrowed one.','埃米借了两本书，哥哥借了一本。'],
['They read quietly for an hour before going home.','回家前，他们安静地读了一个小时。'],
['Amy plans to visit the library again next Saturday.','埃米计划下个星期六再去图书馆。']],questions=[
['Where did Amy and her brother go last Saturday?','地点',['To the city library.','To the zoo.','To their school.'],0,[1],'Where 问地点。第1句直接给出去处，不要被 animals 带到动物园。'],
['Why did they take the bus?','原因',['The library was closed.','It was raining.','They were late.'],1,[2],'Why 问原因。第2句 because 后面的内容就是原因。'],
['What time did they arrive?','具体时刻',['Last Saturday.','For an hour.','At nine in the morning.'],2,[3],'What time 问几点到达。Last Saturday 是日期，for an hour 是时长。'],
['How many books did they borrow in total?','数量',['Three.','Two.','One.'],0,[5],'in total 表示合计：埃米2本＋哥哥1本＝3本，不能只取其中一个人的数量。']]),
dict(id='r2',title='公园里的志愿活动',tag='进阶 · 频率 / 方式 / 时长 / 一般疑问句',sentences=[
['Ben joins a volunteer team in Shenzhen.','本加入了深圳的一个志愿者团队。'],
['The team cleans a park twice a month.','这个团队每月打扫公园两次。'],
['Last Sunday, Ben rode his bike to the park with his friend.','上个星期日，本和朋友骑自行车去了公园。'],
['They worked from eight to ten in the morning.','他们从早上八点工作到十点。'],
['Ben picked up rubbish while his friend put up signs.','本捡垃圾，他的朋友则竖起标牌。'],
['They did not water the trees because another team had already done it.','他们没有给树浇水，因为另一个团队已经做过了。'],
['After the work, they were tired but happy.','工作结束后，他们很累，但是很开心。']],questions=[
['How often does the team clean the park?','频率',['For two hours.','Twice a month.','Last Sunday.'],1,[2],'How often 问频率。twice a month 是每月两次。'],
['How did Ben get to the park last Sunday?','交通方式',['On foot.','By bus.','By bike.'],2,[3],'rode his bike 与 by bike 意思对应，属于同义表达。'],
['How long did they work that morning?','时长',['For two hours.','At eight.','Twice a month.'],0,[4],'从8点到10点，共2小时。问多久，不是问几点开始。'],
['Did Ben and his friend water the trees?','是否',['Yes, they did.','No, they did not.','The trees were tall.'],1,[6],'Did 开头问是否。第6句 did not 明确否定；别只看到 water the trees 就选肯定。']]),
dict(id='r3',title='阅读角计划',tag='进阶 · 主语提问 / 将来时间 / 价格 / 间接问句',sentences=[
['Ms Chen wants to build a reading corner in her classroom.','陈老师想在教室里建一个阅读角。'],
['Her students have already brought thirty books from home.','她的学生已经从家里带来了三十本书。'],
['Jack designed a small sign for the corner.','杰克为阅读角设计了一个小标牌。'],
['The class will buy four new chairs, and each chair costs fifty yuan.','班级将买四把新椅子，每把椅子五十元。'],
['The reading corner will open next Monday, five days from today.','阅读角将在下周一开放，也就是从今天算起五天后。'],
['Students can read there after lunch, but they must keep the corner quiet.','学生们可以午饭后在那里阅读，但必须保持安静。'],
['Ms Chen asks the students whether they know where the new books should go.','陈老师问学生们是否知道新书应该放在哪里。']],questions=[
['Who designed the sign?','人（主语）',['Ms Chen.','All the parents.','Jack.'],2,[3],'Who 本身作主语，直接接 designed。第3句给出设计者 Jack。'],
['How much will the four chairs cost in total?','总价格',['Two hundred yuan.','Fifty yuan.','Four hundred yuan.'],0,[4],'四把椅子，每把50元，合计200元。注意 in total。'],
['How soon will the reading corner open?','多久以后',['For five days.','In five days.','Five times a week.'],1,[5],'从今天算起五天后开放，用 in five days；for five days 表示持续五天。'],
['Which is the correct way to ask about the new books politely?','间接问句语序',['Do you know where should the new books go?','Do you know where do the new books go?','Do you know where the new books should go?'],2,[7],'Do you know 后面的内容用陈述语序：where＋the new books＋should go。']])]

# 阅读问题的人工词块拆解与中文释义。
reading_parts=[
 [('Where','wh'),('did','aux'),('Amy and her brother','sub'),('go','verb'),('last Saturday','rest')],
 [('Why','wh'),('did','aux'),('they','sub'),('take','verb'),('the bus','rest')],
 [('What time','wh'),('did','aux'),('they','sub'),('arrive','verb')],
 [('How many books','wh'),('did','aux'),('they','sub'),('borrow','verb'),('in total','rest')],
 [('How often','wh'),('does','aux'),('the team','sub'),('clean','verb'),('the park','rest')],
 [('How','wh'),('did','aux'),('Ben','sub'),('get','verb'),('to the park last Sunday','rest')],
 [('How long','wh'),('did','aux'),('they','sub'),('work','verb'),('that morning','rest')],
 [('Did','aux'),('Ben and his friend','sub'),('water','verb'),('the trees','rest')],
 [('Who','wh'),('designed','verb'),('the sign','rest')],
 [('How much','wh'),('will','aux'),('the four chairs','sub'),('cost','verb'),('in total','rest')],
 [('How soon','wh'),('will','aux'),('the reading corner','sub'),('open','verb')],
 []]
reading_zh=['上个星期六，埃米和哥哥去了哪里？','他们为什么乘坐公交车？','他们几点到达？','他们总共借了多少本书？','这个团队多久打扫一次公园？','上个星期日，本怎样到达公园？','那天早上他们工作了多久？','本和他的朋友给树浇水了吗？','谁设计了这个标牌？（who 本身作主语）','这四把椅子总共将花多少钱？','阅读角将在多久以后开放？','哪一项是礼貌询问新书放在哪里的正确表达？重点检查间接问句的语序。']
for i,q in enumerate(q for r in readings for q in r['questions']):
    q.extend([reading_parts[i],reading_zh[i]])

# 选择、改错与自主提问，排序题从60组例句中独立选取。
choice_rows='''
___ he at home?|Is~Does~Do|0|at home 前用 be。主语 he 配 is，不能同时添加 does。
Where ___ your parents work?|does~are~do|2|work 是普通动词；parents 为复数，一般现在时用 do。
What does she ___ after school?|does~do~doing|1|does 已帮助提问，后面的实义动词 do 用原形。
When did they ___ home?|went~go~goes|1|did 后用动词原形 go。
___ you swim?|Can~Are~Does|0|swim 是动词原形；Can you swim? 问会不会游泳。
How often do you exercise?|Twice a week.~For two hours.~In two days.|0|How often 问频率，选 twice a week。
How long did you stay there?|At three.~For three days.~Every day.|1|How long 问持续时间，用 for three days。
How soon will she return?|For a week.~Once a week.~In a week.|2|How soon 问多久以后，用 in a week。
How far is your school?|At eight.~About two kilometres.~Two times.|1|How far 问距离。
Why are you happy?|I passed the test.~In the classroom.~Every day.|0|通过“通过考试”说明开心的原因，不一定有 because。
___ books do you need?|How much~How many~How often|1|books 为可数名词复数，问数量用 how many。
___ water do you need?|How many~How long~How much|2|water 为不可数名词，问量用 how much。
谁帮助了你？|Who did helped you?~Who helped you?~Who did you help?|1|who 本身作主语；Who did you help? 的意思是你帮助了谁。
你帮助了谁？|Who helped you?~Who did you help?~Who did you helped?|1|主语是 you，过去时用 did，help 恢复原形。
Do you know ___?|where he lives~where does he live~where is he live|0|这里的 where 从句用陈述语序 he lives。
___ bag is this? — It is Tom’s.|Who~Whose~Where|1|Tom’s 表示归属，用 whose 问谁的。
What time does the lesson start?|On Friday.~For an hour.~At eight.|2|What time 问具体时刻，选 at eight。
Was she late yesterday?|No, she wasn’t.~No, she doesn’t.~No, she isn’t.|0|Was 开头的过去时问句，用 was / wasn’t 回答。
'''
choices=[]
for i,line in enumerate(choice_rows.strip().splitlines()):
    prompt,opts,ans,ex=line.split('|');choices.append(dict(id=f'c{i+1}',type='choice',prompt=prompt,options=opts.split('~'),answer=int(ans),explain=ex))
fix_rows='''
Where does he lives?|Where does he live?|does 后的动词用原形 live。
Did she went to school?|Did she go to school?|did 后的 went 还原成 go。
What do he like?|What does he like?|一般现在时，he 是三单主语，用 does。
Where do you are?|Where are you?|有 be 时把 are 提前，不再加 do。
Can she swims?|Can she swim?|情态动词 can 后用动词原形。
Why you are late?|Why are you late?|直接问句把 are 放在主语 you 前面。
When did they arrived?|When did they arrive?|did 后用 arrive 原形。
How many milk do you need?|How much milk do you need?|milk 不可数，问量用 how much。
How often do you stay here? — For two days.|How long do you stay here?|回答 for two days 是时长，应问 how long。
Who did called you?|Who called you?|问“谁打电话给你”，who 作主语，普通肯定主语问句不用 did。
Do you know where does she live?|Do you know where she lives?|Do you know 后的从句用陈述语序，去掉 does 后保留 lives。
How much books did he buy?|How many books did he buy?|books 为可数复数，用 how many。
'''
fixes=[]
for i,line in enumerate(fix_rows.strip().splitlines()):
    prompt,ans,ex=line.split('|');fixes.append(dict(id=f'f{i+1}',type='fix',prompt=prompt,accepted=[ans],model=ans,explain=ex))
produce_rows='''
问“他住在哪里？”（一般现在时）|Where does he live?|普通动词 live，主语 he，用 does。问地点用 where。
问“她昨天去了哪里？”|Where did she go yesterday?|yesterday 提示过去时；did 后用 go。
问“他们会游泳吗？”|Can they swim?|can 提前，后面 swim 原形。
问“这本书多少钱？”|How much is this book?|问价格用 how much；this book 配 is。
问“你多久阅读一次？”|How often do you read?|问频率用 how often。
问“他会在这里待多久？”（用 will）|How long will he stay here?|问时长用 how long；will 提前。
问“她为什么迟到？”（现在的状态）|Why is she late?|late 是形容词；用 is，不加 does。
问“课几点开始？”（用 the lesson，一般现在时）|What time does the lesson start?|what time 问时刻；lesson 三单，用 does＋start。
问“谁帮助了你？”（过去发生，用 help）|Who helped you?|who 作主语，help 用过去式 helped。
问“你帮助了谁？”（过去发生，用 help）|Who did you help?|主语是 you；过去时用 did＋help。
问“这是你的书包吗？”（用 this / your bag）|Is this your bag?|be 提前，is＋this＋your bag。
问“你知道他住在哪里吗？”（用 Do you know 开头）|Do you know where he lives?|内层 where 从句是 he lives 的陈述语序。
'''
produces=[]
for i,line in enumerate(produce_rows.strip().splitlines()):
    prompt,ans,ex=line.split('|');produces.append(dict(id=f'p{i+1}',type='produce',prompt=prompt,accepted=[ans],model=ans,explain=ex))
orders=[]
for idx in list(range(0,20,3))+list(range(20,40,3))+list(range(40,60,2)):
    e=examples[idx]
    orders.append(dict(id=f'o{len(orders)+1}',type='order',prompt=e['qzh'],chunks=[p[0] for p in e['q']],model=' '.join(p[0] for p in e['q'])+'?',explain=e['tip']))
assert len(orders)==24
D=dict(examples=examples,wh=wh,listening=listening,readings=readings,practice=choices+orders+fixes+produces)
assert len(examples)==60 and all(sum(e['route']==r for e in examples)==20 for r in ['be','modal','do'])
assert len(listening)==24 and len(D['practice'])==66
(ROOT/'dist/data.json').write_text(json.dumps(D,ensure_ascii=False,indent=2))
print('60例句组，16疑问词，24听力，12阅读题，66专项练习；总练习102题。')
