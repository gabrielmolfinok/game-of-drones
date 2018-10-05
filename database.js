const mongoose = require('mongoose');
const URI = 'mongodb://admin:Gabo-11398@ds223763.mlab.com:23763/mern-test';

mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
