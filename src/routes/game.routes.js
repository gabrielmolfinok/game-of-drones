const express = require('express')
const app = express()

const Game = require('./../models/game')


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
app.put('/api/games/:id', (req, res) => {

    // Finalizacion de un juego
    let id = req.params.id
    let body = req.body;

    console.log(id);
    console.log(body)

    Game.findOneAndUpdate({_id: id}, {pOneScore: body.pOneScore, pTwoScore: body.pTwoScore}, {new: true}, (err, updated) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        console.log(updated)

        res.json({
            ok: true,
            game: updated
        })

    })

})



module.exports = app;