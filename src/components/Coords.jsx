import React from "react";
import { useMapEvents } from "react-leaflet";
import { PositionToString } from "./Utils";

function Coords() {
  const [mousePoint, setMousePoint] = React.useState(null);

  const formattedCoordinates =
    mousePoint === null ? "" : PositionToString(mousePoint.lat, mousePoint.lng);

  const unformattedCoordinates =
    mousePoint === null ? "" : mousePoint.lat + "," + mousePoint.lng;

  React.useEffect(
    function copyToClipboard() {
      function handleCtrlCKeydown(event) {
        if (
          event.key === "c" &&
          event.ctrlKey &&
          formattedCoordinates.length > 0 &&
          navigator.clipboard
        ) {
          navigator.clipboard.writeText(unformattedCoordinates);
        }
      }

      document.addEventListener("keydown", handleCtrlCKeydown);

      return function cleanup() {
        document.removeEventListener("keydown", handleCtrlCKeydown);
      };
    },
    [formattedCoordinates]
  );

  useMapEvents({
    mousemove(event) {
      setMousePoint(event.latlng);
    },
    mouseout() {
      setMousePoint(null);
    },
  });

  if (formattedCoordinates.length === 0) return null;

  return (
    <div className="leaflet-control-attribution leaflet-control">
      {formattedCoordinates}
    </div>
  );
}

export default Coords;
