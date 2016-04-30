
$(function () {
  var TaskListView = Backbone.View.extend({
    el: $(".panel-primary .panel-body"),

    template: Handlebars.compile($("#task-list-template").html()),

    initialize: function() {
      this.listenTo(tasksCollection, 'addTask', this.addTask);
      var html = this.template();
      this.$el.append(html);
    },

    events: {
      'keyup #add_task': 'addTask'
    },

    addTask: function(e) {
      if (e.keyCode != 13) return;
      if (!$("#add_task").val()) return;
      var newTask = $("#add_task").val();

      var date = curDate.getDate() + 1;
      var month = curDate.getMonth() + 1; // 0~11; thus, +1 needed

      // if statements to create event source for the calendar event
      if (date < 10) {
        date = "0" + date;
      } else {
        date = date;
      }

      if (month < 10) {
        month = "0" + month;
      } else {
        month = month;
      }

      var startDate = curDate.getUTCFullYear() + "-" + month + "-" + date;
      var start = startDate;
      var task = {title: newTask, start: start, end: start, color: "#1265a8"};
      var taskSource = { events: [task]};

      // create new model with relevant information
      var newTaskModel = new TaskModel({task: newTask, eventObj: taskSource});
      tasksCollection.add({model: newTaskModel});
      var taskView = new TaskView({ model: newTaskModel});
      $("#sortable-tasks").prepend(taskView.render().$el);
      $("#add_task").val("");
    },

    loadOne: function(taskModel) {
      var taskView = new TaskView({model: taskModel});
      this.$("#sortable-tasks").prepend(taskView.render().el);
    },

    loadAll: function() {
      tasksCollection.each(this.addTask(taskModel), this);
    }
  });

  window.TaskListView = TaskListView;
});
