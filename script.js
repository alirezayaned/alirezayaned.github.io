const body = document.body;
const themeToggle = document.querySelector('#theme-toggle');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const themeColor = document.querySelector('meta[name="theme-color"]');
const savedTheme = localStorage.getItem('portfolio-theme');
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
  body.classList.toggle('dark', isDark);
  themeToggle.checked = isDark;
  themeColor.setAttribute('content', isDark ? '#161c1d' : '#f4f3ee');
}

// Use the visitor's saved choice; otherwise follow their system setting.
setTheme(savedTheme ? savedTheme === 'dark' : darkQuery.matches);

darkQuery.addEventListener('change', (event) => {
  if (!localStorage.getItem('portfolio-theme')) setTheme(event.matches);
});

themeToggle.addEventListener('change', () => {
  const isDark = themeToggle.checked;
  setTheme(isDark);
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});

menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.textContent = isOpen ? 'Close' : 'Menu';
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = 'Menu';
}));
