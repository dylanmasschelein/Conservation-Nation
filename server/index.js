const express = require("express");
const fileUpload = require("express-fileUpload");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const databaseAreas = require("./routes/areasDB");

const port = process.env.PORT || 9000;

app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.use("/areas", databaseAreas);
app.use("/user", userRoutes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
