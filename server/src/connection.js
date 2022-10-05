const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/crud');

const objectDb = mongoose.connection;

objectDb.on('connected', ()=>{
    console.log('Properly connected to MongoDB')
})
objectDb.on('error', ()=>{
    console.log('Error when connected to MongoDB')
})

module.exports = mongoose;