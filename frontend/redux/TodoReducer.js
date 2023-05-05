import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosConfig from "../Helpers/AxiosConfig";

export const getUserTodos = createAsyncThunk(
  "todos/getUserTodos",
  async ({ uuid }) => {
    try {
      const response = await AxiosConfig.get(`/todos/GetUserTodoList/${uuid}`);
      return response.data;
    } catch (err) {
      console.error(`Error in getUserTodos Reducer${err}`);
    }
  }
);

export const AddTodo = createAsyncThunk(
  "todos/AddTodo",
  async ({ newTodoData }) => {
    try {
      const respone = await AxiosConfig.post("/todos/AddTodo", newTodoData);
      return respone.data;
    } catch (err) {
      console.error(`Error in AddTodo Reducer ${err}`);
    }
  }
);
const TodoReducer = createSlice({
  name: "TodoHandler",
  initialState: {
    userTodos: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTodos.fulfilled, (state, action) => {
        state.status = "accepted";
        state.userTodos = action.payload.todoList;
      })
      .addCase(getUserTodos.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUserTodos.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(AddTodo.fulfilled, (state, action) => {
        state.status = "accepted";
        state.userTodos = [...state.userTodos, action.payload.todoList];
      })
      .addCase(AddTodo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(AddTodo.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default TodoReducer.reducer;
