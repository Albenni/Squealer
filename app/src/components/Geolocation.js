import "../css/Geolocation.css";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import config from "../config/config";

function Geolocation({ setPostLocation }) {
  // Script for maps loading
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.googleMapsApiKey,
  });

  const [center, setCenter] = useState({ lat: 18.52043, lng: 73.856743 });
  const [userLocation, setUserLocation] = useState(null);

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
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    setPostLocation(userLocation);
  }, [setPostLocation, userLocation]);

  if (loadError) return <div>Error loading map</div>;

  return (
    <div className="Geolocation">
      {!isLoaded ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading Map...</span>
        </Spinner>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={userLocation} title="Your Location" />
        </GoogleMap>
      )}
    </div>
  );
}

export default Geolocation;
