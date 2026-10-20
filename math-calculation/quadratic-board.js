/* 可选课堂板书：只保存在当前浏览器，切题后保留各题笔迹。 */
(()=>{'use strict';
function attach(canvas,buttons,strokes,onSave){
 const ctx=canvas.getContext?.('2d');if(!ctx)return{destroy(){}};
 let width=700,height=260,mode='pen',color='#235b9b',active=null,cleared=null;
 function draw(){ctx.clearRect(0,0,width,height);for(const s of strokes){ctx.beginPath();ctx.strokeStyle=s.mode==='eraser'?'#ffffff':s.color;ctx.lineWidth=s.mode==='eraser'?22:2.7;ctx.lineCap='round';ctx.lineJoin='round';s.points.forEach((p,i)=>i?ctx.lineTo(p[0]*width,p[1]*height):ctx.moveTo(p[0]*width,p[1]*height));if(s.points.length===1){const p=s.points[0];ctx.lineTo(p[0]*width+.1,p[1]*height+.1);}ctx.stroke();}buttons.undo.disabled=!strokes.length&&!cleared;buttons.clear.disabled=!strokes.length;}
 function resize(){const box=canvas.getBoundingClientRect(),ratio=Math.min(window.devicePixelRatio||1,2);width=Math.max(1,box.width);height=Math.max(1,box.height);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);draw();}
 function point(e){const b=canvas.getBoundingClientRect();return[Math.max(0,Math.min(1,(e.clientX-b.left)/b.width)),Math.max(0,Math.min(1,(e.clientY-b.top)/b.height))];}
 function markMode(){buttons.pen.setAttribute('aria-pressed',String(mode==='pen'&&color==='#235b9b'));buttons.red.setAttribute('aria-pressed',String(mode==='pen'&&color==='#b94e3d'));buttons.eraser.setAttribute('aria-pressed',String(mode==='eraser'));canvas.style.cursor=mode==='eraser'?'cell':'crosshair';}
 canvas.onpointerdown=e=>{if(active)return;if(e.button!==undefined&&e.button!==0)return;e.preventDefault();cleared=null;active={pointer:e.pointerId,stroke:{mode,color,points:[point(e)]}};strokes.push(active.stroke);canvas.setPointerCapture?.(e.pointerId);draw();};
 canvas.onpointermove=e=>{if(!active||active.pointer!==e.pointerId)return;e.preventDefault();active.stroke.points.push(point(e));draw();};
 function finish(e){if(!active||active.pointer!==e.pointerId)return;active=null;onSave();}
 canvas.onpointerup=finish;canvas.onpointercancel=finish;
 buttons.pen.onclick=()=>{mode='pen';color='#235b9b';markMode();};buttons.red.onclick=()=>{mode='pen';color='#b94e3d';markMode();};buttons.eraser.onclick=()=>{mode='eraser';markMode();};
 buttons.undo.onclick=()=>{active=null;if(cleared){strokes.push(...cleared);cleared=null;}else strokes.pop();draw();onSave();};
 buttons.clear.onclick=()=>{active=null;cleared=strokes.splice(0);draw();onSave();};
 const observer=window.ResizeObserver?new window.ResizeObserver(resize):null;observer?.observe(canvas);resize();markMode();
 return{destroy(){observer?.disconnect();canvas.onpointerdown=canvas.onpointermove=canvas.onpointerup=canvas.onpointercancel=null;}};
}
window.SquareBoard={attach};
})();
