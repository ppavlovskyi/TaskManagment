import { AppDispatch, store } from "../../app/store";
import { TaskAddDto } from "../../utils/typed";
import {
  addTaskToAll,
  deleteTask,
  loadingTasksFailed,
  loadingTasksStarted,
  saveAllTasks,
  updateTask,
} from "../slice/tasksSlice";

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
  return async (dispatch: AppDispatch, getState: () => any) => {
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
      console.log("Response Data:", data);

      if (taskId) {
        dispatch(updateTask(data));
      } else {
        dispatch(addTaskToAll(data));
      }

      const updatedState = getState();
      console.log("Updated State:", updatedState.task);
    } catch (error: any) {
      dispatch(loadingTasksFailed({ message: "Failed to save task." }));
    }
  };
};

export const deleteTasks = (taskId: string) => {
  return async (dispatch: AppDispatch, getState: () => any) => {
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
        return;
      }

      dispatch(deleteTask(taskId));
    } catch (error: any) {
      dispatch(loadingTasksFailed({ message: "Failed to delete task." }));
    }
  };
};
