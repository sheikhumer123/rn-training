import React from "react";
import { View } from "react-native";

import { SocialIcon } from "@rneui/themed";
import { app } from "../constants";
const AppLoader = () => {
  return (
    <View style={{ flex: 1, ...app.styles.center_view }}>
      <SocialIcon
        fontStyle={{}}
        iconSize={40}
        iconStyle={{}}
        onLongPress={() => console.log("onLongPress()")}
        onPress={() => console.log("onPress()")}
        style={{ paddingHorizontal: 10 }}
        title="GitHub"
        type="instagram"
      />
    </View>
  );
};

export default AppLoader;
