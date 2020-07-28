const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const coords = latitude.toString() + ',' + longitude.toString()
    const url = 'http://api.weatherstack.com/current?access_key=1bba737614f02e306eb2c534013c8259&query=' + coords + '&units=f'
    // console.log(url)
    // using shorthand es6 syntax with url, and body from the response as destructuring
    // very clever, too clever by far, I think
    request({ url, json: true }, (error, { body }) => {
        // no need to parse response, as a json object is now being returned by request, not a string
        if (error) {
            callback('Unable to connect to API - check your connection', undefined)
        } else if (body.error) {
            console.log('Unable to determine location - check your input', undefined)
        }
        else {
            const { weather_descriptions, temperature, feelslike, wind_speed, humidity } = body.current  // destructuring
            description = 'It is currently ' + weather_descriptions[0] + ' with a temperature of ' + temperature + " degrees out. It feels like " + feelslike + ' degrees. The wind speed is currently ' + wind_speed + "mph " + " and humidity is " + humidity + "%"
            callback(undefined, description)
        }
    })
}

module.exports = forecast

