import React from 'react';

const TodoList = (props) => {
  return (
    <ul>
      {props.tasks.map((todo) => {
        return (
          <li key={todo.created}>
            {todo.task}
            <button onClick={() => props.handleTask(todo)}>{todo.completed ? 'x' : 'y'}</button>
          </li>
        );
      })}
    </ul>
  )
};

export default TodoList;
