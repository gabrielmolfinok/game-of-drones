const express = require('express')
const app = express()

const Game = require('./../models/game')
const User = require('./../models/user')


// GET
app.get('/api/games', (req, res) => {

    let body = req.body
    let from = Number(req.query.from) || 0
    let to = Number(req.query.to) || 5

    Game.find( { } )
        .skip(from)
        .limit(to)
        .exec( (err, games) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                games
            })
        
    })
            

})


// GET (Games a player's won)
app.get('/api/games/:name', (req, res) => {

    let name = req.params.name

    Game.find( 

        { $and: [ 
            { $or: [ { playerOne: name }, { playerTwo: name } ] },
            { $or: [ { pOneScore: { $eq: 3 } }, { pTwoScore: { $eq: 3 } } ] }
        ] } )

                .exec( (err, games) => {

                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        })
                    }

                    Game.count({  }, (err, count) => {

                        res.json({
                            ok: true,
                            player: name,
                            games,
                            count
                        })
    
                    } )

                    
                })
            

})


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