var express = require('express');
var router = express.Router();
var operationController = require('../controllers/operations.controller');
var middleware = require('../middleware');


// router.get('/:id', operationController.getById);

router
    .get('/', operationController.getAll)
    .post('/sum', operationController.sum)
    .post('/substract', operationController.substract)
    .post('/multiply', operationController.multiply)
    .post('/divide', operationController.divide);

router.use(middleware);

module.exports = router;
