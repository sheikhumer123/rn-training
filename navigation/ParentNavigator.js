import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";
import MainContext from "../MainContext/MainContext";
import { View } from "react-native";

import { SocialIcon } from "@rneui/themed";

export default function ParentNavigator() {
  const { currentUser, appload } = useContext(MainContext);
  console.log(appload);
  return (
    <NavigationContainer>
      {appload ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SocialIcon
            fontStyle={{}}
            iconSize={40}
            iconStyle={{}}
            onLongPress={() => console.log("onLongPress()")}
            onPress={() => console.log("onPress()")}
            style={{ paddingHorizontal: 10 }}
            title="GitHub"
            type="instagram"
          />
        </View>
      ) : currentUser?.uid ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
