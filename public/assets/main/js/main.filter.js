'use strict';

var app = angular.module('reflectiXYZ');

app.filter('titlecase', function() {
  return function(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  };
});
