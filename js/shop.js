// Tienda de skins: catálogo, vistas previas y pantalla de la tienda
const CAT=[['mskin','Donkey Kong · Skins de Mario'],['mhat','Donkey Kong · Gorros de Mario'],['ship','Galaga y Asteroids · Naves'],['pskin','Pac-Man · Skins'],['pacc','Pac-Man · Accesorios'],['pmap','Pac-Man · Escenarios'],['sskin','Snake · Skins'],['fskin','Frogger · Skins de rana']];
const SH=[
['mskin','m_luigi','Luigi',50,['#2fbf2f','#2f5bff'],['#2fbf2f','#2f5bff']],['mskin','m_fire','Mario de fuego',70,['#f4f4f4','#e03030'],['#f4f4f4','#e03030']],['mskin','m_ninja','Mario sombra',90,['#7a3bff','#222233'],['#7a3bff','#222233']],['mskin','m_gold','Mario dorado',120,['#ffd23f','#b8860b'],['#ffd23f','#b8860b']],
['mhat','h_top','🎩 Chistera',80,'top',['#16161c']],['mhat','h_crown','👑 Corona',100,'crown',['#ffd23f']],['mhat','h_wiz','🧙 Gorro de mago',110,'wiz',['#6b3bff']],
['ship','s_falcon','Halcón',80,['ship2','#3ef2ff','#c9fbff','#1a6f86'],['#3ef2ff']],['ship','s_phoenix','Fénix',120,['ship3','#ff7a3b','#ffc08a','#8a2a0a'],['#ff7a3b']],['ship','s_star','Estrella dorada',160,['ship4','#ffd23f','#fff0a0','#8a6a0a'],['#ffd23f']],
['pskin','p_pink','Comecocos rosa',50,'#ff8ad8',['#ff8ad8']],['pskin','p_blue','Comecocos hielo',60,'#6bd6ff',['#6bd6ff']],['pskin','p_green','Comecocos zombi',60,'#9be36b',['#9be36b']],
['pacc','a_bow','🎀 Lazo',60,'bow',['#ff4f7b']],['pacc','a_shades','😎 Gafas de sol',70,'shades',['#111']],
['pmap','m_forest','Bosque',90,['#2f8f3a','#0a1a0c','#ffe9a0',0],['#2f8f3a','#0a1a0c']],['pmap','m_ice','Hielo',100,['#7fd3ff','#041526','#ffffff',0],['#7fd3ff','#041526']],['pmap','m_neon','Neón',100,['#ff3bd8','#05010f','#3ef2ff','#ff3bd8'],['#ff3bd8','#05010f']],['pmap','m_lava','Lava',110,['#d6402a','#1a0606','#ffd23f','#ff6a1f'],['#d6402a','#1a0606']],
['sskin','k_blue','Serpiente azul',50,['#1a4f9e','#3ea0ff','#a8d8ff'],['#3ea0ff']],['sskin','k_gold','Serpiente dorada',60,['#8a6a0a','#ffd23f','#fff0a0'],['#ffd23f']],['sskin','k_rb','Serpiente arcoíris',140,['#222222','rb','#ffffff'],['#ff4f7b','#ffd23f','#8cff4f','#3ef2ff']],
['fskin','f_blue','Rana azul',50,['#a8e6ff','#2f8fd6','#2a6fb0','#143a66'],['#2f8fd6']],['fskin','f_red','Rana venenosa',80,['#ffb0a0','#d63a2a','#b02a1a','#5a1008'],['#d63a2a']],['fskin','f_gold','Rana dorada',100,['#fff0a0','#e0a800','#c88f00','#6a4a00'],['#e0a800']]];
const svk=()=>{try{localStorage.setItem('arc_own',JSON.stringify(own));localStorage.setItem('arc_eq',JSON.stringify(eq))}catch(e){}};
const cos=c=>{const it=SH.find(i=>i[1]===eq[c]);return it?it[4]:null};
const PVG={mskin:'donkey',mhat:'donkey',ship:'galaga',pskin:'pacman',pacc:'pacman',pmap:'pacman',sskin:'snake',fskin:'frogger'};
function pvDraw(c2,c,d){const g=c2.getContext('2d'),o=x;x=g;g.setTransform(2,0,0,2,0,0);try{G[PVG[c]].pv(c,d)}catch(e){}x=o}
function shopUI(){$('sb').textContent=bank;const el=$('shopl');el.innerHTML='';
 CAT.forEach(([c,t])=>{const h=document.createElement('h3');h.textContent=t;el.appendChild(h);const row=document.createElement('div');row.className='srow';
  [[c,null,'Normal',0,null,['#8a8fb0']],...SH.filter(i=>i[0]===c)].forEach(([,id,n,pr,dt])=>{
   const has=!id||own.includes(id),on=(eq[c]||null)===id,d=document.createElement('div');d.className='sc'+(on?' on':'');
   const pc=document.createElement('canvas');pc.width=160;pc.height=112;pvDraw(pc,c,dt);d.appendChild(pc);d.insertAdjacentHTML('beforeend','<b>'+n+'</b>');
   const b=document.createElement('button');b.type='button';
   if(on){b.textContent='Equipado';b.disabled=true}
   else if(has){b.textContent='Equipar';b.onclick=()=>{if(id)eq[c]=id;else delete eq[c];svk();shopUI()}}
   else{b.textContent='Comprar · '+pr+' fichas';b.disabled=bank<pr;b.onclick=()=>{if(bank>=pr){bank-=pr;own.push(id);eq[c]=id;sv();svk();snd(700,.2,'triangle',.05,400);shopUI()}}}
   d.appendChild(b);row.appendChild(d)});el.appendChild(row)})}
