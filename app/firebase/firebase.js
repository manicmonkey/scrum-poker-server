'use strict';

angular.module('scrumPoker.firebase.config', ['ngRoute'])
  
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/config/firebase', {
      templateUrl: 'firebase/firebase.html',
      controller: 'FirebaseConfigCtrl'
    });
  }])
  
  .controller('FirebaseConfigCtrl', ['$scope', 'localStorageService', function($scope, localStorageService) {
    localStorageService.bind($scope, 'firebase', {}, 'firebaseConfig');
  }])

  .factory('firebaseConfig', ['localStorageService', function(localStorageService) {
    var firebase = localStorageService.get('firebaseConfig');
    if (firebase == undefined) {
      firebase = '';
      localStorageService.set('firebaseConfig', firebase);
    }
    return firebase;
  }])

  .factory('firebase', ['localStorageService', function (localStorageService) { //todo make this configuration
    return new Firebase('https://scrum-poker-server.firebaseio.com/');
  }]);