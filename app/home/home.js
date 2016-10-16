'use strict';

angular.module('scrumPoker.home', ['ngRoute', 'firebase'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl'
    });
  }])

  .controller('HomeCtrl', ['$q', '$scope', '$resource', '$location', 'firebase', '$firebaseObject', 'youtrackConfig', 'AgileBoard', 'Projects', 'Tasks', 'Sprints', 'Authentication',
    function ($q, $scope, $resource, $location, firebase, $firebaseObject, youtrackConfig, AgileBoard, Projects, Tasks, Sprints, Authentication) {

      function loadAgileBoard(agileBoard) {
        //update sprints
        var sprintPromises = _.chain($scope.agileBoards)
          .find(function(board) {
            return board.id == agileBoard;
          })
          .get('sprints')
          .map(function (sprint) {
            return $resource(sprint.url).get().$promise;
          })
          .value();

        $q.all(sprintPromises).then(function (sprints) {
          $scope.sprints = sprints;
        });

        // Sprints.query({bundleName: youtrackConfig.bundle}, function (resp) {
        //   $scope.sprints = _.map(_.filter(resp.version, ['archived', false]), 'value');
        // });
        //update tasks
      }

      function loadTasks(sprint) {
        Tasks.getByProject({project: youtrackConfig.project, filter: 'Sprints: {' + sprint + '} Ideal days: {Not estimated}'}, function (resp) {
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
        AgileBoard.query(function (resp) {
          $scope.agileBoards = resp;
        });
      });
      
      $scope.youtrackUrl = youtrackConfig.url;

      var agileBoard = $firebaseObject(firebase.child('planning/agileBoard'));
      $scope.selectedAgileBoard = agileBoard;
      agileBoard.$bindTo($scope, 'selectedAgileBoard');
      agileBoard.$watch(function() {
        var selectedAgileBoard = agileBoard.$value;
        console.log("Agile board selected: " + selectedAgileBoard);
        loadAgileBoard(selectedAgileBoard);
      });

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