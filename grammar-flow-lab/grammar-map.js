(()=>{'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
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
window.renderGrammarMindmap=(q,options)=>{
 const el=document.getElementById('mindmap');
 let choice={mode:'',branch:'',leaf:'',path:[],...(options.choice||{})};
 if(!Array.isArray(choice.path))choice.path=[];
 const modes=[{id:'no-hint',name:'无提示词',caption:'根据结构、意思和搭配判断',nodes:noHint},{id:'with-hint',name:'有提示词',caption:'先认词性，再判断怎样变化',nodes:withHint}];
 function deeper(nodes,depth=0){
  const active=nodes.find(node=>node.id===choice.path[depth]);
  return `<section class="map-deep-level" data-map-level="${depth}"><p class="map-deep-heading">${depth===0?'继续点开小卡片':'再看具体情况'}</p><div class="map-deep-cards">${nodes.map(node=>`<button type="button" class="map-deep-card" data-map-node="${node.id}" data-map-depth="${depth}" aria-expanded="${active===node}"><span>${esc(node.title)}</span><span class="map-expand-icon" aria-hidden="true">${active===node?'−':'＋'}</span></button>`).join('')}</div>${active?`<div class="map-deep-panel" data-map-panel="${depth}"><p class="map-detail-title">${esc(active.title)}</p><p class="map-deep-copy">${esc(active.text)}</p>${active.children.length?deeper(active.children,depth+1):'<p class="map-end">这条已展开到规则和例句；再点卡片可以收起。</p>'}</div>`:''}</section>`;
 }
 function draw(){
  el.innerHTML=`<div class="map-header"><div><p class="eyebrow">先自己判断</p><h3 id="mapTitle">选一条做题思路</h3></div><span class="map-question">每题独立记录</span></div><p class="map-caption">先自己选分支；点卡片逐层展开，再点一次收起。</p>${modes.map(mode=>{
   const selected=choice.mode===mode.id?mode.nodes.find(n=>n.id===choice.branch):null;
   return `<section class="map-card-group" aria-label="${esc(mode.name)}"><h4>${esc(mode.name)}</h4><p class="map-group-caption">${esc(mode.caption)}</p><div class="map-card-grid">${mode.nodes.map(node=>`<button type="button" class="map-choice-card" data-map-mode="${mode.id}" data-map-branch="${node.id}" aria-pressed="${selected===node}" aria-expanded="${selected===node}"><span>${esc(node.name)}</span></button>`).join('')}</div>${selected?`<div class="map-selection"><p class="map-selection-title">你选择了：${esc(selected.name)}</p><p class="map-selection-caption">下面每层卡片都能点开；先看规则，再判断是否适合这句话。</p><div class="map-subcards">${selected.children.map(([id,name,rule])=>`<button type="button" class="map-subcard" data-map-leaf="${id}" aria-pressed="${choice.leaf===id}" aria-expanded="${choice.leaf===id}"><span>${esc(name)}</span><span class="map-expand-icon" aria-hidden="true">${choice.leaf===id?'−':'＋'}</span></button>`).join('')}</div>${selected.children.filter(([id])=>id===choice.leaf).map(([id,name,rule])=>`<div class="map-rule-panel"><b>可以这样检查</b><p>${esc(rule)}</p>${deeper(window.REVIEW_GRAMMAR_BRANCHES[id]||[])}</div>`).join('')}</div>`:''}</section>`;
  }).join('')}<p class="map-foot">选卡片只记录你的思路，不会提前判断对错；详细解析在作答后核对。</p>`;
 }
 el.onclick=e=>{
  const branch=e.target.closest('[data-map-branch]'),leaf=e.target.closest('[data-map-leaf]'),node=e.target.closest('[data-map-node]');
  let focusSelector;
  if(branch){const same=choice.mode===branch.dataset.mapMode&&choice.branch===branch.dataset.mapBranch;choice=same?{mode:'',branch:'',leaf:'',path:[]}:{mode:branch.dataset.mapMode,branch:branch.dataset.mapBranch,leaf:'',path:[]};focusSelector='[data-map-branch="'+branch.dataset.mapBranch+'"]';}
  else if(leaf){choice={...choice,leaf:choice.leaf===leaf.dataset.mapLeaf?'':leaf.dataset.mapLeaf,path:[]};focusSelector='[data-map-leaf="'+leaf.dataset.mapLeaf+'"]';}
  else if(node){const depth=Number(node.dataset.mapDepth),id=node.dataset.mapNode,path=choice.path.slice(0,depth);if(choice.path[depth]!==id)path.push(id);choice={...choice,path};focusSelector='[data-map-node="'+id+'"][data-map-depth="'+depth+'"]';}
  else return;
  const mode=modes.find(m=>m.id===choice.mode),selectedBranch=mode?.nodes.find(n=>n.id===choice.branch),selectedLeaf=selectedBranch?.children.find(n=>n[0]===choice.leaf);
  const labels=mode&&selectedBranch?[mode.name,selectedBranch.name]:[];
  if(selectedLeaf){labels.push(selectedLeaf[1]);let nodes=window.REVIEW_GRAMMAR_BRANCHES[selectedLeaf[0]]||[];for(const id of choice.path){const node=nodes.find(n=>n.id===id);if(!node)break;labels.push(node.title);nodes=node.children;}}
  options.onSelect({...choice,path:[...choice.path],labels});
  draw();
  const selected=el.querySelector(focusSelector);
  if(selected)selected.focus({preventScroll:true});
 };
 draw();
};
})();
