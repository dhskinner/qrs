import "./App.css";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import Airspace from "./components/Airspace.jsx";
import Aerodromes from "./components/Aerodromes.jsx";
import LaunchSites from "./components/LaunchSites.jsx";
import Features from "./components/Features.jsx";
import Coords from "./components/Coords.jsx";

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
        <LayersControl>
          <LayersControl.BaseLayer checked name="Google Hybrid">
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.com/maps/vt?lyrs=s,h&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Streets">
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.com/maps/vt?lyrs=m@189&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Satellite">
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.com/maps/vt?lyrs=s&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Terrain">
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.com/maps/vt?lyrs=p&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <Airspace />
        <Aerodromes />
        <LaunchSites />
        <Features />
        <div className="leaflet-bottom leaflet-right">
          <Coords />
        </div>
      </MapContainer>
    </>
  );
}

export default App;
