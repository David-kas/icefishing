const AFFILIATE_LINKS = {
  ru: 'https://w1p0bh5en2sb8r.xyz/click/699ee9926bcc631b4e19a89d/4798/16899/subaccount',
  en: 'https://w1p0bh5en2sb8r.xyz/click/699ee9926bcc631b4e19a89d/4798/16899/subaccount',
  kz: 'https://w1p0bh5en2sb8r.xyz/click/699f10d76bcc631bb907d95d/4799/16899/subaccount',
  uz: 'https://w1p0bh5en2sb8r.xyz/click/699f10d76bcc631bb907d95e/4800/16899/subaccount'
};
function detectLanguage() {
  const path = window.location.pathname.toLowerCase();
  if (path === '/en' || path.startsWith('/en/')) return 'en';
  if (path === '/kz' || path.startsWith('/kz/')) return 'kz';
  if (path === '/uz' || path.startsWith('/uz/')) return 'uz';
  if (path === '/ru' || path.startsWith('/ru/')) return 'ru';
  return 'ru';
}

function applyAffiliateLinks() {
  const lang = detectLanguage();
  const href = AFFILIATE_LINKS[lang] || AFFILIATE_LINKS.ru;
  document.querySelectorAll('[data-affiliate-link]').forEach((el) => el.setAttribute('href', href));
}

function updateLanguageSwitcherLabel() {
  const label = document.querySelector('.lang-switcher-label');
  if (!label) return;
  const lang = detectLanguage();
  if (lang === 'en') label.textContent = 'Choose language:';
  else if (lang === 'kz') label.textContent = 'Til tandau:';
  else if (lang === 'uz') label.textContent = 'Tilni tanlash:';
  else label.textContent = 'Vyberite yazyk:';
}

function normalizeHeaderLanguageSwitcher() {
  const nav = document.querySelector('header nav');
  if (!nav) return;

  const path = window.location.pathname;
  const currentLang = detectLanguage();
  const m = path.match(/^\/(ru|en|kz|uz)(?:\/(.*))?$/i);
  const pageSlug = m && m[2] ? m[2] : '';

  let wrapper = nav.querySelector('.header-lang-switcher-wrap');
  if (!wrapper) {
    const navLinks = nav.querySelector('.nav-links');
    wrapper = document.createElement('div');
    wrapper.className = 'header-lang-switcher-wrap';
    if (navLinks) nav.insertBefore(wrapper, navLinks);
    else nav.appendChild(wrapper);
  }

  const labels = {
    ru: '🇷🇺 RU',
    en: '🇬🇧 EN',
    kz: '🇰🇿 KZ',
    uz: '🇺🇿 UZ',
  };

  const switcher = document.createElement('div');
  switcher.className = 'lang-switcher header-lang-switcher';
  const label = document.createElement('span');
  label.className = 'lang-switcher-label';
  switcher.appendChild(label);

  Object.keys(labels).forEach((code) => {
    const a = document.createElement('a');
    a.className = 'lang-option' + (code === currentLang ? ' current' : '');
    a.href = pageSlug ? '/' + code + '/' + pageSlug : '/' + code + '/';
    a.textContent = labels[code];
    switcher.appendChild(a);
  });

  wrapper.innerHTML = '';
  wrapper.appendChild(switcher);
}

function moveLanguageSwitcherToHeader() {
  const switcher = document.querySelector('main .lang-switcher');
  const nav = document.querySelector('header nav');
  const navLinks = document.querySelector('.nav-links');
  if (!switcher || !nav) return;
  if (document.querySelector('.header-lang-switcher-wrap')) return;

  switcher.classList.add('header-lang-switcher');
  const host = document.createElement('div');
  host.className = 'header-lang-switcher-wrap';
  host.appendChild(switcher);

  if (navLinks && navLinks.parentNode === nav) {
    nav.insertBefore(host, navLinks);
  } else {
    nav.appendChild(host);
  }
}

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!mobileMenuBtn || !navLinks) return;

  mobileMenuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  moveLanguageSwitcherToHeader();
  normalizeHeaderLanguageSwitcher();
  updateLanguageSwitcherLabel();
  applyAffiliateLinks();
  initMobileMenu();
});
