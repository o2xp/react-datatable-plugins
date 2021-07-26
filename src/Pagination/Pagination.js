// @flow
import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useO2xpProvider from "../hooks/useO2xpProvider";
import "../style.css";

const Pagination = () => {
  const {
    state: { data, columns },
    dispatch
  } = useO2xpProvider();

  const [nRows, setNRows] = useState(1000);
  (nRows: number);
  const [currentPage, setCurrentPage] = useState(1);
  (currentPage: number);
  const [totalPage, setTotalPage] = useState(1);
  (totalPage: number);

  const dispatchNewData = (newData: Object[]) => {
    const action = {
      type: "SET_DATA",
      payload: { rowsData: newData }
    };
    dispatch(action);
  };

  useEffect(() => {
    if (data.baseRowsData) {
      dispatchNewData(
        data.baseRowsData.slice((currentPage - 1) * nRows, currentPage * nRows)
      );
    }
  }, [nRows, currentPage]);

  const handleChangeNRows = (e: SyntheticInputEvent<*>) => {
    setCurrentPage(1);

    const { value } = e.target;
    setNRows(parseInt(value, 10));
    setTotalPage(Math.ceil(data.baseRowsData.length / parseInt(value, 10)));
  };

  const handleChangeCurrentPage = (e: SyntheticInputEvent<*>) => {
    const { value } = e.target;
    setCurrentPage(parseInt(value, 10));
  };

  const fillPageSelector = () => {
    const pagesArray = [];
    for (let i = 1; i <= totalPage; i += 1) {
      pagesArray.push(i);
    }
    return pagesArray;
  };

  const handleNav = (value: string) => {
    setCurrentPage(value === "back" ? currentPage - 1 : currentPage + 1);
  };

  const EnableButton = () => {
    if (totalPage > 1) {
      switch (currentPage) {
        case 1:
          return (
            <div>
              <IconButton
                className="o2xp-nav-page"
                size="small"
                onClick={() => handleNav("back")}
                disabled
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                className="o2xp-nav-page"
                size="small"
                onClick={() => handleNav("forward")}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          );
        case totalPage:
          return (
            <div>
              <IconButton
                className="o2xp-nav-page"
                size="small"
                onClick={() => handleNav("back")}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                className="o2xp-nav-page"
                size="small"
                onClick={() => handleNav("forward")}
                disabled
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          );
        default:
          return (
            <div>
              <IconButton
                className="o2xp-nav-page"
                size="small"
                onClick={() => handleNav("back")}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                className="o2xp-nav-page"
                size="small"
                onClick={() => handleNav("forward")}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          );
      }
    }
    return (
      <div>
        <IconButton
          className="o2xp-nav-page"
          size="small"
          onClick={() => handleNav("back")}
          disabled
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          className="o2xp-nav-page"
          size="small"
          onClick={() => handleNav("forward")}
          disabled
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="o2xp-simple-select-label">Rows</InputLabel>
        <Select
          labelId="o2xp-simple-select-label"
          id="o2xp-simple-select"
          value={nRows}
          onChange={handleChangeNRows}
        >
          <MenuItem value={1000}>All</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
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
          {fillPageSelector().map(page => (
            <MenuItem value={page} key={page}>
              {page}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <EnableButton />
    </div>
  );
};
export default Pagination;
