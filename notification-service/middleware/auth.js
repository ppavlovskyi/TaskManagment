const axios = require("axios");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    const response = await axios.get("http://localhost:8080/auth/check-auth", {
      headers: {
        Authorization: authHeader,
      },
    });

    const { data } = response;
    if (data && data.userId) {
      req.userData = { userId: data.userId };
      next();
    } else {
      res.status(401).json({ message: "Auth failed no user data" });
    }
  } catch (error) {
    res.status(401).json({ message: "Auth failed other" });
  }
};

const assigneeExistsValidator = async (assigneeId) => {

  try {
    const response = await axios.get(
      `http://localhost:8080/auth/check-user/${assigneeId}`
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = { authMiddleware, assigneeExistsValidator };
