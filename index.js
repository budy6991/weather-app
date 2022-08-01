const makeFetchRequest = async (userInput) => {
    
    const getLanLon = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=65e349a9474538ac20dbb6d8be331d95`,{"mode":"cors"})
    const data = await getLanLon.json()
    const lat = data[0].lat
    const lon = data[0].lon
    
    const getCityWeather = await fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=65e349a9474538ac20dbb6d8be331d95&units=metric`)
    const response = await getCityWeather.json()

    const forecastContainer = document.querySelector('.forecast-container')

    for (let i = 0; i < 8; i++) {
        const weatherForecast = response.list[i].main.temp
        forecastContainer.append(weatherForecast)
        
    }
}

//We need to create a function that takes an array and, for each element of the array, creates a li-ul element, that then will be appended to a forecast-container, to show the weather forecast for 8 days, just the temperature.

const userInput = 'Zaragoza'

makeFetchRequest(userInput)