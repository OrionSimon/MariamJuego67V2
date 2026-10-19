/* Capa visual (solo dibuja; no toca la lógica ni las colisiones). Unidades lógicas 180x320. */
window.ART=function(c){
'use strict';
const W=180,H=320,TAU=Math.PI*2,OL='#5b3358',SK='#ffdcc6',PALE='#f1dfe4',BED='#ffc8c4';
const rr=k=>{const v=Math.sin(k*78.233)*43758.5453;return v-Math.floor(v)};
const lg=(x0,y0,x1,y1,...s)=>{const g=c.createLinearGradient(x0,y0,x1,y1);for(let i=0;i<s.length;i+=2)g.addColorStop(s[i],s[i+1]);return g};
const rg=(x,y,r0,r1,...s)=>{const g=c.createRadialGradient(x,y,r0,x,y,r1);for(let i=0;i<s.length;i+=2)g.addColorStop(s[i],s[i+1]);return g};
const fp=(f,o,lw)=>{if(f){c.fillStyle=f;c.fill()}if(o){c.lineWidth=lw||.9;c.strokeStyle=o;c.lineJoin='round';c.lineCap='round';c.stroke()}};
const D=(f,o,lw,fn)=>{c.beginPath();fn();fp(f,o,lw)};
const E=(x,y,rx,ry,f,o,lw,rot)=>{c.beginPath();c.ellipse(x,y,rx,ry,rot||0,0,TAU);fp(f,o,lw)};
const RR=(x,y,w,h,r,f,o,lw)=>{c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();fp(f,o,lw)};
const ST=(w,col)=>{c.lineWidth=w;c.strokeStyle=col;c.lineCap='round';c.lineJoin='round';c.stroke()};
const LB=(x1,y1,x2,y2,w,f,o)=>{c.lineCap='round';c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.lineWidth=w+1.3;c.strokeStyle=o||OL;c.stroke();c.lineWidth=w;c.strokeStyle=f;c.stroke()};
const T=(s,x,y,col,z,al,st)=>{c.font='bold '+(z||8)+'px "Trebuchet MS","Segoe UI",system-ui,sans-serif';c.textAlign=al||'center';c.textBaseline='middle';c.lineJoin='round';c.lineWidth=(z||8)*.28;c.strokeStyle=st||'#6a2f78';c.strokeText(s,x,y);c.fillStyle=col||'#fff';c.fillText(s,x,y)};
const heart=(x,y,r,f,o)=>D(f,o,.8,()=>{c.moveTo(x,y+r*.9);c.bezierCurveTo(x-r*1.5,y-r*.1,x-r*.6,y-r*1.3,x,y-r*.45);c.bezierCurveTo(x+r*.6,y-r*1.3,x+r*1.5,y-r*.1,x,y+r*.9)});
const star=(x,y,R,r,f,o)=>D(f,o,.5,()=>{for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r:R;c[i?'lineTo':'moveTo'](x+Math.cos(a)*q,y+Math.sin(a)*q)}c.closePath()});
const spark=(x,y,r,a)=>{c.globalAlpha=a==null?1:a;D('#fff',null,0,()=>{c.moveTo(x,y-r);c.quadraticCurveTo(x,y,x+r,y);c.quadraticCurveTo(x,y,x,y+r);c.quadraticCurveTo(x,y,x-r,y);c.quadraticCurveTo(x,y,x,y-r)});c.globalAlpha=1};
const bok=(t,a)=>{for(let i=0;i<10;i++){const x=((i*67+t*(4+i%4*2))%(W+60))-30,y=(i*43+Math.sin(t*.5+i)*8)%260+10,r=7+(i%4)*5;E(x,y,r,r,'rgba(255,255,255,'+a+')')}};
const sps=t=>{for(let i=0;i<7;i++){const k=Math.sin(t*2.5+i*1.9);if(k>0)spark((i*83)%W,(i*59)%240+10,2+k*3,k)}};
const sky=(a,b)=>{c.fillStyle=lg(0,0,0,H,0,a,1,b);c.fillRect(0,0,W,H)};
const bar=(x,y,w,h,p,c1,c2)=>{RR(x,y,w,h,h/2,'rgba(255,255,255,.92)','#b79ae0',.8);if(p>.01){RR(x+1,y+1,Math.max(h-2,(w-2)*p),h-2,(h-2)/2,lg(0,y,0,y+h,0,c1,1,c2));RR(x+3,y+1.6,Math.max(2,(w-6)*p),1.4,.7,'rgba(255,255,255,.55)')}};
function bottle(x,y,s,col){RR(x-5*s,y-11*s,10*s,11*s,3*s,lg(x-5*s,0,x+5*s,0,0,col,.5,'#fff',1,col),OL,.7);RR(x-3.6*s,y-9.5*s,1.6*s,6*s,.8*s,'rgba(255,255,255,.65)');RR(x-2*s,y-14*s,4*s,3.6*s,1*s,'#fff',OL,.6);RR(x-2.6*s,y-21*s,5.2*s,7*s,1.6*s,'#2b1f3a',OL,.6)}

