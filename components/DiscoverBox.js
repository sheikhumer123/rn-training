import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Avatar } from "@rneui/themed";

const DiscoverBox = () => {
  return (
    <View style={styles.discover_people_box}>
      <View style={styles.discover_people_box_dp}>
        <Avatar
          size={65}
          rounded
          source={{
            uri: "https://randomuser.me/api/portraits/men/10.jpg",
          }}
        />
      </View>

      <Text style={styles.discover_box_username}>Abdullah Arif</Text>
      <Text style={styles.discover_box_text}>Suggested for you</Text>
      <Button
        containerStyle={{
          width: "90%",
          height: 30,
          marginTop: 5,
          borderRadius: 7,
        }}
        titleStyle={{
          fontSize: 13,
          color: "white",
        }}
        buttonStyle={{
          margin: 0,
          paddingTop: 5,
        }}
        title={"Follow"}
      />
    </View>
  );
};
export default DiscoverBox;

const styles = StyleSheet.create({
  discover_people_box_dp: {},
  discover_people_box: {
    width: 170,
    height: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    marginLeft: 5,
    borderWidth: 1,
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
