import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import styles from './todoApp.module.css';
import { query,getTodoById, todoList ,currTodo, removeSelectedTodo, removeTodoSync} from './todoSlice'
import { AddTodoForm } from '../forms/UseNpmForm';
import { SearchForm } from '../forms/SearchForm';


// export function TodoApp() {}




export default function  TodoApp () {
  const  todos  = useSelector(todoList)
  const  todo  = useSelector(currTodo)
  const dispatch = useDispatch()


  const fetchAllTodos = async () => {
    try {
      const resultAction = await dispatch(query())
      // const toys = unwrapResult(resultAction)
      // return toys
    } catch (err) {

    }
  }
  const removeTodo=async (todoId)=>{
    
    try {
      await dispatch(removeSelectedTodo(todoId))
      dispatch(removeTodoSync(todoId))
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    fetchAllTodos()
    return () => {
      console.log('done');
    };
  }, [])

  if(todo){
    return(<article className={styles.todo}>{todo.title}</article>)
  }
  
  return (<div>
    <AddTodoForm></AddTodoForm>
    <SearchForm></SearchForm>
 
    <button onClick={() => fetchAllTodos()}>Fetch</button>
    {todos.map(todo=>{
      return(<div className={styles.todo} key={todo.id}>{todo.title}
      <button onClick={()=>removeTodo(todo.id)}>X</button></div>)
    })}
  </div>)
  // render UI here
}



