define(['backbone', 'models/todo'], function(Backbone, Todo) {
	return Backbone.Collection.extend({
		model: Todo,
		url: "/todos"
	});
});