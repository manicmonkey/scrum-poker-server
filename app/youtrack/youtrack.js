'use strict';

angular.module('scrumPoker.youtrack', ['ngResource'])

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

  .factory('youtrackConfig', ['localStorageService', function (localStorageService) {
    var youtrack = localStorageService.get('youtrackConfig');
    if (youtrack == undefined) {
      youtrack = {
        url: '',
        username: '',
        password: ''
      };
      localStorageService.set('youtrackConfig', youtrack);
    }
    return youtrack;
  }])

  .factory('Authentication', ['$resource', 'youtrackConfig',
    function ($resource, youtrackConfig) {
      //todo put these values in form data
      return $resource(youtrackConfig.url + '/rest/user/login', null, {
        login: {
          method: 'POST',
          transformResponse: []
        }
      });
    }
  ])

  .factory('Tasks', ['$resource', 'youtrackConfig',
    function ($resource, youtrackConfig) {
      return $resource(youtrackConfig.url + '/rest/issue/:issueId', {}, {
        getByProject: {
          url: youtrackConfig.url + '/rest/issue/byproject/:project',
          method: 'GET',
          isArray: true
        },
        setEstimate: {
          url: youtrackConfig.url + '/rest/issue/:issueId/execute?command=Estimation%20:estimate&disableNotifications=true',
          method: 'POST'
        }
      });
    }
  ])

  .factory('AgileBoard', ['$resource', 'youtrackConfig',
    function ($resource, youtrackConfig) {
      return $resource(youtrackConfig.url + '/rest/admin/agile');
    }
  ]);

//todo use the agile board rest api to lookup boards/tasks
