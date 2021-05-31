const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const protectedPlanetRoutes = require("./routes/protectedPlanet.js");
const areaRoute = require("./routes/singleArea.js");
// const MongoClient = require("mongodb").MongoClient;
// const uri = process.env.URI;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// const port = 8080;

app.use(cors());
app.use("/static", express.static("public"));
app.use(express.json());
app.use("/areas", protectedPlanetRoutes);
app.use("/area", areaRoute);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
