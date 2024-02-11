// DataContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context
const DataContext = createContext();

// Create a custom hook to consume the context
export const useDataContext = () => useContext(DataContext);

// Create a provider component to wrap the entire application
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
