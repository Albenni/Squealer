import "../../css/Geolocation.css";

import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { useMediaQuery } from "react-responsive";

import logo from "../../assets/SLogo.svg";

function Geolocation(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.setSquealLocation === undefined) {
      // Se non è presente la funzione per settare la posizione del post, allora è un post già esistente
      // e quindi non devo cercare la posizione dell'utente
      // Setto la posizione del post
      const postLocation = props.squeallocation.split(",");

      postLocation[0] = parseFloat(postLocation[0]);
      postLocation[1] = parseFloat(postLocation[1]);

      setUserLocation({
        lat: postLocation[0],
        lng: postLocation[1],
      });
      setCenter({
        lat: postLocation[0],
        lng: postLocation[1],
      });
    } else {
      // Trovo la posizione dell'utente
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            props.setSquealLocation(
              position.coords.latitude + "," + position.coords.longitude
            );
            console.log(
              "Posizione per il post: " + position.coords.latitude,
              position.coords.longitude
            );

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

    return () => {
      setLoadError(false);
      setLoading(true);
      if (props.setSquealLocation !== undefined) props.setSquealLocation(null);
    };
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
          zoom={zoom}
          center={[center.lat, center.lng]}
          onBoundsChanged={({ center, zoom }) => {
            setCenter(center);
            setZoom(zoom);
          }}
        >
          {!isMobile && <ZoomControl />}
          <Marker anchor={[userLocation.lat, userLocation.lng]}>
            <img
              src={logo}
              alt="Posizione attuale"
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
