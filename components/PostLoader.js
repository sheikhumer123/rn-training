import React from "react";
import { View } from "react-native";
import { Skeleton } from "@rneui/themed";

const PostLoader = () => {
  return (
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
  );
};

export default PostLoader;
