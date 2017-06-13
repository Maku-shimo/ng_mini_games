(function () {
  'use strict';

  angular.module("Game3")
    .controller("Game3Controller",Game3Controller);

  Game3Controller.$inject = ['GameManager','KeyboardService'];
  function Game3Controller(GameManager,KeyboardService) {
    var g3Ctrl = this;
    // g3Ctrl.text = "this is TABBBB 3 2048 2048 2048 ";
    g3Ctrl.game = GameManager;

    g3Ctrl.newGame = function() {
    	KeyboardService.init();
    	g3Ctrl.game.newGame();
    	g3Ctrl.startGame();
    }; //newGame

    g3Ctrl.startGame = function() {
    	var self = g3Ctrl;
    	KeyboardService.on(function(key) {
    	   self.game.move(key);
    	}); //on
    }; ///startGame

    // вызываем эту функцию при запуске приложения
    g3Ctrl.newGame();
  }
})();
