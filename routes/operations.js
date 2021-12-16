var express = require('express');
var router = express.Router();
var operationController = require('../controllers/operations.controller');
var middleware = require('../middleware');


// router.get('/:id', operationController.getById);


router.get('/', operationController.getAll)
router.post('/sum', operationController.sum)
router.post('/substract', operationController.substract)
router.post('/multiply', operationController.multiply)
router.post('/divide', operationController.divide);

router.use(middleware);

module.exports = router;
