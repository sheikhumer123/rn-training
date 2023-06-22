import React, { useContext } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";

import AddPostScreen from "../screens/AddPostScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileAndSettingScreen from "../screens/ProfileAndSettingScreen";
import ReelsVideosScreen from "../screens/ReelsVideosScreen";
import MainContext from "../MainContext/MainContext";
import { Avatar } from "@rneui/themed";
import { AppProvider } from "../navigation/PostNavigator";
import HomeNavigator from "./HomeNavigator";

const MainNavigator = () => {
  const { currentUser } = useContext(MainContext);
  const Tab = createBottomTabNavigator();

  return (
    <>
      <AppProvider>
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
                    size={27}
                    rounded
                    source={{
                      uri: currentUser.user_img,
                    }}
                  />
                );
              },
            }}
            name="ProfileAndSettingScreen"
            component={ProfileAndSettingScreen}
          />
        </Tab.Navigator>
      </AppProvider>
    </>
  );
};

export default MainNavigator;
