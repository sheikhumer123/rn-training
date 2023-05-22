import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserDetails from "../screens/UserDetails";

const Stack = createNativeStackNavigator();

const FirstTimeNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserDetails" component={UserDetails} />
    </Stack.Navigator>
  );
};

export default FirstTimeNavigator;
