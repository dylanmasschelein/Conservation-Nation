const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.NODE_MONGO_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

router
  .get("/country/:country", async (req, res) => {
    const { country } = req.params;
    capitalize(country);
    try {
      await client.connect();
      const cursor = await client
        .db("OneEarth")
        .collection("OneEarth_areas")
        .find({ "countries.0.name": country });

      const areas = await cursor.toArray();
      res.json(areas);
    } catch (err) {
      console.error(err);
    }
  })

  // Filtering for marine areas only -- Future implementation
  .get("/area/country/:country/marine/:marine", async (req, res) => {
    const { marine } = req.params;
    try {
      await client.connect();
      const cursor = await client
        .db("OneEarth")
        .collection("OneEarth_areas")
        .findOne({ marine: marine });

      const areas = await cursor.toArray();
      res.json(areas);
    } catch (e) {
      console.error(e);
    }
  })

  // Getting area by name -- Future implementation
  .get("/area/:name", async (req, res) => {
    const { name } = req.params;
    try {
      await client.connect();
      const cursor = await client
        .db("OneEarth")
        .collection("OneEarth_areas")
        .findOne({ name: name });

      const area = await cursor.toArray();
      res.json(area);
    } catch (e) {
      console.error(e);
    }
  });

// Helper Functions
function capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

module.exports = router;
