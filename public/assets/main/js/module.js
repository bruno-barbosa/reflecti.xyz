'use strict';

var app = angular.module('reflectiXYZ', ['ui.router', 'satellizer', 'ngFileUpload', 'oitozero.ngSweetAlert']);


app.config( function($stateProvider, $urlRouterProvider, $authProvider) {
  $authProvider.facebook({
    clientId: '513106282206082',
    url: '/users/social/facebook'
  });

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/assets/main/html/index.html',
      controller: 'mainCtrl'
    })
    .state('profile-walls', {
       url: '/profile-walls',
       templateUrl: '/assets/account/html/profile.html',
       controller: 'profileCtrl',
       resolve: {
         profile: function(Auth) {
           return Auth.getProfile();
         }
       }
     })
     .state('profile-reactions', {
       url: '/profile-reactions',
       templateUrl: '/assets/account/html/profile.html',
       controller: 'profileCtrl'
     })
     .state('wall-list', {
       url:'/wall',
       templateUrl: '/assets/wall/html/wall-list.html',
       controller: 'wallListCtrl'
     })
     .state('wall-view', {
       url:'/wall/:id',
       templateUrl: '/assets/wall/html/wall-view.html',
       controller: 'wallViewCtrl',
       resolve: {
         wall: function($stateParams, Wall){
           return Wall.getWallById($stateParams.id);
         }
       }
     })
     .state('wall-if-seen', {
       url:'/wall-if-seen/:id',
       templateUrl: '/assets/wall/html/wall-view-if-seen.html',
       controller: 'wallviewifseenCtlr'
     });
     $urlRouterProvider.otherwise('/');
});


app.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
  });
