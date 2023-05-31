import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import MainContext from "../MainContext/MainContext";
import { getUserPosts } from "../database";
import { useFocusEffect } from "@react-navigation/native";
import { Skeleton } from "@rneui/themed";

const ProfilePostsTab = () => {
  const { currentUser } = useContext(MainContext);
  const [userPosts, setUserPosts] = useState([]);
  const [profilePostLoader, setProfilePostLoader] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserPosts();

      return () => {};
    }, [])
  );
  const fetchUserPosts = async () => {
    setProfilePostLoader(true);
    const posts = await getUserPosts(currentUser.id);
    setUserPosts(posts);
    setProfilePostLoader(false);
  };

  return (
    <>
      {profilePostLoader ? (
        <View>
          <View style={styles.profile_post_loading_container}>
            <Skeleton
              animation="wave"
              width={120}
              height={100}
              style={{ marginTop: 5, marginLeft: 3 }}
            />
            <Skeleton
              animation="wave"
              width={120}
              height={100}
              style={{ marginTop: 5, marginLeft: 3 }}
            />
            <Skeleton
              animation="wave"
              width={120}
              height={100}
              style={{ marginTop: 5, marginLeft: 3 }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.profile_post_tab_container}>
          {userPosts.map((post, index) => (
            <View key={index} style={styles.user_profile_posts}>
              <Image source={{ uri: post.img }} style={styles.postImage} />
            </View>
          ))}
        </View>
      )}
    </>
  );
};
export default ProfilePostsTab;

const styles = StyleSheet.create({
  profile_post_tab_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    flex: 1,
  },
  user_profile_posts: {
    height: 100,
    marginLeft: 2,
    marginTop: 5,
  },
  user_posts_test: {},
  postImage: {
    height: 100,
    width: 120,
    marginTop: 5,
  },
  profile_post_loading_container: {
    display: "flex",
    flexDirection: "row",
  },
});
