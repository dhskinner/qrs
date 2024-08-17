import { useState, useRef, useMemo, useCallback } from "react";
import { Marker } from "react-leaflet";
import PropTypes from "prop-types";
import { LaunchRing } from "./LaunchRing.jsx";
import { LaunchInfo } from "./LaunchInfo.jsx";
import { AirspaceNm } from "./Common.jsx";

export function Draggable(props) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(props.position);
  const [altitudeFt, setAltitudeFt] = useState(props.upper_feet);
  const [radiusNm, setRadiusNm] = useState(
    AirspaceNm(props.upper_feet, props.radius_nm)
  );

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

  const setNewAltitude = useCallback((alt) => {
    console.log(1, alt, typeof alt);
    let val = parseInt(alt);
    console.log(2, val, typeof val);
    if (typeof val === "number") {
      setAltitudeFt(parseInt(val));
      setRadiusNm(AirspaceNm(val, null));
    }
  }, []);

  return props.display ? (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={{ lat: position[0], lng: position[1] }}
      ref={markerRef}
    >
      <LaunchInfo
        name={props.name}
        position={position}
        radius_nm={radiusNm}
        style={props.style}
        ground_ring={props.ground_ring}
        lower_feet={props.lower_feet}
        upper_feet={altitudeFt}
        concentric_rings_km={props.concentric_rings_km}
        draggable={draggable}
        set_draggable_func={toggleDraggable}
        set_altitude_func={setNewAltitude}
      />
      <LaunchRing
        name={props.name}
        position={position}
        radius_nm={radiusNm}
        style={props.style}
        ground_ring={props.ground_ring}
        lower_feet={props.lower_feet}
        upper_feet={altitudeFt}
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
  radius_nm: PropTypes.number,
  style: PropTypes.string.isRequired,
  ground_ring: PropTypes.bool,
  lower_feet: PropTypes.number,
  upper_feet: PropTypes.number,
  concentric_rings_km: PropTypes.number,
  display: PropTypes.bool,
};

export default Draggable;
