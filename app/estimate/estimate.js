'use strict';

angular.module('scrumPoker.estimate', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/estimate', {
      templateUrl: 'estimate/estimate.html',
      controller: 'EstimateCtrl'
    });
  }])

  .controller('EstimateCtrl', ['$scope', '$location', 'firebase', '$firebaseArray', '$firebaseObject', 'youtrackConfig', 'Tasks',
    function ($scope, $location, firebase, $firebaseArray, $firebaseObject, youtrackConfig, Tasks) {
      firebase.child('planning/task').on('value', function (task) {
        Tasks.get({issueId: task.val()}, function (task) {
          $scope.youtrackUrl = youtrackConfig.url;
          $scope.task = {
            id: task.id,
            summary: _.find(task.field, function (field) {
              return field.name == 'summary';
            }).value,
            description: _.get(_.find(task.field, function (field) {
              return field.name == 'description';
            }), 'value', '')
          };
        })
      });
      $firebaseArray(firebase.child('users')).$loaded(function (users) {
        $scope.developers = _.filter(users, 'inSprint');
      });
      $scope.estimates = $firebaseObject(firebase.child('planning/estimates'));
      $scope.gotAllEstimates = false;
      $scope.$watchCollection('estimates', function (newObj, oldObj) {
        var developers = _($scope.developers)
          .keys()
          .filter(function (key) {
            return !key.startsWith('$');
          })
          .map(function (key) {
            return $scope.developers[key];
          });
        console.log("developers: " + developers);

        $scope.gotAllEstimates = !developers.isEmpty() && developers.every(function (developer) {
            return $scope.estimates[developer.$id] != undefined;
          });
        $scope.averageEstimate = developers
          .filter(function (developer) {
            return $scope.estimates[developer.$id] != undefined;
          })
          .map(function (developer) {
            return $scope.estimates[developer.$id];
          })
          .mean(); //todo apply some rounding
        $scope.estimate = $scope.averageEstimate;
        $scope.setEstimate = function (task, estimate) {
          console.log("Got estimate: " + $scope.estimate);
          Tasks.setEstimate({
            issueId: task.id,
            estimate: estimate % 1 === 0 ? estimate + 'h' : estimate * 60 + 'm'
          }, null, function () {
            console.log("Applied estimate");
            firebase.child('planning/estimates').remove();
            firebase.child('planning/task').remove();
            $location.path('home');
          });
        };
      });
    }
  ]);