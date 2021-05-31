import React, { useState, useEffect } from "react";
import MenuItemMUI from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

const MenuItem = ({ column, columnsOrder, handleClick }) => {
  const displayed = columnsOrder.includes(column.id);
  return (
    <MenuItemMUI onClick={() => handleClick(column.id)}>
      <Checkbox checked={displayed} color="secondary" />
      {column.label}
    </MenuItemMUI>
  );
};

export default MenuItem;
