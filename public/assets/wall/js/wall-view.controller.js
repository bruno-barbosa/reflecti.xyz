'use strict';

var app = angular.module('reflectiXYZ');

app.controller('wallViewCtrl', function($scope, $stateParams, $timeout, SweetAlert){
  console.log('wallViewCtrl');
  $scope.wall = {};

  /////////////// Test Cases ///////////////////
  $scope.wall.title = "I'm dying";
  $scope.wall.mediaUrl = 'https://media.giphy.com/media/Zko99XD5cP8By/giphy.gif';


  // Wall.getWallById($stateParams.id)
  //   .then(res => {
  //     $scope.wall = res.data;
  //   })

  $scope.takeSnapShot = () => {
      // By default, a user's webcam is used to create the animated GIF
      gifshot.createGIF({
        'interval': 0.35,
        'keepCameraOn': true,
        "interval": 0.05,
        "numFrames": 30
      }, function(obj) {
          if(!obj.error) {
              var image = obj.image,
              animatedImage = document.createElement('img');
              animatedImage.src = image;
              // document.body.appendChild(animatedImage);
              // document.getElementById('result').appendChild(animatedImage);
              SweetAlert.swal({
                title: 'Here is your reaction! Do you want to add it?',
                html: true,
                text: `<img src="${image}" />`,
                showCancelButton: true,
                cancelButtonText: 'No. Maybe next time.',
                confirmButtonText: 'Let\'s post it'
              }, function(isConfirm) {
                // TODO: redirect user
              })
          }
      });
      gifshot.stopVideoStreaming();
  }

  $timeout($scope.takeSnapShot(), 3000);
});
