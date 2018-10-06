// Express
const express = require('express')
const app = express()
const router = express.Router();

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

// Schemas
const User = require('./src/models/user')




// Routes
router.use((req, res, next) => {
    console.log('Petición realizada.');
    next();
});

router.get('/', (req, res) => {

    res.json({
        message: 'Bienvenido!'
    })
    .sendFile(path.join(__dirname, 'build', 'index.html'));

})

app.listen(process.env.PORT || 8080)
console.log('Running')