function swapCoordinates(GeoJSON) {
    for (var i = 0; i < GeoJSON.geometry.coordinates.length; i++) {
      /* if this is a polygon, length is the number of co-ordinates for this polygon. if 
      this is a multiPolygon, length is the number of geometries in this polygon */
      if (type == "Polygon") {
          // iterate over this polygon's co-ordinates
          for (var j = 0; j < GeoJSON.geometry.coordinates[i].length; j++) {
              if (!paths) {
                  paths = [];
              }
              
              if (!paths[i]) {
                  paths[i] = [];
              }
              
              paths[i].push({lat: GeoJSON.geometry.coordinates[i][j][1], lng: GeoJSON.geometry.coordinates[i][j][0]});
          }
      }
      
      else if (type == "MultiPolygon") {
          // for multiPolygons, GeoJSON.geometry.coordinates.length represents the number of polygons, so we need to go one level deeper to get the number of geometries
          objectPolygon = []; // reset the polygon object
          
          // iterate over this multiPolygon's polygons
          for (var j = 0; j < GeoJSON.geometry.coordinates[i].length; j++) {
              innerCoords = []; // reset the inner coordinates
              length = GeoJSON.geometry.coordinates[i][j].length; // get the number of co-ordinates for this polygon
              clockwise = turf.booleanClockwise(GeoJSON.geometry.coordinates[i][j]); // check the co-ordinates winding. clockwise is a normal polygon, counter-clockwise is a hole
              
              // if this polygon's co-ordinates winding is counter-clockwise, this is a multiPolygon with holes so it needs to be handled differently
              if (!clockwise) {
                  holes = true;
              }
              
              // iterate over this polygon's co-ordinates
              for (var k = 0; k < length; k++) {
                  coordinates = {lat: GeoJSON.geometry.coordinates[i][j][k][1], lng: GeoJSON.geometry.coordinates[i][j][k][0]};
                  
                  // push the polygon geometry into objectPolygon
                  if (clockwise) {
                      objectPolygon.push(coordinates);
                  }
                  
                  // push the holes into innerCoords
                  else {
                      innerCoords.push(coordinates);
                  }
              }
          }
          
          if (!paths) {
              paths = [];
          }
          
          if (holes) {
              paths.push([objectPolygon, innerCoords]);
          }
          
          else {
              paths.push(objectPolygon);
          }
      }
  }
  
  return paths;