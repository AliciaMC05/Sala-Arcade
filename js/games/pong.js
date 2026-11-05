// Pong · juego completo (dibujo, lógica y vista previa para la tienda)
G.pong=(()=>{const W=640,H=400;let pl,cp,bl,tk,gl;
const srv=d=>{bl={x:W/2,y:H/2,vx:d*5,vy:rnd(-3,3)}};
return{n:'Pong',c:'#6bc7ff',d:'Supera a la máquina y no dejes pasar la bola.',k:'↑ ↓ o arrastra el dedo / ratón',help:'Mueve tu pala (izquierda) con ↑ ↓, con el ratón o arrastrando el dedo.<br>Cada punto que marques acelera a la máquina; si te cuela tres goles, pierdes.',w:W,h:H,
init(){pl={y:H/2};cp={y:H/2};tk=0;gl=0;srv(1)},
mouse(e){const b=cv.getBoundingClientRect(),s=Math.min(b.width/W,b.height/H);pl.y=(e.clientY-b.top-(b.height-H*s)/2)/s},
step(){tk++;if(K.ArrowUp||K.KeyW)pl.y-=7;if(K.ArrowDown||K.KeyS)pl.y+=7;pl.y=Math.max(40,Math.min(H-40,pl.y));
 const sp=3+Math.min(3.5,sc/400);cp.y+=Math.max(-sp,Math.min(sp,(bl.y-cp.y)*(bl.vx>0?1:.2)));cp.y=Math.max(40,Math.min(H-40,cp.y));
 bl.x+=bl.vx;bl.y+=bl.vy;if(bl.y<7||bl.y>H-7){bl.vy*=-1;bl.y=Math.max(7,Math.min(H-7,bl.y));snd(200,.05)}
 [[24,pl,1],[W-24,cp,-1]].forEach(([px,p,d])=>{if(bl.vx*d<0&&Math.abs(bl.x-px)<14&&Math.abs(bl.y-p.y)<46){const o=(bl.y-p.y)/46,s=Math.min(11,Math.hypot(bl.vx,bl.vy)*1.05);bl.vy=o*s*.8;bl.vx=d*Math.sqrt(s*s-bl.vy*bl.vy);bl.x=px+d*14;snd(400,.06);if(d===1)sc+=10}});
 if(bl.x>W+10){sc+=100;inc('pg');if(++gl%3===0)earn(12);snd(700,.2,'triangle',.05,300);srv(-1)}else if(bl.x<-10){snd(150,.4,'sawtooth',.06,-100);if(--lives<=0)return end();srv(1)}},
draw(){x.fillStyle='#050a14';x.fillRect(0,0,W,H);x.fillStyle='#1d2b4a';for(let y=0;y<H;y+=24)x.fillRect(W/2-2,y,4,12);x.fillStyle='#6bc7ff';x.fillRect(14,pl.y-40,10,80);x.fillStyle='#ff4f7b';x.fillRect(W-24,cp.y-40,10,80);x.fillStyle='#fff';x.beginPath();x.arc(bl.x,bl.y,7,0,7);x.fill()}}})();
