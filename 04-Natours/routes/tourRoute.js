const express = require('express');
const tourControllers = require('../controllers/tourRouteControllers');

const Route = express.Router();

Route.route('/top-tours').get(
  tourControllers.aliasTopTours,
  tourControllers.getAllTours
);

Route.route('/tour-stats').get(tourControllers.getTourStats);

Route.route('/tour-monthly-plan/:year').get(tourControllers.getMonthlyPlan);

Route.route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour);
Route.route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.UpdateTour)
  .delete(tourControllers.RemoveTour);

module.exports = Route;
