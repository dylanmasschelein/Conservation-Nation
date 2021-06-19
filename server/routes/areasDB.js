// EXPRESS
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
// MONGO
const { MongoClient } = require("mongodb");
require("dotenv").config();
// ADMIN
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

  // Will need filtering for country and marine -- phase 2
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

  // will need formatting --- try any words > 3 letters capitalize -- phase 2
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
  })

  .get("/area/following/:followed", async (req, res) => {
    const followed = req.params.followed.split(",");
    await client.connect();
    console.log("top");
    try {
      const followedAreas = await Promise.all(
        followed.map(async (areaName) => {
          const myCollection = await client
            .db("OneEarth")
            .collection("OneEarth_areas");

          const result = await myCollection.findOne({ name: areaName });
          console.log("in the try");
          return result;
        })
      );
      res.json(followedAreas);
    } catch (err) {
      res.json({ status: "error", error: "caught in following endpoint" });
      console.error(err, "catch block");
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
      "3425",
      "3426",
      "3427",
      "3428",
      "3429",
      "3430",
      "3431",
      "3432",
      "3433",
      "3434"
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
