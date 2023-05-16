import React from "react";
import { View, Text } from "react-native";
import { app } from "../constants";
const ProfileAndSettingScreen = () => {
  return (
    <View style={{ flex: 1, ...app.styles.center_view }}>
      <Text>Profile And Setting Screen</Text>
    </View>
  );
};
export default ProfileAndSettingScreen;