/* ===== UÑAS ===== */
const NS=(w,h)=>{c.moveTo(0,h/2);c.bezierCurveTo(-w*.6,h*.5,-w*.58,-h*.05,-w*.24,-h*.42);c.quadraticCurveTo(0,-h*.62,w*.24,-h*.42);c.bezierCurveTo(w*.58,-h*.05,w*.6,h*.5,0,h/2)};
/* st: {c:color, des:fn, dmg:0|1, wet:0|1, sd:semilla}. Sin color = uña natural */
function nail(w,h,st,t){const sd=(st.sd||1)*7.3;c.save();c.beginPath();NS(w,h);c.fillStyle=BED;c.fill();
 if(st.c){c.save();c.clip();c.fillStyle=st.c;c.fillRect(-w,-h,2*w,2*h);
  c.fillStyle=lg(0,-h/2,0,h/2,0,'rgba(255,255,255,.38)',.5,'rgba(255,255,255,0)',1,'rgba(90,30,70,.24)');c.fillRect(-w,-h,2*w,2*h);
  if(st.des)st.des(w,h);
  if(st.dmg){c.fillStyle='rgba(238,228,226,.55)';c.beginPath();c.ellipse(w*.08,h*.1,w*.34,h*.27,.4,0,TAU);c.fill();
   for(let i=0;i<4;i++){const x=(rr(sd+i)-.5)*w*.9,y=-h*.46+rr(sd*3+i)*h*.6,r=w*(.1+rr(sd+i*5)*.1);
    D(BED,'rgba(150,80,80,.5)',.25,()=>{for(let j=0;j<6;j++){const a=j*TAU/6,q=r*(.7+rr(sd+i*9+j)*.6);c[j?'lineTo':'moveTo'](x+Math.cos(a)*q,y+Math.sin(a)*q)}c.closePath()})}
   c.beginPath();c.moveTo(-w*.1+rr(sd)*w*.2,-h*.45);c.lineTo(-w*.2+rr(sd+1)*w*.3,-h*.15);c.lineTo(rr(sd+2)*w*.2,h*.05);c.lineTo(-w*.12,h*.25);ST(.3,'rgba(80,40,55,.7)')}
  else{E(-w*.2,-h*.08,w*.08,h*.26,'rgba(255,255,255,.8)',null,0,.12);E(w*.2,-h*.3,w*.06,w*.06,'rgba(255,255,255,.9)');
   if(st.wet){const k=((t||0)*1.2)%1;c.fillStyle='rgba(255,255,255,.55)';c.fillRect(-w,-h/2+k*h*1.4-h*.2,2*w,h*.12)}}
  c.restore()}
 else E(-w*.15,-h*.05,w*.1,h*.22,'rgba(255,255,255,.35)',null,0,.12);
 c.beginPath();NS(w,h);ST(.5,'rgba(120,60,75,.6)');
 E(0,h*.56,w*.57,h*.19,'#fbd2bd','rgba(170,100,90,.5)',.4);c.restore()}

/* diseños: se pintan dentro de la uña (con clip activo) */
const DS=[
 (w,h)=>star(0,-h*.04,w*.34,w*.14,'#ffd23a','rgba(255,255,255,.7)'),
 (w,h)=>heart(0,-h*.04,w*.2,'#ff3f7f','#c21f59'),
 (w,h)=>{for(let i=0;i<5;i++){const a=i*TAU/5;E(Math.cos(a)*w*.16,Math.sin(a)*w*.16-h*.04,w*.11,w*.11,'#ff8fc7','#d2559a',.3)}E(0,-h*.04,w*.08,w*.08,'#ffe066')},
 (w,h)=>{E(0,-h*.04,w*.3,w*.3,'#ffe066','#d9a520',.35);E(-w*.1,-h*.08,w*.04,w*.055,'#3a2a2a');E(w*.1,-h*.08,w*.04,w*.055,'#3a2a2a');c.beginPath();c.arc(0,-h*.03,w*.15,.2,Math.PI-.2);ST(.5,'#3a2a2a')},
 (w,h)=>{for(let i=-3;i<=3;i++){c.fillStyle=i%2?'#8fd3ff':'#fff';c.beginPath();c.moveTo(i*w*.18-w*.4,-h*.6);c.lineTo(i*w*.18-w*.3,-h*.6);c.lineTo(i*w*.18+w*.5,h*.6);c.lineTo(i*w*.18+w*.4,h*.6);c.fill()}}];
const BD=[
 (w,h)=>{E(-w*.12,-h*.05,w*.22,w*.15,'#6b4a2b',null,0,.5);E(w*.14,h*.12,w*.15,w*.1,'#7a8b2a');E(w*.05,-h*.2,w*.06,w*.06,'#6b4a2b')},
 (w,h)=>{c.beginPath();c.moveTo(-w*.26,-h*.2);c.lineTo(w*.26,h*.2);c.moveTo(w*.26,-h*.2);c.lineTo(-w*.26,h*.2);ST(w*.11,'#3a3a44')},
 (w,h)=>{c.beginPath();c.moveTo(-w*.3,-h*.25);for(let i=0;i<5;i++)c.lineTo((i%2?-1:1)*w*.3,-h*.25+i*h*.12);ST(w*.07,'#7a8b2a')}];
