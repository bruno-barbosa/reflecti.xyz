'use strict';

var app = angular.module('reflectiXYZ');

app.service('Wall', function($http, $q) {

  this.get = () => {
    return $http.get('/walls');
  };

  this.edit = wallObj => {
    return $http.post(`/walls/${wallObj.id}`, wallObj);
  };

  this.delete = wallObj => {
    return $http.delete(`/walls/${wallObj.id}`);
  };

  this.reaction = (wallId, reactionObj) => {
    return $http.post(`/walls/${wallId}/addReaction`, reactionObj);
  };
});
