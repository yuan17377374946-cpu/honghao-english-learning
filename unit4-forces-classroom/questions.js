"use strict";

const groups = [
  {id:"5",number:"五",title:"看图和首字母填词",materialTitle:"玩具车实验", material:[
    "In science class, we learn about 1. f____. They can move things! First, I play with a light toy car. I 2. ____ it away. It is 3. e____ to go far. Then I try a heavy toy truck. It is 4. d____ to move, so I have to 5. ____ it hard. Wow, forces are amazing!"
  ],figure:"toy-figures"},
  {id:"6",number:"六",title:"用单词的适当形式"},
  {id:"7",number:"七",title:"看图判断对话",figure:"five-figures"},
  {id:"8",number:"八",title:"补全对话",materialTitle:"完整对话与选项",material:[
    "Longlong: Hi, Diandian. 1. ____",
    "Diandian: Yes! I often use a push to move my desk.",
    "Longlong: 2. ____",
    "Diandian: It’s difficult. The desk is heavy.",
    "Longlong: Oh! 3. ____",
    "Diandian: Yes! I need to push very hard.",
    "Longlong: What about pulls? When do you use a pull?",
    "Diandian: 4. ____ It’s stuck sometimes.",
    "Longlong: Wow! 5. ____",
    "Diandian: It is! Forces are so useful."
  ],options:[
    "A. I use a pull to open the door.",
    "B. That must be a big force!",
    "C. Do you use forces in your daily life?",
    "D. So do you need a big force to move it?",
    "E. Is it easy or difficult to move it?"
  ]},
  {id:"9",number:"九",title:"愚公移山选词填空",materialTitle:"愚公移山",material:[
    "Yu Gong lived near two big mountains. The mountains were very heavy, so it was 1. ____ to move them. But he wanted to move them away.",
    "Every day, he and his family used a 2. ____ force to dig the earth and move stones. They also used a 3. ____ force to carry the earth and stones away.",
    "They worked 4. ____ but kept working every day. They never stopped using 5. ____. At last, the mountains were moved away."
  ],words:["push","pull","slow","difficult","force"]},
  {id:"10",number:"十",title:"晾衣杆说明书",materialTitle:"晾衣杆说明书",material:[
    "To make the rod go up: Turn the handle clockwise. This uses a pull force.",
    "To make the rod go down: Turn the handle anti-clockwise. This uses a push force.",
    "When you turn the handle slowly, the rod moves slowly. When you turn the handle quickly, the rod moves fast.",
    "Safety note: Do not put many heavy clothes on the rod. They will make it difficult to move."
  ]},
  {id:"11",number:"十一",title:"风箱阅读",materialTitle:"The Old Bellows",material:[
    "Many years ago, people used a traditional tool—the bellows to make fire burn better. It was used in old kitchens and blacksmiths’ workshops.",
    "The bellows runs by pushes and pulls. When we pull its handle, the air goes into the bellows box. When we push the handle, the air in it is pressed out. Then the air blows the fire.",
    "The speed of pushes and pulls makes different results. If we move the handle slowly, the air will come out gently, and the fire burns softly. If we move the handle fast, the air will run out quickly, and the fire will become much hotter and stronger.",
    "The old bellows is simple but useful. It tells us that different forces can change the speed of air and make things work in different ways."
  ]},
  {id:"12",number:"十二",title:"作文讲评"}
];

