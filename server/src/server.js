const express = require('express');
const app = express();
const dataDb = require('../src/connection');

app.get('/', (req, res)=> {
    res.end('Server running')
})

app.listen(8080, ()=>{
    console.log('Server running properly')
})