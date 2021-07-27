// @flow
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const Button = ({ open }: { open: boolean => void }) => {
  return (
    <IconButton aria-label="print" onClick={open}>
      <CloudDownloadIcon />
    </IconButton>
  );
};

export default Button;
