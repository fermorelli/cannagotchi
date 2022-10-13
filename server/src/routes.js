import express from 'express';

const router = express.Router();

router.get('/hi', (req, res)=>{
    res.end('Hi!');
});

export default router; 