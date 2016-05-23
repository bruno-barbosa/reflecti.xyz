'use strict';

var app = angular.module('reflectiXYZ');

app.controller('wallListCtrl', function($scope, $state, Upload, Wall) {

  Wall.get()
    .then(res => {

      $scope.posts = res.data;

      for(var i in res.data) {
        $scope.mediaType = res.data[i].mediaUrl.split('.').pop();
        res.data[i].emotionsArray = [];
      }

      for(var i = 0; i < $scope.posts.length; i++){
        $scope.posts[i].reactions.forEach(reaction => {
          $scope.posts[i].emotionsArray.push(reaction.emotion);
        });
      }

      console.log('YOOO',$scope.posts);
    })
    .catch( err => {
      if(err) {
        console.log(err);
      }
    })

  $scope.newWallPost = () => {
    Upload.upload({
      url: '/walls',
      data: {newFile: $scope.newPost.mediaUrl,
      title: $scope.newPost.title,
      caption: $scope.newPost.caption}
    })
    .then( res => {
      Wall.get()
        .then(res => {

          for(var i in res.data) {
            $scope.mediaType = res.data[i].mediaUrl.split('.').pop();
          }

          $scope.posts = res.data;

          console.log(res.data);
        })
        .catch( err => {
          if(err) {
            console.log(err);
          }
        });
    })
    .catch( err => {
      if(err) {
        $scope.postErr = err;
      }
    });
    // console.log($scope.newPost);
    // Wall.new($scope.newPost)
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(err => {
    //   $scope.postErr  = err;
    // });
  };
});
