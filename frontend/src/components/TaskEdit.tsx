import React, { ChangeEvent, useEffect, useState } from "react";
import { SimpleUser, Task, TaskAddDto } from "../utils/typed";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import dayjs, { Dayjs } from "dayjs";
import { useAppSelector } from "../app/hooks";
interface Props {
  editing: boolean;
  selectedTask: Task | null;
  loading: boolean;
  onCancelEdit: () => void;
  onFinishEdit: (task: TaskAddDto, taskId?: string) => void;
}

const initialState: TaskAddDto = {
  title: "",
  description: "",
  location: { name: "", latitude: 0, longitude: 0 },
  date: dayjs().toISOString(),
  assignee: "",
  status: "",
};

const TaskEdit = ({
  editing,
  loading,
  onCancelEdit,
  onFinishEdit,
  selectedTask,
}: Props) => {
  const taskId = selectedTask ? selectedTask?._id : null;
  const [task, setTask] = useState<TaskAddDto>(initialState);
  const [error, setError] = useState("");
  const { users } = useAppSelector((state) => state.user);

  const successHandler = (position: GeolocationPosition) => {
    setTask((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    }));
  };

  const errorHandler = () => {
    setError("Unable to retrieve location.");
  };
  const handleSetCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  };

  useEffect(() => {
    if (selectedTask) {
      setTask((prev) => ({
        title: selectedTask.title || "",
        description: selectedTask.description || "",
        location: selectedTask.location || {
          name: "",
          latitude: 0,
          longitude: 0,
        },
        date: selectedTask.date || new Date().toISOString(),
        assignee: selectedTask.assignee || "",
        status: selectedTask.status || "",
      }));
    } else {
      setTask(initialState);
    }
  }, [selectedTask]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setTask((prev) => ({
      ...prev,
      date: date ? date.toISOString() : dayjs().toISOString(),
    }));
  };
  const handleAssigneeChange = (event: any, newValue: SimpleUser | null) => {
    setTask((prev) => ({ ...prev, assignee: newValue ? newValue._id : "" }));
  };
  const handleInputLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTask((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
  };

  const handleSubmit = () => {
    onFinishEdit(task, taskId || undefined);
  };

  const isFormValid = () => {
    return (
      task.title.trim() !== "" &&
      task.description.trim() !== "" &&
      task.location.name.trim() !== "" &&
      task.status.trim() !== ""
    );
  };

  return (
    <>
      <Modal open={editing} onClose={onCancelEdit}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography variant="h3" textAlign="center">
            {selectedTask?._id ? "Edit Task" : "Add task"}
          </Typography>
          <TextField
            required
            name="title"
            label="Title"
            value={task.title}
            onChange={handleInputChange}
          />
          <TextField
            required
            name="description"
            label="Description"
            value={task.description}
            onChange={handleInputChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Task due date and time"
              value={dayjs(task.date)}
              onChange={(newValue) => handleDateChange(newValue)}
            />
          </LocalizationProvider>

          <Autocomplete
            options={users}
            getOptionLabel={(option: SimpleUser) => option.name}
            value={users.find((user) => user._id === task.assignee) || null}
            onChange={handleAssigneeChange}
            renderInput={(params) => (
              <TextField {...params} label="Assignee" variant="standard" />
            )}
          />
          <TextField
            required
            name="name"
            label="Location name"
            value={task.location.name}
            onChange={handleInputLocationChange}
          />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <TextField
              required
              name="longitude"
              label="longitude"
              value={task.location.longitude}
              onChange={handleInputLocationChange}
            />
            <TextField
              sx={{ marginLeft: "10px" }}
              required
              name="latitude"
              label="latitude"
              value={task.location.latitude}
              onChange={handleInputLocationChange}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSetCurrentPosition}
              sx={{ marginRight: "10px", height: "54px" }}
              startIcon={<MyLocationIcon />}
            >
              Set current Location
            </Button>
          </Box>

          <FormControl>
            <FormLabel id="status">Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="status"
              name="status"
              value={task.status}
              onChange={handleInputChange}
            >
              <FormControlLabel value="todo" control={<Radio />} label="Todo" />
              <FormControlLabel
                value="in_progress"
                control={<Radio />}
                label="In progress"
              />
              <FormControlLabel value="done" control={<Radio />} label="Done" />
            </RadioGroup>
          </FormControl>
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!isFormValid() || loading}
              sx={{ marginRight: "1rem" }}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={onCancelEdit}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TaskEdit;
