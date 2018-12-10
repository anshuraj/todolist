import React from 'react';

const TodoList = (props) => {
  return (
    <ul>
      {props.tasks.map((todo) => {
        return <li key={todo.created}>{todo.task}</li>;
      })}
    </ul>
  )
};

export default TodoList;
