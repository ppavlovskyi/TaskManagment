const Notification = require("../models/notification");
const io = require("../notificationSocket");

exports.createNotification = async (req, res, next) => {
  try {
    const { userId, taskId, details } = req.body;
    const notification = new Notification({
      userId,
      taskId,
      details,
    });
    const savedNotification = await notification.save();
    io.getIO().emit("notification", { action: "create", notification: savedNotification });
    res.status(201).json(savedNotification);
  } catch (error) {
    next(error);
  }
};

exports.getAllNotificationByUserId = async (req, res, next) => {
    const userId = req.userData.userId;
  try {
    const notifications = await Notification.find({userId});
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};


exports.updateNotificationByTaskId = async (req, res, next) => {

  try {

    const { userId, details, taskId } = req.body;

    const notification = await Notification.findOne({ taskId: taskId});
    if (!notification) {
      const error = new Error("Could not find notification.");
      error.statusCode = 404;
      throw error;
    }
    notification.userId = userId;
    notification.details = details;
    notification.isUnread = true;
    await notification.save();
    io.getIO().emit("notification", { action: "update", notification });
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};


exports.markNotificationAsReadByNotificationId = async (req, res, next) => {
  const notificationId = req.params.notificationId;
  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      const error = new Error("Could not find notification.");
      error.statusCode = 404;
      throw error;
    }
    notification.isUnread = false;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

exports.deleteNotificationByTaskId = async (req, res, next) => {
  const taskId = req.params.taskId;
  try {
    const notification = await Notification.findOne({ taskId: taskId});
    if (!notification) {
      const error = new Error("Could not find notification.");
      error.statusCode = 404;
      throw error;
    }
    await Notification.findByIdAndDelete(notification._id);
    io.getIO().emit("notification", {
      action: "delete",
      notification: notification._id,
    });
    res.status(200).json({ message: "Deleted notification." });
  } catch (error) {
    next(error);
  }
};
