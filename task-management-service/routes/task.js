const express = require("express");
const { body } = require("express-validator");

const Task = require("../models/task");
const taskController = require("../controllers/task");
const {
  authMiddleware,
  assigneeExistsValidator,
} = require("../middleware/auth");

const router = express.Router();

router.post("",
  authMiddleware,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("date").isISO8601().toDate().withMessage("Invalid date format"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("location.name")
      .trim()
      .notEmpty()
      .withMessage("Location name is required"),
    body("location.longitude")
      .isFloat({ min: -180, max: 180 })
      .withMessage("Invalid longitude value"),
    body("location.latitude")
      .isFloat({ min: -90, max: 90 })
      .withMessage("Invalid latitude value"),
  ],
  taskController.createTask
);

router.get("", authMiddleware, taskController.getAllTasks);

router.put("/:taskId", [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("date").isISO8601().toDate().withMessage("Invalid date format"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("assignee")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .custom(async (value, { req }) => {
        const assigneeExists = await assigneeExistsValidator(value);
        if (!assigneeExists) {
          throw new Error("Assignee does not exist");
        }
      }),
    body("location.name")
      .trim()
      .notEmpty()
      .withMessage("Location name is required"),
    body("location.longitude")
      .isFloat({ min: -180, max: 180 })
      .withMessage("Invalid longitude value"),
    body("location.latitude")
      .isFloat({ min: -90, max: 90 })
      .withMessage("Invalid latitude value"),
    body("status").trim().notEmpty().withMessage("Status is required"),
  ],
  authMiddleware,
  taskController.updateTaskById
);

router.delete("/:taskId", authMiddleware, taskController.deleteTaskById);

module.exports = router;
