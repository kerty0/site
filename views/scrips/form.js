let name = document.getElementById('name');
let message = document.getElementById('message');
let formMessage = document.getElementById('formMessage');
let clear = document.getElementById('clear');

name.value = localStorage.getItem('name');
name.addEventListener('input', () => {
    localStorage.setItem('name', name.value);
})

message.value = localStorage.getItem('message');
message.addEventListener('input', () => {
    localStorage.setItem('message', message.value);
})

clear.addEventListener('click', () => {
    formMessage.textContent = "";
    localStorage.removeItem('name');
    localStorage.removeItem('message');
})

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    formMessage.textContent = "Sending...";
    localStorage.removeItem('message');
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name.value, message: message.value, timestamp: new Date()})
    })
        .then(response => response.text())
        .then(data => {
            formMessage.textContent = data;
            message.value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            formMessage.textContent = "An error occurred.\nPlease try again later.";
        });
});