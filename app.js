const path = require('path');

const express = require("express");
const bp = require("body-parser");
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require("mongoose");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const authroutes = require('./routes/auth');
const shoproutes = require('./routes/shop');
const adminroutes = require('./routes/admin');
// const profileroute = require('./routes/profile');
const cartroutes = require('./routes/cart')
const orderroutes = require('./routes/order')
const serviceroutes = require('./routes/service')


const app = express();
const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '-' + file.originalname);
  }
});
const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bp.json());
app.use(multer({ storage: filestorage, fileFilter: filefilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());


app.use('/shop',shoproutes);
app.use('/auth',authroutes);
app.use('/admin', adminroutes);
// app.use(profileroute);
app.use('/cart',cartroutes);
app.use('/order',orderroutes);
app.use('/service',serviceroutes);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" })
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

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


