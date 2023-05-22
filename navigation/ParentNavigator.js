import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";
import MainContext from "../MainContext/MainContext";
import AppLoader from "../components/AppLoader";
import FirstTimeNavigator from "./FirstTimeNavigator";

export default function ParentNavigator() {
  const { currentUser, appLoad } = useContext(MainContext);

  return (
    <NavigationContainer>
      {appLoad ? (
        <AppLoader />
      ) : currentUser?.uid ? (
        currentUser?.username ? (
          <MainNavigator />
        ) : (
          <FirstTimeNavigator />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
