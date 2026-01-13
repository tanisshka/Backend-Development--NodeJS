const express = require('express');
const tourControllers = require('../controllers/tourRouteControllers');

const Route = express.Router();

Route.route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour);
Route.route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.UpdateTour)
  .delete(tourControllers.RemoveTour);

module.exports = Route;
