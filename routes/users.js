'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const s3 = require('../components/upload');

// AUTHORIZATION & AUTHENTICATION ROUTES
router.post('/register', (req, res) => {
  User.register(req.body, res.handler);
  console.log(req.body);
});

router.post('/login', (req, res) => {
  User.authenticate(req.body, (err, token) => {
    if (err) { return res.status(400).send(err); }
    res.cookie('accessToken', token).send();
  });
});

router.delete('/logout', (req, res) => {
  res.clearCookie('accessToken').send();
});

router.use('/social', require('./social'));

// USER PROFILE ROUTES
router.route('/profile')
  .get(User.authorization(), (req, res) => {
    User.find({ username: req.user.username }).populate('_walls').select('-password')
      .exec(res.handler);
  })
  .put(User.authorization(), (req, res) => {
    User.edit(req.user._id, req.body, res.handler);
  })
  .delete(User.authorization('admin'), (res, req) => {
    User.remove({ username: req.body.username }, res.handler);
  });

module.exports = router;
