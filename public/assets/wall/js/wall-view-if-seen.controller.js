'use strict';

var app = angular.module('reflectiXYZ');

app.controller('wallviewifseenCtlr', function($scope, $stateParams, wall){
  var currentWall = wall.data;

  $scope.wall = {};

  $scope.wall.mediaUrl = currentWall.mediaUrl;
  $scope.wall._owner = currentWall._owner;
  $scope.wall.caption = currentWall.caption;
  $scope.wall.reactions = currentWall.reactions;

  console.log('$scope.wall', $scope.wall);

////////////////////// emotions library //////////////////////////

  // $scope.wall.emotionsLibrary = {};
  // $scope.wall.emotionsArray = $scope.wall.reactions.map((reaction) => {
  //   return reaction.emotion;
  // });
  // console.log($scope.wall.emotionsArray);
  //
  // for(var i = 0; i < $scope.wall.emotionsArray.length; i++) {
  //   if($scope.wall.emotionsArray[i] in $scope.wall.emotionsLibrary){
  //     $scope.wall.emotionsLibrary[$scope.wall.emotionsArray[i]] += 1;
  //   } else {
  //     $scope.wall.emotionsLibrary[$scope.wall.emotionsArray[i]] = 1;
  //   }
  // }
  //
  // var count = 0;
  // $scope.mostUsedEmotion = null;
  // for(var em in $scope.wall.emotionsLibrary) {
  //   if($scope.wall.emotionsLibrary[em] > count)
  //       $scope.mostUsedEmotion = em;
  //       count = $scope.wall.emotionsLibrary[em]
  // }
  //
  // var emotionUNICODElib = {
  //   "happiness": "<span>&#x1F604;</span>",
  //   "surprise": "<span>&#1F631;</span>",
  // }

  // $scope.emotionUNICODE = emotionUNICODElib[$scope.mostUsedEmotion];
  //
  // console.log($scope.emotionUNICODE);

  ////////////////////// emotions library //////////////////////////



});