const questions = [
  ["5","1","In science class, we learn about f____. They can move things!","faster","forces","They 指回前面的什么？这个位置需要一个名词，还是表示快慢的词？","learn about 后接学习的内容。下一句 They 指前面的复数名词，全文都在说能使物体移动的力。"],
  ["5","2","I play with a light toy car. I ____ it away.","is","push","观察小车是离开小朋友还是靠近他，再看看 away。","图中小车离开小朋友。push … away 表示把东西推开，空格要填表示动作的动词。"],
  ["5","3","It is e____ to go far.","easy","easy","联系前面的 light toy car，想想轻的小车移动起来怎样。","It is + 形容词 + to do。这里用 easy 说明轻的玩具车容易走得远。","right"],
  ["5","4","Then I try a heavy toy truck. It is d____ to move.","difficult（有涂改）","difficult","对照前面的轻车和后面的重车，搬动的难易有什么不同？","重的玩具卡车不容易移动。difficult 表示困难的，符合首字母和句意。","right"],
  ["5","5","It is difficult to move, so I have to ____ it hard.","is","pull","看男孩和卡车之间的连接，再想他把车往哪里带。","图中男孩用连接物牵着卡车。have to 后面接动词原形，pull it hard 表示用力拉它。"],
  ["6","1","This box is ____ (heavy) than that one.","heavier","heavier","圈出 than，数一数这里在比较几个箱子。","than 提示用比较级。heavy 变比较级时把 y 改成 i，再加 -er。","right"],
  ["6","2","Tom is ____ (tall) boy in our class.","tall","the tallest","圈出 in our class。Tom 是只和一个人比，还是放到全班一起比？","在全班范围内找最高的男孩，要用最高级。tall 加 -est，名词 boy 前这里要有 the。"],
  ["6","3","I see the boy ____ (pull) the heavy box.","puller","pulling","空格说的是男孩这个人，还是你看到他正在做的动作？","see + 人 + 动词-ing 可以表示看见某人正在做某事。puller 是名词，不能表示这里正在进行的动作。"],
  ["6","4","I use a big force to push the toy car, and it moves ____ (quick).","quicker","quickly","找出空格要修饰的词。空格是在形容小车，还是说明它怎样移动？","这里要用副词说明 moves 的方式。试卷考的是 quick 的副词形式，句中没有要求比较两次移动的速度。"],
  ["6","5","Is the force big or ____ (small)?\n— It’s big. Because the ball goes a long way.","smaller（前面有涂改）","small","看 or 的左边。两个选项是在让你二选一，还是比较两个力？","big or small 是两个并列选项。big 用的是原级，small 也用原级。","wrong"],
  ["7","1","What is slower than the plane?\n— The train.","F","F","先看图1飞机下方画的是哪一种交通工具。","图1画的是汽车。答语说火车，和图不一致。","right"],
  ["7","2","Which is the heaviest of the three schoolbags?\n— Diandian’s schoolbag is the heaviest of the three.","T","T","找箭头指的 Diandian，再对照答语中的名字。","配图标出 Diandian；按同图参考答案，他的书包最重。句意和图相符。","right"],
  ["7","3","What force is moving it, a push or a pull? Is the force small or big?\n— A big pull.","T","F","判断时要同时核对力的种类和大小。先从图里找用力方向。","配套题册同图的参考答语是 A push; big。答语的大力正确，但 pull 和图中的 push 不一致，整句判 F。"],
  ["7","4","How do you use forces?\n— I pull the door to go out of the classroom.","F","T","看图4手和门扇的动作，再和答语中的动词核对。","配套题册同图的参考答语用 pull the door。这里的拉门动作和图一致。"],
  ["7","5","When do you use forces?\n— When I play the erhu, I use the push and pull.","T","T","先辨认图中乐器，再看答语说的活动。","图5是拉二胡，答语也说在拉二胡时用到推和拉，和图相符。","right"],
  ["8","1","Longlong: Hi, Diandian. ____\nDiandian: Yes! I often use a push to move my desk.","B","C. Do you use forces in your daily life?","下一句为什么能用 Yes 开头？先排除感叹句和不能用 Yes 回答的问句。","这里是话题开头，先问日常生活是否用力。Diandian 用 Yes 回答，并用推桌子作例子。"],
  ["8","2","Longlong: ____\nDiandian: It’s difficult. The desk is heavy.","A","E. Is it easy or difficult to move it?","下一句在说哪件事容易还是困难？上一句应该问什么？","It’s difficult 直接回答 easy or difficult。it 指移动书桌这件事。"],
  ["8","3","Longlong: Oh! ____\nDiandian: Yes! I need to push very hard.","C","D. So do you need a big force to move it?","下一句有 Yes，也有 push very hard。把两个线索一起用。","书桌很重，Longlong 进一步确认移动它是否需要大力。Yes 和 very hard 都能接上。"],
  ["8","4","Longlong: What about pulls? When do you use a pull?\nDiandian: ____ It’s stuck sometimes.","D","A. I use a pull to open the door.","问的是什么时候会拉。后面说 it 有时卡住，it 可以指什么？","这里要答一个具体使用拉力的场景。open the door 接上前问，后一句的 it 就指门。"],
  ["8","5","Longlong: Wow! ____\nDiandian: It is! Forces are so useful.","E","B. That must be a big force!","Wow 提示说话人是什么语气？It is! 在赞同什么？","对话末尾是对用力大小的感叹，下一句接着表示赞同。"],
  ["9","1","The mountains were very heavy, so it was ____ to move them.","pull","difficult","前一句说山很重。so 后面要说明什么结果？","was ____ to move 是 It was + 形容词 + to do 的结构。山很重，所以难以移动。"],
  ["9","2","He and his family used a ____ force to dig the earth and move stones.","slow","push","force 前要说明什么种类的力？把挖土、挪石头的动作做一做。","这里按词框和文章配对用 push force，表示挖土和挪石头时用的推力。"],
  ["9","3","They also used a ____ force to carry the earth and stones away.","difficult","pull","also 提示换到另一个动作。第2、3空都要填力的种类。","原卷把运走土石的动作与 pull force 搭配。difficult 描述难易，不能说明是哪一种力。"],
  ["9","4","They worked ____ but kept working every day.","force","slowly","空格紧跟 worked，要说明他们怎样干活。词框中的词可能需要变形。","这里要修饰 worked。把 slow 改为副词 slowly，表示干得慢。"],
  ["9","5","They never stopped using ____.","push","forces","using 后需要写使用的东西。回头数一数前面提到了几种力。","前面说了推力和拉力，这里用复数 forces 概括。"],
  ["10","1","To make the rod go up, you need to turn the handle clockwise.","F","T","回到说明书第一项，圈出 go up 和它后面的方向。","第一项明确写着让杆子上升需要顺时针转把手。题干和原文一致。"],
  ["10","2","You use a push force when you turn the handle to make the rod go down.","T","T","找说明书第二项，核对 go down 对应的力。","说明书说下降时用 push force，所以这句话正确。","right"],
  ["10","3","The underlined word “anti-clockwise” in the material means “逆时针地”.","T","T","对照 clockwise 和 anti-clockwise，想想两个方向的关系。","clockwise 是顺时针地。anti- 在这里表示相反，anti-clockwise 就是逆时针地。","right"],
  ["10","4","If you turn the handle slowly, the rod will move fast.","F","F","分别圈出题干和原文里说明速度的词。","原文说慢转时杆子也慢慢移动。题干把杆子的速度换成 fast，所以不相符。","right"],
  ["10","5","It is difficult to move the rod when you put too many heavy clothes on it.","F","T","读 Safety note，找挂太多重衣服会造成什么后果。","安全提示说重衣服挂太多会使杆子难移动。题干把原因和结果都保留了。"],
  ["11","1-1","____ the handle. → Fresh air goes into the box.","push","Pull","回第二段，找空气进入箱子那一句，只看把手怎么动。","When we pull its handle, the air goes into the bellows box。先找结果 goes into，再反查原因。"],
  ["11","1-2","____ the handle. → Air is pressed out of the box.","pull","Push","把 out 和上一空的 into 对比，再去第二段找对应动作。","When we push the handle, the air in it is pressed out。空气被挤出和空气进箱对应不同动作。"],
  ["11","1-3","Move the handle slowly. → The fire burns ____.","easy","softly","这次要填火烧得怎样。找第三段中跟在 burns 后面的词。","第三段同时写风出来的状态和火烧的状态。gently 修饰风出来，softly 修饰 burns。"],
  ["11","1-4","Move the handle ____. → The fire becomes hotter and stronger.","difficult","fast","到第三段找火变得更热、更旺的那句，倒推把手的速度。","原文 If we move the handle fast 后面写到火会更热、更旺。这里问的是速度。"],
  ["11","1-5","Different ____ can change the speed of air.","Yes","forces","找末段哪一个事物能改变空气速度，再检查 different 后面用什么形式。","末段用 different forces 作主语。句子要填改变速度的事物，forces 是复数名词。","wrong"],
  ["11","2-1","Where was the bellows widely used many years ago?","B","B. In old kitchens and workshops.","Where 问的是哪类信息？先到文章哪一段找？","第一段直接说明风箱在旧时的厨房和铁匠铺使用。","right",["A. Only at homes.","B. In old kitchens and workshops.","C. In modern factories."]],
  ["11","2-2","What is the main idea of the passage?","A","C. How push and pull forces work on a bellows.","第二段和第三段都在说什么？哪个选项能把两段一起概括？","第一段提供使用背景，第二、三段讲推拉与速度怎样影响风箱和火。A 只提用风箱生火，C 才覆盖全文重点。","wrong",["A. How to use a bellows to make fire.","B. The history of old kitchens and workshops.","C. How push and pull forces work on a bellows."]],
  ["11","3","What things in your daily life make use of forces? Write at least three.","空白","示例：Opening a door, moving a chair and pushing a shopping cart.","从家里、教室或运动里想三个自己做过的动作。先口头说，再写。","开放题可以有多种答法。写够三件不同的事情，每一项写清楚动作和物品。","blank"],
  ["12","1","Forces I use in my daily life\nWrite at least six sentences.","写到了用力大小，也试着写了拉、推的场景。作答示例里有几处句子没有写完整。","I use forces every day. I push my chair under the desk. It is light, so I use a small push. At home, I pull a drawer open. I only need a small pull. I push a heavy box across the floor, so I use a big push.","先口头说三个例子。每个例子讲清做了什么、用推还是拉、力有多大。","先用 I push / pull + 物品 写清动作。再另起一句解释大小。读完数一数完整句子，至少六句，并检查主语、动词和句号。","writing"]
].map(([group,no,prompt,student,answer,hint,explanation,status="wrong",options])=>({
  id:group+"-"+no,group,no,prompt,student,answer,hint,explanation,status,options
}));

