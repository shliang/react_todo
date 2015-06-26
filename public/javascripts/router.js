define(['backbone', 'models/todo','views/todos/show'], function(Backbone, Todo, TodoShow) {
	var Router = Backbone.Router.extend({
		routes: {
			"": "homepage"
		},
		
		homepage: function() {
			var todo = new Todo({_id: "558ba2c71804d67d3678fda0"});
			todo.fetch();
			var todoShowView = new TodoShow({
				model: todo
			});
			this._swapView(todoShowView);
		},
		
		_swapView: function(view) {
			this._currentView && this._currentView.remove();
			this._currentView = view;
			$('.content').html(view.render().$el);
		}
	});
	
	return Router;
});