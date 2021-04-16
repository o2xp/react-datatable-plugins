// @flow
import React, {useState} from "react";
import { useO2xpProvider } from "../O2xpContext/O2xpContext";

const Search = () => {
  const {
    state: { data },
    dispatch
  } = useO2xpProvider();

  const [filterBy, setFilterBy] = useState("");

  const handleChange = e => {
    const { value } = e.target;
    const { baseRowsData } = data;
    const newRowsData = baseRowsData.filter(el => el.name.startsWith(value));

    const action = {
      type: "SET_DATA",
      payload: { rowsData: newRowsData }
    };
    dispatch(action);
    setFilterBy(value);
  };

  return <input onChange={handleChange} value={filterBy} />;
};

export default Search;
