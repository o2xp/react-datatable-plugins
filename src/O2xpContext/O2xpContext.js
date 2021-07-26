import React, { useEffect, useReducer, createContext } from "react";

const O2xpContext = createContext();

const defaultState = {
  data: {
    rowsData: [],
    baseRowsData: [],
    setRowsData: null
  },
  columns: {
    data: { columns: null, columnsOder: [] },
    baseData: null,
    setColumns: null
  }
};

const initData = ({ state, payload }) => {
  const { rowsData, setRowsData } = payload;
  return {
    ...state,
    data: {
      ...state.data,
      rowsData,
      setRowsData,
      baseRowsData: rowsData
    }
  };
};

const setData = ({ state, payload }) => {
  if (state.data.setRowsData) {
    state.data.setRowsData(payload);
  }
  return {
    ...state,
    data: {
      ...state.data,
      ...payload
    }
  };
};

const initColumns = ({ state, payload }) => {
  const { columns, setColumns } = payload;
  return {
    ...state,
    columns: {
      ...state.columns,
      data: columns,
      baseData: columns,
      setColumns
    }
  };
};

const setColumns = ({ state, payload }) => {
  state.columns.setColumns(payload);
  return {
    ...state,
    columns: {
      ...state.columns,
      ...payload
    }
  };
};

const o2xpReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_DATA": {
      return setData({ state, payload });
    }
    case "INIT_DATA": {
      return initData({ state, payload });
    }
    case "SET_COLUMNS": {
      return setColumns({ state, payload });
    }
    case "INIT_COLUMNS": {
      return initColumns({ state, payload });
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const O2xpProvider = ({ rowsData, setRowsData, columns, setColumns, children }) => {
  const [state, dispatch] = useReducer(o2xpReducer, defaultState);

  useEffect(() => {
    if (state.data.baseRowsData.length === 0) {
      dispatch({
        type: "INIT_DATA",
        payload: { rowsData, setRowsData }
      });
    }
  }, [rowsData, setRowsData]);

  useEffect(() => {
    if (state.columns.data.columns == null) {
      dispatch({
        type: "INIT_COLUMNS",
        payload: { columns, setColumns }
      });
    }
  }, [columns, setColumns]);

  const value = { state, dispatch, setRowsData };
  return <O2xpContext.Provider value={value}>{children}</O2xpContext.Provider>;
};

export { O2xpProvider, O2xpContext };
