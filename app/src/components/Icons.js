import React from "react";
import Icon from "@mui/material/Icon";
import "@fortawesome/fontawesome-free/css/all.css";
import { SvgIcon } from "@mui/material";

function Icons({ iconsName, iconsColor, iconsSize }) {
  return (
    // <Icon baseClassName="fas" className={iconsName} sx={{ color: iconsColor, fontSize: iconsSize }}/>

    <SvgIcon color={iconsColor} fontSize={iconsSize}>
      <path d={iconsName} viewBox="0 0 24 24" />
    </SvgIcon>
  );
}

export default Icons;
