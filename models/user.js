'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// SETS USER SCHEMA
const userSchema = new mongoose.Schema({
  imgurl: { type: String },
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true },
  email: { type: String, trim: true, unique: true, required:true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please input a valid email address'] },
  facebook: { type: String },
  password: { type: String },
  role: { type: String, default: 'user' },
  _walls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wall' }],
  _reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wall' }]
},
  {
    timestamps: true,
  });


// REGISTER NEW USER
userSchema.statics.register = (userObj, cb) => {
  User.findOne({ username: userObj.username }, (err, dbUser) => {
    if (err || dbUser) { return cb(err || { error: 'Please try again' }); }

    bcrypt.hash(userObj.password, 12, (err, hash) => {
      if (err) { return cb(err); }

      const user = new User({
        firstName: userObj.firstName,
        username: userObj.username,
        email: userObj.email,
        password: hash,
      });

      user.save((err, savedUser) => {
        savedUser.password = null;
        cb(null, savedUser);
      });
    });
  });
};

// EDIT & UPDATE USER
userSchema.statics.edit = (userId, userObj, cb) => {
  User.findOne({ _id: userId }, (err, dbUser) => {

      dbUser.firstName = userObj.firstName;
      dbUser.lastName = userObj.lastName;
      dbUser.email = userObj.email;
      dbUser.imgurl = userObj.imgurl;

      dbUser.save(cb);
  });
};

// VERIFY USER AUTHENTICATION
userSchema.statics.authenticate = (userObj, cb) => {
  User.findOne({ email: userObj.email }, (err, dbUser) => {
    if (err || !dbUser) {
      return cb(err || { error: 'Authentication failed.  Invalid email or password.' });
    }

    bcrypt.compare(userObj.password, dbUser.password, (err, validPassword) => {
      if (err || !validPassword) {
        return cb(err || { error: 'Authentication failed.  Invalid email or password.' });
      }

      const token = dbUser.generateToken();

      cb(null, token);
    });
  });
};

// VERIFY USER AUTHORIZATION
userSchema.statics.authorization = roleRequired => {
  return (req, res, next) => {
    const token = req.cookies.accessToken;

    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) { return res.status(401).send({ error: 'Authorization required.' }); }

      User.findById(payload._id, (err, user) => {
        if (err || !user) { return res.status(401).send({ err: 'User not found.' }); }

        req.user = user;

        if (roleRequired === 'admin' && !req.user.admin) {
          return res.status(403).send({ error: 'Not authorized' });
        }
        next();
      }).select('-password');
    });
  };
};

// GENERATE AUTHENTICATION TOKEN
userSchema.methods.generateToken = function () {
  const payload = {
    _id: this._id,
    exp: moment().add(1, 'day').unix(),
  };

  return jwt.sign(payload, JWT_SECRET);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