const NSTYLE=[{c:'#e2ccff',des:DS[0]},{c:'#fff1e8',des:DS[1]},{c:'#ffffff',des:DS[2]},{c:'#c6e8ff',des:DS[3]},{c:'#ffc4de',des:DS[4]},
 {c:'#d8c8bc',des:BD[0],dmg:1,sd:3},{c:'#cbc6d0',des:BD[1],dmg:1,sd:5},{c:'#d3dab4',des:BD[2],dmg:1,sd:8}];

/* ===== MANOS (dedos con volumen, articulaciones y uñas almendradas) ===== */
const FS=[[-13,-3,-.22,20,6.4],[-4.5,-7,-.07,26,7.6],[4,-9,.03,29,8],[12.5,-7,.16,26,7.8]],TH=[17,12,.75,19,9.4];
const HAY=([...FS,TH]).reduce((a,f)=>a+f[1]-Math.cos(f[2])*(f[3]-f[4]*.6),0)/5;
let NP=[];
function finger(f,ns,t){c.save();c.translate(f[0],f[1]);c.rotate(f[2]);const w=f[4],l=f[3];
 const P=()=>{c.moveTo(-w*.5,w*.7);c.lineTo(-w*.47,-l+w*.45);c.bezierCurveTo(-w*.5,-l-w*.08,w*.5,-l-w*.08,w*.47,-l+w*.45);c.lineTo(w*.5,w*.7)};
 c.beginPath();P();c.fillStyle=lg(-w/2,0,w/2,0,0,'#f2b79a',.3,'#ffe4d2',.7,'#ffdcc8',1,'#f0b194');c.fill();
 c.beginPath();P();ST(.7,'rgba(150,80,80,.7)');
 [.42,.74].forEach(k=>{c.beginPath();const y=-l*k+w*.4;c.moveTo(-w*.27,y);c.quadraticCurveTo(0,y+w*.14,w*.27,y);ST(.45,'rgba(190,110,100,.4)')});
 c.translate(0,-l+w*.6);nail(w*.74,w*1.04,ns,t);c.restore()}
function hands(cx,cy,s,ns,clipY,t){c.save();if(clipY){c.beginPath();c.rect(0,0,W,clipY);c.clip()}
 c.translate(cx,cy);c.scale(s,s);c.translate(0,-HAY);NP=[];
 [1,-1].forEach((d,h)=>{c.save();c.translate(-d*38,0);c.scale(d,1);
  D(lg(-17,0,17,0,0,'#f3bba0',.45,'#ffe4d3',1,'#f1b598'),'rgba(150,80,80,.7)',.8,()=>{c.moveTo(-17,-4);c.bezierCurveTo(-19,10,-14,28,-11,42);c.lineTo(11,42);c.bezierCurveTo(15,28,20,12,17,-4);c.quadraticCurveTo(0,-14,-17,-4)});
  [TH,...FS].forEach((f,j)=>{const i=j?j-1:4;finger(f,ns(h*5+i),t);const L=f[3]-f[4]*.6;NP[h*5+i]={x:cx+s*(-d*38+d*(f[0]+Math.sin(f[2])*L)),y:cy+s*(f[1]-Math.cos(f[2])*L-HAY)}});
  RR(-14.5,39,29,13,5,lg(0,39,0,52,0,'#fffaf0',1,'#ffd3e6'),OL,.8);c.restore()});
 c.restore()}
const glints=(t)=>NP.forEach((p,i)=>{const k=Math.sin(t*4+i*1.3);if(k>.3)spark(p.x-1,p.y-2,1.2+k*1.6,k)});

