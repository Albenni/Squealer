import React from "react";
import Icon from "@mui/material/Icon";

function Icons({ iconsName, iconsColor, iconsSize }) {
  return (
    <Icon sx={{ color: iconsColor, fontSize: iconsSize }}>{iconsName}</Icon>
  );
}

export default Icons;
