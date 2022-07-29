const makeFetchRequest = async () => {
    
    const response = await fetch ('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=65e349a9474538ac20dbb6d8be331d95',
    {
       "mode":"cors"
    })
            const responseData = await response.json()
            
            console.log(responseData)
}

makeFetchRequest()