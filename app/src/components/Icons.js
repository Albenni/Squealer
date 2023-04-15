import React from "react";
import Icon from "@mui/material/Icon";

function Icons({ iconsName, iconsColor }) {
  return (
    <div className="icon">
      <Icon color={iconsColor}> {iconsName} </Icon>
    </div>
  );
}

export default Icons;
