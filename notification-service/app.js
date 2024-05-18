const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const notificationRoutes = require("./routes/notificationRoutes");
const errorHandler = require('./middleware/error-handler');

const app = express();
const port = process.env.PORT || 8082

const server = http.createServer(app);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/notifications', notificationRoutes);

app.use(errorHandler);



mongoose
  .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`)
  .then(() => {
    console.log("DB Conected");
    const server = app.listen(port);
    const io = require('./notificationSocket').init(server);
    io.on('connection', socket => {
      console.log('Client connected');
    });
  })
  .catch((err) => {
    console.error(err);
  });

