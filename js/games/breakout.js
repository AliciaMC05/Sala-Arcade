// Breakout · juego completo (dibujo, lógica y vista previa para la tienda)
G.breakout=(()=>{const W=480,H=560,C=['#ff4f7b','#ff9a4f','#ffd23f','#8cff4f','#3ef2c4','#6b8bff'];let pd,bl,br,lv;
const mk=()=>{br=[];for(let r=0;r<6;r++)for(let c=0;c<8;c++)br.push({x:10+c*58,y:60+r*26,r})},rst=()=>{bl={x:pd.x,y:520,vx:0,vy:0,s:1}};
return{n:'Breakout',c:'#ff4f7b',d:'Rebota la bola y rompe todos los ladrillos.',k:'← → o ratón · Espacio o clic para lanzar',help:'Mueve la pala con ← → o con el ratón.<br>Pulsa Espacio o haz clic para lanzar la bola.',w:W,h:H,
init(){pd={x:240,w:84};lv=1;mk();rst()},
mouse(e){const b=cv.getBoundingClientRect(),s=Math.min(b.width/W,b.height/H);pd.x=(e.clientX-b.left-(b.width-W*s)/2)/s},
click(){if(bl.s){bl.s=0;bl.vx=rnd(-2,2);bl.vy=-(4.6+lv*.4)}},
step(){if(K.ArrowLeft||K.KeyA)pd.x-=7;if(K.ArrowRight||K.KeyD)pd.x+=7;pd.x=Math.max(pd.w/2,Math.min(W-pd.w/2,pd.x));
 if(bl.s){bl.x=pd.x;if(K.Space||K.ArrowUp)this.click();return}
 bl.x+=bl.vx;bl.y+=bl.vy;if(bl.x<7||bl.x>W-7){bl.vx*=-1;bl.x=Math.max(7,Math.min(W-7,bl.x))}if(bl.y<7)bl.vy=Math.abs(bl.vy);
 if(bl.vy>0&&bl.y+7>=530&&bl.y<545&&Math.abs(bl.x-pd.x)<pd.w/2+7){const o=(bl.x-pd.x)/(pd.w/2),s=Math.hypot(bl.vx,bl.vy);bl.vx=o*s*.75;bl.vy=-Math.sqrt(s*s-bl.vx*bl.vx);bl.y=523;snd(300,.08)}
 for(const b of br)if(bl.x+7>b.x&&bl.x-7<b.x+54&&bl.y+7>b.y&&bl.y-7<b.y+20){br.splice(br.indexOf(b),1);inc('bb');if(bl.x>b.x&&bl.x<b.x+54)bl.vy*=-1;else bl.vx*=-1;sc+=(6-b.r)*10;snd(500+b.r*80,.06);break}
 if(!br.length){earn(15+lv*5);lv++;sc+=100;pd.w=Math.max(50,84-lv*6);mk();rst()}
 if(bl.y>H+10){snd(150,.4,'sawtooth',.06,-100);if(--lives<=0)return end();rst()}},
draw(){x.fillStyle='#0b0612';x.fillRect(0,0,W,H);br.forEach(b=>{x.fillStyle=C[b.r];x.fillRect(b.x,b.y,54,20)});x.fillStyle='#eaf0ff';x.beginPath();x.roundRect(pd.x-pd.w/2,530,pd.w,12,5);x.fill();x.fillStyle='#ffd23f';x.beginPath();x.arc(bl.x,bl.y,7,0,7);x.fill()}}})();
