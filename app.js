const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb+srv://node-admin:' +
    process.env.MONGO_ATLAS_PW +
    '@node-rest-shop-aod91.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method == 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, GET, PATCH, POST, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users/', userRoutes);

// catch all, no matching routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;