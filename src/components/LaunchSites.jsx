import { Draggable } from "./Draggable.jsx";
import launchsites from "../assets/launchsites.json";
import { AirspaceNm } from "./Common.jsx";

function LaunchSites() {
  return (
    <>
      {launchsites.sites.map((item, i) => (
        <Draggable
          name={item.name}
          position={item.position}
          radius_nm={AirspaceNm(item.upper_feet, item.radius_nm)}
          style={item.style}
          ground_ring={item.ground_ring}
          lower_feet={item.lower_feet}
          upper_feet={item.upper_feet}
          concentric_rings_km={item.concentric_rings_km}
          display={item.display}
          key={i}
        />
      ))}
    </>
  );
}

export default LaunchSites;
