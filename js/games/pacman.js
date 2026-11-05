// Pac-Man · juego completo (dibujo, lógica y vista previa para la tienda)
G.pacman=(()=>{
const M=["###################","#........#........#","#o##.###.#.###.##o#","#.................#","#.##.#.#####.#.##.#","#....#...#...#....#","####.### # ###.####","   #.#       #.#   ","####.# ##### #.####","    .  #   #  .    ","####.# ##### #.####","   #.#       #.#   ","####.# ##### #.####","#........#........#","#.##.###.#.###.##.#","#o.#.....P.....#.o#","##.#.#.#####.#.#.##","#....#...#...#....#","#.######.#.######.#","#.................#","###################"];
const T=24,CW=19,RH=21,D=[[1,0],[-1,0],[0,1],[0,-1]],wc=c=>(c+CW)%CW;
let mp,a,gh,dots,tk,lv,pw,cb,fz;
const ok=(c,r)=>r>=0&&r<RH&&mp[r][wc(c)]!=='#';
function build(){mp=M.map(s=>[...s]);dots=0;mp.forEach(r=>r.forEach(ch=>{if(ch==='.'||ch==='o')dots++}));mp[15][9]=' '}
function place(){a={c:9,r:15,dx:0,dy:0,p:0,nx:0,ny:0};gh=[[7,'#ff3b3b',0],[8,'#ffa8d8',90],[10,'#3ef2ff',180],[11,'#ffb347',270]].map(([c,col,w])=>({c,r:7,dx:0,dy:0,p:0,col,w}));pw=0;fz=60}
function arr(){const ch=mp[a.r][a.c];if(ch==='.'){mp[a.r][a.c]=' ';sc+=10;dots--;snd(300+tk%2*60,.04,'triangle',.03)}else if(ch==='o'){mp[a.r][a.c]=' ';sc+=50;dots--;pw=Math.max(150,420-lv*40);cb=0;snd(120,.3,'sine',.06,300)}
 if((a.nx||a.ny)&&ok(a.c+a.nx,a.r+a.ny)){a.dx=a.nx;a.dy=a.ny}else if(!ok(a.c+a.dx,a.r+a.dy)){a.dx=a.dy=0}}
function pick(g){let o=D.filter(d=>ok(g.c+d[0],g.r+d[1])&&!(d[0]===-g.dx&&d[1]===-g.dy));if(!o.length)o=D.filter(d=>ok(g.c+d[0],g.r+d[1]));let d;
 if(pw>0||Math.random()<.2)d=o[rnd(0,o.length)|0];else{const i=gh.indexOf(g);let tx=a.c,ty=a.r;if(i===1){tx+=a.dx*4;ty+=a.dy*4}if(i===3&&Math.hypot(g.c-a.c,g.r-a.r)<6){tx=1;ty=19}
 d=o.reduce((m,q)=>Math.hypot(g.c+q[0]-tx,g.r+q[1]-ty)<Math.hypot(g.c+m[0]-tx,g.r+m[1]-ty)?q:m)}
 g.dx=d[0];g.dy=d[1]}
return{pv(c,d){const th=(c==='pmap'?d:cos('pmap'))||['#1a2bd8','#000','#ffd9a8',0],sk=(c==='pskin'?d:cos('pskin'))||'#ffd23f',pa=c==='pacc'?d:cos('pacc'),px=22,py=28;
 x.fillStyle=th[1];x.fillRect(0,0,80,56);x.shadowColor=th[3]||'#000';x.shadowBlur=th[3]?5:0;x.fillStyle=th[0];x.beginPath();x.roundRect(1,1,78,7,3);x.roundRect(1,48,78,7,3);x.roundRect(30,12,10,10,3);x.roundRect(48,34,10,10,3);x.fill();x.shadowBlur=0;
 x.fillStyle=th[2];[38,46,54].forEach(a=>x.fillRect(a,27,3,3));
 x.fillStyle=sk;x.beginPath();x.moveTo(px,py);x.arc(px,py,10,.35,5.93);x.closePath();x.fill();
 if(pa==='shades'){x.fillStyle='#111';x.fillRect(px,py-7,8,4);x.fillRect(px-1,py-6,10,1.5);x.fillStyle='#8fe0ff';x.fillRect(px+1,py-7,3,1)}
 else if(pa){x.save();x.translate(px,py);x.fillStyle='#ff4f7b';x.beginPath();x.moveTo(-2,-9);x.lineTo(-8,-13);x.lineTo(-8,-5);x.closePath();x.moveTo(-2,-9);x.lineTo(4,-13);x.lineTo(4,-5);x.closePath();x.fill();x.fillStyle='#c42d56';x.beginPath();x.arc(-2,-9,2,0,7);x.fill();x.restore()}
 x.fillStyle='#ff3b3b';x.beginPath();x.arc(68,27,9,Math.PI,0);x.lineTo(77,37);x.lineTo(72,33);x.lineTo(68,37);x.lineTo(64,33);x.lineTo(59,37);x.closePath();x.fill();x.fillStyle='#fff';x.beginPath();x.arc(65,26,2.5,0,7);x.arc(72,26,2.5,0,7);x.fill()},sw:1,n:'Pac-Man',c:'#ffd23f',d:'Come todos los puntos y huye de los fantasmas.',k:'Flechas o WASD',help:'Muévete con las flechas o WASD.<br>Las bolas grandes te dejan comerte a los fantasmas durante unos segundos.',w:CW*T,h:RH*T,
init(){build();place();tk=0;lv=1;cb=0},
step(){if(fz>0){fz--;return}tk++;if(pw>0)pw--;
 if(K.ArrowLeft||K.KeyA){a.nx=-1;a.ny=0}else if(K.ArrowRight||K.KeyD){a.nx=1;a.ny=0}else if(K.ArrowUp||K.KeyW){a.nx=0;a.ny=-1}else if(K.ArrowDown||K.KeyS){a.nx=0;a.ny=1}
 if((a.dx||a.dy)&&a.nx===-a.dx&&a.ny===-a.dy){a.c=wc(a.c+a.dx);a.r+=a.dy;a.p=1-a.p;a.dx*=-1;a.dy*=-1}
 if(a.dx||a.dy){a.p+=.125;if(a.p>=1){a.p-=1;a.c=wc(a.c+a.dx);a.r+=a.dy;arr()}}else arr();
 const sp=pw>0?.07:Math.min(.12,.092+lv*.006);let hit=false;
 gh.forEach(g=>{if(g.w>0){g.w--;return}
  if(g.dx||g.dy){g.p+=sp;if(g.p>=1){g.p-=1;g.c=wc(g.c+g.dx);g.r+=g.dy;pick(g)}}else pick(g);
  const dx=g.c+g.dx*g.p-(a.c+a.dx*a.p),dy=g.r+g.dy*g.p-(a.r+a.dy*a.p);
  if(Math.hypot(dx,dy)<.7){if(pw>0){inc('gh');sc+=200<<cb;cb++;snd(600,.2,'square',.05,400);g.c=9;g.r=7;g.dx=g.dy=0;g.p=0;g.w=120}else hit=true}});
 if(hit){snd(150,.6,'sawtooth',.08,-120);if(--lives<=0)return end();place();return}
 if(dots<=0){earn(20+lv*8);lv++;sc+=500;build();place();snd(520,.4,'triangle',.05,400)}},
draw(){const th=cos('pmap')||['#1a2bd8','#000','#ffd9a8',0];x.fillStyle=th[1];x.fillRect(0,0,CW*T,RH*T);x.shadowColor=th[3]||'#000';x.shadowBlur=th[3]?6:0;
 for(let r=0;r<RH;r++)for(let c=0;c<CW;c++){const ch=mp[r][c];if(ch==='#'){x.fillStyle=th[0];x.beginPath();x.roundRect(c*T+1,r*T+1,T-2,T-2,6);x.fill()}else if(ch==='.'){x.fillStyle=th[2];x.fillRect(c*T+10,r*T+10,4,4)}else if(ch==='o'&&tk%30<20){x.fillStyle=th[2];x.beginPath();x.arc(c*T+12,r*T+12,6,0,7);x.fill()}}
 x.shadowBlur=0;const px=(a.c+a.dx*a.p+.5)*T,py=(a.r+a.dy*a.p+.5)*T,mv=a.dx||a.dy,f=mv?(a.lf=Math.atan2(a.dy,a.dx)):(a.lf||0),m=mv?.05+.25*Math.abs(Math.sin(tk*.3)):.25;
 x.fillStyle=cos('pskin')||'#ffd23f';x.beginPath();x.moveTo(px,py);x.arc(px,py,10,f+m,f+6.283-m);x.closePath();x.fill();
 const pa=cos('pacc');if(pa){x.save();x.translate(px,py);x.rotate(f);if(Math.cos(f)<0)x.scale(1,-1);
 if(pa==='shades'){x.fillStyle='#111';x.fillRect(0,-7,8,4);x.fillRect(-1,-6,10,1.5);x.fillStyle='#8fe0ff';x.fillRect(1,-7,3,1)}
 else{x.fillStyle='#ff4f7b';x.beginPath();x.moveTo(-2,-9);x.lineTo(-8,-13);x.lineTo(-8,-5);x.closePath();x.moveTo(-2,-9);x.lineTo(4,-13);x.lineTo(4,-5);x.closePath();x.fill();x.fillStyle='#c42d56';x.beginPath();x.arc(-2,-9,2,0,7);x.fill()}
 x.restore()}
 gh.forEach(g=>{const gx=(g.c+g.dx*g.p+.5)*T,gy=(g.r+g.dy*g.p+.5)*T;x.fillStyle=pw>0?(pw<120&&tk%20<10?'#fff':'#2233ff'):g.col;x.beginPath();x.arc(gx,gy-1,10,Math.PI,0);x.lineTo(gx+10,gy+10);x.lineTo(gx+5,gy+6);x.lineTo(gx,gy+10);x.lineTo(gx-5,gy+6);x.lineTo(gx-10,gy+10);x.closePath();x.fill();
  x.fillStyle='#fff';[-4,4].forEach(o=>{x.beginPath();x.arc(gx+o,gy-3,3,0,7);x.fill()});x.fillStyle='#112';[-4,4].forEach(o=>{x.beginPath();x.arc(gx+o+g.dx*1.5,gy-3+g.dy*1.5,1.5,0,7);x.fill()})});
 if(fz>0){x.fillStyle='#ffd23f';x.font='bold 18px monospace';x.textAlign='center';x.fillText('¡PREPARADO!',228,9*T+17)}}}})();
