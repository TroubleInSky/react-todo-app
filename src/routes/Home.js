import React from 'react';
import TodoCreationForm from '../components/TodoCreationForm';
import TodoListFilters from '../components/TodoListFilters';
import TodoListPagination from '../components/TodoListPagination';
import TodoListItems from '../components/TodoListItems';
import useUser, { useLogout } from '../helpers/useUser';
import { Link } from 'react-router-dom';

export default function Home () {

  const user = useUser();
  const logout = useLogout();

  return (
      <div>
        <div className="login-link">
          {user.logged ? (<button onClick={logout}>Выйти</button>) : (<Link to={'/login'}>Войти</Link>)}
        </div>
        <div className="header-container">
          <h1 className={'header-title'}>TODO List</h1>
        </div>
        <div className="content">
          <div className="todo-creation-form-container">
            <TodoCreationForm/>
          </div>
          <div className={'todo-list-container'}>
            <TodoListFilters/>
            <TodoListItems/>
            <TodoListPagination/>
          </div>
        </div>
      </div>
  )

}