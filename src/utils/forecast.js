const request = require('request')

const forecast = (latitude, longitude, callback) => {

    console.log(latitude, longitude)
    const access_key = '4ce71a0d50ab3e9aaa3634a7f181bc9d'
    const query = latitude + "," + longitude
    const url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + query + '&units=m'

    request({ url, json: true }, (error, {body} = {}) => {
        if (error)
            callback("Unable to connect to weather service", undefined)
        else if (body.error)
            callback("Unable to find location", undefined)
        else {
            const current = body.current;
            const output = current.weather_descriptions[0] + ". It is currently " + current.temperature + " degrees out. It feels like " +
            current.feelslike + " degrees out"
            callback(undefined, output)
        }
    })
}

module.exports = forecast