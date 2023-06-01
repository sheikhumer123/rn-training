import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Avatar } from "@rneui/themed";
import { getAllUsers } from "../database";
import FollowButton from "./FollowButton";

const DiscoverBox = () => {
  const [discoverBox, setDiscoverBox] = useState(true);

  const [allUsersData, setAllUsersData] = useState([]);
  useEffect(() => {
    getAllUserInfo();
  }, []);

  const discoverBoxToggle = () => {
    setDiscoverBox(!discoverBox);
  };
  const getAllUserInfo = async () => {
    const data = await getAllUsers();
    setAllUsersData(data);
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        {allUsersData.map((user, index) =>
          discoverBox ? (
            <View key={index} style={styles.discover_people_box}>
              <View style={styles.discover_people_box_dp}>
                <Avatar
                  size={65}
                  rounded
                  source={{
                    uri: user.user_img,
                  }}
                />
              </View>

              <Text style={styles.discover_box_username}>{user.username}</Text>
              <Text style={styles.discover_box_text}>Suggested for you</Text>
              <FollowButton />
            </View>
          ) : null
        )}
      </View>
    </>
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
