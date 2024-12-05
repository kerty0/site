let theme = localStorage.getItem('theme');
if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
} else {
    document.documentElement.setAttribute('data-theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

Promise.all([
    fetch('style.css', {cache: 'force-cache'}).then(response => response.text()),
    fetch('header.html', {cache: 'force-cache'}).then(response => response.text()),
    fetch(window.location.href.split('/').pop(), {cache: 'force-cache'}).then(response => response.text()),
    fetch('footer.html', {cache: 'force-cache'}).then(response => response.text()),
    // fetch('assets/cat.jpg', {cache: 'force-cache'})
]).then(([style, header, main, footer]) => {
    document.head.innerHTML += `<style>${style}</style>`;
    document.body.innerHTML = header + main + footer;
    document.body.classList.remove('loading');
    console.log(main);
});

// document.addEventListener('DOMContentLoaded', () => {
//     let imgs = document.querySelectorAll('main img');
//     for (let i = 0; i < imgs.length; ++i) {
//         imgs[i].style.maxHeight = window.outerHeight * 0.6 + 'px';
//     }
//     let headers = document.querySelectorAll('main .title');
//     for (let i = 0; i < headers.length; ++i) {
//         headers[i].innerHTML = `<div></div><h1>${headers[i].innerHTML}</h1><div style="flex-grow: 1"></div>`;
//     }
// });