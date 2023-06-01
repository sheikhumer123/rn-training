import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";

import Notification from "../components/Notification";
import EditProfileScreen from "../screens/EditProfileScreen";
import OpenCommentsScreen from "../screens/OpenCommentsScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />

      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OpenCommentsScreen"
        component={OpenCommentsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
