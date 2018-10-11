const express = require('express')
const app = express()

const Game = require('./../models/game')
const User = require('./../models/user')


// GET
app.get('/api/games', (req, res) => {

    let from = Number(req.query.from) || 0
    let to = Number(req.query.to) || 5

    Game.
    find().
    skip( from ).
    limit( to ).
    sort({ 'playedAt': 'desc' }).
    exec( (err, games) => {

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
app.get('/api/games/player/:name', (req, res) => {

    let name = req.params.name

    User.
    find({ name }).
    exec(( err, dbPlayer ) => {

        try {
            
            let player = {
                _id: dbPlayer[0]._id,
                name: dbPlayer[0].name,
                created: dbPlayer[0].created,
                played: 0,
                wins: 0
            }
    
            Game.
            find({ $or: [{ playerOne: player.name }, { playerTwo: player.name }] }).
            exec(( err, gamesPlayed ) => {
    
                player.played = gamesPlayed.length
                
                Game.
                find( { $or: [ 
                        { $and: [ { playerOne: name }, { pOneScore: { $eq: 3 } } ] },
                        { $and: [ { playerTwo: name }, { pTwoScore: { $eq: 3 } } ] } 
                    ] } ).
                exec(( err, gamesWon ) => {
    
                    player.wins = gamesWon.length
                    
                    res.json({
                        ok: true,
                        player
                    })
                    
                })
    
            })

        } catch(err) {
            
            res.json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            })
            
        }


    })

})


// POST
app.post('/api/games', (req, res) => {

    let body = req.body
    
    let game = new Game({
        playerOne: body.playerOne,
        playerTwo: body.playerTwo,
        playedAt: new Date()
    })

    game.
    save( (err, saved) => {

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

    Game.
    findOneAndUpdate({_id: id}, {pOneScore: body.pOneScore, pTwoScore: body.pTwoScore}, {new: true}, (err, updated) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            game: updated
        })

    })

})



module.exports = app;