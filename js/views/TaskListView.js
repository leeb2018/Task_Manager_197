$(function () {
  var TaskListView = Backbone.View.extend({
    el: $(".panel-primary .panel-body"),

    template: Handlebars.compile($("#task-list-template").html()),

    initialize: function() {
      this.listenTo(tasksCollection, 'addTask', this.addTask);
      var html = this.template();
      this.$el.append(html);
      //this.render();
    },

    events: {
      'keyup #add_task': 'addTask'
    },

    addTask: function(e) {
      if (e.keyCode != 13) return;
      if (!$("#add_task").val()) return;
      var newTask = $("#add_task").val();
      var newTaskModel = new TaskModel({task: newTask});
      tasksCollection.add(newTaskModel);
      var taskView = new TaskView({ model: newTaskModel});
      $("#sortable-tasks").prepend(taskView.render().$el);
      $("#add_task").val("");
    },

    loadOne: function(taskModel) {
      var taskView = window.TaskView({model: taskModel});
      this.$("#sortable-tasks").prepend(taskView.render().el);
    },

    loadAll: function() {
      this.collection.each(this.addTask(taskModel), this);
    }
  });

  window.TaskListView = TaskListView;
});
