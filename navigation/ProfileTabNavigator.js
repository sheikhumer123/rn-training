import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileSavePostsTab from "../screens/ProfileSavePostsTab";
import ProfileVideosTab from "../screens/ProfileVideosTab";
import ProfilePostsTab from "../screens/ProfilePostsTab";
import Feather from "react-native-vector-icons/Feather";

const ProfileTabNavigator = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName=""
      screenOptions={{
        header: () => null,
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          topBarLabel: "umer",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="grid" size={22} color={color} />;
          },
        }}
        name="ProfilePostsTab"
        component={ProfilePostsTab}
      />
      <Tab.Screen
        options={{
          showLabel: false,
          tabBarIcon: ({ color, size }) => {
            return <Feather name="film" size={22} color={color} />;
          },
        }}
        name="ProfileVideosTab"
        component={ProfileVideosTab}
      />
      <Tab.Screen
        options={{
          topBarLabel: "umer",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="bookmark" size={22} color={color} />;
          },
        }}
        name="ProfileSavePostsTab"
        component={ProfileSavePostsTab}
      />
    </Tab.Navigator>
  );
};
export default ProfileTabNavigator;
