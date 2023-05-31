import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import { getComments } from "../database";
import { Button } from "react-native-elements";

const OpenCommentsScreen = ({ route }) => {
  const postID = route.params;

  const navigation = useNavigation();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const retrievedComments = await getComments({ postID });
      setComments(retrievedComments);
    };

    fetchComments();
    console.log(postID);
  }, []);

  return (
    <View style={styles.comment_screen_container}>
      <View style={styles.edit_profile_header}>
        <View style={styles.profile_header_left}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
            <Feather
              onPress={() => navigation.navigate("Home")}
              name={"arrow-left"}
              size={28}
              color={"black"}
            />
          </TouchableWithoutFeedback>
          <Text style={styles.profile_header_left_text}>Comments</Text>
        </View>
        <View>
          <Feather name={"send"} size={23} color={"black"} />
        </View>
      </View>
      {comments.map((comment) => (
        <View style={styles.full_comment_box}>
          <View>
            <Avatar
              size={32}
              rounded
              source={{
                uri: comment.user_img,
              }}
            />
          </View>
          <View>
            <Text style={styles.comment_user}>{comment.add_by}</Text>
            <Text style={styles.comment_text}>{comment.comment}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
export default OpenCommentsScreen;

const styles = StyleSheet.create({
  comment_screen_container: {
    paddingTop: 50,
    paddingHorizontal: 14,
  },
  edit_profile_header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  profile_header_left: {
    display: "flex",
    flexDirection: "row",
    flex: 0.4,
    justifyContent: "space-between",
  },
  profile_header_left_text: {
    fontSize: 17,
    fontWeight: "bold",
  },
  full_comment_box: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    paddingBottom: 8,
  },
  comment_user: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  comment_text: {
    marginLeft: 10,
  },
});
