$(function() {
  var TasksCollection = Backbone.Collection.extend({
    model: window.TaskModel

    //localStorage: new 
  });

  window.TasksCollection = TasksCollection;
});
