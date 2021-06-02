import { columnsData, rows } from "../static/data";

const createStore = ({
  rowsData = rows,
  setRowsData,
  columns = columnsData,
  setColumns
}) => ({
  rowsData,
  setRowsData,
  columns,
  setColumns
});

export default createStore;
