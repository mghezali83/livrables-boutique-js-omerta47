const express = require('express');
const router = express.Router();
const productController = require('../controller/products');

// Define API routes for products
// GET /api/products -> to get all products
router.get('/', productController.getAllProducts);

// GET /api/products/:id -> to get a single product by id
router.get('/:id', productController.getProductById);

module.exports = router;
