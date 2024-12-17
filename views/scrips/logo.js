let logo = document.querySelector('#logo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        logo.classList.add('activeLogo');
    } else {
        logo.classList.remove('activeLogo');
    }
});