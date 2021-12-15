var express = require('express');
var router = express.Router();
var paymentController = require('../controllers/payment.controller');
var middleware = require('../middleware');


//router.use(middleware);

router
    .get('/promos', paymentController.getPromos)
    .post('/apply-discount', paymentController.applyDiscount)
    .post('/', paymentController.create);

router.use(middleware);

module.exports = router;
