(function(root){
  'use strict';
  function clean(text){return String(text??'').normalize('NFKC').trim().replace(/[’‘]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').replace(/[.!?。！？]+$/,'').trim();}
  function norm(text){return clean(text).toLowerCase().replace(/\bi'm\b/g,'i am').replace(/\b(you|we|they)'re\b/g,'$1 are').replace(/\b(he|she|it|there)'s\b/g,'$1 is').replace(/\bisn't\b/g,'is not').replace(/\baren't\b/g,'are not').replace(/\bdon't\b/g,'do not').replace(/\bdoesn't\b/g,'does not');}
  function matches(text,answers,caseSensitive=false){return answers.some(a=>caseSensitive?clean(text)===clean(a):norm(text)===norm(a));}
  const api={clean,norm,matches};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PracticeLogic=api;
})(typeof window==='undefined'?{}:window);
