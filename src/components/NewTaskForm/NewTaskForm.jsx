import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    addTodo: () => {},
  };

  static propTypes = {
    addTodo: PropTypes.func,
  };

  state = {
    label: '',
    mins: '',
    secs: '',
  };

  inputAddTodo = React.createRef();

  formatNumber = this.props.formatNumber;

  setNewChangeInputs = (event) => {
    const name = event.target.name;
    if (name === 'mins' || name === 'secs')
      this.setState({
        [event.target.name]: this.formatNumber(event.target.value, 1),
      });
    else
      this.setState({
        [event.target.name]: event.target.value,
      });
  };

  getLabelTodo = (event) => {
    const form = event.target.closest('form');

    if (event.keyCode !== 13) return;
    event.preventDefault();

    let { label, mins, secs } = this.state;
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
      this.inputAddTodo.current.placeholder = 'Warning!';
      setTimeout(() => {
        form.classList.remove('wrong');
        this.inputAddTodo.current.placeholder = 'What needs to be done?';
      }, 1000);
      this.setState({
        label: '',
        mins: '',
        secs: '',
      });

      return;
    }

    let { addTodo } = this.props;

    addTodo(label.trim(), mins.trim(), secs.trim());

    this.setState({
      label: '',
      mins: '',
      secs: '',
    });
  };

  render() {
    let { label, mins, secs } = this.state;

    return (
      <form action="" method="post" className="new-todo-form" onKeyDown={this.getLabelTodo}>
        <label htmlFor="label" className="new-todo__width-70">
          <input
            name="label"
            ref={this.inputAddTodo}
            className="new-todo"
            value={label}
            placeholder="What needs to be done?"
            onChange={this.setNewChangeInputs}
          />
        </label>
        <label htmlFor="minutes" className="new-todo__width-15">
          <input
            placeholder="Min"
            value={mins}
            className="new-todo-form__timer"
            name="mins"
            onChange={this.setNewChangeInputs}
            type="number"
            max="9999"
            min="0"
          />
        </label>
        <label htmlFor="seconds" className="new-todo__width-15">
          <input
            placeholder="Sec"
            value={secs}
            className="new-todo-form__timer"
            name="secs"
            onChange={this.setNewChangeInputs}
            type="number"
            max="59"
            min="0"
          />
        </label>
      </form>
    );
  }
}
