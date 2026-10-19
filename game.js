'use strict';
(()=>{
const W=180,H=320,$=id=>document.getElementById(id),cv=$('cv'),ctx=cv.getContext('2d'),G=$('game');
const K=Math.min(3,Math.max(2,Math.round(window.devicePixelRatio||2)));cv.width=W*K;cv.height=H*K;ctx.setTransform(K,0,0,K,0,0);

const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),rnd=(a,b)=>a+Math.random()*(b-a);
const ART=window.ART(ctx);
const PINK=['#ff6fae','#ffd1e8','#b48cff','#fff','#ffe066'];

/* ===== estado ===== */
const S={scene:'menu',lv:1,lives:3,score:0,base:0,t:0,mood:'happy',moodT:0,shake:0};
let L={},parts=[],floats=[],flash=0,snd=true,AC=null;
const LV={};
const INTRO=[
 ['Nivel 1','El ataque del TikTok','Toca los diseños de uñas BONITOS (5 en total). No toques los feos ni dejes escapar los buenos.'],
 ['Nivel 2','Operación salvar las uñas','Mantén el dedo dentro de la zona verde mientras se mueve. Si te sales, sube el RIESGO. Llena la barra de manicura.'],
 ['Nivel 3','La foto perfecta','Mueve el marco con el dedo y mete las uñas en el rectángulo dorado. Con la precisión llena, pulsa CAPTURAR. ¡Espanta al TikTok!']];
const LOSE=['¡El TikTok ganó esta ronda!','¡Las uñas casi quedan abstractas!'];

/* ===== sonido (opcional) ===== */
function beep(f,d=.1,t='square',v=.05,f2){if(!snd)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();
 const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(f2)o.frequency.linearRampToValueAtTime(f2,n+d);
 g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.0001,n+d);o.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+d)}catch(e){}}
const winSnd=()=>[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,.15,'square',.05),i*110));

/* ===== efectos ===== */
function burst(x,y,n,cols,sp=70){for(let i=0;i<n;i++){const a=rnd(0,6.283),s=rnd(.3,1)*sp;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-25,l:rnd(.5,1),c:cols[i%cols.length],z:rnd(1.5,3.5)})}}
const say=(s,x,y,c)=>floats.push({s,x,y,l:1,c:c||'#fff'});
function hurt(msg,x,y){S.lives--;S.mood='sad';S.moodT=1;S.shake=.25;beep(150,.25,'sawtooth',.07,70);say(msg,x,y,'#ff9ab8');burst(x,y,10,['#ff3b7f','#333']);
 if(S.lives<=0){L.done=1;S.scene='lose';$('lm').textContent=LOSE[S.lv-1];show('lose')}}
function finish(){L.done=1;L.timer=1.7;S.mood='happy';S.moodT=3;winSnd()}

/* ===== pantallas HTML ===== */
function show(id){document.querySelectorAll('.screen').forEach(e=>e.classList.toggle('on',e.id===id));$('cap').style.display='none'}
function intro(n){S.lv=n;S.scene='intro';S.base=S.score;const d=INTRO[n-1];$('iN').textContent=d[0].toUpperCase();$('iT').textContent=d[1];$('iD').textContent=d[2];$('iS').textContent='Puntos: '+S.score;show('intro')}
function begin(){S.score=S.base;S.lives=3;S.mood='happy';S.moodT=0;parts=[];floats=[];flash=0;L=LV[S.lv].init();S.scene='play';show(null);
 if(S.lv===3){$('cap').style.display='block';$('cap').disabled=true}}
$('play').onclick=()=>{S.score=0;intro(1)};
$('howBtn').onclick=()=>show('how');$('howBack').onclick=()=>{S.scene='menu';show('menu')};
$('iGo').onclick=begin;$('retry').onclick=begin;$('toMenu').onclick=()=>{S.scene='menu';show('menu')};
$('again').onclick=()=>{S.score=0;intro(1)};
$('snd').onclick=()=>{snd=!snd;$('snd').classList.toggle('off',!snd);beep(700,.08)};
$('cap').onclick=()=>{if(S.scene!=='play'||S.lv!==3||!L.ready)return;S.score+=200;flash=1;beep(1800,.05);setTimeout(()=>beep(900,.12),70);setTimeout(winSnd,350);
 S.scene='final';S.mood='happy';$('fs').textContent=S.score;$('fr').textContent=S.score<900?'Aprendiz de manicura':S.score<1250?'Experta en uñas':'Leyenda del Nail Quest';show('final')};

