// Donkey Kong · juego completo (dibujo, lógica y vista previa para la tienda)
G.donkey=(()=>{
const GD=[[0,574,480,558,-1],[20,486,480,470,-1],[0,382,460,398,1],[20,310,480,294,-1],[0,206,440,222,1],[170,126,290,126,0]],LD=[[400,0],[120,0],[70,1],[260,1],[420,2],[190,2],[70,3],[330,3],[230,4]];
const THM=[['#c42d49','#ff8fa3','#6e1124','#1a0b38'],['#2d6fc4','#8fc4ff','#12326e','#071a38'],['#2dae62','#8fffb8','#105a2d','#06281a'],['#a42dc4','#e58fff','#5a1470','#240838']];
const PAL={R:'#ff3b3b',B:'#2f5bff',S:'#ffc9a0',K:'#7a3a12',Y:'#ffd23f'},
TOP=["....RRRRR...","...RRRRRRRR.","...KKKSSKS..","..KSKSSSKSSS","..KSKKSSSKSS","..KKSSSSKKKK","....SSSSSSS.","...RRBRRR...","..RRRBRRBRRR",".RRRRBBBBRRR",".SSRBYBBYBSS",".SSSBBBBBBSS","..SBBBBBBBS."],
LA=["...BBB..BBB.","..KKK....KKK",".KKKK...KKKK"],LB=["..BBB...BBB.",".KKK.....KKK","KKKK.....KKK"];
const spr=(rows,cx,cy,z,fl)=>rows.forEach((r,j)=>{for(let i=0;i<12;i++){const c=r[i];if(c!=='.'){x.fillStyle=PAL[c];x.fillRect(Math.round(cx+((fl?11-i:i)-6)*z),Math.round(cy+j*z),z,z)}}});
const gy=(g,px)=>{const a=GD[g];return a[1]+(a[3]-a[1])*(px-a[0])/(a[2]-a[0])},inr=(g,px)=>px>=GD[g][0]&&px<=GD[g][2];
const land=(px,py,vy,rd,top)=>{for(let g=0;g<top;g++)if(inr(g,px)){const y=gy(g,px);if(vy>0&&py+rd>=y&&py+rd-vy<=y+3)return g}return -1};
const DKI=new Image();DKI.src='assets/donkey-kong.png';
let p,BR,FB,PA,PU,ST,LDa,tk,lv,fz,nt,q2,th,fn,fl,wk,bnr,SK,shk;
const lad=(px,a)=>LDa.find(l=>l[1]===a&&Math.abs(l[0]-px)<9),bonus=()=>Math.max(0,Math.round(3000-tk*(1+.15*(lv-1))));
const hat=(k,hx,hy)=>{if(k==='crown'){x.fillStyle='#ffd23f';x.beginPath();x.moveTo(hx-8,hy+1);x.lineTo(hx-8,hy-9);x.lineTo(hx-4,hy-4);x.lineTo(hx,hy-10);x.lineTo(hx+4,hy-4);x.lineTo(hx+8,hy-9);x.lineTo(hx+8,hy+1);x.fill();x.fillStyle='#ff3b3b';x.fillRect(hx-1,hy-4,2,2)}
 else if(k==='top'){x.fillStyle='#16161c';x.fillRect(hx-6,hy-15,12,15);x.fillRect(hx-9,hy-2,18,3);x.fillStyle='#d6405f';x.fillRect(hx-6,hy-7,12,3)}
 else{x.fillStyle='#6b3bff';x.beginPath();x.moveTo(hx-9,hy+1);x.lineTo(hx+1,hy-20);x.lineTo(hx+9,hy+1);x.fill();x.fillStyle='#4a22c4';x.fillRect(hx-11,hy-1,22,3);x.fillStyle='#ffd23f';x.fillRect(hx-2,hy-9,2,2);x.fillRect(hx+3,hy-4,2,2)}};
const lvset=()=>{LDa=LD.filter((_,i)=>!(lv>=3&&(i===1||i===5))&&!(lv>=5&&(i===3||i===7)))};
const burst=(px,py,c,n)=>{for(let i=0;i<n;i++){const a=rnd(0,6.28),v=rnd(1,4);PA.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,l:rnd(20,40),c})}};
const thr=()=>{BR.push({x:128,y:gy(4,128)-8,g:4,d:1,vy:0,a:0,j:0,v:rnd(.9,1.15),sk:null,l:null,h:16});th=24;snd(180,.15,'sawtooth',.04,-60)};
function reset(nl){p={x:100,y:gy(0,100),g:0,st:'g',vy:0,f:1,mv:0,l:null};BR=[];FB=[];nt=70;q2=0;fz=nl?110:60;bnr=nl;tk=0;fn=0}
function die(){shk=10;burst(p.x,p.y-14,'#ff4f7b',20);snd(130,.7,'sawtooth',.08,-100);if(--lives<=0)return end();reset(0)}
return{pv(c,d){const sk=c==='mskin'?d:cos('mskin'),ht=c==='mhat'?d:cos('mhat');x.fillStyle='#1a0b38';x.fillRect(0,0,80,56);x.fillStyle='#c42d49';x.fillRect(0,52,80,4);x.fillStyle='#ff8fa3';x.fillRect(0,52,80,1);PAL.R=sk?sk[0]:'#ff3b3b';PAL.B=sk?sk[1]:'#2f5bff';spr([...TOP,...LA],40,20,2,false);if(ht)hat(ht,43,20)},n:'Donkey Kong',c:'#ff9a4f',d:'Sube, salta los barriles y rescata a Pauline. Cada nivel es más duro.',k:'← → mover · ↑ ↓ escaleras · Espacio saltar',help:'← → te mueven, ↑ ↓ suben y bajan escaleras y Espacio salta.<br>Salta los barriles (+100). Con cada nivel: más velocidad, barriles por las escaleras, barriles dobles, bolas de fuego y menos escaleras.',w:480,h:600,
init(){lv=1;th=0;fl=0;wk=0;PA=[];PU=[];ST=Array.from({length:50},()=>({x:rnd(0,480),y:rnd(0,420),s:rnd(.5,1.8),f:rnd(0,6)}));lvset();reset(1)},
key(k,rp){if(rp)return;if(k==='Space'&&p.st==='g'&&fz<=0){p.st='a';p.vy=-6.2;snd(520,.12,'square',.04,300)}},
step(){if(shk>0)shk--;if(th>0)th--;if(fl>0)fl--;PA.forEach(q=>{q.x+=q.vx;q.y+=q.vy;q.vy+=.08;q.l--});PA=PA.filter(q=>q.l>0);PU.forEach(u=>{u.y-=.6;u.t--});PU=PU.filter(u=>u.t>0);
 if(fz>0){fz--;return}tk++;
 const L=K.ArrowLeft||K.KeyA,R=K.ArrowRight||K.KeyD,U=K.ArrowUp||K.KeyW,D=K.ArrowDown||K.KeyS,mx=(R?1:0)-(L?1:0);p.mv=0;
 if(p.st==='g'){if(mx){p.f=mx;p.mv=1;wk++}const q=GD[p.g];p.x=Math.max(p.g===0?54:q[0]+4,Math.min(q[2]-4,p.x+mx*2));p.y=gy(p.g,p.x);
  if(U){const l=lad(p.x,p.g);if(l){p.st='l';p.l=l;p.x=l[0]}}else if(D&&p.g>0){const l=lad(p.x,p.g-1);if(l){p.st='l';p.l=l;p.x=l[0];p.y=gy(l[1]+1,l[0])+2}}}
 else if(p.st==='l'){const l=p.l,t=gy(l[1]+1,l[0]),b=gy(l[1],l[0]);if(U)p.y-=2;if(D)p.y+=2;if(p.y<=t){p.st='g';p.g=l[1]+1;p.y=t}else if(p.y>=b){p.st='g';p.g=l[1];p.y=b}}
 else{p.vy+=.34;p.y+=p.vy;p.x=Math.max(6,Math.min(474,p.x+mx*1.6));const g=land(p.x,p.y,p.vy,0,6);if(g>=0){p.st='g';p.g=g;p.y=gy(g,p.x);p.vy=0}else if(p.y>660)return die()}
 if(--nt<=0){thr();q2=lv>=3&&Math.random()<Math.min(.6,.15*lv)?20:0;nt=Math.max(38,150-lv*16)+(rnd(0,40)|0)}
 if(q2>0&&--q2===0)thr();
 if(lv>=2&&FB.length<Math.min(4,lv-1)&&++fn>=Math.max(240,640-lv*70)){fn=0;FB.push({x:34,y:gy(0,34)-10,g:0,d:1,st:'g',sp:Math.min(1.5,.55+lv*.08),l:null,up:0});snd(250,.2,'sawtooth',.04,200)}
 FB.forEach(f=>{if(f.st==='g'){f.x+=f.d*f.sp;const q=GD[f.g];if(f.x<q[0]+6||f.x>q[2]-6){f.d*=-1;f.x=Math.max(q[0]+6,Math.min(q[2]-6,f.x))}f.y=gy(f.g,f.x)-10;
   if(Math.random()<.012)f.d=Math.random()<.65?(p.x>f.x?1:-1):-f.d;
   const up=p.y<f.y-30,dn=p.y>f.y+30,l=LDa.find(l=>Math.abs(l[0]-f.x)<3&&((up&&l[1]===f.g)||(dn&&l[1]===f.g-1)));
   if(l&&Math.random()<.05){f.st='l';f.l=l;f.x=l[0];f.up=l[1]===f.g}}
  else{f.y+=f.up?-1.2:1.2;const t=gy(f.l[1]+1,f.l[0])-10,b=gy(f.l[1],f.l[0])-10;if(f.up&&f.y<=t){f.st='g';f.g=f.l[1]+1;f.y=t}else if(!f.up&&f.y>=b){f.st='g';f.g=f.l[1];f.y=b}}});
 BR.forEach(b=>{if(b.h>0){b.h--;return}b.a+=b.d*.15;
  if(b.g>=0){b.x+=b.d*Math.min(3.2,1.3+lv*.12)*b.v;
   if(!inr(b.g,b.x)){b.g=-1;b.vy=1}else{b.y=gy(b.g,b.x)-8;
    if(lv>1&&b.g>0){const l=LDa.find(l=>l[1]===b.g-1&&Math.abs(l[0]-b.x)<2&&b.sk!==l);if(l){b.sk=l;if(Math.random()<Math.min(.5,.12*(lv-1))){b.g=-2;b.x=l[0];b.l=l}}}}}
  else if(b.g===-2){b.y+=2.2;const l=b.l;if(b.y+8>=gy(l[1],l[0])){b.g=l[1];b.d=GD[b.g][4];b.y=gy(b.g,b.x)-8}}
  else{b.vy+=.35;b.y+=b.vy;const g=land(b.x,b.y,b.vy,8,5);if(g>=0){b.g=g;b.d=GD[g][4];b.y=gy(g,b.x)-8;b.vy=0}}});
 if(BR.some(b=>b.g===0&&b.x<42)){fl=14;burst(30,gy(0,30)-36,'#ff9a4f',6)}
 BR=BR.filter(b=>b.y<640&&!(b.g===0&&b.x<42));
 if(BR.some(b=>!b.h&&Math.hypot(b.x-p.x,b.y-(p.y-14))<14)||FB.some(f=>Math.hypot(f.x-p.x,f.y-(p.y-14))<13))return die();
 if(p.st==='a')BR.forEach(b=>{if(!b.j&&!b.h&&Math.abs(b.x-p.x)<14&&p.y<b.y&&b.y-p.y<48){b.j=1;inc('jb');sc+=100;PU.push({x:b.x,y:b.y-14,t:40,s:'+100'});snd(900,.08,'triangle',.04)}});
 if(p.st==='g'&&p.g===5){const b=bonus();earn(30+lv*15);sc+=500+b;PU.push({x:230,y:90,t:70,s:'+'+(500+b)});burst(230,110,'#ffd23f',24);lv++;lvset();reset(1);snd(520,.4,'triangle',.05,400)}},
draw(){const T=THM[(lv-1)%4];x.save();if(shk>0)x.translate(rnd(-shk,shk)*.6,rnd(-shk,shk)*.6);
 let g=x.createLinearGradient(0,0,0,600);g.addColorStop(0,T[3]);g.addColorStop(1,'#04020a');x.fillStyle=g;x.fillRect(-10,-10,500,620);
 ST.forEach(t=>{x.globalAlpha=.35+.5*Math.sin(tk*.05+t.f);x.fillStyle='#fff';x.fillRect(t.x,t.y,t.s,t.s)});x.globalAlpha=1;
 x.fillStyle='#fff3cf';x.beginPath();x.arc(420,66,20,0,7);x.fill();x.fillStyle=T[3];x.beginPath();x.arc(428,60,18,0,7);x.fill();
 if(!SK){SK=[];for(let bx=0;bx<480;){const w=rnd(32,64)|0,h=rnd(120,330)|0,wn=[];for(let wy=16;wy<h-8;wy+=16)for(let wx=7;wx<w-9;wx+=13)if(Math.random()<.4)wn.push([wx,wy,rnd(0,6)]);SK.push({x:bx,w,h,wn});bx+=w+(rnd(0,5)|0)}}
 SK.forEach(b=>{x.fillStyle='#0b0620';x.fillRect(b.x,600-b.h,b.w,b.h);x.fillStyle='#150c33';x.fillRect(b.x,600-b.h,b.w,3);x.globalAlpha=.7;b.wn.forEach(([wx,wy,q])=>{x.fillStyle=Math.sin(tk*.02+q)>-.6?'#ffd98a':'#3a2d4a';x.fillRect(b.x+wx,600-b.h+wy,5,7)});x.globalAlpha=1});
 GD.forEach((a,gi)=>{x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.moveTo(a[0],a[1]+12);x.lineTo(a[2],a[3]+12);x.lineTo(a[2],a[3]+26);x.lineTo(a[0],a[1]+26);x.closePath();x.fill();
  const bg=x.createLinearGradient(0,Math.min(a[1],a[3]),0,Math.max(a[1],a[3])+12);bg.addColorStop(0,T[0]);bg.addColorStop(1,T[2]);x.fillStyle=bg;x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(a[2],a[3]);x.lineTo(a[2],a[3]+12);x.lineTo(a[0],a[1]+12);x.closePath();x.fill();
  x.strokeStyle=T[1];x.globalAlpha=.45;x.lineWidth=2;x.beginPath();let u=0;for(let px=a[0];px<=a[2];px+=8){const yy=gy(gi,px)+(u?2:10);px===a[0]?x.moveTo(px,yy):x.lineTo(px,yy);u^=1}x.stroke();
  x.fillStyle='#fff';x.globalAlpha=.55;for(let px=a[0]+12;px<a[2];px+=24)x.fillRect(px,gy(gi,px)+5,2,2);x.globalAlpha=1;
  x.strokeStyle=T[1];x.lineWidth=3;x.beginPath();x.moveTo(a[0],a[1]+1);x.lineTo(a[2],a[3]+1);x.stroke()});
 x.shadowColor='#3ef2ff';x.shadowBlur=8;LDa.forEach(([lx,a])=>{const t=gy(a+1,lx),b=gy(a,lx);x.strokeStyle='#9be7ff';x.lineWidth=3;x.beginPath();x.moveTo(lx-6,t);x.lineTo(lx-6,b);x.moveTo(lx+6,t);x.lineTo(lx+6,b);x.stroke();x.strokeStyle='#3ef2ff';x.lineWidth=2;x.beginPath();for(let y=t+6;y<b;y+=8){x.moveTo(lx-6,y);x.lineTo(lx+6,y)}x.stroke()});x.shadowBlur=0;
 const od=gy(0,30),h=14+(fl>0?12:0)+Math.sin(tk*.5)*3,rg=x.createRadialGradient(30,od-42,2,30,od-42,64);rg.addColorStop(0,'rgba(255,150,40,.5)');rg.addColorStop(1,'rgba(255,150,40,0)');x.fillStyle=rg;x.fillRect(-40,od-110,140,130);
 const dg=x.createLinearGradient(14,0,46,0);dg.addColorStop(0,'#1d3fb8');dg.addColorStop(.4,'#6b97ff');dg.addColorStop(1,'#1d3fb8');x.fillStyle=dg;x.fillRect(14,od-34,32,34);x.fillStyle='#0f2470';x.fillRect(14,od-34,32,3);x.fillRect(14,od-4,32,3);x.fillRect(14,od-19,32,2);x.fillStyle='#fff';x.font='bold 10px monospace';x.textAlign='center';x.fillText('OIL',30,od-23);
 x.fillStyle='#ff6a1f';x.beginPath();x.moveTo(20,od-34);x.quadraticCurveTo(24,od-34-h*1.3,30,od-34-h*1.6);x.quadraticCurveTo(36,od-34-h*1.3,40,od-34);x.fill();x.fillStyle='#ffd23f';x.beginPath();x.moveTo(25,od-34);x.quadraticCurveTo(29,od-34-h*.8,30,od-34-h);x.quadraticCurveTo(33,od-34-h*.8,35,od-34);x.fill();
 const brl=(px,py,a)=>{x.save();x.translate(px,py);x.rotate(a);const q=x.createRadialGradient(-2,-2,1,0,0,9);q.addColorStop(0,'#f2a55a');q.addColorStop(1,'#8c4512');x.fillStyle=q;x.beginPath();x.arc(0,0,8.5,0,7);x.fill();x.strokeStyle='#4a2308';x.lineWidth=2;x.beginPath();x.arc(0,0,5.5,0,7);x.moveTo(-8.5,0);x.lineTo(8.5,0);x.moveTo(0,-8.5);x.lineTo(0,8.5);x.stroke();x.fillStyle='#ffe0b0';x.fillRect(-6,-6,3,2);x.restore()};
 const dy=gy(4,70),ar=th>8,rl=th>0&&th<=8,bob=Math.round(Math.sin(tk*.08)),flp=th<=0&&tk%100>=50;
 const bar=(bx,by)=>{const q=x.createLinearGradient(bx-11,0,bx+11,0);q.addColorStop(0,'#5a2e0e');q.addColorStop(.4,'#c8762c');q.addColorStop(1,'#5a2e0e');x.fillStyle=q;x.beginPath();x.roundRect(bx-11,by-26,22,26,5);x.fill();x.fillStyle='#2e1606';x.fillRect(bx-11,by-20,22,3);x.fillRect(bx-11,by-8,22,3)};
 bar(13,dy+1);bar(13,dy-25);
 x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(78,dy+2,46,6,0,0,7);x.fill();
 if(DKI.complete&&DKI.naturalWidth){const w=DKI.naturalWidth*2,h=DKI.naturalHeight*2;x.imageSmoothingEnabled=false;x.save();x.translate(78+(rl?4:0),dy+3+bob-(ar?2:0));if(flp)x.scale(-1,1);x.drawImage(DKI,-w/2,-h,w,h);x.restore();if(ar)brl(78+w*.34,dy+3-h-9,tk*.2)}
 const pw=Math.sin(tk*.15)*3;x.fillStyle='#6b3a14';x.beginPath();x.arc(230,103,7,0,7);x.fill();x.fillRect(223,102,5,15);
 x.fillStyle='#ff6fc0';x.beginPath();x.moveTo(230,108);x.lineTo(220,126);x.lineTo(240,126);x.closePath();x.fill();x.fillStyle='#fff';x.fillRect(227,108,6,2);
 x.fillStyle='#ffc9a0';x.beginPath();x.arc(230,104,5,0,7);x.fill();x.fillStyle='#ff6fc0';x.fillRect(225,96,4,4);x.fillRect(231,96,4,4);
 x.strokeStyle='#ffc9a0';x.lineWidth=3;x.beginPath();x.moveTo(235,112);x.lineTo(243+pw,102-pw);x.stroke();
 if(tk%40<28){x.fillStyle='#fff';x.beginPath();x.roundRect(250,80,62,20,6);x.fill();x.beginPath();x.moveTo(252,96);x.lineTo(246,104);x.lineTo(260,99);x.fill();x.fillStyle='#c42d7e';x.font='bold 10px monospace';x.textAlign='center';x.fillText('¡AYUDA!',281,94)}
 BR.forEach(b=>{if(b.h>0)return;if(b.g>=0){x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(b.x,gy(b.g,b.x)+1,8,2.5,0,0,7);x.fill()}brl(b.x,b.y,b.a)});
 FB.forEach(f=>{const q=x.createRadialGradient(f.x,f.y,2,f.x,f.y,24);q.addColorStop(0,'rgba(255,170,50,.65)');q.addColorStop(1,'rgba(255,100,20,0)');x.fillStyle=q;x.fillRect(f.x-26,f.y-26,52,52);x.fillStyle='#ff5a14';x.beginPath();x.arc(f.x,f.y,9,0,7);x.fill();
  for(let i=-1;i<=1;i++){x.beginPath();x.moveTo(f.x+i*6-3,f.y-5);x.lineTo(f.x+i*6,f.y-15-Math.sin(tk*.4+f.x+i*2)*4-(i?0:4));x.lineTo(f.x+i*6+3,f.y-5);x.fill()}
  x.fillStyle='#ffd23f';x.beginPath();x.arc(f.x,f.y+2,5.5,0,7);x.fill();x.fillStyle='#fff';x.fillRect(f.x-5,f.y-3,4,4);x.fillRect(f.x+1,f.y-3,4,4);x.fillStyle='#111';x.fillRect(f.x-3,f.y-2,2,2);x.fillRect(f.x+3,f.y-2,2,2)});
 if(fz<=0||fz%6<3){const px=Math.round(p.x),py=Math.round(p.y),cl=p.st==='l',fr=p.st==='a'||(cl&&((p.y/6|0)&1))||(p.mv&&((wk>>3)&1));if(p.st==='g'){x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(px,py+1,10,3,0,0,7);x.fill()}const mf=cl?((p.y/10|0)&1):p.f<0,sk=cos('mskin');PAL.R=sk?sk[0]:'#ff3b3b';PAL.B=sk?sk[1]:'#2f5bff';spr([...TOP,...(fr?LB:LA)],px,py-32,2,mf);const ht=cos('mhat');if(ht)hat(ht,px+(mf?-3:3),py-32)}
 PA.forEach(q=>{x.globalAlpha=q.l/40;x.fillStyle=q.c;x.fillRect(q.x,q.y,3,3)});x.globalAlpha=1;
 x.font='bold 12px monospace';x.textAlign='center';x.lineWidth=3;x.strokeStyle='#000';PU.forEach(u=>{x.strokeText(u.s,u.x,u.y);x.fillStyle='#fff';x.fillText(u.s,u.x,u.y)});
 const vg=x.createRadialGradient(240,300,200,240,300,420);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=vg;x.fillRect(-10,-10,500,620);
 x.fillStyle='rgba(8,4,20,.88)';x.fillRect(6,4,168,32);x.fillRect(366,4,108,32);x.strokeStyle=T[1];x.lineWidth=2;x.strokeRect(7,5,166,30);x.strokeRect(367,5,106,30);
 x.font='8px "Press Start 2P",monospace';x.fillStyle=T[1];x.textAlign='left';x.fillText('BONUS',14,18);x.fillText('NIVEL',374,18);x.font='14px "Press Start 2P",monospace';x.fillStyle=bonus()<500&&tk%20<10?'#ff4f7b':'#ffd23f';x.fillText(bonus(),14,32);x.fillStyle='#ffd23f';x.fillText(lv,374,32);
 if(bnr&&fz>0){x.textAlign='center';x.font='bold 40px monospace';x.lineWidth=6;x.strokeStyle='#000';x.strokeText('NIVEL '+lv,240,330);x.fillStyle='#ffd23f';x.fillText('NIVEL '+lv,240,330);x.font='bold 14px monospace';x.lineWidth=4;const m=lv<2?'¡Rescata a Pauline!':(['','¡Bolas de fuego y barriles por las escaleras!','¡Barriles dobles y menos escaleras!'][Math.min(lv-1,3)]||'¡Cada vez más rápido!');x.strokeText(m,240,358);x.fillStyle='#fff';x.fillText(m,240,358)}
 x.restore()}}})();
