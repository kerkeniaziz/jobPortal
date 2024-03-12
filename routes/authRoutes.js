const express = require('express');
const router = express.Router();
const {signin} = require('../controllers/authController');


//auth routes


router.get('/', signin);

module.exports = router;