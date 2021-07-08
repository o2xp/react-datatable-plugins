// @flow
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";

const Button = ({ open }: { open: (SyntheticEvent<HTMLButtonElement>) => void }) => {
  return (
    <IconButton onClick={open}>
      <ViewWeekIcon />
    </IconButton>
  );
};

export default Button;
