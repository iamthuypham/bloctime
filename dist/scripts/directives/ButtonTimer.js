(function() {

  function ButtonTimer($rootScope, $interval, $filter) {
    return {
      templateUrl: '/templates/directives/button-timer.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        scope.toRed = false;
        scope.status = true;
        scope.Tracker = null;
        scope.currentTime = null;
        scope.currentTimeString = '25:00';
        /**
         * @function start
         * @desc 1) display reset button 2) display decrement time
         */
        var startTimer = function() {
          scope.running = true;
          scope.currentTime = 1500 - 1; //in second
          scope.Tracker = $interval(function() {
            var str = $filter('timecode')(scope.currentTime--);
            scope.currentTimeString = str;
          }, 1000);
        };
        /**
         * @function stopTimer
         * @desc 1) display start button 2) stop the decrement 3) reset time to default 25 min
         */
        var stopTimer = function() {
          scope.running = false;
          //Cancel the time-tracker.
          if (angular.isDefined(scope.Tracker)) {
            $interval.cancel(scope.Tracker);
            // $rootScope.$broadcast('timerStop');
            scope.currentTimeString = '25:00';
          }
        };
        /**
         * @function start
         * @desc To be called in dashboard view when start button is clicked
         */
        scope.start = function() {
          if (scope.status === true) {
            startTimer();
          }
          else {
            stopTimer();
          }
        };

        /**
         * @function start
         * @desc To be called in dashboard view when reset button is clicked
         */
        scope.stop = function() {
          stopTimer();
        }

        // $rootScope.$on('timerStop', function() {
        //   scope.toRed = false;
        // });
      }

    }
  }

  angular
    .module('blocTime')
    .directive('buttonTimer', ButtonTimer);
})();
