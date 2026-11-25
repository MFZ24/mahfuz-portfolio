'use strict';
const grid=document.getElementById('projectGrid');
const dialog=document.getElementById('projectDialog');
const content=document.getElementById('dialogContent');
let lastButton=null;
function node(tag, className, text){const el=document.createElement(tag);if(className)el.className=className;if(text)el.textContent=text;return el;}
function renderProjects(){
 grid.replaceChildren();
 projects.forEach((project,index)=>{
  const col=node('div','col-md-6 col-lg-4'),card=node('article','project-card');
  if(project.images.length){const img=node('img');img.src=project.images[0];img.alt=project.short+' — project field photograph';img.loading='lazy';card.append(img);}else{card.append(node('div','image-placeholder','Project photograph not supplied'));}
  const body=node('div','project-body');body.append(node('p','eyebrow mb-2',project.short),node('h3','',project.title),node('p','small text-body-secondary',project.authority));
  const btn=node('button','btn btn-outline-secondary btn-sm',project.images.length?'View details & photos':'View details');btn.type='button';btn.addEventListener('click',()=>{lastButton=btn;openProject(index);});body.append(btn);card.append(body);col.append(card);grid.append(col);
 });
}
function openProject(index){
 const p=projects[index];document.getElementById('dialogTitle').textContent=p.short;content.replaceChildren();
 content.append(node('h3','h5',p.title),node('p','text-body-secondary',p.authority));
 if(p.original&&p.original!==p.title){const original=node('p','small',p.original);if(/[\u0980-\u09FF]/.test(p.original))original.lang='bn';content.append(original);}
 if(p.tasks.length){content.append(node('h4','h6 mt-4','Responsibilities'));const ul=node('ul','task-list');p.tasks.forEach(t=>ul.append(node('li','',t)));content.append(ul);}else content.append(node('p','','Listed in the CV. Project-specific responsibilities and photographs were not supplied.'));
 if(p.images.length){content.append(node('h4','h6 mt-4','Field photographs — click to view full size'));const gallery=node('div','gallery');p.images.forEach((src,i)=>{const a=node('a');a.href=src;a.target='_blank';a.rel='noopener noreferrer';const im=node('img');im.src=src;im.alt=p.short+' — field photograph '+(i+1);a.append(im);gallery.append(a);});content.append(gallery);}
 dialog.showModal();
}
document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>lastButton?.focus());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
const themeButton=document.getElementById('themeToggle');function setTheme(theme){document.documentElement.dataset.bsTheme=theme;themeButton.textContent=theme==='dark'?'Light mode':'Dark mode';try{localStorage.setItem('portfolio-theme',theme);}catch{}}let saved='light';try{saved=localStorage.getItem('portfolio-theme')||'light';}catch{}setTheme(saved==='dark'?'dark':'light');themeButton.addEventListener('click',()=>setTheme(document.documentElement.dataset.bsTheme==='dark'?'light':'dark'));
document.getElementById('year').textContent=new Date().getFullYear();renderProjects();

const heroPause=document.getElementById('heroPause');
if(window.bootstrap){
 const carousel=bootstrap.Carousel.getOrCreateInstance(document.getElementById('heroCarousel'));
 let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function updatePause(){if(paused)carousel.pause();else carousel.cycle();heroPause.textContent=paused?'Play slideshow':'Pause slideshow';heroPause.setAttribute('aria-pressed',String(paused));}
 heroPause.addEventListener('click',()=>{paused=!paused;updatePause();});updatePause();
}else{heroPause.hidden=true;}
