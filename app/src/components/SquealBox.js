import "./SquealBox.css";

import { Avatar, Button } from "@mui/material";

function SquealBox() {
  /*  const clearInput = () => {
    //oggettocontenenteinput([]);
  }; */

  return (
    <div className="squealBox">
      <form>
        <div className="squealBoxInput">
          <Avatar />
          <input placeholder="Cosa vuoi postare?" type="text" />
        </div>
        <input
          className="squealBoxInputImage"
          placeholder="Opzionale: Inserisci l'URL"
          type="text"
        />
        <Button className="squealButton" variant="contained">
          Squeal
        </Button>
      </form>
    </div>
  );
}

export default SquealBox;
