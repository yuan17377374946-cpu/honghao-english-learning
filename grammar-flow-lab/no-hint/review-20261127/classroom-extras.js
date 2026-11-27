(()=>{'use strict';
window.REVIEW_PASSAGE='Last Saturday, our class went to a science museum. We travelled there [[m1]] bus because it was far from our school. At the entrance, a guide gave each of us [[m2]] information card. Inside, a robot could not only answer questions [[m3]] also draw pictures. I wanted to watch it again, [[m4]] my friends wanted to explore the other rooms. We visited two rooms together. The [[m5]] (three) room on our route was about space. We all enjoyed the trip.';
const rows=[
 ['m1','We travelled there {{blank}} bus because it was far from our school.',['by'],'prep','bus 前没有冠词，这里说明交通方式。','by + 交通工具，如 by bus、by bike；步行是 on foot。','We went to the park by bike.','不要把 by bus 和 on the bus 的结构混在一起。','我们乘公交车去那里，因为那里离学校很远。'],
 ['m2','At the entrance, a guide gave each of us {{blank}} information card.',['an'],'det','information card 的中心词 card 是可数名词单数，首次提到；紧跟空格的 information 以元音音素开头。','泛指一张卡片，用 a/an；a/an 看紧跟的发音。information 本身虽不可数，但这里修饰可数名词 card。','She gave me an invitation card.','不能因 information 不可数就忽略后面的 card，也不能只看 card 的发音。','在入口处，一位讲解员给我们每人发了一张信息卡。'],
 ['m3','Inside, a robot could not only answer questions {{blank}} also draw pictures.',['but'],'link','not only 和 also 都已给出，连接 answer questions 与 draw pictures 两个动作。','not only … but also …，两边结构对应；每空只补缺少的词。','She can not only swim but also skate.','also 已给，不要重复填 but also。','里面有个机器人，不仅能回答问题，还能画画。'],
 ['m4','I wanted to watch it again, {{blank}} my friends wanted to explore the other rooms.',['but','yet','while','whereas'],'link','我想再看一次，朋友们却想探索其他展厅，前后意愿不同。','but、yet 可表示转折；while、whereas 在这里也可连接对照的两个分句。结合完整语意判断合理答案。','I like reading, but my sister likes drawing.','不要只凭逗号猜词；这里不是“所以”的因果关系。','我想再看一次，但朋友们想去探索其他展厅。'],
 ['m5','The {{blank}} (three) room on our route was about space.',['third'],'number','前文说先参观了两间展厅，现在说的是路线中的第三间。','表示顺序用序数词；three → third 是整体特殊变化。','The third lesson is about animals.','这是给提示词的数词变化，不要只填表示数量的 three。','我们路线上的第三间展厅是关于太空的。']
];
window.REVIEW_1127.push(...rows.map((r,i)=>({id:r[0],stage:'mixed',title:'短文 '+String(i+1).padStart(2,'0'),blankNo:i+1,passage:true,stem:r[1],answers:r[2],branch:r[3],clue:r[4],rule:r[5],example:r[6],trap:r[7],translation:r[8],hint:r[4],prompt:i===4?'本空给出 three，请根据上下文变形。':'先通读全文，再为当前这一空填写一个单词。',source:null})));
window.REVIEW_MIXED_ROUTES={
 m1:['relation','bus 前没有冠词；前文说要去博物馆。','这里说明乘坐什么交通工具，检查交通方式表达。','填回后检查介词与后面有无冠词的结构。'],
 m2:['article','整个短语是 information card，中心词是 card。','先看是否泛指一张卡，再听紧跟空格的开头发音。','a/an 的选择看 information 的开头发音，不看 card。'],
 m3:['coordinate','前面出现 not only，后面已给 also。','两个动作结构对应，检查成对连接表达。','每空一个词，不要重复已给出的 also。'],
 m4:['coordinate','我和朋友想做的事情不一样。','读出前后意愿的对照或转折关系。','检查连接词能否连接两个完整分句。'],
 m5:['special','先参观两间，后面说第三间。','表示顺序，检查前三个数词的特殊变化。','核对序数词拼写，不要直接在 three 后加 th。']
};
window.REVIEW_EXIT=[
 {id:'exit1',prompt:'She is interested ___ drawing.',answers:['in'],rule:'be interested in + 名词／doing。'},
 {id:'exit2',prompt:'You can come either today ___ tomorrow.',answers:['or'],rule:'either … or … 表示两个选择。'},
 {id:'exit3',prompt:'nine → 序数词',answers:['ninth'],rule:'nine 去 e，再加 th，得到 ninth。'},
 {id:'exit4',prompt:'twenty-one → 序数词',answers:['twenty-first'],rule:'“几十几”只变最后一个词，保留连字符。'},
 {id:'exit5',prompt:'My brother is good ___ swimming.',answers:['at'],rule:'be good at + 名词／doing，表示擅长。'}
];
})();
