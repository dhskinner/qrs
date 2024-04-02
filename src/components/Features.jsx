import { Circle, Popup, Tooltip } from "react-leaflet";
import data from "../assets/features.json";
import { GetStyle, PositionLabel } from "./Common.jsx";

function Features() {
  return (
    <>
      {data.features.map((item, i) => (
        <Circle
          key={"cm" + i}
          center={item.position}
          pathOptions={GetStyle(item.style)}
          radius={200}
        >
          <Tooltip permanent={false} opacity={1.0} offset={[7, 0]}>
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
              </tbody>
            </table>
          </Popup>
        </Circle>
      ))}
    </>
  );
}

export default Features;
