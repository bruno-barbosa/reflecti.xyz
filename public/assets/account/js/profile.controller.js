'use strict';

var app = angular.module('reflectiXYZ');

app.controller('profileCtrl', function($scope, $state, $rootScope, Auth, Profile) {

  $scope.currentUser = Auth.currentUser;
  $scope.edit = angular.copy($scope.currentUser);

  $('#profileEditDrop').webuiPopover({
      url: '#profileEditForm'  });

  $scope.editSubmit = () => {
    console.log('yo');
    Profile.edit($scope.edit)
      .then(res => {
        $scope.currentUser = res;
      });
  };
});
