import React, { useState, useRef, useId } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = (props) => {
  const [label, setLabel] = useState('');
  const [mins, setMins] = useState('');
  const [secs, setSecs] = useState('');
  const inputAddTodo = useRef(null);
  const id = useId();

  const objectWithFunctionsSetState = {
    label: setLabel,
    mins: setMins,
    secs: setSecs,
  };

  const resetAllStates = () => {
    for (const key in objectWithFunctionsSetState) {
      objectWithFunctionsSetState[key]('');
    }
  };

  const formatNumber = props.formatNumber;

  const setNewChangeInputs = (event) => {
    const name = event.target.name;
    if (name === 'mins' || name === 'secs')
      objectWithFunctionsSetState[event.target.name](formatNumber(event.target.value, 1));
    else objectWithFunctionsSetState[event.target.name](event.target.value, 1);
  };

  const getLabelTodo = (event) => {
    const form = event.target.closest('form');

    if (event.keyCode !== 13) return;
    event.preventDefault();

    if (
      label.length === 0 ||
      label.trim() === '' ||
      isNaN(parseInt(mins)) ||
      isNaN(parseInt(secs)) ||
      parseInt(mins) < 0 ||
      parseInt(mins) > 9999 ||
      parseInt(secs) < 0 ||
      parseInt(secs) > 60
    ) {
      form.classList.add('wrong');
      inputAddTodo.current.placeholder = 'Warning!';
      setTimeout(() => {
        form.classList.remove('wrong');
        inputAddTodo.current.placeholder = 'What needs to be done?';
      }, 1000);
      resetAllStates();
      return;
    }
    let { addTodo } = props;
    addTodo(label.trim(), mins.trim(), secs.trim());
    resetAllStates();
  };

  return (
    <form action="" method="post" className="new-todo-form" onKeyDown={getLabelTodo}>
      <label htmlFor={id + '-label-new-todo'} className="new-todo__width-70">
        <input
          name="label"
          ref={inputAddTodo}
          className="new-todo"
          value={label}
          placeholder="What needs to be done?"
          onChange={setNewChangeInputs}
          id={id + '-label-new-todo'}
        />
      </label>
      <label htmlFor={id + '-minutes-new-todo'} className="new-todo__width-15">
        <input
          placeholder="Min"
          value={mins}
          className="new-todo-form__timer"
          name="mins"
          onChange={setNewChangeInputs}
          type="number"
          max="9999"
          min="0"
          id={id + '-minutes-new-todo'}
        />
      </label>
      <label htmlFor={id + '-seconds-new-todo'} className="new-todo__width-15">
        <input
          placeholder="Sec"
          value={secs}
          className="new-todo-form__timer"
          name="secs"
          onChange={setNewChangeInputs}
          type="number"
          max="59"
          min="0"
          id={id + '-seconds-new-todo'}
        />
      </label>
    </form>
  );
};

NewTaskForm.defaultProps = {
  addTodo: () => {},
};

NewTaskForm.propTypes = {
  addTodo: PropTypes.func,
};

export default NewTaskForm;
