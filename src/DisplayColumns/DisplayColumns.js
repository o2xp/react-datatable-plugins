// @flow

import React, { useState, useEffect } from "react";
import useO2xpProvider from "../hooks/useO2xpProvider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import IconButton from "@material-ui/core/IconButton";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import Menu from "@material-ui/core/Menu";
import MenuItem from "./MenuItem";
import Button from "@material-ui/core/Button";
import "../style.css";
import { FormControlLabel } from "@material-ui/core";

const DisplayColumns = () => {
  const {
    state: { data, columns },
    dispatch
  } = useO2xpProvider();

  const [anchorEl, setAnchorEl] = useState(null);
  const [allColumns, setAllColumns] = useState([]);

  useEffect(() => {
    if (columns.data.columns) {
      const newAllColumns = Object.keys(columns.data.columns).map(
        key => columns.data.columns[key]
      );
      setAllColumns(newAllColumns);
    }
  }, [columns.data.columns]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setColumnVisibility = column => {
    const index = allColumns.indexOf(column);
    let newColumnsOrder = columns.data.columnsOrder;
    if (columns.data.columnsOrder.includes(column)) {
      newColumnsOrder = columns.data.columnsOrder.filter(col => col !== column);
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
      <IconButton onClick={handleClick}>
        <ViewWeekIcon />
      </IconButton>
      <Menu
        id="o2xp-customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="o2xp-displayMenu"
      >
        {allColumns.map(column => (
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

export default DisplayColumns;
