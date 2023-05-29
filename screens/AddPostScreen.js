import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { AppContext } from "../navigation/PostNavigator";
import { createPostDb, postPicUpload } from "../database";
import { Button } from "@rneui/themed";
import MainContext from "../MainContext/MainContext";
import * as ImagePicker from "expo-image-picker";
import Logo from "../components/Logo";
import { useNavigation } from "@react-navigation/native";

import "react-native-get-random-values";

import { v4 as uuidv4 } from "uuid";

const AddPostScreen = () => {
  const navigation = useNavigation();
  const { refreshPosts } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [addDesc, setAddDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(MainContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let uri = result.assets[0].uri;
      setImage(uri);
    }
  };

  const uploadPostImage = async () => {
    return await postPicUpload(image);
  };

  const handlePostButtonPress = async () => {
    await uploadPostDetail();
    refreshPosts();
    navigation.navigate("Home", { refresh: true });
  };

  const uploadPostDetail = async () => {
    setLoading(true);
    let downloadUrl = await uploadPostImage();
    let userDisplayName = currentUser.username || "";
    let postDetail = {
      img: downloadUrl,
      comments: [],
      description: addDesc,
      likes: [],
      upload_time: new Date(),
      user_name: userDisplayName,
      id: currentUser.uid,
      post_id: uuidv4(),
    };
    await createPostDb(postDetail, currentUser);
    setImage("");
    setAddDesc("");
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <Logo sm />
      </View>
      <Text
        style={{ textAlign: "center", marginVertical: 10, fontWeight: "bold" }}
      >
        Upload Post
      </Text>
      <TouchableWithoutFeedback onPress={pickImage}>
        <View style={styles.add_post_image}>
          <ImageBackground
            source={
              image
                ? { uri: image }
                : require("../assets/images/add_post_image.jpg")
            }
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      </TouchableWithoutFeedback>
      <TextInput
        style={styles.add_post_input}
        placeholder="Description"
        value={addDesc}
        onChangeText={(text) => setAddDesc(text)}
      />
      <Button
        title={"Post"}
        onPress={handlePostButtonPress}
        loading={loading}
        containerStyle={{
          width: "100%",
          marginTop: 10,
        }}
      />
    </View>
  );
};
export default AddPostScreen;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  add_post_image: {
    borderColor: "#ccc",
    borderWidth: 1,
    height: 250,
    width: "100%",
  },
  add_post_input: {
    marginTop: 20,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    height: 40,
    paddingLeft: 10,
  },
  add_post_button: {
    marginTop: 10,
  },
});
