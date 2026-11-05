// Tetris · juego completo (dibujo, lógica y vista previa para la tienda)
G.tetris=(()=>{
const SH=[[[0,0],[1,0],[2,0],[3,0]],[[0,0],[1,0],[0,1],[1,1]],[[1,0],[0,1],[1,1],[2,1]],[[1,0],[2,0],[0,1],[1,1]],[[0,0],[1,0],[1,1],[2,1]],[[0,0],[0,1],[1,1],[2,1]],[[2,0],[0,1],[1,1],[2,1]]],CO=['#3ef2ff','#ffd23f','#b86bff','#8cff4f','#ff4f7b','#6b8bff','#ff9a4f'];
let g,p,nx,dc,hl,hr,ln,lv;
const col=(c,px,py)=>c.some(([a,b])=>{const X=px+a,Y=py+b;return X<0||X>=10||Y>=20||(Y>=0&&g[Y][X])});
const np=()=>{const i=rnd(0,7)|0;return{c:SH[i],i,x:3,y:0}};
const mv=(dx,dy)=>{if(col(p.c,p.x+dx,p.y+dy))return 0;p.x+=dx;p.y+=dy;return 1};
const cell=(cx,cy,i)=>{x.fillStyle=CO[i];x.fillRect(cx*28+1,cy*28+1,26,26);x.fillStyle='rgba(255,255,255,.35)';x.fillRect(cx*28+1,cy*28+1,26,4)};
function spawn(){p=nx;nx=np();if(col(p.c,p.x,p.y))end()}
function lock(){p.c.forEach(([a,b])=>{if(p.y+b>=0)g[p.y+b][p.x+a]=p.i+1});let n=0;for(let r=19;r>=0;r--)if(g[r].every(v=>v)){g.splice(r,1);g.unshift(Array(10).fill(0));n++;r++}
 if(n){sc+=[0,100,300,500,800][n]*lv;ln+=n;inc('tl',n);{const o=lv;lv=1+(ln/10|0);if(lv>o)earn(20+lv*5)}snd(600,.2,'triangle',.05,400)}else snd(150,.05);spawn()}
return{n:'Tetris',c:'#b86bff',nl:1,d:'Encaja las piezas y completa líneas antes de llegar arriba.',k:'← → mover · ↑ girar · ↓ bajar · Espacio caída',help:'← → mueven, ↑ gira la pieza, ↓ la baja más rápido y Espacio la deja caer de golpe.<br>Cada 10 líneas subes de nivel y las piezas caen más rápido.',w:420,h:560,
init(){g=Array.from({length:20},()=>Array(10).fill(0));ln=0;lv=1;dc=0;hl=hr=0;nx=np();spawn()},
key(k,rp){if(rp)return;if(k==='ArrowUp'||k==='KeyW'){let c=p.c.map(([a,b])=>[-b,a]);const mx=Math.min(...c.map(q=>q[0])),my=Math.min(...c.map(q=>q[1]));c=c.map(([a,b])=>[a-mx,b-my]);for(const o of[0,-1,1,-2,2])if(!col(c,p.x+o,p.y)){p.c=c;p.x+=o;snd(500,.03);break}}else if(k==='Space'){while(mv(0,1))sc+=2;lock()}},
step(){if(K.ArrowLeft||K.KeyA){if(hl===0||(hl>12&&hl%4===0))mv(-1,0);hl++}else hl=0;
 if(K.ArrowRight||K.KeyD){if(hr===0||(hr>12&&hr%4===0))mv(1,0);hr++}else hr=0;
 const sd=K.ArrowDown||K.KeyS;if(++dc>=(sd?3:Math.max(4,46-lv*4))){dc=0;if(mv(0,1)){if(sd)sc++}else lock()}},
draw(){x.fillStyle='#0a0814';x.fillRect(0,0,420,560);x.fillStyle='#120f26';x.fillRect(0,0,280,560);x.fillStyle='#1c1838';for(let i=1;i<10;i++)x.fillRect(i*28,0,1,560);for(let j=1;j<20;j++)x.fillRect(0,j*28,280,1);
 g.forEach((r,j)=>r.forEach((v,i)=>v&&cell(i,j,v-1)));
 let d=0;while(!col(p.c,p.x,p.y+d+1))d++;x.strokeStyle=CO[p.i];p.c.forEach(([a,b])=>x.strokeRect((p.x+a)*28+3,(p.y+b+d)*28+3,22,22));
 p.c.forEach(([a,b])=>cell(p.x+a,p.y+b,p.i));
 x.fillStyle='#a6a8d6';x.font='12px monospace';x.textAlign='left';x.fillText('SIGUIENTE',298,30);nx.c.forEach(([a,b])=>cell(10.7+a*.8,1.4+b*.8,nx.i));
 x.fillText('LÍNEAS',298,200);x.fillText('NIVEL',298,280);x.fillStyle='#eaf0ff';x.font='bold 22px monospace';x.fillText(ln,298,228);x.fillText(lv,298,308)}}})();
