import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Avatar } from "@rneui/themed";

const Stories = () => {
  const stories = [
    { dp: "https://randomuser.me/api/portraits/men/10.jpg" },
    { dp: "https://randomuser.me/api/portraits/men/15.jpg" },
    { dp: "https://randomuser.me/api/portraits/men/20.jpg" },
    { dp: "https://randomuser.me/api/portraits/men/22.jpg" },
    { dp: "https://randomuser.me/api/portraits/men/26.jpg" },
    { dp: "https://randomuser.me/api/portraits/men/45.jpg" },
    { dp: "https://randomuser.me/api/portraits/men/33.jpg" },
  ];
  return (
    <View style={styles.stories}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {stories.map((story, index) => (
          <View style={styles.story} key={index}>
            <Avatar
              size={65}
              rounded
              source={{
                uri: story.dp,
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default Stories;

const styles = StyleSheet.create({
  stories: {
    display: "flex",
    flexDirection: "row",
  },
  story: {
    margin: 5,
  },
});
