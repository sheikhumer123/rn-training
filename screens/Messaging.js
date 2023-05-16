import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Messaging = () => {
  return (
    <View style={styles.messaging}>
      <TextInput style={styles.message_search} placeholder="Search" />
    </View>
  );
};
export default Messaging;

const styles = StyleSheet.create({
  messaging: {
    paddingTop: 100,
    paddingHorizontal: 10,
  },
  message_search: {
    paddingLeft: 30,
    height: 30,
    backgroundColor: "#f2f3f4",
    borderRadius: 10,
  },
});
