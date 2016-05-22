'use strict';

var app = angular.module('reflectiXYZ');

app.controller('profileCtrl', function($scope, $state, $rootScope, Profile) {

  // $scope.edit = angular.copy($scope.currentUser);
  // console.log('$scope.edit:', $scope.$parent.currentUser);
  console.log($rootScope.currentUser);
  $('#addPicDrop').webuiPopover({
      url: '#addPicForm'  });

  $scope.addProfilePic = () => {
    Profile.edit($scope.edit)
      .then(res => {
        $rootScope.currentUser = res;
      });
  };


});
