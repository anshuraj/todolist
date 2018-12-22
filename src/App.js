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
      const newTodo = {
        "task": task,
        "created": Date.now(),
        "completed": false
      };
      let todos = [...prevState.todos, newTodo];
      localStorage.setItem('todos', JSON.stringify(todos));
      return {
        todos: todos
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
        <h2>Do something Today</h2>
        <form name="form" onSubmit={this.addTodo}>
          <input
            name="task"
            ref="input"
            autoComplete="off"
            placeholder="What do you wanna do?"
          />
          <button type="submit" className="add-btn">Add</button>
        </form>
        <TodoList tasks={this.state.todos} handleTask={this.handleTask} />
      </div>
    );
  }
}

export default App;
