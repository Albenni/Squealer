import "../../css/Geolocation.css";

import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Map, Marker } from "pigeon-maps";
// import config from "../config/config";

function Geolocation() {
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trovo la posizione dell'utente
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLoadError(true);
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      setLoadError(true);
      console.error("Geolocation is not supported by this browser.");
    }
    setLoading(false);
  }, []);

  if (loadError) return <div>Error loading map</div>;

  return (
    <div className="Geolocation">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading Map...</span>
        </Spinner>
      ) : (
        <Map
          defaultCenter={[center.lat, center.lng]}
          defaultZoom={zoom}
          center={[center.lat, center.lng]}
        >
          <Marker anchor={[userLocation.lat, userLocation.lng]} />
        </Map>
      )}
    </div>
  );
}

export default Geolocation;
