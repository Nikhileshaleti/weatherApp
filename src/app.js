const path = require('path')
const express = require('express')
const hbs = require('hbs') // enables us to use templates multiple times.
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//path can be used to change the paths from one file.

const app = express()

//when we deploy on heroku it provides a port.
const port = process.env.PORT || 3000 // used a logical OR in case if we use this locally.

///Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
    // express looks for views folder bydefault. To change it we need to specify the path to it.
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

///Setup handlebars engine and views locations
//tells express which templating en gine which we installed.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

///Setup static directory to serve.
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //for dynamic pages we pass objects
    res.render('index', {
        title: 'Weather',
        name: 'Nikhilesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nikhilesh '
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some helpful text.',
        title: 'Help',
        name: 'Nikhilesh'
    })
})

//weather route
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        //setting default value to destructured objects
        if (error) {
            return res.send({ error })
        }

        //i/p for forecast comes from the o/p of geocode
        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })
        })
    })
})

//endpoint accepting address
app.get('/products', (req, res) => {
    if (!req.query.search) { // When there is no search key found
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    })
})

//This is used for matching specific patterns. -> Used here to match for the extensions of help page. So that we can display our message in a more specific way.
app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: '404',
        name: 'Nikhilesh',
        errorMessage: 'Help article not found'
    })
})

//Error 404
//Express provides match anything '*'. This gets matched if nothing above gets matched.
app.get('*', (req, res) => {
    res.render('404error', {
        title: '404',
        name: 'Nikhilesh',
        errorMessage: 'Page not found'
    })
})

// starts the server // takes port and callback fn as a param
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})