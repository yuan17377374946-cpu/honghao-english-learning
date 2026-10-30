/* Presentation layer: original exercises and local classroom records stay intact. */
(function(){
const baseRender=render;
const query=new URLSearchParams(location.search);
if(state.presentation===undefined)state.presentation=true;
if(query.get('present')==='1')state.presentation=true;
if(query.get('view')==='practice')state.presentation=false;
const tools=document.querySelector('.tools');
tools.insertAdjacentHTML('beforeend','<button id="presentationBtn">课件播放</button><button id="fullscreenBtn" hidden>全屏播放 ⛶</button>');
document.body.insertAdjacentHTML('beforeend','<dialog id="slideMenu"><div class="dialogtop"><h2>按页跳转</h2><button id="closeSlideMenu">关闭</button></div><p class="small muted">每道题、每句课文各占一页；加练内容可随时加入。</p><button id="extraSlidesBtn">加入全部加练</button><div id="slideMenuBody"></div></dialog>');
function makeRoute(){
 const out=[];
 const add=(c,n,extra=false)=>{for(let i=0;i<n;i++)out.push({id:c.id,i,extra,kind:c.type});};
 for(const c of D.cards){
  const d=state.cards[c.id]||{},extra=state.slidesExtras||d.extra;
  if(c.type==='quiz'||c.type==='listen'||c.type==='edit'){
   const a=D[c.key];add(c,c.main?c.main:a.length);
   if(c.extra&&extra)add(c,D[c.extra].length,true);
   if(c.main&&extra)add(c,a.length-c.main,true);
  }else if(c.type==='read')add(c,D.readings.find(x=>x.id===c.key).lines.length);
  else if(c.type==='scene'){add(c,4);if(extra)add(c,4,true);}
  else if(c.type==='writing'){add(c,3);out.push({id:c.id,i:3,extra:false,kind:c.type});}
  else if(c.type==='exit')add(c,D.exit.length);
  else add(c,1);
 }
 return out;
}
function position(route=makeRoute()){
 const c=card(),d=cdata();let i=0,extra=false;
 if(['quiz','listen','edit','scene'].includes(c.type)){i=d.i||0;extra=!!d.extra;}
 if(c.type==='read')i=d.line||0;
 if(c.type==='writing')i=d.slideStage==='compose'?3:d.slot||0;
 if(c.type==='exit')i=d.i||0;
 const n=route.findIndex(x=>x.id===c.id&&x.i===i&&x.extra===extra);
 return n<0?route.findIndex(x=>x.id===c.id):n;
}
function slideHash(s){return s.i||s.extra?'#'+s.id+'~'+s.i+(s.extra?'~extra':''):'#'+s.id;}
function applySlide(s){
 const c=D.cards.find(x=>x.id===s.id);state.card=s.id;
 const d=cdata();
 if(['quiz','listen','edit','scene'].includes(c.type)){d.i=s.i;d.extra=s.extra;}
 if(c.type==='read')d.line=s.i;
 if(c.type==='writing'){d.slideStage=s.i===3?'compose':'plan';d.slot=s.i===3?2:s.i;if(s.i===3)d.assemble=true;}
 if(c.type==='exit')d.i=s.i;
 history.replaceState(null,'',slideHash(s));save();render();
 document.querySelector('#card').scrollTop=0;window.scrollTo(0,0);
}
function move(delta){const route=makeRoute(),n=position(route)+delta;if(n>=0&&n<route.length)applySlide(route[n]);}
function subtitle(s){
 const c=D.cards.find(x=>x.id===s.id);
 if(c.type==='read'){const r=D.readings.find(x=>x.id===c.key);return r.lines[s.i].chunks.map(x=>x.text).join('');}
 if(['quiz','listen','edit'].includes(c.type)){let a=s.extra?(c.extra?D[c.extra]:D[c.key].slice(c.main)):D[c.key];const q=a[s.i];return q.prompt||q.question||q.original;}
 if(c.type==='scene')return D.scenes[s.i+(s.extra?4:0)].name;
 if(c.type==='writing')return s.i===3?'拼成完整短文':'生活例子 '+(s.i+1);
 if(c.type==='exit')return D.exit[s.i].task;
 return c.title;
}
function openSlideMenu(){
 const route=makeRoute();$('#extraSlidesBtn').textContent=state.slidesExtras?'只保留主练':'加入全部加练';
 $('#slideMenuBody').innerHTML=D.modules.map((m,i)=>`<h3>${i+1}. ${esc(m.name)}</h3>${route.map((s,n)=>({s,n})).filter(({s})=>D.cards.find(c=>c.id===s.id).module===i).map(({s,n})=>`<button data-slide-jump="${n}"><span class="slide-number">${n+1}</span><span>${esc(subtitle(s).replace(/\n/g,' ').slice(0,85))}${s.extra?' <small>加练</small>':''}</span></button>`).join('')}`).join('');
 $('#slideMenu').showModal();
}
function requestFullscreen(){
 if(document.fullscreenElement){document.exitFullscreen?.().catch(()=>toast('可以按Esc退出全屏。'));return;}
 if(!document.documentElement.requestFullscreen){toast('当前浏览器不支持全屏，可继续使用课件播放模式。');return;}
 document.documentElement.requestFullscreen().catch(()=>toast('已铺满窗口播放；如需浏览器全屏，可按F11。'));
}
function decorate(){
 const on=!!state.presentation;document.body.classList.toggle('slides',on);
 $('#presentationBtn').textContent=on?'退出播放':'课件播放';$('#presentationBtn').setAttribute('aria-pressed',on);$('#fullscreenBtn').hidden=!on;$('#fullscreenBtn').title='点击进入全屏；浏览器未允许时，可按F11。';
 $('#fullscreenBtn').textContent=document.fullscreenElement?'退出全屏 ⛶':'全屏播放 ⛶';
 document.querySelector('#card').classList.remove('slideplan','slidecompose');
 if(!on){$('#prev').textContent='← 上一步';$('#next').textContent='下一步 →';return;}
 const route=makeRoute(),n=position(route),c=card(),d=cdata();
 $('#count').textContent=`${n+1} / ${route.length} 页`;
 $('#progress').style.width=((n+1)/route.length*100)+'%';
 $('#prev').textContent='← 上一页';$('#next').textContent='下一页 →';$('#prev').disabled=n<=0;$('#next').disabled=n===route.length-1;
 $('#routeInfo').innerHTML=`<button id="slideDirectoryBtn">第 ${n+1} / ${route.length} 页 ▦</button><span>← → 翻页 · 空格下一页</span>`;
 if(c.type==='writing'){
  const compose=d.slideStage==='compose';$('#card').classList.add(compose?'slidecompose':'slideplan');
  if(compose){const detail=$('#card details');if(detail)detail.open=true;}
 }
 const current=route[n];if(current)history.replaceState(null,'',slideHash(current));
 $('#card').classList.remove('slide-enter');void $('#card').offsetWidth;$('#card').classList.add('slide-enter');
}
render=function(){baseRender();decorate();};
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b||b.disabled)return;
 if(b.id==='presentationBtn'){
  e.preventDefault();e.stopImmediatePropagation();state.presentation=!state.presentation;
  if(!state.presentation&&document.fullscreenElement)document.exitFullscreen?.().catch(()=>{});
  save();render();return;
 }
 if(b.id==='fullscreenBtn'){e.preventDefault();e.stopImmediatePropagation();requestFullscreen();return;}
 if(b.id==='closeSlideMenu'){e.stopImmediatePropagation();$('#slideMenu').close();return;}
 if(b.id==='extraSlidesBtn'){e.stopImmediatePropagation();state.slidesExtras=!state.slidesExtras;if(!state.slidesExtras)Object.values(state.cards).forEach(x=>x.extra=false);save();$('#slideMenu').close();render();openSlideMenu();return;}
 if(b.dataset.slideJump!==undefined){e.stopImmediatePropagation();$('#slideMenu').close();applySlide(makeRoute()[Number(b.dataset.slideJump)]);return;}
 if(!state.presentation)return;
 if(b.id==='prev'||b.id==='next'){e.preventDefault();e.stopImmediatePropagation();move(b.id==='next'?1:-1);return;}
 if(b.id==='directory'||b.id==='slideDirectoryBtn'){e.preventDefault();e.stopImmediatePropagation();openSlideMenu();return;}
},true);
document.addEventListener('keydown',e=>{
 if(!state.presentation||e.altKey||e.ctrlKey||e.metaKey||document.querySelector('dialog[open]'))return;
 if(e.target.closest('textarea,input,select,[contenteditable="true"]'))return;
 if(e.key===' '&&e.target.closest('button,a,[role="button"]'))return;
 if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();move(1);}
 else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();move(-1);}
 else if(e.key.toLowerCase()==='f'){e.preventDefault();requestFullscreen();}
},true);
document.addEventListener('fullscreenchange',()=>{if($('#fullscreenBtn'))$('#fullscreenBtn').textContent=document.fullscreenElement?'退出全屏 ⛶':'全屏播放 ⛶';});
function restoreHash(){const match=location.hash.slice(1).match(/^([^~]+)(?:~(\d+))?(~extra)?$/);if(!match)return;const route=makeRoute(),s=route.find(x=>x.id===match[1]&&x.i===Number(match[2]||0)&&x.extra===!!match[3]);if(s&&state.presentation)applySlide(s);}
window.addEventListener('hashchange',restoreHash);
restoreHash();render();save();
})();
