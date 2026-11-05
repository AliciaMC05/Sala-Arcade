// Galaga · juego completo (dibujo, lógica y vista previa para la tienda)
G.galaga=(()=>{
const SP={bee:["..1..1..",".111111.","11.11.11","11111111","1.1111.1","1.1..1.1","..1..1.."],bt:["1......1","11.11.11","11111111","1.1111.1","11111111",".11..11.","1..11..1"],boss:["..1111..",".111111.","11.11.11","11111111","111..111","1..11..1","11....11"],ship:["....1....","...111...","...111...","1.11111.1","111111111","111111111","11.111.11"],ship2:["....1....","...111...","1..111..1","11.111.11","111111111","1.11111.1","1..1.1..1"],ship3:["....1....","..1.1.1..","..11111..","1.11111.1","111111111","11.111.11","1...1...1"],ship4:["....1....","...111...","...111...","..11111..","1.11111.1","111.1.111","1...1...1"]};
const CL={bee:'#ffd23f',bt:'#ff4f7b',boss:'#3ef2c4',ship:'#eaf0ff'};
let p,B,EB,E,PA,ST,tk,lv,fx,fd,dv,rs,mt;
const spr=(n,cx,cy,s,c)=>{const a=SP[n],w=a[0].length,h=a.length;x.fillStyle=c||CL[n];for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(a[j][i]==='1')x.fillRect(Math.round(cx+(i-w/2)*s),Math.round(cy+(j-h/2)*s),s,s)};
const boom=(px,py,c,n)=>{for(let i=0;i<(n||14);i++){const a=rnd(0,6.28),s=rnd(1,4);PA.push({x:px,y:py,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:rnd(25,40),c})}};
const near=(a,b,r)=>Math.abs(a.x-b.x)<r&&Math.abs(a.y-b.y)<r;
function wave(){E=[];[['boss',4],['bt',8],['bt',8],['bee',8],['bee',8]].forEach(([t,n],r)=>{for(let i=0;i<n;i++)E.push({t,hx:(i-(n-1)/2)*40,hy:70+r*34,x:240,y:-30-r*20,st:0,d:i*6+r*10,hp:t==='boss'?2:1,a:0,pts:t==='boss'?150:t==='bt'?80:50})});fx=240;fd=1;dv=90;B=[];EB=[];mt=120}
return{pv(c,d){x.fillStyle='#05060f';x.fillRect(0,0,80,56);for(let i=0;i<12;i++){x.fillStyle='#8fa0d8';x.fillRect((i*37)%80,(i*23)%56,1,1)}spr(d?d[0]:'ship',22,30,3,d?d[1]:0);G.asteroids.pv(c,d)},n:'Galaga',c:'#3ef2c4',d:'Destruye la formación alienígena antes de que te invada.',k:'← → mover · Espacio disparar',help:'Mueve la nave con ← → (o A / D) y dispara con Espacio.<br>Los enemigos que se lanzan en picado valen el doble.',w:480,h:640,
init(){p={x:240,y:590,cd:0};PA=[];tk=0;lv=1;rs=0;ST=Array.from({length:70},()=>({x:rnd(0,480),y:rnd(0,640),s:rnd(.4,2.4)}));wave()},
step(){tk++;ST.forEach(s=>{s.y+=s.s;if(s.y>640){s.y=0;s.x=rnd(0,480)}});
if(rs>0)rs--;else{if(K.ArrowLeft||K.KeyA)p.x-=4.2;if(K.ArrowRight||K.KeyD)p.x+=4.2;p.x=Math.max(20,Math.min(460,p.x));if(p.cd>0)p.cd--;if((K.Space||K.ArrowUp)&&p.cd<=0&&B.length<3){B.push({x:p.x,y:p.y-18});p.cd=10;snd(880,.1,'square',.03,-500)}}
B.forEach(b=>b.y-=9);B=B.filter(b=>b.y>-10);
const sp=Math.max(0,...E.filter(e=>e.st!==2).map(e=>Math.abs(e.hx)))+20;fx+=fd*(.5+lv*.08);if(fx+sp>472)fd=-1;if(fx-sp<8)fd=1;
const br=Math.sin(tk/40)*6;
if(--dv<=0){const c=E.filter(e=>e.st===1);for(let i=0;i<Math.min(1+(lv/3|0),3)&&c.length;i++){const e=c[rnd(0,c.length)|0];e.st=2;e.sx=e.x;e.tx=p.x;e.q=0}dv=Math.max(35,110-lv*8)}
E.forEach(e=>{const tx=fx+e.hx*(1+br/120),ty=e.hy;
 if(e.st===0){if(e.d>0){e.d--;return}const dx=tx-e.x,dy=ty-e.y,ds=Math.max(1,Math.hypot(dx,dy));e.a+=.06;e.x+=dx/ds*4+Math.sin(e.a*3)*2;e.y+=dy/ds*4;if(ds<6)e.st=1}
 else if(e.st===1){e.x=tx;e.y=ty;if(Math.random()<.0007*lv)EB.push({x:e.x,y:e.y+10,vx:0})}
 else{e.q+=.018+lv*.001;e.y+=2.4+lv*.12;e.x=e.sx+(e.tx-e.sx)*Math.min(1,e.q*1.6)+Math.sin(e.q*14)*50*(1-Math.min(1,e.q));if(Math.random()<.012+lv*.002)EB.push({x:e.x,y:e.y+10,vx:(p.x-e.x)/120});if(e.y>660){e.y=-20;e.st=0;e.d=0;e.a=0}}});
EB.forEach(b=>{b.y+=3+lv*.15;b.x+=b.vx});EB=EB.filter(b=>b.y<650);
B.forEach(b=>E.forEach(e=>{if(!b.dead&&e.hp>0&&near(b,e,16)){b.dead=1;if(--e.hp<=0){inc('gk');sc+=e.pts*(e.st===2?2:1);boom(e.x,e.y,CL[e.t]);snd(160,.25,'sawtooth',.05,-120)}else snd(300,.1)}}));
B=B.filter(b=>!b.dead);E=E.filter(e=>e.hp>0);
if(rs<=0&&(EB.some(b=>near(b,p,13))||E.some(e=>near(e,p,18)))){boom(p.x,p.y,'#fff',30);snd(120,.6,'sawtooth',.08,-90);EB=[];if(--lives<=0)return end();rs=100;p.x=240}
if(!E.length){earn(15+lv*5);lv++;sc+=500;wave();snd(520,.4,'triangle',.05,400)}
PA.forEach(q=>{q.x+=q.vx;q.y+=q.vy;q.l--});PA=PA.filter(q=>q.l>0);if(mt>0)mt--},
draw(){x.fillStyle='#05060f';x.fillRect(0,0,480,640);ST.forEach(s=>{x.fillStyle=s.s>1.6?'#fff':'#6b7bb8';x.fillRect(s.x,s.y,2,2)});
E.forEach(e=>{if(e.st===0&&e.d>0)return;spr(e.t,e.x,e.y,3,e.t==='boss'&&e.hp===1?'#9b6bff':0)});
x.fillStyle='#ffd23f';B.forEach(b=>x.fillRect(b.x-1.5,b.y-8,3,14));x.fillStyle='#ff4f7b';EB.forEach(b=>x.fillRect(b.x-2,b.y-5,4,10));
if(rs<=0||tk%10<5){const sk=cos('ship');spr(sk?sk[0]:'ship',p.x,p.y,3,sk?sk[1]:0)}
PA.forEach(q=>{x.globalAlpha=q.l/40;x.fillStyle=q.c;x.fillRect(q.x,q.y,3,3)});x.globalAlpha=1;
if(mt>0){x.fillStyle='#ffd23f';x.font='bold 28px monospace';x.textAlign='center';x.fillText('NIVEL '+lv,240,300)}}}})();
