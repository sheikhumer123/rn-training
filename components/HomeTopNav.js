import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import Logo from "./Logo";

const HomeTopNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.outer_container}>
      <Logo sm />
      <View style={styles.home_nav}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Notification")}
        >
          <Icon
            style={styles.top_icons}
            name="heart"
            type="feather"
            size={28}
          />
        </TouchableWithoutFeedback>
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
