(function() {
  function Timer($rootScope) {
    var Timer = {};
    var status = true;
    /**
     * @function setTimer
     * @desc stop/start the timer
     * @param {Object} 
     */
    var setTimer = function() {
      /**
       * @var {Object} status
       * Action    | Status   | Display Button
       * -------------------------------
       * startTimer| progress | resetButton
       * resetTimer| null     | startButton
       */
    }
      /**
       * @function start
       * @desc display reset or start button based on status
       * @param {Object} 
       */
    var startTimer = function() {
        Timer.running = true
    };

    var stopTimer = function() {
        Timer.running = false;
    };
    /**
     * @function setButton
     * @desc display reset or start button based on status
     * @param {Object} 
     */
    Timer.start = function() {
      //if timer is active
      if (status === true) {
        //stopTimer
        startTimer();
      } 
      //else if timer is inactive
      else {
        //startTimer
        stopTimer();
      }
    };
    
    Timer.stop = function() {
      stopTimer();
    }
    
    return Timer;
  }

  angular
    .module('blocTime')
    .factory('Timer', ['$rootScope', Timer]);
})();
