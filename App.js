import React from "react";

import { MainProvider } from "./MainContext/MainContext";
import ParentNavigator from "./navigation/ParentNavigator";

import EditProfileScreen from "./screens/EditProfileScreen";

export default function App() {
  return (
    <MainProvider>
      <ParentNavigator />
    </MainProvider>
  );
}
