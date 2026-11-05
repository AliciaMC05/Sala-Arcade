// Núcleo: variables globales, datos guardados en el navegador y sonido
let x;const $=i=>document.getElementById(i),cv=$('cv'),G={},K={},KEYS=['galaga','pacman','donkey','frogger','asteroids','snake','breakout','pong','tetris','roulette'],rnd=(a,b)=>Math.random()*(b-a)+a;x=cv.getContext('2d');
let cur,nm,state='menu',sc=0,lives=0,hi={},acc=0,lt=0,ac,bank=0;
try{hi=JSON.parse(localStorage.getItem('arc_hi')||'{}')}catch(e){}
let b0=null;try{b0=localStorage.getItem('arc_bank')}catch(e){}bank=b0===null?20:(+b0||0);
let own=[],eq={};try{own=JSON.parse(localStorage.getItem('arc_own')||'[]');eq=JSON.parse(localStorage.getItem('arc_eq')||'{}')}catch(e){}
let stats={},ach=[],fc=0,aq=[],ash=false;try{stats=JSON.parse(localStorage.getItem('arc_stats')||'{}');ach=JSON.parse(localStorage.getItem('arc_ach')||'[]')}catch(e){}
function snd(f,d,ty,v,sl){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime;o.type=ty||'square';o.frequency.setValueAtTime(f,t);if(sl)o.frequency.exponentialRampToValueAtTime(Math.max(30,f+sl),t+d);g.gain.setValueAtTime(v||.04,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(t+d)}catch(e){}}
