$(function() {
  window.tasksCollection = new TasksCollection();
  window.taskListView = new TaskListView(tasksCollection);
  Backbone.history.start({pushState: false});
})
