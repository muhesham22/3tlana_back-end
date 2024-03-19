const express = require("express");
const bp = require("body-parser");
const app = express();

app.use(bp.json());
// test my name is joe
app.get("/", (req, res, next) => {
  res.json({
    message: "hoe",
  });
});
app.listen(4444, () => {
  console.log("server");
});
