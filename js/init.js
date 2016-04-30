$(function() {
  window.tasksCollection = new TasksCollection();
  window.taskListView = new TaskListView(tasksCollection);
  window.router = new TaskRouter();
  Backbone.history.start({pushState: false});
});
