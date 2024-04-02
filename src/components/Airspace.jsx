import { GeoJSON } from "react-leaflet";
import {
  DecimalCoordinates,
  DecimalLatLon,
  GetStyle,
  NmToMetres,
} from "./Common.jsx";
import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";
import data from "../assets/airspace.json";

const unpack = () => {
  let unpacked = {
    type: "FeatureCollection",
    features: [],
  };

  data.airspace.forEach((input) => {
    // create a new feature
    let feature = {
      type: "Feature",
      id: input.id,
      properties: {
        name: input.name,
        style: GetStyle(input.style),
      },
      geometry: {
        type: "Polygon",
        coordinates: [],
      },
    };

    // unpack arcs
    input.arcs.forEach((arc) => {
      let polyline = [];
      const radius = NmToMetres(arc.radius_nm);
      const latlon1 = DecimalLatLon(arc.centre);
      const p1 = new LatLon(latlon1[0], latlon1[1]);
      const latlon2 = DecimalLatLon(arc.start);
      const p2 = new LatLon(latlon2[0], latlon2[1]);
      const latlon3 = DecimalLatLon(arc.end);
      const p3 = new LatLon(latlon3[0], latlon3[1]);
      let start_deg = p1.initialBearingTo(p2);
      let end_deg = p1.initialBearingTo(p3);
      if (arc.direction == "CCW") {
        const temp = start_deg;
        start_deg = end_deg;
        end_deg = temp;
      }
      for (let bearing = start_deg - 1; bearing < end_deg + 1; bearing++) {
        let p4 = p1.destinationPoint(radius, bearing);
        polyline.push([p4.lon, p4.lat]);
      }
      feature.geometry.coordinates.push(polyline);
    });

    // unpack polylines
    input.polylines.forEach((coords) => {
      let polyline = [];
      coords.forEach((latlon) => {
        polyline.push(DecimalCoordinates(latlon));
      });
      feature.geometry.coordinates.push(polyline);
    });

    // add the new feature
    unpacked.features.push(feature);
  });

  //console.log(JSON.stringify(unpacked));
  return unpacked;
};

const airspace = unpack(data);

function Airspace() {
  return (
    <>
      {airspace.features.map((item, i) => {
        //console.log("style: ", item.properties.style);
        return (
          <GeoJSON
            key={"airspace" + i}
            data={item}
            style={item.properties.style}
          />
        );
      })}
    </>
  );
}

export default Airspace;
