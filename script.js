const apiKey = 'YOUR_API_KEY'; // Sustituye con tu clave de API de Weather Underground
const stationIds = ['STATION_ID_1', 'STATION_ID_2']; // Sustituye con los IDs de las estaciones

// Función para determinar el color según la temperatura
function getTemperatureColor(temperature) {
    if (temperature < 10) {
        return 'cold';  // Azul frío
    } else if (temperature >= 10 && temperature < 20) {
        return 'cool';  // Verde fresco
    } else if (temperature >= 20 && temperature < 30) {
        return 'warm';  // Naranja cálido
    } else {
        return 'hot';   // Rojo caliente
    }
}

// Función para obtener los datos de las estaciones y mostrarlos
function fetchWeatherData() {
    stationIds.forEach(stationId => {
        fetch(`https://api.weather.com/v3/wx/conditions/current?stationId=${stationId}&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const temperature = data.temperature; // Asegúrate de que el campo correcto de la API se utilice
                const stationElement = document.createElement('div');
                stationElement.classList.add('station', getTemperatureColor(temperature));
                stationElement.innerHTML = `Estación: ${stationId} <br> Temperatura: ${temperature}°C`;
                document.getElementById('stations-container').appendChild(stationElement);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
}

// Llamar a la función al cargar la página
fetchWeatherData();
