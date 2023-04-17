import React from "react";
import { SvgIcon } from "@mui/material";

function Icons({ iconsName, iconsColor, iconsSize }) {
  return (
    <SvgIcon color={iconsColor} fontSize={iconsSize}>
      <path d={iconsName} viewBox="0 0 24 24" />
    </SvgIcon>
  );
}

export default Icons;
