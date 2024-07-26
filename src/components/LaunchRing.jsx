import { Circle, Popup, Tooltip } from "react-leaflet";
import PropTypes from "prop-types";
import {
  GetStyle,
  GetDashedStyle,
  NmToMetres,
  SafetyRange,
  NumberWithCommas,
  MetresToFeet,
} from "./Common.jsx";
import { LaunchInfo } from "./LaunchInfo.jsx";

function concentricRings(position, ring_km, max_nm) {
  let rings = [];
  let max_km = NmToMetres(max_nm);
  for (let i = ring_km * 1000; i < max_km; i += ring_km * 1000) {
    rings.push(i);
  }

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
  return (
    <>
      {props?.ground_ring ? (
        <Circle
          center={props.position}
          pathOptions={GetDashedStyle(props.style)}
          radius={SafetyRange(props.upper_feet)}
        >
          {LaunchInfo(props)}
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
        {LaunchInfo(props)}
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
