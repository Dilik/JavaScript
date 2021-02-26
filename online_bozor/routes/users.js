const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.userRegisterForm)
    .post(users.registerUser)

router.route('/login')
    .get(users.loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), users.login)

router.get('/logout', users.logout);

module.exports = router;