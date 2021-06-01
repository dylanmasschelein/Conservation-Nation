const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const fs = require("fs");

function loadAreas() {
  return JSON.parse(fs.readFileSync("./data/protected.json", "utf-8"));
}

function writeAreas(arr) {
  return fs.writeFileSync("./data/protected.json", JSON.stringify(arr));
}

function updateAreas(areas) {
  const areasData = loadAreas();
  areasData.push(areas);
  return fs.writeFileSync("./data/protected.json", JSON.stringify(areasData));
}
// COMPLETED PAGE 15 OF REQUESTS
// CHECK ARRAY LENGTH EACH TIME TO MAKE SURE ITS STILL 50/49 UNTIL IT ISNT ANYMMORE
router.get("/", (req, res) => {
  axios
    .get(
      "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=6&token=1c80aeb620a008918c33c3575aed4236"
    )
    .then((areas) => {
      console.log(areas.data);
      console.log("GOT 50 Areas");
      return res.json(loadAreas(areas.data));
    })
    .catch((err) => console.error(err));
});

module.exports = router;
