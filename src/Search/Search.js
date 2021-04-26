// @flow
import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { useO2xpProvider } from "../O2xpContext/O2xpContext";
import "../Style/Style.css";
import { operatorChoice, transformString } from "./searchTools";

const Search = () => {
  const {
    state: { data },
    dispatch
  } = useO2xpProvider();

  const [open, setOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("");

  const handleChange = e => {
    const { baseRowsData } = data;
    const { value } = e.target;

    const valueSplitted = value.split(/\s*(!==|!=|<=|>=|=|<|>)\s*/);

    let newRowsData = cloneDeep(baseRowsData).filter(({ name }) =>
      transformString(name).includes(transformString(value))
    );

    if (valueSplitted.length <= 3) {
      if (valueSplitted[1] && valueSplitted[2]) {
        newRowsData = cloneDeep(baseRowsData).filter(el => {
          return operatorChoice(valueSplitted[1], el, valueSplitted);
        });
      }
    } else {
      return false;
    }

    const action = {
      type: "SET_DATA",
      payload: { rowsData: newRowsData }
    };
    dispatch(action);
    setFilterBy(value);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div id="wrap">
      <TextField
        id="search"
        color={filterBy.length === 0 ? "primary" : "secondary"}
        onChange={handleChange}
        value={filterBy}
        type="text"
        placeholder="Search"
        className={open ? "open" : "close"}
      />
      <IconButton
        onClick={handleClick}
        color={filterBy.length === 0 ? "primary" : "secondary"}
      >
        <SearchIcon className="search-icon" />
      </IconButton>
    </div>
  );
};

export default Search;
