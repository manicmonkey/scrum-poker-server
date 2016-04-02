'use strict';

// Declare app level module which depends on views, and components
angular.module('scrumPoker', [
  'LocalStorageModule',
  'ngRoute',
  'scrumPoker.home',
  'scrumPoker.developer',
  'scrumPoker.estimate',
  'scrumPoker.login',
  'scrumPoker.firebase.config',
  'scrumPoker.version',
  'scrumPoker.youtrack.config',
  'scrumPoker.youtrack.resource'
]).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]).config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}]).factory('md5', function () {
  return SparkMD5;
});