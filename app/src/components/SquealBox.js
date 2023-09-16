import "../css/SquealBox.css";

import { Avatar, Button } from "@mui/material";

import { useState } from "react";

import { defaultchars, imagecharsize } from "../config/constants.js";

function SquealBox() {
  const [squealtext, setSquealText] = useState("");
  const [squealimage, setSquealImage] = useState("");
  const [currentchars, setCurrentChars] = useState(0);

  const handleSqueal = (event) => {
    event.preventDefault();

    console.log(squealtext);
    console.log(squealimage);

    //post request to send squeal to db and show on the feed
  };

  const handleImage = (event) => {
    event.preventDefault();

    if (squealtext.length + imagecharsize > defaultchars) {
      console.log("Too many characters");
      return;
    }
    setSquealImage(event.target.value);

    if (squealimage.length > 0) {
      setCurrentChars(squealtext.length + imagecharsize);
    } else {
      setCurrentChars(squealtext.length);
    }
  };

  const handleCharacterLimit = (event) => {
    event.preventDefault();

    if (currentchars > defaultchars) {
      event.target.value = event.target.value.substring(0, defaultchars);
    }

    setSquealText(event.target.value);

    if (squealimage.length > 0) {
      setCurrentChars(event.target.value.length + imagecharsize);
    } else {
      setCurrentChars(event.target.value.length);
    }
  };

  return (
    <div className="squealBox">
      <form className="squealForm">
        <div className="squealBoxInput">
          <Avatar />
          <input
            className="squealinput"
            placeholder="Scrivi qui il tuo Squeal"
            type="text"
            onChange={handleCharacterLimit}
          />
        </div>
        <input
          className="squealBoxInputImage"
          placeholder="Opzionale: Inserisci l'URL"
          type="text"
          onChange={handleImage}
        />

        <p className="squealCharacterLimit">
          {currentchars}/{defaultchars}
        </p>
        <Button
          className="squealButton"
          variant="contained"
          onClick={handleSqueal}
        >
          Squeal
        </Button>
      </form>
    </div>
  );
}

export default SquealBox;
