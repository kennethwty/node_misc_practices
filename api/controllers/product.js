const mongoose = require('mongoose');
const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.createOneProduct = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST request to /products route',
            createdProduct: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.getOneProduct = (req, res, next) => {
    const id = req.params.productId;
    // res.status(200).json({
    //     message: `Getting Product ID: ${id}`
    // });
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: "cannot be found" });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

exports.updateOneProduct = (req, res, next) => {
    const id = req.params.productId;
    // this approach to updating does not require all fields to be provided
    const updateOps = {}
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key];
    }
    Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.deleteOneProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};