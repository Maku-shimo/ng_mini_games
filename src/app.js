(function () {
  'use strict';

  angular.module("MakushimoGames",['ui.router',
                                  'Game1',
                                  'Game2',
                                  //'Game3'
                                  ]);

  angular.module("MakushimoGames")
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/tab1');

    $stateProvider
      .state('tab1',{
        url:'/tab1',
        templateUrl: 'src/game1/tab1.html'
      })
      .state('tab2',{
        url:'/tab2',
        templateUrl: 'src/game2/tab2.html'
      });
      //.state('tab3',{
      //  url:'/tab3',
      //  templateUrl: 'src/game3/tab3.html'
      //});
  }

  

})();
