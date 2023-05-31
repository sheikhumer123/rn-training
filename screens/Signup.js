import React, { useState } from "react";
import { CheckBox, Button } from "@rneui/themed";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { StyleSheet, View, TextInput, Text } from "react-native";
import Logo from "../components/Logo";

const Signup = ({ navigation }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: true,
    agreement: false,
    showPass: false,
  });

  const showHide = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
      showPass: !user.showPass,
    });
  };
  const [loading, setLoading] = useState(false);
  const toggleCheckbox = () => {
    setUser({
      ...user,
      agreement: !user.agreement,
    });
  };

  const signUp = () => {
    setLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user.email, user.password).then(
      (userCredential) => {
        setLoading(false);
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerMid}>
        <Logo />
        <TextInput
          style={styles.input}
          placeholder="Email "
          value={user.email}
          onChangeText={(txt) => setUser({ ...user, email: txt })}
        />
        <View style={{ width: "100%" }}>
          <TextInput
            style={[
              styles.input,
              {
                paddingRight: 38,
              },
            ]}
            placeholder="Password"
            value={user.password}
            onChangeText={(txt) => setUser({ ...user, password: txt })}
            secureTextEntry={user.showPassword}
          />
        </View>
        <View style={{ width: "100%" }}>
          <TextInput
            style={[
              styles.input,
              {
                paddingRight: 38,
              },
            ]}
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChangeText={(txt) => setUser({ ...user, confirmPassword: txt })}
            secureTextEntry={user.showPassword}
          />
        </View>
        <View
          style={{
            width: "105%",
            marginBottom: 10,
            marginVertical: 5,
          }}
        >
          <CheckBox
            containerStyle={{
              padding: 0,
              margin: 0,
            }}
            textStyle={{
              color: "#797979",
            }}
            checked={user.showPass}
            onPress={showHide}
            title="show password"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="name"
          onChangeText={(txt) => setUser({ ...user, name: txt })}
        />
        <View
          style={{
            width: "105%",
            marginBottom: 10,
            marginVertical: 5,
          }}
        >
          <CheckBox
            containerStyle={{
              padding: 0,
              margin: 0,
            }}
            textStyle={{
              color: "#797979",
            }}
            checked={user.agreement}
            onPress={toggleCheckbox}
            title="I have read and agree to the terms of service"
          />
        </View>

        <View
          style={{
            width: "100%",
            borderRadius: 5,
            height: 45,
            justifyContent: "center",
            marginTop: 10,
          }}
        ></View>
        <View
          style={{
            width: "100%",
          }}
        >
          <Button title="Sign Up" onPress={signUp} loading={loading} />
        </View>
        <View>
          <Text
            style={{
              marginTop: 14,
              fontWeight: "700",
            }}
          >
            OR
          </Text>
        </View>
      </View>
      <View style={styles.flex_setting}>
        <Text
          style={{
            textAlign: "center",
            color: "#797979",
            fontWeight: "700",
          }}
        >
          Already have an account ?
        </Text>
        <Text
          style={{
            color: "#059AFE",
            marginLeft: 5,
            fontWeight: "bold",
          }}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          LogIn
        </Text>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMid: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  logo: {
    width: 280 * 0.8,
    height: 89.5 * 0.8,
    marginBottom: 20,
  },
  button: {
    minWidth: 120,
  },
  flex_setting: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
