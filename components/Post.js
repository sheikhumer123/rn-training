import React from "react";
import { Avatar } from "@rneui/themed";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
} from "react-native";
import { Icon } from "@rneui/base";

const Post = () => {
  return (
    <View style={styles.Post}>
      <View style={styles.post_top}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            size={32}
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/36.jpg",
            }}
          />
          <Text style={styles.post_user_name}>umer.pk</Text>
        </View>
      </View>
      <View style={styles.post_data}>
        <ImageBackground
          source={{
            uri: "https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-36703721.jpg",
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.post_bottom}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Icon style={styles.post_icons} name="heart" type="feather" />
          <Icon
            style={styles.post_icons}
            name="message-circle"
            type="feather"
          />
          <Icon
            style={styles.post_icons}
            name="md-paper-plane-outline"
            type="ionicon"
          />
        </View>
        <Icon name="download" type="feather" />
      </View>
      <View style={styles.like_comment_section}>
        <Text style={{ marginTop: 5, fontWeight: "bold", fontSize: 14 }}>
          9,109 likes
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          umer.pk{" "}
          <Text style={{ fontWeight: "400", fontSize: 14 }}>Targer Locked</Text>
        </Text>
        <Text
          style={{
            color: "grey",
            fontSize: 14,
            fontWeight: "600",
            marginTop: 3,
          }}
        >
          View all 103 comments
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            size={24}
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/36.jpg",
            }}
          />
          <TextInput placeholder="Add a comment" style={styles.comment_box} />
        </View>
        <Text
          style={{
            fontSize: 9,
            color: "grey",
            fontWeight: "700",
          }}
        >
          55 minutes ago
        </Text>
      </View>
    </View>
  );
};
export default Post;

const styles = StyleSheet.create({
  Post: {
    marginTop: 20,
  },
  post_top: {
    paddingHorizontal: 10,
  },

  post_user_image: {
    height: 30,
    width: 30,
    backgroundColor: "black",
    borderRadius: 50,
  },
  post_user_name: {
    marginLeft: 5,
    fontWeight: "bold",
  },
  post_icons: {
    padding: 5,
  },
  post_bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  post_data: {
    height: 280,
    width: "100%",
    backgroundColor: "red",
    marginTop: 10,
  },
  like_comment_section: {
    paddingHorizontal: 10,
  },
  comment_box: {
    width: "100%",
    height: 30,
    paddingLeft: 5,
    fontWeight: "500",
    marginTop: 3,
  },
});
