// @flow

import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";

const Button = ({ open }: { open: boolean => void }) => {
  return (
    <IconButton aria-label="print" onClick={open}>
      <PrintIcon />
    </IconButton>
  );
};

export default Button;
