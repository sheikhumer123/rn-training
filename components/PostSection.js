import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Post from "./Post";
import { getAllPosts } from "../database";
import PostLoader from "./PostLoader";

const PostSection = () => {
  const [load, setLoad] = useState(true);
  const [posts, setPosts] = useState([]);
  const loadPosts = async () => {
    setLoad(true);
    const data = await getAllPosts();
    setPosts(data);
    setLoad(false);
  };
  useEffect(() => {
    loadPosts();
  }, []);
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