/* ===== NIVEL 1: El ataque del TikTok ===== */
LV[1]={init:()=>({hits:0,cards:[],sp:.8,bx:90,bt:0,dead:0}),
 update(dt){if(L.done)return;L.bt+=dt;L.bx=90+Math.sin(L.bt*1.1)*42;L.sp-=dt;
  if(L.sp<=0){L.sp=rnd(.65,1);const g=Math.random()<.62;L.cards.push({x:cl(L.bx-14+rnd(-18,18),4,148),y:78,vx:rnd(-22,22),vy:rnd(48,66),id:g?Math.floor(rnd(0,5)):5+Math.floor(rnd(0,3)),g})}
  for(const c of L.cards.slice()){c.y+=c.vy*dt;c.x+=c.vx*dt;if(c.x<4||c.x>148)c.vx*=-1;
   if(c.y>232){L.cards.splice(L.cards.indexOf(c),1);if(c.g){hurt('¡Se escapó!',c.x+14,200);if(S.scene!=='play')return}}}},
 down(p){for(let i=L.cards.length-1;i>=0;i--){const c=L.cards[i];
  if(p.x>c.x-6&&p.x<c.x+34&&p.y>c.y-6&&p.y<c.y+34){L.cards.splice(i,1);
   if(c.g){S.score+=100;L.hits++;S.mood='happy';S.moodT=.8;beep(550+L.hits*110,.12);burst(c.x+14,c.y+14,12,PINK);say('+100',c.x+14,c.y,'#ffe066');
    if(L.hits>=5){L.dead=1;burst(L.bx,50,70,['#25f4ee','#fe2c55','#fff','#111'],110);S.score+=S.lives*50;finish()}}
   else hurt('¡Feo!',c.x+14,c.y);
   return}}},
 draw(){ART.l1(L,S)}};

/* ===== NIVEL 2: Operación salvar las uñas ===== */
const A2={x:14,y:178,w:152,h:100};
LV[2]={init:()=>({zt:0,zx:90,zy:228,risk:0,prog:0,cx:90,cy:228,msg:'¡Máxima concentración!'}),
 update(dt){if(L.done)return;L.zt+=dt*(1+L.prog*.6);L.zx=90+Math.sin(L.zt*.9)*46;L.zy=228+Math.sin(L.zt*1.4+1)*26;
  L.in=Math.abs(L.cx-L.zx)<=19&&Math.abs(L.cy-L.zy)<=19;
  if(L.in){L.prog+=dt*.11;L.risk-=dt*.5}else L.risk+=dt*.45;
  L.risk=cl(L.risk,0,1);L.msg=L.risk>.7?'Supervisor nervioso detectado':L.prog>.85?'¡Uñas a salvo!':'¡Máxima concentración!';
  if(L.risk>=1){L.risk=0;hurt('¡Ay, la uña!',90,120);return}
  if(L.prog>=1){L.prog=1;S.score+=300+S.lives*50;finish()}},
 move(p){L.cx=cl(p.x,A2.x+3,A2.x+A2.w-3);L.cy=cl(p.y,A2.y+3,A2.y+A2.h-3)},
 draw(){ART.l2(L,S)}};
LV[2].down=LV[2].move;

