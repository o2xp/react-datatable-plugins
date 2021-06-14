import React from "react";
import Datatable from "@o2xp/react-datatable";
import Search from "../../src/Search";
import { O2xpProvider } from "../../src/O2xpContext/O2xpContext";
import { columnsData, rows } from "../../static/data";

const DefaultStory = () => {
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
        <Search />
      </O2xpProvider>
    </>
  );
};

export default DefaultStory;
