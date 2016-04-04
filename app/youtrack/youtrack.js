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
        project: '',
        username: '',
        password: ''
      };
      localStorageService.set('youtrackConfig', youtrack);
    }
    return youtrack;
  }])

  .factory('Projects', ['$resource', 'youtrackConfig',
    function ($resource, youtrackConfig) {
      return $resource(youtrackConfig.url + '/rest/project/all', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }]
  )

  .factory('Authentication', ['$resource', 'youtrackConfig',
    function ($resource, youtrackConfig) {
      return $resource(youtrackConfig.url + '/rest/user/login', null, {
        login: {
          method: 'POST',
          transformResponse: []
        }
      });
    }
  ])

  .factory('Sprints', ['$resource', 'youtrackConfig',
    function ($resource, youtrackConfig) {
      return $resource(youtrackConfig.url + '/rest/admin/customfield/versionBundle/:bundleName', null, {
        query: {
          method: 'GET',
          withCredentials: true
        }
      });
    }])

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
  ]);

//todo finish this off
// .factory('Bundle', ['$resource', 'youtrackConfig',
//   function ($resource, youtrackConfig) {
//     $resource(youtrackConfig.url + '/rest/admin/project/:project/customfield').get({
//       project: youtrackConfig.project
//     }, function(resp) {
//       var sprintField = resp.filter(x -> x.name == 'sprint')
//       $resource(sprintField.url).get(function(resp) {
//         resp.param[0].value;
//       });
//     });
//     return $resource(youtrackConfig.url + '/rest/admin/project/:project/customfield', {}, {});
//   }])