const corrections = {
  "5-1": [
    "原答 faster 表示“更快”，放在 learn about 后不能说明学了什么，也接不上下一句的 They。两处线索都指向表示“力”的复数名词 forces。",
    "learn about + 名词，表示“学习、了解……”。They 在这里指前面提到的复数名词。联系本段主题，force（力）变成 forces。"
  ],
  "5-2": [
    "原答 is 放进 I ____ it away 后，句子既缺少推车的动作，主语 I 也不能和 is 搭配。图中车被推离小朋友，away 提示了移动方向。",
    "push + 物品 + away 表示“把……推开”。看图时先判断物体是离开人还是朝人靠近，再用动作词写进句子。"
  ],
  "5-5": [
    "原答 is 表示不了牵动车子的动作。图中男孩通过连接物把车拉向自己，hard 只说明用力程度，动作要从图里判断。",
    "have to + 动词原形，表示“不得不做……”。pull it hard 表示“用力拉它”，hard 在这里说明怎么拉。"
  ],
  "6-2": [
    "原答 tall 只说明 Tom 个子高，漏掉了 in our class 给出的比较范围。这句话是在全班范围里选出个子最高的男孩。",
    "在一组人或物里选出最……的一个，常用 the + 最高级。tall → the tallest，句型是 the tallest boy in our class。"
  ],
  "6-3": [
    "原答 puller 是名词，指拉东西的人，无法说明男孩被看到时正在做什么。空格里要写男孩当时拉箱子的动作。",
    "see + 人 + 动词-ing 表示“看见某人正在做某事”。pull + -ing → pulling，例如 I see her opening the door."
  ],
  "6-4": [
    "原答 quicker 带有“更快”的比较意思。句子只交代小车怎样移动，空格紧跟 moves，应该用 quickly 说明移动的方式。",
    "用副词修饰动作动词。quick 是形容词，quickly 是副词。a quick move 描述动作本身，moves quickly 描述移动的方式。"
  ],
  "6-5": [
    "原答 smaller 把二选一读成了大小比较。问句用 or 把 big 和 small 并列起来，答语 It’s big 直接选了其中一个。",
    "Is it A or B? 是选择疑问句。两个并列的形容词形式看齐。本题 big 用原级，small 也用原级。"
  ],
  "7-3": [
    "原答 T。答语里的 big 和图一致，但 pull 与图中的 push 不一致。题目同时问力的种类和大小，两项都对才能判 T。",
    "看图判断先核对动作 push / pull，再核对大小 big / small。可在答语里分开圈出两个信息，逐项对图。"
  ],
  "7-4": [
    "原答 F，但图中开门的动作与答语中的 pull the door 一致。go out of the classroom 交代的是开门的目的，动作要看手和门扇。",
    "pull the door 表示“拉门”，push the door 表示“推门”。判断推拉时看门扇相对手的运动方向。"
  ],
  "8-1": [
    "原选 B 是对用力大小的感叹，放在问候之后，既接不上下一句的 Yes，也缺少前文来说明 That 指什么。",
    "补对话先辨认答句类型。Yes 常回应一般疑问句，Do you use …? 可以用 Yes 回答，后面再举推桌子的例子。"
  ],
  "8-2": [
    "原选 A 说拉门，话题从桌子跳到了门。下一句 It’s difficult. The desk is heavy. 明确在回答移动桌子难不难。",
    "用选择疑问句 Is it easy or difficult to …? 询问难易，回答选 easy 或 difficult。读到 it 时往前找，它在这里指移动桌子这件事。"
  ],
  "8-3": [
    "原选 C 虽然也能接 Yes，但问的是平时会不会用力。下一句的 push very hard 特别说明推桌子要用很大的力，原选项漏掉了这层意思。",
    "补对话要同时核对问答形式和内容。Yes 对应一般疑问句，very hard 对应问句中的 a big force，it 指前文的桌子。"
  ],
  "8-4": [
    "原选 D 又问了一遍要不要用大力，没有回答 When do you use a pull? 后一句说 It’s stuck sometimes，也需要前一句提到会卡住的物品。",
    "When 问时间或使用场景。I use a pull to open the door. 给出了拉力的使用场景，后一句的 it 指 the door。"
  ],
  "8-5": [
    "原选 E 问难不难，下一句 It is! 却是在赞同对方的说法，没选 easy 或 difficult。Wow! 也提示这里接的是一句感叹。",
    "看说话语气和对话功能。That must be a big force! 表示惊叹，It is! 表示赞同，和后面的 Forces are so useful. 连得起来。"
  ],
  "9-1": [
    "原答 pull 说的是拉的动作。前面说山很重，so 引出的结果是在说山难不难移，这里需要形容词 difficult。",
    "It is / was + 形容词 + to do，用来说明做某事怎样。so 连接原因与结果，本题的线索是 very heavy → difficult to move。"
  ],
  "9-2": [
    "原答 slow 表示慢，填进 a ____ force 后没有说明力的种类。本段把挖土和挪石头放在第一空，对应词框里的 push。",
    "按题意区分两种力 push force（推力）和 pull force（拉力）。同一段有两个 a ____ force，要分别对照后面写的动作。"
  ],
  "9-3": [
    "原答 difficult 说的是难度，没回答这里用了哪一种力。also 引出运走土石的动作，这一空按本篇材料与上一空的推力配对，填 pull。",
    "用 also 和后面的动作短语区分两处填空。回读 a pull force to carry the earth and stones away，检查词的意思与整句是否连得上。"
  ],
  "9-4": [
    "原答 force 是名词，接在 worked 后不能说明他们干得怎样。but 提示前后有转折，意思是虽然干得慢，还是天天坚持。",
    "副词修饰动词。slow（形容词）→ slowly（副词），worked slowly 表示“干得慢”。选词后还要按空格要求变形。"
  ],
  "9-5": [
    "原答 push 只写了其中一种力。前文分别写了推力和拉力，这里在总结他们一直使用的力量，需要复数 forces。",
    "stop doing 表示“停止做某事”，never stopped using 表示“一直在使用”。using 后填使用的东西，本句用 forces 概括前文两种力。"
  ],
  "10-1": [
    "原答 F，但说明书第一项把 go up 和 clockwise 写在同一条，题干保留了这个对应关系。顺时针与逆时针要各自和升降方向配对。",
    "说明书细节题先按目的 go up 定位，再对照步骤 clockwise。可以记成“上升 → 顺时针”，另读一条“下降 → 逆时针”。"
  ],
  "10-5": [
    "原答 F。题干用了 when，原文用安全提示和下一句分开讲，两处说的是同一件事：重衣服挂得多，杆子就难移动。",
    "判断题要识别同义改写。原文 They 指很多件重衣服，make it difficult to move 与题干 It is difficult to move … when … 表达同一个结果。"
  ],
  "11-1-1": [
    "原答 push，把空气进去时的把手动作写反了。原文第二段写的是 pull its handle 后，空气才 goes into the box。",
    "先圈结果里的 into（进入），再回原文找同一句的动作。风箱这一步是 Pull the handle → air goes in。"
  ],
  "11-1-2": [
    "原答 pull，把吸气那一步填到了排气这一步。题干的 pressed out 表示空气被挤出，对应原文里的 push。",
    "对照 into（进入）和 out of（出来）。Air is pressed out 对应 Push the handle，和上一空连在一起复述能检查方向。"
  ],
  "11-1-3": [
    "原答 easy 说的是容易。题干问的是火烧得怎样，原文同一句先写空气出来得轻缓，再写火烧得轻微，填空要跟住主语 the fire。",
    "定位到 the fire burns softly。softly 修饰 burns，gently 对应前面的空气出来时的状态。遇到一句里有两个主语，分别找各自的动词和修饰词。"
  ],
  "11-1-4": [
    "原答 difficult 写成了难度。hotter and stronger 是火变热、变旺的结果，往前找条件，原文写的是快速移动把手。",
    "在 If …, … 句中区分条件和结果。本题用结果倒找条件，火更旺 → move the handle fast。fast 在这里是副词，修饰 move。"
  ],
  "11-1-5": [
    "原答 Yes 是答语，不能放在 Different ____ 里作主语。末段说能改变空气速度的是 different forces，这一空有原文直接对应。",
    "先找句子的主干“什么能改变空气速度”。Different + 可数名词复数可以表示不同种类，本题填 forces，整个短语作主语。"
  ],
  "11-2-2": [
    "原选 A 抓到了开头提到的生火用途，但覆盖不了正文关于推拉、空气进出和速度的说明。第二、三段合起来都在解释风箱如何靠力工作。",
    "做主旨题时，每段先概括一句。第一段交代用途和背景，第二段讲推拉与进出气，第三段讲速度与火势，再选能包住正文重点的选项。"
  ],
  "11-3": [
    "这份作答示例留空。这题需要从生活里写出至少三件用到力的事，可以先口头说出三个不同的动作，再把每个动作和物品配在一起。",
    "读题圈出 at least three（至少三件）。可用动词-ing + 物品来列举活动，例如 opening a door，也可以用 I push / pull … 写完整句。"
  ],
  "12-1": [
    "作答示例已经写到用力大小，也尝试了推和拉的场景，但有几处只写了部分信息，完整句子没有达到六句。每个场景可以先写做了什么，再写用力大小或原因。",
    "写三个生活场景，每个场景两句，共六句。可以先写推拉动作，再写力度和原因。也可以用第三种句型把动作和力度写在一句里，再补一句原因。最后检查每句的主语、动词和句号。"
  ]
};

