import React from 'react';
import PropTypes from 'prop-types';

import { Task } from '../Task';
import './TaskList.css';

const TaskList = ({ todoData, onDeleted, toggleDoneTodo, editTodo, formatNumber }) => (
  <ul className="todo-list">
    {todoData.map(({ id, ...item }) => (
      <Task
        key={id}
        onDeleted={() => onDeleted(id)}
        toggleDoneTodo={() => {
          toggleDoneTodo(id);
        }}
        item={{ ...item }}
        editTodo={(label, mins, secs) => editTodo(id, label, mins, secs)}
        formatNumber={formatNumber}
      />
    ))}
  </ul>
);
TaskList.propTypes = {
  todoData: PropTypes.array.isRequired,
};

export default TaskList;
