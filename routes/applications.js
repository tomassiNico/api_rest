const express = require('express');

const router = express.Router();

const applicationController = require('../controllers/ApplicationsController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const findUser = require('../middlewares/findUser');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');

router.all('*',jwtMiddleware({secret: secrets.jwtSecret}),findUser,authenticateAdmin);

router.route('/')
  .get(applicationController.index)
  .post(applicationController.create);

router.route('/:application_id')
  .delete(applicationController.find, applicationController.destroy);

module.exports = router;
