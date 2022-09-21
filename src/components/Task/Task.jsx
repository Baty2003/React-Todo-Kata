import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import './Task.css';

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

  state = {
    ago: formatDistanceToNow(this.props.date),
    edit: false,
    editLabel: this.props.label,
  };

  inputEditRef = React.createRef();

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
    this.inputEditRef.current.focus();
  };

  onChangeInputEditLabel = (event) => {
    this.setState({
      editLabel: event.target.value,
    });
  };

  cancelEditLabel = (event) => {
    if (event.keyCode === 27)
      this.setState({
        edit: false,
      });
  };

  saveNewLabel = (event) => {
    event.preventDefault();
    const { editLabel } = this.state;
    if (editLabel.trim() === '') {
      this.inputEditRef.current.style.borderColor = 'red';

      setTimeout(() => {
        this.inputEditRef.current.style.borderColor = 'white';
      }, 400);
      return;
    }
    this.props.editLabelTodo(editLabel.trim());

    this.setState({
      edit: false,
    });
  };

  render() {
    const { label, onDeleted, done } = this.props;
    const { ago, edit, editLabel } = this.state;

    const disable = { display: 'none' };

    let className = done ? 'completed' : '';
    className += edit ? ' editing' : '';

    return (
      <li className={className}>
        <div className="view">
          <label className="label-task" htmlFor="label-new-todo" onClick={this.handleCheckBoxClick}>
            <input className="toggle" name="label-new-todo" checked={done} onChange={() => {}} type="checkbox" />
            <label>
              <span className="description">{label}</span>
              <span className="created">{ago}</span>
            </label>
          </label>
          <button className="icon icon-edit" onClick={this.handleEditButtonClick}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form method="post" onSubmit={this.saveNewLabel} style={!edit ? disable : {}}>
          <input
            type="text"
            className="edit"
            value={editLabel}
            onChange={this.onChangeInputEditLabel}
            onKeyDown={this.cancelEditLabel}
            ref={this.inputEditRef}
          />
        </form>
      </li>
    );
  }
}
