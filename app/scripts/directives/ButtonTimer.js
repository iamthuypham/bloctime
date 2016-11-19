(function() {

  function ButtonTimer($rootScope, $interval, $filter) {
    return {
      templateUrl: '/templates/directives/button-timer.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        //@var for button icon and color
        scope.running = false;
        scope.toRed = false;
        //@var for counting down time
        scope.onBreak = false;
        scope.counter = null;
        scope.currentTime = null;
        scope.currentTimeString = '00:07';
        //@var for counting number of completed work sessions
        scope.numSession = 0;
        /**
         * @function setUIButton
         * @desc declare green glass icon or red stop icon with true/false value
         */
        var setUIButton = function(glassIcon, redColor) {
          scope.running = glassIcon;
          scope.toRed = redColor;
        };
        /**
         * @function setUIButton
         * @desc declare green glass icon or red stop icon with true/false value
         */
        var setUITimer = function(time) {
          scope.currentTimeString = $filter('timecode')(time); //timecode filter return a time in string
        };
        /**
         * @function start
         * @desc 1) display reset button 2) display decrement time
         */
        var startTimer = function(time) {
          scope.counter = $interval(function() {
            if (scope.currentTime < 0) {
              finishSession(time);
            }
            var decr = scope.currentTime--;
            setUITimer(decr);
          }, 1000);
          setUIButton(true, true); //change to red stop icon
          scope.currentTime = time; //in second
        };
        /**
         * @function finishTimer
         * @desc when user successfully complete a session. 1) stopTimer 2) set onBreak value to true
         */
        var finishSession = function(time) {
          if (time === 7) {
            scope.onBreak = true;
            scope.currentTime = 5;
            finishNumSession(time);
          }
          else {
            scope.onBreak = false;
            scope.currentTime = 7;
          }
          stopTimer(scope.currentTime);
        };
        /**
         * @function finishNumSession
         * @desc when user successfully complete a work session. 
         * 1) count number of sessions 2) if number of session is 4, user earned 1 long break
         */
        var finishNumSession = function() {
          scope.numSession += 1;
          if (scope.numSession % 4 === 0 && scope.numSession > 0) {
            scope.currentTime = 7;
            setUITimer(scope.currentTime);
          }
        };
        /**
         * @function stopTimer
         * @desc 1) display start button 2) stop the decrement 3) reset time 
         */
        var stopTimer = function(time) {
          setUIButton(false, false) //change to green glass icon
            //Cancel the time-tracker.
          if (angular.isDefined(scope.counter)) {
            $interval.cancel(scope.counter);
          }
          setUITimer(scope.currentTime);
        };
        /**
         * @function start
         * @desc To be called in dashboard view when start button is clicked
         */
        scope.start = function() {
          if (!scope.onBreak) {
            startTimer(7);
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
          stopTimer(7);
        }

      }
    }
  }

  angular
    .module('blocTime')
    .directive('buttonTimer', ButtonTimer);
})();
