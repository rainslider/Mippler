const K={},P={x:null,y:null},G={};
addEventListener('keydown',e=>{K[e.key]=1;if(e.key.startsWith('Arrow')||e.key==' ')e.preventDefault()});
addEventListener('keyup',e=>K[e.key]=0);
function mk(r,w=400,h=300){r.innerHTML='<canvas width='+w+' height='+h+'></canvas><p class=sc></p>';const c=r.firstChild;P.x=P.y=null;
 c.onpointermove=e=>{const b=c.getBoundingClientRect();P.x=(e.clientX-b.left)*w/b.width;P.y=(e.clientY-b.top)*h/b.height};c.onpointerdown=()=>K.tap=1;
 return{x:c.getContext('2d'),sc:v=>r.lastChild.textContent=v}}
const run=f=>{const t=setInterval(f,1000/60);return()=>clearInterval(t)};
const GAMES=[['snake','Snake','🐍'],['pong','Pong','🏓'],['breakout','Breakout','🧱'],['flappy','Flappy','🐤'],['memory','Memory','🧠'],['tictactoe','Boter-kaas-eieren','❌'],['mol','Mollen mep','🐹'],['shooter','Space Shooter','🚀'],['dodge','Ontwijken','☄️'],['runner','Runner','🏃']].map(a=>({id:a[0],n:a[1],i:a[2]}));
G.snake=r=>{const{x,sc}=mk(r,400,400);let s=[[10,10]],d=[1,0],f=[5,5],n=0;
 const t=setInterval(()=>{if(K.ArrowUp&&d[1]!=1)d=[0,-1];if(K.ArrowDown&&d[1]!=-1)d=[0,1];if(K.ArrowLeft&&d[0]!=1)d=[-1,0];if(K.ArrowRight&&d[0]!=-1)d=[1,0];
 const h=[s[0][0]+d[0],s[0][1]+d[1]];
 if(h[0]<0||h[1]<0||h[0]>19||h[1]>19||s.some(p=>p[0]==h[0]&&p[1]==h[1])){s=[[10,10]];d=[1,0];n=0}
 else{s.unshift(h);if(h[0]==f[0]&&h[1]==f[1]){n++;f=[Math.random()*20|0,Math.random()*20|0]}else s.pop()}
 x.fillStyle='#111';x.fillRect(0,0,400,400);x.fillStyle='#0f0';s.forEach(p=>x.fillRect(p[0]*20,p[1]*20,19,19));x.fillStyle='red';x.fillRect(f[0]*20,f[1]*20,19,19);sc('Score '+n)},120);
 return()=>clearInterval(t)};
G.pong=r=>{const{x,sc}=mk(r);let b={x:200,y:150,vx:3,vy:2},p=120,a=120,s=[0,0];
 return run(()=>{if(K.ArrowUp)p-=5;if(K.ArrowDown)p+=5;if(P.y!=null&&!K.ArrowUp&&!K.ArrowDown)p=P.y-30;p=Math.max(0,Math.min(240,p));
 a+=Math.sign(b.y-a-30)*2.6;b.x+=b.vx;b.y+=b.vy;if(b.y<0||b.y>300)b.vy*=-1;
 if(b.x<20&&b.y>p&&b.y<p+60&&b.vx<0)b.vx*=-1.05;if(b.x>380&&b.y>a&&b.y<a+60&&b.vx>0)b.vx*=-1.05;
 if(b.x<0||b.x>400){s[b.x<0?1:0]++;b={x:200,y:150,vx:b.x<0?3:-3,vy:2}}
 x.fillStyle='#111';x.fillRect(0,0,400,300);x.fillStyle='#fff';x.fillRect(10,p,8,60);x.fillRect(382,a,8,60);x.fillRect(b.x-4,b.y-4,8,8);sc(s.join(' - '))})};
