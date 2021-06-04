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
async function createAreas() {
  try {
    await client.connect();

    callProPlanet();
  } catch (err) {
    console.log(err);
  }
}

async function retrieveAreas() {
  try {
    await client.connect();

    const areas = await findMultipleAreas(client, "CAN");
    return areas;
  } catch (err) {
    console.log(err);
  }
}
// createAreas();
// Database helper functions
async function createMultipleAreas(client, newListings) {
  const result = await client
    .db("OneEarth")
    .collection("OneEarth_areas")
    .insertMany(newListings);
}

async function findOneAreaByName(client, areaName) {
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

// Request to protected planet API
// Completed -- 100
function callProPlanet() {
  axios
    .get(
      "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=91&token=1c80aeb620a008918c33c3575aed4236"
    )
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);

      return axios.get(
        "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=92&token=1c80aeb620a008918c33c3575aed4236"
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=93&token=1c80aeb620a008918c33c3575aed4236"
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=94&token=1c80aeb620a008918c33c3575aed4236"
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=95&token=1c80aeb620a008918c33c3575aed4236"
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=96&token=1c80aeb620a008918c33c3575aed4236"
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=97&token=1c80aeb620a008918c33c3575aed4236"
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=98&token=1c80aeb620a008918c33c3575aed4236"
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=99&token=1c80aeb620a008918c33c3575aed4236"
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=100&token=1c80aeb620a008918c33c3575aed4236"
      );
    })
    .then((response) => {
      console.log("DONE ----------------------------------------");
      createMultipleAreas(client, response.data.protected_areas);
    })

    .catch((err) => console.log(err));
}

const callProtectedPlanet = async () => {
  // Promise All!!!!!!
  try {
    const response = await axios.get(
      "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=60&token=1c80aeb620a008918c33c3575aed4236"
    );

    await createMultipleAreas(client, response.data.protected_areas);
    console.log("done");
  } catch (err) {
    console.log(err);
  }
};

// Client side rendering request
router.get("/country", async (_req, res) => {
  try {
    const result = await retrieveAreas();
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

// Writing JSON file for testing
router.get("/writeTestFile", async (_req, res) => {
  try {
    const result = await retrieveAreas();
    console.log(result);
    return fs.writeFileSync(
      "./data/protectedAreas.json",
      JSON.stringify(result)
    );
  } catch (e) {
    console.log(e, "router catch block!");
  }
});

module.exports = router;

// console.log("promising");
// const result = Promise.all([
//   await axios.get(
//     "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=50&token=1c80aeb620a008918c33c3575aed4236"
//   ),
//   await axios.get(
//     "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=50&token=1c80aeb620a008918c33c3575aed4236"
//   ),
//   await axios.get(
//     "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=50&token=1c80aeb620a008918c33c3575aed4236"
//   ),
//   await axios.get(
//     "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=50&token=1c80aeb620a008918c33c3575aed4236"
//   ),
//   await axios.get(
//     "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=50&token=1c80aeb620a008918c33c3575aed4236"
//   ),
//   await axios.get(
//     "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=50&token=1c80aeb620a008918c33c3575aed4236"
//   ),
//   await axios.get(
//     "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=50&token=1c80aeb620a008918c33c3575aed4236"
//   ),
//   await axios.get(
//     "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=50&token=1c80aeb620a008918c33c3575aed4236"
//   ),
//   await axios.get(
//     "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=50&token=1c80aeb620a008918c33c3575aed4236"
//   ),
//   await axios.get(
//     "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=50&token=1c80aeb620a008918c33c3575aed4236"
//   ),
//   await axios.get(
//     "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=50&token=1c80aeb620a008918c33c3575aed4236"
//   ),
// ]);
// console.log(result);
