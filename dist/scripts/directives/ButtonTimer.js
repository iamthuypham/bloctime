(function() {

  function ButtonTimer($rootScope, $interval, $filter) {
    return {
      templateUrl: '/templates/directives/button-timer.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        //@var for button color 
        scope.toRed = false;
        //@var for counting time
        scope.onBreak = false;
        scope.counter = null;
        scope.currentTime = null;
        scope.currentTimeString = '00:20';
        /**
         * @function start
         * @desc 1) display reset button 2) display decrement time
         */
        var startTimer = function(time) {
          console.log(scope.onBreak);
          scope.running = true;
          scope.toRed = true; //change button color to red
          scope.currentTime = time; //in second
          

          scope.counter = $interval(function() {
            if (scope.currentTime === 0) {
              finishTimer(time);
            }
            console.log(scope.currentTime);
            var str = $filter('timecode')(scope.currentTime--); //timecode filter return a time in string
            scope.currentTimeString = str;

          }, 1000);
          

        };
        /**
         * @function finishTimer
         * @desc when user successfully complete a session. 1) stopTimer 2) set onBreak value to true
         */
        var finishTimer = function(time) {
          if (time === 20){
            scope.onBreak = true;
            scope.currentTimeString = 10;
          } else {
            scope.onBreak = false;
            scope.currentTimeString = 20;
          }
          stopTimer(scope.currentTimeString);
        };
        /**
         * @function stopTimer
         * @desc 1) display start button 2) stop the decrement 3) reset time to default 25 min
         */
        var stopTimer = function(time) {
          console.log(scope.onBreak);
          scope.running = false;
          console.log(time)
          scope.currentTime = time;
          //Cancel the time-tracker.
          if (angular.isDefined(scope.counter)) {
            $interval.cancel(scope.counter);
            // $rootScope.$broadcast('timerStop');
          }
          console.log(scope.currentTime)
          var str = $filter('timecode')(scope.currentTime);
          scope.currentTimeString = str;
          scope.toRed = false;
        };
        /**
         * @function start
         * @desc To be called in dashboard view when start button is clicked
         */
        scope.start = function() {
          if (!scope.onBreak) {
            startTimer(20);
          }
          else if (scope.onBreak) {
            startTimer(scope.currentTime);
          }
        };

        /**
         * @function start
         * @desc To be called in dashboard view when reset button is clicked
         */
        scope.stop = function() {
          stopTimer(20);
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
