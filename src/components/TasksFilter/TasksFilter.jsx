import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

export default class TasksFilter extends Component {
  static defaultProps = {
    showMode: 'all',
    showOnlyActive: () => {},
    showOnlyCompleted: () => {},
    showAll: () => {},
  };

  static propTypes = {
    showMode: PropTypes.string,
    showOnlyActive: PropTypes.func,
    showOnlyCompleted: PropTypes.func,
    showAll: PropTypes.func,
  };

  clickButton = (event) => {
    const buttonName = event.target.name;
    const { showAll, showOnlyCompleted, showOnlyActive } = this.props;

    if (buttonName === 'all') showAll();
    else if (buttonName === 'active') showOnlyActive();
    else if (buttonName === 'completed') showOnlyCompleted();
  };

  render() {
    let { showMode } = this.props;

    return (
      <ul className="filters">
        <li>
          <button className={showMode === 'all' ? 'selected' : ''} onClick={this.clickButton} name="all">
            All
          </button>
        </li>
        <li>
          <button className={showMode === 'active' ? 'selected' : ''} onClick={this.clickButton} name="active">
            Active
          </button>
        </li>
        <li>
          <button className={showMode === 'completed' ? 'selected' : ''} onClick={this.clickButton} name="completed">
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
