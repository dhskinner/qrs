import { useState, useRef, useMemo, useCallback } from "react";
import { Popup, Marker } from "react-leaflet";
import PropTypes from "prop-types";
import { LaunchRing } from "./LaunchRing.jsx";
import { LaunchInfo } from "./LaunchInfo.jsx";

export function Draggable(props) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(props.position);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          let newpos = marker.getLatLng();
          setPosition([newpos.lat, newpos.lng]);
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return props.display ? (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={{ lat: position[0], lng: position[1] }}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
      <LaunchInfo
        name={props.name}
        position={position}
        radius_nm={props.radius_nm}
        style={props.style}
        ground_ring={props.ground_ring}
        lower_feet={props.lower_feet}
        upper_feet={props.upper_feet}
        concentric_rings_km={props.concentric_rings_km}
        draggable={draggable}
        draggable_func={toggleDraggable}
      />
      <LaunchRing
        name={props.name}
        position={position}
        radius_nm={props.radius_nm}
        style={props.style}
        ground_ring={props.ground_ring}
        lower_feet={props.lower_feet}
        upper_feet={props.upper_feet}
        concentric_rings_km={props.concentric_rings_km}
      />
    </Marker>
  ) : (
    <></>
  );
}

Draggable.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  radius_nm: PropTypes.number.isRequired,
  style: PropTypes.string.isRequired,
  ground_ring: PropTypes.bool,
  lower_feet: PropTypes.number,
  upper_feet: PropTypes.number,
  concentric_rings_km: PropTypes.number,
  display: PropTypes.bool,
};

export default Draggable;
