import React, { useState, useContext, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MainContext from "../MainContext/MainContext";
import { commented, getComments } from "../database";
import { useNavigation } from "@react-navigation/native";

import "react-native-get-random-values";

import { v4 as uuidv4 } from "uuid";

const CommentBox = ({ postID, commentInputRef }) => {
  const navigation = useNavigation();
  const { currentUser } = useContext(MainContext);
  const key_id = uuidv4();
  const [comments, setComments] = useState([]);
  const [commentLength, setCommentLength] = useState();

  const [comment, setComment] = useState({
    user_img: currentUser.user_img,
    add_by: currentUser.username,
    comment: "",
    upload_time: new Date(),
    id: key_id,
  });

  const commentIconStyle = {
    height: commentLength < 2 ? "auto" : 40,
    overflow: "hidden",
  };

  const addComment = async () => {
    if (comment.comment.trim() !== "") {
      await commented({ postID, comment });
      const updatedComments = await getComments({ postID });
      setCommentLength(updatedComments.length); // Update commentLength
      setComments(updatedComments);
    } else {
      alert("Write something first");
    }
    setComment((prevComment) => ({
      ...prevComment,
      comment: "",
    }));
    Keyboard.dismiss();
  };

  useEffect(() => {
    const fetchComments = async () => {
      const retrievedComments = await getComments({ postID });
      setCommentLength(retrievedComments.length);
      setComments(retrievedComments);
    };
    fetchComments();
  }, []);

  return (
    <View>
      <View style={{ position: "relative" }} pointerEvents="box-none">
        <TextInput
          placeholder="Add a comment"
          style={styles.comment_box}
          value={comment.comment}
          onChangeText={(txt) => setComment({ ...comment, comment: txt })}
          ref={commentInputRef}
        />
        <TouchableOpacity
          onPress={addComment}
          style={{
            backgroundColor: "black",
          }}
        >
          <Feather
            style={styles.comment_icon}
            name="send"
            size={18}
            color={"dodgerblue"}
          />
        </TouchableOpacity>
      </View>

      <View style={commentIconStyle}>
        {comments.map((comment) => (
          <View style={styles.setting}>
            <Text style={{ fontWeight: "bold" }} key={comment.username}>
              {comment.add_by}
            </Text>
            <Text style={{ marginLeft: 5 }} key={comment.id}>
              {comment.comment}
            </Text>
          </View>
        ))}
      </View>
      {commentLength > 2 ? (
        <Text
          onPress={() => navigation.navigate("OpenCommentsScreen", postID)}
          style={styles.text_all_comments}
        >
          View all Comments
        </Text>
      ) : null}
    </View>
  );
};
export default CommentBox;

const styles = StyleSheet.create({
  comment_box: {
    width: "100%",
    height: 30,
    paddingLeft: 5,
    fontWeight: "500",
    marginTop: 3,
  },
  comment_icon: {
    position: "absolute",
    right: 10,
    bottom: 6,
  },
  comment_area: {
    overflow: "hidden",
  },
  setting: {
    display: "flex",
    flexDirection: "row",
  },
  text_all_comments: {
    color: "grey",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 1,
    fontSize: 13.5,
  },
});
