// Light/Dark mode toggle with ARIA updates and persistence

const toggleBtn = document.getElementById('toggleTheme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.setAttribute('aria-pressed', 'true');
  } else {
    document.body.classList.remove('dark');
    toggleBtn.setAttribute('aria-pressed', 'false');
  }
}

if (currentTheme) {
  applyTheme(currentTheme);
} else {
  applyTheme(prefersDarkScheme.matches ? 'dark' : 'light');
}

toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
