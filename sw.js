/* ثابت لا يتغير بين الإصدارات حتى لا يُحدَّث البرنامج دون علم المستخدم.
   التحديث الفعلي يتم من داخل الصفحة عند ضغط «تحديث الآن». */
const CACHE='gradebook-app',FILES=['./','index.html','manifest.json','icon.svg','icon-192.png','icon-512.png','icon-maskable-192.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=CACHE&&x.startsWith('gradebook-')).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!='GET'||u.origin!=location.origin||u.pathname.endsWith('version.json'))return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).catch(()=>caches.match('index.html'))))});
