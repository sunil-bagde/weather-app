const express = require('express');
const {
  getWeather, 
} = require('../controllers/wheather');
 

const router = express.Router({ mergeParams: true });
 

router
  .route('/')
  .get(getWeather);

module.exports = router;
