// Snake · juego completo (dibujo, lógica y vista previa para la tienda)
G.snake=(()=>{const N=20,T=24;let s,pv,d,q,f,gd,rk,tk,sp,ap,PA,fr;
const lvl=()=>1+(ap/5|0),at=(l,a,b)=>l.some(z=>z.x===a&&z.y===b);
const spot=()=>{let a,b;do{a=rnd(0,N)|0;b=rnd(0,N)|0}while(at(s,a,b)||at(rk,a,b)||(f&&f.x===a&&f.y===b)||(gd&&gd.x===a&&gd.y===b));return{x:a,y:b}};
const burst=(h,c)=>{for(let i=0;i<9;i++)PA.push({x:h.x*T+12,y:h.y*T+12,vx:rnd(-2.5,2.5),vy:rnd(-2.5,2.5),l:25,c})};
return{pv(c,d){const ss=d||['#2f8a18','#7be03a','#b8ff6b'];x.fillStyle='#08130a';x.fillRect(0,0,80,56);x.fillStyle='#0d2112';for(let i=0;i<4;i++)for(let j=0;j<3;j++)if((i+j)%2)x.fillRect(i*20,j*19,20,19);
 x.fillStyle='#ff4f7b';x.beginPath();x.arc(72,40,5,0,7);x.fill();x.lineCap=x.lineJoin='round';x.beginPath();x.moveTo(8,44);x.lineTo(26,44);x.lineTo(26,22);x.lineTo(46,22);x.lineTo(46,40);x.lineTo(58,40);x.strokeStyle=ss[0];x.lineWidth=15;x.stroke();
 if(ss[1]==='rb'){const g=x.createLinearGradient(0,0,80,56);['#ff4f7b','#ffd23f','#8cff4f','#3ef2ff','#b86bff'].forEach((q,i)=>g.addColorStop(i/4,q));x.strokeStyle=g}else x.strokeStyle=ss[1];x.lineWidth=11;x.stroke();
 x.fillStyle=ss[2];x.beginPath();x.arc(58,40,8,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(61,36,2.6,0,7);x.arc(61,44,2.6,0,7);x.fill();x.fillStyle='#111';x.beginPath();x.arc(62,36,1.2,0,7);x.arc(62,44,1.2,0,7);x.fill()},sw:1,n:'Snake',c:'#8cff4f',nl:1,d:'Come manzanas, esquiva las rocas y caza la fruta dorada.',k:'Flechas o WASD · desliza el dedo',help:'Dirige la serpiente con las flechas o WASD (o desliza el dedo).<br>Cada 5 manzanas subes de nivel: aparecen rocas y una fruta dorada que vale 50.',w:480,h:480,
init(){s=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];pv=s.map(z=>({...z}));d=[1,0];q=[];rk=[];f=gd=null;f=spot();tk=0;sp=8;ap=0;PA=[];fr=0},
key(k){const m={ArrowLeft:[-1,0],KeyA:[-1,0],ArrowRight:[1,0],KeyD:[1,0],ArrowUp:[0,-1],KeyW:[0,-1],ArrowDown:[0,1],KeyS:[0,1]}[k];if(!m)return;const l=q.length?q[q.length-1]:d;if((m[0]===-l[0]&&m[1]===-l[1])||(m[0]===l[0]&&m[1]===l[1])||q.length>1)return;q.push(m)},
step(){fr++;if(gd&&--gd.t<=0)gd=null;PA.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.l--});PA=PA.filter(p=>p.l>0);
 if(++tk<sp)return;tk=0;if(q.length)d=q.shift();
 const h={x:s[0].x+d[0],y:s[0].y+d[1]},tl=s[s.length-1];
 if(h.x<0||h.y<0||h.x>=N||h.y>=N||at(rk,h.x,h.y)||s.some(z=>z!==tl&&z.x===h.x&&z.y===h.y))return end();
 pv=s.map(z=>({...z}));s.unshift(h);let g=0;
 if(h.x===f.x&&h.y===f.y){g=1;ap++;inc('ap');sc+=10+(lvl()-1)*5;snd(700,.1,'square',.04,300);burst(h,'#ff4f7b');f=null;f=spot();sp=Math.max(3.5,8-ap*.18);
  if(ap%5===0){earn(10+lvl()*5);for(let i=0;i<2;i++){let r;do r=spot();while(Math.abs(r.x-h.x)+Math.abs(r.y-h.y)<5);rk.push(r)}gd=Object.assign(spot(),{t:420})}}
 else if(gd&&h.x===gd.x&&h.y===gd.y){g=1;sc+=50;snd(900,.2,'triangle',.05,500);burst(h,'#ffd23f');gd=null}
 if(!g)s.pop()},
draw(){x.fillStyle='#08130a';x.fillRect(0,0,480,480);x.fillStyle='#0d2112';for(let i=0;i<N;i++)for(let j=0;j<N;j++)if((i+j)%2)x.fillRect(i*T,j*T,T,T);
 rk.forEach(z=>{x.fillStyle='#55665b';x.beginPath();x.roundRect(z.x*T+2,z.y*T+2,T-4,T-4,5);x.fill();x.fillStyle='#8a9c90';x.fillRect(z.x*T+6,z.y*T+6,7,3)});
 const pu=1+Math.sin(fr*.15)*.12;x.fillStyle='#ff4f7b';x.beginPath();x.arc(f.x*T+12,f.y*T+13,8*pu,0,7);x.fill();x.fillStyle='#8cff4f';x.fillRect(f.x*T+11,f.y*T+2,3,5);
 if(gd&&(gd.t>90||fr%10<5)){x.fillStyle='#ffd23f';x.beginPath();x.arc(gd.x*T+12,gd.y*T+12,9,0,7);x.fill();x.fillStyle='#fff8';x.fillRect(gd.x*T+8,gd.y*T+7,4,4)}
 const t=Math.min(1,tk/sp),P=s.map((b,i)=>{const a=pv[Math.min(i,pv.length-1)];return[(a.x+(b.x-a.x)*t)*T+12,(a.y+(b.y-a.y)*t)*T+12]});
 x.lineCap=x.lineJoin='round';x.beginPath();P.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));const ss=cos('sskin')||['#2f8a18','#7be03a','#b8ff6b'];x.strokeStyle=ss[0];x.lineWidth=22;x.stroke();if(ss[1]==='rb'){const rg=x.createLinearGradient(0,0,480,480);['#ff4f7b','#ffd23f','#8cff4f','#3ef2ff','#b86bff'].forEach((c,i)=>rg.addColorStop(i/4,c));x.strokeStyle=rg}else x.strokeStyle=ss[1];x.lineWidth=16;x.stroke();
 const[hx,hy]=P[0];x.fillStyle=ss[2];x.beginPath();x.arc(hx,hy,11,0,7);x.fill();
 [[-d[1],d[0]],[d[1],-d[0]]].forEach(([a,b])=>{const ex=hx+d[0]*4+a*5,ey=hy+d[1]*4+b*5;x.fillStyle='#fff';x.beginPath();x.arc(ex,ey,3.2,0,7);x.fill();x.fillStyle='#111';x.beginPath();x.arc(ex+d[0],ey+d[1],1.6,0,7);x.fill()});
 PA.forEach(p=>{x.globalAlpha=p.l/25;x.fillStyle=p.c;x.fillRect(p.x,p.y,4,4)});x.globalAlpha=1;
 x.fillStyle='#a6d8a0';x.font='12px monospace';x.textAlign='left';x.fillText('Nivel '+lvl()+' · Manzanas '+ap,8,16)}}})();
