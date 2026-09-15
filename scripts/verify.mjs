import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import assert from 'node:assert/strict';
import {siteBasePath,localTarget} from './site-path.mjs';
const root=resolve('dist');const files=readdirSync(root).filter(x=>x.endsWith('.html'));let links=0,assets=new Set();
for(const file of files){const html=readFileSync(resolve(root,file),'utf8');assert(html.includes('lang="ja"'),`${file}: language`);assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: heading`);assert(html.includes('<title>')&&!html.includes('README'),`${file}: real page`);for(const [,attr,value] of html.matchAll(/\b(href|src)="([^"]+)"/g)){if(/^(https?:|tel:|data:)/.test(value))continue;const [path,hash]=value.split('#');const target=localTarget(path,file);const abs=resolve(root,target);assert(existsSync(abs),`${file}: ${value} missing`);if(hash&&abs.endsWith('.html')){assert(readFileSync(abs,'utf8').includes(`id="${hash}"`),`${file}: anchor ${value}`)}if(attr==='src')assets.add(target);links++}for(const [,srcset]of html.matchAll(/srcset="([^"]+)"/g)){for(const item of srcset.split(',')){const path=item.trim().split(' ')[0];assert(existsSync(resolve(root,path)),`${file}: ${path}`);assets.add(path)}}for(const tag of html.match(/<img\b[^>]*>/g)||[])assert(/alt="[^"]+"/.test(tag)&&/width=/.test(tag)&&/height=/.test(tag),`${file}: image dimensions or alt`);assert(!/コース|仮文言|Lorem ipsum|TAMANOIE|玉の家|ForestGarden/.test(html),`${file}: stale content`)}
const access=readFileSync(resolve(root,'access.html'),'utf8');for(const fact of ['070-2218-6869','石橋1563-2','定休日：火曜日','10月〜6月','7月・8月・9月','6:00〜9:00','17:00〜21:00','11:00〜19:30','11:00〜21:00','水・木・日','月・金・土','縦列駐車'])assert(access.includes(fact),`Access fact missing: ${fact}`);
const guide=readFileSync(resolve(root,'guide.html'),'utf8');for(const fact of ['狂犬病','混合ワクチン','動物病院','WanPass','https://wanpass.me/','大型犬','リード'])assert(guide.includes(fact),`Dog guide missing: ${fact}`);
const home=readFileSync(resolve(root,'index.html'),'utf8');
for(const file of ['index.html','menu.html','guide.html','access.html']){
  const html=readFileSync(resolve(root,file),'utf8');
  assert(html.includes('雨の日は臨時休業となります。'),`${file}: rain closure notice missing`);
  assert(!/雨の日はテイクアウトで|テイクアウトのみ|ハンドメイドのお店は営業しています/.test(html),`${file}: outdated rainy-day policy`);
}
for(const file of ['menu.html','guide.html']){
  assert(readFileSync(resolve(root,file),'utf8').includes('テイクアウトの営業も行っておりません。'),`${file}: rain takeout suspension missing`);
}
const video=home.match(/<video\b[^>]*>/)?.[0];
assert(video&&['autoplay','muted','loop','playsinline','preload="none"'].every(attr=>video.includes(attr)),'Video playback and loading attributes');
for(const [,path] of video.matchAll(/(?:poster|data-desktop-src|data-mobile-src)="([^"]+)"/g)){
  assert(existsSync(resolve(root,path)),`Video asset missing: ${path}`);assets.add(path);
}
assert(statSync(resolve(root,'assets/garden-film.mp4')).size<3600000,'Desktop video budget');
assert(statSync(resolve(root,'assets/garden-film-mobile.mp4')).size<2000000,'Mobile video budget');
assert(home.includes('背景動画を一時停止')&&home.includes('assets/motion.css'),'Video control and motion stylesheet');
assert(readFileSync(resolve(root,'404.html'),'utf8').includes(`href="${siteBasePath}"`),'404 home link must use the deployment base path');
const base=process.argv[2];
if(base){
  assert.equal(new URL(base).pathname,siteBasePath,'Live URL must match SITE_BASE_PATH');
  for(const file of ['',...files,...assets,'assets/site.css','assets/layout.css','assets/motion.css','assets/site.js']){
    const response=await fetch(new URL(file,base),{signal:AbortSignal.timeout(30000)});
    assert.equal(response.status,200,`${file||'/'}: HTTP ${response.status}`);
    const expected=file||'index.html';
    if(expected.endsWith('.mp4'))assert(response.headers.get('content-type')?.includes('video/mp4'),`${file}: video MIME type`);
    assert(Buffer.from(await response.arrayBuffer()).equals(readFileSync(resolve(root,expected))),`${file||'/'}: served bytes differ`);
  }
}
console.log(JSON.stringify({pages:files.length,localLinksChecked:links,assets:assets.size,assetBytes:[...assets].reduce((n,p)=>n+statSync(resolve(root,p)).size,0),liveContentMatched:!!base,status:'PASS'},null,2));
