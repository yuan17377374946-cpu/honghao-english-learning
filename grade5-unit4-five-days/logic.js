(function(root){
  'use strict';
  function clean(text){return String(text??'').normalize('NFKC').trim().replace(/[’‘]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').replace(/[.!?。！？]+$/,'').trim();}
  function norm(text){return clean(text).toLowerCase().replace(/\bi'm\b/g,'i am').replace(/\b(you|we|they)'re\b/g,'$1 are').replace(/\b(he|she|it|there)'s\b/g,'$1 is').replace(/\bisn't\b/g,'is not').replace(/\baren't\b/g,'are not').replace(/\bdon't\b/g,'do not').replace(/\bdoesn't\b/g,'does not');}
  function matches(text,answers,caseSensitive=false){return answers.some(a=>caseSensitive?clean(text)===clean(a):norm(text)===norm(a));}
// Keep answer formats unchanged: English uses an object; math uses an array.
function pairTap(existing,selected,side,index){
 const pairs=Array.isArray(existing)?[...existing]:{...existing};
 if(!selected||selected.side===side)return {pairs,selected:selected?.index===index&&selected.side===side?null:{side,index}};
 const left=side==='left'?index:selected.index,right=side==='right'?index:selected.index;
 for(const key of Object.keys(pairs))if(pairs[key]===right){if(Array.isArray(pairs))pairs[key]=null;else delete pairs[key];}
 pairs[left]=right;
 return {pairs,selected:null};
}
  const api={clean,norm,matches,pairTap};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PracticeLogic=api;
})(typeof window==='undefined'?{}:window);

