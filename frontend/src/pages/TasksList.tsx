import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addUpdateTasks, deleteTasks, getTasks } from "../features/api/tasks";
import {
  Box,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskComponent from "../components/TaskComponent";
import { Task, TaskAddDto } from "../utils/typed";
import TaskEdit from "../components/TaskEdit";
import { getAllUsers } from "../features/api/user";


const TasksList = () => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const tasks = useAppSelector(state => state.task.tasks);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleStartEdit = (task: Task) => {
    setEditTask(task);
    setIsEditing(true);
  };

  const handleDelete = (taskId: string) => {
    dispatch(deleteTasks(taskId));
  };

  const handleFinishEdit = (task: TaskAddDto, taskId?: string) => {
    setEditLoading(true);
    dispatch(addUpdateTasks(task, taskId))
      .then(() => {
        setEditLoading(false);
        setIsEditing(false);
        setEditTask(null);
      })
      .catch(() => setEditLoading(false));
  };

  return (
    <Box         sx={{
      margin: "1rem auto",
      maxWidth: "900px",
      display: "flex",
      flexDirection: "column",
    }}>
              <Box textAlign="end">
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={() => setIsEditing(true)}
      >
        Add Task
      </Button>
      </Box>
      <Box>
        {tasks.map(task => (
          <TaskComponent
            key={task._id}
            task={task}
            onStartEdit={handleStartEdit}
            onDelete={handleDelete}
          />
        ))}
      </Box>
      {isEditing && (
        <TaskEdit
          editing={isEditing}
          loading={editLoading}
          onCancelEdit={() => setIsEditing(false)}
          onFinishEdit={handleFinishEdit}
          selectedTask={editTask}
        />
      )}
    </Box>
  );
};

export default TasksList;