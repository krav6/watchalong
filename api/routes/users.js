const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resourcessss');
});

router.post('/login', userController.login);

module.exports = router;
