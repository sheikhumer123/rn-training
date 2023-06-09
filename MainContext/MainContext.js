import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../initFirebase";
import { getUserDB } from "../database";

const MainContext = React.createContext();
export const MainProvider = ({ children }) => {
  const [appLoad, setAppLoad] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const auth = getAuth();
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let data = (await getUserDB(user.uid)) || {};
        const { email, uid } = user;
        setCurrentUser({ email, uid, ...data });
      }
      setAppLoad(false);
    });
    return () => unsubscriber();
  }, []);

  return (
    <MainContext.Provider value={{ currentUser, setCurrentUser, appLoad }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
