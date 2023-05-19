import React from "react";

import MainNavigator from "./navigation/MainNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";

import "./initFirebase";

export default function App() {
  const is_auth_user = false;
  return (
    <NavigationContainer>
      {is_auth_user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
