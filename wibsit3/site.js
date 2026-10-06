const toggle = document.querySelector('.menu-toggle');
const primaryNav = document.getElementById('primary-nav');
function closeMenu() {
  primaryNav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'فتح قائمة التنقل');
}
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  primaryNav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'إغلاق قائمة التنقل' : 'فتح قائمة التنقل');
});
primaryNav?.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && primaryNav?.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header') && primaryNav?.classList.contains('open')) closeMenu();
});
const sectionLinks = [...document.querySelectorAll('.section-nav a')];
const sectionIds = sectionLinks.map(link => link.getAttribute('href').slice(1));
if ('IntersectionObserver' in window && sectionLinks.length) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      sectionLinks.forEach(link => {
        const selected = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('selected', selected);
        if (selected) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-170px 0px -45% 0px', threshold: 0 });
  sectionIds.forEach(id => { const section = document.getElementById(id); if (section) observer.observe(section); });
}
