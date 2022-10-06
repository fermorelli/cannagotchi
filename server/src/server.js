import express from 'express';
const app = express();
import dataDb from '../src/connection.js';
import router from './routes.js';

app.get('/', router)

app.listen(8080, ()=>{
    console.log('Server running properly')
})