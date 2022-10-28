import React, { useState } from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { TaskList } from '../TaskList';

import './TodoApp.css';

const TodoApp = () => {
  const createTodoItem = (label, minutes, seconds) => {
    return {
      id: maxId++,
      label: label,
      done: false,
      date: new Date(),
      minutes: minutes,
      seconds: seconds,
    };
  };

  let maxId = 0;

  const [todoData, setTodoData] = useState([
    createTodoItem('Drink milk', '10', '5'),
    createTodoItem('Create TodoList React', '10', '58'),
    createTodoItem('Create Plov', '0', '5'),
  ]);

  const [showMode, setShowMode] = useState('all');

  const deletedTodo = (id) => {
    const findedId = todoData.findIndex((elem) => elem.id === id);
    setTodoData((todoData) => {
      return [...todoData.slice(0, findedId), ...todoData.slice(findedId + 1)];
    });
  };

  const addTodo = (label, minutes, seconds) => {
    setTodoData((todoData) => {
      return [...todoData, createTodoItem(label, minutes, seconds)];
    });
  };

  const toggleDoneTodo = (id) => {
    const findedId = todoData.findIndex((elem) => elem.id === id);
    let oldObj = todoData[findedId];
    let newObj = { ...oldObj, done: !oldObj.done };
    let newArr = [...todoData.slice(0, findedId), newObj, ...todoData.slice(findedId + 1)];

    setTodoData(newArr);
  };

  const editTodo = (id, label, mins, secs) => {
    const findedId = todoData.findIndex((elem) => elem.id === id);
    let oldItem = todoData[findedId];
    let newItem = { ...oldItem, label: label, minutes: mins, seconds: secs };
    let newArr = [...todoData.slice(0, findedId), newItem, ...todoData.slice(findedId + 1)];

    setTodoData(newArr);
  };

  const formatNumber = (number, searchNull) => {
    const num = String(number);
    if (searchNull === 1) if (num[0] === '0') return num.slice(1);
    if (String(number).length > 2) return number;
    return ('0' + String(number)).slice(-2);
  };

  const clearCompletedTodos = () => {
    let newArr = todoData.filter((item) => !item.done);
    setTodoData(newArr);
  };

  const setModeShow = (nameMode) => {
    setShowMode(nameMode);
  };

  const getTodosData = () => {
    if (showMode === 'all') return todoData;
    else if (showMode === 'active') return todoData.filter((item) => !item.done);
    else if (showMode === 'completed') return todoData.filter((item) => item.done);
  };

  const countLeftTodo = todoData.reduce((acc, item) => (item.done ? acc : ++acc), 0);

  return (
    <>
      <Header addTodo={addTodo} formatNumber={formatNumber} />
      <section className="main">
        <TaskList
          todoData={getTodosData()}
          onDeleted={deletedTodo}
          toggleDoneTodo={toggleDoneTodo}
          editTodo={editTodo}
          formatNumber={formatNumber}
        />
      </section>
      <Footer
        countLeftTodo={countLeftTodo}
        clearCompletedTodos={clearCompletedTodos}
        setModeShow={setModeShow}
        showMode={showMode}
      />
    </>
  );
};

export default TodoApp;
