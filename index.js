const makeFetchRequest = async () => {
    
    const getCity = await fetch ('http://api.openweathermap.org/geo/1.0/direct?q=madrid&appid=65e349a9474538ac20dbb6d8be331d95',{"mode":"cors"})
    const data = await getCity.json()
    const lat = data[0].lat
    const lon = data[0].lon
    console.log(lat, lon)
    
}

makeFetchRequest()