// Admin
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authorize = require("../middleware/authorize");
const User = require("../model/user");
const secret = process.env.JWT_SECRET;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");
// Helpers
function validateInput(input, res) {
  if (!input || typeof input !== "string") {
    return res.status(400).json({ status: "error", error: `Invalid ${input}` });
  }
}

router
  .get("/current", authorize, async (req, res) => {
    try {
      const user = await User.findOne({ email: req.decoded.email });

      res.json(user);
    } catch (err) {
      return res
        .status(400)
        .json({ status: "error", error: "Could not authorize user" });
    }
  })

  // REGISTER
  .post("/register", async (req, res) => {
    const {
      email,
      password: incomingPassword,
      confirmPassword,
      firstName,
      lastName,
      address,
      city,
      country,
      about,
      volunteer,
      followedAreas,
    } = req.body;

    // Validation
    // validateInput(firstName, res);
    // validateInput(lastName, res);
    // validateInput(address, res);
    // validateInput(city, res);
    // validateInput(country, res);
    // validateInput(about, res);
    console.log(req.body.avatar);
    // // Confirm file exists
    // if (!req.files) {
    //   res.send({ status: false, message: "No files" });
    // } else {
    //   const { avatar } = req.files;
    //   console.log(avatar);
    //   avatar.mv("./uploads/" + avatar.name);

    //   res.send({ status: true, message: "File uploaded" });
    // }

    // if (!email || typeof email !== "string") {
    //   return res.status(400).json({ status: "error", error: "Invalid email" });
    // }

    // // if (incomingPassword !== confirmPassword) {
    // //   return res
    // //     .status(400)
    // //     .json({ status: "error", error: "Passwords must match" });
    // // }

    // if (!incomingPassword || typeof incomingPassword !== "string") {
    //   return res
    //     .status(400)
    //     .json({ status: "error", error: "Invalid password" });
    // }

    // if (incomingPassword.length < 8) {
    //   return res.status(400).json({
    //     status: "error",
    //     error: "Password too short. Should be at least 8 characters",
    //   });
    // }

    // Hashing password
    const password = await bcrypt.hash(incomingPassword, 8);
    try {
      const newUser = await User.create({
        email,
        username: email,
        password,
        firstName,
        lastName,
        address,
        city,
        country,
        about,
        avatar,
        volunteer,
        followedAreas,
      });

      console.log("success");
    } catch (err) {
      res
        .status(400)
        .json({ status: "error", error: "Issues creating new user" });
      console.log("failure");
    }
    res.status(200).json({ status: "ok" });
  })

  // LOGIN --------------------------------------
  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.json({ status: "error", error: "Invalid email/password" });
    }

    // Check that the hashed password matches
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email }, secret);
      return res.json({ status: "ok", data: token });
    }

    res.json({ status: "error", error: "Invalid email/password" });
  })

  // Updating user profile -- Post program task
  .put("/edit/:email", async (req, res) => {
    const { email } = req.params;
    const { value, key } = req.body;

    const user = await User.updateOne({ email }, { $set: { key: value } });

    res.json({ status: "ok" });
  })

  // Adding followed areas
  .put("/:email", async (req, res) => {
    const { email } = req.params;
    const { clickedArea: area } = req.body;

    if (!area) {
      return res.json({ status: "error", error: "No area followed" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: "error",
        error: "Must be logged in to follow areas",
      });
    }
    const followed = user.followedAreas;

    const match = user.followedAreas.find((followedArea) => {
      if (followedArea.id === area.id) {
        return followedArea;
      }
    });

    if (match) {
      return res.json({
        status: "error",
        error: `You're already following ${area.name} area!`,
      });
    }

    const updatedFollowedAreas = [...followed, area];

    await User.updateOne(
      { email },
      { $set: { followedAreas: updatedFollowedAreas } }
    );

    res.json({ status: "ok" });
  })

  // Deleteing followed area
  .delete("/:email/area/:area", async (req, res) => {
    const { email, area } = req.params;

    const convertedArea = Number(area);

    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(400).json({
        status: "error",
        error: "Must be logged in to follow areas",
      });
    }

    const followed = user.followedAreas;

    if (!followed) {
      return res.status(400).json({
        status: "error",
        error: "You are not following any areas yet",
      });
    }

    const matchIndex = followed.findIndex(
      (followedArea) => followedArea.id === convertedArea
    );

    if (matchIndex === -1) {
      return res.status(400).json({ status: "error", error: "Area not found" });
    }
    followed.splice(matchIndex, 1);

    await User.updateOne({ email }, { $set: { followedAreas: followed } });

    res.status(200).json({ status: "Area delelete from following list" });
  })

  // Uploading avatar
  // .post("/upload", (req, res) => {
  //   if (req.files === null) {
  //     return res
  //       .status(400)
  //       .json({ status: "error", error: "No file uploaded" });
  //   }
  //   const file = req.files.file;
  //   console.log(file);
  //   console.log(file.mv);
  //   file.mv("../../client/public/uploads", (err) => {
  //     if (err) {
  //       return res
  //         .status(500)
  //         .json({ status: "error", error: "Path not found" });
  //     }
  //     res.json({ filename: file.name, filePath: `/uploads/${file.name}` });
  //   });
  // })

  // CHANGE PASSWORD ------------------------------------ Add if time allows
  .post("/change-password", async (req, res) => {
    const { token, newpassword: incomingPassword } = req.body;
    //if i keep this - add double password check & match before proceeding
    //create a validation function
    if (!email || typeof email !== "string") {
      return res.json({ status: "error", error: "Invalid email" });
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
