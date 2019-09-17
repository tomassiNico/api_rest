const express = require('express');

let router = express.Router();

const usersController = require('../controllers/UsersController');

router.route('/')
  .post(usersController.create);


module.exports = router;
