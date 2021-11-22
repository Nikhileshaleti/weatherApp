const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmFybWExOSIsImEiOiJjazUxYWVjOGYwcGxuM2ttaWgybDlubDl5In0.HZy6Mmv_spojaHjOx06cmw&limit=1'

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}


module.exports = geocode




//----------------Modified and kept in geocode.js---------------------------------------------------------------------------------------------------------------------------

///Geocoding -- Address -> Lat/Long -> Weather
///Geocoding
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmFybWExOSIsImEiOiJjazUxYWVjOGYwcGxuM2ttaWgybDlubDl5In0.HZy6Mmv_spojaHjOx06cmw&limit=1'

// request({ url: geocodeURL, json: true }, (error, response) => {

//     //Adding error handling
//     if (error) {
//         console.log('Unable to connect to geocoding service')
//     } else if (response.body.features.length == 0) {
//         console.log('Unable to find the location. Try another search')
//     } else {
//         const latitude = response.body.features[0].center[0]
//         const longitude = response.body.features[0].center[1]
//         console.log(latitude, longitude)
//     }

// })