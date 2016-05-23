'use strict';

var app = angular.module('reflectiXYZ');

app.service('Auth', function($http, $q, $rootScope) {

  this.register = userObj => {
    return $http.post('/users/register', userObj);
  };

  this.login = userObj => {
    return $http.post('/users/login', userObj)
      .then(res => {
        return this.getProfile(res);
      })
      .catch(err => {
        return $q.reject(err.data.error);
      });
  };

  this.logout = () => {
    return $http.delete('/users/logout')
      .then(res => {
        return $q.resolve(res);
      });
  };

  this.getProfile = () => {
    return $http.get('/users/profile')
      .then(res => {
        // this.currentUser = res.data[0];
        return $q.resolve(res.data[0]);
      })
      .catch(res => {
        this.currentUser = null;
        return $q.reject(res.data);
      });
  };
});

app.service('Profile', function($http, $q) {

  this.edit = user => {
    return $http.put('/users/profile', user)
      .then(res => {
        return res.data;
      });
  };


});
