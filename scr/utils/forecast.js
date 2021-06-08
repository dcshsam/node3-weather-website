const request = require('request')

const forecast = (latitude,longitute,callback)=>{
    
    const url = 'http://api.weatherstack.com/current?access_key=d210f34ab866782761f21a9212d279e7&query='+ latitude +','+ longitute +'&units=f'
    console.log(url)
    request({url,json: true}, (error,{body } = {} )=>{
           if(error){
                callback('Unable to connect to wheather service ',undefined)
            } else if (body.error){
                callback('Unable to find the location',undefined)
            } else {
                callback(undefined,body.current.weather_descriptions[0]+' wheather and It is currently '+body.current.temperature +' fahrenheit out. It feels like '+body.current.feelslike +' degree out.')
            }


    })

}

module.exports = forecast