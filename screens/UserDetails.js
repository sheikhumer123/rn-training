import React, { useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Button } from "@rneui/themed";

import Logo from "../components/Logo";

import MainContext from "../MainContext/MainContext";
import * as ImagePicker from "expo-image-picker";
import { picUriDatabase } from "../database";
import { createUserDB } from "../database";

const UserDetails = () => {
  const { currentUser, setCurrentUser } = useContext(MainContext);
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

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
  const uploadUserDp = async () => {
    return await picUriDatabase(image);
  };
  const uploadUserDetail = async () => {
    setLoading(true);
    let downloadUrl = image
      ? await uploadUserDp()
      : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80";
    console.log(downloadUrl);

    let userDetails = {
      username: userName.toLowerCase(),
      user_img: downloadUrl,
      id: currentUser.uid,
      followers: [],
      following: [],
    };
    await createUserDB(userDetails, currentUser.uid);
    setCurrentUser({
      ...currentUser,
      username: userName,
      user_img: downloadUrl,
      followers: [],
      following: [],
    });
    setLoading(false);
  };

  return (
    <>
      <View style={styles.main_container}>
        <Logo lg />
        <View style={styles.set_dp}>
          <TouchableWithoutFeedback onPress={pickImage}>
            <View style={styles.dp_box}>
              <ImageBackground
                source={
                  image
                    ? { uri: image }
                    : require("../assets/images/add-img.png")
                }
                resizeMode="cover"
                style={styles.img_back}
              />
              <Image
                style={styles.camera_icon}
                source={require("../assets/images/camera-icon.png")}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TextInput
          style={styles.username_input}
          onChangeText={(text) => setUserName(text)}
          value={userName}
        />
        <Button
          title={"Continue"}
          onPress={uploadUserDetail}
          loading={loading}
        />
      </View>
    </>
  );
};
export default UserDetails;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  set_dp: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "red",

    position: "relative",
  },
  username_input: {
    marginTop: 30,
    width: "100%",
    height: 35,
    borderColor: "grey",
    borderWidth: 0.9,
    color: "black",
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dp_box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img_back: {
    width: 110,
    height: 110,
    overflow: "hidden",
    borderRadius: 50,
  },
  camera_icon: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: -20,
    right: -15,
  },
});
