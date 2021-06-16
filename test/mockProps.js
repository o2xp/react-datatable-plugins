import { columnsData, rows } from "../static/data";

const createProps = ({
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

export default createProps;
