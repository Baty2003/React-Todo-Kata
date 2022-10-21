import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

import './Task.css';
import Timer from '../Timer';

export default class Task extends Component {
  static defaultProps = {
    label: 'The label is not specified',
    onDeleted: () => {},
    editLabelTodo: () => {},
    done: false,
    date: {},
  };

  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    editLabelTodo: PropTypes.func,
    done: PropTypes.bool,
    date: PropTypes.object,
  };

  formatNumber = this.props.formatNumber;

  state = {
    ago: formatDistanceToNow(this.props.date),
    edit: false,
    editLabel: this.props.label,
    editMins: this.formatNumber(this.props.minutes),
    editSecs: this.formatNumber(this.props.seconds),
  };

  inputLabelRef = React.createRef();
  inputMinsRef = React.createRef();
  inputSecsRef = React.createRef();

  componentDidMount = () => {
    this.timerID = setInterval(() => {
      this.setState({
        ago: formatDistanceToNow(this.props.date),
      });
    }, 30000);
  };

  promisedSetState = (newState) => new Promise((resolve) => this.setState(newState, resolve));

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  };

  handleCheckBoxClick = () => {
    let { toggleDoneTodo } = this.props;
    toggleDoneTodo();
  };

  handleEditButtonClick = async () => {
    await this.promisedSetState({
      edit: true,
    });
    this.inputLabelRef.current.focus();
  };

  onChangeEditInputs = (event) => {
    const name = event.target.name;
    if (name === 'editMins' || name === 'editSecs')
      this.setState({
        [event.target.name]: this.formatNumber(event.target.value, 1),
      });
    else
      this.setState({
        [event.target.name]: event.target.value,
      });
  };

  highlightElem = (elem, duration) => {
    elem.style.backgroundColor = 'red';

    setTimeout(() => {
      elem.style.backgroundColor = 'white';
    }, duration);

    return;
  };

  cancelEditLabel = () => {
    this.setState({
      edit: false,
    });
  };

  saveChangeTodo = (event) => {
    if (event.keyCode === 27) this.cancelEditLabel();
    if (event.keyCode !== 13) return;
    const { editLabel, editMins, editSecs } = this.state;

    if (editLabel.trim() === '') {
      this.highlightElem(this.inputLabelRef.current, 500);
      return;
    } else if (editMins > 9999 || editMins < 0) {
      this.highlightElem(this.inputMinsRef.current, 500);
      return;
    } else if (editSecs > 59 || editSecs < 0) {
      this.highlightElem(this.inputSecsRef.current, 500);
      return;
    }

    this.props.editTodo(editLabel.trim(), this.formatNumber(editMins), this.formatNumber(editSecs));

    this.cancelEditLabel();
  };

  render() {
    const { label, onDeleted, done, minutes, seconds, formatNumber } = this.props;
    const { ago, edit, editLabel, editMins, editSecs } = this.state;

    const disable = { display: 'none' };

    let className = done ? 'completed' : '';
    className += edit ? ' editing' : '';

    return (
      <li className={className}>
        <div className="view">
          <label className="label-task" htmlFor="label-new-todo">
            <input
              className="toggle"
              name="label-new-todo"
              checked={done}
              onChange={() => {}}
              type="checkbox"
              onClick={this.handleCheckBoxClick}
            />
            <label htmlFor="title">
              <span className="title" name="title" onClick={this.handleCheckBoxClick}>
                {label}
              </span>
              <Timer className="description" minutes={minutes} seconds={seconds} formatNumber={formatNumber} />
              <span className="created">{ago}</span>
            </label>
          </label>
          <button className="icon icon-edit" onClick={this.handleEditButtonClick}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form method="post" className="edit-form" onKeyDown={this.saveChangeTodo} style={!edit ? disable : {}}>
          <label htmlFor="" className="edit-label">
            <input
              type="text"
              className="edit"
              name="editLabel"
              value={editLabel}
              onChange={this.onChangeEditInputs}
              ref={this.inputLabelRef}
            />
          </label>
          <label htmlFor="minutes" className="edit-label edit-label--small">
            <input
              placeholder="Min"
              className="edit edit--small"
              name="editMins"
              value={editMins}
              onChange={this.onChangeEditInputs}
              type="number"
              max="9999"
              min="0"
              ref={this.inputMinsRef}
            />
          </label>
          <label htmlFor="seconds" className="edit-label edit-label--small">
            <input
              placeholder="Sec"
              className="edit edit--small"
              name="editSecs"
              value={editSecs}
              onChange={this.onChangeEditInputs}
              type="number"
              max="59"
              min="0"
              ref={this.inputSecsRef}
            />
          </label>
        </form>
      </li>
    );
  }
}
