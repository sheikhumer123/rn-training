import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Icon } from "@rneui/base";

import Logo from "./Logo";

const HomeTopNav = () => {
  return (
    <View style={styles.outer_container}>
      <View>
        <Logo sm />
      </View>
      <View style={styles.home_nav}>
        <Icon style={styles.top_icons} name="heart" type="feather" size={28} />
        <Icon
          style={styles.top_icons}
          name="message-circle"
          type="feather"
          size={28}
        />
      </View>
    </View>
  );
};
export default HomeTopNav;

const styles = StyleSheet.create({
  outer_container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: Platform.OS == "ios" ? 10 : 55,
    paddingBottom: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  top_icons: {
    padding: 5,
  },
  home_nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    width: "22%",
  },
});
