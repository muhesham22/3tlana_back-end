const express = require("express");
const bp = require("body-parser");
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

const authroutes = require('./routes/auth');
const shoproutes = require('./routes/shop');
const adminroutes = require('./routes/admin');
// const profileroute = require('./routes/profile');
const cartroutes = require('./routes/cart')

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bp.json());
app.use(cors());


app.use(shoproutes);
app.use(authroutes);
app.use('/admin',adminroutes);
// app.use(profileroute);
app.use(cartroutes);

app.get("/",(req, res)=>{
  res.json({message:"Welcome to the API!"})
})


mongoose
  .connect(
    'mongodb+srv://MuhammadH:rRzIXqrrr7QDjKIB@3tlana.9istwys.mongodb.net/3tlan'
  )
  .then((result) => {
    app.listen(4443);
    console.log('connected');
  })
  .catch((err) => {
    console.log(err);
  });


