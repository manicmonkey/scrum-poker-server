'use strict';

angular.module('scrumPoker.youtrack.config', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/config/youtrack', {
      templateUrl: 'youtrack/youtrack.html',
      controller: 'YoutrackCtrl'
    });
  }])

  .controller('YoutrackCtrl', ['$scope', 'localStorageService', 'youtrackConfig', function ($scope, localStorageService, youtrackConfig) {
    localStorageService.bind($scope, 'youtrack', null, 'youtrackConfig');
  }])

  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('scrumPoker')
  })

  .factory('youtrackConfig', ['localStorageService', function(localStorageService) {
    var youtrack = localStorageService.get('youtrackConfig');
    if (youtrack == undefined) {
      youtrack = {
        url: '',
        project: '',
        username: '',
        password: ''
      };
      localStorageService.set('youtrackConfig', youtrack);
    }
    return youtrack;
  }]);