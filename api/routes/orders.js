const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Order is fetched'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }

    res.status(201).json({
        message: 'Order is created',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        message: `Order ID: ${orderId}`
    });
});

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({
        message: `Deleting Order ID: ${orderId}`
    });
});

module.exports = router;