import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPosts = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <AppContext.Provider value={{ refreshPosts }}>
      {children}
    </AppContext.Provider>
  );
};
