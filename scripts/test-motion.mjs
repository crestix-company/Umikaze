import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Behavioral tests for preferences and failure paths that do not require altering OS settings.
const script=readFileSync('dist/assets/site.js','utf8');
class Element {
  constructor(){this.attrs=new Map();this.events={};this.hidden=false;this.styles={};const set=new Set();this.classList={add:(...v)=>v.forEach(x=>set.add(x)),remove:v=>set.delete(v),contains:v=>set.has(v),toggle:(v,on)=>on?set.add(v):set.delete(v)};this.style={setProperty:(k,v)=>this.styles[k]=v};}
  addEventListener(type,fn){(this.events[type]??=[]).push(fn);}
  emit(type,e={}){for(const fn of this.events[type]??[])fn(e);}
  setAttribute(k,v){this.attrs.set(k,v);}
  getAttribute(k){return this.attrs.get(k)??null;}
  removeAttribute(k){this.attrs.delete(k);}
  getBoundingClientRect(){return {top:85,bottom:844,height:759};}
}
function setup({reduced=false,mobile=false,saveData=false,blocked=false,hasVideo=true}={}) {
  const film=new Element(),button=new Element(),hero=new Element(),menu=new Element(),menuButton=new Element();
  menu.hidden=true;film.paused=true;film.requests=[];film.dataset={mobileSrc:'assets/garden-film-mobile.mp4',desktopSrc:'assets/garden-film.mp4'};
  Object.defineProperty(film,'src',{set(v){film.setAttribute('src',v);film.requests.push(v);}});
  film.play=()=>{if(blocked)return Promise.reject(new Error('Autoplay blocked'));film.paused=false;film.emit('play');return Promise.resolve();};
  film.pause=()=>{film.paused=true;film.emit('pause');};
  film.load=()=>{};
  const document=new Element();document.hidden=false;document.body=new Element();document.documentElement=new Element();
  const nodes={'.garden-film':hasVideo?film:null,'.film-toggle':hasVideo?button:null,'.hero-film':hasVideo?hero:null,'.menu-toggle':menuButton,'#mobile-nav':menu};
  document.querySelector=s=>nodes[s]??null;document.querySelectorAll=()=>[];
  const media=new Map();
  const window=new Element();window.matchMedia=s=>{if(!media.has(s)){const m=new Element();m.matches=s.includes('reduced-motion')?reduced:s.includes('max-width: 700')?mobile:!mobile;media.set(s,m);}return media.get(s);};
  const observers=[];
  class Observer{constructor(fn){this.fn=fn;observers.push(this);}observe(target){this.target=target;}unobserve(){}disconnect(){}}
  window.IntersectionObserver=Observer;
  vm.runInNewContext(script,{document,window,navigator:{connection:{saveData}},IntersectionObserver:Observer,innerHeight:844,requestAnimationFrame:fn=>{fn();return 1;}});
  return {film,button,document,window,media,videoObserver:observers.find(o=>o.target===hero)};
}
for(const mobile of [false,true]){
  const t=setup({mobile});
  assert.equal(t.film.paused,false);assert.equal(t.film.muted,true);
  assert.deepEqual(t.film.requests,[`assets/garden-film${mobile?'-mobile':''}.mp4`]);
  t.button.emit('click');assert.equal(t.film.paused,true);assert.equal(t.button.getAttribute('aria-label'),'背景動画を再生');
  t.videoObserver.fn([{isIntersecting:false}]);t.videoObserver.fn([{isIntersecting:true}]);assert.equal(t.film.paused,true,'Keep user pause on returning to hero');
  t.button.emit('click');assert.equal(t.film.paused,false);
  t.videoObserver.fn([{isIntersecting:false}]);assert.equal(t.film.paused,true);
  t.videoObserver.fn([{isIntersecting:true}]);assert.equal(t.film.paused,false);
  t.document.hidden=true;t.document.emit('visibilitychange');assert.equal(t.film.paused,true);
  t.document.hidden=false;t.document.emit('visibilitychange');assert.equal(t.film.paused,false);
}
for(const options of [{reduced:true},{saveData:true}]){
  const t=setup(options);assert.equal(t.film.requests.length,0);assert.equal(t.film.paused,true);assert.equal(t.button.hidden,false);
  if(options.reduced)assert.equal(t.document.documentElement.classList.contains('motion-on'),false);
  t.button.emit('click');assert.equal(t.film.paused,false,'Explicit playback is available');
}
const changing=setup();const preference=changing.media.get('(prefers-reduced-motion: reduce)');preference.matches=true;preference.emit('change');
assert.equal(changing.film.paused,true);assert.equal(changing.document.documentElement.classList.contains('motion-on'),false);
const blocked=setup({blocked:true});await Promise.resolve();assert.equal(blocked.film.paused,true);assert.equal(blocked.button.getAttribute('aria-label'),'背景動画を再生');
const failed=setup();failed.film.emit('error');assert.equal(failed.film.getAttribute('src'),null);assert.equal(failed.button.hidden,true);
failed.videoObserver.fn([{isIntersecting:true}]);assert.equal(failed.film.requests.length,1,'No failure retry loop');
setup({hasVideo:false});
console.log('PASS: responsive source, pause/resume, offscreen/background, reduced motion, data saver, autoplay block, failed-source poster, secondary pages.');
