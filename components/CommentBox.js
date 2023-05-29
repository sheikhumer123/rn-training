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

import "react-native-get-random-values";

import { v4 as uuidv4 } from "uuid";

const CommentBox = ({ postID, commentInputRef }) => {
  const { currentUser } = useContext(MainContext);
  const key_id = uuidv4();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    add_by: currentUser.username,
    comment: "",
    upload_time: new Date(),
    id: key_id,
  });

  const addComment = async () => {
    if (comment.comment.trim() !== "") {
      await commented({ postID, comment });
      const updatedComments = await getComments({ postID }); // Fetch the updated comments

      setComments(updatedComments); // Update the comments state with the updated comments
    } else {
      alert("Write something first");
    }
    setComment({
      comment: "",
    });
    Keyboard.dismiss();
  };

  useEffect(() => {
    const fetchComments = async () => {
      const retrievedComments = await getComments({ postID });
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

      <View>
        {comments.map((comment) => (
          <Text key={comment.id}>{comment.comment}</Text>
        ))}
      </View>
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
});
