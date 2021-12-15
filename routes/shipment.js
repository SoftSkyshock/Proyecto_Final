var express = require('express');
var router = express.Router();
var shipmentController = require('../controllers/shipment.controller');
var middleware = require('../middleware');


// router.get('/:id', shipmentController.getById);

router
    .post('/create', shipmentController.createShipment)
    .get('/', shipmentController.changeStatus);

router.use(middleware);

module.exports = router;
