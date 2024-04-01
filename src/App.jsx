import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Airspace from "./components/Airspace.jsx";
import Aerodromes from "./components/Aerodromes.jsx";
import LaunchSites from "./components/LaunchSites.jsx";

function App() {
  return (
    <>
      <MapContainer
        center={[-27.0, 153.0]}
        zoom={8}
        scrollWheelZoom={true}
        style={{
          height: "100vh",
        }}
      >
        <TileLayer
          attribution="Google Maps"
          url="https://www.google.com/maps/vt?lyrs=m@189&x={x}&y={y}&z={z}"
        />
        <Airspace />
        <Aerodromes />
        <LaunchSites />
      </MapContainer>
    </>
  );
}

export default App;
