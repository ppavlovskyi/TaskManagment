const axios = require("axios");

exports.createNotification = async (task) => {
  try {
    const response = await axios.post(`http://localhost:8082/notifications/`, {
      userId: task.assignee,
      taskId: task._id,
      details: `Task ${task.title} ${task._id} created at ${task.date}`,
    });
  } catch (error) {
    console.log(error);
  }
};


exports.updateNotification = async (task) => {
  try {
    const response = await axios.put(`http://localhost:8082/notifications/`, {
      userId: task.assignee,
      taskId: task._id,
      details: `Task ${task.title} ${task._id} updated at ${Date.now()}`,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteNotification = async (taskId) => {
  try {
    const response = await axios.delete(`http://localhost:8082/notifications/${taskId}`);
  } catch (error) {
    console.log(error);
  }
};