/* ===== PERSONAJES ===== */
function face(m,o){const ey=13.4,X=(v,d)=>d<0?v:-v;
 [-1,1].forEach(d=>{const x=d*4.3;
  if(m==='happy'){c.beginPath();c.arc(x,ey+1,2.4,3.5,5.92);ST(1.1,OL);return}
  const bg=m==='surprise',rx=bg?3.2:2.7,ry=bg?4:3.3;
  E(x,ey,rx,ry,'#fff',OL,.6);E(x+.2,ey+.4,bg?1.9:2.1,bg?2.5:2.6,o.iris);E(x+.2,ey+.5,bg?1:1.2,bg?1.4:1.6,'#1d1a3a');E(x-.5,ey-.8,.8,.8,'#fff');
  if(m==='work')D(o.lid,OL,.6,()=>c.ellipse(x,ey-.1,rx+.1,ry,0,Math.PI,TAU));
  c.beginPath();c.moveTo(x+d*rx,ey-1);c.lineTo(x+d*(rx+1.4),ey-2);ST(.6,OL)});
 const B=m==='sad'?[-6.8,9.6,-2.4,8]:m==='surprise'?[-6.8,8,-2.4,7.6]:m==='confused'?null:[-6.8,9.2,-2.4,10.4];
 if(B)[-1,1].forEach(d=>{c.beginPath();c.moveTo(X(B[0],d),B[1]);c.quadraticCurveTo(X((B[0]+B[2])/2,d),(B[1]+B[3])/2-.8,X(B[2],d),B[3]);ST(1,o.brow)});
 else{c.beginPath();c.moveTo(-6.8,7.8);c.quadraticCurveTo(-4.6,6.2,-2.4,7.8);ST(1,o.brow);c.beginPath();c.moveTo(2.4,10.2);c.lineTo(6.8,9.4);ST(1,o.brow)}
 E(0,17,.6,.4,'rgba(200,110,100,.6)');
 if(m==='happy'){D('#b8385c',OL,.6,()=>{c.moveTo(-3.4,19.2);c.quadraticCurveTo(0,25,3.4,19.2);c.closePath()});E(0,22.2,1.6,.8,'#ff8a9e')}
 else if(m==='surprise')E(0,20.8,1.7,2.3,'#b8385c',OL,.6);
 else if(m==='sad'){c.beginPath();c.moveTo(-2.6,21.6);c.quadraticCurveTo(0,19,2.6,21.6);ST(.9,OL);D('#8fd8ff',null,0,()=>{c.moveTo(-6.6,16);c.quadraticCurveTo(-8,19,-6.6,19.6);c.quadraticCurveTo(-5.2,19,-6.6,16)})}
 else if(m==='confused'){c.beginPath();c.moveTo(-2.6,20.6);c.bezierCurveTo(-1,19.4,0,21.8,2.6,20.4);ST(.9,OL);D('#8fd8ff',null,0,()=>{c.moveTo(9.5,6);c.quadraticCurveTo(8,9,9.5,9.8);c.quadraticCurveTo(11,9,9.5,6)})}
 else if(m==='work')RR(-2.2,20,4.4,1.5,.7,o.lip);
 else{c.beginPath();c.moveTo(-2.6,19.8);c.quadraticCurveTo(0,22.4,2.6,19.8);ST(.9,OL)}}
const head=(g,ears)=>{E(-11.2,14,1.8,2.5,ears,OL,.7);E(11.2,14,1.8,2.5,ears,OL,.7);E(0,13,11.5,12,g,OL,.9)};
function mariam(x,y,s,m,t){c.save();c.translate(x,y+Math.sin((t||0)*2)*.5*s);c.scale(s,s);
 const hg=lg(-14,0,14,40,0,'#ffe58a',1,'#e6b13a');
 D(hg,OL,.9,()=>{c.moveTo(-12.5,12);c.bezierCurveTo(-19,-5,19,-5,12.5,12);c.bezierCurveTo(18,26,17,37,11,41);c.lineTo(-11,41);c.bezierCurveTo(-17,37,-18,26,-12.5,12)});
 [-4.2,1.6].forEach(q=>{RR(q-.5,47,4.6,9,2.2,SK,OL,.8);E(q+1.8,56.6,4,2.3,'#fff',OL,.8)});
 D(lg(0,24,0,52,0,'#ffd6e8',1,'#ff9fca'),OL,.9,()=>{c.moveTo(-6,24);c.lineTo(6,24);c.bezierCurveTo(7,33,13,43,15,51);c.quadraticCurveTo(0,55,-15,51);c.bezierCurveTo(-13,43,-7,33,-6,24)});
 D('#fffaf0',OL,.6,()=>{c.moveTo(-6,24);c.lineTo(0,31);c.lineTo(6,24);c.quadraticCurveTo(0,27,-6,24)});E(0,34,1.3,1.3,'#ff6fae');
 LB(-6,27,-11.5,40,3.4,SK);LB(6,27,11.5,40,3.4,SK);
 [-1,1].forEach(d=>{E(d*12,41.8,2.5,2.7,SK,OL,.7);E(d*12,43.3,.95,.8,'#ff6fae')});RR(-2,21,4,5,1.5,SK,OL,.6);
 head(lg(-8,2,8,25,0,'#ffeadb',1,'#fbcbb0'),SK);
 E(-6.8,17.8,2.6,1.5,'rgba(255,120,160,.5)');E(6.8,17.8,2.6,1.5,'rgba(255,120,160,.5)');
 face(m,{iris:'#58a6e8',brow:'#c9972a',lip:'#e0577b'});
 D(hg,OL,.8,()=>{c.moveTo(-12,13);c.bezierCurveTo(-13,-2,12,-4,12,13);c.bezierCurveTo(9,7,4,4,0,3.5);c.bezierCurveTo(-3,6,-8,8,-12,13)});
 D('#ff5fa8',OL,.7,()=>{c.moveTo(7.5,3);c.bezierCurveTo(10,-3,16,-1,14,4);c.bezierCurveTo(13,6,10,5,7.5,3)});
 D('#ff5fa8',OL,.7,()=>{c.moveTo(7.5,3);c.bezierCurveTo(5,-3,0,0,2,4);c.bezierCurveTo(3,6,6,5,7.5,3)});E(7.5,3,1.7,1.7,'#ff9ccf',OL,.5);c.restore()}
