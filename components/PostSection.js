import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Post from "./Post";
import { getAllPosts } from "../database";
import { Skeleton } from "@rneui/themed";

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
        <View>
          <Skeleton
            animation="wave"
            width={"100%"}
            height={290}
            style={{
              marginBottom: 20,
            }}
          />
          <Skeleton
            animation="wave"
            width={"100%"}
            height={290}
            style={{
              marginBottom: 20,
            }}
          />
        </View>
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

const styles = StyleSheet.create({
  post_screen: {},
});
