let themeImg = document.querySelector('#themeToggle img');

themeImg.src = `/static/images/${document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'}-mode.png`;
themeImg.parentElement.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeImg.src = `/static/images/${theme === 'dark' ? 'light' : 'dark'}-mode.png`;
});