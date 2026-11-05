// Asteroids · juego completo (dibujo, lógica y vista previa para la tienda)
G.asteroids=(()=>{const W=560,H=560;let sh,A,Bu,PA,lv,tk,rs,cd,SQ;
const wrap=o=>{o.x=(o.x+W)%W;o.y=(o.y+H)%H};
const boom=(px,py,n)=>{PA.push({x:px,y:py,vx:0,vy:0,l:20,m:20,ring:1,R:n*2+20});for(let i=0;i<n;i++){const a=rnd(0,6.28),v=rnd(.5,3.5),l=rnd(20,40);PA.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,c:['#ffd23f','#ff9a4f','#fff','#ff6a1f'][i%4]})}};
const mkA=(px,py,sz)=>{const a=rnd(0,6.28),v=rnd(.6,1.5)+lv*.12;return{x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v,sz,r:sz*14,rot:rnd(0,6.28),vr:rnd(-.03,.03),pts:Array.from({length:10},()=>rnd(.72,1.15))}};
const wave=()=>{A=[];for(let i=0;i<3+lv;i++){let px,py;do{px=rnd(0,W);py=rnd(0,H)}while(Math.hypot(px-W/2,py-H/2)<150);A.push(mkA(px,py,3))}};
return{pv(c,d){x.save();x.translate(58,30);x.scale(1.1,1.1);const sg=x.createLinearGradient(-12,0,12,0),d0=d?d[3]:'#1f7f8f',l0=d?d[2]:'#9ff7ff';sg.addColorStop(0,d0);sg.addColorStop(.5,l0);sg.addColorStop(1,d0);x.fillStyle=sg;x.strokeStyle='#d6fcff';x.lineWidth=1.2;x.lineJoin='round';x.beginPath();x.moveTo(0,-17);x.lineTo(5,-2);x.lineTo(13,12);x.lineTo(5,8);x.lineTo(0,10);x.lineTo(-5,8);x.lineTo(-13,12);x.lineTo(-5,-2);x.closePath();x.fill();x.stroke();x.fillStyle='#0b1f3a';x.beginPath();x.ellipse(0,-3,2.8,5,0,0,7);x.fill();x.restore()},n:'Asteroids',c:'#9be7ff',d:'Pilota tu nave y pulveriza las rocas espaciales.',k:'← → girar · ↑ propulsar · Espacio disparar',help:'← → giran la nave, ↑ la impulsa y Espacio dispara.<br>Las rocas grandes se parten en trozos más pequeños. ¡La pantalla da la vuelta por los bordes!',w:W,h:H,
init(){sh={x:W/2,y:H/2,vx:0,vy:0,a:-Math.PI/2};Bu=[];PA=[];lv=1;tk=0;rs=0;cd=0;wave()},
step(){tk++;if(rs>0)rs--;
 if(K.ArrowLeft||K.KeyA)sh.a-=.075;if(K.ArrowRight||K.KeyD)sh.a+=.075;
 if(K.ArrowUp||K.KeyW){sh.vx+=Math.cos(sh.a)*.12;sh.vy+=Math.sin(sh.a)*.12;PA.push({x:sh.x-Math.cos(sh.a)*10,y:sh.y-Math.sin(sh.a)*10,vx:-Math.cos(sh.a)*2+rnd(-.4,.4)+sh.vx*.5,vy:-Math.sin(sh.a)*2+rnd(-.4,.4)+sh.vy*.5,l:14,m:14,c:'#ffb347'})}
 const v=Math.hypot(sh.vx,sh.vy);if(v>7){sh.vx*=7/v;sh.vy*=7/v}sh.vx*=.992;sh.vy*=.992;sh.x+=sh.vx;sh.y+=sh.vy;wrap(sh);
 if(cd>0)cd--;if(K.Space&&cd<=0&&Bu.length<5){Bu.push({x:sh.x+Math.cos(sh.a)*14,y:sh.y+Math.sin(sh.a)*14,vx:Math.cos(sh.a)*8+sh.vx*.4,vy:Math.sin(sh.a)*8+sh.vy*.4,l:55});cd=10;snd(700,.08,'square',.03,-400)}
 Bu.forEach(b=>{b.x+=b.vx;b.y+=b.vy;wrap(b);b.l--});A.forEach(a=>{a.x+=a.vx;a.y+=a.vy;a.rot+=a.vr;wrap(a)});
 const nw=[];Bu.forEach(b=>{if(b.l<=0)return;const a=A.find(a=>!a.dead&&Math.hypot(a.x-b.x,a.y-b.y)<a.r);if(a){b.l=0;a.dead=1;inc('ad');sc+=[0,100,50,20][a.sz];boom(a.x,a.y,12);snd(120,.25,'sawtooth',.05,-80);if(a.sz>1)nw.push(mkA(a.x,a.y,a.sz-1),mkA(a.x,a.y,a.sz-1))}});
 A=A.filter(a=>!a.dead).concat(nw);Bu=Bu.filter(b=>b.l>0);
 if(rs<=0&&A.some(a=>Math.hypot(a.x-sh.x,a.y-sh.y)<a.r*.85+7)){boom(sh.x,sh.y,25);snd(110,.7,'sawtooth',.08,-90);if(--lives<=0)return end();sh.x=W/2;sh.y=H/2;sh.vx=sh.vy=0;rs=120}
 PA.forEach(q=>{q.x+=q.vx;q.y+=q.vy;q.l--});PA=PA.filter(q=>q.l>0);
 if(!A.length){earn(15+lv*5);lv++;sc+=200;wave()}},
draw(){if(!SQ)SQ=Array.from({length:100},()=>({x:rnd(0,W),y:rnd(0,H),z:rnd(.2,1)}));
 let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#05061a');g.addColorStop(1,'#0a0420');x.fillStyle=g;x.fillRect(0,0,W,H);
 [[140,160,200,'rgba(90,60,200,.22)'],[430,380,230,'rgba(30,120,200,.18)'],[300,70,150,'rgba(200,60,140,.12)']].forEach(([a,b,r,c])=>{const n=x.createRadialGradient(a,b,0,a,b,r);n.addColorStop(0,c);n.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=n;x.fillRect(0,0,W,H)});
 SQ.forEach(t=>{const px=((t.x-sh.x*t.z*.2)%W+W)%W,py=((t.y-sh.y*t.z*.2)%H+H)%H;x.globalAlpha=.3+.7*t.z*(.6+.4*Math.sin(tk*.05+t.x));x.fillStyle='#fff';x.fillRect(px,py,t.z*2,t.z*2)});x.globalAlpha=1;
 A.forEach(a=>{const rg=x.createRadialGradient(a.x-a.r*.35,a.y-a.r*.35,a.r*.1,a.x,a.y,a.r*1.1);rg.addColorStop(0,['','#c9c2b6','#b8a998','#a99886'][a.sz]);rg.addColorStop(1,'#2c2723');
  x.beginPath();a.pts.forEach((m,i)=>{const t=a.rot+i/a.pts.length*6.283,px=a.x+Math.cos(t)*a.r*m,py=a.y+Math.sin(t)*a.r*m;i?x.lineTo(px,py):x.moveTo(px,py)});x.closePath();x.fillStyle=rg;x.fill();x.strokeStyle='rgba(235,225,205,.8)';x.lineWidth=1.5;x.stroke();
  for(let i=0;i<3;i++){const t=a.rot+i*2.1+a.pts[i],cx=a.x+Math.cos(t)*a.r*.38,cy=a.y+Math.sin(t)*a.r*.38,cr=a.r*.17*a.pts[i+3];x.fillStyle='rgba(0,0,0,.28)';x.beginPath();x.arc(cx,cy,cr,0,7);x.fill();x.strokeStyle='rgba(255,255,255,.18)';x.lineWidth=1;x.beginPath();x.arc(cx-.5,cy-.5,cr,.6,3.2);x.stroke()}});
 const th=K.ArrowUp||K.KeyW;x.save();x.translate(sh.x,sh.y);x.rotate(sh.a+Math.PI/2);
 if(th){const L=14+rnd(0,9),fg=x.createRadialGradient(0,12,1,0,12,24);fg.addColorStop(0,'rgba(255,190,90,.6)');fg.addColorStop(1,'rgba(255,120,30,0)');x.fillStyle=fg;x.fillRect(-26,-12,52,60);x.fillStyle='#ff9a4f';x.beginPath();x.moveTo(-5,8);x.lineTo(0,8+L);x.lineTo(5,8);x.fill();x.fillStyle='#fff3c0';x.beginPath();x.moveTo(-2.5,8);x.lineTo(0,8+L*.55);x.lineTo(2.5,8);x.fill()}
 const sg=x.createLinearGradient(-12,0,12,0);const sk=cos('ship'),d0=sk?sk[3]:'#1f7f8f',l0=sk?sk[2]:'#9ff7ff';sg.addColorStop(0,d0);sg.addColorStop(.5,l0);sg.addColorStop(1,d0);x.fillStyle=sg;x.strokeStyle='#d6fcff';x.lineWidth=1.5;x.lineJoin='round';x.beginPath();x.moveTo(0,-17);x.lineTo(5,-2);x.lineTo(13,12);x.lineTo(5,8);x.lineTo(0,10);x.lineTo(-5,8);x.lineTo(-13,12);x.lineTo(-5,-2);x.closePath();x.fill();x.stroke();
 x.fillStyle='#ff4f7b';x.fillRect(-11,8,4,3);x.fillRect(7,8,4,3);x.fillStyle='#0b1f3a';x.beginPath();x.ellipse(0,-3,2.8,5,0,0,7);x.fill();x.fillStyle='rgba(255,255,255,.7)';x.fillRect(-1.5,-6,1.5,3);
 if(rs>0){x.fillStyle='rgba(120,220,255,.08)';x.strokeStyle='rgba(140,230,255,'+(.4+.3*Math.sin(tk*.3))+')';x.lineWidth=2;x.beginPath();x.arc(0,0,22,0,7);x.fill();x.stroke()}x.restore();
 x.lineCap='round';Bu.forEach(b=>{x.shadowColor='#ffb347';x.shadowBlur=10;x.strokeStyle='#fff3b0';x.lineWidth=3;x.beginPath();x.moveTo(b.x-b.vx*.9,b.y-b.vy*.9);x.lineTo(b.x,b.y);x.stroke()});x.shadowBlur=0;
 PA.forEach(q=>{const k=q.l/(q.m||40);if(q.ring){x.strokeStyle='rgba(255,220,150,'+k*.8+')';x.lineWidth=2;x.beginPath();x.arc(q.x,q.y,(1-k)*q.R,0,7);x.stroke()}else{x.globalAlpha=k;x.fillStyle=q.c||'#ffd9a0';x.fillRect(q.x-1.5,q.y-1.5,3,3)}});x.globalAlpha=1;
 x.fillStyle='#8fb0ff';x.font='12px monospace';x.textAlign='center';x.fillText('OLEADA '+lv,W/2,20)}}})();
