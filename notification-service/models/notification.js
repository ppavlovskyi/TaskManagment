const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  dateTime: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskId:{ type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true  },
  details: { type: String },
  isUnread: { type: Boolean, default: true },
});

module.exports = mongoose.model("Notification", notificationSchema);
