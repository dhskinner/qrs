import launchsites from "../assets/launchsites.json";
import { LaunchRing } from "./LaunchRing.jsx";

function LaunchSites() {
  return (
    <>
      {launchsites.sites.map((item, i) => (
        <LaunchRing
          name={item.name}
          position={item.position}
          radius_nm={item.radius_nm}
          style={item.style}
          ground_ring={item.ground_ring}
          lower_feet={item.lower_feet}
          upper_feet={item.upper_feet}
          concentric_rings_km={item.concentric_rings_km}
          key={i}
        />
      ))}
    </>
  );
}

export default LaunchSites;
