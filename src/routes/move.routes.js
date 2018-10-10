const express = require('express')
const app = express()

// BodyParse - req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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


app.put('/api/moves/editname/:id', (req, res) => {
    
    let _id = req.params.id
    let body = req.body

    Move.
    find( { _id } ).
    exec(( err, move ) => {

        let oldName = move[0].name

        Move.
        findOneAndUpdate( { _id }, { name: body.newName }, { new: true }, (err, updated) => {
    
            Move.
            findOneAndUpdate( { kills: oldName }, { kills: body.newName }, { new: true }, (err, updated) => {
                if (err) {
                    console.log(err);
                }
            })
            
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
    
            res.json({
                ok: true,
                move: updated
            })
    
        })


    })


})

app.put('/api/moves/editkills/:id', (req, res) => {
    
    let _id = req.params.id
    let body = req.body

    Move.
    findOneAndUpdate( { _id }, { kills: body.newKills }, { new: true }, (err, updated) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            move: updated
        })

    })

})


app.delete('/api/moves/:id', (req, res) => {
    
    let _id = req.params.id
    let body = req.body

    Move.
    findOneAndDelete( { _id }, (err, deleted) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            move: deleted
        })

    })

})



module.exports = app;