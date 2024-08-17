import L from "leaflet";
import { Marker, Polygon } from "react-leaflet";
import PropTypes from "prop-types";

const settings = {
  polygonOptions: {
    opacity: 0.0,
    color: "white",
    fillColor: "white",
  },
  textOptions: {
    color: "white",
    opacity: 0.5,
    anchor: [-5, 20],
  },
};

function GraticuleText({
  positions = null,
  text = "",
  textOptions = settings.textOptions,
}) {
  if (positions == null) return <></>;

  const iconPos = L.polygon(positions).getBounds().getSouthWest(); //.getCenter();
  const iconText = L.divIcon({
    className: "graticule-icon",
    html: text,
    iconAnchor: textOptions.anchor,
  });

  return (
    <Polygon positions={positions} pathOptions={settings.polygonOptions}>
      <Marker
        opacity={textOptions.opacity}
        position={iconPos}
        icon={iconText}
      />
    </Polygon>
  );
}

GraticuleText.propTypes = {
  positions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  text: PropTypes.string,
  textOptions: PropTypes.shape({
    color: PropTypes.string,
    opacity: PropTypes.number,
    anchor: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default GraticuleText;
