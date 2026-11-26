/* Original storybook illustrations; labels and order stay in the learning UI. */
(function(root){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const kinds=['run','read','drink','cook','swim','paint','tidy','sing','pack','football','friend','plant','basketball'];
const files=Object.fromEntries(kinds.map(kind=>[kind,'pictures/storybook-v1/'+kind+'.webp']));
function render(card){const src=files[card.kind];if(!src)throw new Error('Unknown listening picture: '+card.kind);return `<img class="listening-action-scene" src="${src}" alt="${esc(card.label)}" width="480" height="360" loading="lazy" decoding="async">`;}
const api={render,kinds,files};if(typeof module!=='undefined')module.exports=api;else root.ListeningPictures=api;
})(typeof window==='undefined'?{}:window);
