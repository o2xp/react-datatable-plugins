// @flow

import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";
import Tooltip from "@material-ui/core/Tooltip";

const Button = ({ open }: { open: boolean => void }) => {
  return (
    <Tooltip title="Print">
      <IconButton onClick={open}>
        <PrintIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Button;
