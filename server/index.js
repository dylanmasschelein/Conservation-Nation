const express = require("express");
const fileUpload = require("express-fileUpload");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const databaseAreas = require("./routes/areasDB");
const uri = process.env.NODE_MONGO_URI;
const path = require("path");
// const path = require("../client/build/index.html");
const mongoose = require("mongoose");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const PORT = process.env.PORT || 5000;

app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.use("/areas", databaseAreas);
app.use("/user", userRoutes);

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`));
