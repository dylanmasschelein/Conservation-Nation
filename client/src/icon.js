import { Icon } from "leaflet";
// import { IconOne } from "react-leaflet";

console.log(Icon);
// console.log(IconOne);
class myIcon extends Icon {
  constructor() {
    super();
  }
  _setIconStyles() {
    console.log("setIconStyle");
  }
}
const myObject = {
  Icon,
  //   IconOne,
};
export default myIcon;
