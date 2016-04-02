'use strict';

angular.module('scrumPoker.home', ['ngRoute', 'firebase'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl', ['$scope', '$location', 'firebase', '$firebaseObject', 'youtrackConfig', 'Projects', 'Tasks', 'Sprints', 'Authentication',
    function ($scope, $location, firebase, $firebaseObject, youtrackConfig, Projects, Tasks, Sprints, Authentication) {

      function loadTasks(sprint) {
        Tasks.getByProject({project: youtrackConfig.project, filter: 'Sprint: ' + sprint + ' Estimation: ?'}, function (resp) {
          $scope.tasks = _.map(resp, function (task) {
            task.field = _.keyBy(task.field, function (field) {
              return field.name;
            });
            return task;
          });
          $scope.estimateTask = function (task) {
            Tasks.get({issueId: task}, function (task) {
              $scope.planning = {
                task: {
                  id: task.id,
                  summary: _.find(task.field, function (field) {
                    return field.name == 'summary';
                  }).value,
                  description: _.find(task.field, function (field) {
                    return field.name == 'description';
                  }).value
                }
              };
            });
            firebase.child('planning/task').set(task);
            $location.path('estimate');
          };
        });
      }

      Authentication.login({login: youtrackConfig.username, password: youtrackConfig.password}, {}, function (success) {
        console.log("Got auth success");
        Sprints.query({bundleName: youtrackConfig.bundle}, function (resp) {
          $scope.sprints = _.map(_.filter(resp.version, ['archived', false]), 'value');
        });
      });
      
      $scope.youtrackUrl = youtrackConfig.url;

      var sprint = $firebaseObject(firebase.child('planning/sprint'));
      $scope.selectedSprint = sprint;
      sprint.$bindTo($scope, "selectedSprint");
      sprint.$watch(function() {
          var selectSprint = sprint.$value;
          console.log("Querying sprint tasks: " + selectSprint);
          loadTasks(selectSprint);
      });

      var firebaseUsers = $firebaseObject(firebase.child('users'));
      $scope.users = firebaseUsers;
      firebaseUsers.$bindTo($scope, "users");
    }]);