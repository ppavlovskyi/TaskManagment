const axios = require('axios');
const notificationController = require('../controllers/notificationController');

const handleTaskNotification = async (taskId, userId, action) => {
  try {
    let details;
    if (action === 'create') {
      details = 'New task created.';
    } else if (action === 'update') {
      details = 'Task updated.';
    } else {
      throw new Error('Invalid action.');
    }

    const notification = await notificationController.createNotification(userId, details);
    // Отправка уведомления через Socket.IO
    const io = require('./notificationSocket').getIO();
    io.emit('newNotification', notification);
  } catch (error) {
    console.error('Error handling task notification:', error);
  }
};

module.exports = { handleTaskNotification };