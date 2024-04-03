const express = require("express");
const bp = require("body-parser");
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

const authroutes = require('./routes/auth')
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bp.json());
app.use(cors());
// test my name is joe
// app.get("/", (req, res, next) => {
//   res.json({
//     message: "hoe",
//   });
// });
app.use(authroutes);

mongoose
  .connect(
    'mongodb+srv://MuhammadH:rRzIXqrrr7QDjKIB@3tlana.9istwys.mongodb.net/3tlan'
  )
  .then((result) => {
    app.listen(4444);
    console.log('connected');
  })
  .catch((err) => {
    console.log(err);
  });
