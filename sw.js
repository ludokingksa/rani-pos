const V='rani-flat-v31',FILES=['./','index.html','pos.html','report.html','stock.html','production.html','expense.html','users.html','settings.html','profile.html','about.html','contact.html','i18n.js','theme.css','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
// cache-first (fast + offline), refresh in background
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(m=>{
  const net=fetch(e.request).then(r=>{if((r.ok&&new URL(e.request.url).origin===location.origin)||(r.type==='opaque'&&e.request.destination==='image')){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>m);
  return m||net}))});
