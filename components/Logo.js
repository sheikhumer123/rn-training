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
    width: 280 * 0.8,
    height: 89.5 * 0.8,
    marginBottom: 20,
  },
  sm: { width: 160 * 0.8, height: 50.5 * 0.8 },
});
