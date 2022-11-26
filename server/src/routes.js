import express from 'express';
import usersControllers from './users/controller.js';
import plantsControllers from './plants/controllers.js';

const router = express.Router();

router
  .post('/', usersControllers.createUser)
  .post('/', plantsControllers.createPlant)
  .get('/users', usersControllers.getAllUsers)
  .get('/plants', plantsControllers.getAllPlants)
  .get('/users/:id', usersControllers.getUserById)
  .put('/:id', usersControllers.updateUser)
  .delete('/:id', usersControllers.deleteUser);

export default router;