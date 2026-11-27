/* Original classroom prompts; task requirements checked against the uploaded Unit 5 A/B papers. */
'use strict';
window.WRITING_SCENES = [
  {
    id:'books',kind:'simple',title:'小推车搬书',en:'Wheels on a cart',object:'the wheel',sheet:1,row:0,
    beforeAlt:'A child struggles to carry a heavy box of books to the library.',afterAlt:'The same child pushes the books on a cart with wheels.',
    question:'What is hard to do? How do the wheels help?',questionCn:'书箱搬起来怎么样？轮子具体帮助做什么？',
    phrases:[['carry heavy books','搬运沉重的书'],['by hand','用手；靠人力'],['a cart with wheels','带轮子的小推车'],['move things easily','轻松地搬运东西'],['make our work easier','让我们的工作更轻松']],
    frames:[['Before, people carried ____ by hand.','以前人们用手搬什么？'],['Now, we use a cart to ____.','use…to do：使用小车来做什么？'],['The wheels help us ____.','help us后接动词原形，也可以用to＋动词原形。']],
    refs:['Before, people carried heavy books by hand.','Now, we use a cart with wheels to carry books.','The wheels make our work easier.'],
    note:'简单机械写的是wheel，cart是轮子的使用场景。carry的过去式是carried；use a cart to carry中，to后用原形carry。easier说明work变得怎样，不写more easily。',
    model:'My favourite simple machine is the wheel. Before, people carried heavy things by hand. It was tiring. Now, we use carts with wheels to carry books. The wheels help us move things easily. I like the wheel because it makes our work easier.'
  },
  {
    id:'suitcase',kind:'simple',title:'拉杆箱出行',en:'Wheels on a suitcase',object:'the wheel',sheet:1,row:1,
    beforeAlt:'A traveller struggles to carry a heavy suitcase by its top handle.',afterAlt:'The traveller pulls a wheeled suitcase along the station platform.',
    question:'How does the traveller move the suitcase before and after?',questionCn:'原来怎么搬箱子？有轮子后怎样移动？',
    phrases:[['carry a heavy suitcase','提沉重的行李箱'],['at the station','在车站'],['pull the suitcase','拉着行李箱'],['wheels on the suitcase','行李箱上的轮子'],['make travelling easier','让出行更轻松']],
    frames:[['Without wheels, it is hard to ____.','没有轮子，做什么很困难？'],['With wheels, we can ____.','有轮子后能做什么？can后接动词原形。'],['They make travelling ____.','说旅行变得怎样：easier。']],
    refs:['Without wheels, it is hard to carry a heavy suitcase.','With wheels, we can pull the suitcase easily.','The wheels make travelling easier.'],
    note:'这一组用Without…/With…作条件对照，三句都可以用现在时。不要把整只行李箱说成一种简单机械，介绍的对象是轮子。suitcase是行李箱，pull是拉。',
    model:'My favourite simple machine is the wheel. We can see wheels on suitcases. Without wheels, it is hard to carry a heavy suitcase. With wheels, we can pull it easily. The wheels make travelling easier. I think they are very useful.'
  },
  {
    id:'wheelchair',kind:'simple',title:'轮椅通过校门',en:'A ramp at the school entrance',object:'the ramp',sheet:1,row:2,
    beforeAlt:'A student in a wheelchair waits at the bottom of steps at the school entrance.',afterAlt:'The student moves up a gentle ramp beside the same steps.',
    question:'What stops the wheelchair? How does the ramp help?',questionCn:'轮椅遇到了什么困难？斜坡解决了哪个问题？',
    phrases:[['people in wheelchairs','坐轮椅的人'],['at the school entrance','在学校入口处'],['go up the steps','上台阶'],['go up a ramp','沿斜坡上去'],['get into the school','进入学校']],
    frames:[['There are ____ at the school entrance.','先交代现场有什么。'],['Without a ramp, it is hard to ____.','不用笼统地写It is useful，先说具体困难。'],['The ramp helps people in wheelchairs ____.','帮助谁，做什么？']],
    refs:['There are steps at the school entrance.','Without a ramp, it is hard for people in wheelchairs to get into the school.','The ramp helps them get into the school more easily.'],
    note:'wheelchair是轮椅，ramp是斜坡，两者不能混。help them get into也可写help them to get into。more easily说明“进入”这一动作更轻松；make life easier中则用形容词easier。',
    model:'My favourite simple machine is the ramp. We can see one at our school entrance. There are steps at the door. Without the ramp, it is hard for people in wheelchairs to get inside. The ramp helps them get into the school more easily. I like it because it helps people.'
  },
  {
    id:'library',kind:'simple',title:'小推车进图书馆',en:'A ramp for the library cart',object:'the ramp',sheet:1,row:3,
    beforeAlt:'A librarian with a book cart is stopped by two steps at the library door.',afterAlt:'The librarian pushes the book cart up a ramp into the library.',
    question:'The cart has wheels. Why does it still need a ramp?',questionCn:'小车已经有轮子了，为什么还需要斜坡？',
    phrases:[['a cart full of books','装满书的小推车'],['steps at the door','门口的台阶'],['push the cart up','把小车推上去'],['put a ramp beside the steps','在台阶旁放一条斜坡'],['get inside','进入里面']],
    frames:[['The cart cannot go up ____.','说明台阶造成的困难。'],['We use a ramp to ____.','说清斜坡的具体用途。'],['With the ramp, we can ____.','接着说解决问题后的结果。']],
    refs:['The cart cannot go up the steps easily.','We use a ramp to push the cart up to the doorway.','With the ramp, we can move the books into the library.'],
    note:'轮子帮助平地搬运；斜坡帮助跨越门口高差。两者作用要区分。push…up表示向上推；into后接the library，inside可单独表示“到里面”。',
    model:'My favourite simple machine is the ramp. The library has steps at the door. It is hard to push a book cart up the steps. With a ramp, we can push the cart up to the doorway. It helps us move the books into the library. This simple machine makes our work easier.'
  },
  {
    id:'lever',kind:'simple',title:'杠杆抬起箱子一角',en:'A lever for a heavy box',object:'the lever',sheet:2,row:0,
    beforeAlt:'A worker finds it hard to lift one corner of a heavy wooden box by hand.',afterAlt:'The worker presses a long lever over a fulcrum to lift one side of the box.',
    question:'What happens when the worker pushes one end down?',questionCn:'向下按杠杆的一端，箱子那一端发生什么变化？',
    phrases:[['a heavy box','一个沉重的箱子'],['lift one side of the box','抬起箱子的一侧'],['push down one end','向下按一端'],['the other end goes up','另一端上升'],['with less effort','更省力地']],
    frames:[['It is hard to lift ____ by hand.','先写原来的困难。'],['When we push one end down, ____.','说明一端下降，另一端怎样。'],['The lever helps us ____.','写抬起一侧，不夸大成搬运整个箱子。']],
    refs:['It is hard to lift one side of the heavy box by hand.','When we push one end down, the other end goes up.','The lever helps us lift one side of the box with less effort.'],
    note:'图中的支点靠近箱子；人在较长的一端向下按，箱子一侧被抬起。杠杆不是让箱子自动跨房间移动。主语one end是单数，所以写goes up。',
    model:'My favourite simple machine is the lever. It is hard to lift one side of a heavy box by hand. A lever can help us. When we push one end down, the other end goes up. It helps us lift one side of the box with less effort. I think it is very useful.'
  },
  {
    id:'opener',kind:'simple',title:'开瓶器打开瓶盖',en:'A lever in a bottle opener',object:'the lever',sheet:2,row:1,
    beforeAlt:'An adult cannot remove a metal crown bottle cap by hand.',afterAlt:'The adult opens the bottle using a handheld metal bottle opener.',
    question:'Which tool helps open the bottle? How does it help?',questionCn:'什么工具帮助打开瓶子？写出它的用途。',
    phrases:[['open a bottle','打开瓶子'],['a bottle cap','瓶盖'],['by hand','用手'],['a bottle opener','开瓶器'],['work like a lever','像杠杆一样工作']],
    frames:[['It is hard to open ____ by hand.','先说不用工具时的困难。'],['We use a bottle opener to ____.','to后接动词原形。'],['It works like ____.','把日常工具与简单机械联系起来。']],
    refs:['It is hard to open this bottle by hand.','We use a bottle opener to open the bottle.','This bottle opener works like a lever and makes the job easier.'],
    note:'这里展示的是杠杆式开瓶器，不能泛化为每一种开瓶器都完全一样。写simple machine时介绍lever，再举bottle opener这个生活例子。opener是工具名，open是动作。',
    model:'My favourite simple machine is the lever. We can find one in this bottle opener. It is hard to open the bottle by hand. We use the opener to lift the cap. It works like a lever and makes the job easier. I like this useful tool.'
  },
  {
    id:'washing',kind:'modern',title:'洗衣机洗衣服',en:'The washing machine',object:'the washing machine',sheet:2,row:2,
    beforeAlt:'A parent washes a large pile of clothes by hand in a basin.',afterAlt:'The parent loads clothes into a front-loading washing machine.',
    question:'How did people wash clothes before? What can the machine do now?',questionCn:'以前怎么洗衣服？现在机器能帮助做什么？',
    phrases:[['wash clothes by hand','用手洗衣服'],['take a lot of time','花很多时间'],['put clothes in the machine','把衣服放进机器'],['save time and energy','节省时间和精力'],['do other things','做其他事情']],
    frames:[['Before, people washed ____ by hand.','写过去的习惯，wash变washed。'],['Now, we use washing machines to ____.','现在的一般用途用现在时。'],['I like it because it ____.','because后要有完整的原因。']],
    refs:['Before, people washed clothes by hand. It took a lot of time.','Now, we use washing machines to wash clothes.','I like the washing machine because it saves us time and energy.'],
    note:'clothes本身是复数形式，不能写a clothes。过去take变took；现在主语it，save要写saves。图中是把衣服装入洗衣机，不描述为把手伸进正在运转的机器。',
    model:'My favourite invention is the washing machine. Before, people washed clothes by hand. It was tiring and took a lot of time. Now, we use washing machines to wash clothes. We can do other things while the machine works. I like it because it saves us time and energy.'
  },
  {
    id:'fridge',kind:'modern',title:'冰箱保存食物',en:'The fridge',object:'the fridge',sheet:2,row:3,
    beforeAlt:'Milk and vegetables left in a warm room have spoiled.',afterAlt:'A person puts fresh milk and vegetables in an open refrigerator.',
    question:'What happens to food in a warm room? How does a fridge help?',questionCn:'温暖的房间里食物会怎样？冰箱能帮助做什么？',
    phrases:[['keep food fresh','保持食物新鲜'],['go bad quickly','很快变坏'],['in warm weather','在温暖的天气里'],['put food in the fridge','把食物放进冰箱'],['for longer','更长时间']],
    frames:[['Without a fridge, food can ____.','说没有冰箱时可能出现的问题。'],['Now, we put ____ in the fridge.','具体写放进什么。'],['It helps us keep ____ for longer.','keep＋食物＋fresh，说明食物状态。']],
    refs:['Without a fridge, food can go bad quickly in warm weather.','Now, we put milk and vegetables in the fridge.','The fridge helps us keep food fresh for longer.'],
    note:'food在这里是不可数名词，写food can go bad，不加s。冰箱能延缓食物变坏，不能说让食物永远新鲜，也不能让已经坏掉的食物恢复新鲜。fridge和refrigerator均可。',
    model:'My favourite invention is the fridge. Without a fridge, food can go bad quickly in warm weather. Before, it was hard to keep some food fresh. Now, we put milk and vegetables in the fridge. It keeps food fresh for longer. I like it because it is useful in our daily lives.'
  },
  {
    id:'light',kind:'modern',title:'电灯照亮夜晚',en:'The electric light',object:'the electric light',sheet:3,row:0,
    beforeAlt:'A child reads a book by dim candlelight at night with an adult nearby.',afterAlt:'The child reads comfortably under an electric desk lamp.',
    question:'How did people get light at night? What changes with electric lights?',questionCn:'以前夜里用什么照明？有电灯后有什么变化？',
    phrases:[['use candles','使用蜡烛'],['read at night','在夜里读书'],['turn on the light','打开电灯'],['make the room bright','让房间明亮'],['see things clearly','清楚地看东西']],
    frames:[['Long ago, people used ____ at night.','used是use的过去式。'],['Now, electric lights make ____.','写出房间状态的变化。'],['They help us ____.','说明灯光具体帮助做什么。']],
    refs:['Long ago, people used candles at night.','Now, electric lights make our rooms bright.','They help us read and see things clearly at night.'],
    note:'used candles是过去的动作；use electric lights是现在的用途。make our rooms bright中bright是形容词。无需添加未经核实的发明年份或“某人独自发明”的历史说法。',
    model:'My favourite invention is the electric light. Long ago, people used candles at night. Sometimes it was hard to see things clearly. Now, electric lights make our rooms bright. They help us read at night. I like them because they make our lives easier.'
  },
  {
    id:'phone',kind:'modern',title:'电话联系家人',en:'The telephone',object:'the telephone',sheet:3,row:1,
    beforeAlt:'A child writes a letter to a grandparent who lives far away.',afterAlt:'The child has a video call with the grandparent on a smartphone.',
    question:'How did people contact family far away? What can they do now?',questionCn:'以前怎样联系远方家人？现在能怎样联系？',
    phrases:[['write letters','写信'],['wait for a reply','等待回信'],['live far away','住得很远'],['call our family','给家人打电话'],['make video calls','打视频电话']],
    frames:[['Before, people wrote ____ and waited for ____.','write的过去式是wrote。'],['Now, we can use mobile phones to ____.','用途句：use…to do。'],['I like it because I can ____.','写自己的具体理由。']],
    refs:['Before, people wrote letters and waited for a reply.','Now, we can use mobile phones to call our family.','We can also make video calls and see our grandparents.'],
    note:'整篇可介绍telephone，再用现在的mobile phones举例。phone不自动等于所有手机功能，视频通话要明确说mobile phones。write→wrote，wait→waited；can后用原形。',
    model:'My favourite invention is the telephone. Before, people wrote letters to family far away and waited for a reply. Now, we can use mobile phones to call our family. We can also make video calls. I like this invention because I can talk to my grandparents easily.'
  },
  {
    id:'train',kind:'modern',title:'火车帮助远行',en:'The train',object:'the train',sheet:3,row:2,
    beforeAlt:'Two tired travellers walk a long rural road carrying bags.',afterAlt:'The travellers sit comfortably on a train travelling through the countryside.',
    question:'How did the travellers get there before? How does the train help?',questionCn:'图中的人原来怎样远行？乘火车后有什么不同？',
    phrases:[['walk a long way','走很远的路'],['take a long time','花很长时间'],['travel by train','乘火车旅行'],['get to other cities','到达其他城市'],['travel faster','出行更快']],
    frames:[['Before, some people walked ____.','只说部分人，不把所有旧时出行都说成步行。'],['Now, we can travel ____.','交通方式用by train。'],['Trains help us get to ____ faster.','写到达哪里，比较什么。']],
    refs:['Before, some people walked a long way to visit other places.','Now, we can travel by train.','Trains help us get to other cities faster than walking.'],
    note:'用some people避免“以前所有人都只会步行”的不实概括。by train不加a，也不写by a train。fast的比较级是faster，不能写more faster。不编造图中不存在的精确耗时。',
    model:'My favourite invention is the train. Before, some people walked a long way to visit other places. It took a lot of time. Now, we can travel by train. Trains help us get to other cities faster than walking. I like trains because I can travel comfortably with my family.'
  },
  {
    id:'vacuum',kind:'modern',title:'吸尘器清洁房间',en:'The vacuum cleaner',object:'the vacuum cleaner',sheet:3,row:3,
    beforeAlt:'An adult sweeps a dusty floor with a broom and dustpan.',afterAlt:'The adult cleans the same floor with a canister vacuum cleaner.',
    question:'Which tools do you see? How does the new tool help?',questionCn:'前后分别用了什么工具？新工具带来什么帮助？',
    phrases:[['sweep the floor','扫地'],['use a broom','使用扫帚'],['pick up dust','吸走灰尘'],['clean the floor','清洁地面'],['make cleaning easier','让清洁更轻松']],
    frames:[['Before, people used ____ to sweep the floor.','过去使用什么工具？'],['Now, we use ____ to pick up dust.','写现在的工具与用途。'],['It makes cleaning ____.','描述清洁这件事变得怎样。']],
    refs:['Before, people used brooms to sweep the floor.','Now, we use vacuum cleaners to pick up dust.','A vacuum cleaner makes cleaning easier.'],
    note:'这组是两种清洁办法的对照，不表示现在不能用扫帚。vacuum cleaner是吸尘器，不是洗衣机，也不把它说成可以清除所有污渍。make cleaning easier中用easier。',
    model:'My favourite invention is the vacuum cleaner. Before, people used brooms to sweep the floor. Now, we can use vacuum cleaners to pick up dust. They help us clean the floor easily. I like this invention because it makes cleaning easier.'
  }
];

