import { Polygon } from "react-leaflet";

function SinglePolygon({ pathOptions, positions, getAreaName }) {
  return (
    <Polygon
      pathOptions={pathOptions}
      positions={positions}
      onClick={() => {
        getAreaName();
      }}
    />
  );
}

export default SinglePolygon;
