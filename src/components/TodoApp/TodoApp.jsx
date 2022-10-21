import React, { Component } from 'react';

import Header from '../Header';
import Footer from '../Footer';
import TaskList from '../TaskList';

import './TodoApp.css';

export default class TodoApp extends Component {
  createTodoItem = (label, minutes, seconds) => {
    return {
      id: this.maxId++,
      label: label,
      done: false,
      date: new Date(),
      minutes: minutes,
      seconds: seconds,
    };
  };

  maxId = 0;

  state = {
    todoData: [
      this.createTodoItem('Drink milk', '10', '5'),
      this.createTodoItem('Create TodoList React', '10', '58'),
      this.createTodoItem('Create Plov', '0', '5'),
    ],
    showMode: 'all',
  };

  deletedTodo = (id) => {
    this.setState(({ todoData }) => {
      const findedId = todoData.findIndex((elem) => elem.id === id);
      return {
        todoData: [...todoData.slice(0, findedId), ...todoData.slice(findedId + 1)],
      };
    });
  };

  addTodo = (label, minutes, seconds) => {
    this.setState((state) => {
      return {
        todoData: [...state.todoData.slice(), this.createTodoItem(label, minutes, seconds)],
      };
    });
  };

  toggleDoneTodo = (id) => {
    this.setState(({ todoData }) => {
      const findedId = todoData.findIndex((elem) => elem.id === id);
      let oldObj = todoData[findedId];
      let newObj = { ...oldObj, done: !oldObj.done };

      let newArr = [...todoData.slice(0, findedId), newObj, ...todoData.slice(findedId + 1)];

      return {
        todoData: newArr,
      };
    });
  };

  editTodo = (id, label, mins, secs) => {
    this.setState((state) => {
      const { todoData } = state;
      const findedId = todoData.findIndex((elem) => elem.id === id);
      let oldItem = todoData[findedId];
      let newItem = { ...oldItem, label: label, minutes: mins, seconds: secs };

      let newArr = [...todoData.slice(0, findedId), newItem, ...todoData.slice(findedId + 1)];

      return {
        todoData: newArr,
      };
    });
  };

  formatNumber(number, searchNull) {
    const num = String(number);
    if (searchNull === 1) if (num[0] === '0') return num.slice(1);
    if (String(number).length > 2) return number;
    return ('0' + String(number)).slice(-2);
  }

  clearCompletedTodos = () => {
    this.setState(({ todoData }) => {
      let newArr = todoData.filter((item) => !item.done);

      return {
        todoData: newArr,
      };
    });
  };
  showAll = () => {
    this.setState({
      showMode: 'all',
    });
  };

  showOnlyActive = () => {
    this.setState({
      showMode: 'active',
    });
  };
  showOnlyCompleted = () => {
    this.setState({
      showMode: 'completed',
    });
  };
  getTodosData = () => {
    let { showMode, todoData } = this.state;

    if (showMode === 'all') return todoData;
    else if (showMode === 'active') return todoData.filter((item) => !item.done);
    else if (showMode === 'completed') return todoData.filter((item) => item.done);
  };

  render() {
    const countLeftTodo = this.state.todoData.reduce((acc, item) => (item.done ? acc : ++acc), 0);
    const { showMode } = this.state;

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} formatNumber={this.formatNumber} />
        <section className="main">
          <TaskList
            todoData={this.getTodosData()}
            onDeleted={this.deletedTodo}
            toggleDoneTodo={this.toggleDoneTodo}
            editTodo={this.editTodo}
            formatNumber={this.formatNumber}
          />
          <Footer
            countLeftTodo={countLeftTodo}
            clearCompletedTodos={this.clearCompletedTodos}
            showOnlyActive={this.showOnlyActive}
            showOnlyCompleted={this.showOnlyCompleted}
            showAll={this.showAll}
            showMode={showMode}
          />
        </section>
      </section>
    );
  }
}
