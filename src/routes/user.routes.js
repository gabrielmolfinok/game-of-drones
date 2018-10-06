const express = require('express')
const app = express()

const User = require('./../models/user')


// GET
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
            usuario: saved
        })


    })

})



module.exports = app;