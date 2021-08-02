// @flow
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import Tooltip from "@material-ui/core/Tooltip";

const Button = ({ open }: { open: (SyntheticEvent<HTMLButtonElement>) => void }) => {
  return (
    <Tooltip title="Display Columns">
      <IconButton onClick={open}>
        <ViewWeekIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Button;
