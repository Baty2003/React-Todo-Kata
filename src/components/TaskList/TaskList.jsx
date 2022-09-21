import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ todoData, onDeleted, toggleDoneTodo, editLabelTodo }) => {
  const elements = todoData.map(({ id, ...item }) => {
    return (
      <Task
        key={id}
        onDeleted={() => onDeleted(id)}
        toggleDoneTodo={() => {
          toggleDoneTodo(id);
        }}
        {...item}
        editLabelTodo={(label) => editLabelTodo(id, label)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todoData: PropTypes.array.isRequired,
};

export default TaskList;
