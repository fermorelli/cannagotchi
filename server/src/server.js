import express from 'express';
import objectDb from '../src/connection.js';
import userSchema from './users.js';
import router from './routes.js';

const app = express();

const db = objectDb;

app.use(router);
app.get('/', (req, res)=>{
    res.end('Up and running')
});
app.listen(5000, ()=>{
    console.log('Server running properly')
});
