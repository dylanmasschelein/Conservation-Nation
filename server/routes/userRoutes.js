const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const uri = process.env.NODE_MONGO_URI;
const mongoose = require("mongoose");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
require("dotenv").config();
// ADMIN
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize"); // Research
const User = require("../model/user");
const secret = process.env.JWT_SECRET;

// UPDATE PROFILE ------------------------------------
router.post("/updateProfile", async (_req, res) => {
  // Have a look at Nolans lecture and figure out where authorize middleware comes in
  //also have a look at updating mongo -- PUT or POST???
  //JWT Auth
  //update profile
});
// CHANGE PASSWORD ------------------------------------
router.post("/change-password", async (req, res) => {
  const { token, newpassword: incomingPassword } = req.body;
  //if i keep this - add double password check & match before proceeding
  //create a validation function
  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!incomingPassword || typeof incomingPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (incomingPassword.length < 8) {
    return res.json({
      status: "error",
      error: "Password too short. Should be at least 8 characters",
    });
  }
  try {
    const user = jwt.verify(token, secret);
    const id = user.id;

    const password = await bcrypt.hash(incomingPassword, 8);
    await User.updateOne({ id }, { $set: { password } });
  } catch (e) {
    res.json({ status: "error", error: "Invalid token" });
  }

  res.json({ status: "ok" });
});

// LOGIN --------------------------------------
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  console.log(secret);
  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username }, secret);

    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid username/password" });
});

// REGISTER ---------------------------------------------
router.post("/register", async (req, res) => {
  const {
    username,
    password: incomingPassword,
    firstName,
    lastName,
    address,
    city,
    country,
    about,
    volunteer,
  } = req.body;

  if (!firstName || typeof firstName !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!lastName || typeof lastName !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!incomingPassword || typeof incomingPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (incomingPassword.length < 8) {
    return res.json({
      status: "error",
      error: "Password too short. Should be at least 8 characters",
    });
  }

  const password = await bcrypt.hash(incomingPassword, 8);

  try {
    const result = await User.create({
      username,
      password,
      firstName,
      lastName,
      address,
      city,
      country,
      about,
      volunteer,
    });
    console.log("User Created Successfully:", result);
  } catch (err) {
    if (err.code === 11000) {
      console.log(err.message);
      return res.json({ status: "error", err: "Username already in use" });
    }
    throw err;
  }

  res.json({ status: "ok" });
});

module.exports = router;