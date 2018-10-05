const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/user');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const User = require('../models/user');

router.post("/signup", UserController.user_signUp);

router.post("/login", UserController.user_Login);

router.delete('/:userId', checkAuth, UserController.user_Delete);

module.exports = router;