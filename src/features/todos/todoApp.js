import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import styles from './todoApp.module.css';
import { setTodo,query, getTodoById, todoList, currTodo, removeSelectedTodo, removeTodoSync } from './todoSlice'
import { AddTodoForm } from '../forms/UseNpmForm';
import { SearchForm } from '../forms/SearchForm';
import { NavLink } from 'react-router-dom';


// export function TodoApp() {}




export default function TodoApp() {
  const todos = useSelector(todoList)
  const todo = useSelector(currTodo)
  const dispatch = useDispatch()


  const fetchAllTodos = async () => {
    try {
       await dispatch(query())
    } catch (err) {
      console.log(err)
    }
  }
  const removeTodo = async (todoId) => {

    try {
      await dispatch(removeSelectedTodo(todoId))
      dispatch(removeTodoSync(todoId))
    } catch (error) {
      console.log(error)
    }
  }
  

  const setCurrTodo=(todoId)=>{
    dispatch(setTodo(todoId))
  }

  useEffect(() => {
    fetchAllTodos()
    return () => {
      console.log('done');
    };
  }, [])

  if (todo) {
    return (<article className={styles.todo}>{todo.title}</article>)
  }

  return (<div>
    <AddTodoForm></AddTodoForm>
    <SearchForm></SearchForm>

    <button onClick={() => fetchAllTodos()}>Fetch</button>
    {todos.map(todo => {
      return (<NavLink to={`${todo.id}`}  onClick={()=>{setCurrTodo(todo.id)}}className={styles.todo} key={todo.id}>{todo.title}
        <button onClick={() => removeTodo(todo.id)}>X</button></NavLink>)
    })}
  </div>)
  // render UI here
}



