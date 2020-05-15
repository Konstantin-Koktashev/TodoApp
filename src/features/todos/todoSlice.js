import { createAsyncThunk, createSlice,  } from '@reduxjs/toolkit'
import { todoApi } from '../todoApi/todoApi'
import { v4 as uuid } from 'uuid';

export const query = createAsyncThunk(
    '/api/toys',
    async (criteria, { getState, requestId }) => {
      const { currentRequestId, loading } = getState().todos
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return
      }
      
      const response = await todoApi.getAllTodos()
      return response.data
    }
  )
  export const getTodoById=createAsyncThunk(
    '/api/todos/id',
    async(id)=>{
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
        addTodo(state,{payload}){
            
            const todo={
                userId:uuid(),
                id:uuid(),
                title:payload.todo,
                completed:false
            }
            state.todos.unshift(todo)
        },
        removeTodo(state,{payload}){
          
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

      }
    }
  })

export const {addTodo,findTodo,removeTodo} =TodoSlice.actions

 export const todoList = state => state.todos.todos;
 export const currTodo = state => state.todos.currTodo;

export default TodoSlice.reducer;
  