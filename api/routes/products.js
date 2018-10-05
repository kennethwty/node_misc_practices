const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const ProductControllers = require('../controllers/product');

// const Product = require('../models/product');

router.get('/', ProductControllers.getAllProducts);

router.post('/', checkAuth, ProductControllers.createOneProduct);

router.get('/:productId', ProductControllers.getOneProduct);

router.patch('/:productId', checkAuth, ProductControllers.updateOneProduct);

router.delete('/:productId', checkAuth, ProductControllers.deleteOneProduct);

module.exports = router;