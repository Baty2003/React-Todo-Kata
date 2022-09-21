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
  };

  inputAddTodo = React.createRef();

  setValueInput = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  getLabelTodo = (event) => {
    event.preventDefault();
    let { label } = this.state;
    if (label.length === 0 || label.trim() === '') {
      this.inputAddTodo.current.classList.add('wrong');
      this.inputAddTodo.current.placeholder = 'Warning!';

      setTimeout(() => {
        this.inputAddTodo.current.classList.remove('wrong');
        this.inputAddTodo.current.placeholder = 'What needs to be done?';
      }, 1000);

      this.setState({
        label: '',
      });
      return;
    }

    let { addTodo } = this.props;

    addTodo(label.trim());

    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form action="" method="post" onSubmit={this.getLabelTodo}>
        <label htmlFor="edit-label">
          <input
            name="edit-label"
            ref={this.inputAddTodo}
            className="new-todo"
            value={this.state.label}
            placeholder="What needs to be done?"
            onChange={this.setValueInput}
          />
        </label>
      </form>
    );
  }
}
