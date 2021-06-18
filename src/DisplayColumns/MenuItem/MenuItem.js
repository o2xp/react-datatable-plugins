// @flow

import React from "react";
import MenuItemMUI from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

const MenuItem = ({
  column,
  columnsOrder,
  handleClick
}: {
  column: Object,
  columnsOrder: string[],
  handleClick: jenesaispas
}) => {
  const displayed = columnsOrder.includes((column.id: string));
  return (
    <MenuItemMUI onClick={() => handleClick((column.id: string))}>
      <Checkbox checked={displayed} color="secondary" />
      {(column.label: string)}
    </MenuItemMUI>
  );
};

export default MenuItem;
