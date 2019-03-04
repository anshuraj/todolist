import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { withAuthentication } from '../Session';

class Todo extends Component {
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
  
  addTodo = (task) => {
    if (task === '') {
      return false;
    }

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
      <React.Fragment>
        <div className="App">
          <h2>Do something Today</h2>
          <Link to="/signin">Sign in</Link>

          <AddTodoForm addTodo={this.addTodo} />
          <TodoList tasks={this.state.todos} handleTask={this.handleTask} />
        </div>
        
      </React.Fragment>
    )
  }
}

export default withAuthentication(Todo);