import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";

import MainContext from "../MainContext/MainContext";
import { Input } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { editUserDB, getEditUserDB } from "../database";
import { app } from "../constants";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { currentUser, setCurrentUser } = useContext(MainContext);
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [updatingDataLoader, setUpdatingDataLoader] = useState(false);
  const [updateimage, setUpdateImage] = useState(null);
  const [value, setValue] = useState();
  const [items, setItems] = useState([
    { label: "Man", value: "Man" },
    { label: "Women", value: "Women" },
  ]);
  const [getData, setGetData] = useState({});

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let uri = result.assets[0].uri;
      setUpdateImage(uri);
    }
  };

  const getUserDetail = async () => {
    setDataLoading(true);
    const userDetail = await getEditUserDB(currentUser.uid);
    setGetData(userDetail);
    setValue(userDetail.gender);
    setDataLoading(false);
  };

  useEffect(() => {
    setShowMessage(false);
    getUserDetail();
  }, []);

  const editProfile = async () => {
    setShowMessage(false);
    setUpdatingDataLoader(true);
    await editUserDB(getData, currentUser.uid, updateimage, currentUser);
    setCurrentUser({
      ...currentUser,
      bio: getData.bio,
      gender: getData.gender,
      username: getData.username,
      user_img: getData.user_img,
    });
    setUpdatingDataLoader(false);
    setShowMessage(true);
    navigation.navigate("Home");
  };

  return (
    <>
      {dataLoading ? (
        <View style={{ flex: 1, ...app.styles.center_view }}>
          <ActivityIndicator
            animating={dataLoading}
            size="large"
            color="#00ff00"
          />
        </View>
      ) : (
        <View style={styles.edit_profile_container}>
          <View style={styles.edit_profile_header}>
            <View style={styles.profile_header_left}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Home")}
              >
                <Feather name={"x"} size={28} color={"black"} />
              </TouchableWithoutFeedback>
              <Text style={styles.profile_header_left_text}>Edit Profile</Text>
            </View>
            <View>
              <Feather
                name={"check"}
                size={28}
                color={"black"}
                onPress={editProfile}
              />
            </View>
          </View>
          <View style={styles.edit_profile_image_section}>
            <View>
              <TouchableWithoutFeedback onPress={pickImage}>
                <ImageBackground
                  source={
                    updateimage
                      ? { uri: updateimage }
                      : { uri: currentUser.user_img }
                  }
                  resizeMode="cover"
                  style={styles.img_back}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <Text style={{ textAlign: "center", color: "dodgerblue" }}>
            Edit picture or avatar
          </Text>
          <View style={styles.edit_profile_input_area}>
            <Input
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ height: 25 }}
              labelStyle={{ fontSize: 12 }}
              label="Username"
              value={getData?.username}
              onChangeText={(txt) => setGetData({ ...getData, username: txt })}
            />

            <Input
              inputStyle={{ fontSize: 13 }}
              inputContainerStyle={{ height: 25 }}
              labelStyle={{ fontSize: 12 }}
              label="Bio"
              value={getData?.bio}
              onChangeText={(txt) => setGetData({ ...getData, bio: txt })}
            />
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              onChangeValue={(txt) => setGetData({ ...getData, gender: value })}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Gender"
              containerStyle={{
                borderWidth: 0,
                fontSize: 13,
                borderBottomWidth: 0.5,
              }}
              style={{
                borderWidth: 0,
                fontSize: 13,
              }}
              labelStyle={{ fontSize: 13 }}
              dropDownContainerStyle={{
                fontSize: 13,
                borderWidth: 0,
                borderBottomWidth: 1,
              }}
              placeholderStyle={{
                fontSize: 13,
              }}
            />
          </View>
          {showMessage ? (
            <Text
              style={{ textAlign: "center", marginTop: 50, color: "#00ff00" }}
            >
              Profile Updated Successfully !!
            </Text>
          ) : (
            <Text></Text>
          )}

          {updatingDataLoader ? (
            <View style={{ flex: 1, ...app.styles.center_view, marginTop: 50 }}>
              <ActivityIndicator
                animating={updatingDataLoader}
                size="large"
                color="#00ff00"
              />
            </View>
          ) : (
            ""
          )}
        </View>
      )}
    </>
  );
};
export default EditProfileScreen;

const styles = StyleSheet.create({
  edit_profile_header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  edit_profile_container: {
    marginTop: 50,
    paddingHorizontal: 12,
    display: "flex",
  },
  profile_header_left: {
    display: "flex",
    flexDirection: "row",
    flex: 0.4,
    justifyContent: "space-between",
  },
  profile_header_left_text: {
    fontSize: 17,
    fontWeight: "bold",
  },
  edit_profile_image_section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 110,
  },
  edit_profile_input_area: {
    marginTop: 40,
  },
  img_back: {
    width: 80,
    height: 80,
    overflow: "hidden",
    borderRadius: 50,
  },
});
