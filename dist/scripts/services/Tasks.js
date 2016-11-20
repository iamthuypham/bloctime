(function() {
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref();

    // download tasks into a synchronized array
    var tasks = $firebaseArray(ref);

    return {
      all: tasks
        // remaining logic for tasks
    };
  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
