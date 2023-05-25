import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

import Logo from "../components/Logo";
import { Button } from "@rneui/themed";

import MainContext from "../MainContext/MainContext";
import * as ImagePicker from "expo-image-picker";
import { picUriDatabase } from "../database";
import { createUserDB } from "../database";

const UserDetails = () => {
  const { currentUser, setCurrentUser } = useContext(MainContext);
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState({});
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
    let downloadUrl = await uploadUserDp();
    let userDetails = {
      username: userName,
      userImg: downloadUrl,
      id: currentUser.uid,
    };
    await createUserDB(userDetails, currentUser.uid);
    setCurrentUser({
      ...currentUser,
      username: userName,
      userImg: downloadUrl,
    });
    setLoading(false);
  };

  return (
    <View style={styles.main_container}>
      <Logo lg />
      <View style={styles.set_dp}>
        <TouchableWithoutFeedback onPress={pickImage}>
          <View style={styles.dp_box}>
            <ImageBackground
              source={
                image ? { uri: image } : require("../assets/images/add-img.png")
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
        on
        title={"Continue"}
        onPress={uploadUserDetail}
        style={styles.continue_button}
        loading={loading}
      />
    </View>
  );
};
export default UserDetails;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  set_dp: {
    height: 80,
    width: 80,
    borderRadius: 50,

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
