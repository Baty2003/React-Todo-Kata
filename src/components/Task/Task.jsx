import React, { useState, useRef, useEffect, useId } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

import './Task.css';
import { Timer } from '../Timer';

const Task = (props) => {
  const formatNumber = props.formatNumber;

  const inputLabelRef = useRef(null);
  const inputMinsRef = useRef(null);
  const inputSecsRef = useRef(null);
  const id = useId();

  const [ago, agoSet] = useState(formatDistanceToNow(props.item.date));
  const [edit, editSet] = useState(false);
  const [editFields, editFieldsSet] = useState({
    editLabel: props.label,
    editMins: formatNumber(props.minutes),
    editSecs: formatNumber(props.seconds),
  });

  const setFieldsFunction = (nameField, value) => {
    editFieldsSet((object) => {
      return { ...object, [nameField]: value };
    });
  };

  useEffect(() => {
    let timerID = setInterval(() => agoSet(formatDistanceToNow(props.item.date), 30000));
    return () => clearInterval(timerID);
  }, []);

  const handleCheckBoxClick = () => {
    let { toggleDoneTodo } = props;
    toggleDoneTodo();
  };

  const handleEditButtonClick = async () => {
    await editSet(true);
    inputLabelRef.current.focus();
  };

  const onChangeEditInputs = (event) => {
    const name = event.target.name;
    if (name === 'editMins' || name === 'editSecs')
      setFieldsFunction([event.target.name], formatNumber(event.target.value, 1));
    else setFieldsFunction([event.target.name], event.target.value);
  };

  const highlightElem = (elem, duration) => {
    elem.style.backgroundColor = 'red';
    setTimeout(() => {
      elem.style.backgroundColor = 'white';
    }, duration);
    return;
  };

  const cancelEditLabel = () => {
    editSet(false);
  };

  const saveChangeTodo = (event) => {
    if (event.keyCode === 27) cancelEditLabel();
    if (event.keyCode !== 13) return;
    const { editLabel, editMins, editSecs } = editFields;

    if (editLabel.trim() === '') {
      highlightElem(inputLabelRef.current, 500);
      return;
    } else if (editMins > 9999 || editMins < 0) {
      highlightElem(inputMinsRef.current, 500);
      return;
    } else if (editSecs > 59 || editSecs < 0) {
      highlightElem(inputSecsRef.current, 500);
      return;
    }
    props.editTodo(editLabel.trim(), formatNumber(editMins), formatNumber(editSecs));
    cancelEditLabel();
  };

  const { onDeleted } = props;
  const { label, done, minutes, seconds } = props.item;
  const { editLabel, editMins, editSecs } = editFields;

  const disable = { display: 'none' };

  let className = done ? 'completed' : '';
  className += edit ? ' editing' : '';

  return (
    <li className={className}>
      <div className="view">
        <label className="label-task" htmlFor={id + '-checkbox-done'}>
          <input
            className="toggle"
            name="label-new-todo"
            checked={done}
            onChange={() => {}}
            type="checkbox"
            onClick={handleCheckBoxClick}
            id={id + '-checkbox-done'}
          />
          <label htmlFor="title">
            <span className="title" name="title" onClick={handleCheckBoxClick}>
              {label}
            </span>
            <Timer className="description" minutes={minutes} seconds={seconds} formatNumber={formatNumber} />
            <span className="created">{ago}</span>
          </label>
        </label>
        <button className="icon icon-edit" onClick={handleEditButtonClick}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form method="post" className="edit-form" onKeyDown={saveChangeTodo} style={!edit ? disable : {}}>
        <label htmlFor={id + '-edit-label'} className="edit-label">
          <input
            type="text"
            className="edit"
            name="editLabel"
            value={editLabel}
            onChange={onChangeEditInputs}
            ref={inputLabelRef}
            id={id + '-edit-label'}
          />
        </label>
        <label htmlFor={id + '-edit-minutes'} className="edit-label edit-label--small">
          <input
            placeholder="Min"
            className="edit edit--small"
            name="editMins"
            value={editMins}
            onChange={onChangeEditInputs}
            type="number"
            max="9999"
            min="0"
            ref={inputMinsRef}
            id={id + '-edit-minutes'}
          />
        </label>
        <label htmlFor={id + '-edit-seconds'} className="edit-label edit-label--small">
          <input
            placeholder="Sec"
            className="edit edit--small"
            name="editSecs"
            value={editSecs}
            onChange={onChangeEditInputs}
            type="number"
            max="59"
            min="0"
            ref={inputSecsRef}
            id={id + '-edit-seconds'}
          />
        </label>
      </form>
    </li>
  );
};

Task.defaultProps = {
  label: 'The label is not specified',
  onDeleted: () => {},
  editLabelTodo: () => {},
  done: false,
  date: {},
};

Task.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  editLabelTodo: PropTypes.func,
  done: PropTypes.bool,
  date: PropTypes.object,
};

export default Task;
