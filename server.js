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

// Schemas
const User = require('./src/models/user')


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);




// Routes
app.get('/api/users', (req, res) => {

    User.find({ })
            .exec( (err, usuarios) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                User.countDocuments({ }, (err, count) => {

                    res.json({
                        ok: true,
                        usuarios,
                        count
                    })

                } )

                
            })

})

app.post('/api/users', (req, res) => {

    let body = req.body

    console.log(body);
    
    let user = new User({
        name: body.user.name
    })

    user.save( (err, saved) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({ 
            ok: true,
            usuario: saved
        })


    })

})

app.listen(process.env.PORT || 8080)
console.log('Port: ', process.env.PORT || 8080)