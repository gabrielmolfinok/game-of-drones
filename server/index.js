// Express
const express = require('express')
const app = express()
const path = require('path')



// BodyParse - req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Db connection
const mongoose = require('mongoose')
const URI = 'mongodb://gabriel:gabriel123@ds223653.mlab.com:23653/game-of-drones'
mongoose.connect(URI, { useNewUrlParser: true })
    .then(() => {
        console.log('BD: OK')
    })
    .catch(err => {
        console.log(err)
    });



// Allow requests from :3000 to :8080
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);


// Routes
app.use(require('./../src/routes/index'))


// Escucha del puerto
process.env.PORT = process.env.PORT || 8080
app.listen(process.env.PORT)
console.log(`Port: ${process.env.PORT}`)