window.WRITING_REVIEW = [
  {title:'careful还是carefully？',question:'Be _____. / Handle the tiny parts _____.',answer:'Be <b>careful</b>. / Handle the tiny parts <b>carefully</b>.',note:'careful描述人或状态；carefully说明动作怎样进行。先找它在句中说明谁。'},
  {title:'slowly怎样比较？',question:'比较两台机器用什么？三台里最慢呢？',answer:'slowly → <b>more slowly</b> → <b>the most slowly</b>',note:'两者比较可用more slowly than；三者中最慢可用the most slowly of the three。比较对象由题目决定。'},
  {title:'使用某物来做什么',question:'We use a cart _____ carry books.',answer:'We use a cart <b>to</b> carry books.',note:'use＋物＋to＋动词原形。作文写用途时就能用。再试：用洗衣机洗衣服。'},
  {title:'帮助某人做什么',question:'The wheels help us _____ things. (move)',answer:'The wheels help us <b>move / to move</b> things.',note:'help sb do sth和help sb to do sth都可以。不能直接写help us moving来套这个结构。'},
  {title:'easier还是more easily？',question:'It makes our lives _____. / We move things _____.',answer:'It makes our lives <b>easier</b>. / We move things <b>more easily</b>.',note:'easier描述生活变得怎样；more easily说明搬运这个动作更轻松。'},
  {title:'each后面用单数还是复数？',question:'Each _____ helps us. (invention)',answer:'Each <b>invention</b> helps us.',note:'each后接单数可数名词；这句话的主语是单数，所以help写helps。'},
  {title:'图里的动作和位置',question:'inside / outside / press / stand / push down分别是什么意思？',answer:'inside 在里面；outside 在外面；press 按；stand 站立；push down 向下按。',note:'看杠杆图，再说：When one end goes down, the other end goes up. 注意one end后面用goes。'},
  {title:'know和snow怎么读？',question:'这两个词的开头发音一样吗？',answer:'know <b>/nəʊ/</b>；snow <b>/snəʊ/</b>',note:'know中的k不发音；snow开头有/s/。两词中的ow都发/əʊ/。'}
];
