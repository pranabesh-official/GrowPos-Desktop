const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017';
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected'))
    .catch(err => console.log('Caught', err.stack));
