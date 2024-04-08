import { Circle, Popup, Tooltip } from "react-leaflet";
import PropTypes from "prop-types";
import {
  GetStyle,
  GetDashedStyle,
  NmToMetres,
  NmToFeet,
  PositionLabel,
  SafetyRange,
  NumberWithCommas,
  MetresToFeet,
} from "./Common.jsx";

function getPopup(props) {
  return (
    <Popup>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{props.name}</td>
          </tr>
          <tr>
            <td>Position:</td>
            <td>{PositionLabel(props.position)}</td>
          </tr>
          <tr>
            <td>Lower:</td>
            <td>
              {props.lower_feet == 0
                ? "Surface"
                : NumberWithCommas(props.lower_feet) + "ft"}
            </td>
          </tr>
          <tr>
            <td>Upper:</td>
            <td>
              {props.upper_feet >= 200000
                ? "Unlimited"
                : NumberWithCommas(props.upper_feet) + "ft"}
            </td>
          </tr>
          <tr>
            <td>Airspace:</td>
            <td>
              {props.radius_nm +
                "nm (" +
                NumberWithCommas(NmToFeet(props.radius_nm)) +
                "ft) radius"}
            </td>
          </tr>
          {props?.ground_ring ? (
            <tr>
              <td>Ground:</td>
              <td>
                {NumberWithCommas(Math.round(SafetyRange(props.upper_feet))) +
                  "m (" +
                  NumberWithCommas(
                    Math.round(MetresToFeet(SafetyRange(props.upper_feet)))
                  ) +
                  "ft) radius"}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </Popup>
  );
}

function concentricRings(position, ring_km, max_nm) {
  let rings = [];
  let max_km = NmToMetres(max_nm);
  for (let i = ring_km * 1000; i < max_km; i += ring_km * 1000) {
    rings.push(i);
  }
  console.log(JSON.stringify(rings));
  return (
    <>
      {rings.map((radius, i) => (
        <Circle
          key={"cr" + i}
          center={position}
          pathOptions={GetStyle("white")}
          radius={radius}
        >
          <Popup>
            <table>
              <tbody>
                <tr>
                  <td>Radius:</td>
                  <td>
                    {NumberWithCommas(Math.round(radius)) +
                      "m (" +
                      NumberWithCommas(Math.round(MetresToFeet(radius))) +
                      "ft)"}
                  </td>
                </tr>
              </tbody>
            </table>
          </Popup>
        </Circle>
      ))}
    </>
  );
}

export function LaunchRing(props) {
  console.log(JSON.stringify(props));
  return (
    <>
      {props?.ground_ring ? (
        <Circle
          center={props.position}
          pathOptions={GetDashedStyle(props.style)}
          radius={SafetyRange(props.upper_feet)}
        >
          {getPopup(props)}
        </Circle>
      ) : null}
      {props?.concentric_rings_km
        ? concentricRings(
            props.position,
            props.concentric_rings_km,
            props.radius_nm
          )
        : null}
      <Circle
        center={props.position}
        pathOptions={GetStyle(props.style)}
        radius={NmToMetres(props.radius_nm)}
      >
        <Tooltip permanent={true} opacity={0.8} offset={[7, 0]}>
          {props.name}
        </Tooltip>
        {getPopup(props)}
      </Circle>
    </>
  );
}

LaunchRing.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  radius_nm: PropTypes.number.isRequired,
  style: PropTypes.string.isRequired,
  ground_ring: PropTypes.bool,
  lower_feet: PropTypes.number,
  upper_feet: PropTypes.number,
  concentric_rings_km: PropTypes.number,
};

export default LaunchRing;
