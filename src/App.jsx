import "./App.css";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  // AttributionControl,
} from "react-leaflet";

import LaunchSites from "./components/LaunchSites.jsx";
import Aerodromes from "./components/Aerodromes.jsx";
import Graticule from "./components/Graticule.jsx";
import Airspace from "./components/Airspace.jsx";
import Features from "./components/Features.jsx";
import Coords from "./components/Coords.jsx";

function App() {
  return (
    <>
      <MapContainer
        center={[-27.0, 153.0]}
        zoom={8}
        scrollWheelZoom={true}
        zoomDelta={0.1}
        style={{
          height: "100vh",
        }}
        attributionControl={false}
      >
        <LayersControl>
          <LayersControl.BaseLayer name="Google Maps" checked>
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.com/maps/vt?lyrs=s,h&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Streets">
            <TileLayer
              attribution="Google Streets"
              url="https://www.google.com/maps/vt?lyrs=m@189&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Satellite">
            <TileLayer
              attribution="Google Satellite"
              url="https://www.google.com/maps/vt?lyrs=s&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Terrain">
            <TileLayer
              attribution="Google Terrain"
              url="https://www.google.com/maps/vt?lyrs=p&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {/* <AttributionControl position="bottomright" prefix={false} /> */}
        <Graticule />
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
