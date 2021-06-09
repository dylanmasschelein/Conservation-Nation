const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
// const userRoutes = require("./routes/userRoutes.js");
// const observationRoutes = require("./routes/observationRoutes");
const databaseAreas = require("./areasDB");

const port = 8080;

app.use(cors());
app.use("/static", express.static("public"));
app.use(express.json());

app.use("/areas", databaseAreas);
// app.use("/area", observationRoutes);
// app.use("/user", userRoutes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));

// const express = require("express");
// const app = express();
// require("dotenv").config();
// const cors = require("cors");
// const userRoutes = require("./routes/userRoutes.js");
// const observationRoutes = require("./routes/observationRoutes");
// const databaseAreas = require("./areasDB");

// const port = 8080;

// app.use(cors());
// app.use("/static", express.static("public"));
// app.use(express.json());

// app.use("/areas", databaseAreas);
// app.use("/area", observationRoutes);
// app.use("/user", userRoutes);

// app.listen(port, () => console.log(`Server is listening on port ${port}...`));
