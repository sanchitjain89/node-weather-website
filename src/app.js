const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forcast = require('./utils/forecast')

//Define path for express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to work
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Udemy.com!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Node JS!',
        name: 'Sanchit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'We can help you in learning Node JS!',
        name: 'My name is Node, Node JS'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forcast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Udemy.com!',
        errorText: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Udemy.com!',
        errorText: 'My 404 page'
    })
})

app.listen(3000, () => {
    console.log('Server is up at port 3000')
})