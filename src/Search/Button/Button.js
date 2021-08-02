// @flow
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";

const Button = ({ click, color }: { click: void => void, color: string }) => {
  return (
    <Tooltip title="Search">
      <IconButton className="o2xp-search-icon" onClick={click} color={color}>
        <SearchIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Button;
