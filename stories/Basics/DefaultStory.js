// @flow
import React from "react";
import Datatable from "@o2xp/react-datatable";
import Pagination from "../../src/Pagination";
import Search from "../../src/Search";
import Print from "../../src/Print";
import DisplayColumns from "../../src/DisplayColumns";
import { O2xpProvider } from "../../src/O2xpContext/O2xpContext";
import { columnsData, rows } from "../../static/data";

const DefaultStory = (): React$Element<*> => {
  const [rowsData, setRowsData] = React.useState(rows);
  const [columns, setColumns] = React.useState(columnsData);

  const handleOnRowsDataChange = ({ rowsData: newRowsdata }) => {
    setRowsData(newRowsdata);
  };

  const handleOnColumnsChange = ({ data: newColumns }) => {
    setColumns(newColumns);
  };
  return (
    <>
      <O2xpProvider
        rowsData={rowsData}
        setRowsData={handleOnRowsDataChange}
        columns={columns}
        setColumns={handleOnColumnsChange}
      >
        <Datatable rowsData={rowsData} columnsData={columns} />
        <Pagination />
        <Search />
        <Print />
        <DisplayColumns />
      </O2xpProvider>
    </>
  );
};

export default DefaultStory;
