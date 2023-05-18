import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import Logo from "../components/Logo";
import { Button } from "@rneui/themed";

import { getAuth, updateProfile } from "firebase/auth";
import MainContext from "../MainContext/MainContext";

const AddDisplayName = () => {
  const { setCurrentUser } = useContext(MainContext);
  const [userImg, setUserImg] = useState({
    Name: "",
    photoUri: "",
  });

  const ImageUserName = () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: userImg.Name,
      photoURL: userImg.photoUri,
    })
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.main_container}>
      <Logo lg />
      <View style={styles.set_dp}></View>
      <Text style={{ marginTop: 10, fontWeight: "bold" }}>User name</Text>
      <TextInput
        style={styles.username_input}
        onChangeText={(txt) => setUserImg({ ...userImg, Name: txt })}
        value={userImg.Name}
      />
      <Button on onPress={ImageUserName} title={"Continue"} />
    </View>
  );
};
export default AddDisplayName;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  set_dp: {
    height: 80,
    width: 80,
    borderRadius: 50,
    backgroundColor: "red",
  },
  username_input: {
    marginTop: 5,
    width: "100%",
    height: 35,
    borderColor: "grey",
    borderWidth: 0.9,
    color: "black",
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  continue: {},
});
