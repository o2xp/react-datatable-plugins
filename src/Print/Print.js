// @flow

import React, { useState } from "react";
import Button from "./Button";
import Printing from "./Printing";

const Print = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpen = () => {
    setShowDialog(true);
  };

  return (
    <div>
      <Button open={handleOpen} />
      <Printing showDialog={showDialog} setShowDialog={setShowDialog} />
    </div>
  );
};

export default Print;
