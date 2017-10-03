const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const models = require('../models');
const Hotels = models.Hotel;
const Activities = models.Activity;
const Restaurants = models.Restaurant;
const Places = models.Place;

router.get('/', (req, res, next) => {
  let allAttractions = {};

  Hotels.findAll()
  .then(allHotels => {
    allAttractions.hotels = allHotels;
    return Restaurants.findAll()
  })
  .then(allRestaurants => {
    allAttractions.restaurants = allRestaurants;
    return Activities.findAll()
  })
  .then(allActivities => {
    allAttractions.activities = allActivities;
  })
  .then( () => {
    res.json(allAttractions);
  })
  .catch(next);
})

module.exports = router;
