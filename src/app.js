const path = require('path')        // path is a core module 
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// set up instance of Express
const app = express()
const port = process.env.PORT || 3000

// define paths for Express config 
// first, the root directory
const publicDirectoryPath = path.join(__dirname, '../public')

// then  an alternative path for views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up the view engine for dynamic templating with Handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)  // substitute ../templates for the views folder
hbs.registerPartials(partialsPath)  // register the partials path with hbs, not app

// set up static directory for serving static files
app.use(express.static(publicDirectoryPath))

// #### SET UP PROXY TO GET PAST CORS ####
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dominic Campbell'
    })  // this is the index.hbs template; values are passed in dynamically
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dominic Campbell'
    })  // this is the index.hbs template; values are passed in dynamically
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This help content has been rendered dynamically using hbs/handlebars',
        name: 'D Campbell'
    })  // this is the index.hbs template; values are passed in dynamically
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        // use return to cancel execution of the rest of the function
        // alternatively, wrap the success code in an else clause
        return res.send({
            error: 'Please enter an address'
        })
    }

    // set up a default object {} for the destructured object
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        // callback chaining
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
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
    // a query string is parsed by Express
    if (!req.query.search) {
        // use return to cancel execution of the rest of the function
        // alternatively, wrap the success code in an else clause
        return res.send({
            error: 'You must provide a search term'
        })
    }

    // console.log(req.query)

    res.send({
        products: []
    })
})

// the wildcard can be used under an existing folder, such as help to catch non-existent subfolders or pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found',
        errorMessage: 'Unable to find the help article you are looking for.  Click on help link to return to main help page.',
        name: 'D Campbell'
    })
})

// 404 route must come last, after all the other routes have been tried
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        errorMessage: 'Sorry, we are unable to find the page you have requested, please click on one of the links above',
        name: 'D Campbell'
    })
})


// get the app to listen for requests
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
