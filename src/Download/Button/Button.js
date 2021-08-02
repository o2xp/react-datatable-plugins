// @flow
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Tooltip from "@material-ui/core/Tooltip";

const Button = ({ open }: { open: boolean => void }) => {
  return (
    <Tooltip title="Download">
      <IconButton onClick={open}>
        <CloudDownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Button;
