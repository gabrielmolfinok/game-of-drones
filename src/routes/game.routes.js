const express = require('express')
const app = express()

const Game = require('./../models/game')


// GET
// app.get('/api/moves', (req, res) => {

//     Move.find({ })
//             .exec( (err, moves) => {

//                 if (err) {
//                     return res.status(400).json({
//                         ok: false,
//                         err
//                     })
//                 }

//                 Move.countDocuments({ }, (err, count) => {

//                     res.json({
//                         ok: true,
//                         moves,
//                         count
//                     })

//                 } )

                
//             })

// })


// POST
app.post('/api/games', (req, res) => {

    let body = req.body
    
    let game = new Game({
        playerOne: body.playerOne,
        playerTwo: body.playerTwo
    })

    game.save( (err, saved) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({ 
            ok: true,
            game: saved
        })


    })

})


// PUT
app.put('/api/games/:game', (req, res) => {

    // Actualizacion de un movimiento en juego X ...

})



module.exports = app;