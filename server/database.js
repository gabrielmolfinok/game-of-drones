
// DB Connection
const mongoose = require('mongoose')
const URI = 'mongodb://gabriel:gabriel123@ds223653.mlab.com:23653/game-of-drones'

mongoose.connect( URI, { useNewUrlParser: true } )
.then( res => {
    console.log(`   BD (${res.connections[0].name}): OK`)
    console.log('==========================================')
} )
.catch( err =>  console.log(err) )
