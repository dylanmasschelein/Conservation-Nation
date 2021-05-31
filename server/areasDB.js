// EXPRESS
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
// MONGO
const { MongoClient } = require("mongodb");
const fs = require("fs");
require("dotenv").config();
// ADMIN
const uri = process.env.NODE_MONGO_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Interacting with Database functions
async function createListings() {
  try {
    await client.connect();

    callProtectedPlanet();
    console.log("DOUBLE SUCCESS!!!!!");
  } catch (err) {
    console.log(err);
  }
}

async function retrieveListings() {
  try {
    await client.connect();

    await findMultipleAreas(client, "CAN");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

// createListings().catch(console.error);
// Calling functions to DO SOMETHING
const searchAreaResults = retrieveListings().catch(console.error);

// Database helper functions
async function createMultipleListings(client, newListings) {
  const result = await client
    .db("OneEarth")
    .collection("OneEarth_areas")
    .insertMany(newListings);

  console.log(`${result.insertedCount} new listings with the following ids`);
  console.log(result.insertedIds);
}

async function findOneListingByName(client, areaName) {
  const result = await client
    .db("OneEarth")
    .collection("OneEarth_areas")
    .findOne({ name: areaName });

  if (result) {
    console.log("found listing");
    console.log(result);
  } else {
    console.log("no listings found");
  }
}

async function findMultipleAreas(client, location) {
  const cursor = client
    .db("OneEarth")
    .collection("OneEarth_areas")
    .find({ "countries.0.iso_3": location });

  const result = await cursor.toArray();
  return result;
}

// Completed 3
const callProtectedPlanet = async () => {
  try {
    const response = await axios.get(
      "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=4&token=1c80aeb620a008918c33c3575aed4236"
    );

    console.log(response.data.protected_areas);
    const result = await createMultipleListings(
      client,
      response.data.protected_areas
    );
  } catch (err) {
    console.log(err);
  }
};

// Client side rendering request

router.get("/country", (_req, res) => {
  console.log(searchAreaResults);
  return res.json(JSON.parse(searchAreaResults));
});

module.exports = router;
