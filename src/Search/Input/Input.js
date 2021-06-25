// @flow
import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Switch from "@material-ui/core/Switch";
import HelpIcon from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import useO2xpProvider from "../../hooks/useO2xpProvider";
import { simpleSearch, transformString, managePrioritiesQueries } from "./tools";
import "../../style.css";

type Props = {
  open: boolean,
  color: string,
  setColor: string => void
};

const Input = ({ open, color, setColor }: Props) => {
  const {
    state: { data, columns },
    dispatch
  } = useO2xpProvider();

  const [filterBy, setFilterBy] = useState("");
  const [queryMode, setQueryMode] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [placeholderQueryMode, setPlaceholderQueryMode] = useState("Column = Value");

  useEffect(() => {
    const newPlaceholderQueryMode: string = queryMode
      ? "Column = Value"
      : "Simple search";
    setPlaceholderQueryMode(newPlaceholderQueryMode);
  }, [queryMode]);

  useEffect(() => {
    const newColor: string = filterBy.length === 0 ? "primary" : "secondary";
    setColor(newColor);
  }, [filterBy]);

  const handleChange = (e: SyntheticInputEvent<*>) => {
    const { value } = e.target;
    const { baseRowsData }: { baseRowsData: Object[] } = data;
    const columnsInArray: Object = columns.data.columns;
    let newRowsData: Object[] = cloneDeep(baseRowsData);
    let newHasError: boolean = false;

    if (!queryMode) {
      const cols = Object.values(columnsInArray);
      newRowsData = simpleSearch({ columns: cols, value, rows: newRowsData });
    } else {
      const tranformedValue: string = transformString(value);
      const reg: RegExp = /([A-Za-z0-9]+(!==|!=|<=|>=|=|<|>)[A-Za-z0-9]+((?:&&|\|\|)|(?!\s*$).+$)?)/;

      if (!reg.test(tranformedValue)) {
        newHasError = true;
      } else {
        newRowsData = managePrioritiesQueries({
          queryString: value,
          rows: newRowsData
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

  const handleClickQueryMode = () => {
    setQueryMode(!queryMode);
  };

  const openChangeClassName = (show, close) => {
    return open ? show : close;
  };

  const createTextField = params => {
    const textFieldClass = openChangeClassName("o2xp-open-state", "o2xp-close-state");
    const textFieldError =
      hasError &&
      queryMode &&
      "Syntax Error : Check query mode documentation for more informations";

    return (
      <TextField
        {...params}
        id="o2xp-search-bar"
        color={color}
        onChange={handleChange}
        value={filterBy}
        type="text"
        placeholder={placeholderQueryMode}
        className={textFieldClass}
        error={hasError}
        helperText={textFieldError}
      />
    );
  };

  return (
    <div className="o2xp-search-bar-switch">
      <div className="o2xp-wrapper-input">
        {columns.data && queryMode ? (
          <Autocomplete
            id="o2xp-autocomplete"
            className={openChangeClassName("o2xp-open-state", "o2xp-close-state")}
            freeSolo
            options={Object.values(columns.data.columns).map(
              (option: Object) => (option.id: string)
            )}
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
          control={
            <Switch
              className="o2xp-query-selector"
              color={color}
              onClick={handleClickQueryMode}
            />
          }
          label="Query mode"
        />
        <Tooltip title={<a href="./">What`s query mode ?</a>} interactive arrow>
          <HelpIcon
            className={openChangeClassName(
              "o2xp-search-mode-show",
              "o2xp-search-mode-hidden"
            )}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Input;
