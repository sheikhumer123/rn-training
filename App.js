import React from "react";

import { MainProvider } from "./MainContext/MainContext";
import ParentNavigator from "./navigation/ParentNavigator";
import UserDetails from "./screens/UserDetails";
import AddPostScreen from "./screens/AddPostScreen";
import ProfileAndSettingScreen from "./screens/ProfileAndSettingScreen";
import PrivacyAndSettings from "./components/PrivacyAndSettings";

export default function App() {
  return (
    <MainProvider>
      <ParentNavigator />
    </MainProvider>
  );
}
