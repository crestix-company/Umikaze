const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('#mobile-nav');
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('nav-open')}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('nav-open',open)});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus()}});
document.addEventListener('click',e=>{if(!menu.hidden&&!e.target.closest('.header'))closeMenu()});
window.matchMedia('(min-width: 1051px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobile = window.matchMedia('(max-width: 700px)');
const film = document.querySelector('.garden-film');
const filmButton = document.querySelector('.film-toggle');
const hero = document.querySelector('.hero-film');
let userPaused = false;
let inView = !!hero && hero.getBoundingClientRect().bottom > 0;
let mediaFailed = false;
const saveData = navigator.connection?.saveData === true;

function showFilmState() {
  if (!film) return;
  filmButton.classList.toggle('is-paused', film.paused);
  filmButton.setAttribute('aria-label', film.paused ? '背景動画を再生' : '背景動画を一時停止');
}
function playFilm() {
  if (!film || mediaFailed) return;
  // Load one responsive film, only when needed; keep the poster if autoplay is blocked.
  if (!film.getAttribute('src')) {
    film.src = mobile.matches ? film.dataset.mobileSrc : film.dataset.desktopSrc;
    film.muted = true;
  }
  filmButton.hidden = false;
  film.play().catch(showFilmState);
}
function syncFilm() {
  if (!film) return;
  if (reducedMotion.matches || saveData || userPaused || !inView || document.hidden) film.pause();
  else playFilm();
  showFilmState();
}
if (film) {
  film.addEventListener('play', showFilmState);
  film.addEventListener('pause', showFilmState);
  film.addEventListener('error', () => {
    mediaFailed = true;
    filmButton.hidden = true;
    film.removeAttribute('src');
    film.load();
  });
  filmButton.addEventListener('click', () => {
    userPaused = !film.paused;
    if (userPaused) film.pause();
    else playFilm();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      syncFilm();
    }, { threshold: 0, rootMargin: '-102px 0px 0px' }).observe(hero);
  }
  document.addEventListener('visibilitychange', syncFilm);
  // Visitors with motion/data-saving preferences can choose to play explicitly.
  if (reducedMotion.matches || saveData) { filmButton.hidden = false; showFilmState(); }
  syncFilm();
}

let revealObserver;
function setMotionPreference() {
  document.documentElement.classList.toggle('motion-on', !reducedMotion.matches);
  revealObserver?.disconnect();
  if (reducedMotion.matches) {
    document.querySelectorAll('.will-reveal').forEach(el => el.classList.add('revealed'));
  } else if ('IntersectionObserver' in window) {
    const selector = '.reveal, .dish, .garden-notes>div, .instagram-inner>div, .rule, .menu-extra, .menu-items>div, .parking-section>div, .reservation>div, .guide-dog>div';
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add('revealed');
        revealObserver.unobserve(target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -25px 0px' });
    document.querySelectorAll(selector).forEach(el => {
      const index = [...el.parentElement.children].indexOf(el);
      el.style.setProperty('--reveal-delay', `${mobile.matches ? 0 : Math.min(index, 2) * 100}ms`);
      el.classList.add('will-reveal');
      if (el.matches('.garden-wide')) el.classList.add('image-reveal');
      revealObserver.observe(el);
    });
  }
  syncFilm();
  updateScrollMotion();
}
const garden = document.querySelector('.garden-wide');
const stamp = document.querySelector('.round-stamp');
let scrollFrame = 0;
function updateScrollMotion() {
  scrollFrame = 0;
  if (reducedMotion.matches || document.hidden) return;
  if (hero && !mobile.matches) {
    const r = hero.getBoundingClientRect();
    if (r.bottom > 0) hero.style.setProperty('--hero-drift', `${Math.min(36, Math.max(0, -r.top) * .08)}px`);
  }
  if (garden) {
    const r = garden.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) {
      const progress = Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight + r.height)));
      garden.style.setProperty('--garden-drift', `${-progress * (mobile.matches ? 8 : 13)}%`);
    }
  }
  if (stamp) {
    const r = stamp.parentElement.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) stamp.style.setProperty('--stamp-drift', `${Math.max(-10, Math.min(10, (r.top - innerHeight / 2) * .03))}px`);
  }
}
function requestScrollMotion() {
  if (!scrollFrame && !reducedMotion.matches) scrollFrame = requestAnimationFrame(updateScrollMotion);
}
window.addEventListener('scroll', requestScrollMotion, { passive: true });
window.addEventListener('resize', requestScrollMotion, { passive: true });
reducedMotion.addEventListener('change', setMotionPreference);
setMotionPreference();
