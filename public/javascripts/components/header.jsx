var Header = React.createClass({
  getInitialState: function() {
    return {
      content: ''
    }
  },
	
  render: function() {
    return <div className="input-group">
      <input
        value = {this.state.content}
        onChange = {this.handleInputChange}
        type = "text"
        className = "form-control" />
      <span className = "input-group-btn">
        <button
          onClick = {this.handleClick}
          className = "btn btn-default"
          type = "button">
          Add
        </button>
      </span>
    </div>
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