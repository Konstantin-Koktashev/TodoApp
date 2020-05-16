import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { currTodo, getTodoById } from './todoSlice'

export default function TodoDetails() {
    const dispatch=useDispatch()
    const getSingleTodo = async (todoID) => {
        try {
          await dispatch(getTodoById(todoID))
    } 
    catch (error) {
    console.log(error)
        }
      }
      const todo=useSelector(currTodo)
      console.log("TodoDetails -> todo", todo)
      
      useEffect(() => {
        getSingleTodo(todo.id)
        return () => {
          console.log('done');
        };
      }, [])

    return (
        <div>
            {todo&& todo.title}
        </div>
    )
}
