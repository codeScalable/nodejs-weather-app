const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d740fec599b7f54a0f038b105d7f0c63&query=' +encodeURIComponent(longitude) +',' +encodeURIComponent(latitude)+'&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service', undefined)
        } else if(body.error) {
            callback("Unable to find location. Search with another keyword", undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+ ' degrees outside. But it feels like ' +body.current.feelslike+ ' degrees')
        }
        
    } )
}

module.exports = forecast