import React from 'react';
import PropTypes from 'prop-types';

import { TasksFilter } from '../TasksFilter';
import './Footer.css';

const Footer = ({ countLeftTodo, clearCompletedTodos, setModeShow, showMode }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{countLeftTodo} items left</span>
      <TasksFilter setModeShow={setModeShow} showMode={showMode} />
      <button
        className="clear-completed"
        onClick={clearCompletedTodos}
        aria-label={'button clear all completed content'}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  countLeftTask: 'UNDEFINED',
  clearCompletedTasks: () => {},
};

Footer.propTypes = {
  countLeftTodo: PropTypes.number,
  clearCompletedTasks: PropTypes.func,
};

export default Footer;
