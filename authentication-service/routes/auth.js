const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/authController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Please enter a password with at least 5 characters."),
    body("name").trim().notEmpty().withMessage("Please enter a name."),
  ], authController.signup
);

router.post("/login",
[
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Please enter a password."),
], authController.login);

router.get("/refreshToken", isAuth, authController.refreshToken)

router.post("/logout", isAuth, authController.logout);

// router.get ('/user/:userId', authController.getUserById)
router.get ('/users', isAuth, authController.getUsers)

router.get("/check-auth", isAuth, authController.authCheck);

router.get("/check-user/:userId", authController.checkUser);


module.exports = router;
