'use strict';

var app = angular.module('reflectiXYZ');

app.controller('authCtrl', function($scope, $state, $auth, $rootScope, Auth) {

  $scope.registerSubmit = () => {
    Auth.register($scope.newUser)
      .then(res => {
        console.log('res',res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  $scope.loginSubmit = () => {
    Auth.login($scope.user)
      .then(res => {
        $rootScope.currentUser = res;
        $state.go('profile-walls');
      })
      .catch(err => {
        $scope.error = err;
      });
  };

  $scope.authenticate = provider => {
  	$auth.authenticate(provider)
  		.then(function(res) {
  		$rootScope.currentUser = res.data;
  		$state.go('profile-walls');
  	})
  		.catch(function(response) {
  		// Something went wrong.
  	});
  };
});
