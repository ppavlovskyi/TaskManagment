const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { email, name, password } = req.body;

    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({ email, name, password: hashedPw });
    const result = await user.save();
    res.status(201).json({ message: "User created!", userId: result._id });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 404;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    const token = await jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ token: token, userId: user._id.toString(), name: user.name });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
exports.refreshToken = async (req, res, next) => {
  try {
   
    const user = await User.findById(req.userId );
    if (!user) {
      const error = new Error("Token broken");
      error.statusCode = 401;
      throw error;
    }


    const token = await jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );
    res
      .status(200)
      .json({token});
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

exports.getUsers = async (req, res, next) => {
 try{ const users = await User.find().select('name _id');
  res.status(200).json(users);
} catch (error) {
  next(error);
}
};

exports.authCheck = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      res.status(200).json({ userId: user._id });
    } else {
      res.status(401).json({ message: "Auth failed" });
    }
  } catch (error) {
    res.status(401).json({ message: "Auth failed" });
  }
};

exports.checkUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({ message: "User exists" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};
