import { Task } from "../utils/typed";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";

interface Props {
  task: Task;
  onStartEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskComponent = ({ task, onStartEdit, onDelete }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { users, response } = useAppSelector((state) => state.user);

  const handleClickInfo = () => {
    setIsHovered((prev) => !prev);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box
      sx={{
        margin: "1rem 0",
        border: "1px solid #3b0062",
        borderRadius: "5px",
        padding: "0.5rem 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          color={response.userId === task.assignee ? "" : "gray"}
        >
          {task.title}
        </Typography>
        {isHovered && (
          <>
            <Typography>
              Assignee:{" "}
              {users.find((user) => user._id === task.assignee)?.name || ""}
            </Typography>
            <Typography>Status: {task.status}</Typography>
            <Typography>Location: {task.location.name}</Typography>
            <Typography>
              Task due date: {new Date(task.date).toLocaleString()}
            </Typography>
            <Typography>Description: {task.description}</Typography>
          </>
        )}
      </Box>
      <Box>
        <IconButton aria-label="view" size="large" onClick={handleClickInfo}>
          <InfoIcon
            sx={{ color: isHovered ? "#4caf50" : "rgba(0, 0, 0, 0.54)" }}
          />
        </IconButton>
        <IconButton
          aria-label="edit"
          size="large"
          onClick={() => onStartEdit(task)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => onDelete(task._id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TaskComponent;
