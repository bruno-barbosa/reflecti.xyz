'use strict';

var app = angular.module('reflectiXYZ');

app.controller('mainCtrl', function($scope, $state, $auth, Auth, $rootScope) {

    $rootScope.currentUser = Auth.currentUser;
    console.log($scope.currentUser);

    $('.modal-trigger').leanModal();
    $('.parallax').parallax();
    $('.button-collapse').sideNav();
    $('#loginDrop').webuiPopover({
        url: '#logRegForm'
    });
    $('.carousel').carousel({
        full_width: false
    });

    // Allowing camera access
    // Put event listeners into place
    window.addEventListener("DOMContentLoaded", function() {
        // Grab elements, create settings, etc.
        let videoObj = {
                "video": true
            };
        let errBack = function(error) {
                console.log("Video capture error: ", error.code);
            };

        // Put video listeners into place
        if (navigator.getUserMedia) { // Standard
            navigator.getUserMedia(videoObj, function(stream) {
                console.log('Camera connected.');
            }, errBack);
        } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia(videoObj, function(stream) {
                console.log('Camera connected.');

            }, errBack);
        } else if (navigator.mozGetUserMedia) { // Firefox-prefixed
            navigator.mozGetUserMedia(videoObj, function(stream) {
                console.log('Camera connected.');
            }, errBack);
        }
    }, false);



    $scope.logout = () => {
      Auth.logout()
        .then(() => {
          $rootScope.currentUser = null;
          $state.go('home');
        });
    };

});

app.controller('tabCtrl', function($scope) {

    console.log('this');

    this.tab = 1;

    this.setTab = function(tabId) {
        this.tab = tabId;
    };

    this.isSet = function(tabId) {
        return this.tab === tabId;
    };
});
