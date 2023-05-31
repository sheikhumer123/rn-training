import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import MainContext from "../MainContext/MainContext";
import { getUserPosts } from "../database";
import { Button } from "@rneui/base";

const ProfilePostsTab = () => {
  const { currentUser } = useContext(MainContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, []);
  const fetchUserPosts = async () => {
    const posts = await getUserPosts(currentUser.id);

    setUserPosts(posts);
  };

  return (
    <>
      <View style={styles.profile_post_tab_container}>
        <View style={styles.profile_post_tab_container}>
          {userPosts.map((post, index) => (
            <View key={index} style={styles.user_profile_posts}>
              <Image source={{ uri: post.img }} style={styles.postImage} />
            </View>
          ))}
        </View>
      </View>
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
});
