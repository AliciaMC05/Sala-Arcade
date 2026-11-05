// Economía: fichas ganadas al superar niveles
const sv=()=>{try{localStorage.setItem('arc_bank',bank)}catch(e){}};
let tt;function earn(n){bank+=n;sv();inc('earned',n);(stats.lv=stats.lv||{})[nm]=(stats.lv[nm]||0)+1;const t=$('toast');t.textContent='+'+n+' fichas por superar el nivel';t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,2400);snd(880,.12,'triangle',.05,500)}
