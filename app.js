const express = require("express");
const bp = require("body-parser");
const app = express();

app.use(bp.json());

app.get("/", (req, res, next) => {
    res.json({
        message: 'haloooo'
    })
});
 app.listen(4444,()=>{
    console.log('server');
 });
