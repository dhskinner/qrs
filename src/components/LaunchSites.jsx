import { Draggable } from "./Draggable.jsx";
import launchsites from "../assets/launchsites.json";

function LaunchSites() {
  return (
    <>
      {launchsites.sites.map((item, i) => (
        <Draggable
          name={item.name}
          position={item.position}
          radius_nm={item.radius_nm}
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
