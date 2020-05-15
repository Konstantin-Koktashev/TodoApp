import React from "react";
import { useForm } from "react-hook-form";
import { getTodoById } from '../todos/todoSlice'
import { useDispatch } from 'react-redux'
export function SearchForm() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        dispatch(getTodoById(data.searchStr))
    };
    const dispatch = useDispatch()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="searchStr" ref={register} />

            <button>Search</button>
        </form>
    );
}