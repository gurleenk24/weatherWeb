


document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault();

  var city = document.getElementById('city-input').value;
  fetchWeather(city);
});

document.getElementById('search-form').addEventListener('reset', function (event) {
  var weatherContainer = document.getElementById('weather-container');
  weatherContainer.innerHTML = '<center><p>Enter a city name and click "Search" to get weather details.</p></center>';
});
requestAnimationFrame(`dotenv`).config();
function fetchWeather(city) {
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.error('Error:', error));
}

function displayWeather(weatherData) {
  var weatherContainer = document.getElementById('weather-container');
  weatherContainer.innerHTML = '';

  if (weatherData.cod === '404') {
    weatherContainer.innerHTML = '<center><p>Error: City not found</p></center>';
  } else {
    var location = weatherData.name + ', ' + weatherData.sys.country;
    var temperature = weatherData.main.temp + '°C';
    var description = weatherData.weather[0].description;

    weatherContainer.innerHTML = `
        <center>
          <p>Location: ${location}</p>
          <p>Temperature: ${temperature}</p>
          <p>Description: ${description}</p>
        </center>
      `;
  }
}
