const express = require('express')
const app = express()

app.get('/', (req, res)=> {
    res.end('Server running')
})

app.listen(8080, ()=>{
    console.log('El servidor esta corriendo correctamente')
})