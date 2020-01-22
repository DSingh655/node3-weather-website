
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b696add85c732f1244dfd9619a484a5b/' 
    + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    + '?units=si'
    
    request({url:url, json:true }, (error, response) => {
        if(error)  {
            callback('{"error" :"Unable to connect to weather services"} ', undefined)
        }else if(response.body.error) {
            callback('{"error" :"Unable to find location"}', undefined)
        }else {
            callback(undefined, {
                temperature : response.body.currently.temperature, 
                precipProbability : response.body.currently.precipProbability,
                summary : response.body.currently.summary
            })
        }
    })
}

module.exports = forecast

  