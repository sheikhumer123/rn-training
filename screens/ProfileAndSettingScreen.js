import React, { useContext } from "react";
import { View } from "react-native";
import { app } from "../constants";
import { Button } from "@rneui/themed";

import { getAuth, signOut } from "firebase/auth";
import MainContext from "../MainContext/MainContext";

const ProfileAndSettingScreen = () => {
  const { setCurrentUser } = useContext(MainContext);
  return (
    <View style={{ flex: 1, ...app.styles.center_view }}>
      <Button
        title="Log Out"
        onPress={() => {
          const auth = getAuth();
          signOut(auth);
          setCurrentUser({});
        }}
      />
    </View>
  );
};
export default ProfileAndSettingScreen;
