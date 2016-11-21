(function() {

  function TaskSetting(Tasks) {
    return {
      templateUrl: '/templates/directives/task-setting.html',
      restrict: 'E',
      scope: {},
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
          scope.taskList.splice(scope.taskList.indexOf(task),1);
        }

      }
    };
  }

  angular
    .module('blocTime')
    .directive('taskSetting', TaskSetting);
})();
