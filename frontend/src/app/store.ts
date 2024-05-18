import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import useReducer from "../features/slice/userSlice";
import tasksSlice from "../features/slice/tasksSlice";

export const store = configureStore({
  reducer: {
    user: useReducer,
    task: tasksSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
