import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Avatar, Button } from "@rneui/themed";
import { notify, getUsernotify } from "../database";
import { useState } from "react";
import { createFollowFollowing, removeFollowFollowing } from "../database";
import { app } from "../constants";
import MainContext from "../MainContext/MainContext";

const Notification = () => {
  const { currentUser, setCurrentUser } = useContext(MainContext);
  const [userNotifcation, setUserNotifcation] = useState([]);

  useEffect(() => {
    const usernotify = async () => {
      const data = await getUsernotify(currentUser.id);
      setUserNotifcation(data);
    };
    usernotify();
  }, []);

  const follow = async (by_user_id) => {
    if (currentUser.following.includes(by_user_id)) {
      setCurrentUser({
        ...currentUser,
        following: currentUser.following.filter((id) => id !== by_user_id),
      });
      await removeFollowFollowing(currentUser.id, by_user_id);
    } else {
      setCurrentUser({
        ...currentUser,
        following: [...currentUser.following, by_user_id],
      });
      await createFollowFollowing(currentUser.id, by_user_id);
      await notify(
        by_user_id,
        currentUser.username,
        currentUser.user_img,
        app.notificationString.followingYou,
        currentUser.id
      );
    }
  };
  return (
    <SafeAreaView style={styles.notification_bar}>
      <ScrollView>
        <Text>This Month</Text>
        {userNotifcation.map((noti, index) => (
          <View style={styles.notification} key={index}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                size={45}
                rounded
                source={{
                  uri: noti.img,
                }}
              />
              <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
                {noti.by_user}
              </Text>
              <Text style={{ marginLeft: 5 }}>{noti.description}</Text>
            </View>
            <View>
              {noti.description !== app.likeMessage.likeYou ? (
                <Button
                  onPress={() => follow(noti.by_user_id)}
                  title={
                    currentUser.following.includes(noti.by_user_id)
                      ? "Following"
                      : "Follow"
                  }
                  containerStyle={{
                    alignSelf: "center",
                  }}
                  titleStyle={{
                    fontSize: 14,
                    padding: 0,
                    margin: 0,
                  }}
                  buttonStyle={{
                    padding: 0,
                    height: 28,
                  }}
                />
              ) : (
                ""
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Notification;

const styles = StyleSheet.create({
  notification_bar: {
    paddingTop: app.topHeight + 6,
    paddingHorizontal: 10,
  },
  notification: {
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  follow_button: {
    backgroundColor: "red",
  },

  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
