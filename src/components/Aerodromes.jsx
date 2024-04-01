import { CircleMarker, Tooltip } from "react-leaflet";
import aerodromes from "../assets/aerodromes.json";
import { DecimalLatLon, GetStyle } from "./Common.jsx";
import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";

function positionLabel(coordinates) {
  let latlon = DecimalLatLon(coordinates);
  const p1 = new LatLon(latlon[0], latlon[1]);
  return p1.toString("dm");
}

function Aerodromes() {
  return (
    <>
      {aerodromes.map((item, i) => (
        <CircleMarker
          key={"cm" + i}
          center={DecimalLatLon(item.coordinates)}
          pathOptions={GetStyle("blue")}
          radius={5}
        >
          <Tooltip opacity={1.0} offset={[7, 0]}>
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>{item.type}</td>
                </tr>
                <tr>
                  <td>ICAO:</td>
                  <td>{item.icao}</td>
                </tr>
                <tr>
                  <td>Position:</td>
                  <td>{positionLabel(item.coordinates)}</td>
                </tr>
                <tr>
                  <td>Radius:</td>
                  <td>
                    {item.radius}nm / {item.radius * 6076}ft
                  </td>
                </tr>
              </tbody>
            </table>
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}

export default Aerodromes;
