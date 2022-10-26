import React from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

const TasksFilter = (props) => {
  const clickButtonChangeModeShow = (event) => {
    props.setModeShow(event.target.name);
  };

  let { showMode } = props;

  return (
    <ul className="filters">
      <li>
        <button className={showMode === 'all' ? 'selected' : ''} onClick={clickButtonChangeModeShow} name="all">
          All
        </button>
      </li>
      <li>
        <button className={showMode === 'active' ? 'selected' : ''} onClick={clickButtonChangeModeShow} name="active">
          Active
        </button>
      </li>
      <li>
        <button
          className={showMode === 'completed' ? 'selected' : ''}
          onClick={clickButtonChangeModeShow}
          name="completed"
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.defaultProps = {
  showMode: 'all',
  setModeShow: () => {},
};

TasksFilter.propTypes = {
  showMode: PropTypes.string,
  setModeShow: PropTypes.func,
};

export default TasksFilter;
