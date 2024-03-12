const express = require('express');
const router = express.Router();
const {signup} = require('../controllers/authController');


//auth routes


router.get('/signup', signup);

module.exports = router;