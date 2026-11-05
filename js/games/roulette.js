// Ruleta · juego completo (dibujo, lógica y vista previa para la tienda)
G.roulette=(()=>{
const W=480,H=640,TAU=6.2832,SG=TAU/37,CX=240,CY=135,SEQ=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26],RED=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],CH=[1,5,10,25,50],CC=['#e8e8f0','#ff4f7b','#3ef2ff','#8cff4f','#ffd23f'],NX=54,NY=312,CW=31;
const isR=n=>RED.includes(n),Z=[];
Z.push({k:'n0',x:23,y:NY,w:31,h:93,t:'0',c:'#118a3c'});
for(let c=0;c<12;c++)for(let r=0;r<3;r++){const n=c*3+3-r;Z.push({k:'n'+n,x:NX+c*CW,y:NY+r*CW,w:CW,h:CW,t:''+n,c:isR(n)?'#c42d2d':'#15151c'})}
for(let r=0;r<3;r++)Z.push({k:'c'+(3-r),x:NX+12*CW,y:NY+r*CW,w:CW,h:CW,t:'2:1',c:'#1c2a3a'});
[['d1','1ª 12'],['d2','2ª 12'],['d3','3ª 12']].forEach(([k,t],i)=>Z.push({k,x:NX+i*4*CW,y:NY+93,w:4*CW,h:30,t,c:'#1c2a3a'}));
[['low','1-18'],['even','PAR'],['red','ROJO'],['black','NEGRO'],['odd','IMPAR'],['high','19-36']].forEach(([k,t],i)=>Z.push({k,x:NX+i*62,y:NY+123,w:62,h:30,t,c:k==='red'?'#c42d2d':k==='black'?'#15151c':'#1c2a3a'}));
const BTN=[['GIRAR',23,548,160,'#ffd23f'],['BORRAR',193,548,130,'#3a3f66'],['REPETIR',333,548,124,'#3a3f66']];
let bets,last,hist,ch,st,wa,tk,res,msg,t0,D,wa0,wA,th0,thE;
const tot=o=>Object.values(o).reduce((a,b)=>a+b,0);
function spin(){if(st!=='bet')return;if(!tot(bets)){msg='Coloca alguna apuesta en la mesa';return}
 bank-=tot(bets);sv();last={...bets};bets={};res=Math.random()*37|0;st='spin';t0=0;D=330;wa0=wa;wA=TAU*(3+rnd(0,2));th0=rnd(0,TAU);
 const thF=wa0+wA+SEQ.indexOf(res)*SG-TAU/4;thE=th0-((((th0-thF)%TAU)+TAU)%TAU+TAU*5);msg='¡No va más!';snd(300,.3,'triangle',.04,200)}
function settle(){const n=res;let pay=0;
 for(const[k,v]of Object.entries(last)){let m=0;
  if(k[0]==='n')m=+k.slice(1)===n?36:0;
  else if(n>0){if(k==='red')m=isR(n)?2:0;else if(k==='black')m=isR(n)?0:2;else if(k==='even')m=n%2?0:2;else if(k==='odd')m=n%2?2:0;else if(k==='low')m=n<=18?2:0;else if(k==='high')m=n>18?2:0;else if(k[0]==='d')m=Math.ceil(n/12)===+k[1]?3:0;else if(k[0]==='c')m=(n-1)%3+1===+k[1]?3:0}
  pay+=v*m}
 bank+=pay;sv();{const t0=tot(last);inc('rs');if(pay>t0){inc('rw');stats.rmax=Math.max(stats.rmax||0,pay-t0)}if(last['n'+n])inc('rp')}hist.unshift(n);hist.length=Math.min(hist.length,10);st='bet';const t=tot(last);
 msg=pay>t?'Sale el '+n+': ¡ganas '+(pay-t)+' fichas!':pay>0?'Sale el '+n+': recuperas '+pay:'Sale el '+n+': pierdes '+t;
 if(pay>0)snd(880,.4,'triangle',.06,500);else snd(180,.3,'sawtooth',.05,-80);
 if(!bank)msg+=' · ¡Sin fichas!'}
