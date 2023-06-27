import { Dimensions, StatusBar } from "react-native";
const dim = Dimensions.get("screen");

export const app = {
  styles: {
    center_view: {
      justifyContent: "center",
      alignItems: "center",
    },
    center_text: {
      textAlign: "center",
    },
    bold_text: {
      fontWeight: "bold",
    },
  },
  notificationString: {
    followingYou: "started following you",
  },
  likeMessage: {
    likeYou: "Liked Your Post",
  },
  deviceWidth: dim.width,
  deviceHeight: dim.height,
  topHeight: StatusBar.currentHeight,
  cloudFunction: "https://us-central1-instagram-4b52d.cloudfunctions.net/",
};
