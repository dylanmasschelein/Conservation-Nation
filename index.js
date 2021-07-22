const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const databaseAreas = require("./routes/areasDB");
const uri = process.env.MONGODB_URI;
const path = require("path");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const mongoose = require("mongoose");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const PORT = process.env.PORT || 5000;

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/avatar", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No Files",
      });
    } else {
      const { avatar } = req.files;

      // avatar.mv("./uploads" + avatar.name);
      avatar.mv(`${__dirname}/uploads/${avatar.name}`);

      res.send({
        status: true,
        message: "file is uploaded",
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.use("/areas", databaseAreas);
app.use("/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./client/build")));

  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`));
