import express from 'express';
import userController from './controller.js';

const router = express.Router();

router
  .get('/', userController.getAllUsers)
  .get('/:id', userController.getUserById)
  .post('/', userController.createUser)
  .delete('/:id', userController.deleteUser)
  .put('/:id', userController.updateUser);

export default router;