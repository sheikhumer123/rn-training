import React from "react";
import { View, StyleSheet } from "react-native";

const ProfilePostsTab = () => {
  return (
    <View style={styles.profile_post_tab_container}>
      <View style={styles.user_profile_posts}></View>
      <View style={styles.user_profile_posts}></View>
      <View style={styles.user_profile_posts}></View>
    </View>
  );
};
export default ProfilePostsTab;

const styles = StyleSheet.create({
  profile_post_tab_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  user_profile_posts: {
    height: 100,
    backgroundColor: "red",
    flex: 0.4,
    marginLeft: 2,
    marginTop: 10,
  },
  user_posts_test: {},
});
