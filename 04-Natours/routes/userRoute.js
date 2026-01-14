const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userRouteControllers');

const Route = express.Router();

Route.route('/').get(getAllUsers).post(createUser);
Route.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = Route;
