import "../../css/Geolocation.css";

import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { useMediaQuery } from "react-responsive";

import logo from "../../assets/SLogo.svg";

// import config from "../config/config";

function Geolocation(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.item) {
      // setCenter({ lat: props.item.latitude, lng: props.item.longitude });
      // setUserLocation({ lat: props.item.latitude, lng: props.item.longitude });
    } else {
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
    }

    setLoading(false);
  }, []);

  if (loadError) return <div>Error loading map</div>;

  return loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading Map...</span>
      </Spinner>
    </div>
  ) : (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        border: "solid 1px #000000",
        borderRadius: "15px",
      }}
    >
      <div className="Geolocation">
        <Map
          defaultCenter={[center.lat, center.lng]}
          defaultZoom={zoom}
          center={[center.lat, center.lng]}
        >
          {!isMobile && <ZoomControl />}
          <Marker anchor={[userLocation.lat, userLocation.lng]}>
            <img
              src={logo}
              alt="logo"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "solid 2px green",
                backgroundColor: "#ffffff",
                padding: "5px",
              }}
            />
          </Marker>
        </Map>
      </div>
    </div>
  );
}

export default Geolocation;
