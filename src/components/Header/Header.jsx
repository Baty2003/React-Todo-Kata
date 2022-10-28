import React from 'react';

import { NewTaskForm } from '../NewTaskForm';
import './Header.css';

const Header = (props) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm addTodo={props.addTodo} formatNumber={props.formatNumber} />
    </header>
  );
};
export default Header;
