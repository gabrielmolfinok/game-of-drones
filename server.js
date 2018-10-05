// Express
const express = require('express')
const app = express()
const router = express.Router();

// Db connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://admin:admin12345@ds223653.mlab.com:23653/game-of-drones')

// BodyParse - req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PORT
const port = process.env.PORT || 3000

// Schemas
const User = require('./app/models/user')


router.use(function(req, res, next) {
    console.log('Petición realizada.');
    next();
});

// Homepage
router.get('/', (req, res) => {

    res.json({
        message: 'Bienvenido!'
    })

})

app.use('/', router);

// Escucha del puerto
app.listen(port)
console.log(`Puerto: ${port}`)