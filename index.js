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

let userInput = document.getElementById('userInput')
const mainContainer = document.getElementById('main-container')
const weatherContainer = document.querySelector('.weather-container')
weatherContainer.style.display = 'none'


document.querySelector('.search').onclick = () => {
    if (weatherContainer.hasChildNodes()) {
       removeAllChildNodes(weatherContainer)
       fetchCurrentWeather(userInput.value)
    }
    else if (!weatherContainer.hasChildNodes()) {

        fetchCurrentWeather(userInput.value)
        weatherContainer.style.display = 'block'
        console.log('Hola buenos dias')
    }
}





