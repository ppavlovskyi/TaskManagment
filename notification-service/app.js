const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const notificationRoutes = require("./routes/notificationRoutes");
const errorHandler = require('./middleware/error-handler');

const app = express();
const port = process.env.PORT || 8082

const server = http.createServer(app);

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/notifications', notificationRoutes);

app.use(errorHandler);



mongoose
  .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`)
  .then(() => {
    const server = app.listen(port);
    const io = require('./notificationSocket').init(server);
    io.on('connection', socket => {
      console.log('Client connected');
    });
  })
  .catch((err) => {
    console.error(err);
  });
