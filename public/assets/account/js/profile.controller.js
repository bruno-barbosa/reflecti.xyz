'use strict';

var app = angular.module('reflectiXYZ');

app.controller('profileCtrl', function($scope, $state, $rootScope, profile, Profile) {

  $scope.edit = angular.copy(profile);

  $('#profileEditDrop').webuiPopover({
      url: '#profileEditForm',
      animation:'pop'
  });

  $scope.editSubmit = () => {
    console.log('yo');
    Profile.edit($scope.edit)
      .then(res => {
        $scope.currentUser = res;
      });
  };
});
