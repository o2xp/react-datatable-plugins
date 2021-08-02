// @flow
import React, { useState, useEffect } from "react";
import NavSelect from "./Nav/NavSelect";
import NavButton from "./Nav/NavButton";
import useO2xpProvider from "../hooks/useO2xpProvider";
import "../style.css";

const Pagination = () => {
  const {
    state: { data },
    dispatch
  } = useO2xpProvider();

  const [nRows, setNRows] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);

  const dispatchNewData = (newData: Object[]) => {
    const action = {
      type: "SET_DATA",
      payload: { rowsData: newData }
    };
    dispatch(action);
  };

  useEffect(() => {
    if (data.baseRowsData) {
      let newData: Object[];
      if (nRows < 0) {
        newData = data.baseRowsData;
      } else {
        newData = data.baseRowsData.slice((currentPage - 1) * nRows, currentPage * nRows);
      }
      dispatchNewData(newData);
    }
  }, [nRows, currentPage]);

  useEffect(() => {
    const tempArray = [];
    if (totalPage < 0) {
      tempArray.push(1);
    } else {
      for (let i = 1; i <= totalPage; i += 1) {
        tempArray.push(i);
      }
    }
    setPagesArray(tempArray);
  }, [nRows]);

  const handleChangeNRows = (e: SyntheticInputEvent<*>) => {
    const { value } = e.target;
    setTotalPage(Math.ceil(data.baseRowsData.length / parseInt(value, 10)));
    setNRows(parseInt(value, 10));
    setCurrentPage(1);
  };

  const handleChangeCurrentPage = (e: SyntheticInputEvent<*>) => {
    const { value } = e.target;
    setCurrentPage(parseInt(value, 10));
  };

  return (
    <div>
      <NavSelect
        nRows={nRows}
        handleChangeCurrentPage={handleChangeCurrentPage}
        handleChangeNRows={handleChangeNRows}
        currentPage={currentPage}
        pagesArray={pagesArray}
      />
      <NavButton
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPage={totalPage}
      />
    </div>
  );
};
export default Pagination;
