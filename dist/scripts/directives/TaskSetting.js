(function() {

  function TaskSetting(Tasks, $rootScope) {
    return {
      templateUrl: '/templates/directives/task-setting.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        //@var for tasks array
        var taskArray = Tasks.all;
        scope.taskList = taskArray;
        // @var default Timer Setup
        scope.workLength = 25;
        scope.regBreakLength = 5;
        scope.workNum = 2;
        scope.longBreakLength = 15;
        
        /**
         * @func updateTask
         * @desc 1) read user input 2) write to database 3)reset input field to default
         */
        scope.updateTask = function(task) {
          task.amount = 0;
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
        /**
         * @func saveToDb
         * @desc update active status for each task to db
         */
        var saveToDb = function(task) {
          var taskIndex = scope.taskList.indexOf(task)
          Tasks.all.$save(taskIndex).then(function(ref) {
            ref.key === Tasks.all[taskIndex].$id;
          }, function(error) {
            console.log("Saving Element Error:", error);
          });
        };
        /**
         * @func activateTask
         * @desc make a task active
         */
        scope.activate = function(task) {
          Tasks.all.forEach(function(element) {
            element.active = false; //Change status to false for all element first
            saveToDb(element); //Save value to Firebase
          });
          //Then change status to true for the chosen task
          task.active = true;
          saveToDb(task)
        };
        
        
        /**
         * @func configure Timer parameter
         * @desc 1) evaluate user input 2) apply settings if pass evaluation 3) return default value if not pass
         */
        scope.configTimer = function(val, event) {
          var max = event.target.attributes['max'].value
          var min = event.target.attributes['min'].value
          var valueType = event.target.attributes['name'].value
          scope.value = angular.copy(val)
          console.log(scope.value)
          if (scope.value > min && scope.value <= max) {
            $rootScope.$broadcast('applySetting', {
              value: scope.value,
              type: valueType
            })
          }
          else {
            switch (valueType) {
              case 'Length of a Working Session':
                scope.workLength = 25;
                break;
              case 'Length of a Regular Break':
                scope.regBreakLength = 5;
                break;
              case 'Number of Working Session for a Break':
                scope.workNum = 2;
                break;
              case 'Length of a Long Break Session':
                scope.longBreakLength = 15;
                break;
            }
            alert(valueType + " should be from " + min + " to " + max)
          }
        };
        console.log(Tasks.all)
        /**
         * @func writeToDatabase
         * @desc write amount of time to Firebase. This func is broadcast by Timer (ButtonTimer.js)
         */
        scope.writeTimeToDb = function(seconds) {
          var currentAmount = Tasks.getAmountActiveTask()
          currentAmount += seconds
          Tasks.write(currentAmount)
          // saveToDb(scope.activeTask);
          console.log(Tasks.all)
        }
        scope.$on('writeTimeToDb', function(event, arg) {
          scope.writeTimeToDb(arg.sec);
        })
      }
    };
  }

  angular
    .module('blocTime')
    .directive('taskSetting', TaskSetting);
})();
