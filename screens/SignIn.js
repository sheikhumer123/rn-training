import React, { useState } from "react";
import { Button } from "@rneui/themed";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Facebook from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Logo from "../components/Logo";

const SignIn = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: true,
  });

  const showHide = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };

  const signin = () => {
    setloading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {})
      .catch((error) => {})
      .finally(() => {
        setloading(false);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerMid}>
        <Logo />
        <TextInput
          style={styles.input}
          placeholder="Phone number, email, username"
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
          <Feather
            style={{
              position: "absolute",
              top: 12,
              right: 10,
            }}
            name={user.showPassword ? "eye" : "eye-off"}
            size={22}
            color={"dodgerblue"}
            onPress={showHide}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "blue",
                marginBottom: 8,
                textAlign: "right",
                color: "#059AFE",
                fontWeight: "bold",
              }}
            >
              Forgotten Password ?
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            width: "100%",
            borderRadius: 5,
            height: 45,
            justifyContent: "center",
          }}
        >
          <Button title="Log In" onPress={signin} loading={loading} />
        </View>
        <View>
          <Text
            style={{
              marginTop: 8,
            }}
          >
            OR
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Facebook name="facebook-square" size={25} color={"dodgerblue"} />
          <Text style={{ marginLeft: 6, color: "#059AFE", fontWeight: "bold" }}>
            Continue as Abdullah Arif
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#797979",
            fontWeight: "700",
          }}
        >
          Dont have an account
        </Text>
        <Text
          style={{
            color: "#059AFE",
            marginLeft: 5,
            fontWeight: "bold",
          }}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          SignUp
        </Text>
      </View>
    </View>
  );
};
export default SignIn;

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
  facebookicon: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
});
