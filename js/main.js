// Menu mobile
const burger = document.querySelector('.burger');
const menu = document.querySelector('nav');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Année automatique dans le pied de page
document.getElementById('year').textContent = new Date().getFullYear();

// Apparition douce des sections au défilement
const items = document.querySelectorAll('.card, .two, .gallery, .stats div');
items.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
items.forEach(el => io.observe(el));

// Formulaire : ouvre le client e-mail du visiteur (aucun serveur nécessaire)
// À MODIFIER : adresse qui reçoit les messages
const DESTINATAIRE = 'mjcaafrique@gmail.com';
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const sujet = encodeURIComponent('Message depuis le site MJCA – ' + f.get('nom'));
  const corps = encodeURIComponent(f.get('message') + '\n\n' + f.get('nom') + ' (' + f.get('email') + ')');
  window.location.href = `mailto:${DESTINATAIRE}?subject=${sujet}&body=${corps}`;
});

// Compteurs animés dans les chiffres clés
document.querySelectorAll('[data-count]').forEach(el => {
  const cible = +el.dataset.count, plus = el.dataset.plus ? '+' : '';
  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    const debut = performance.now(), duree = 1600;
    const tick = t => {
      const p = Math.min((t - debut) / duree, 1);
      el.textContent = Math.round(cible * (1 - Math.pow(1 - p, 3))) + (p === 1 ? plus : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  obs.observe(el);
});

// Effets : barre de progression, menu qui change, bouton retour en haut
const nav = document.querySelector('.nav'), barre = document.querySelector('.progress'), haut = document.querySelector('.totop');
function surDefilement() {
  const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
  barre.style.width = (y / max * 100) + '%';
  nav.classList.toggle('scrolled', y > 40);
  haut.classList.toggle('show', y > 600);
}
addEventListener('scroll', surDefilement, { passive: true });
surDefilement();

// Apparition en cascade
items.forEach((el, i) => el.style.transitionDelay = (i % 3) * 0.12 + 's');

// Effet 3D léger de la photo du haut quand la souris bouge
const photo = document.querySelector('.hero-photo img');
if (photo && matchMedia('(hover:hover)').matches) {
  document.querySelector('.hero').addEventListener('mousemove', e => {
    const x = (e.clientX / innerWidth - .5) * 10, y = (e.clientY / innerHeight - .5) * -8;
    photo.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
}