function mariana(x,y,s,m,t){c.save();c.translate(x,y+Math.sin((t||0)*2)*.4*s);c.scale(s,s);
 const hg=lg(-14,0,14,46,0,'#42365a',.4,'#1a1424',1,'#0e0a14'),SV='#c8c8dc';
 D(hg,OL,.9,()=>{c.moveTo(-12.5,12);c.bezierCurveTo(-19,-5,19,-5,12.5,12);c.bezierCurveTo(17,28,16,40,12,46);c.lineTo(-12,46);c.bezierCurveTo(-16,40,-17,28,-12.5,12)});
 [-3.2,3.2].forEach(q=>{LB(q,48,q,53,3.8,'#2a2236');E(q+(q<0?-.3:.3),55.6,4.2,2.8,'#17121f',OL,.8)});
 D(lg(0,24,0,54,0,'#2b2236',1,'#0f0b15'),OL,.9,()=>{c.moveTo(-6,24);c.lineTo(6,24);c.bezierCurveTo(7,34,12,44,14,52);c.quadraticCurveTo(0,56,-14,52);c.bezierCurveTo(-12,44,-7,34,-6,24)});
 c.beginPath();c.moveTo(-14,52);c.quadraticCurveTo(0,56,14,52);ST(1,SV);
 D('#3b2c55',OL,.7,()=>{c.moveTo(-4.5,29);c.lineTo(4.5,29);c.lineTo(6.5,50);c.quadraticCurveTo(0,52.5,-6.5,50);c.closePath()});RR(-2.4,40,4.8,4,1,'#2a1f40',SV,.4);
 [-1,1].forEach(d=>{LB(d*6,27,d*11,40,3.2,'#1e1727');E(d*11.4,41.6,2.3,2.5,PALE,OL,.7);E(d*11.4,43,.9,.8,'#6a2f9a')});
 RR(-2,21,4,5,1.5,PALE,OL,.6);RR(-2.6,23.2,5.2,1.5,.7,SV,OL,.4);
 head(lg(-8,2,8,25,0,'#f7ebee',1,'#e0c8d2'),PALE);
 E(-6.8,17.8,2.4,1.3,'rgba(150,70,170,.22)');E(6.8,17.8,2.4,1.3,'rgba(150,70,170,.22)');
 face(m==='confused'?'confused':'work',{iris:'#9a6ad8',lid:'#6b3fa0',brow:'#1a1424',lip:'#6a2158'});
 D(hg,OL,.8,()=>{c.moveTo(-12,14);c.bezierCurveTo(-14,-2,14,-2,12,14);c.lineTo(11.5,7.5);c.quadraticCurveTo(0,10,-11.5,7.5);c.closePath()});
 [-1,1].forEach(d=>{D(hg,OL,.7,()=>{c.moveTo(d*12,10);c.quadraticCurveTo(d*14.5,22,d*11,33);c.lineTo(d*9,31);c.quadraticCurveTo(d*10.5,20,d*9.5,10)});E(d*11.8,19,.9,1.4,SV,OL,.3)});c.restore()}
