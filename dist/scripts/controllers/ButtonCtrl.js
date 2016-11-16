(function() {
  function ButtonCtrl(Timer) {
    this.timer = Timer;
  }

  angular
    .module('blocTime')
    .controller('ButtonCtrl', ['Timer', ButtonCtrl]);
})();