return{n:'Ruleta',c:'#ff4f7b',nl:1,nb:1,np:1,d:'Gasta las fichas que ganas en los demás juegos y prueba suerte.',k:'Toca la mesa para apostar · GIRAR',help:'Las fichas se ganan superando niveles en los demás juegos (verás un aviso cada vez que sumes).<br>Elige una ficha, toca la mesa para apostar y pulsa GIRAR. Son fichas de juego: no tienen valor real.',w:W,h:H,
init(){bets={};last={};hist=[];ch=1;st='bet';wa=0;res=null;tk=0;msg=bank?'Elige una ficha y toca la mesa para apostar':'Sin fichas: supera niveles en otros juegos'},
tap(px,py){if(st!=='bet')return;const z=Z.find(z=>px>=z.x&&px<z.x+z.w&&py>=z.y&&py<z.y+z.h);
 if(z){if(tot(bets)+CH[ch]>bank){msg=bank?'No te llegan las fichas para esa apuesta':'Sin fichas: supera niveles en otros juegos';snd(150,.1)}else{bets[z.k]=(bets[z.k]||0)+CH[ch];snd(500,.05)}return}
 CH.forEach((v,i)=>{if(Math.hypot(px-(70+i*70),py-500)<26)ch=i});
 BTN.forEach(([t,x0,y0,w],i)=>{if(px>=x0&&px<x0+w&&py>=y0&&py<y0+44){if(i===0)spin();else if(i===1){bets={};msg='Apuestas borradas'}else if(tot(last)&&tot(last)<=bank)bets={...last};else msg=tot(last)?'No te llegan las fichas':'No hay jugada anterior'}})},
step(){tk++;if(st==='spin'){t0++;if(t0>=D){wa=wa0+wA;settle()}else{const u=t0/D;wa=wa0+wA*(1-(1-u)*(1-u));if(t0%14===0&&u<.85)snd(1200,.015,'square',.015)}}else wa+=.003},
draw(){x.fillStyle='#0a0612';x.fillRect(0,0,W,H);
 const fg=x.createLinearGradient(0,250,0,H);fg.addColorStop(0,'#0f4a2a');fg.addColorStop(1,'#0a3320');x.fillStyle=fg;x.beginPath();x.roundRect(8,248,W-16,H-256,14);x.fill();
 let g=x.createRadialGradient(CX,CY,60,CX,CY,112);g.addColorStop(0,'#3a1f0c');g.addColorStop(.85,'#7a4a1e');g.addColorStop(1,'#d9b25a');x.fillStyle=g;x.beginPath();x.arc(CX,CY,112,0,TAU);x.fill();x.fillStyle='#1a0f06';x.beginPath();x.arc(CX,CY,92,0,TAU);x.fill();
 for(let i=0;i<37;i++){const n=SEQ[i],a0=wa+i*SG-TAU/4-SG/2;x.fillStyle=n===0?'#118a3c':isR(n)?'#c42d2d':'#15151c';x.beginPath();x.arc(CX,CY,88,a0,a0+SG);x.arc(CX,CY,62,a0+SG,a0,true);x.closePath();x.fill();x.strokeStyle='#d9b25a';x.lineWidth=1;x.stroke();
  x.save();x.translate(CX,CY);x.rotate(a0+SG/2+TAU/4);x.fillStyle='#fff';x.font='bold 8px monospace';x.textAlign='center';x.fillText(n,0,-70);x.restore()}
 g=x.createRadialGradient(CX-6,CY-6,3,CX,CY,60);g.addColorStop(0,'#fff3c0');g.addColorStop(1,'#b8892f');x.fillStyle=g;x.beginPath();x.arc(CX,CY,58,0,TAU);x.fill();
 x.strokeStyle='#7a5a1e';x.lineWidth=3;x.beginPath();for(let i=0;i<4;i++){const a=wa+i*TAU/4;x.moveTo(CX+Math.cos(a)*8,CY+Math.sin(a)*8);x.lineTo(CX+Math.cos(a)*50,CY+Math.sin(a)*50)}x.stroke();x.fillStyle='#ffd23f';x.beginPath();x.arc(CX,CY,9,0,TAU);x.fill();
 let bx,by;if(st==='spin'){const u=Math.min(1,t0/D),th=th0+(thE-th0)*(1-Math.pow(1-u,3)),rr=u<.7?96:76+20*(1-(u-.7)/.3)+Math.sin(u*60)*(1-u)*4;bx=CX+Math.cos(th)*rr;by=CY+Math.sin(th)*rr}else if(res!==null){const th=wa+SEQ.indexOf(res)*SG-TAU/4;bx=CX+Math.cos(th)*76;by=CY+Math.sin(th)*76}
 if(bx!==undefined){x.fillStyle='#fff';x.shadowColor='#000';x.shadowBlur=4;x.beginPath();x.arc(bx,by,5,0,TAU);x.fill();x.shadowBlur=0}
 hist.forEach((n,i)=>{const hx=240+(i-(hist.length-1)/2)*26;x.fillStyle=n===0?'#118a3c':isR(n)?'#c42d2d':'#15151c';x.beginPath();x.arc(hx,266,10,0,TAU);x.fill();x.strokeStyle='#d9b25a';x.lineWidth=1;x.stroke();x.fillStyle='#fff';x.font='bold 10px monospace';x.textAlign='center';x.fillText(n,hx,270)});
 x.fillStyle='#ffd23f';x.font='bold 11px monospace';x.textAlign='center';x.fillText(msg,240,296);
 Z.forEach(z=>{x.fillStyle=z.c;x.fillRect(z.x,z.y,z.w,z.h);x.strokeStyle='#d7c27a';x.lineWidth=1;x.strokeRect(z.x+.5,z.y+.5,z.w-1,z.h-1);x.fillStyle='#fff';x.font=(z.w>60?'bold 11px':'bold 10px')+' monospace';x.textAlign='center';x.fillText(z.t,z.x+z.w/2,z.y+z.h/2+4)});
 if(res!==null&&st==='bet'){const z=Z.find(z=>z.k==='n'+res);x.strokeStyle='#ffd23f';x.lineWidth=3;x.strokeRect(z.x+1.5,z.y+1.5,z.w-3,z.h-3)}
 Object.entries(st==='bet'?bets:last).forEach(([k,v])=>{const z=Z.find(z=>z.k===k),px=z.x+z.w/2,py=z.y+z.h/2;x.fillStyle='#ffd23f';x.beginPath();x.arc(px,py,10,0,TAU);x.fill();x.strokeStyle='#7a5a1e';x.lineWidth=2;x.stroke();x.fillStyle='#1a1200';x.font='bold 9px monospace';x.fillText(v,px,py+3)});
 CH.forEach((v,i)=>{const cx=70+i*70,sel=i===ch;x.fillStyle=CC[i];x.beginPath();x.arc(cx,500,sel?24:20,0,TAU);x.fill();x.strokeStyle=sel?'#fff':'#0008';x.lineWidth=sel?3:2;x.stroke();x.setLineDash([4,4]);x.strokeStyle='#0006';x.beginPath();x.arc(cx,500,sel?18:14,0,TAU);x.stroke();x.setLineDash([]);x.fillStyle='#111';x.font='bold 13px monospace';x.fillText(v,cx,505)});
 x.fillStyle='#fff';x.font='bold 11px monospace';x.fillText('Apuesta total: '+tot(st==='bet'?bets:last)+' · Fichas: '+bank,240,538);
 BTN.forEach(([t,x0,y0,w,c],i)=>{x.globalAlpha=st==='bet'?1:.45;x.fillStyle=c;x.beginPath();x.roundRect(x0,y0,w,44,10);x.fill();x.fillStyle=i?'#fff':'#1a1200';x.font='bold 14px monospace';x.fillText(t,x0+w/2,y0+27)});x.globalAlpha=1;
 x.fillStyle='#8fe0b0';x.font='10px monospace';x.fillText('Gana fichas superando niveles en los otros juegos',240,614)}}})();
