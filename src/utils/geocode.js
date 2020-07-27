const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWNjZXNzZGM1NSIsImEiOiJja2N1bGtvMGkyOWt2MnJsdXp1Njh0YzFhIn0.vB25dhC98oH3meOtxICTBg&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find this location. Please try another search', undefined)
        }
        else {
            const { center, place_name } = body.features[0]  // destructuring
            // send back error as undefined, then latitude, longitude and place_name as an object
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })
}
module.exports = geocode