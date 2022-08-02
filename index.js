const userInput = document.getElementById('userInput');
const mainContainer = document.getElementById('main-container');
const weatherContainer = document.querySelector('.weather-container');
weatherContainer.style.display = 'none';
const forecastContainer = document.querySelector('.forecast-container');
forecastContainer.style.display = 'none';
const imageContainer = document.querySelector('.image-container');

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const displayWeather = (...items) => {
  items.forEach((item) => {
    const div = document.createElement('div');
    div.append(item);
    weatherContainer.append(div);
    mainContainer.append(weatherContainer);
  });
};

const displayAnimation = (container, condition) => {
  const condToLowerCase = condition.toLowerCase();
  container.style.backgroundImage = `url("./assets/${condToLowerCase}.svg")`;
};

const displayWeatherForecast = (dayName, condition, ...items) => {
  items.forEach((item) => {
    const div = document.createElement('div');
    const forecastAnimation = document.createElement('div');

    const para = document.createElement('p');
    const paraTwo = document.createElement('p');
    forecastAnimation.classList.add('forecast-animation');
    div.classList.add('forecast-card');
    para.append(dayName);
    paraTwo.append(`${item}°C`);
    div.append(para, paraTwo, forecastAnimation);
    forecastContainer.append(div);
    displayAnimationForecast(forecastAnimation, condition);
  });
};

const fetchCurrentWeather = async (userInput) => {
  const getLanLon = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=65e349a9474538ac20dbb6d8be331d95`, { mode: 'cors' });
  const data = await getLanLon.json();
  const { lat } = data[0];
  const { lon } = data[0];

  const getCityWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=65e349a9474538ac20dbb6d8be331d95&units=metric`, { mode: 'cors' });

  const response = await getCityWeather.json();
  const title = `Weather in ${userInput}`;
  const currentWeather = `Temperature: ${response.main.temp} °C`;
  const feelsLike = `Feels like: ${response.main.feels_like} °C`;
  const windSpeed = `Wind: ${response.wind.speed} m/s`;
  const humidity = `Humidity: ${response.main.humidity} %`;
  const condition = response.weather[0].main;
  displayAnimation(imageContainer, condition);
  displayWeather(title, currentWeather, feelsLike, windSpeed, humidity);
};

const fetchForecastWeather = async (userInput) => {
  const getLanLon = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=65e349a9474538ac20dbb6d8be331d95`, { mode: 'cors' });
  const data = await getLanLon.json();
  const { lat } = data[0];
  const { lon } = data[0];

  const getCityWeather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=65e349a9474538ac20dbb6d8be331d95&units=metric`, { mode: 'cors' });

  const response = await getCityWeather.json();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 2; i < response.list.length; i++) {
    if (response.list[i].dt_txt.includes('15:00:00')) {
      const date = new Date(response.list[i].dt * 1000);
      const dayName = days[date.getDay()];
      const cond = response.list[i].weather[0].main;
      const condition = cond.toLowerCase();
      displayWeatherForecast(dayName, condition, response.list[i].main.temp);
    }
  }
};

document.querySelector('.search').onclick = () => {
  if (weatherContainer.hasChildNodes()) {
    removeAllChildNodes(weatherContainer);
    removeAllChildNodes(forecastContainer);
    fetchCurrentWeather(userInput.value);
    fetchForecastWeather(userInput.value);
  } else if (!weatherContainer.hasChildNodes()) {
    fetchForecastWeather(userInput.value);
    fetchCurrentWeather(userInput.value);
    weatherContainer.style.display = 'block';
    forecastContainer.style.display = 'grid';
  }
};
