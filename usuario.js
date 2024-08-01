document.addEventListener('DOMContentLoaded', function() {
    const image = localStorage.getItem('image');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (image && name && email) {
        document.getElementById('image').src = image;
        document.getElementById('name').textContent = name;
        document.getElementById('email').textContent = email;
    } else {
        window.location.href = "index.html";
    }

    document.getElementById('goToReset').addEventListener('click', function() {
        window.location.href = "reset.html";
    });
});
