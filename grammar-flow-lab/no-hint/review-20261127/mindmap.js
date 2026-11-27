(()=>{'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Each question carries its own evidence and route, rather than a repeated generic diagram.
const routes={
 r1:['fixed','instead 后面接 walking home。','把前后连成“代替／而不是”的固定表达。','空格只补一个词，后面的 walking 保留 -ing。'],
 r2:['fixed','help me 后接名词短语 my English homework。','区分“help sb + 介词 + sth”和“help sb (to) do sth”。','homework 是名词，不能当作动词原形。'],
 r3:['fixed','Canada 是地方；本句要说明新同学的来源。','回想 come + 介词，表示“来自哪里”。','填回后应表达来源，而不是“来到加拿大”。'],
 r4:['coordinate','前面有 not only，后面已有 also。','sing 和 dance 是结构对应的两个动作，补齐成对连接。','每空一词；不要把已给出的 also 再写一次。'],
 r5:['special','给出 one，题目要求对应的序数词。','属于前三个数词的整体特殊变化。','整体回忆拼写，不能直接在原词后加 th。'],
 r6:['special','给出 two，题目要求对应的序数词。','属于前三个数词的整体特殊变化。','检查整词拼写，不能直接在 two 后加 th。'],
 r7:['special','给出 three，题目要求对应的序数词。','属于前三个数词的整体特殊变化。','整体回忆拼写，不要在特殊形式后再加 th。'],
 r8:['spelling','给出 five，注意结尾 ve。','先处理 ve 的特殊变化，再接序数词词尾。','核对变动后的辅音字母，不能机械保留原词。'],
 r9:['spelling','给出 eight，原词已经以 t 结尾。','序数词变化时，要注意末尾已有的字母。','不要把 t 重复写两遍。'],
 r10:['spelling','给出 nine，注意末尾不发音的 e。','序数词变化时，先处理末尾 e，再加词尾。','检查有没有误保留原词末尾的 e。'],
 r11:['spelling','给出 twelve，注意末尾 ve。','和 five 属于同一类特殊拼写变化。','中间的 l 要保留；检查 ve 的变化。'],
 r12:['tens','twenty 是整十数，末尾是 y。','整十数变序数词，先改 y，再加序数词词尾。','核对 y 的变化；不要直接在 twenty 后加 th。'],
 p1:['article','空格后是可数名词单数 umbrella，第一次提到。','泛指一把伞；选择冠词时听后面单词的开头发音。','umbrella 以元音音素开头，不只看首字母。'],
 p2:['article','前一句已经说过 a book，后一句再次说这本书。','先判断是不是同一本，再确定冠词。','本空在句首，填词时检查首字母大写。'],
 p3:['coordinate','either 已出现，两边是红笔和蓝笔两个选项。','根据“二选一”的意思，补齐成对连接结构。','不要和表示“两者都”的结构混淆。'],
 p4:['coordinate','前半句“很累”，后半句“仍继续练习”。','两个分句之间表达转折，不是顺承或结果。','把词放回去，读出“虽然累，却继续”的关系。'],
 p5:['subordinate','空格后有主语 it 和谓语 was raining。','后面的完整分句说明“待在室内”的原因。','需要能引导原因从句的词，不能直接接名词结构。'],
 p6:['relation','空格后是 bus，前面没有 a 或 the。','这里说明交通方式，回想“乘公交车”的表达。','区分“介词 + bus”和“介词 + the bus”两种形式。'],
 p7:['fixed','定位空格前的 am interested 和后面的 science。','要表达“对科学感兴趣”，找形容词后面的介词搭配。','后面虽有 and，也要先判断当前空格的作用。'],
 p8:['fixed','is good 后接 swimming，后文说想进校队。','这里表达“擅长游泳”，回想对应的介词搭配。','区分“擅长”和“对……有益”，再填回整句。'],
 e1:['compound','twenty-one 是“几十几”，含连字符。','只把最后一个数词变成序数词，前面的整十部分不变。','检查个位的特殊变化，并保留连字符。'],
 e2:['tens','thirty 是整十数，末尾是 y。','迁移 twenty 变序数词的规则，先处理末尾 y。','检查序数词词尾，也核对原词 thirty 的拼写。'],
 e3:['subordinate','know 后面接从句；the problem 是主语，lay 是谓语。','此处 lay 是 lie 的过去式，表示“位于”；从句要说明问题出在何处。','选择表达位置含义的引导词，不能随意填 that。'],
 e4:['subordinate','found out 后接从句；makes 前面缺主语。','引导词既连接从句，又要在从句中充当“什么东西”的主语。','检查引导词能否作主语；本空在句中用小写。']
};
const noHint=[
 {id:'link',name:'连接词／从句',children:[['coordinate','并列或成对连接','看并列、选择、转折等关系；留意成对结构。'],['subordinate','从句引导词','看从句缺什么成分，再看时间、原因、条件、地点等含义。']]},
 {id:'det',name:'限定词',children:[['article','冠词','先查可数与单复数、泛指与特指；a/an 还要看发音。'],['other-det','其他限定词','看是否需要物主、指示或数量限定，如 my、this、some；须结合上下文。']]},
 {id:'prep',name:'介词与搭配',children:[['fixed','固定搭配','把前词、空格和后面的内容连起来，检查动词、形容词或名词搭配。'],['relation','时间／地点／方式等关系','先说清要表达什么关系，再检查介词后面的形式。']]},
 {id:'pronoun',name:'代词',children:[['pronoun-slot','指代与句子成分','看缺主语还是宾语，指谁或什么；再检查人称、单复数、反身等。']]},
 {id:'structure',name:'其他固定结构',children:[['structure-slot','不定式标记等','检查是否为不定式标记 to、as…as 等结构；to 不一定是介词。']]}
];
const withHint=[
 {id:'noun',name:'名词',children:[['noun-slot','数、所有格与词性','检查单复数、所有格；也可能需要转成形容词等其他词性。']]},
 {id:'verb',name:'动词',children:[['finite','作谓语','结合时间线索确定时态，再查语态和主谓一致。'],['nonfinite','不作谓语','根据结构与搭配判断 to do、doing、done 等形式。']]},
 {id:'adjective',name:'形容词／副词',children:[['adj-slot','词性与等级','看修饰什么，判断形容词或副词；再查原级、比较级、最高级及否定意义。']]},
 {id:'given-pronoun',name:'代词',children:[['given-pronoun-slot','人称与形式','按句子成分判断主格、宾格、物主代词或反身代词。']]},
 {id:'number',name:'数词',children:[['special','前三个：整体特殊变化','前三个的序数词形式要整体记忆。'],['spelling','特殊拼写变化','检查 five、eight、nine、twelve 等词的字母变化。'],['tens','整十数','检查末尾 y 的变化，再加序数词词尾。'],['compound','复合数词','只变最后一个词；注意连字符和个位的特殊变化。'],['regular','一般变化与数量表达','多数基数词变序数词加 th；也要判断语境是否仍需基数词。']]}
];
window.renderReviewMindmap=(q,options)=>{
 const el=document.getElementById('mindmap'),data=routes[q.id];
 if(!data)throw new Error('Missing mindmap route: '+q.id);
 let choice={mode:'',branch:'',leaf:'',...(options.choice||{})};
 const modes=[{id:'no-hint',name:'无提示词',caption:'根据结构、意思和搭配判断',nodes:noHint},{id:'with-hint',name:'有提示词',caption:'先认词性，再判断怎样变化',nodes:withHint}];
 function draw(){
  el.innerHTML=`<div class="map-header"><div><p class="eyebrow">先自己判断</p><h3 id="mapTitle">选一条做题思路</h3></div><span class="map-question">${esc(q.title)}</span></div><p class="map-caption">先看有没有提示词，再选你认为合适的卡片。</p>${modes.map(mode=>{
   const selected=choice.mode===mode.id?mode.nodes.find(n=>n.id===choice.branch):null;
   return `<section class="map-card-group" aria-label="${esc(mode.name)}"><h4>${esc(mode.name)}</h4><p class="map-group-caption">${esc(mode.caption)}</p><div class="map-card-grid">${mode.nodes.map(node=>`<button type="button" class="map-choice-card" data-map-mode="${mode.id}" data-map-branch="${node.id}" aria-pressed="${selected===node}"><span>${esc(node.name)}</span></button>`).join('')}</div>${selected?`<div class="map-selection"><p class="map-selection-title">你选择了：${esc(selected.name)}</p><p class="map-selection-caption">继续选下面的小分支，看看判断方法是否适合这句话。</p><div class="map-subcards">${selected.children.map(([id,name,rule])=>`<button type="button" class="map-subcard" data-map-leaf="${id}" aria-pressed="${choice.leaf===id}">${esc(name)}</button>`).join('')}</div>${selected.children.filter(([id])=>id===choice.leaf).map(([id,name,rule])=>`<div class="map-rule-panel"><b>可以这样检查</b><p>${esc(rule)}</p></div>`).join('')}</div>`:''}</section>`;
  }).join('')}${options.done?`<section class="map-review"><h4>做完再核对判断过程</h4><ol class="map-steps"><li><b>看线索</b><span>${esc(data[1])}</span></li><li><b>作判断</b><span>${esc(data[2])}</span></li><li><b>填回去检查</b><span>${esc(data[3])}</span></li></ol><p class="map-result">答案：<strong lang="en">${esc(options.answer)}</strong></p></section>`:''}<p class="map-foot">选卡片只记录你的思路，不会提前判断对错；详细解析在作答后核对。</p>`;
 }
 el.onclick=e=>{
  const branch=e.target.closest('[data-map-branch]'),leaf=e.target.closest('[data-map-leaf]');
  if(branch){choice={mode:branch.dataset.mapMode,branch:branch.dataset.mapBranch,leaf:''};}
  else if(leaf){choice={...choice,leaf:leaf.dataset.mapLeaf};}
  else return;
  options.onSelect({...choice});
  draw();
  const selected=branch?el.querySelector('[data-map-branch="'+choice.branch+'"]'):el.querySelector('[data-map-leaf="'+choice.leaf+'"]');
  if(selected)selected.focus({preventScroll:true});
 };
 draw();
};
})();
