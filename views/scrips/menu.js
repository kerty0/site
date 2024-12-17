let menu = document.querySelector('#menuSelector');

window.addEventListener('scroll', () => {
    menu.style.height = `min(100vh, ${document.body.scrollHeight - 138}px)`;
});
window.dispatchEvent(new CustomEvent('scroll'));

window.addEventListener('resize', () => {
    if (window.innerWidth <= 572) {
        menu.parentElement.parentElement.classList.add('active');
        menu.parentElement.firstElementChild.text = '⛌';
    } else {
        menu.parentElement.parentElement.classList.remove('active');
        menu.classList.remove('active');
        menu.parentElement.firstElementChild.textContent = '☰';
    }
});
window.dispatchEvent(new CustomEvent('resize'));

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        menu.classList.remove('active');
        menu.parentElement.firstElementChild.textContent = '☰';
    }
});

menu.parentElement.addEventListener('click', (event) => {
    console.log(event.target)
    console.log(event.target)

    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        menu.parentElement.firstElementChild.textContent = '☰';
    } else {
        menu.classList.add('active');
        menu.parentElement.firstElementChild.textContent = '⛌';
    }
});