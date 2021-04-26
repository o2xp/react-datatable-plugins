import React, { useEffect, useReducer, useContext, createContext } from "react";

const O2xpContext = createContext();

const defaultState = {
  data: {
    rowsData: [],
    baseRowsData: [],
    setRowsData: []
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
  state.data.setRowsData(payload);
  return {
    ...state,
    data: {
      ...state.data,
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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const O2xpProvider = ({ rowsData, setRowsData, children }) => {
  const [state, dispatch] = useReducer(o2xpReducer, defaultState);

  useEffect(() => {
    if (state.data.baseRowsData.length === 0) {
      dispatch({
        type: "INIT_DATA",
        payload: { rowsData, setRowsData }
      });
    }
  }, [rowsData]);

  const value = { state, dispatch, setRowsData };
  return <O2xpContext.Provider value={value}>{children}</O2xpContext.Provider>;
};

const useO2xpProvider = () => {
  const context = useContext(O2xpContext);
  if (context === undefined) {
    throw new Error("use O2xpProvider must be used within a O2xpProvider");
  }
  return context;
};

export { O2xpProvider, useO2xpProvider };
