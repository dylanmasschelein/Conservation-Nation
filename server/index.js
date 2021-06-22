const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const databaseAreas = require("./routes/areasDB");

const port = process.env.PORT || 9000;
app.use(express.json());
// app.use(express.urlencoded());

app.use("/uploads", express.static("uploads"));
app.use(cors());

app.use("/areas", databaseAreas);
app.use("/user", userRoutes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
