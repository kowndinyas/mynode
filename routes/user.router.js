var express = require("express");
var router = express.Router();
var UserCtrl = require('../controllers/user.ctrl');

router.post('/register', UserCtrl.register);
router.post('/login', UserCtrl.login);

module.exports = router;