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

  componentDidMount() {
    // Load todos from local storage if available
    const todos = localStorage.getItem('todos');
    if (todos !== null) {
      try {
        this.setState({
          todos: JSON.parse(todos)
        });
      } catch (e) {
        console.error('Error while getting local tasks!');
      }
    }
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
      });
      localStorage.setItem('todos', JSON.stringify(prevState.todos));
      return {
        todos: prevState.todos
      }
    });
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({input: e.target.value});
  }

  handleTask = (task) => {
    // Finding index of task from array of tasks
    let todos = this.state.todos;
    const index = todos.indexOf(task);

    if (task.completed) {
      if (index > -1) {
        todos.splice(index, 1);
      }
    } else {
      todos[index].completed = true;
    }
    // Updating todos
    this.setState({todos});
    localStorage.setItem('todos', JSON.stringify(todos));
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
        <TodoList tasks={this.state.todos} handleTask={this.handleTask} />
      </div>
    );
  }
}

export default App;
