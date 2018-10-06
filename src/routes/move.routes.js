const express = require('express')
const app = express()

const Move = require('./../models/move')


// GET
app.get('/api/moves', (req, res) => {

    Move.find({ })
            .exec( (err, moves) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                Move.countDocuments({ }, (err, count) => {

                    res.json({
                        ok: true,
                        moves,
                        count
                    })

                } )

                
            })

})


// POST
app.post('/api/moves', (req, res) => {

    let body = req.body
    
    let move = new Move({
        name: body.name,
        kills: body.kills
    })

    move.save( (err, saved) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({ 
            ok: true,
            move: saved
        })


    })

})



module.exports = app;