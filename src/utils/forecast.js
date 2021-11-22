const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = "https://api.darksky.net/forecast/14f8104f3dc0d89686739f4c6596c983/" + latitude + "," + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find the location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + 'There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast



//-----------Modified an kept in forecast.js-----------------------------------------------------------------------------------------------------------------------------------
// const url = "https://api.darksky.net/forecast/14f8104f3dc0d89686739f4c6596c983/37.8267,-122.4233?lang=en"

// request({ url: url, json: true }, (error, response) => {

//     //console.log(response) // This prints out all the content of the url webpage.
//     // console.log(error) //In case of error
//     /// Adding error handling

//     if (error) {
//         console.log('Unable to connect to weather service.')
//     } else if (response.body.error) {
//         console.log('Unable to find the location');
//     } else {
//         console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//     }
// })