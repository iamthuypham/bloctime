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
        //@var for sound
        var ding = new buzz.sound("/assets/sounds/ding.mp3", {
          preload: true
        });
        var click = new buzz.sound("/assets/sounds/mouse_click.mp3", {
          preload: true
        });
        /**
         * @function setUIButton
         * @desc declare green glass icon or red stop icon with true/false value
         */
        var setUIButton = function(glassIcon, redColor) {
          scope.running = glassIcon;
          scope.toRed = redColor;
        };
        /**
         * @function setUITimer
         * @desc 1) use filter to display minutes to --:-- 2) set current time to a string
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
            // if (scope.currentTime < 0) {

            // }
            var decr = scope.currentTime--;
            setUITimer(decr);
          }, 1000);
          /**
           * @watcher check currentTime when reaching 0
           * @desc 1) call finishSession func 2) play Ding sounds
           */
          scope.$watch('currentTime', function(newVal, oldVal) {
            if (!newVal) return;
            if (newVal < 0) {
              finishSession(time);
              console.log("Ding!!!")
              ding.play();
            }
          });
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
          scope.currentTime = time; //if you want to pause instead of reset to 0, comment out this line and setUITimer(scope.currentTime)
          setUIButton(false, false) //change to green glass icon
            //Cancel the time-tracker.
          if (angular.isDefined(scope.counter)) {
            $interval.cancel(scope.counter);
          }
          setUITimer(time);
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
         * @function stop
         * @desc To be called in dashboard view when stop button is clicked
         */
        scope.stop = function() {
          stopTimer(7);
        };

      }
    }
  }

  angular
    .module('blocTime')
    .directive('buttonTimer', ButtonTimer);
})();
