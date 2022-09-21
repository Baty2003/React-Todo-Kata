import React, { Component } from 'react';

import Header from '../Header';
import Footer from '../Footer';
import TaskList from '../TaskList';
import './TodoApp.css';

export default class TodoApp extends Component {
  createTodoItem = (label) => {
    return {
      id: this.maxId++,
      label: label,
      done: false,
      date: new Date(),
    };
  };

  maxId = 0;

  state = {
    todoData: [
      this.createTodoItem('Drink milk'),
      this.createTodoItem('Create TodoList React'),
      this.createTodoItem('Create Plov'),
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

  addTodo = (label) => {
    this.setState((state) => {
      return {
        todoData: [...state.todoData.slice(), this.createTodoItem(label)],
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

  editLabelTodo = (id, label) => {
    this.setState((state) => {
      const { todoData } = state;
      const findedId = todoData.findIndex((elem) => elem.id === id);

      let oldItem = todoData[findedId];
      let newItem = { ...oldItem, label: label };
      let newArr = [...todoData.slice(0, findedId), newItem, ...todoData.slice(findedId + 1)];
      return {
        todoData: newArr,
      };
    });
  };

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
        <Header addTodo={this.addTodo} />
        <section className="main">
          <TaskList
            todoData={this.getTodosData()}
            onDeleted={this.deletedTodo}
            toggleDoneTodo={this.toggleDoneTodo}
            editLabelTodo={this.editLabelTodo}
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
