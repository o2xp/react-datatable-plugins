// @flow

import React from "react";
import MenuItemMUI from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

type Props = {
  column: Object,
  columnsOrder: string[],
  handleClick: string => void
};

const MenuItem = ({ column, columnsOrder, handleClick }: Props) => {
  const displayed = columnsOrder.includes(column.id);
  return (
    <MenuItemMUI onClick={() => handleClick(column.id)}>
      <Checkbox checked={displayed} color="secondary" />
      {column.label}
    </MenuItemMUI>
  );
};

export default MenuItem;
