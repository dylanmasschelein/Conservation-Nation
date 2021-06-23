const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, min: 6, max: 255 },
    username: { type: String, required: true, min: 6 },
    password: { type: String, required: true, min: 8, max: 255 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    about: { type: String },
    followedAreas: { type: Array, default: [] },
    avatar: { type: String },
    volunteer: { type: String },
    date: { type: Date, default: Date.now }
  },
  { collection: "OneEarth_Users" }
);

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
