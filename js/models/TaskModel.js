$(function() {
  var TaskModel = Backbone.Model.extend({
    defaults: function (){
      task: "No Task"
    }
  });
  window.TaskModel = TaskModel;
});
