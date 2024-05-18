const { validationResult } = require('express-validator');
const Task = require('../models/task');
const {createNotification, updateNotification, deleteNotification} = require("../middleware/notification")


exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { title, date, description, location, status, assignee } = req.body;
    const task = new Task({
      title,
      date,
      description,
      assignee: assignee|| req.userData.userId,
      location,
      status
    });
    const savedTask = await task.save();
    await createNotification(savedTask);
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};


exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();//{ assignee: req.userData.userId }
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};



exports.updateTaskById = async (req, res, next) => {
  const taskId = req.params.taskId;


  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    
    const { title, date, description, assignee, location, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        date,
        description,
        assignee,
        location,
        status
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    updateNotification(updatedTask)
    res.status(200).json( updatedTask );
  } catch (error) {
    next(error);
  }
};
















// exports.getTaskById = async (req, res, next) => {
//   const taskId = req.params.taskId;
//   try {
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//     res.status(200).json(task);
//   } catch (error) {
//     next(error);
//   }
// };




exports.deleteTaskById = async (req, res, next) => {
  const taskId = req.params.taskId;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    deleteNotification(taskId)
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }







// authMiddleware, async (req, res, next) => {
//   const taskId = req.params.taskId;

//   try {
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     if (task.assignee.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to delete this task" });
//     }

//     await task.remove();
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// }




};
