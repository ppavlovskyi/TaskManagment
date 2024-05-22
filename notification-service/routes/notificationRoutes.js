
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const {
  authMiddleware,
} = require("../middleware/auth");

router.post('',notificationController.createNotification);

router.get('',authMiddleware, notificationController.getAllUnreadNotificationByUserId);

router.put('', notificationController.updateNotificationByTaskId);

router.put('/:notificationId', notificationController.markNotificationAsReadByNotificationId);

router.delete('/:taskId', notificationController.deleteNotificationByTaskId)

module.exports = router;
