$(function () {
  var TaskView = Backbone.View.extend({
    className: "list",

    tagName: "ol",

    template: Handlebars.compile($('#task-template').html()),

    initialize: function() {
      this.listenTo(this.model, 'edit', this.edit);
      this.listenTo(this.model, 'update', this.update);
      this.listenTo(this.model, 'change', this.remove);
    },

    events: {
      'click .list': 'showAlert',
      'keyup .edit': 'update',
      'click .delete_button': 'delete'
    },

    showAlert: function() {
      alert("working!");
    },

    render: function() {
      var taskTemplate = this.template(this.model.toJSON());
      this.$el.html(taskTemplate);
      $("#sortable-tasks").append(this.$el);
      return this;
    },

    edit: function() {
      this.$el.addClass("editing");
    },

    update: function(e) {
      if (e.keyCode == 13) {
        var input = this.input.val();
        if (input) { // if there is an input
          this.model.save({task: input});
          this.$el.removeClass("editing");
        }
      }
    },

    delete: function() {
      tasksCollection.remove(this.model); // remove a model from a Collection
      this.remove(); // remove view from the dom
      this.off(); // stop listening to events
      this.model.off( null, null, this ); // remove model bindings
    }
  });

  window.TaskView = TaskView;
});
