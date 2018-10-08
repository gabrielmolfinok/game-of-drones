
const express = require('express')
const app = express()


app.use( require('./user.routes') )
app.use( require('./move.routes') )
app.use( require('./game.routes') )


module.exports = app
