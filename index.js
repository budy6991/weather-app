let userInput = document.getElementById('userInput')
const mainContainer = document.getElementById('main-container')
const weatherContainer = document.querySelector('.weather-container')
weatherContainer.style.display = 'none'
const forecastContainer = document.querySelector('.forecast-container')
forecastContainer.style.display = 'none'

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const displayWeather = (...items) => {
    
    items.forEach(item => {
        const div = document.createElement('div')
        
        div.append(item)
        weatherContainer.append(div)
        mainContainer.append(weatherContainer)
        
    })
}

const  displayWeatherForecast = (dayName, ...items) => {
    
    items.forEach(item => {
        const div = document.createElement('div')
        const para = document.createElement('p')
        const paraTwo = document.createElement('p')
        div.classList.add('forecast-card')
        para.append(dayName)
        paraTwo.append(item)
        div.append(para, paraTwo)
        forecastContainer.append(div)
    })
}

const fetchCurrentWeather = async (userInput) => {
    
    const getLanLon = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=65e349a9474538ac20dbb6d8be331d95`,{"mode":"cors"})
    const data = await getLanLon.json()
    const lat = data[0].lat
    const lon = data[0].lon
    
    const getCityWeather = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=65e349a9474538ac20dbb6d8be331d95&units=metric`)
    
    const response = await getCityWeather.json()
    let title = `Weather in ${userInput}`
    let currentWeather = `Temperature: ${response.main.temp} °C`
    let feelsLike = `Feels like: ${response.main.feels_like} °C`
    let windSpeed = `Wind: ${response.wind.speed} m/s`
    let humidity = `Humidity: ${response.main.humidity} %`
    
    displayWeather(title, currentWeather, feelsLike, windSpeed, humidity)
    
    
}

const fetchForecastWeather = async (userInput) => {
    const getLanLon = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=65e349a9474538ac20dbb6d8be331d95`,{"mode":"cors"})
    const data = await getLanLon.json()
    const lat = data[0].lat
    const lon = data[0].lon
    
    const getCityWeather = await fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=65e349a9474538ac20dbb6d8be331d95&units=metric`)
    
    const response = await getCityWeather.json()
    
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    
    for (let i = 2; i < response.list.length; i++) {
        if(response.list[i].dt_txt.includes('15:00:00')) {
            let date = new Date (response.list[i].dt * 1000)
            let dayName = days[date.getDay()]
            console.log(dayName, response.list[i].main.temp)
            // let fullName = `${dayName}  ${response.list[i].main.temp
            // }`


            displayWeatherForecast(dayName, response.list[i].main.temp)
        }
    }
}


document.querySelector('.search').onclick = () => {
    if (weatherContainer.hasChildNodes()) {
       removeAllChildNodes(weatherContainer)
       removeAllChildNodes(forecastContainer)
       fetchCurrentWeather(userInput.value)
       fetchForecastWeather(userInput.value)
    }
    else if (!weatherContainer.hasChildNodes()) {
        fetchForecastWeather(userInput.value)
        fetchCurrentWeather(userInput.value)
        weatherContainer.style.display = 'block'
        forecastContainer.style.display = 'block'
    }
}





