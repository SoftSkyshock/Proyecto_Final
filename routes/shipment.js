var express = require('express');
var router = express.Router();
var shipmentController = require('../controllers/shipment.controller');
var middleware = require('../middleware');


router.post('/create', shipmentController.createShipment)
router.get('/', shipmentController.changeStatus);

    router.use(middleware);

module.exports = router;
