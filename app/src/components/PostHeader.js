import theme from "../config/theme";
import { Avatar } from "@mui/material";
import { PatchCheckFill } from "react-bootstrap-icons";

function PostHeader({ item }) {
  return (
    <div className="row" style={{ pointerEvents: "none" }}>
      <div className="d-flex">
        <div className="m-1">
          <Avatar src={item.propic} />
        </div>
        <div className="p-1">{item.name}</div>

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
