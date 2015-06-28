var TodoList = React.createClass({
  render: function() {
    return <div>
      {this.renderList()}
    </div>
  },
	
	componentWillMount: function() {
		this.props.todos.on('add', (function(todo) {
			this.forceUpdate();
		}).bind(this));
		
		this.props.todos.on('remove', (function(todo) {
			this.forceUpdate();
		}).bind(this));
	},
	
  renderList: function() {
    var children = [];

    this.props.todos.each((function(todo) {
      children.push(
        <TodoItem
          todo={todo}
					todos={this.props.todos}
          key={todo.get('_id')}
          >
        </TodoItem>
			)
    }).bind(this));

    return children;
  }
});