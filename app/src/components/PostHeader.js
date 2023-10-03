import "../css/PostHeader.css";
import theme from "../config/theme";
import { Avatar } from "@mui/material";
import { PatchCheckFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

function PostHeader({ item }) {
  function handleUserClick() {
    console.log("Da fare redirect alla pagina con i post utente");
  }

  return (
    <div className="row">
      <div className="d-flex">
        <div className="m-1">
          <Avatar src={item.propic} />
        </div>
        <div className="p-1 usernametext" onClick={handleUserClick}>
          {item.name}
        </div>

        {item.verified && (
          <div className="p-1">
            <PatchCheckFill color={theme.colors.lightblue} />
          </div>
        )}

        <div
          className="p-1"
          style={{
            color: theme.colors.lightgrey,
          }}
        >
          @{item.username}
        </div>
      </div>
    </div>
  );
}

export default PostHeader;
