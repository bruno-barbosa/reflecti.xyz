'use strict';

const mongoose = require('mongoose');


const User = require('./user');
const Upload = require('../components/upload');
const Emotion = require('../components/imageAnalyzer');

// SETS ALBUM SCHEMA
const wallSchema = new mongoose.Schema({
  _owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, trim: true, required: true },
  mediaUrl: { type: String, required: true},
  caption: { type: String, required: true },
  reactions: [
    {
      reactor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      reactionUrl: { type: String,  required: true},
      emotion: { type: String, required: true }
    }
  ]
}, {
  timestamps: true,
});

// CREATE A NEW WALL
wallSchema.statics.new = (ownerId, wallObj, imgObj, cb) => {
  User.findOne({ _id: ownerId }, (err, dbUser) => {
    if (err || !dbUser) { return cb(err || { error: 'User not found.' }); }
      Upload.s3(imgObj, (err, imgUrl) => {

        const wall = new Wall({
          _owner: ownerId,
          title: wallObj.title,
          mediaUrl: imgUrl,
          caption: wallObj.caption,
        });


        wall.save((err, savedWall) => {
          dbUser._walls.push(savedWall._id);
          dbUser.save(cb);
        });

      })

  });
};

// EDIT WALL DETAILS
wallSchema.statics.edit = (userId, wallId, wallObj, cb) => {
  User.findOne({ _id: userId }, (err, dbUser) => {
    if (err || !dbUser) { return cb(err || { error: 'Invalid username.' }); }

    Wall.findOne({ _id: wallId }, (err, dbWall) => {
      if (err || !dbWall) { return cb(err || { error: 'Inexistent wall post.' }); }
      if (!dbWall._owner.equals(dbUser._id)) {
        return cb({ error: 'You must be the wall post owner.' });
      }

      dbWall.title = wallObj.title;
      dbWall.caption = wallObj.caption;

      dbWall.save(cb);
    });
  });
};

 // DELETE WALL
wallSchema.statics.delete = (userId, wallId, cb) => {
  User.findOne({ _id: userId }, (err, dbUser) => {
    if (err || !dbUser) { return cb(err || { error: 'Invalid username.' }); }

    Wall.findOne({ _id: wallId }, (err, dbWall) => {
      if (err || !dbWall) {
        return cb(err || { error: 'Inexistent wall.' });
      }

      if (!dbWall._owner.equals(dbUser._id)) {
        return cb({ error: 'You must be the wall owner.' });
      }

      dbUser._walls.pull({_id: wallId});
      dbWall.remove({ _id: wallId });
      cb();

    });
  });
};

// ADD REACTIONS
wallSchema.statics.addReaction = (userId, wallId, reactionObj, cb) => {
  User.findOne({_id: userId}, (err, dbUser) => {
    if (err || !dbUser) { return cb(err || { error: 'Invalid user.' }); }

    // if(err || dbWall._owner.equals(dbUser._id) {
    //   return cb({error: 'You cannot react to your own post.'});
    // });

    Wall.findOne({_id: wallId}, (err, dbWall) => {
      if (err || !dbWall) {
        return cb(err || { error: 'Inexistent wall.' });
      }

      Upload.s3(reactionObj, (err, imgUrl) => {
        Emotion.analyzeOne(imgUrl, (err, emotionObj) => {

          let newReaction = {
            reactor: dbUser._id,
            reactionUrl: imgUrl, //imgUrl,
            emotion: emotionObj.emotion
          };

          dbWall.reactions.push(newReaction);
          dbWall.save((err, newWall) => {
            dbUser._reactions.push(newWall.reactions[newWall.reactions.length - 1]._id);
            dbUser.save(cb(null, newReaction));
          });
        });
      });
    });
  });
};





const Wall = mongoose.model('Wall', wallSchema);
module.exports = Wall;
