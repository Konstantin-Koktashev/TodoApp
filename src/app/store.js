import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todos/todoSlice'
import logger from 'redux-logger';
export default configureStore({
  reducer: {
    counter: counterReducer,
    todos:todoReducer
  },
  middleware:[...getDefaultMiddleware(),logger ]
});
