import { Polygon } from "react-leaflet";

function SinglePolygon({ pathOptions, positions }) {
  return <Polygon pathOptions={pathOptions} positions={positions} />;
}

export default SinglePolygon;
