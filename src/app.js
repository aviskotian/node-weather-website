const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlesbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req, res) => {
    res.render('index',{
        title:'Weather',
        name: 'Avinash'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title:'About Me',
        name: 'Avinash'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title:'Help',
        name:'Avinash',
        message: 'Help page content'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        console.log({ latitude, longitude, location});
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forecast : 'Not going to rain',
    //     location: 'Udupi',
    //     address: req.query.address
    // });
    
})




app.get('/products', (req, res) =>{

    if(!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }

    const a = req.query.search;
    console.log(req.query);
    res.send({
        products:[
            a
        ]
    })
    

    
})
app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        message:'Help article not found',
        name:'Avinash'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title:'404',
        message:'Page Not Found',
        name:'Avinash'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})