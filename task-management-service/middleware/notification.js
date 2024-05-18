const axios = require("axios");

exports.createNotification = async (task) => {
  try {
    const response = await axios.post(`${process.env.NOTIFICATION_URL}/notifications/`, {
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
    const response = await axios.put(`${process.env.NOTIFICATION_URL}/notifications/`, {
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
    const response = await axios.delete(`${process.env.NOTIFICATION_URL}/notifications/${taskId}`);
  } catch (error) {
    console.log(error);
  }
};