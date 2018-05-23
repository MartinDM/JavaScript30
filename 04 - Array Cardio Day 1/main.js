'use strict';

angular
  .module('angularScopesBug', [])
  .controller("WelcomeController",[ '$scope', function($scope) {
    $scope.name = 'Anonymous';
    $scope.getName = function() {
      return $scope.name;
    };
  }])
  .controller("EditingController", ['$scope',  function($scope) {
    $scope.editMode = false; 
    $scope.closeEditor = function() {
      $scope.editMode = false;
    };
   $scope.getName = function() {
      return $scope.name;
    };
  }])
  .directive("nameEditor", function () {
    return {
      template: 'Write your name: <input type="text" ng-change="getName()" ng-model="name">'
    };
  });
