// import express
const express = require('express');

// creating router
const router = express.Router();

//Import Product Controller
const productController = require('./product-controller');

//route API's
router.post('/products/create', productController.createProduct);
router.get('/', productController.listProducts);
router.delete('/products/:id', productController.deleteProduct);
router.post('/products/:id/update_quantity', productController.updateQuantity);

// export the router
module.exports = router;
