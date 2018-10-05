const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose'); // refactored
const checkAuth = require('../middleware/check-auth');

// const Order = require('../models/order');
// const Product = require('../models/product');

// import the order controller
const OrdersController = require('../controllers/order');

router.get('/', checkAuth, OrdersController.getAllOrders);

router.post('/', checkAuth, OrdersController.postAnOrder);

router.get('/:orderId', checkAuth, OrdersController.getSpecificOrder);

router.delete('/:orderId', OrdersController.deleteOneOrder);

module.exports = router;