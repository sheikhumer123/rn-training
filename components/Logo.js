import React from "react";
import { StyleSheet, Image } from "react-native";

const Logo = ({ sm }) => {
  return (
    <Image
      source={require("../assets/images/logo.png")}
      style={sm ? styles.sm : styles.logo}
    />
  );
};
export default Logo;

const styles = StyleSheet.create({
  logo: {
    width: 224,
    height: 71.1,
    marginBottom: 20,
  },
  sm: { width: 128, height: 40.4 },
  addpostsm: { width: 128, height: 40.4 },
  lg: { width: 128, height: 40.4, marginBottom: 0 },
});
