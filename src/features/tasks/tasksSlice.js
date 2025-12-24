import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasks } from "./tasksAPI";

export const getTasks = createAsyncThunk("tasks/get", fetchTasks);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    filter: "All",
    search: ""
  },
  reducers: {
    addTask: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateTask: (state, action) => {
      state.items = state.items.map(t =>
        t.id === action.payload.id ? action.payload : t
      );
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const {
  addTask,
  updateTask,
  deleteTask,
  setFilter,
  setSearch
} = tasksSlice.actions;

export default tasksSlice.reducer;