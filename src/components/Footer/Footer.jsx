import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';
import './Footer.css';

const Footer = ({ countLeftTodo, clearCompletedTodos, showOnlyActive, showOnlyCompleted, showAll, showMode }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{countLeftTodo} items left</span>
      <TasksFilter
        showOnlyActive={showOnlyActive}
        showOnlyCompleted={showOnlyCompleted}
        showAll={showAll}
        showMode={showMode}
      />
      <button className="clear-completed" onClick={clearCompletedTodos}>
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
