import React from "react";
import Icon from "@mui/material/Icon";
import '@fortawesome/fontawesome-free/css/all.css';
function Icons({ iconsName, iconsColor, iconsSize }) {
  return (
    <Icon baseClassName="fas" className={iconsName} sx={{ color: iconsColor, fontSize: iconsSize }}/>
  );
}

export default Icons;
