const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    about: { type: String, required: true },
    followedAreas: { type: Array, default: [] },
    volunteer: { type: Boolean },
  },
  { collection: "OneEarth_Users" }
);

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
