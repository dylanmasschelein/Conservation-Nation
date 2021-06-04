const express = require("express");
const router = express.Router();
const fs = require("fs");

function loadAreas() {
  return JSON.parse(fs.readFileSync("./data/singleArea.json", "utf-8"));
}

function writeAreas(arr) {
  return fs.writeFileSync("./data/singleArea.json", JSON.stringify(arr));
}

function updateAreas(areas) {
  const areasData = loadAreas();
  areasData.push(areas);
  return fs.writeFileSync("./data/singleArea.json", JSON.stringify(areasData));
}

router.get("/", (req, res) => {
  const area = loadAreas();
  return res.json(area);
});

module.exports = router;
