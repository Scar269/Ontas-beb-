document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signOut').addEventListener('click', function() {
        localStorage.removeItem('image');
        localStorage.removeItem('name');
        localStorage.removeItem('email');

        window.location.href = "index.html";
    });
});
