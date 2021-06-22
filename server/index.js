const express = require("express");
const app = express();
const mongoose = require('mongoose')
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const databaseAreas = require("./routes/areasDB");
const port = process.env.PORT || 9000;

mongoose.connect(process.env.NODE_MONGO_URI, {useNewUrlParser: true}, ()=> console.log('connected to DB'))
app.use(cors());

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/areas", databaseAreas);
app.use("/user", userRoutes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
