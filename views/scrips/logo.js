let logo = document.querySelector('#logo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        logo.classList.add('active');
    } else {
        logo.classList.remove('active');
    }
});