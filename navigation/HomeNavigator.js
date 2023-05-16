import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../screens/SignIn";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import Notification from "../components/Notification";

const Stack = createNativeStackNavigator();

const HomeNavigator = (props) => {
  const is_auth_user = true;
  return (
    <Stack.Navigator>
      {is_auth_user ? (
        <>
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
        </>
      ) : (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="SignIn"
            component={SignIn}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="SignUp"
            component={Signup}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
