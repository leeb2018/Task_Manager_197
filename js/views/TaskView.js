$(function () {
  var TaskView = Backbone.View.extend({
    className: 'list',

    tagName: 'ol',

    template: Handlebars.compile($('#task-template').html()),

    initialize: function() {
      this.listenTo(this.model, 'edit', this.edit);
      this.listenTo(this.model, 'update', this.update);
    },

    events: {
      'keyup .edit': 'update',
      'mouseover': 'showButton',
      'mouseleave': 'hideButton',
      'click .edit_task': 'edit',
      'click .delete_button': 'delete'
    },

    showButton: function() {
      this.$el.find(':button').show();
    },

    hideButton: function() {
      this.$el.find(':button').hide();
    },

    render: function() {
      // form the template
      var taskTemplate = this.template(this.model.toJSON());

      // add task to a calendar
      $('#calendar').fullCalendar('addEventSource', this.model.toJSON().eventObj);

      this.$el.html(taskTemplate); // put a template into a complete HTML form
      $('#sortable-tasks').append(this.$el);
      return this;
    },

    edit: function() {
      this.$el.addClass('editing');
    },

    update: function(e) {
      if (e.keyCode == 13) {
        var input = this.$el.children('.edit').val();
        if (input) { // if there is an input
          this.model.set({task: input});
          this.$el.removeClass('editing');
          this.$el.children('label').text(input);
        }
      }
    },

    delete: function() {
      // remove event from the calendar
      $('#calendar').fullCalendar('removeEventSource', this.model.toJSON().eventObj);

      tasksCollection.remove(this.model); // remove a model from a Collection
      this.remove(); // remove view from the dom
      this.off(); // stop listening to events
      this.model.off( null, null, this ); // remove model bindings
    }
  });

  window.TaskView = TaskView;
});
