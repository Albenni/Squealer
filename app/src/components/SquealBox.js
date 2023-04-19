import "./SquealBox.css";

import { Avatar, Button } from "@mui/material";
import { closeIcon } from "../config/IconsPath";
import Icons from "../components/Icons";

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
          <Button id="clearButton" /* onClick={clearInput} */>
            <Icons iconsColor={"#000"}
            iconsSize={"1.5rem"}
            iconsName={closeIcon}
            />
          </Button>
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
