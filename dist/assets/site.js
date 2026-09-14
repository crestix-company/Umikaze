const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('#mobile-nav');
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('nav-open')}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('nav-open',open)});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus()}});
document.addEventListener('click',e=>{if(!menu.hidden&&!e.target.closest('.header'))closeMenu()});
window.matchMedia('(min-width: 1051px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>{e.classList.add('will-reveal');observer.observe(e)})}
