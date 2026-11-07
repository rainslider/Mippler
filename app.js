const $=s=>document.querySelector(s),view=$('#v');
let me=null,tk=localStorage.tk||'',adm='',stop=()=>{},cl=()=>{};
const E=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';'),nm=u=>E(u.name)+(u.premium?' ⭐':'');
const api=async(p,b)=>{const r=await fetch('/api/'+p,{method:b?'POST':'GET',headers:{'Content-Type':'application/json',authorization:tk,'x-admin':adm},body:b?JSON.stringify(b):undefined});
 const j=await r.json().catch(()=>({}));if(!r.ok)throw j.error||'Fout';return j};
const modal=h=>{cl();cl=()=>{};$('#mc').onclick=null;$('#mc').innerHTML=h;$('#md').hidden=false};
const closeM=()=>{cl();cl=()=>{};$('#md').hidden=true};
const ui=()=>$('#acc').innerHTML=me?nm(me)+' 🪙'+me.coins:'Inloggen';
async function refresh(){try{me=(await api('me')).u}catch{me=null}ui()}
const EM={W:'🧱',H:'🏠',C:'🚗',T:'🌳',o:'🪙',E:'👾',P:'🙂',G:'🎁',K:'🧑‍🎄',X:'🌵',M:'🌴',Z:'⚡',R:'🌈'};
const GI=new Image();GI.src='gift.png';
const spr=(x,c,i,j)=>c=='G'?x.drawImage(GI,i*32+2,j*32+2,28,28):x.fillText(EM[c],i*32+16,j*32+17);
function play(root,rows){const{x,sc}=mk(root,512,320);const g=rows.map(r=>[...r]);let px=0,py=0,n=0,tot=0,t=0;
 g.forEach((r,j)=>r.forEach((c,i)=>{if(c=='P'){px=i;py=j;g[j][i]='.'}if(c=='o'||c=='G')tot++}));const sp=[px,py];
 return run(()=>{t++;if(t%8==0){const dx=(K.ArrowRight?1:0)-(K.ArrowLeft?1:0),dy=dx?0:(K.ArrowDown?1:0)-(K.ArrowUp?1:0),c=(g[py+dy]||[])[px+dx];
  if((dx||dy)&&c&&!'WHCTKM'.includes(c)){px+=dx;py+=dy;if(c=='o'||c=='G'){g[py][px]='.';n++}if('EXZ'.includes(c)){px=sp[0];py=sp[1]}}}
 x.fillStyle='#7c7';x.fillRect(0,0,512,320);x.font='26px serif';x.textAlign='center';x.textBaseline='middle';
 g.forEach((r,j)=>r.forEach((c,i)=>{if(c!='.')spr(x,c,i,j)}));x.fillText('🙂',px*32+16,py*32+17);
 sc(tot&&n==tot?'🎉 Gewonnen!':'Munten '+n+'/'+tot+' (pijltjestoetsen)')})}
function editor(root){let tool='W',st=()=>{},g=[...Array(10)].map(()=>Array(16).fill('.'));g[1][1]='P';
 root.innerHTML='<div></div><canvas width=512 height=320></canvas><textarea rows=10 spellcheck=false></textarea><div><button>▶ Test</button><button>🚀 Publiceren</button></div><div></div>';
 const[tl,c,ta,bt,pv]=root.children,x=c.getContext('2d');
 Object.entries({'.':'🧽',...EM}).forEach(([k,e])=>{const b=document.createElement('button');b.innerHTML=k=='G'?'<img src=gift.png width=26>':e;b.onclick=()=>tool=k;tl.append(b)});
 const code=()=>g.map(r=>r.join('')).join('\n');
 const draw=s=>{x.fillStyle='#7c7';x.fillRect(0,0,512,320);x.font='26px serif';x.textAlign='center';x.textBaseline='middle';
  g.forEach((r,j)=>r.forEach((k,i)=>{if(k!='.')spr(x,k,i,j)}));if(!s)ta.value=code()};
 let dn=0;const pt=e=>{const b=c.getBoundingClientRect(),i=(e.clientX-b.left)*16/b.width|0,j=(e.clientY-b.top)*10/b.height|0;if(g[j]&&g[j][i]!==undefined){g[j][i]=tool;draw()}};
 c.onpointerdown=e=>{dn=1;pt(e)};c.onpointermove=e=>dn&&pt(e);addEventListener('pointerup',()=>dn=0);
 ta.oninput=()=>{const r=ta.value.split('\n');if(r.length==10&&r.every(l=>/^[.WHCToEPGKXMZR]{16}$/.test(l))){g=r.map(l=>[...l]);draw(1)}};
 bt.children[0].onclick=()=>{st();st=play(pv,code().split('\n'))};bt.children[1].onclick=()=>publish(code().split('\n'));draw();
 return()=>st()}