G.breakout=r=>{const{x,sc}=mk(r);let bl=[],p=170,b,v,n=0;
 const init=()=>{bl=[];for(let i=0;i<40;i++)bl.push([i%10*40,30+(i/10|0)*16]);b=[200,200];v=[3,-3]};init();
 return run(()=>{if(K.ArrowLeft)p-=6;if(K.ArrowRight)p+=6;if(P.x!=null&&!K.ArrowLeft&&!K.ArrowRight)p=P.x-30;
 b[0]+=v[0];b[1]+=v[1];if(b[0]<0||b[0]>400)v[0]*=-1;if(b[1]<0)v[1]*=-1;
 if(b[1]>280&&b[1]<292&&b[0]>p&&b[0]<p+60&&v[1]>0)v[1]*=-1;if(b[1]>300){b=[200,200];v=[3,-3]}
 bl=bl.filter(k=>{if(b[0]>k[0]&&b[0]<k[0]+38&&b[1]>k[1]&&b[1]<k[1]+14){v[1]*=-1;n++;return 0}return 1});if(!bl.length)init();
 x.fillStyle='#111';x.fillRect(0,0,400,300);x.fillStyle='orange';bl.forEach(k=>x.fillRect(k[0],k[1],38,14));x.fillStyle='#fff';x.fillRect(p,290,60,8);x.fillRect(b[0]-4,b[1]-4,8,8);sc('Score '+n)})};
G.flappy=r=>{const{x,sc}=mk(r);let y=150,v=0,ps=[[400,100]],n=0,f=0;
 const kd=e=>{if(e.key==' ')v=-6};addEventListener('keydown',kd);r.firstChild.onpointerdown=()=>v=-6;
 const st=run(()=>{v+=.35;y+=v;f++;if(f%90==0)ps.push([400,60+Math.random()*140]);ps.forEach(p=>p[0]-=2);if(ps[0][0]<-40){ps.shift();n++}
 if(y>300||y<0||ps.some(p=>p[0]<66&&p[0]>10&&(y<p[1]-45||y>p[1]+45))){y=150;v=0;ps=[[400,100]];n=0}
 x.fillStyle='#4ac';x.fillRect(0,0,400,300);x.fillStyle='#2a2';ps.forEach(p=>{x.fillRect(p[0],0,40,p[1]-45);x.fillRect(p[0],p[1]+45,40,300)});x.fillStyle='#ff0';x.fillRect(50,y-8,16,16);sc('Score '+n)});
 return()=>{st();removeEventListener('keydown',kd)}};
G.memory=r=>{const e=['🐶','🐱','🦊','🐸','🐵','🐼','🦁','🐙'];const a=[...e,...e].sort(()=>Math.random()-.5);let o=[],m=0;
 r.innerHTML='<div class=mg></div><p class=sc>Zetten 0</p>';const g=r.firstChild;
 a.forEach(v=>{const b=document.createElement('button');b.textContent='❓';b.onclick=()=>{if(o.length>1||b.dataset.d||o[0]==b)return;b.textContent=v;o.push(b);
  if(o.length==2){if(o[0].textContent==v){o.forEach(q=>q.dataset.d=1);o=[]}else setTimeout(()=>{o.forEach(q=>q.textContent='❓');o=[]},600);m++;r.lastChild.textContent='Zetten '+m}};g.append(b)});
 return()=>{}};
G.tictactoe=r=>{let B=Array(9).fill(''),end='';
 const W=()=>[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].find(l=>B[l[0]]&&B[l[0]]==B[l[1]]&&B[l[1]]==B[l[2]]);
 const chk=()=>{const w=W();if(w)end=B[w[0]]+' wint!';else if(B.every(v=>v))end='Gelijkspel'};
 const d=()=>{r.innerHTML='<div class=mg style="grid-template-columns:repeat(3,70px)"></div><p class=sc>'+(end||'Jij bent X')+'</p>';
  B.forEach((v,i)=>{const b=document.createElement('button');b.textContent=v;b.onclick=()=>{if(B[i]||end)return;B[i]='X';chk();
   if(!end){const f=B.map((v,i)=>v?-1:i).filter(i=>i>=0);if(f.length){B[f[Math.random()*f.length|0]]='O';chk()}}d()};r.firstChild.append(b)})};
 d();return()=>{}};
