// @flow
import React, { useState } from "react";
import Button from "./Button";
import Export from "./Export";

const Download = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpen = () => {
    setShowDialog(true);
  };

  return (
    <div>
      <Button open={handleOpen} />
      <Export showDialog={showDialog} setShowDialog={setShowDialog} />
    </div>
  );
};

export default Download;
