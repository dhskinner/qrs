import { CircleMarker, Popup, Tooltip } from "react-leaflet";
import data from "../assets/features.json";
import { GetStyle } from "./Common.jsx";

function Features() {
  return (
    <>
      {data.features.map((item, i) => (
        <CircleMarker
          key={"cm" + i}
          center={item.position}
          pathOptions={GetStyle(item.style)}
          radius={10}
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
                  <td>{item.position}</td>
                </tr>
              </tbody>
            </table>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}

export default Features;
