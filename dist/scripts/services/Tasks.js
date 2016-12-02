(function() {
  function Tasks($firebaseArray, $firebaseObject) {
    var db = firebase.database()
    var ref = firebase.database().ref();
    // download tasks into a synchronized array
    var tasks = $firebaseArray(ref);
    return {
      all: tasks,
      getAmountActiveTask: function() {
        var i = '';
        ref.orderByChild('active').equalTo(true).on('child_added', function(data) {
          i = data.val().amount;
          // console.log(data)
        });
        return i
      },
      write: function(value) {
        var i = '';
        ref.orderByChild('active').equalTo(true).on('child_added', function(data) {
          i = data;
          // console.log(data)
        });
        db.ref(i.key).set({
          active: true,
          amount: value,
          name: i.val().name
        })
      }
    };

  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', '$firebaseObject', Tasks]);
})();
