'use strict';

angular.module('scrumPoker.developer', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/developer', {
            templateUrl: 'developer/developer.html',
            controller: 'DeveloperCtrl'
        });
    }])

    .controller('DeveloperCtrl', ['$scope', 'md5', 'firebase', function ($scope, md5, firebase) {
        $scope.submit = function() {
            var users = firebase.child('users');
            var newUser = users.push();
            newUser.set({
                name: $scope.username,
                email: $scope.email,
                md5: md5.hash($scope.email.toLowerCase())
            });
        }
    }]);