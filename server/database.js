// Db connection
const mongoose = require('mongoose')
const URI = 'mongodb://gabriel:gabriel123@ds223653.mlab.com:23653/game-of-drones'

mongoose.connect(URI, { useNewUrlParser: true })
    .then(() => { // if all is ok we will be here
        console.log('BD: OK')
    })
    .catch(err => {
        console.log(err)
    });