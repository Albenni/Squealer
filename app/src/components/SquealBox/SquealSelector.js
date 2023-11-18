import "../../css/SquealSelector.css";

import { useMediaQuery } from "react-responsive";

import { Arrow90degLeft } from "react-bootstrap-icons";

function SquealSelector({ contentType, setContentType }) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const nameRender = {
    text: "Testo",
    image: "Immagine",
    video: "Video",
    geolocalization: "Geolocazione",
  };

  const handleButtonClick = (button) => {
    setContentType(button);
  };

  const handleGoBack = () => {
    setContentType("");
  };

  return (
    <div
      className={
        isMobile
          ? "squeal-selector-container mt-4"
          : "squeal-selector-container"
      }
    >
      {contentType ? (
        <div className="selected-button-container">
          <button className={`selected-button selected-button-${contentType}`}>
            {nameRender[contentType]}
          </button>
          <button className="go-back-button" onClick={handleGoBack}>
            <Arrow90degLeft size={24} />
          </button>
        </div>
      ) : (
        <div className="choice-button-container">
          <button
            className="choice-button"
            onClick={() => handleButtonClick("text")}
          >
            Testo
          </button>
          <button
            className="choice-button"
            onClick={() => handleButtonClick("image")}
          >
            Immagine
          </button>
          <button
            className="choice-button"
            onClick={() => handleButtonClick("video")}
          >
            Video
          </button>
          <button
            className="choice-button"
            onClick={() => handleButtonClick("geolocalization")}
          >
            Geolocazione
          </button>
        </div>
      )}
    </div>
  );
}

export default SquealSelector;
