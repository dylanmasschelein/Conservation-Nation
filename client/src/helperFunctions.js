import L from "leaflet";
import tree from "./assets/Images/tree.png";
import coral from "./assets/Images/coral.png";
// change to switch statement
export const iucnCategories = (category) => {
  if (category === "Ia") {
    return "Strict Nature Reserve";
  } else if (category === "Ib") {
    return "Wilderness Area";
  } else if (category === "II") {
    return "National Park";
  } else if (category === "III") {
    return "Natural Monument/Feature";
  } else if (category === "IV") {
    return "Habitat or species management area";
  } else if (category === "V") {
    return "Protected landscape/seascape";
  } else if (category === "VI") {
    return "Protected area with sustainable use of natural resources";
  } else {
    return "Not designated";
  }
};

// Find and set center according to polygon type
export const findCenter = (areas) => {
  const center = areas.data[0].geojson.geometry.coordinates.find((area) => {
    return area;
  });
  if (areas.data[0].geojson.geometry.type === "MultiPolygon") {
    return [center[0][0][1], center[0][0][0]];
  } else {
    return [center[0][1], center[0][0]];
  }
};

// Area styles based on land or marine
export const marineStyle = {
  fillColor: "#044F67",
  weight: 2,
  color: "#044F67",
  fillOpacity: 0.3,
};

export const landStyle = {
  fillColor: "#679267",
  weight: 2,
  color: "#679267",
  fillOpacity: 0.3,
};

// Custom Icon
export const treeIcon = L.icon({
  iconUrl: tree,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

export const coralIcon = L.icon({
  iconUrl: coral,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});
