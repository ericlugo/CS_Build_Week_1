function loadTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    setTheme('dark');
    document.querySelector('#slider').checked = false;
  } else {
    setTheme('light');
    document.querySelector('#slider').checked = true;
  }
}

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  if (themeName === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

function toggleTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}