function simon(x,y,s,m,t){c.save();c.translate(x,y+Math.sin((t||0)*3)*.4*s);c.scale(s,s);
 const SM='#f2bd98',mus=(a,b,rx,ry,rot)=>{E(a,b,rx,ry,SM,OL,.9,rot);E(a-rx*.25,b-ry*.3,rx*.35,ry*.28,'rgba(255,255,255,.38)',null,0,rot)};
 const fl=m==='flex',ph=m==='phone';
 [-1,1].forEach(d=>{LB(d*5,44,d*5.5,54,8.5,'#3a4aa0');E(d*6.3,57,5.6,2.6,'#fff',OL,.8)});RR(-10,40,20,9,4,'#3a4aa0',OL,.9);
 RR(-4,18,8,7,2,SM,OL,.7);
 D(lg(0,22,0,44,0,'#3a3a46',1,'#14141a'),OL,.9,()=>{c.moveTo(-20,26);c.bezierCurveTo(-20,20,20,20,20,26);c.bezierCurveTo(20,34,11,40,10,44);c.lineTo(-10,44);c.bezierCurveTo(-11,40,-20,34,-20,26)});
 D(SM,null,0,()=>{c.moveTo(-6,22);c.lineTo(0,31);c.lineTo(6,22)});c.beginPath();c.moveTo(0,31);c.lineTo(0,36);ST(.5,'rgba(120,70,60,.5)');
 const down=d=>{mus(d*24,32,7.5,10,d*.15);mus(d*26.5,43,5.4,7,d*.1);E(d*26.5,50,4.6,4.4,SM,OL,.8)};
 const up=d=>{mus(d*25,27,10,6.5,-d*.25);mus(d*26,22.5,6.5,5.5,0);mus(d*31,14,5,8.5,d*.2);E(d*31.5,5,4.8,4.4,SM,OL,.8)};
 if(fl){up(-1);up(1)}else if(ph){down(-1);mus(24,28,7,9,-.3);mus(28,17,5,8,-.2);E(29,8,4.8,4.4,SM,OL,.8);
  RR(25,-6,9,15,2,'#17171d','rgba(255,255,255,.5)',.6);RR(26.2,-4.6,6.6,12,1.2,lg(26,-5,33,7,0,'#8ee6ff',1,'#ff9ccf'));E(29.5,-5.6,.5,.5,'#555')}
 else{down(-1);down(1)}
 head(lg(-8,2,8,24,0,'#ffd7b8',1,'#eeb591'),SM);
 D('#2b1f1a',OL,.8,()=>{c.moveTo(-9.8,11);c.bezierCurveTo(-11,-1,11,-1,9.8,11);c.bezierCurveTo(8,6,3,4.5,0,4.5);c.bezierCurveTo(-3,4.5,-8,6,-9.8,11)});
 const wide=fl,ey=12;[-1,1].forEach(d=>{E(d*3.6,ey,1.9,wide?2.6:1.9,'#fff',OL,.5);E(d*3.5,ey+.2,.9,wide?.9:1,'#222');
  c.beginPath();if(fl){c.moveTo(d*6,9.4);c.lineTo(d*1.6,8)}else{c.moveTo(d*6,8.4);c.lineTo(d*1.6,9.8)}ST(1.6,'#2b1f1a')});
 E(0,15,1,.8,'rgba(210,130,110,.7)');
 if(fl){E(0,18.5,2.2,1.4,'#8a3a3a',OL,.5);D('#8fd8ff',null,0,()=>{c.moveTo(11,5);c.quadraticCurveTo(9.5,8,11,9);c.quadraticCurveTo(12.5,8,11,5)})}
 else if(ph){c.beginPath();c.moveTo(-3,17.5);c.quadraticCurveTo(0,20.5,3,17.5);ST(.9,'#7a4a3a')}
 else{c.beginPath();c.moveTo(-3,18);c.lineTo(3,18);ST(.9,'#7a4a3a')}c.restore()}

/* ===== ENEMIGO TIKTOK ===== */
function tik(x,y,s,t){x+=Math.sin(t*20)*.4;const w=16*s,h=18*s,l=x-w/2;
 RR(l-.8*s,y+.6*s,w,h,4*s,'#25f4ee');RR(l+.8*s,y-.6*s,w,h,4*s,'#fe2c55');RR(l,y,w,h,4*s,lg(0,y,0,y+h,0,'#34343f',1,'#0c0c10'),'#000',.8);
 RR(l+1.2*s,y+1*s,w*.4,1.2*s,.6*s,'rgba(255,255,255,.25)');
 [-1,1].forEach(d=>{E(x+d*3.4*s,y+6.2*s,2.2*s,2.6*s,'#fff');E(x+d*3*s,y+6.6*s,1*s,1.4*s,'#fe2c55');c.beginPath();c.moveTo(x+d*6*s,y+2.6*s);c.lineTo(x+d*1.4*s,y+4.2*s);ST(.9*s,'#fe2c55')});
 D('#fe2c55',null,0,()=>{c.moveTo(x-4.2*s,y+11.5*s);c.quadraticCurveTo(x,y+16*s,x+4.2*s,y+11.5*s);c.closePath()});
 c.beginPath();for(let i=0;i<5;i++)c[i?'lineTo':'moveTo'](x-3.4*s+i*1.7*s,y+(i%2?12.6:11.8)*s);c.lineTo(x+3.4*s,y+11.6*s);c.fillStyle='#fff';c.fill();
 RR(x+4.4*s,y+13.2*s,.8*s,3*s,.4*s,'#25f4ee');E(x+3.8*s,y+16.2*s,1.2*s,.9*s,'#fe2c55')}

/* ===== TARJETA NIVEL 1 (uña con diseño; caja 28x28 igual que la colisión) ===== */
function card(cd,t){c.save();c.translate(cd.x+14,cd.y+14);c.rotate(Math.sin(t*3+cd.x*.1)*.12);
 E(0,1,15,16.5,'rgba(255,255,255,.6)','rgba(255,255,255,.9)',.8);E(1,14.5,9,1.8,'rgba(90,40,120,.15)');
 nail(19,26,Object.assign({},NSTYLE[cd.id],{sd:cd.id}),t);c.restore()}

/* ===== ESCENARIOS ===== */
function table1(){RR(-6,272,W+12,60,14,lg(0,272,0,320,0,'#fff3e4',1,'#ffc9e3'),OL,1);RR(6,282,W-12,2,1,'rgba(255,255,255,.7)');
 [[16,'#c7a6ff'],[34,'#ff8fc7'],[148,'#8fd3ff'],[166,'#ffd23a']].forEach(b=>bottle(b[0],277,.8,b[1]))}
