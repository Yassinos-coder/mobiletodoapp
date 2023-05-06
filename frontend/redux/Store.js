import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './UserReducer';
import TodoReducer from './TodoReducer'

const Store = configureStore({
  reducer: {
    UserReducer: UserReducer,
    TodoReducer: TodoReducer,
  }
});

export default Store