import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Notification from "../components/Notification";
import PrivacyAndSettings from "../components/PrivacyAndSettings";

const Stack = createNativeStackNavigator();

const HomeNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerTitleStyle: {
            color: "red",
            fontSize: 22,
          },
        }}
      />
      <Stack.Screen
        name="PrivacyAndSettings"
        component={PrivacyAndSettings}
        options={{
          headerTitleStyle: {
            color: "red",
            fontSize: 22,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
