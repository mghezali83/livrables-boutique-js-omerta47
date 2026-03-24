const express = require('express');

const productsController = require('../controller/products');

const router = express.Router();

router.get('/meta', productsController.getStoreMeta);
router.post('/checkout', productsController.checkout);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

module.exports = router;
