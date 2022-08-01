const displayWeather = (...items) => {
    const weatherContainer = documen.createElement('div')
    weatherContainer.classList.add('weather-container')

    items.forEach(item => {
        const div = document.createElement('div')
        div.append(item)
        weatherContainer.append(div)

    })
}

const fetchCurrentWeather = async (userInput) => {
    
    const getLanLon = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=65e349a9474538ac20dbb6d8be331d95`,{"mode":"cors"})
    const data = await getLanLon.json()
    const lat = data[0].lat
    const lon = data[0].lon
    
    const getCityWeather = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=65e349a9474538ac20dbb6d8be331d95&units=metric`)

    const response = await getCityWeather.json()
    let currentWeather = `Temperature = ${response.main.temp} °C`
    let feelsLike = `Feels like: ${response.main.feels_like} °C`
    let windSpeed = `Wind: ${response.wind.speed} m/s`
    let humidity = `Humidity: ${response.main.humidity} %`

    let info = []
    info.push(currentWeather, feelsLike, windSpeed, humidity)

    displayWeather(info)
    
    


}



const userInput = 'Moraleja del vino'

fetchCurrentWeather(userInput)