const assert=require('node:assert/strict');
const {pairTap}=require('./logic.js');
for(const empty of [{},Array(3).fill(null)]){
 let r={pairs:empty,selected:null};const tap=(side,index)=>r=pairTap(r.pairs,r.selected,side,index);
 tap('right',2);assert.deepEqual(r.selected,{side:'right',index:2});tap('right',1);assert.equal(r.selected.index,1);tap('left',0);assert.equal(r.pairs[0],1);assert.equal(r.selected,null);
 tap('left',1);tap('right',1);assert.equal(r.pairs[1],1);assert.equal(r.pairs[0]??null,null);
 tap('right',2);tap('left',1);assert.equal(r.pairs[1],2);assert.equal(Object.values(r.pairs).filter(Number.isInteger).length,1);
 tap('left',2);tap('left',2);assert.equal(r.selected,null);
 tap('right',0);r=JSON.parse(JSON.stringify(r));tap('left',0);assert.equal(r.pairs[0],0);
 tap('left',2);tap('right',1);assert.deepEqual([r.pairs[0],r.pairs[1],r.pairs[2]],[0,2,1]);
 const before=JSON.stringify(r.pairs);pairTap(r.pairs,null,'left',0);assert.equal(JSON.stringify(r.pairs),before);
}
console.log('PASS: both pairing directions, same-side reselection/cancel, remapping, saved selection and unchanged answer formats.');