G.mol=r=>{r.innerHTML='<div class=mg style="grid-template-columns:repeat(3,70px)"></div><p class=sc></p>';let s=0,t=30,h=-1;
 const u=()=>{bs.forEach((b,i)=>b.textContent=i==h?'🐹':'🕳️');r.lastChild.textContent='Score '+s+' | Tijd '+t};
 const bs=[...Array(9)].map((_,i)=>{const b=document.createElement('button');b.onclick=()=>{if(i==h){s++;h=-1;u()}};r.firstChild.append(b);return b});u();
 const a=setInterval(()=>{h=Math.random()*9|0;u()},700),c=setInterval(()=>{if(t>0)t--;else{s=0;t=30}u()},1000);
 return()=>{clearInterval(a);clearInterval(c)}};
G.shooter=r=>{const{x,sc}=mk(r);let p=180,bs=[],es=[],n=0,f=0;
 return run(()=>{f++;if(K.ArrowLeft)p-=5;if(K.ArrowRight)p+=5;if(P.x!=null&&!K.ArrowLeft&&!K.ArrowRight)p=P.x-15;p=Math.max(0,Math.min(370,p));
 if(f%12==0)bs.push([p+13,270]);if(f%35==0)es.push([Math.random()*370,0]);bs.forEach(b=>b[1]-=6);es.forEach(e=>e[1]+=1.5);
 es=es.filter(e=>{const i=bs.findIndex(b=>b[0]>e[0]&&b[0]<e[0]+30&&b[1]<e[1]+20&&b[1]>e[1]);if(i>=0){bs.splice(i,1);n++;return 0}if(e[1]>270){n=0;return 0}return 1});
 bs=bs.filter(b=>b[1]>0);x.fillStyle='#012';x.fillRect(0,0,400,300);x.fillStyle='#0ff';x.fillRect(p,275,30,15);x.fillStyle='#ff0';bs.forEach(b=>x.fillRect(b[0],b[1],4,10));x.fillStyle='#f55';es.forEach(e=>x.fillRect(e[0],e[1],30,20));sc('Score '+n)})};
G.dodge=r=>{const{x,sc}=mk(r);let p=185,bl=[],f=0;
 return run(()=>{f++;if(K.ArrowLeft)p-=5;if(K.ArrowRight)p+=5;if(P.x!=null&&!K.ArrowLeft&&!K.ArrowRight)p=P.x-15;p=Math.max(0,Math.min(370,p));
 if(f%20==0)bl.push([Math.random()*370,0]);bl.forEach(b=>b[1]+=3+f/600);
 if(bl.some(b=>b[1]>240&&b[1]<290&&Math.abs(b[0]-p)<30)){f=0;bl=[]}bl=bl.filter(b=>b[1]<300);
 x.fillStyle='#223';x.fillRect(0,0,400,300);x.fillStyle='#fa0';x.fillRect(p,270,30,20);x.fillStyle='#f33';bl.forEach(b=>x.fillRect(b[0],b[1],30,30));sc('Tijd '+(f/60|0)+'s')})};
G.runner=r=>{const{x,sc}=mk(r);let y=0,v=0,o=[],f=0,s=0;
 return run(()=>{f++;s++;if((K[' ']||K.ArrowUp||K.tap)&&y==0)v=10;K.tap=0;v-=.5;y=Math.max(0,y+v);if(y==0)v=0;
 if(f%80==0)o.push(400);o=o.map(a=>a-4-s/1000);if(o.some(a=>a<70&&a>15&&y<25)){s=0;o=[]}o=o.filter(a=>a>-30);
 x.fillStyle='#ddd';x.fillRect(0,0,400,300);x.fillStyle='#555';x.fillRect(0,250,400,50);x.fillStyle='#08f';x.fillRect(40,220-y,30,30);x.fillStyle='#a00';o.forEach(a=>x.fillRect(a,225,25,25));sc('Score '+(s/10|0))})};
