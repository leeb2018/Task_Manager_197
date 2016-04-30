$(function() {
  var TaskModel = Backbone.Model.extend({
    defaults: {
      task: "No Task",
      eventObj: [
        {
          title: "No Task",
          start: "2016-04-27",
          end: "2016-04-27",
          color: "blue"
        }
      ]
    }
  });
  window.TaskModel = TaskModel;
});
