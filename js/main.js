// Motor principal: menú, partidas, controles (teclado, táctil, ratón) y bucle del juego
const hud=()=>{$('bk').textContent=bank;$('sc').textContent=sc;$('hi').textContent=Math.max(sc,hi[nm]||0);$('lv').textContent=cur&&!cur.nl?'♥'.repeat(Math.max(0,lives)):''};
const recs=()=>{$('achb').textContent='Logros '+ach.length+'/'+AC.length;const e=$('mb');if(e.textContent!==''+bank){e.textContent=bank;e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop')}KEYS.forEach(k=>$('r_'+k).textContent='Récord '+(hi[k]||0))};
function ov(t,m,b){if(!t){$('ov').hidden=true;return}$('ot').textContent=t;$('om').innerHTML=m;$('ob').textContent=b;$('ob').hidden=!b;$('ov').hidden=false}
function launch(k){nm=k;cur=G[k];(stats.pl=stats.pl||{})[k]=(stats.pl[k]||0)+1;sst();cv.width=cur.w;cv.height=cur.h;sc=0;lives=cur.nl?0:3;cur.init();state='ready';$('menu').hidden=true;$('game').hidden=false;$('gt').textContent=cur.n;$('sw').hidden=!!cur.nb;$('pad').hidden=!!cur.np;ov(cur.n,cur.help,'Empezar');hud()}
function end(){state='over';hi[nm]=Math.max(hi[nm]||0,sc);try{localStorage.setItem('arc_hi',JSON.stringify(hi))}catch(e){}ov('Fin del juego','Puntos: <b>'+sc+'</b> · Récord: <b>'+hi[nm]+'</b>','Jugar de nuevo');snd(180,.7,'sawtooth',.08,-120)}
function menu(){state='menu';cur=null;$('game').hidden=true;$('menu').hidden=false;$('shop').hidden=true;$('ach').hidden=true;sst();recs()}
function pause(){if(state==='play'){state='pause';ov('Pausa','Pulsa P o el botón II para continuar','')}else if(state==='pause'){state='play';ov()}}
function go(){if(state==='ready'){state='play';ov()}else if(state==='over')launch(nm)}
KEYS.forEach((k,i)=>{const g=G[k],b=document.createElement('button');b.type='button';b.className='card';b.style.setProperty('--c',g.c);b.innerHTML='<span class="n">'+(i+1)+'</span><strong>'+g.n+'</strong><em>'+g.d+'</em><small>'+g.k+'</small><small id="r_'+k+'"></small>';b.onclick=()=>launch(k);$('cards').appendChild(b)});
$('ob').onclick=go;$('back').onclick=menu;$('pz').onclick=pause;$('shopb').onclick=()=>{$('menu').hidden=true;$('shop').hidden=false;shopUI()};$('shopback').onclick=menu;$('achb').onclick=()=>{$('menu').hidden=true;$('ach').hidden=false;chk();achUI()};$('achback').onclick=menu;
document.querySelectorAll('#pad button').forEach(b=>{const k=b.dataset.k;b.addEventListener('pointerdown',e=>{e.preventDefault();K[k]=1;if(state==='play'){cur.key&&cur.key(k)}else go()});['pointerup','pointerleave','pointercancel'].forEach(t=>b.addEventListener(t,()=>K[k]=0))});
$('pad').addEventListener('contextmenu',e=>e.preventDefault());
let sw;cv.addEventListener('pointerdown',e=>sw=[e.clientX,e.clientY]);
cv.addEventListener('pointerup',e=>{if(!sw||state!=='play'||!cur.sw)return;const dx=e.clientX-sw[0],dy=e.clientY-sw[1];sw=0;if(Math.hypot(dx,dy)<30)return;const c=Math.abs(dx)>Math.abs(dy)?(dx>0?'ArrowRight':'ArrowLeft'):(dy>0?'ArrowDown':'ArrowUp');K[c]=1;setTimeout(()=>K[c]=0,130);cur.key&&cur.key(c)});
cv.addEventListener('pointermove',e=>cur&&cur.mouse&&cur.mouse(e));
cv.addEventListener('pointerdown',e=>{if(state==='play'&&cur&&cur.tap){const b=cv.getBoundingClientRect(),k=Math.min(b.width/cur.w,b.height/cur.h);cur.tap((e.clientX-b.left-(b.width-cur.w*k)/2)/k,(e.clientY-b.top-(b.height-cur.h*k)/2)/k)}});cv.addEventListener('click',()=>cur&&cur.click&&cur.click());
addEventListener('keydown',e=>{
 if(state!=='menu'&&(e.code.startsWith('Arrow')||e.code==='Space'))e.preventDefault();
 K[e.code]=1;
 if(state==='menu'){if(!$('shop').hidden||!$('ach').hidden){if(e.code==='Escape')menu();return}const i=(e.key==='0'?10:+e.key)-1;if(i>=0&&i<KEYS.length)launch(KEYS[i]);return}
 if(e.code==='Escape')menu();
 else if(e.code==='Enter'||e.code==='Space'){const w=state;go();if(w==='play'&&cur.key)cur.key(e.code,e.repeat)}
 else if(e.code==='KeyP')pause();
 else if(state==='play'&&cur.key)cur.key(e.code,e.repeat)});
addEventListener('keyup',e=>K[e.code]=0);addEventListener('blur',()=>{for(const k in K)K[k]=0});
function loop(t){acc+=Math.min(100,t-lt);lt=t;while(acc>=16.67){acc-=16.67;if(state==='play')cur.step()}if(cur&&state!=='menu'){cur.draw();hud()}if(++fc%30===0)chk();if(fc%300===0)sst();requestAnimationFrame(loop)}
recs();requestAnimationFrame(loop);
