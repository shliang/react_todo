define(['backbone', 'models/todo', 'collections/todos','views/root/root'], function(Backbone, Todo, Todos, RootRoot) {
	var Router = Backbone.Router.extend({
		routes: {
			"": "homepage"
		},
		
		homepage: function() {
			var allTodos = new Todos();
			allTodos.fetch();
			var rootView = new RootRoot({
				collection: allTodos,
				todoModel:  Todo
			});
			this._swapView(rootView);
		},
		
		_swapView: function(view) {
			this._currentView && this._currentView.remove();
			this._currentView = view;
			$('.content').html(view.render().$el);
		}
	});
	
	return Router;
});