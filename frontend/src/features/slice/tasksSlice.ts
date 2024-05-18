// import { UseScrollTriggerOptions } from "@mui/material/useScrollTrigger/useScrollTrigger";
import { Task, TasksState} from "../../utils/typed";
import {
  loadStateFromLocalStorage,
  saveLocalStorage,
} from "../../utils/constant";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const startState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const initialState: TasksState =
  loadStateFromLocalStorage("tasksState") || startState;

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadingTasksStarted: (state) => {
      state.isLoading = true;
    },
    saveAllTasks: (state, action:PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.error = null;
      saveLocalStorage("tasksState", state);
    },
    loadingTasksFailed: (state, action:PayloadAction<{ message: string }>) => {
      state.isLoading = false;
      state.error = action.payload.message;
      state.validation = action.payload;
    },
    addTaskToAll: (state, action: PayloadAction<Task>) => {
      state.tasks = [action.payload, ...state.tasks];
      state.isLoading = false;
      state.error = null;
      saveLocalStorage("tasksState", state);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        state.isLoading = false;
        state.error = null;
        saveLocalStorage("tasksState", state);
      } else {
        state.error = "Task not found";
      }
    },
    deleteTask: (state, action: PayloadAction<String>)=>{
      state.tasks = state.tasks.filter(t=>t._id !== action.payload)
    },
    cleanTaskError: (state) => {
      state.error = null;
    },
  },
});

export const {
  saveAllTasks,
  loadingTasksFailed,
  loadingTasksStarted,
  addTaskToAll,
  updateTask,
  deleteTask,
  cleanTaskError,
} = tasksSlice.actions;
export default tasksSlice.reducer;
