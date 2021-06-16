const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const uri = process.env.NODE_MONGO_URI;
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
require("dotenv").config();
// ADMIN
const client = new MongoClient(uri, { useUnifiedTopology: true });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize"); // Research
const User = require("../model/user");
const secret = process.env.JWT_SECRET;

router
  .get("/current", authorize, async (req, res) => {
    try {
      const user = await User.findOne({ id: req.decoded.id });
      delete user.password;
      res.json(user);
    } catch (err) {
      return res.status(400).json({ status: "error" });
    }
  })

  // REGISTER ---------------------------------------------
  .post("/register", async (req, res) => {
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
      followedAreas,
    } = req.body;

    // Check if first name exists and is a string
    if (!firstName || typeof firstName !== "string") {
      return res.json({ status: "error", error: "Invalid username" });
    }

    // Check if last name exists and is a string
    if (!lastName || typeof lastName !== "string") {
      return res.json({ status: "error", error: "Invalid username" });
    }

    // Check if username exists and is a string
    if (!username || typeof username !== "string") {
      return res.json({ status: "error", error: "Invalid username" });
    }

    // Check if password exists and is a string
    if (!incomingPassword || typeof incomingPassword !== "string") {
      return res.json({ status: "error", error: "Invalid password" });
    }

    // Check to ensure password is 8+ charachters
    if (incomingPassword.length < 8) {
      return res.json({
        status: "error",
        error: "Password too short. Should be at least 8 characters",
      });
    }

    // Hashing password
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
        followedAreas,
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
  })

  // LOGIN --------------------------------------
  .post("/login", async (req, res) => {
    const { username, password } = req.body;
    // Find the user
    const user = await User.findOne({ username }).lean();

    // Check if the user exists
    if (!user) {
      return res.json({ status: "error", error: "Invalid username/password" });
    }

    // Check that the hashed password matches
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, secret);

      return res.json({ status: "ok", data: token });
    }

    res.json({ status: "error", error: "Invalid username/password" });
  })

  // Updating liked followed areas ------------------------------------
  .put("/:username/:area", async (req, res) => {
    const { area, username } = req.params;
    // JWT Auth ---------------- add some validation
    const user = await User.findOne({ username: username });
    // Check if area is part of followedAreas array already
    if (!user) {
      return res.json({
        status: "error",
        error: "Must be logged in to follow areas",
      });
    }

    // Retreiving previously followed areas and updating database to include new followed area
    const followed = user.followedAreas;
    const updatedFollowedAreas = [...followed, area];

    await User.updateOne(
      { username: username },
      { $set: { followedAreas: updatedFollowedAreas } }
    );

    res.json({ status: "ok" });
  })

  // Updating user profile ------------------------------------
  // .put("/:username", async (req, res) => {
  //   const { area, username } = req.params;
  //   // JWT Auth ---------------- add some validation
  //   const user = await User.findOne({ username: username });
  //   // Check if area is part of followedAreas array already
  //   if (!user) {
  //     return res.json({
  //       status: "error",
  //       error: "Must be logged in to follow areas",
  //     });
  //   }

  // Retreiving previously followed areas and updating database to include new followed area
  //   const followed = user.followedAreas;
  //   const updatedFollowedAreas = [...followed, area];

  //   await User.updateOne(
  //     { username: username },
  //     { $set: { followedAreas: updatedFollowedAreas } }
  //   );

  //   res.json({ status: "ok" });
  // })

  // CHANGE PASSWORD ------------------------------------
  .post("/change-password", async (req, res) => {
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

module.exports = router;
