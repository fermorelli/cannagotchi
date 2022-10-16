import mongoose from 'mongoose';
import app from './app.js';

mongoose.connect('mongodb://127.0.0.1:27017/crud', (error) => {
    if (error) {
      console.log('Fail to connect', error);
    } else {
      console.log('Connected to database');
      app.listen(5000, () => {
        console.log(`Example app listening on port 5000`);
      });
    }
  },
);
