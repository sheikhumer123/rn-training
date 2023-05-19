import React, { useState, useContext } from "react";
import { View, TextInput } from "react-native";

import { createPostDB } from "../database";
import { Button } from "@rneui/themed";
import MainContext from "../MainContext/MainContext";

const AddPostScreen = () => {
  const { currentUser } = useContext(MainContext);
  const [postModel, setPostModel] = useState({
    img: "",
    comments: "",
    description: "",
    likes: "",
    upload_time: "",
    user_name: currentUser.displayName,
    views: "",
    id: "",
  });

  const addPost = async () => {
    createPostDB(postModel);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput
        placeholder="description"
        onChangeText={(txt) => setPostModel({ ...postModel, description: txt })}
      />
      <Button title={"data posted"} onPress={addPost} />
    </View>
  );
};
export default AddPostScreen;
