(function() {
  function Timer($rootScope, $interval, $filter) {
    var Timer = {};
    var status = true;
    Timer.Tracker = null;
    Timer.currentTime = null;
    Timer.currentTimeString = '25:00';
    /**
     * @function start
     * @desc 1) display reset button 2) display decrement time
     */
    var startTimer = function() {
      Timer.running = true;
      Timer.currentTime = 1500 - 1; //in second
      Timer.Tracker = $interval(function() {
        var str = $filter('timecode')(Timer.currentTime--);
        Timer.currentTimeString = str;
      }, 1000);
    };
    /**
     * @function stopTimer
     * @desc 1) display start button 2) stop the decrement 3) reset time to default 25 min
     */
    var stopTimer = function() {
      Timer.running = false;
      //Cancel the Timer.
      if (angular.isDefined(Timer.Tracker)) {
        $interval.cancel(Timer.Tracker);
        $rootScope.$broadcast('timerStop');
        Timer.currentTimeString = '25:00';
      }
    };
    /**
     * @function start
     * @desc To be called in dashboard view when start button is clicked
     */
    Timer.start = function() {
      if (status === true) {
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
    Timer.stop = function() {
      stopTimer();
    }

    return Timer;
  }

  angular
    .module('blocTime')
    .factory('Timer', ['$rootScope', '$interval', '$filter', Timer]);
})();
