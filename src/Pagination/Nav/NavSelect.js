// @flow
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

type Props = {
  nRows: number,
  handleChangeCurrentPage: (SyntheticInputEvent<*>) => void,
  handleChangeNRows: (SyntheticInputEvent<*>) => void,
  currentPage: number,
  pagesArray: number[]
};

const nRowsArray = [2, 10, 25, 50, 100];

const NavSelect = ({
  nRows,
  handleChangeCurrentPage,
  handleChangeNRows,
  currentPage,
  pagesArray
}: Props) => {
  return (
    <>
      <FormControl>
        <InputLabel id="o2xp-simple-select-label">Rows</InputLabel>
        <Select
          labelId="o2xp-simple-select-label"
          id="o2xp-simple-select"
          value={nRows}
          onChange={handleChangeNRows}
        >
          <MenuItem value={-1} key="All">
            All
          </MenuItem>
          {nRowsArray.map(value => (
            <MenuItem value={value} key={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="o2xp-simple-select-label">Page</InputLabel>
        <Select
          labelId="o2xp-simple-select-label"
          id="o2xp-simple-select"
          value={currentPage}
          onChange={handleChangeCurrentPage}
        >
          {pagesArray.map((page: number) => (
            <MenuItem value={page} key={page}>
              {page}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default NavSelect;
