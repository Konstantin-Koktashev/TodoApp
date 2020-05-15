import React from "react";
import { useForm } from "react-hook-form";
import { addTodo } from '../todos/todoSlice'
import { useDispatch } from 'react-redux'
export function AddTodoForm() {
    const { register, handleSubmit, watch } = useForm();
    const onSubmit = data => {
        dispatch(addTodo(data))
    };
    const dispatch = useDispatch()
    console.log(watch("todo")); // watch input value by passing the name of it
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="todo" ref={register} />

            <button>Add Todo</button>
        </form>
    );
}