// @flow
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import "../style.css";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("primary");

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="o2xp-search-wrapper">
      <Input open={open} color={color} setColor={setColor} />
      <Button click={handleClickOpen} color={color} />
    </div>
  );
};

export default Search;
