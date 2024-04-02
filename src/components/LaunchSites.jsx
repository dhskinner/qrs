import { Circle, Popup, Tooltip } from "react-leaflet";
import launchsites from "../assets/launchsites.json";
import { GetStyle, NmToMetres, NmToFeet, PositionLabel } from "./Common.jsx";

function LaunchSites() {
  return (
    <>
      {launchsites.sites.map((item, i) => (
        <Circle
          key={"cm" + i}
          center={item.position}
          pathOptions={GetStyle(item.style)}
          radius={NmToMetres(item.radius_nm)}
        >
          <Tooltip permanent={true} opacity={0.6} offset={[7, 0]}>
            {item.name}
          </Tooltip>
          <Popup>
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <td>Position:</td>
                  <td>{PositionLabel(item.position)}</td>
                </tr>
                <tr>
                  <td>Radius:</td>
                  <td>
                    {item.radius_nm}nm / {NmToFeet(item.radius_nm)}ft
                  </td>
                </tr>
                <tr>
                  <td>Lower:</td>
                  <td>{item.lower}</td>
                </tr>
                <tr>
                  <td>Upper:</td>
                  <td>{item.upper}</td>
                </tr>
              </tbody>
            </table>
          </Popup>
        </Circle>
      ))}
    </>
  );
}

export default LaunchSites;
