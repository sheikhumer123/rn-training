import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import Post from "./Post";
import { getAllPosts } from "../database";
import PostLoader from "./PostLoader";

import { AppContext } from "../navigation/PostNavigator";

const PostSection = () => {
  const [load, setLoad] = useState(true);

  const [posts, setPosts] = useState([]);

  const { refreshPosts } = useContext(AppContext);

  useEffect(() => {
    loadPosts();
  }, [refreshPosts]);

  const loadPosts = async () => {
    setLoad(true);
    const data = await getAllPosts();
    const sortedPosts = [...data].sort((a, b) => b.upload_time - a.upload_time);
    setPosts(sortedPosts);
    setLoad(false);
  };
  return (
    <View style={styles.post_screen}>
      {load ? (
        <PostLoader />
      ) : (
        <View>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </View>
      )}
    </View>
  );
};

export default PostSection;

const styles = StyleSheet.create({});
