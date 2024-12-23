const weatherData = [];

// Function to add a new city weather
function addWeather() {
  const cityName = document.getElementById('city-name').value;
  const temperature = parseFloat(document.getElementById('temperature').value);
  const condition = document.getElementById('condition').value;

  if (cityName && !isNaN(temperature) && condition) {
    weatherData.push({ cityName, temperature, condition });
    updateWeatherList();
    document.getElementById('city-name').value = '';
    document.getElementById('temperature').value = '';
    document.getElementById('condition').value = '';
  } else {
    alert('Please enter valid weather details.');
  }
}

// Function to find the hottest city
function findHottestCity() {
  const hottestCity = weatherData.reduce((max, city) =>
    city.temperature > max.temperature ? city : max, weatherData[0]
  );
  return hottestCity;
}

// Function to filter cities by condition
function filterByCondition(condition) {
  return weatherData.filter(city => city.condition.toLowerCase() === condition.toLowerCase());
}

// Function to update the weather list
function updateWeatherList() {
  const weatherList = document.getElementById('weather-list');
  const hottestCityElement = document.getElementById('hottest-city');

  weatherList.innerHTML = '';
  weatherData.map(({ cityName, temperature, condition }) => {
    const listItem = document.createElement('li');
    listItem.className = 'weather-item';
    listItem.innerHTML = `
      <span>City: ${cityName}, Temp: ${temperature}°C, Condition: ${condition}</span>
    `;
    weatherList.appendChild(listItem);
  });

  if (weatherData.length > 0) {
    const hottestCity = findHottestCity();
    const { cityName, temperature } = hottestCity;
    hottestCityElement.textContent = `Hottest City: ${cityName}, Temp: ${temperature}°C`;
  } else {
    hottestCityElement.textContent = '';
  }
}

// Event listener for the "Add Weather" button
document.getElementById('add-weather').addEventListener('click', addWeather);
