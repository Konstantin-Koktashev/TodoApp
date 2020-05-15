import React from "react";
import { useForm } from "react-hook-form";
import { addTodo, addNewTodo } from '../todos/todoSlice'
import { useDispatch } from 'react-redux'
export function AddTodoForm() {
    const { register, handleSubmit, watch } = useForm();
    const onSubmit = data => {
        dispatch(addNewTodo(data.todo))
    };
    
    const dispatch = useDispatch()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="todo" ref={register} />

            <button>Add Todo</button>
        </form>
    );
}