function l1(L,S){const t=S.t;sky('#ffe3f1','#d9c8ff');bok(t,.22);sps(t);
 if(!L.dead)tik(L.bx,18,3.5,t);
 L.cards.forEach(cd=>card(cd,t));
 mariam(90,226,1,S.moodT>0?S.mood:'focus',t);table1();
 RR(46,296,88,17,8.5,'rgba(90,45,120,.88)','#fff',1);T('BONITOS '+L.hits+'/5',90,304.8,'#fff',9)}
const A2={x:14,y:178,w:152,h:100};
function room(t){c.fillStyle=lg(0,0,0,142,0,'#f3e4ff',1,'#ffdff0');c.fillRect(0,0,W,142);
 for(let x=6;x<W;x+=24)RR(x,0,10,142,0,'rgba(255,255,255,.28)');
 [8,128].forEach(x=>{RR(x,56,44,4,2,'#fff',OL,.8);bottle(x+9,56,.6,'#ff8fc7');bottle(x+22,56,.6,'#c7a6ff');bottle(x+35,56,.6,'#8fd3ff')});
 RR(0,118,W,26,0,'rgba(255,255,255,.35)');
 c.fillStyle=lg(0,142,0,180,0,'#f4e6ff',1,'#e0cbf5');c.fillRect(0,142,W,38);
 for(let j=0;j<5;j++)for(let i=0;i<16;i++)if((i+j)%2){c.fillStyle='rgba(180,140,225,.25)';c.fillRect(i*12,142+j*8,12,8)}}
function l2(L,S){const t=S.t,r=L.risk,hi=r>.7,cur=Math.min(9,Math.floor(L.prog*10));room(t);
 mariana(28,92,.82,hi?'confused':'work',t);simon(148+(hi?Math.sin(t*30):0),90,.78,hi?'flex':'serious',t);
 mariam(90,78,1,r>.5?'surprise':L.prog>.85?'happy':'focus',t);
 RR(40,128,100,26,6,lg(0,128,0,154,0,'#fffaf2',1,'#ffd9ec'),OL,1);bottle(52,131,.7,'#c7a6ff');bottle(128,131,.7,'#ff8fc7');
 hands(90,112,.72,k=>L.prog>=1||k<cur?Object.assign({},NSTYLE[k%5],{sd:k+1}):k===cur?Object.assign({},NSTYLE[k%5],{wet:1,des:null,sd:k+1}):{c:'#e9bcd0',dmg:1,sd:k+1},146,t);
 RR(40,146,100,8,4,'#ffe6f2',OL,.8);
 const g=NP[cur]||{x:90,y:100},bx=g.x+Math.sin(t*7);
 LB(40,108,56,118,4,'#1e1727');E(57,118.5,2.6,2.6,PALE,OL,.7);LB(58,118.5,bx-2,g.y+2,1.1,'#ff9ccc');E(bx,g.y,1.6,2.4,'#ff4fa0',OL,.5);
 RR(56,18,68,24,12,lg(0,18,0,42,0,'#ffffff',1,'#cbb3f0'),'#7a55c9',1);RR(48,38,84,8,4,'#cbb3f0','#7a55c9',.9);RR(60,41,60,3,1.5,'rgba(225,185,255,'+(.7+.3*Math.sin(t*6))+')');
 D(lg(0,46,0,130,0,'rgba(200,150,255,'+(.3+.08*Math.sin(t*6))+')',1,'rgba(200,150,255,0)'),null,0,()=>{c.moveTo(62,46);c.lineTo(118,46);c.lineTo(138,130);c.lineTo(42,130)});
 RR(24,155,132,15,7.5,'rgba(255,255,255,.88)','#d9b8ff',1);T(L.msg,90,163,hi?'#d9285e':'#6a3a9a',8,'center','#fff');
 RR(A2.x-2,A2.y-2,A2.w+4,A2.h+4,11,'#fff','#d9b8ff',1);RR(A2.x,A2.y,A2.w,A2.h,9,lg(0,A2.y,0,A2.y+A2.h,0,'#7a55c9',1,'#4a2f8f'));
 c.save();c.beginPath();c.rect(A2.x,A2.y,A2.w,A2.h);c.clip();c.strokeStyle='rgba(255,255,255,.1)';c.lineWidth=.6;for(let x=19;x<A2.w;x+=19){c.beginPath();c.moveTo(A2.x+x,A2.y);c.lineTo(A2.x+x,A2.y+A2.h);c.stroke()}for(let y=20;y<A2.h;y+=20){c.beginPath();c.moveTo(A2.x,A2.y+y);c.lineTo(A2.x+A2.w,A2.y+y);c.stroke()}c.restore();
 RR(L.zx-19,L.zy-19,38,38,11,'rgba(125,255,176,'+(.28+.1*Math.sin(t*8))+')','#7dffb0',1.6);
 E(L.cx,L.cy,5.5,5.5,rg(L.cx-1.5,L.cy-1.5,.5,6,0,'#fff',1,L.in?'#ff6fae':'#ff4040'),'#fff',1.2);
 T('UÑAS',4,291,'#fff',7,'left');bar(34,287,132,8,L.prog,'#ffb3d9','#ff4fa0');T('RIESGO',4,304,'#fff',7,'left');bar(34,300,132,8,r,'#ffd27a',hi?'#ff3b3b':'#ff9a2e')}
