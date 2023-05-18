import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";

import AddPostScreen from "../screens/AddPostScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileAndSettingScreen from "../screens/ProfileAndSettingScreen";
import ReelsVideosScreen from "../screens/ReelsVideosScreen";
import { Avatar } from "@rneui/themed";

import HomeNavigator from "./HomeNavigator";

const MainNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeNavigator"
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
              return <Feather name="home" size={size} color={color} />;
            },
          }}
          name="HomeNavigator"
          component={HomeNavigator}
        />

        <Tab.Screen
          options={{
            showLabel: false,
            tabBarIcon: ({ color, size }) => {
              return <Feather name="search" size={size} color={color} />;
            },
          }}
          name="SearchScreen"
          component={SearchScreen}
        />
        <Tab.Screen
          options={{
            topBarLabel: "umer",
            tabBarIcon: ({ color, size }) => {
              return <Feather name="plus-square" size={size} color={color} />;
            },
          }}
          name="AddPostScreen"
          component={AddPostScreen}
        />
        <Tab.Screen
          options={{
            topBarLabel: "umer",
            tabBarIcon: ({ color, size }) => {
              return <Feather name="film" size={size} color={color} />;
            },
          }}
          name="ReelsVideosScreen"
          component={ReelsVideosScreen}
        />
        <Tab.Screen
          options={{
            topBarLabel: "umer",
            tabBarIcon: () => {
              return (
                <Avatar
                  size={28}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
              );
            },
          }}
          name="ProfileAndSettingScreen"
          component={ProfileAndSettingScreen}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainNavigator;