async function publish(rows){if(!me)return auth();if(!me.verified){alert('Maak eerst met 📷 een foto van je omgeving en van jezelf.');return cam()}
 const name=prompt('Naam van je game?');if(!name)return;try{await api('games',{name,rows});await refresh();alert('Gepubliceerd! +100 🪙');home()}catch(e){alert(e)}}
async function home(){stop();stop=()=>{};let us=[];try{us=await api('games')}catch{}
 view.innerHTML='<h2>Games</h2><div class=gl>'+GAMES.map(g=>`<button data-g="${g.id}">${g.i}<br>${g.n}</button>`).join('')+us.map(g=>`<button data-u="${g.id}">🎮<br>${E(g.name)}<br><small>${E(g.by)}</small></button>`).join('')+'</div>';
 view.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.g)shell(r=>{if(me)api('play',{id:b.dataset.g}).then(refresh).catch(()=>{});return G[b.dataset.g](r)});if(b.dataset.u)shell(r=>play(r,us.find(g=>g.id==b.dataset.u).rows))}}
function shell(f){stop();view.innerHTML='<button>← Terug</button><div id=gm></div>';view.onclick=e=>{if(e.target.closest('button')&&e.target.closest('button').textContent=='← Terug')home()};stop=f($('#gm'))}
function auth(){modal('<h3>Account</h3><input id=e placeholder=E-mail><input id=n placeholder=Naam><input id=p type=password placeholder=Wachtwoord><input id=c placeholder="Inlogcode (eerste keer)"><br><button id=su>Account maken</button><button id=li>Inloggen</button><p>Na het aanmaken: mail naar rainslideryoutube@gmail.com en vraag om een inlogcode.</p>');
 const v=i=>$('#'+i).value;
 $('#su').onclick=async()=>{try{await api('signup',{email:v('e'),name:v('n'),password:v('p')});alert('Gelukt! Mail nu naar rainslideryoutube@gmail.com voor je inlogcode.')}catch(e){alert(e)}};
 $('#li').onclick=async()=>{try{tk=(await api('login',{email:v('e'),password:v('p'),code:v('c')})).token;localStorage.tk=tk;closeM();refresh()}catch(e){alert(e)}}}
function room(code){modal(`<h3>Kamer ${E(code)}</h3><p>Deel deze code met premium-vrienden.</p><div class=ch id=ch></div><input id=mi><button id=ms>Stuur</button>`);
 const load=async()=>{try{const m=await api('room/'+code);$('#ch').innerHTML=m.map(x=>'<div><b>'+E(x.n)+'</b>: '+E(x.t)+'</div>').join('')}catch{}};
 const t=setInterval(load,2000);cl=()=>clearInterval(t);load();
 $('#ms').onclick=async()=>{const i=$('#mi');try{await api('room/'+code+'/msg',{t:i.value});i.value='';load()}catch(e){alert(e)}}}
