import React from 'react'

class AddTodoForm extends React.Component {
  state = {
    input: ''
  }

  handleInputChange = e => this.setState({ input: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.input);
    this.setState({ input: '' })
  }

  render() {
    return (
      <form name="form" onSubmit={this.handleSubmit}>
        <input
          name="task"
          autoComplete="off"
          className="todo-input"
          value={this.state.input}
          onChange={this.handleInputChange}
          placeholder="What do you wanna do?"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>
    )
  }
}

export default AddTodoForm;
