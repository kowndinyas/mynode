var express = require('express');
var router = express.Router();
var productCtrl = require('./../controllers/product.ctrl');
var reviewCtrl = require('./../controllers/review.ctrl');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        var filename = Date.now() + "-" + file.originalname;
        req.uploadedImg = filename;
        cb(null, filename);
    }
});

var upload = multer({ storage: storage });

//GET http://localhost:3000/api/products/
//GET http://localhost:3000/api/products/0/10
router.get('/', productCtrl.get);
router.get('/:pageIndex/:pageSize', productCtrl.get);

router.get('/:id', productCtrl.getById);
router.post('/', upload.single('photo'), productCtrl.save);
router.delete('/:id', productCtrl.delete);
router.put('/:id', productCtrl.update);
router.post('/reviews', reviewCtrl.save);


module.exports = router;