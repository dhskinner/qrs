import { Popup } from "react-leaflet";
import PropTypes from "prop-types";
import {
  NmToFeet,
  PositionLabel,
  SafetyRange,
  NumberWithCommas,
  RoundTo,
  MetresToFeet,
} from "./Common.jsx";

export function LaunchInfo(props) {
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
              {RoundTo(props.radius_nm, 3) +
                "nm (" +
                NumberWithCommas(RoundTo(NmToFeet(props.radius_nm), 0)) +
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
          {props.draggable_func == null ? null : (
            <tr>
              <td colSpan="2">
                <span onClick={props.draggable_func}>
                  {props.draggable === true
                    ? "Marker is draggable"
                    : "Click here to make marker draggable"}
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Popup>
  );
}

LaunchInfo.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  radius_nm: PropTypes.number.isRequired,
  style: PropTypes.string.isRequired,
  ground_ring: PropTypes.bool,
  lower_feet: PropTypes.number,
  upper_feet: PropTypes.number,
  concentric_rings_km: PropTypes.number,
  draggable: PropTypes.bool,
  draggable_func: PropTypes.func,
};

export default LaunchInfo;
