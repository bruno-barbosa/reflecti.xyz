'use strict';

const request = require('request');
const fs = require('fs');
const path = require('path');

// INPUT: imageUrl
// analyzes one image and return an object with the facerectangles and the emotion with the highest score
// e.g.:
//  {
//    faceRectangle: { height: 92, left: 168, top: 72, width: 92 },
//    emotion: 'surprise'
//  }

exports.analyzeOne = (imgUrl, cb) => {
  let imgObj = {
    "url": imgUrl
  };

  request.post({
    url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
    headers: {
      "Content-Type": `application/json`,
      "Ocp-Apim-Subscription-Key": `ebee3d53bf4145e580b133b8e837ad2a`
    },
    body: JSON.stringify(imgObj)
  }, (err, response, body) => {
      if(err) cb(err);
      response.body = JSON.parse(response.body);

      let highestScore = 0;
      let emotionWithHS = null;

      let emotion;
      console.log('THIS IS IT:', response.body[0].scores);
      for(emotion in response.body[0].scores) {
        console.log("currentEmotion", parseFloat(response.body[0].scores[emotion]));
        console.log('highestScore', highestScore );
        if(parseFloat(response.body[0].scores[emotion]) > parseFloat(highestScore)) {
          highestScore = parseFloat(response.body[0].scores[emotion]);
          emotionWithHS = emotion;
          console.log(emotion);
        }
      }
      let result = {
        "faceRectangle": response.body[0]["faceRectangle"],
        "emotion": emotionWithHS
      };
      cb(null, result);
  });
}
