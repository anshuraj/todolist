import React from 'react';
import isURL from 'validator/lib/isURL';

const TodoList = (props) => {
  return (
    <ul className="todos">
      {props.tasks.map((todo) => {
        if (!todo.deleted) {
          return (
            <li key={todo.created} className={`task shadow${todo.completed ? ` completed` : ``}`}>
              {
                isURL(todo.task) ?
                  <a
                    href={todo.task}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {todo.task}
                  </a> :
                  todo.task
              }
              <button onClick={() => props.handleTask(todo)}>
                <div
                  className={`task-action${todo.completed ? `` : ` check`}`}
                  title={todo.completed ? `Delete` : `Mark completed`}></div>
              </button>
            </li>
          );
        } else return '';
      })}
    </ul>
  )
};

export default TodoList;
