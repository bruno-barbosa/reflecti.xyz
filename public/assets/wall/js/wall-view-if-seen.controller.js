'use strict';

var app = angular.module('reflectiXYZ');

app.controller('wallviewifseenCtlr', function($scope, $stateParams){
  console.log('wallviewifseenCtlr');
  /////////////// Test Cases ///////////////////
  $scope.wall = {};
  $scope.wall.title = "I'm dying";
  $scope.wall.mediaUrl = 'https://media.giphy.com/media/Zko99XD5cP8By/giphy.gif';
  $scope.wall._owner = 'norb';
  $scope.wall.caption = "";
  $scope.wall.reactions = [];
  $scope.wall.reactions[0] = {
      reactor: "Bruno",
      reactionUrl: '/img/download.gif',
      emotion: 'happiness'
    };
  $scope.wall.reactions[1] = {
      reactor: "Bruno",
      reactionUrl: '/img/download.gif',
      emotion: 'happiness'
    };
  $scope.wall.reactions[2] = {
      reactor: "Bruno",
      reactionUrl: '/img/download.gif',
      emotion: 'happiness'
    };
  $scope.wall.reactions[3] = {
      reactor: "Bruno",
      reactionUrl: '/img/download.gif',
      emotion: 'contempt'
    };
  $scope.wall.reactions[4] = {
      reactor: "Bruno",
      reactionUrl: '/img/download.gif',
      emotion: 'sadness'
    };

  $scope.wall.emotionsLibrary = {};
  $scope.wall.emotionsArray = $scope.wall.reactions.map((reaction) => {
    return reaction.emotion;
  });
  console.log($scope.wall.emotionsArray);

  for(var i = 0; i < $scope.wall.emotionsArray.length; i++) {
    if($scope.wall.emotionsArray[i] in $scope.wall.emotionsLibrary){
      $scope.wall.emotionsLibrary[$scope.wall.emotionsArray[i]] += 1;
    } else {
      $scope.wall.emotionsLibrary[$scope.wall.emotionsArray[i]] = 1;
    }
  }

  var count = 0;
  $scope.mostUsedEmotion = null;
  for(var em in $scope.wall.emotionsLibrary) {
    if($scope.wall.emotionsLibrary[em] > count)
        $scope.mostUsedEmotion = em;
        count = $scope.wall.emotionsLibrary[em]
  }

  var emotionUNICODElib = {
    "happiness": "<span>&#x1F604;</span>",
    "surprise": "<span>&#1F631;</span>",
  }

  // $scope.emotionUNICODE = emotionUNICODElib[$scope.mostUsedEmotion];
  //
  // console.log($scope.emotionUNICODE);
});
