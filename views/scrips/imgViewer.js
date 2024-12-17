let viewedImg;
let viewImg = document.querySelector('#imgViewer img');

window.addEventListener('resize', () => {
    if (viewedImg) {
        if (window.innerWidth / window.innerHeight > viewImg.naturalWidth / viewImg.naturalHeight) {
            viewImg.style.height = '100%';
            viewImg.style.width = '';
        } else {
            viewImg.style.width = '100%';
            viewImg.style.height = '';
        }
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeViewer();
    }
});

viewImg.addEventListener('click', () => {
    closeViewer();
});

function closeViewer() {
    if (viewedImg) {
        viewImg.src = '';
        viewImg.alt = '';
        viewImg.parentElement.style.visibility = '';
        viewedImg.style.visibility = '';
        viewedImg = undefined;
    }
}

document.querySelectorAll('main img').forEach((img) => {
    img.addEventListener('click', () => {
        if (!viewedImg) {
            viewImg.src = img.src;
            viewImg.alt = img.alt;
            viewImg.parentElement.style.visibility = 'visible';
            viewedImg = img;
            viewedImg.style.visibility = 'hidden';
            window.dispatchEvent(new CustomEvent('resize'));
        }
    });
});