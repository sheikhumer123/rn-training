import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";
import MainContext from "../MainContext/MainContext";
import AppLoader from "../components/AppLoader";

export default function ParentNavigator() {
  const { currentUser, appLoad } = useContext(MainContext);

  return (
    <NavigationContainer>
      {appLoad ? (
        <AppLoader></AppLoader>
      ) : currentUser?.uid ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
