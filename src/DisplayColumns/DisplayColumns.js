// @flow
import React, { useState } from "react";
import Button from "./Button";
import Displaying from "./Displaying";

const DisplayColumns = () => {
  const [anchor, setAnchor] = useState(null);

  const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  return (
    <div>
      <Button open={handleClick} />
      <Displaying anchor={anchor} setAnchor={setAnchor} />
    </div>
  );
};

export default DisplayColumns;
