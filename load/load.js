document.addEventListener('DOMContentLoaded', () => {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').outerHTML = data;
            document.querySelector('.theme-toggle').addEventListener('click', () => {
                theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
            });
        });
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        });
    let imgs = document.querySelectorAll('main img');
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.maxHeight = window.outerHeight * 0.6 + 'px';
    }
    let headers = document.querySelectorAll('main .title');
    for (let i = 0; i < headers.length; i++) {
        headers[i].innerHTML = `<div></div><h1>${headers[i].innerHTML}</h1><div style="flex-grow: 1"></div>`;
    }
});


let theme = localStorage.getItem('theme');
if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
}



