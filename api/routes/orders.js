const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    // res.status(200).json({
    //     message: 'Order is fetched'
    // });
    Order.find()
        .select('product quantity _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                order: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            tyep: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    // const order = {
    //     productId: req.body.productId,
    //     quantity: req.body.quantity
    // }
    Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

    // res.status(201).json({
    //     message: 'Order is created',
    //     order: order
    // });
});

router.get('/:orderId', (req, res, next) => {
    // const orderId = req.params.orderId;
    // res.status(200).json({
    //     message: `Order ID: ${orderId}`
    // });
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        res.status(200).json(order);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/:orderId', (req, res, next) => {
    // const orderId = req.params.orderId;
    // res.status(200).json({
    //     message: `Deleting Order ID: ${orderId}`
    // });
    Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
        if(!result) {
            return res.status(404).json({
                message: 'order not found'
            })
        }
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;