/* ===== NIVEL 3: La foto perfecta ===== */
LV[3]={init:()=>({fx:90,fy:110,hx:90,hy:130,p:0,ready:0,tik:null,tikT:3,hint:'Sigue las uñas con el marco'}),
 update(dt){L.hx=90+Math.sin(S.t*.8)*34;L.hy=130+Math.sin(S.t*1.15)*18;
  const nx=L.hx,ny=L.hy-14.5,dx=Math.abs(L.fx-nx),dy=Math.abs(L.fy-ny);L.good=dx<=14&&dy<=9;
  L.tikT-=dt;if(!L.tik&&L.tikT<=0)L.tik={x:-20,y:rnd(60,160)};
  if(L.tik){L.tik.x+=40*dt;if(L.tik.x>200){L.tik=null;L.tikT=4}}
  L.block=L.tik&&Math.hypot(L.tik.x-L.fx,L.tik.y-L.fy)<45;
  if(L.good&&!L.block)L.p+=dt*.5;else L.p-=dt*.4;L.p=cl(L.p,0,1);
  if(L.p>=1&&!L.ready){L.ready=1;$('cap').disabled=false;beep(988,.12)}
  L.hint=L.ready?'¡Listo! Pulsa CAPTURAR':L.block?'¡Fuera, TikTok! (tócalo)':L.good?'¡Mantén el encuadre!':'Sigue las uñas con el marco'},
 move(p){L.fx=cl(p.x,32,148);L.fy=cl(p.y,28,185)},
 down(p){const k=L.tik;if(k&&Math.abs(p.x-k.x)<20&&p.y>k.y-4&&p.y<k.y+40){burst(k.x,k.y+16,16,['#25f4ee','#fe2c55','#fff']);S.score+=50;say('+50',k.x,k.y,'#ffe066');beep(300,.15,'square',.05,600);L.tik=null;L.tikT=5}else this.move(p)},
 draw(){ART.l3(L,S)}};
LV[3].move=LV[3].move.bind(LV[3]);

/* ===== pantalla final y menú ===== */
const drawFinal=()=>ART.final(S),drawMenu=()=>ART.menu(S);

/* ===== bucle principal (un único requestAnimationFrame) ===== */
function step(dt){S.t+=dt;if(S.moodT>0)S.moodT-=dt;if(S.shake>0)S.shake-=dt;if(flash>0)flash-=dt*2;
 parts=parts.filter(p=>(p.l-=dt)>0&&(p.x+=p.vx*dt,p.y+=p.vy*dt,p.vy+=140*dt,true));
 floats=floats.filter(f=>(f.l-=dt)>0&&(f.y-=18*dt,true));
 if(S.scene==='play'){LV[S.lv].update(dt);
  if(S.scene==='play'&&L.done&&L.timer>0){L.timer-=dt;if(L.timer<=0){L.timer=0;intro(S.lv+1)}}}
 if(S.scene==='final'&&Math.random()<.3)burst(rnd(0,W),0,3,PINK,30)}
function render(){ctx.save();if(S.shake>0)ctx.translate(Math.round(rnd(-2,2)),Math.round(rnd(-2,2)));
 if(S.scene==='play'||(S.scene==='lose'&&false))LV[S.lv].draw();else if(S.scene==='final')drawFinal();else drawMenu();
 for(const p of parts)ART.part(p);for(const f of floats)ART.float(f);ctx.restore();ART.hud(S,L);
 if(flash>0){ctx.fillStyle='rgba(255,255,255,'+Math.min(1,flash)+')';ctx.fillRect(0,0,W,H)}}
let last=0;
function frame(ts){requestAnimationFrame(frame);const dt=Math.min(.05,Math.max(0,(ts-last)/1000));last=ts;step(dt);render()}
requestAnimationFrame(frame);

/* ===== entrada táctil (Pointer Events) y tamaño ===== */
const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height}};
cv.addEventListener('pointerdown',e=>{e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(_){}
 if(S.scene==='play'&&!L.done&&LV[S.lv].down)LV[S.lv].down(pos(e))});
cv.addEventListener('pointermove',e=>{if(S.scene==='play'&&!L.done&&LV[S.lv].move)LV[S.lv].move(pos(e))});
document.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
document.addEventListener('gesturestart',e=>e.preventDefault());
document.addEventListener('contextmenu',e=>e.preventDefault());
function fit(){G.style.setProperty('--u',Math.min(innerWidth/W,innerHeight/H)+'px')}
addEventListener('resize',fit);addEventListener('orientationchange',fit);if(window.visualViewport)visualViewport.addEventListener('resize',fit);fit();
})();
