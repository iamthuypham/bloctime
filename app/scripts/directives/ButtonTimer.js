(function() {
  
    function ButtonTimer(Timer, $rootScope) {
      return {
        templateUrl: '/templates/directives/button-timer.html',
        restrict: 'E',
        scope: {},
        link: function(scope, element, attributes) {
          scope.timer = Timer;
          scope.toRed = false;
          
          
          $rootScope.$on('timerStop', function() {
            scope.toRed = false;
          });
        }
  
      }
    }

  angular
    .module('blocTime')
    .directive('buttonTimer', ButtonTimer);
})();
