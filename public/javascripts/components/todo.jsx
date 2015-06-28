var TodoItem = React.createClass({
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
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          checked={this.state.done}
          onChange={this.handleDoneChange}
          />
      </span>
      <input type="text"
        disabled={this.state.done}
        className="form-control"
        value={this.state.content}
        onChange={this.handleTextChange}
        />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          className="btn btn-default"
          onClick={this.handleDeleteClick}
          >
          Delete
        </button>
      </span>
    </div>
  },
	
  changesButtons: function() {
    if(!this.state.contentChanged) {
      return null
    } else {
      return [
        <button
          className="btn btn-default"
          onClick={this.handleSaveClick}
          >
          Save
        </button>,
        <button
          onClick={this.handleUndoClick}
          className="btn btn-default"
          >
          Undo
        </button>
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