import { AppDispatch, store } from "../../app/store";
import { ResponseError, TaskAddDto } from "../../utils/typed";
import {
addUpdateTask,
  deleteTask,
  loadingTasksFailed,
  loadingTasksStarted,
  saveAllTasks,

} from "../slice/tasksSlice";

export const getTaskById = (taskId: string, create:boolean) => {
  return async (dispatch: AppDispatch, getState: typeof store.getState) => {
    try {
      const state = getState();

      dispatch(loadingTasksStarted());
      const response = await fetch(`${process.env.REACT_APP_TASK_URL}/tasks/${taskId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.user.response.token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        dispatch(loadingTasksFailed(errorData));
        return;
      }

      const data = await response.json();
      dispatch(addUpdateTask(data));
    } catch (error: any) {
      dispatch(loadingTasksFailed({ message: "Failed to load tasks." }));
    }
  };
};

export const getTasks = () => {
  return async (dispatch: AppDispatch, getState: typeof store.getState) => {
    try {
      const state = getState();

      dispatch(loadingTasksStarted());
      const response = await fetch(`${process.env.REACT_APP_TASK_URL}/tasks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.user.response.token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        dispatch(loadingTasksFailed(errorData));
        return;
      }
      const data = await response.json();
      dispatch(saveAllTasks(data));
    } catch (error: any) {
      dispatch(loadingTasksFailed({ message: "Failed to load tasks." }));
    }
  };
};


export const addUpdateTasks = (postData: TaskAddDto, taskId?: string) => {
  return async (dispatch: AppDispatch, getState: typeof store.getState) => {
    try {
      const state = getState();
      const path = taskId
        ? `${process.env.REACT_APP_TASK_URL}/tasks/${taskId}`
        : `${process.env.REACT_APP_TASK_URL}/tasks`;
      const response = await fetch(path, {
        method: taskId ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${state.user.response.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(loadingTasksFailed(errorData));
        return;
      }

      const data = await response.json();


        dispatch(addUpdateTask(data));

      const updatedState = getState();
    } catch (error: any) {
      dispatch(loadingTasksFailed({ message: "Failed to save task." }));
    }
  };
};

export const deleteTasks = (taskId: string) => {
  return async (dispatch: AppDispatch, getState:typeof store.getState) => {
    try {
      const state = getState();
      const response = await fetch(
        `${process.env.REACT_APP_TASK_URL}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${state.user.response.token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData: ResponseError = await response.json();
        dispatch(loadingTasksFailed(errorData));
        return;
      }

      dispatch(deleteTask(taskId));
    } catch (error: any) {
      dispatch(loadingTasksFailed({ message: "Failed to delete task." }));
    }
  };
};
