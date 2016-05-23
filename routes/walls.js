'use strict';

const express = require('express');
const multer = require('multer');
const router = express.Router();
const dataUriToBuffer = require('data-uri-to-buffer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 30000000
  }
});

const User = require('../models/user');
const Wall = require('../models/wall');

// WALL ROUTES
router.route('/')
  .get(User.authorization(), (req, res) => {
    Wall.find({}).populate('_owner', 'username')
      .exec(res.handler);
  })
  .post(User.authorization(), upload.single('newFile'), (req, res) => {
    Wall.new(req.user._id, req.body, req.file, res.handler);
  });

router.route('/:id')
    .get(User.authorization(), (req, res) => {
      Wall.findOne({ _id: req.params.id }).populate('_owner')
        .exec(res.handler);
    })
    .post(User.authorization(), (req, res) => {
      Wall.edit(req.user._id, req.params.id, req.body, res.handler);
    })
    .delete(User.authorization(), (req, res) => {
      Wall.delete(req.user._id, req.params.id, res.handler);
    });

  router.route('/:id/addReaction')
    .post(User.authorization(), upload.single('newFile'), (req, res) => {
      let uri = req.body.newFile;
      let fileObj = {
        mimetype: 'image/gif',
        originalname: 'reaction.gif',
        buffer: dataUriToBuffer(uri)
      };
      Wall.addReaction(req.user._id, req.params.id, fileObj, res.handler);
    });

module.exports = router;
