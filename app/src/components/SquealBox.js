import "./SquealBox.css";

import { Avatar, Button } from "@mui/material";

import { useState } from "react";

function SquealBox() {
  const [squealtext, setSquealText] = useState("");
  const [squealimage, setSquealImage] = useState("");

  const handleSqueal = (event) => {
    event.preventDefault();

    console.log(squealtext);
    console.log(squealimage);

    //post request to send squeal to db
  };

  return (
    <div className="squealBox">
      <form className="">
        <div className="squealBoxInput">
          <Avatar />
          <input
            className="squealinput"
            placeholder="Cosa vuoi postare?"
            type="text"
            onChange={(e) => setSquealText(e.target.value)}
          />
        </div>
        <input
          className="squealBoxInputImage"
          placeholder="Opzionale: Inserisci l'URL"
          type="text"
          onChange={(e) => setSquealImage(e.target.value)}
        />
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
