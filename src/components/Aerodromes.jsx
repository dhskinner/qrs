import { Circle, Tooltip } from "react-leaflet";
import aerodromes from "../assets/aerodromes.json";
import { DecimalLatLon, GetStyle, NmToMetres } from "./Common.jsx";
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
        <Circle
          key={"cm" + i}
          center={DecimalLatLon(item.coordinates)}
          pathOptions={item?.style ? GetStyle(item.style) : GetStyle("blue")}
          radius={NmToMetres(item.radius)}
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
              </tbody>
            </table>
          </Tooltip>
        </Circle>
      ))}
    </>
  );
}

export default Aerodromes;
