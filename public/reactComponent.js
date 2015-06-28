var Header = React.createClass({displayName: "Header",
  getInitialState: function() {
    return {
      content: ''
    }
  },
	
  render: function() {
    return React.createElement("div", {className: "input-group"}, 
      React.createElement("input", {
        value: this.state.content, 
        onChange: this.handleInputChange, 
        type: "text", 
        className: "form-control"}), 
      React.createElement("span", {className: "input-group-btn"}, 
        React.createElement("button", {
          onClick: this.handleClick, 
          className: "btn btn-default", 
          type: "button"}, 
          "Add"
        )
      )
    )
  },
	
  handleClick: function() {
		var todo = new this.props.todoModel({
			content: this.state.content,
	    done: false
    });
		
		todo.save({}, {
			wait: true,
			success: (function(model) {
				this.props.todos.add(model);
				this.setState({content: ''});	
			}).bind(this)
		});
  },
	
  handleInputChange: function(event) {
    this.setState({content: event.target.value});
  }
});
var TodoItem = React.createClass({displayName: "TodoItem",
  getInitialState: function() {
    return {
      content: this.props.todo.get('content'),
      done: this.props.todo.get('done'),
      contentChanged: false
    }
  },
		
	updateProps: function() {
		this.setState({
			content: this.props.todo.get('content'),
			done: this.props.todo.get('done')
		});
	},
		
  render: function() {
    return React.createElement("div", {className: "input-group"}, 
      React.createElement("span", {className: "input-group-addon"}, 
        React.createElement("input", {
          type: "checkbox", 
          checked: this.state.done, 
          onChange: this.handleDoneChange}
          )
      ), 
      React.createElement("input", {type: "text", 
        disabled: this.state.done, 
        className: "form-control", 
        value: this.state.content, 
        onChange: this.handleTextChange}
        ), 
      React.createElement("span", {className: "input-group-btn"}, 
        this.changesButtons(), 
        React.createElement("button", {
          className: "btn btn-default", 
          onClick: this.handleDeleteClick
          }, 
          "Delete"
        )
      )
    )
  },
	
  changesButtons: function() {
    if(!this.state.contentChanged) {
      return null
    } else {
      return [
        React.createElement("button", {
          className: "btn btn-default", 
          onClick: this.handleSaveClick
          }, 
          "Save"
        ),
        React.createElement("button", {
          onClick: this.handleUndoClick, 
          className: "btn btn-default"
          }, 
          "Undo"
        )
      ]
    }
  },
  handleSaveClick: function() {
		this.props.todo.save({content: this.state.content}, {
			wait: true,
			success: (function(todo) {
				this.setState({contentChanged: false});
			}).bind(this)
		});
  },
  handleUndoClick: function() {
    this.setState({
      content: this.props.todo.get('content'),
      contentChanged: false
    });
  },
  handleTextChange: function(event) {
    this.setState({
      content: event.target.value,
      contentChanged: true
    });
  },
  handleDoneChange: function(event) {
    var update = {done: event.target.checked}
		this.props.todo.save(update, {
			success: (function(todo) {
		    this.setState(update);			
			}).bind(this)
		});
  },
  handleDeleteClick: function() {
		this.props.todo.destroy({
			wait: true,
			success: (function(todo) {
				this.props.todos.remove(todo);
			}).bind(this)
		})
  }
});
var TodoList = React.createClass({displayName: "TodoList",
  render: function() {
    return React.createElement("div", null, 
      this.renderList()
    )
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
        React.createElement(TodoItem, {
          todo: todo, 
					todos: this.props.todos, 
          key: todo.get('_id')
          }
        )
			)
    }).bind(this));

    return children;
  }
});