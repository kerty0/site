let menu = document.querySelector('#menu');
let menuSelector = document.querySelector('#menuSelector');

window.addEventListener('scroll', () => {
    menuSelector.style.height = `min(100vh, ${document.body.clientHeight - 138}px)`;
});
window.dispatchEvent(new CustomEvent('scroll'));

window.addEventListener('resize', () => {
    if (window.innerWidth <= 572 && !menu.parentElement.classList.contains('activeMenu')) {
        menu.parentElement.classList.add('activeMenu');
        menu.textContent = '☰';
    } else if (window.innerWidth > 572 && menu.parentElement.classList.contains('activeMenu')) {
        menu.parentElement.classList.remove('activeMenu');
        menuSelector.classList.remove('activeMenu');
        menu.classList.remove('activeMenu');
    }
});
window.dispatchEvent(new CustomEvent('resize'));

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        menuSelector.classList.remove('activeMenu');
        menu.textContent = '☰';
    }
});

menu.addEventListener('click', () => {
    if (menu.classList.contains('activeMenu')) {
        menuSelector.classList.remove('activeMenu');
        menu.classList.remove('activeMenu');
        menu.textContent = '☰';
    } else {
        menuSelector.classList.add('activeMenu');
        menu.classList.add('activeMenu');
        menu.textContent = '✕';
        console.log(2);
    }
});