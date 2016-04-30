$(function() {
  var TasksCollection = Backbone.Collection.extend({
    model: window.TaskModel,

    localStorage: new Backbone.LocalStorage('TasksCollection')
  });

  window.TasksCollection = TasksCollection;
});
