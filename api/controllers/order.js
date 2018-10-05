const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getAllOrders = (req, res, next) => {
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
};

exports.postAnOrder = (req, res, next) => {
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
};

exports.getSpecificOrder = (req, res, next) => {
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
};

exports.deleteOneOrder = (req, res, next) => {
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
};