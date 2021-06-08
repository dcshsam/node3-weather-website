const request = require('request')

const geocode = (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2FuanU4MjgyIiwiYSI6ImNrb3NocXRqcDAxbGQyb3AzNXVnczNoMDEifQ.vHVKRui7SDQ4b8NQm_A0Cg'
  
request({url,json:true}, (error , {body} = {} ) => {

   
  if(error) {
    callback('Unable to connect to location service',undefined)
  } else if (body.features[0].length === 0) {
     callback('Unable to find the location',undefined)  
  } else{
    
      callback(undefined,{
          latitude:  body.features[0].center[1],
          longitute: body.features[0].center[0],
          location : body.features[0].place_name
      })
  }


})
}

module.exports = geocode