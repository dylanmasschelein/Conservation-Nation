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

// Retreive countries from Database using ISO_3 or country
// Need search bar to send search to this route for country
// will need to .toLowercase and capitalize first letter

//Finding areas by country -------------------------
async function retrieveAreasByCountry(country) {
  try {
    await client.connect();

    const areas = await findAreasByCountry(client, country);
    return areas;
  } catch (err) {
    console.log(err);
  }
}

async function findAreasByCountry(client, country) {
  const cursor = await client
    .db("OneEarth")
    .collection("OneEarth_areas")
    .find({ "countries.0.name": country });
  console.log(country);

  const result = await cursor.toArray();
  return result;
}
// ------------------------------------------------------
// Find area by name -----------------------------------
async function retrieveAreaByName(areaName) {
  try {
    await client.connect();

    const area = await findAreaByName(client, areaName);
    return area;
  } catch (err) {
    console.log(err);
  }
}
async function findAreaByName(client, areaName) {
  const cursor = await client
    .db("OneEarth")
    .collection("OneEarth_areas")
    .findOne({ name: areaName });
  console.log(areaName);

  const result = await cursor;
  return result;
  // if (result) {
  //   console.log("found listing");
  //   console.log(result);         ------Validation method??
  // } else {
  //   console.log("no listings found");
  // }
}
// -------------------------------------------------------------
// Find country areas by marine ---------------------------------------
async function retrieveMarineAreas(marine) {
  try {
    await client.connect();

    const areas = await findMarineAreas(client, marine);
    return areas;
  } catch (err) {
    console.log(err);
  }
}
async function findMarineAreas(client, marine) {
  const cursor = await client
    .db("OneEarth")
    .collection("OneEarth_areas")
    .findOne({ marine: marine });
  console.log(marine);

  const result = await cursor.toArray();
  return result;
}
// ---------------------------------------------------
// Search Routes -----------------------------------
// Client side rendering request
// route will be '/country/:name' -- send this with the get request
router
  .get("/country", async (_req, res) => {
    try {
      const result = await retrieveAreas();
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  })
  // Delete this one when have front-end routes setup

  .get("/country/:country", async (req, res) => {
    try {
      const { country } = req.params;
      capitalize(country);
      const result = await retrieveAreasByCountry(country);
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  })
  // Will need filtering for country and marine -- phase 2
  .get("/area/country/:country/marine/:marine", async (req, res) => {
    try {
      const { marine } = req.params;
      const result = await retrieveMarineAreas(marine);
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  })
  // will need formatting --- try any words > 3 letters capitalize
  .get("/area/:name", async (req, res) => {
    try {
      const { name } = req.params;
      capitalize(name); // Will need a fucntion to capitalize every word other than the/and...
      const result = await retrieveAreaByName(name);
      res.json(result);
    } catch (e) {
      console.error(e);
    }
  });

// Helper Functions
function capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

//  writing DB from API ---------------------------------------------

async function retrieveAreas() {
  try {
    await client.connect();

    const areas = await findMultipleAreas(client, "Mexico");
    return areas;
  } catch (err) {
    console.log(err);
  }
}

async function findMultipleAreas(client, location) {
  const cursor = client
    .db("OneEarth")
    .collection("OneEarth_areas")
    .find({ "countries.0.name": location });
  console.log(location);

  const result = await cursor.toArray();
  return result;
}

async function createAreas() {
  try {
    await client.connect();
    // callProtectedPlanet();
    callProPlanet(
      "3345",
      "3346",
      "3347",
      "3348",
      "3349",
      "3350",
      "3351",
      "3352",
      "3353",
      "3354"
    );
  } catch (err) {
    console.log(err);
  }
}
// createAreas();

function callProPlanet(id1, id2, id3, id4, id5, id6, id7, id8, id9, id10) {
  axios
    .get(
      `http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=${id1}&token=1c80aeb620a008918c33c3575aed4236`
    )
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);

      return axios.get(
        `http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=${id2}&token=1c80aeb620a008918c33c3575aed4236`
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        `http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=${id3}&token=1c80aeb620a008918c33c3575aed4236`
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        `http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=${id4}&token=1c80aeb620a008918c33c3575aed4236`
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        `http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=${id5}&token=1c80aeb620a008918c33c3575aed4236`
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        `http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=${id6}&token=1c80aeb620a008918c33c3575aed4236`
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        `http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=${id7}&token=1c80aeb620a008918c33c3575aed4236`
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        `http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=${id8}&token=1c80aeb620a008918c33c3575aed4236`
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        `http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=${id9}&token=1c80aeb620a008918c33c3575aed4236`
      );
    })
    .then((response) => {
      createMultipleAreas(client, response.data.protected_areas);
      return axios.get(
        `http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=${id10}&token=1c80aeb620a008918c33c3575aed4236`
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
      "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=3235&token=1c80aeb620a008918c33c3575aed4236"
    );

    await createMultipleAreas(client, response.data.protected_areas);
    console.log("done");
  } catch (err) {
    console.log(err);
  }
};

// Database helper functions
async function createMultipleAreas(client, newListings) {
  const result = await client
    .db("OneEarth")
    .collection("OneEarth_areas")
    .insertMany(newListings);
}

// // Writing JSON file for testing
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

// const badWords = ['and', 'the', 'of', 'du']

// function capitalizeAllBut(str) {
//   const lower = str.toLowerCase()

//   const splitStr = lower.split(' ')
//   for (let i=0; i < splitStr.length; i++) {

//       switch (splitStr[i]) {
//         case (badWords[0]):
//           break;
//         case (badWords[1]):
//               break;
//         case(badWords[2]):
//               break;
//         case(badWords[3]):
//               break;
//         default:
//           const capitalLetter = splitStr[i][0].toUpperCase();
//           splitStr[i] = splitStr[i][0].toUpperCase() + splitStr[i].slice(1)
//           break;
//   }

//   }
//       return splitStr;

// }

// /*
// str[i] = str[i][0].toUpperCase() + str[i].slice(1);
// */

// console.log(capitalizeAllBut('parc national du diawaling'));
