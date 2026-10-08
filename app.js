import content from './content.js';
import {setupMotion} from './motion.js';
import {e,lines,arrow,up,header,footer,scene,chrome,overview,setupMenu} from './ui.js';

const initialParams=new URLSearchParams(location.search);
const initialStep=flow=>initialParams.get('flow')===flow.id?Math.max(0,Math.min(flow.steps.length-1,parseInt(initialParams.get('step'),10)||0)):flow.id==='video'?4:0;
const resultPanel=flow=>`<section class="actual-result inline-result" aria-label="${e(flow.shortTitle)}的最终结果" hidden><div><span class="eyebrow">THE FINISHED WORK</span><h3>${e(flow.resultTitle)}</h3><p>${flow.resultMeta.map(e).join(' · ')}</p></div>${flow.download?`<a class="pill pill-result" href="${e(flow.download)}" download="${e(flow.downloadName)}">下载原图 ↓</a>`:''}</section>`;
const stepButtons=(flow,index=0)=>flow.steps.map((step,i)=>`<button type="button" data-step="${i}" aria-label="${e(step.title)}" aria-pressed="${i===index}" class="${i===index?'active':''}"><span>${String(i+1).padStart(2,'0')}</span><b>${e(step.title)}</b><i></i></button>`).join('');
const samples=()=>`<div class="video-samples"><div class="sample-heading"><h3>${e(content.videoSamples.title)}</h3></div><div class="sample-grid">${content.videoSamples.items.map(item=>{const m=content.media[item.media];return `<figure><video src="${e(m.src)}" poster="${e(m.poster)}" controls playsinline muted loop preload="metadata" aria-label="${e(m.alt)}"></video><figcaption><b>${e(item.title)}</b><span>${e(item.duration)}</span></figcaption></figure>`;}).join('')}</div></div>`;

const showcase=()=>`<section class="work-ribbon" aria-label="探索项目作品"><div class="ribbon-heading"><div><span class="eyebrow">IDEAS, ALREADY IN MOTION.</span><p>拖动浏览作品，点击定位下方流程。</p></div><div class="ribbon-arrows"><button type="button" data-ribbon-shift="-1" aria-label="向前浏览作品">←</button><button type="button" data-ribbon-shift="1" aria-label="向后浏览作品">→</button></div></div><div class="ribbon-track" tabindex="0" role="region" aria-label="作品预览，可拖动或使用左右方向键">${content.motion.showcase.map(item=>{const m=content.media[item.media];return `<a class="ribbon-card" data-media="${e(item.media)}" href="#flow-${e(item.flow)}" aria-label="${e(item.title)}，查看对应创作流程"><img src="${e(m.poster||m.src)}" alt="${e(item.title)}" width="330" height="184" loading="lazy" draggable="false"><div><b>${e(item.title)}</b>${up}</div><div><span>${e(item.label)}</span></div></a>`;}).join('')}</div></section>`;
const dock=()=>`<nav class="flow-dock" aria-label="快速切换创作流程" inert>${content.flows.map((f,i)=>`<a href="#flow-${f.id}" aria-label="跳转到${e(f.shortTitle)}"><span>${f.number}</span>${['图标','海报','场景','视频','作品','交付'][i]}</a>`).join('')}</nav>`;

