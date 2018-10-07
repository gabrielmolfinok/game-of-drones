// Express
const express = require('express')
const app = express()

// BodyParse - req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Model
const User = require('./../models/user')


// GET
app.get('/api/users', (req, res) => {

    User.find({ })
            .exec( (err, users) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                User.countDocuments({ }, (err, count) => {

                    res.json({
                        ok: true,
                        users,
                        count
                    })

                } )

                
            })

})

app.get('/api/users/:name', (req, res) => {

    let name = req.params.name

    User.find({ name })
            .exec( (err, user) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                res.json({
                    ok: true,
                    user
                })

                
            })

})


// POST
app.post('/api/users', (req, res) => {

    let body = req.body
    
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
            user: saved
        })


    })

})



module.exports = app;