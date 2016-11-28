(function() {

  function TaskSetting(Tasks, $document) {
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };
    return {
      templateUrl: '/templates/directives/task-setting.html',
      restrict: 'E',
      scope: {
        onChange: '&' //'&' is one type of directive scope bindings, execute an expression in the context of the parent scope
      },
      link: function(scope, element, attributes) {
        //@var for tasks array
        var taskArray = Tasks.all;
        scope.taskList = taskArray;
        /**
         * @func updateTask
         * @desc 1) read user input 2) write to database 3)reset input field to default
         */
        scope.updateTask = function(task) {
          if (scope.task) {
            scope.task = angular.copy(task);
            taskArray.$add(scope.task);
            scope.task = '';
          };
        };
        /**
         * @func removeTask
         * @desc 1) remove a task using its index
         */
        scope.removeTask = function(task) {
          Tasks.all.$remove(scope.taskList.indexOf(task));
        };
        
        
        
        scope.value = 0;
        scope.max = 100;

        var seekBar = $(element);

        attributes.$observe('value', function(newValue) {
          scope.value = newValue;
        });

        attributes.$observe('max', function(newValue) {
          scope.max = newValue;
        });

        var percentString = function() {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };
        /**
         * @func fillStyle
         * @desc update the style of fill bar
         * @param {Object}
         */
        scope.fillStyle = function() {
          return {
            width: percentString()
          };
        };
        /**
         * @func thumbStyle
         * @desc update the style of thumb
         * @param {Object}
         */
        scope.thumbStyle = function() {
          return {
            left: percentString()
          };
        };
        /**
         * @func onClickSeekBar
         * @desc call the calculatePercent and update value of the seek bar
         * @param {Object}
         */
        scope.setSessionLength = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };
        /**
         * @func trackThum
         * @desc binding the thumb with document, call calculatePercent, update the value when dragging thumb
         * @param {Object}
         */
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
              notifyOnChange(scope.value);
            });
          });
          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };
        /**
         * @func notifyOnChange
         * @desc notify onChange that scope.value has changed
         * @param {Object} newValue
         */
        var notifyOnChange = function(NewValue) {
          if (typeof scope.onChange === 'function') {
            scope.onChange({
              value: NewValue
            });
          }
        };
        /**
         * @func setSessionLength
         * @desc 1) get user input 2) the length will be assigned to currentTimeString for ButtonTimer
         */
        // scope.setSessionLength = function(length) {
        //   if (length) {
        //     return length;
        //   }
        // };
        // scope.$on('setSessionLength', function() {
        //   scope.setSessionLength();
        // });

      }
    };
  }

  angular
    .module('blocTime')
    .directive('taskSetting', TaskSetting);
})();
