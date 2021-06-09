// @flow

import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Switch from "@material-ui/core/Switch";
import HelpIcon from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import { useO2xpProvider } from "../O2xpContext/O2xpContext";
import "../style.css";
import { simpleSearch, transformString, managePrioritiesQueries } from "./searchTools";
import type { Columns } from "./Types/Columns";
import Datatable from "@o2xp/react-datatable";

const Search = () => {
  const {
    state: { data, columns = { data: { columns: {} } } },
    dispatch
  } = useO2xpProvider();

  const [open, setOpen] = useState(true);
  const [filterBy, setFilterBy] = useState("");
  const [queryMode, setQueryMode] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [colorChange, setColorChange] = useState("primary");
  const [placeholderQueryMode, setPlaceholderQueryMode] = useState("Column = Value");

  useEffect(() => {
    const newPlaceholderQueryMode: string = queryMode
      ? "Column = Value"
      : "Simple search";
    setPlaceholderQueryMode(newPlaceholderQueryMode);
  }, [queryMode]);

  useEffect(() => {
    const newColorChange: string = filterBy.length === 0 ? "primary" : "secondary";
    setColorChange(newColorChange);
  }, [filterBy]);

  const handleChange = e => {
    const { value }: { value: string } = e.target;
    const { baseRowsData }: { rowsData: Object[], baseRowsData: Object[] } = data;
    const clBaseRowsData: Object[] = cloneDeep(baseRowsData);
    const columnsInArray: {} = columns.data.columns;
    let newRowsData: Object[] = clBaseRowsData;
    let newHasError: boolean = false;

    if (!queryMode) {
      const cols = Object.values(columnsInArray);
      newRowsData = simpleSearch({ columns: cols, value, rows: baseRowsData });
    } else if (queryMode) {
      const tranformedValue: string = transformString(value);
      const reg: RegExp = /([A-Za-z0-9]+(!==|!=|<=|>=|=|<|>)[A-Za-z0-9]+(?:&&|\|\|)?)$/;

      if (!reg.test(tranformedValue) && value !== "") {
        newHasError = true;
      } else {
        newRowsData = managePrioritiesQueries({
          queriesArray: value,
          rows: baseRowsData
        });
      }
    }

    setHasError(newHasError);

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

  const handleClickQueryMode = () => {
    setQueryMode(!queryMode);
  };

  const openChangeClassName = (show, close) => {
    return open ? show : close;
  };

  const createTextField = params => {
    return (
      <TextField
        {...params}
        id="search"
        color={colorChange}
        onChange={handleChange}
        value={filterBy}
        type="text"
        placeholder={placeholderQueryMode}
        className={openChangeClassName("o2xp-open-state", "o2xp-close-state")}
        error={hasError}
        helperText={
          hasError &&
          queryMode &&
          "Syntax Error : Check query mode documentation for more informations"
        }
      />
    );
  };

  return (
    <div id="o2xp-search-wrap">
      <div>
        <div className="o2xp-autocomplete">
          {columns.data && queryMode ? (
            <Autocomplete
              id="search"
              className={openChangeClassName("o2xp-open-state", "o2xp-close-state")}
              freeSolo
              options={Object.values(columns.data.columns).map(option => option.id)}
              renderInput={params => createTextField(params)}
            />
          ) : (
            createTextField()
          )}
        </div>
        <div className="o2xp-search-mode">
          <FormControlLabel
            className={openChangeClassName(
              "o2xp-search-mode-show",
              "o2xp-search-mode-hidden"
            )}
            control={<Switch color={colorChange} onClick={handleClickQueryMode} />}
            label="Query mode"
          />
          <Tooltip title={<a href="">What's query mode ?</a>} interactive arrow>
            <HelpIcon
              className={openChangeClassName(
                "o2xp-search-mode-show",
                "o2xp-search-mode-hidden"
              )}
            />
          </Tooltip>
        </div>
      </div>
      <IconButton className="o2xp-search-icon" onClick={handleClick} color={colorChange}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default Search;