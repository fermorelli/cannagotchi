import express from 'express';
import router from './routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors);

app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
