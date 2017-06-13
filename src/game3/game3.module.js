(function () {
  'use strict';

  angular.module("Game3",['Game','Grid','Keyboard','ngAnimate', 'ngCookies'])
    .config(game3Config);

  function game3Config(GridServiceProvider) {
      GridServiceProvider.setSize(4);
  }
  
})();
