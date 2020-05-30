const path  = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Favour Chika'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Chika Hope'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Chika Hope'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "Search address must be provided"}
            )
    }

    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({
                error: 'Cannot connect to weather service'
            })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: 'Please provide a valid address'
                })
            }

            res.send({
                address: address,
                location: location,
                forecast: forecastData
 
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        description: 'Help article not found',
        name: 'Hope',
        title: '404 Page'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        description: 'Page not found',
        name: 'Hope',
        title: '404 Page'
    })
})

app.listen(port, () => {
    console.log('Server listening on port ',port)
})