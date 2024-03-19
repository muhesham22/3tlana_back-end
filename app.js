const express = require("express");
const bp = require("body-parser");
const app = express();
const mongoose = require("mongoose");
app.use(bp.json());

app.get("/", (req, res, next) => {
  res.json({
    message: "hoe",
  });
});

mongoose
  .connect(
    "mongodb+srv://MuhammadH:3tlandev@3tlana.9istwys.mongodb.net/?retryWrites=true&w=majority&appName=3tlana"
  )
  .then((result) => {
    app.listen(4444);
  })
  .catch((err) => {
    console.log(err);
  });
