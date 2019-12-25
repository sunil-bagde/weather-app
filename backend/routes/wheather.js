const express = require('express');
const {
  getWhether, 
} = require('../controllers/wheather');
 

const router = express.Router({ mergeParams: true });
 

router
  .route('/')
  .get(getWhether);

module.exports = router;
