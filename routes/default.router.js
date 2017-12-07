var express = require('express');
var router = express.Router();
var defaultCtrl = require('../controllers/default.ctrl');

router.get('/', defaultCtrl.get);
router.get('/health', defaultCtrl.health);


module.exports = router;