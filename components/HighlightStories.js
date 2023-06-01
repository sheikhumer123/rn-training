import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Avatar } from "@rneui/themed";

const HighlightStories = () => {
  return (
    <View style={styles.discover_people_box}>
      <Avatar
        size={80}
        rounded
        source={require("../assets/images/add-img.png")}
      />
      <Text style={styles.discover_box_text}>New</Text>
    </View>
  );
};
export default HighlightStories;

const styles = StyleSheet.create({
  discover_people_box: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 5,
  },
  discover_box_username: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 3,
  },
  discover_box_text: {
    fontSize: 11,
  },
});
