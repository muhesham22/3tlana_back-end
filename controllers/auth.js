const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      carModel,
      carbrand,
      carYear,
      carPlateNumber,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
    }

    const hashedpass = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone,
      password: hashedpass,
      car: {
        model: carModel,
        brand: carbrand,
        year: carYear,
        platenumber: carPlateNumber,
      },
    });
    await user.save();
    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    const isvalid = await bcrypt.compare(password, user.password);
    if (!isvalid) {
      res.status(401).json({ error: "password invalid" });
    }
    const token = jwt.sign({ userid: user._id.toString() }, "superprivatekey", {
      expiresIn: "48h",
    });
    res.status(200).json({
      message: "user logged in successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        phone: user.phone,
        carModel: user.car.model,
        carBrand: user.car.brand,
        carYear: user.car.year,
        carPN: user.car.platenumber,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ data: "User does not exist" });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "sixr69067@gmail.com", // Replace with your Gmail email address
        pass: "vxohbdzvtpqbnayg", // Replace with your Gmail password
      },
    });

    const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    user.verification = code;

    await user.save();

    let mailOptions = {
      from: {
        name: "3tlan",
        address: "sixr69067@gmail.com"
      }, // Sender address
      to: email, // List of recipients
      subject: "Verfication code", // Subject line
      html: `<h1>${code}</h1>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error occurred:", error);
      }
      console.log("Email sent successfully!", info);
      res.json({ message: "Email sent successfully!" })
    });
  } catch (e) {
    return res.json({ error: e });
  }
};

exports.confirmVerification = async (req, res, next) => {
  try {
    const { verification } = req.body;
    const user = await User.findOne({ verification });
    if (user.verification !== verification.toString())
      return res.json({ data: "Invalid verification code" });
    return res.json({ message: "Verification success", userId: user._id });
  } catch (e) {
    return res.json({ error: e });
  }
};

exports.resetPassword = async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const userId = req.params.id;
  if (password !== confirmPassword) {
    return res.json({ error: "Passwords do not match" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ data: "Invalid verification code" });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    return res.json({ data: "Password changed successfully" });
  } catch (e) {
    return res.json({ error: e });
  }
};
