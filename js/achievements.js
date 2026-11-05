// Logros: estadísticas, catálogo de logros, avisos y pantalla de logros
const inc=(k,n)=>{stats[k]=(stats[k]||0)+(n||1)};
const sst=()=>{try{localStorage.setItem('arc_stats',JSON.stringify(stats))}catch(e){}},sva=()=>{try{localStorage.setItem('arc_ach',JSON.stringify(ach))}catch(e){}};
const stv=k=>stats[k]||0,lvc=g=>(stats.lv||{})[g]||0,pln=g=>(stats.pl||{})[g]||0,scr=g=>Math.max(hi[g]||0,nm===g&&state!=='menu'?sc:0);
const GRP=[['gen','General'],['galaga','Galaga'],['pacman','Pac-Man'],['donkey','Donkey Kong'],['frogger','Frogger'],['asteroids','Asteroids'],['snake','Snake'],['breakout','Breakout'],['pong','Pong'],['tetris','Tetris'],['roulette','Ruleta']];
const AC=[
['first','gen','🎮','Primer paso','Juega tu primera partida',5,()=>[KEYS.reduce((a,k)=>a+pln(k),0),1]],
['all','gen','🧭','Probador','Prueba los 10 juegos',40,()=>[KEYS.filter(k=>pln(k)>0).length,10]],
['save','gen','🪙','Ahorrador','Ten 100 fichas a la vez',10,()=>[bank,100]],
['rich','gen','💰','Hucha llena','Gana 500 fichas en total',50,()=>[stv('earned'),500]],
['shop1','gen','🛍️','De compras','Compra tu primer objeto en la tienda',10,()=>[own.length,1]],
['shop10','gen','👗','Coleccionista','Consigue 10 objetos de la tienda',50,()=>[own.length,10]],
['legend','gen','🏆','Leyenda','Desbloquea 15 logros',100,()=>[ach.length,15]],
['gal1','galaga','🚀','Despegue','Supera 1 nivel de Galaga',15,()=>[lvc('galaga'),1]],
['gal2','galaga','👾','Exterminador','Destruye 100 enemigos',30,()=>[stv('gk'),100]],
['gal3','galaga','⭐','Estrella','Consigue 5.000 puntos en Galaga',40,()=>[scr('galaga'),5000]],
['pac1','pacman','🟡','Laberinto limpio','Supera 1 nivel de Pac-Man',15,()=>[lvc('pacman'),1]],
['pac2','pacman','👻','Cazafantasmas','Come 10 fantasmas',30,()=>[stv('gh'),10]],
['pac3','pacman','🍒','Comecocos pro','Consigue 4.000 puntos en Pac-Man',40,()=>[scr('pacman'),4000]],
['dk1','donkey','🦍','Rescate','Rescata a Pauline una vez',30,()=>[lvc('donkey'),1]],
['dk2','donkey','🛢️','Saltarín','Salta 10 barriles',25,()=>[stv('jb'),10]],
['dk3','donkey','🔥','Héroe del barril','Rescata a Pauline 3 veces',70,()=>[lvc('donkey'),3]],
['fr1','frogger','🐸','A casa','Lleva 3 ranas a su nenúfar',15,()=>[stv('fh'),3]],
['fr2','frogger','🌿','Nenúfares llenos','Supera 1 nivel de Frogger',30,()=>[lvc('frogger'),1]],
['as1','asteroids','☄️','Cazarrocas','Destruye 50 asteroides',25,()=>[stv('ad'),50]],
['as2','asteroids','🛰️','Superviviente','Supera 3 oleadas',30,()=>[lvc('asteroids'),3]],
['sn1','snake','🍎','Glotona','Come 30 manzanas',20,()=>[stv('ap'),30]],
['sn2','snake','🐍','Serpiente larga','Consigue 500 puntos en Snake',30,()=>[scr('snake'),500]],
['br1','breakout','🧱','Derrumbe','Rompe 100 ladrillos',20,()=>[stv('bb'),100]],
['br2','breakout','🏗️','Pared limpia','Supera 1 nivel de Breakout',25,()=>[lvc('breakout'),1]],
['po1','pong','🎾','Primer gol','Marca 5 goles en Pong',10,()=>[stv('pg'),5]],
['po2','pong','🥇','Campeón','Marca 25 goles en Pong',40,()=>[stv('pg'),25]],
['te1','tetris','🟪','Constructor','Completa 20 líneas en Tetris',25,()=>[stv('tl'),20]],
['te2','tetris','🧩','Maestro de piezas','Llega al nivel 2 de Tetris',30,()=>[lvc('tetris'),1]],
['ru1','roulette','🎰','Primera tirada','Gira la ruleta una vez',5,()=>[stv('rs'),1]],
['ru2','roulette','🎲','Suerte','Gana 3 tiradas',20,()=>[stv('rw'),3]],
['ru3','roulette','🍀','Pleno','Acierta un número exacto',50,()=>[stv('rp'),1]],
['ru4','roulette','💎','Banca rota','Gana 100 fichas en una sola tirada',60,()=>[stv('rmax'),100]]];
function showA(){if(ash||!aq.length)return;const a=aq.shift(),t=$('atoast');ash=true;t.innerHTML='<i>'+a[2]+'</i><div><b>LOGRO DESBLOQUEADO</b><span>'+a[3]+' · +'+a[5]+' fichas</span></div>';t.hidden=false;snd(523,.1,'square',.04);setTimeout(()=>snd(784,.15,'square',.04),110);setTimeout(()=>snd(1047,.25,'square',.04),240);setTimeout(()=>{t.hidden=true;ash=false;showA()},3400)}
function chk(){let n=0;AC.forEach(a=>{if(ach.includes(a[0]))return;const[c,t]=a[6]();if(c>=t){ach.push(a[0]);bank+=a[5];aq.push(a);n++}});if(n){sv();sva();sst();showA()}}
function achUI(){const el=$('achl');el.innerHTML='';$('ac').textContent=ach.length+' / '+AC.length;$('abar').style.width=(100*ach.length/AC.length)+'%';
 GRP.forEach(([g,t])=>{const h=document.createElement('h3');h.textContent=t;el.appendChild(h);const row=document.createElement('div');row.className='arow';
  AC.filter(a=>a[1]===g).forEach(a=>{const ok=ach.includes(a[0]),[c,tg]=a[6](),d=document.createElement('div');d.className='ac'+(ok?' ok':'');
   d.innerHTML='<span class="ai">'+a[2]+'</span><div><b>'+a[3]+'</b><small>'+a[4]+'</small><div class="pb"><i style="width:'+Math.min(100,100*c/tg)+'%"></i></div><em>'+(ok?'✓ Desbloqueado · +'+a[5]+' fichas':Math.min(c,tg).toLocaleString('es-ES')+' / '+tg.toLocaleString('es-ES')+' · premio +'+a[5]+' fichas')+'</em></div>';row.appendChild(d)});el.appendChild(row)})}
