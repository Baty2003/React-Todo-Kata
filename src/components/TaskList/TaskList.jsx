import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ todoData, onDeleted, toggleDoneTodo, editTodo, formatNumber }) => {
  const elements = todoData.map(({ id, ...item }) => {
    return (
      <Task
        key={id}
        onDeleted={() => onDeleted(id)}
        toggleDoneTodo={() => {
          toggleDoneTodo(id);
        }}
        {...item}
        editTodo={(label, mins, secs) => editTodo(id, label, mins, secs)}
        formatNumber={formatNumber}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todoData: PropTypes.array.isRequired,
};

export default TaskList;
