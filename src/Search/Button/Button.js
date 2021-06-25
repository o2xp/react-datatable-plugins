// @flow
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const Button = ({ click, color }: { click: void => void, color: string }) => {
  return (
    <IconButton className="o2xp-search-icon" onClick={click} color={color}>
      <SearchIcon />
    </IconButton>
  );
};

export default Button;
