'use strict';

angular.module('scrumPoker.login', ['ngRoute', 'firebase'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    });
  }])

  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'firebase', 'md5',
    function ($rootScope, $scope, $location, firebase, md5) {
      $scope.login = function () {
        $rootScope.authObj.$authWithOAuthPopup("google", {
          remember: "sessionOnly",
          scope: "email"
        }).then(function (authData) {
          console.log("Logged in as:", authData.uid);
          //todo https://www.firebase.com/docs/web/libraries/angular/api.html
          //add $onAuth(callback[, context])
          var usersRef = firebase.child('users/' + authData.uid);
          usersRef.set({
            name: authData.google.displayName,
            md5: md5.hash(authData.google.email.toLowerCase())
          });
          $location.path('/home');
        }).catch(function (error) {
          console.error("Authentication failed:", error);
          alert('Authentication failed');
        });
      };
    }
  ])

  .run(['$rootScope', '$location', '$firebaseAuth', 'firebase', function ($rootScope, $location, $firebaseAuth, firebase) {
    $rootScope.authObj = $firebaseAuth(firebase);
    $rootScope.$on('$routeChangeStart', function (event, next) {
      console.log("Route change");

      var currentLocation = $location.path();
      if (!$rootScope.authObj.$getAuth() && currentLocation != '/login') {
        console.log("Not authenticated");
        event.preventDefault();
        $location.path('/login');
      }
    });
  }]);