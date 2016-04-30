$(function () {
  var TaskRouter = Backbone.Router.extend({

    routes: {
      '/': 'main'
    },

    main: function(){
		    taskListView.render();
	  }

  });

  window.TaskRouter = TaskRouter;
});
