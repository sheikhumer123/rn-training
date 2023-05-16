import React from "react";
import { View, Text } from "react-native";
import { app } from "../constants";
const SearchScreen = () => {
  return (
    <View style={{ flex: 1, ...app.styles.center_view }}>
      <Text>Search Sreen</Text>
    </View>
  );
};
export default SearchScreen;
