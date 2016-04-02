'use strict';

angular.module('scrumPoker.developer', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/developer', {
      templateUrl: 'developer/developer.html',
      controller: 'DeveloperCtrl'
    });
  }])

  .controller('DeveloperCtrl', ['$rootScope', '$scope', 'firebase', '$firebaseObject', function ($rootScope, $scope, firebase, $firebaseObject) {
    var planning = firebase.child('planning');
    $scope.sprint = $firebaseObject(planning.child('sprint'));
    $scope.task = $firebaseObject(planning.child('task'));
    var auth = $rootScope.authObj.$getAuth();
    $scope.estimate = $firebaseObject(planning.child('estimates').child(auth.uid));
    $scope.user = $firebaseObject(firebase.child('users').child(auth.uid));
    $scope.gotTask = function() {
      return $scope.task.$value != undefined;
    };
    $scope.waitingForEstimate = function() {
      return $scope.task.$value != undefined
        && $scope.estimate.$value == undefined;
    };
    $scope.gotEstimate = function() {
      return $scope.task.$value != undefined
        && $scope.estimate.$value != undefined;
    };
    $scope.submit = function() {
      //using an intermediate value 'pendingEstimate' so we can
      //trigger gotEstimate only when submit invoked
      $scope.estimate.$value = $scope.pendingEstimate;
      $scope.estimate.$save();
      $scope.pendingEstimate = undefined;
    };
  }]);