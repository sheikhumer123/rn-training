import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../initFirebase";

const MainContext = React.createContext();
export const MainProvider = ({ children }) => {
  const [appload, setappload] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const auth = getAuth();
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
      setappload(false);
    });
    return () => unsubscriber();
  }, []);

  return (
    <MainContext.Provider value={{ currentUser, setCurrentUser, appload }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
