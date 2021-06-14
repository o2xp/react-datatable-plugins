// @flow
import { useContext } from "react";
import { O2xpContext } from "../O2xpContext";

const useO2xpProvider = () => {
  const context = useContext(O2xpContext);
  if (context === undefined) {
    throw new Error("use O2xpProvider must be used within a O2xpProvider");
  }
  return context;
};

export default useO2xpProvider;
