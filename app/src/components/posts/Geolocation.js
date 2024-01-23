import "../../css/Geolocation.css";

import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { GeoJson, GeoJsonLoader, Map, Marker, ZoomControl } from "pigeon-maps";
import { useMediaQuery } from "react-responsive";

import logo from "../../assets/SLogo.svg";
import starttemp from "../../assets/starttemp.png";
import endtemp from "../../assets/endtemp.png";

function Geolocation(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  const [tempLocations, setTempLocations] = useState([]); // [lat,lng/lat,lng/...]
  const [geojsonroutes, setGeojsonroutes] = useState({
    type: "FeatureCollection",
    features: [],
  });

  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.temporized) {
      const locations = props.squeallocation.split("/");
      locations.forEach((location, index) => {
        const latlng = location.split(",");
        locations[index] = {
          lat: parseFloat(latlng[0]),
          lng: parseFloat(latlng[1]),
        };
      });

      // Set the center to the average of all the locations
      let lat = 0;
      let lng = 0;
      locations.forEach((location) => {
        lat += location.lat;
        lng += location.lng;
      });
      lat /= locations.length;
      lng /= locations.length;

      setCenter({
        lat: lat,
        lng: lng,
      });

      setZoom(6);

      setTempLocations(locations);

      if (locations.length > 1) {
        locations.forEach((location, index) => {
          if (index === locations.length - 1) return;
          // Fetch the osrm server to get the routes between the locations
          const url =
            "https://router.project-osrm.org/route/v1/driving/" +
            locations[index].lng +
            "," +
            locations[index].lat +
            ";" +
            locations[index + 1].lng +
            "," +
            locations[index + 1].lat +
            "?overview=full&geometries=geojson&steps=true";

          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setGeojsonroutes((prev) => {
                const newGeojsonroutes = { ...prev };
                newGeojsonroutes.features.push({
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      properties: {},
                      geometry: data.routes[0].geometry,
                    },
                  ],
                });
                return newGeojsonroutes;
              });
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      }
    } else if (props.setSquealLocation === undefined) {
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
        console.error("Geolocation is not supported by this browser!");
      }
    }

    setLoading(false);

    return () => {
      setLoadError(false);
      setLoading(true);
      if (props.setSquealLocation !== undefined) props.setSquealLocation(null);
    };
  }, []);

  if (loadError)
    return (
      <div className="text-center py-4" tabIndex={0}>
        {" "}
        Modifica i permessi per accedere a questa funzionalità
      </div>
    );

  return loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden" tabIndex={0}>
          Caricamento mappa...
        </span>
      </Spinner>
    </div>
  ) : props.temporized ? (
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

          {tempLocations.length > 1 &&
            geojsonroutes.features.map((route, index) => (
              <GeoJson
                key={index}
                data={route}
                styleCallback={(feature, hover) => {
                  if (feature.geometry.type === "LineString") {
                    return { strokeWidth: "2", stroke: "black" };
                  }
                  return {
                    fill: "#d4e6ec99",
                    strokeWidth: "1",
                    stroke: "white",
                    r: "20",
                  };
                }}
              />
            ))}

          {tempLocations.map((location, index) => (
            <Marker key={index} anchor={[location.lat, location.lng]}>
              <img
                src={
                  index === 0
                    ? starttemp
                    : index === tempLocations.length - 1
                    ? endtemp
                    : logo
                }
                alt="Tragitto itinerario attuale"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border:
                    "solid 2px " +
                    (index === 0
                      ? "green"
                      : index === tempLocations.length - 1
                      ? "red"
                      : "grey"),
                  backgroundColor: "#ffffff",
                  padding: "5px",
                }}
              />
            </Marker>
          ))}
        </Map>
      </div>
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
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                border: "solid 2px green",
                backgroundColor: "#ffffff",
                padding: "5px",
              }}
              tabIndex={0}
            />
          </Marker>
        </Map>
      </div>
    </div>
  );
}

export default Geolocation;