const writingPatterns = [
  {
    label:"写用推力还是拉力",
    pattern:"I use a push / pull to ____.",
    example:"I use a pull to open a heavy gate."
  },
  {
    label:"写用多大的力和原因",
    pattern:"I need a big / small force because ____.",
    example:"I need a big force because the gate is heavy."
  },
  {
    label:"一句话写动作和用力大小",
    pattern:"I pull / push ____ with a big / small force.",
    example:"I pull the heavy gate with a big force."
  }
];

const writingScenes = [
  {name:"把椅子推到桌下", direction:"push", size:"small",
    action:"move a chair under the desk", object:"the chair under the desk", reason:"the chair is light"},
  {name:"推购物车", direction:"push", size:"big",
    action:"move a shopping cart", object:"the shopping cart", reason:"the cart is full"},
  {name:"推重箱子", direction:"push", size:"big",
    action:"move a heavy box", object:"the heavy box", reason:"the box is heavy"},
  {name:"拉开抽屉", direction:"pull", size:"big",
    action:"open a drawer", object:"the drawer open", reason:"the drawer is stuck"},
  {name:"拉开窗帘", direction:"pull", size:"small",
    action:"open the curtains", object:"the curtains open", reason:"the curtains are light"},
  {name:"拉行李箱", direction:"pull", size:"big",
    action:"move a suitcase", object:"the suitcase", reason:"the suitcase is heavy"}
];
