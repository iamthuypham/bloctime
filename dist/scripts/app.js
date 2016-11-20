 (function() {
   function config($stateProvider, $locationProvider) {
     $locationProvider
     //disable to hashbang mode like localhost:3000/#!/album
       .html5Mode({
       enabled: true,
       requireBase: false
     });
     //add state to direct to correct template
     $stateProvider
      .state('main', {
              url: '/',
              // controller: 'LandingCtrl as landing',
              templateUrl: 'templates/main.html'
            })
   }

   angular
     .module('blocTime', ['ui.router','firebase'])
     .config(config);
 })();
 