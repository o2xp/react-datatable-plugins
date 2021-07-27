// @flow
import React, { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import useO2xpProvider from "../../hooks/useO2xpProvider";
import MenuItem from "./MenuItem";

type Props = {
  anchor: HTMLElement | null,
  setAnchor: (HTMLElement | null) => void
};

const Displaying = ({ anchor, setAnchor }: Props) => {
  const {
    state: { data, columns },
    dispatch
  } = useO2xpProvider();

  const [allColumns, setAllColumns] = useState([]);

  useEffect(() => {
    if (columns.data.columns) {
      const newAllColumns: Object[] = Object.keys(columns.data.columns).map(
        key => columns.data.columns[key]
      );
      setAllColumns(newAllColumns);
    }
  }, [columns.data.columns]);

  const handleClose = () => {
    setAnchor(null);
  };

  const setColumnVisibility = (column: string) => {
    const index = allColumns.indexOf(column);
    let newColumnsOrder: string[] = columns.data.columnsOrder;
    if (newColumnsOrder.includes(column)) {
      newColumnsOrder = newColumnsOrder.filter((col: string) => col !== column);
    } else {
      newColumnsOrder.splice(index, 0, column);
    }

    const action = {
      type: "SET_COLUMNS",
      payload: {
        data: {
          ...columns.data,
          columnsOrder: newColumnsOrder
        }
      }
    };
    dispatch(action);
  };

  return (
    <div>
      <Menu
        id="o2xp-customized-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
        className="o2xp-displayMenu"
      >
        {allColumns.map((column: Object) => (
          <MenuItem
            className={`o2xp-menu-item-${column.id}`}
            key={column.id}
            column={column}
            columnsOrder={columns.data.columnsOrder}
            handleClick={setColumnVisibility}
          />
        ))}
      </Menu>
    </div>
  );
};

export default Displaying;
