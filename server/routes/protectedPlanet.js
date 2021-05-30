const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const fs = require("fs");

function loadAreas() {
  return JSON.parse(fs.readFileSync("./data/areas.json", "utf-8"));
}

function writeAreas(arr) {
  return fs.writeFileSync("./data/areas.json", JSON.stringify(arr));
}

function updateAreas(areas) {
  const areasData = loadAreas();
  areasData.push(areas);
  return fs.writeFileSync("./data/areas.json", JSON.stringify(areasData));
}

router.get("/", (req, res) => {
  axios
    .get(
      "http://api.protectedplanet.net/v3/protected_areas?with_geometry=true&per_page=50&page=2&token=1c80aeb620a008918c33c3575aed4236"
    )
    .then((areas) => {
      console.log(areas.data);
      return res.json(updateAreas(areas.data));
    })
    .catch((err) => console.error(err));
});

module.exports = router;
