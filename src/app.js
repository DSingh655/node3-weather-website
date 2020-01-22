//imp 7 web server 7th video
//2 Accessing api 2nd video 1:00

/*git coomand
git add filename (ise . for al)
git status
git commit
*/
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Deep Singh'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        helpText: 'This is help from dsingh',
        name: 'Deep Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title : 'Help',
        helpText : 'This is help example',
        name: 'Deep Singh'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send('No address is provided')
    }

    geocode(req.query.address, (error, { latitude,longitude,location} = {}) => {
        if(error) {
            return res.send(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }

            res.send({
                forecast :forecastData,
                location,
                address : req.query.address
            })

        })
    })
    
    /*
    res.send({
        forecast: 'It is winter',
        location: 'IIT Bhilai',
        address: req.query.address
    })
    */
})


app.get('/help/*', (req, res) => {
    res.render('404',{
        title : '404',
        name : 'Deep Singh',
        errorMessage : 'Help article not found'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title : '404',
        name : 'Deep Singh',
        errorMessage : 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})



//app.com
//app.com/help
//app.com/about