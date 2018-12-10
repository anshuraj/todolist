import React, { Component } from 'react';
import './App.css';

import TodoList from './TodoList';

class App extends Component {
  constructor() {
    super();
      this.state = {
        todos: []
      };
    }
  
  addTodo = (e) => {
    e.preventDefault();
    const task = this.refs.input.value;
    if (task === '') {
      return false;
    }

    this.refs.input.value = '';
    this.setState((prevState) => {
      prevState.todos.push({
        "task": task,
        "created": Date.now(),
        "completed": false
      })
      return {
        todos: prevState.todos
      }
    });
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({input: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <form name="form" onSubmit={this.addTodo}>
          <input
            name="task"
            ref="input"
            autoComplete="off"
            placeholder="Add something to do"
          />
          <button type="submit">Add</button>
        </form>
        <TodoList tasks={this.state.todos} />
      </div>
    );
  }
}

export default App;
