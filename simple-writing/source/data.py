from pathlib import Path
import json
R=Path(__file__).parent
banks=[
'''learn new things|学习新知识
learn new words|学习新单词
learn English|学习英语
understand stories|理解故事
understand others|理解别人
learn about animals|了解动物
learn about nature|了解大自然
learn about history|了解历史
know more about the world|更多地了解世界
find new ideas|找到新想法
think carefully|认真思考
write better|写得更好
improve our English|提高我们的英语水平
relax|放松
relax after school|放学后放松
feel happy|感到开心
enjoy our free time|享受空闲时间
solve problems|解决问题
make better choices|作出更好的选择
become better people|成为更好的人''',
'''read every day|每天阅读
read good books|阅读好书
choose interesting books|选择有趣的书
make a reading plan|制订阅读计划
read for twenty minutes|阅读二十分钟
read after school|放学后阅读
read in our free time|在空闲时间阅读
read in a quiet place|在安静的地方阅读
take notes|做笔记
read aloud|大声朗读
write down new words|记下新单词
write down good sentences|记下好句子
think about the story|思考故事内容
ask questions|提出问题
look up new words|查阅新单词
share books with friends|和朋友分享书籍
talk about books with classmates|和同学讨论书籍
keep our books clean|保持书籍干净
put our phones away|把手机收起来
visit the library|去图书馆''',
'''read more books|多读书
read every day|每天阅读
start today|今天就开始
start reading today|今天就开始阅读
read together|一起阅读
choose a good book|选择一本好书
enjoy reading|享受阅读
enjoy the story|享受这个故事
share our books|分享我们的书
share our ideas|分享我们的想法
learn new things|学习新知识
learn together|一起学习
visit the library|去图书馆
join the reading club|加入阅读社团
talk about our favourite books|谈谈我们最喜欢的书
tell our friends about good books|向朋友介绍好书
spend more time reading|多花一些时间阅读
put our phones away|把手机收起来
make reading a habit|让阅读成为一种习惯
enjoy the fun of reading|享受阅读的乐趣''']
patterns=[dict(id='can',title='阅读能帮助我们……',name='Reading can help us…',fixed='can help us',subject='Reading',subjectZh='阅读',core=[0,1,2,13,15],roles=[['Reading','主语','说的是“阅读这件事”','sub'],['can','情态动词','表示“能够、可以”','helper'],['help','动词原形','can 后面用 help，不加 s，不加 to','verb'],['us','宾语','帮助谁？帮助“我们”','obj'],['learn new things','动作语块','帮助我们做什么？这里 learn 用原形','action']],note='先记住整块 can help us。help us 后可以直接接动词原形，如 learn、relax。Reading 放在主语位置，表示“阅读这件事”。',steps=[['Reading can help us.','阅读能帮助我们。'],['Reading can help us learn.','阅读能帮助我们学习。'],['Reading can help us learn new things.','阅读能帮助我们学习新知识。']]),
dict(id='should',title='我们应该……',name='We should…',subject='We',subjectZh='我们',fixed='should',core=[0,1,4,8,15],roles=[['We','主语','谁应该这样做？我们','sub'],['should','情态动词','表示“应该”，用来提建议','helper'],['choose','动词原形','should 后面用 choose，不加 s，不加 to','verb'],['good books','宾语','选择什么？好书','obj']],note='should 后面的第一个动词用原形。先选“做什么”，再按需要增加时间、地点等信息。',steps=[['We should read.','我们应该阅读。'],['We should read every day.','我们应该每天阅读。'],['We should read for twenty minutes every day.','我们应该每天阅读二十分钟。']]),
dict(id='lets',title='让我们一起……',name='Let’s…',subject='',subjectZh='',fixed="Let’s",core=[0,2,4,6,8],roles=[["Let’s",'固定开头','Let us 的缩写，表示“让我们一起……”','helper'],['read','动词原形','Let’s 后面的第一个动词用原形','verb'],['more books','宾语','读什么？更多的书','obj']],note='Let’s 后面的第一个动词用原形。Let’s enjoy reading! 中 enjoy 用原形；reading 跟在 enjoy 后面，属于 enjoy doing 搭配。',steps=[["Let’s read!",'让我们阅读吧！'],["Let’s read more books!",'让我们多读书吧！'],["Let’s start reading today!",'让我们今天就开始阅读吧！']])]
subjects=[['Reading','阅读'],['Reading books','读书'],['Reading stories','读故事'],['Reading English books','读英语书'],['Reading books about animals','阅读关于动物的书']]
exrows=[
['can','translate','阅读能帮助我们放松。','Reading can help us relax.','can help us 是固定部分；relax 直接接在后面。'],
['can','translate','读英语书能帮助我们学习新单词。','Reading English books can help us learn new words.','主语用 Reading English books；学习新单词用 learn new words。'],
['can','translate','读故事能帮助我们理解别人。','Reading stories can help us understand others.','Reading stories 作主语，后面保留 can help us。'],
['can','fix','Reading can helps us relax.','Reading can help us relax.','can 后面用动词原形 help，不能用 helps。'],
['can','fix','Reading can help we learn new things.','Reading can help us learn new things.','help 后表示帮助的对象，用宾格 us。'],
['can','fix','Reading can help us learning English.','Reading can help us learn English.','这里 help us 后直接接动词原形 learn。'],
['can','order','阅读能帮助我们学习新知识。','Reading can help us learn new things.','主语 → can help us → 动作语块。'],
['can','order','读书能帮助我们放松。','Reading books can help us relax.','Reading books 是完整的主语语块。'],
['should','translate','我们应该选择好书。','We should choose good books.','should 后用 choose 原形。'],
['should','translate','我们应该每天阅读二十分钟。','We should read for twenty minutes every day.','for twenty minutes 说时长，every day 说频率。'],
['should','translate','我们应该和朋友分享书籍。','We should share books with friends.','share books with friends：和朋友分享书籍。'],
['should','fix','We should to read every day.','We should read every day.','should 后直接接 read，去掉 to。'],
['should','fix','We should choosing good books.','We should choose good books.','choosing 改成动词原形 choose。'],
['should','fix','We should takes notes.','We should take notes.','should 后用 take 原形；take notes 表示做笔记。'],
['should','order','我们应该做笔记。','We should take notes.','We → should → take notes。'],
['should','order','我们应该放学后阅读。','We should read after school.','We → should → read → after school。'],
['lets','translate','让我们多读书吧！',"Let’s read more books!",'Let’s 后接 read 原形。'],
['lets','translate','让我们一起阅读吧！',"Let’s read together!",'read together 表示一起阅读。'],
['lets','translate','让我们享受阅读吧！',"Let’s enjoy reading!",'enjoy 是原形；enjoy 后面的阅读用 reading。'],
['lets','fix',"Let’s to read together!","Let’s read together!",'Let’s 后直接接 read，去掉 to。'],
['lets','fix',"Let’s reads more books!","Let’s read more books!",'reads 改成动词原形 read。'],
['lets','fix',"Let’s enjoy read!","Let’s enjoy reading!",'enjoy 后接 doing，因此是 enjoy reading。'],
['lets','order','让我们今天就开始吧！',"Let’s start today!",'Let’s → start → today。'],
['lets','order','让我们分享我们的书吧！',"Let’s share our books!",'Let’s → share → our books。']]
orders=[['Reading','can help us','learn new things'],['Reading books','can help us','relax'],['We','should','take notes'],['We','should','read','after school'],["Let’s",'start','today'],["Let’s",'share','our books']]
exercises=[];oi=0
for i,(pat,typ,prompt,model,why) in enumerate(exrows):
 e=dict(id=f'e{i+1}',pattern=pat,type=typ,prompt=prompt,model=model,why=why)
 e['accepted']=[model]
 if i==9:e['accepted'].append('We should read every day for twenty minutes.')
 if typ=='order':e['chunks']=orders[oi];oi+=1
 exercises.append(e)
for i,p in enumerate(patterns):p['bank']=[dict(en=line.split('|')[0],zh=line.split('|')[1]) for line in banks[i].splitlines()]
D=dict(patterns=patterns,subjects=subjects,exercises=exercises)
assert all(len(p['bank'])==20 for p in patterns)
(R/'dist/data.json').write_text(json.dumps(D,ensure_ascii=False,indent=2))
print('3 patterns, 60 phrase blocks, 24 exercises')