function acct(){if(!me)return auth();
 modal(`<h3>${nm(me)}</h3><p>🪙 ${me.coins} munten ${me.premium?'· ⭐ Premium':''}</p>`+(me.premium?'<p><input id=nn placeholder="Nieuwe naam"><button id=rn>Naam veranderen</button></p><p><button id=mk>Kamer maken</button><input id=jc placeholder=Join-code><button id=jn>Join</button></p>':'<button id=bp>Premium kopen (500 🪙)</button>')+'<p>Munten verdienen: game publiceren (+100), elke game 1x spelen (+20).</p><button id=lo>Uitloggen</button>');
 const o=(i,f)=>$(i)&&($(i).onclick=async()=>{try{await f()}catch(e){alert(e)}});
 o('#bp',async()=>{await api('premium',{});await refresh();acct()});o('#rn',async()=>{await api('rename',{name:$('#nn').value});await refresh();acct()});
 o('#mk',async()=>room((await api('room',{})).code));o('#jn',async()=>{const c=$('#jc').value.trim().toUpperCase();await api('room/join',{code:c});room(c)});
 o('#lo',()=>{localStorage.tk=tk='';me=null;ui();closeM()})}
function snap(t,f){return new Promise((ok,no)=>{modal(`<h3>${t}</h3><p><small>Alleen live-camera. De foto wordt alleen aan de beheerder getoond.</small></p><video autoplay playsinline muted></video><br><button id=sn>📸 Foto</button>`);const v=$('#mc video');
 navigator.mediaDevices.getUserMedia({video:{facingMode:f}}).then(s=>{v.srcObject=s;cl=()=>s.getTracks().forEach(t=>t.stop());
  $('#sn').onclick=()=>{const c=document.createElement('canvas');c.width=320;c.height=Math.round(320*v.videoHeight/v.videoWidth)||240;c.getContext('2d').drawImage(v,0,0,c.width,c.height);cl();ok(c.toDataURL('image/jpeg',.6))}}).catch(()=>{modal('<p>Camera niet beschikbaar of geweigerd.</p>');no()})})}
async function cam(){if(!me)return auth();try{const a=await snap('Maak een foto van je omgeving','environment'),b=await snap('Maak een foto van jezelf','user');
 await api('verify',{env:a,selfie:b});await refresh();modal('<p>✅ Klaar! Je kunt nu je game publiceren.</p>')}catch(e){}}
async function admin(){if(!adm)adm=prompt('Admin-code')||'';
 try{const d=await api('admin/all');
  modal('<h3>Admin</h3><p>Inlogcode maken voor e-mail:<br><input id=ae><button id=ac>Maak code</button> <b id=ao></b></p><h4>Accounts</h4>'+d.users.map(u=>`<div>${nm(u)} (${E(u.email)}) 🪙${u.coins} ${u.verified?`<button data-v="${u.id}">📷</button>`:''}<button data-c="${u.id}">+🪙</button><button data-d="${u.id}">🗑️</button></div>`).join('')+'<h4>Games</h4>'+d.games.map(g=>`<div>${E(g.name)} — ${E(g.by)} <button data-g="${g.id}">🗑️</button></div>`).join(''));
  $('#ac').onclick=async()=>{try{$('#ao').textContent=(await api('admin/code',{email:$('#ae').value})).code}catch(e){alert(e)}};
  $('#mc').onclick=async e=>{const b=e.target.closest('button[data-d],button[data-c],button[data-g],button[data-v]');if(!b)return;const D=b.dataset;
   try{if(D.d&&confirm('Account verwijderen?'))await api('admin/delete',{user:D.d});if(D.g&&confirm('Game verwijderen?'))await api('admin/delete',{game:D.g});
    if(D.c)await api('admin/coins',{user:D.c,amount:+prompt('Hoeveel munten?',100)});
    if(D.v){const p=await api('admin/photos/'+D.v);modal('<img src="'+p.env+'"><img src="'+p.selfie+'">');return}admin()}catch(e){alert(e)}}
 }catch(e){adm='';alert('Mislukt: '+e)}}
$('#adm').onclick=admin;$('#acc').onclick=acct;$('#camb').onclick=cam;$('#md .x').onclick=closeM;
$('#plus').onclick=()=>{stop();view.innerHTML='<button>← Terug</button><div id=gm></div>';view.onclick=e=>{const b=e.target.closest('button');if(b&&b.textContent=='← Terug')home()};stop=editor($('#gm'))};
refresh();home();
