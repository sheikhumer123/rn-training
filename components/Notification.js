import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Avatar } from "@rneui/themed";
import { Button } from "@rneui/base";

const Notification = (props) => {
  const { onPress, title = "Follow" } = props;
  return (
    <SafeAreaView style={styles.notification_bar}>
      <ScrollView>
        <Text>This Month</Text>
        <View style={styles.notification}>
          <View style={{ width: 50 }}>
            <Avatar
              size={45}
              rounded
              source={{
                uri: "https://randomuser.me/api/portraits/men/36.jpg",
              }}
            />
          </View>
          <View style={styles.flex_setting}>
            <Text style={styles.notification_data}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit
              amet semper felis, a sagittis turpis.
            </Text>
          </View>
          <View style={{ width: 70 }}>
            <Pressable style={styles.button} onPress={onPress}>
              <Text style={styles.text}>{title}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Notification;

const styles = StyleSheet.create({
  notification_bar: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  notification: {
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
  },

  follow_button: {
    backgroundColor: "red",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  flex_setting: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
