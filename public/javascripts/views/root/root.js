define(['backbone', 'views/todos/index'], function(Backbone, TodoShow) {
	return Backbone.View.extend({
		className: 'root',
		initialize: function(options) {
			this.headerComponent = React.createElement(Header, {
				todoModel: options.todoModel,
				todos: options.collection
			});
			
			this.todosComponent = React.createElement(TodoList, {
				todos: options.collection
			});
		},
		
		template: _.template("<h3 class='text-center'>React to Todo</h3><div class='header'></div><hr><div class='todos'></div><hr><div class='text-center'><button type='button' class='remove-done btn btn-default'>Remove Done</button></div>"),
		
		events: {
			'click .remove-done': 'removeDone'
		},
		
		removeDone: function() {
			this.collection.filter(function(todo) {
				return todo.get('done');
			}).forEach(function(todo) {
				todo.destroy();
			});
		},
		
		render: function() {
			var renderedContent = this.template();
			this.$el.html(renderedContent);
			React.render(this.headerComponent , this.$('.header')[0]);
			React.render(this.todosComponent, this.$('.todos')[0]);
			return this;
		}
	});
})