function l3(L,S){const t=S.t;sky('#efdcff','#ffd5ea');c.fillStyle=rg(90,120,5,150,0,'rgba(255,255,255,.7)',1,'rgba(255,255,255,0)');c.fillRect(0,0,W,260);bok(t,.2);sps(t);
 hands(L.hx,L.hy-14.5,.85,k=>Object.assign({},NSTYLE[k%5],{sd:k+1}),0,t);glints(t);
 if(L.tik)tik(L.tik.x,L.tik.y,2,t);
 const l=L.fx-32,tp=L.fy-23,g=L.good?'#7dffb0':'#fff';c.fillStyle='rgba(60,20,100,.3)';
 c.fillRect(0,0,W,tp);c.fillRect(0,tp+46,W,252-tp-46);c.fillRect(0,tp,l,46);c.fillRect(l+64,tp,W-l-64,46);
 c.beginPath();[[l,tp,1,1],[l+64,tp,-1,1],[l,tp+46,1,-1],[l+64,tp+46,-1,-1]].forEach(q=>{c.moveTo(q[0],q[1]+q[3]*10);c.quadraticCurveTo(q[0],q[1],q[0]+q[2]*10,q[1])});ST(2.2,g);
 c.setLineDash([3,2]);RR(L.fx-14,L.fy-9,28,18,5,null,'#ffd84a',1);c.setLineDash([]);
 simon(34,216,.78,'phone',t);mariam(146,224,.7,'happy',t);
 RR(20,250,140,15,7.5,'rgba(90,45,120,.85)','#fff',.9);T(L.hint,90,257.5,'#fff',7.5);
 T('PRECISIÓN',4,270,'#fff',7,'left');bar(54,266,112,8,L.p,L.ready?'#b5ffd0':'#ffb3d9',L.ready?'#38d97a':'#ff4fa0')}
function final(S){const t=S.t;sky('#ffd9ef','#c9b2ff');bok(t,.22);sps(t);
 RR(15,50,152,134,9,'rgba(90,40,120,.2)');RR(13,47,154,134,9,lg(0,47,0,181,0,'#fff',1,'#ffe6f2'),'#ff8fc7',1.4);
 c.save();c.beginPath();c.moveTo(24,58);c.rect(24,58,132,92);c.clip();
 c.fillStyle=lg(0,58,0,150,0,'#fff0fa',1,'#d9c2ff');c.fillRect(24,58,132,92);c.fillStyle=rg(90,98,4,70,0,'rgba(255,255,255,.9)',1,'rgba(255,255,255,0)');c.fillRect(24,58,132,92);
 hands(90,98,.95,k=>Object.assign({},NSTYLE[k%5],{sd:k+1}),0,t);glints(t);c.restore();
 RR(24,58,132,92,0,null,'rgba(255,143,199,.5)',.8);T('NAIL QUEST',90,165,'#fff',10,'center','#c0408f');
 const b=i=>-Math.abs(Math.sin(t*5+i))*5;
 mariam(42,190+b(0),.85,'happy',t);mariana(90,190+b(1),.85,'work',t);simon(138,188+b(2),.8,'flex',t)}
function menu(S){const t=S.t;sky('#ffe3f1','#c9b2ff');bok(t,.22);sps(t);
 if(S.scene==='lose'){mariam(90,222,1.35,'sad',t);return}
 RR(-6,296,W+12,40,12,lg(0,296,0,336,0,'#fff3e4',1,'#ffc9e3'),OL,1);
 [[14,'#c7a6ff'],[166,'#8fd3ff']].forEach(b=>bottle(b[0],298,.8,b[1]));
 mariam(44,236,.95,'happy',t);mariana(92,235,.95,'work',t);simon(142,236,.8,'flex',t)}
function hud(S,L){if(S.scene!=='play')return;
 if(S.lv<3)for(let i=0;i<3;i++)heart(12+i*14,10,5.4,i<S.lives?lg(0,4,0,16,0,'#ff9ab8',1,'#ff2f6f'):'#cdbfe0','#7a2a55');
 const x=S.lv<3?98:62;RR(x,3,58,14,7,'rgba(90,45,120,.88)','#fff',.9);T('PTS '+S.score,x+29,10.5,'#fff',8.5);
 if(L.done&&S.lv<3){RR(-4,138,W+8,34,0,lg(0,138,0,172,0,'#ff8fc7',1,'#8f63e0'),'#fff',1.2);T('¡NIVEL SUPERADO!',90,155,'#ffe066',12)}}
const part=p=>{c.globalAlpha=Math.min(1,p.l*2);E(p.x,p.y,p.z*.6,p.z*.6,p.c);c.globalAlpha=1};
const float=f=>{c.globalAlpha=Math.min(1,f.l*2);T(f.s,f.x,f.y,f.c,9);c.globalAlpha=1};
return{l1,l2,l3,final,menu,hud,part,float};
};
