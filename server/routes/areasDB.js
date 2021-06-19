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
  });

// Helper Functions
function capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
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
