define(['backbone', 'models/todo'], function(Backbone, Todo) {
	return Backbone.View.extend({
		className: 'todo',
		template: _.template("<p><%= todo.get('content') %></p>"),
		
		initialize: function () {
			this.listenTo(this.model, 'sync', this.render);
		},
		
		render: function() {
			var content = this.template({
				todo: this.model
			});
			this.$el.html(content);	
			return this;
		}
	});
});