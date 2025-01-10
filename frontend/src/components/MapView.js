import  { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";



const customMarkerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const ChangeMapView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13);
    }
  }, [center, map]);
  return null;
};

const MapView = ({ centers, mapCenter }) => {
    const mapRef = useRef();
  
    return (
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
  
        {/* Smooth transition to new center */}
        <ChangeMapView center={mapCenter} />
  
        {/* Markers */}
        {centers.map((center, index) => (
          <Marker
            key={index}
            position={[center.latitude, center.longitude]}
            icon={customMarkerIcon}
          >
            <Popup>
              <strong>{center.name}</strong>
              <br />
              {center.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>);
    }

    export default MapView;