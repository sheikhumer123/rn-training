import React from "react";
import { Button } from "react-native-elements";

const FollowButton = () => {
  return (
    <Button
      containerStyle={{
        width: "90%",
        height: 30,
        marginTop: 5,
        borderRadius: 7,
      }}
      titleStyle={{
        fontSize: 13,
        color: "white",
      }}
      buttonStyle={{
        margin: 0,
        paddingTop: 5,
      }}
      title={"Follow"}
    />
  );
};
export default FollowButton;
