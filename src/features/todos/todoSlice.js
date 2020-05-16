import { createAsyncThunk, createSlice,  } from '@reduxjs/toolkit'
import { todoApi } from '../todoApi/todoApi'
import { v4 as uuid } from 'uuid';

export const query = createAsyncThunk(
    '/api/todos',
    async (criteria, { getState, requestId }) => {
      const { currentRequestId, loading } = getState().todos
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return
      }
      const response = await todoApi.getAllTodos()
      return response.data
    }
  )
export const addNewTodo = createAsyncThunk(
    '/api/todos/addTodo',
    async (todoTitle) => {
      const response = await todoApi.addTodo(todoTitle)
      return response.data
    }
  )
export const removeSelectedTodo = createAsyncThunk(
    '/api/todos/removeTodo',
    async (todoId) => {
   await todoApi.removeTodo(todoId)

    }
  )

  export const getTodoById=createAsyncThunk(
    '/api/todos/id',
    async(id)=>{
    console.log("id", id)
      const response = await todoApi.getTodoByID(id)
      return response.data
    }
  )


  
  export const TodoSlice = createSlice({
    name: 'todos',
    initialState: {
      todos: [],
      currTodo:null,
      loading: 'idle',
      currentRequestId: undefined,
      error: null
    },
    reducers: {
     removeTodoSync(state,{payload}){
      const todoIdx=state.todos.findIndex(todo=>todo.id===payload)
      state.todos.splice(todoIdx,1)
     },
     setTodo(state,{payload}){
       state.currTodo=state.todos.find(todo=>todo.id===payload)
     }
    },
    extraReducers: {
      [query.pending]: (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
          state.currentRequestId = action.meta.requestId
        }
      },
      [query.fulfilled]: (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle'
          state.todos=(action.payload)
          state.currentRequestId = undefined
        }
      },
      [query.rejected]: (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle'
          state.error = action.error
          state.currentRequestId = undefined
        }
      },
      [getTodoById.fulfilled]:(state,{payload})=>{
        state.currTodo=payload
      },
      [addNewTodo.fulfilled]:(state,{payload})=>{
      state.todos.unshift(payload)
      },
      [removeSelectedTodo.fulfilled]:(state)=>{
        
      }
  
    }
  })

export const {findTodo,removeTodoSync,setTodo} =TodoSlice.actions

 export const todoList = state => state.todos.todos;
 export const currTodo = state => state.todos.currTodo;

export default TodoSlice.reducer;
  