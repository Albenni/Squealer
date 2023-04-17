import "./Channels.css";
import Button from "@mui/material/Button";

function Channels({ text }) {
  return (
    <div className="channels">
      <Button variant="text" color="primary">{text}</Button>
      
    </div>
  );
}

export default Channels;
