'use strict';

const express = require('express');
const router = express.Router();

const request = require('request');
const User = require('../models/user');

//  auth.js
//  /auth  router

router.post('/facebook', (req, res) => {
  const fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  const accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  const graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  const params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri
  };
  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({ message: accessToken.error.message });
    }
    // Step 2. Retrieve profile information about the current user.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: profile.error.message });
      }
      // Step 3. Create a new user account or return an existing one.
      User.findOne({ facebook: profile.id }, function(err, existingUser) {
        if (existingUser) {
          const token = existingUser.generateToken();
          console.log('createdToken:', token);
          return res.cookie('accessToken', token).send(existingUser._id);
        }

        var imageReq = `https://graph.facebook.com/${profile.id}/picture?type=large`;
        request.get({ url: imageReq, qs: accessToken}, function(err, response, profileImage) {
          let user = new User();
          user.facebook = profile.id;
          user.imgurl = response.request.uri.href;
          user.firstName = profile.first_name;
          user.lastName = profile.last_name;
          user.email = profile.email;
          user.save(function() {
            console.log('ID', user._id);
            let token = user.generateToken();
            res.cookie('accessToken', token).send(user._id);
          });
        })

      });
    });
  });
});


module.exports = router;
