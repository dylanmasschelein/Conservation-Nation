const iucnCategories = (category) => {
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
    return "";
  }
};

export default iucnCategories;
