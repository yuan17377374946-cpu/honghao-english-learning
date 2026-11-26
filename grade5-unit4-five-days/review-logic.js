(function(root){
  'use strict';
  const copy=value=>JSON.parse(JSON.stringify(value??{}));
  function collected(record={}){
    return !!(record.collected||record.everWrong||record.firstCorrect===false||record.revealed||record.helped&&record.done||record.needsReview||record.reviewAttempts);
  }
  function dayAttempt(original,answer){
    const r=original||{},{ok,draft,at,assisted=false}=answer;
    const first=r.firstCorrect===undefined;
    const next={...r,draft:copy(draft),attempts:(r.attempts||0)+1,done:true,outcome:ok?'correct':'collected',solved:ok,
      firstCorrect:first?ok:r.firstCorrect,
      firstIndependent:r.firstIndependent===undefined?first&&ok&&!assisted:r.firstIndependent,
      helped:!!r.helped||assisted,everWrong:!!r.everWrong||r.firstCorrect===false||!ok,
      collected:collected(r)||!ok||assisted,needsReview:!!r.needsReview||!ok||assisted,
      mastered:ok&&!assisted&&!r.needsReview,updatedAt:at};
    // Older records may lack the original response. Do not invent it from a later answer.
    if(first&&!r.attempts)next.firstSubmission={draft:copy(draft),correct:ok,assisted,at};
    return next;
  }
  function reviewAttempt(original,answer){
    const r=original||{}, {ok,draft,at,assisted=false}=answer;
    return {...r,done:!!r.done||r.firstCorrect!==undefined,collected:true,everWrong:!!r.everWrong||r.firstCorrect===false||!ok,
      needsReview:!ok||assisted,mastered:ok&&!assisted,
      reviewAttempts:(r.reviewAttempts||0)+1,reviewFailures:(r.reviewFailures||0)+(ok?0:1),
      lastReviewAt:at,lastReviewSubmission:{draft:copy(draft),correct:ok,assisted,at}};
  }
  function skipAttempt(original,{draft,at}){
    const r=original||{},next={...r,draft:copy(draft),done:true,outcome:'skipped',collected:true,needsReview:true,mastered:false,skipped:true,updatedAt:at};
    if(!r.firstSubmission&&!r.attempts)next.firstSubmission={draft:copy(draft),correct:null,skipped:true,at};
    if(r.firstIndependent===undefined)next.firstIndependent=false;
    return next;
  }
  const api={collected,dayAttempt,reviewAttempt,skipAttempt};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ReviewBook=api;
})(typeof window==='undefined'?{}:window);