document.title=content.metadata.title;
document.querySelector('#app').innerHTML=`${header()}
<main id="main">
 <section class="hero" id="top">
  <canvas class="hero-atmosphere" aria-hidden="true"></canvas>
  <div class="hero-wordmark"><span>${e(content.brand.name)}</span><h1>${content.hero.english}</h1></div>
  <div class="hero-kicker">${content.hero.label}</div>
  <div class="hero-stage"><div class="hero-product">${overview()}</div><div class="hero-platform"></div></div>
  <div class="hero-bottom"><div><h2>${lines(content.hero.heading)}</h2><p>${e(content.hero.description)}</p></div><div class="hero-actions"><a href="#demos" class="hero-watch">看看实际工作台 <span>↓</span></a></div></div>
  <div class="hero-baseline"><span>DESIGNED FOR THE WAY YOU CREATE.</span><span>SCROLL TO EXPLORE ↓</span></div>
 </section>
 <section class="intro" id="features"><div class="intro-top"><span class="eyebrow">ONE PROJECT. ONE PLACE.</span><span class="eyebrow">01 — 06</span></div><div class="intro-copy"><h2>${lines(content.intro.title)}</h2><p>${e(content.intro.description)}</p></div><div class="feature-list">${content.features.map(f=>`<article><span>${f.number}</span><div><h3>${e(f.title)}</h3><p>${e(f.description)}</p></div>${up}</article>`).join('')}</div></section>
 ${showcase()}
 <section class="demos-intro" id="demos"><span class="eyebrow">INSIDE THE REAL WORKSPACE.</span><h2>从过程，<br><em>到作品。</em></h2><p>打开真实的${e(content.brand.name)}。${content.flows.length} 条流程，${content.flows.reduce((sum,flow)=>sum+flow.steps.length,0)} 个真实页面状态。</p><nav class="demo-jump" aria-label="选择演示">${content.flows.map(f=>`<a href="#flow-${f.id}">${f.shortTitle}</a>`).join('')}</nav></section>
 <div class="chapters">${content.flows.map((flow,i)=>{const initial=initialStep(flow);return `<section class="chapter ${i%2?'chapter-light':''}" id="flow-${flow.id}"><div class="chapter-heading"><div class="chapter-index">${flow.number}</div><div><span class="eyebrow">${flow.english}</span><h2>${e(flow.shortTitle)}</h2><p>${e(flow.description)}</p></div></div><div class="demo-player" data-player="${flow.id}" data-initial="${initial}"><div class="player-stage">${chrome(flow,scene(flow,initial,{compact:true}))}</div><div class="player-controls"><button type="button" class="play-button" data-play aria-label="暂停${flow.shortTitle}演示">Ⅱ</button><div class="player-steps">${stepButtons(flow,initial)}</div><span class="player-clock">${String(initial+1).padStart(2,'0')} / ${String(flow.steps.length).padStart(2,'0')}</span></div></div><div class="chapter-bottom"><p class="player-caption">${e(flow.steps[initial].caption)}</p><div class="player-actions" aria-label="${e(flow.shortTitle)}流程控制"><button type="button" data-zoom aria-haspopup="dialog">放大查看</button><button type="button" data-result>查看结果</button><span class="player-action-divider" aria-hidden="true"></span><button type="button" data-prev>← 上一步</button><button type="button" data-next>下一步 →</button></div></div>${resultPanel(flow)}${flow.id==='video'?samples():''}</section>`;}).join('')}</div>
 <section class="faq"><h2>还有几件事。</h2><div>${content.faq.map(f=>`<details><summary>${e(f.question)}<span>＋</span></summary><p>${e(f.answer)}</p></details>`).join('')}</div></section>
 <section class="ending"><span class="eyebrow">YOUR NEXT GAME STARTS HERE.</span><p>把下一次灵感，做出来。</p><div class="ending-word">${e(content.brand.name)}<span>。</span></div><a href="#demos" class="pill pill-light">再看一次演示 ${arrow}</a></section>
</main>${dock()}${footer()}<dialog class="screen-dialog" aria-label="实际页面放大预览"><div class="screen-dialog-toolbar"><b></b><button type="button" data-close-zoom aria-label="关闭放大预览" autofocus>关闭 ×</button></div><div class="screen-dialog-content"></div></dialog>`;
setupMenu();

