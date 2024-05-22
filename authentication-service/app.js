
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/error-handler');

const app = express();
const port = process.env.PORT || 8080

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());


app.use('/auth', authRoutes);

app.use(errorHandler);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`
  )
  .then((result) => {
  app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });





