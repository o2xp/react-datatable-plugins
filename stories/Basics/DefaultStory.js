// @flow
import React from "react";
import Datatable from "@o2xp/react-datatable";
import Pagination from "../../src/Pagination";
import Print from "../../src/Print";
import DisplayColumns from "../../src/DisplayColumns";
import Download from "../../src/Download";
import Search from "../../src/Search";
import { O2xpProvider } from "../../src/O2xpContext/O2xpContext";
import { columnsData, rows } from "../../static/data";
import "../../src/style.css";

const DefaultStory = (): React$Element<*> => {
  const [rowsData, setRowsData] = React.useState(rows);
  const [columns, setColumns] = React.useState(columnsData);

  const handleOnRowsDataChange = ({ rowsData: newRowsdata }) => {
    console.log(newRowsdata);

    setRowsData(newRowsdata);
  };

  const handleOnColumnsChange = ({ data: newColumns }) => {
    setColumns(newColumns);
  };

  return (
    <div className="bigboi">
      <O2xpProvider
        rowsData={rowsData}
        setRowsData={handleOnRowsDataChange}
        columns={columns}
        setColumns={handleOnColumnsChange}
      >
        <Datatable rowsData={rowsData} columnsData={columns} />
        <div className="o2xp-header">
          <Search />
          <Print />
          <DisplayColumns />
          <Download />
        </div>
        <Pagination />
      </O2xpProvider>
    </div>
  );
};

export default DefaultStory;