const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const players=[];
const dialog=document.querySelector('.screen-dialog');
let effectsEnabled=!reduce.matches;
let enlargedPlayer=null;
let previousOverflow='';
function syncVideos(player){
 player.root.querySelectorAll('video').forEach(video=>{
  if(player.visible&&!document.hidden&&effectsEnabled&&!dialog.open)video.play().catch(()=>{});
  else video.pause();
 });
}
function syncDialogVideos(){
 dialog.querySelectorAll('video').forEach(video=>{
  if(dialog.open&&!document.hidden&&effectsEnabled)video.play().catch(()=>{});
  else video.pause();
 });
}
function openPreview(player){
 player.playing=false;player.resumeAfterMotion=false;player.sync();
 enlargedPlayer=player;
 dialog.querySelector('.screen-dialog-toolbar b').textContent=`${player.flow.shortTitle} · ${player.flow.steps[player.index].title}`;
 dialog.querySelector('.screen-dialog-content').innerHTML=scene(player.flow,player.index);
 previousOverflow=document.body.style.overflow;
 document.body.style.overflow='hidden';
 dialog.showModal();
 players.forEach(syncVideos);
 document.querySelectorAll('.sample-grid video').forEach(video=>video.pause());
 syncDialogVideos();
}
dialog.querySelector('[data-close-zoom]').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();});
dialog.addEventListener('close',()=>{
 dialog.querySelectorAll('video').forEach(video=>video.pause());
 dialog.querySelector('.screen-dialog-content').replaceChildren();
 document.body.style.overflow=previousOverflow;
 if(enlargedPlayer)syncVideos(enlargedPlayer);
 enlargedPlayer=null;
 syncSamples();
});
for(const root of document.querySelectorAll('[data-player]')){
 const flow=content.flows.find(f=>f.id===root.dataset.player);
 const chapter=root.closest('.chapter');
 const p={root,flow,index:Number(root.dataset.initial),elapsed:0,playing:!reduce.matches,visible:false};
 const button=root.querySelector('[data-play]');
 const isLast=()=>p.index===flow.steps.length-1;
 const sync=()=>{
  button.textContent=p.playing?'Ⅱ':isLast()?'↺':'▶';
  button.setAttribute('aria-label',`${p.playing?'暂停':isLast()?'重新播放':'播放'}${flow.shortTitle}流程演示`);
  button.setAttribute('aria-pressed',String(p.playing));
  root.classList.toggle('is-paused',!p.playing);
  syncVideos(p);
 };
 p.render=()=>{
  root.querySelector('.scene').outerHTML=scene(flow,p.index,{compact:true});
  root.querySelectorAll('[data-step]').forEach((b,i)=>{b.classList.toggle('active',i===p.index);b.setAttribute('aria-pressed',String(i===p.index));});
  root.querySelector('.player-clock').textContent=`${String(p.index+1).padStart(2,'0')} / ${String(flow.steps.length).padStart(2,'0')}`;
  chapter.querySelector('.player-caption').textContent=flow.steps[p.index].caption;
  chapter.querySelector('[data-prev]').disabled=p.index===0;
  chapter.querySelector('[data-next]').textContent=isLast()?'从头查看 ↺':'下一步 →';
  chapter.querySelector('[data-result]').disabled=isLast();
  chapter.querySelector('.inline-result').hidden=!isLast();
  root.style.setProperty('--step-progress',isLast()?'100%':'0%');
  if(isLast())p.playing=false;
  sync();
 };
 p.sync=sync;
 p.select=index=>{
  p.index=Math.max(0,Math.min(flow.steps.length-1,index));p.elapsed=0;p.playing=false;p.resumeAfterMotion=false;p.render();
  const steps=root.querySelector('.player-steps'),active=steps.querySelector('.active');
  if(active.offsetLeft<steps.scrollLeft||active.offsetLeft+active.offsetWidth>steps.scrollLeft+steps.clientWidth)steps.scrollTo({left:active.offsetLeft-steps.offsetLeft-12,behavior:effectsEnabled?'smooth':'instant'});
 };
 button.addEventListener('click',()=>{
  if(!p.playing&&isLast()){p.index=0;p.elapsed=0;p.render();}
  p.playing=!p.playing;sync();
 });
 root.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>p.select(Number(b.dataset.step))));
 chapter.querySelector('[data-prev]').addEventListener('click',()=>p.select(p.index-1));
 chapter.querySelector('[data-next]').addEventListener('click',()=>p.select(isLast()?0:p.index+1));
 chapter.querySelector('[data-result]').addEventListener('click',()=>p.select(flow.steps.length-1));
 chapter.querySelector('[data-zoom]').addEventListener('click',()=>openPreview(p));
 new IntersectionObserver(entries=>{p.visible=entries[0].isIntersecting;syncVideos(p);},{threshold:.1}).observe(root);
 players.push(p);p.render();
}
// Advance only visible flows, then hold the final result for inspection or download.
let last=performance.now();
const timer=setInterval(()=>{
 const now=performance.now(),delta=Math.min(now-last,1000);last=now;
 if(document.hidden||dialog.open)return;
 for(const p of players){
  if(!p.visible||!p.playing)continue;
  p.elapsed+=delta;
  const duration=p.flow.steps[p.index].overlays?.length?22000:5200;
  p.root.style.setProperty('--step-progress',`${Math.min(100,p.elapsed/duration*100)}%`);
  if(p.elapsed>=duration){p.index=Math.min(p.index+1,p.flow.steps.length-1);p.elapsed=0;p.render();}
 }
},100);
const visibleSamples=new Set();
function syncSamples(){visibleSamples.forEach(video=>{if(effectsEnabled&&!document.hidden&&!dialog.open)video.play().catch(()=>{});else video.pause();});}
const sampleObserver=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{if(entry.isIntersecting)visibleSamples.add(entry.target);else{visibleSamples.delete(entry.target);entry.target.pause();}});
 syncSamples();
},{threshold:.3});
document.querySelectorAll('.sample-grid video').forEach(video=>sampleObserver.observe(video));
document.addEventListener('visibilitychange',()=>{last=performance.now();players.forEach(syncVideos);syncSamples();syncDialogVideos();});
addEventListener('youcreate:motion',event=>{
 const previouslyEnabled=effectsEnabled;
 effectsEnabled=event.detail.enabled;
 if(!effectsEnabled)for(const p of players){if(previouslyEnabled)p.resumeAfterMotion=p.playing;p.playing=false;p.sync();}
 else if(!previouslyEnabled)for(const p of players){if(p.resumeAfterMotion&&p.index<p.flow.steps.length-1){p.playing=true;p.elapsed=0;}p.resumeAfterMotion=false;p.sync();}
 syncSamples();syncDialogVideos();
});
setupMotion(content.motion,content.flows);
// Old shared demo URLs resolve to the same inline chapter and retain their selected step.
if(initialParams.has('flow')){
 const url=new URL(location.href);url.searchParams.delete('flow');url.searchParams.delete('step');history.replaceState(null,'',url);
}
if(location.hash)requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant'}));
