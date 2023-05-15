import React from "react";
import { StyleSheet, View } from "react-native";
import Post from "./Post";

const PostSection = () => {
  return (
    <View style={styles.post_screen}>
      <Post />
    </View>
  );
};

export default PostSection;

const styles = StyleSheet.create({
  post_screen: {
    marginTop: -10,
  },
});
