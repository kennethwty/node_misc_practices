const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// import the user model
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            // found something
            if(user.length >= 1) {
                return res.status(409).json({
                    message: 'Email exists'
                });
            } else {
                // salting: adding random strings to the plain text pw before hashing
                // 10 salting rounds
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    // only when we can safely hash the password we create the user
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        // Store hash in DB.
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Created User'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                            });
                        });
                    }
                })
            }
        });
});

router.delete('/:userId', (req, res, next) => {
    User.remove({
        _id: req.params.userId
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;