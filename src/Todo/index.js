import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { withAuthentication } from '../Session';
import uuid from '../uuid';

const uniqueMerge = (arr) => {
  for(let i = 0; i < arr.length; ++i) {
    for(let j = i+1; j < arr.length; ++j) {
      if(arr[i].id === arr[j].id) {
        if (arr[i].edited >= arr[j].edited) {
          arr.splice(j--, 1);
        } else {
          arr.splice(i++, 1);
        }
      }
    }
  }
  return arr;
};

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  componentWillReceiveProps() {
    const { firebase } = this.props;
    let cloudTodos = [];
    let finalTodos = [];

    if (firebase.auth.currentUser) {
      firebase.getTodos().on('value', snapshot => {
        cloudTodos = snapshot.val() || [];
        const localTodos = JSON.parse(localStorage.getItem('todos'));
        if (localTodos) {
          finalTodos = uniqueMerge(localTodos.concat(cloudTodos));
        }
        localStorage.setItem('todos', JSON.stringify(finalTodos));
        firebase.saveTodo(finalTodos);
        this.setState({
          todos: finalTodos
        });
      });
    }
  }

  componentDidMount() {
    // Load todos from local storage if available
    let localTodos = localStorage.getItem('todos');

    if (localTodos) {
      try {
        this.setState({
          todos: JSON.parse(localTodos)
        });
      } catch (e) {
        console.error('Error while getting local tasks!');
      }
    }
  }

  componentWillUnmount() {
    if (this.props.firebase.auth.currentUser) {
      this.props.firebase.getTodos().off();
    }
  }
  
  addTodo = (task) => {
    if (task === '') {
      return false;
    }

    this.setState((prevState) => {
      const date = Date.now();
      const newTodo = {
        "id": uuid(),
        "task": task,
        "created": date,
        "edited": date,
        "completed": false
      };
      let todos = [...prevState.todos, newTodo];
      localStorage.setItem('todos', JSON.stringify(todos));
      if (this.props.firebase.auth.currentUser) {
        this.props.firebase.saveTodo(todos);
      }
      return { todos };
    });
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({input: e.target.value});
  }

  handleTask = (task) => {
    // Finding index of task from array of tasks
    let { todos } = this.state;
    const index = todos.indexOf(task);

    if (task.completed && index > -1) {
      // If task is completed then remove it.
      todos[index].deleted = true;
    } else {
      todos[index].completed = true;
      todos[index].edited = Date.now();
    }
    // Updating todos
    this.setState({todos});
    localStorage.setItem('todos', JSON.stringify(todos));
    if (this.props.firebase.auth.currentUser) {
      this.props.firebase.saveTodo(todos);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <h2>Do something Today</h2>

          {this.props.firebase.auth.currentUser ?
            <button type="button" onClick={this.props.firebase.doSignOut}>
              Sign Out
            </button> :
            <Link to="/signin">Sign in</Link>
          }

          <AddTodoForm addTodo={this.addTodo} />
          <TodoList tasks={this.state.todos || []} handleTask={this.handleTask} />
        </div>
        
      </React.Fragment>
    )
  }
}

export default withAuthentication(Todo);