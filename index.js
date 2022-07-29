const makeFetchRequest = async (userInput) => {
    
    const getLanLon = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=65e349a9474538ac20dbb6d8be331d95`,{"mode":"cors"})
    const data = await getLanLon.json()
    const lat = data[0].lat
    const lon = data[0].lon
    
    const getCityWeather = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=65e349a9474538ac20dbb6d8be331d95`)
    const response = await getCityWeather.json()

    console.log(response.main.temp)
}

const userInput = 'London'

makeFetchRequest(userInput)