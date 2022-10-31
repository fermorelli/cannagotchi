import express from 'express';
import Controllers from './controller.js';

const router = express.Router();

router
  .post('/', Controllers.createUser)
  .get('/users', Controllers.getAllUsers)
  .get('/users/:id', Controllers.getUserById)
  .put('/:id', Controllers.updateUser)
  .delete('/:id', Controllers.deleteUser);

export default router;