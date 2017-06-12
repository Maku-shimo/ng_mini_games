(function () {
  'use strict';

  angular.module("Game3")
    .controller("Game3Controller",Game3Controller);

  Game3Controller.$inject = ["$scope"];
  function Game3Controller($scope) {
    var g3Ctrl = this;
    g3Ctrl.text = "this is TABBBB 3 2048 2048 2048 ";

  }
})();
