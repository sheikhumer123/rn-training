import React, { useContext, useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";

import { updateUserPass } from "../database";
import { CheckBox } from "@rneui/base";
import { app } from "../constants";

const PrivacyAndSettings = () => {
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPass, setCurrentPass] = useState("");

  const [user, setUser] = useState({
    showPassword: true,
    showPass: false,
  });

  const showHide = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
      showPass: !user.showPass,
    });
  };

  const UpdatePassword = () => {
    if (pass == confirmPassword) {
      updateUserPass(pass, currentPass);
    } else {
      alert("Your Pass is Mismatched");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        ...app.styles.center_view,
        paddingHorizontal: 10,
      }}
    >
      <Text style={styles.text}>Type Current Password</Text>
      <Input
        leftIcon={{ type: "font-awesome", name: "lock" }}
        style={styles}
        value={currentPass}
        onChangeText={(txt) => setCurrentPass(txt)}
        secureTextEntry={user.showPassword}
      />
      <Text style={styles.text}>Type New Password</Text>

      <Input
        leftIcon={{ type: "font-awesome", name: "lock" }}
        style={styles}
        value={pass}
        onChangeText={(txt) => setPass(txt)}
        secureTextEntry={user.showPassword}
      />
      <Text style={styles.text}>Confirm Password</Text>
      <Input
        leftIcon={{ type: "font-awesome", name: "lock" }}
        style={styles}
        value={confirmPassword}
        onChangeText={(txt) => setConfirmPassword(txt)}
        secureTextEntry={user.showPassword}
      />
      <CheckBox
        containerStyle={{
          padding: 0,
          margin: 0,
          alignSelf: "flex-start",
          marginBottom: 10,
        }}
        textStyle={{
          color: "#797979",
        }}
        title="show password"
        checked={user.showPass}
        onPress={showHide}
      />
      <Button
        title={"Update Password"}
        containerStyle={{
          width: "100%",
        }}
        onPress={UpdatePassword}
      />
    </View>
  );
};
export default PrivacyAndSettings;

const styles = StyleSheet.create({
  forgot_password_input: {
    backgroundColor: "red",
    marginTop: 10,
    width: "100%",
    height: 50,
  },
  text: {
    alignSelf: "flex-start",
    marginTop: 5,
  },
});
