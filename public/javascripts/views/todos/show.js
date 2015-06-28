define(['backbone', 'models/todo'], function(Backbone, Todo) {
	return Backbone.View.extend({
		className: 'todo',
		
		initialize: function () {
			this.element = React.createElement(TodoItem, {todo: this.model});
		},
		
		render: function() {
			console.log("render once");
			React.render(this.element ,this.el)
			return this;
		}
	});
});