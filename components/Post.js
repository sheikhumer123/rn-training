import React, { useContext, useState, useRef, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@rneui/base";
import CommentBox from "./CommentBox";
import moment from "moment";

import MainContext from "../MainContext/MainContext";
import { likeFunction, getLikesLength } from "../database";
import { notify } from "../database";
import { app } from "../constants";

const Post = ({ post }) => {
  const commentInputRef = useRef(null);
  const uploadTime = post.upload_time;

  const timestamp = moment
    .unix(uploadTime.seconds)
    .milliseconds(uploadTime.nanoseconds / 1000000);
  const formattedTime = moment(timestamp).startOf("day").fromNow();
  const { currentUser } = useContext(MainContext);
  const [like, setLike] = useState({
    user_id: currentUser.uid,
    liked_by: currentUser.username,
  });

  const [postLikes, setPostLikes] = useState([]);
  const [loading, setloading] = useState(false);
  const [likeLength, setLikeLength] = useState({
    count: 0,
    updated: false,
  });

  const likePost = async () => {
    if (likeLength.updated) {
      setLikeLength((like) => ({
        ...like,
        count: like.count + (like.updated ? -1 : 1),
        updated: !like.updated,
      }));
      await likeFunction({ currentUser, like, post });
    } else {
      setLikeLength((like) => ({
        ...like,
        count: like.count + (like.updated ? -1 : 1),
        updated: !like.updated,
      }));
      await likeFunction({ currentUser, like, post });
      await notify(
        post.id,
        currentUser.username,
        currentUser.user_img,
        app.likeMessage.likeYou,
        currentUser.id
      );
    }
  };
  const checkThatPostLiked = (likes) => {
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].liked_by === currentUser.username) return true;
    }
    return false;
  };
  useEffect(() => {
    const fetchLikesLength = async () => {
      setloading(true);
      const data = await getLikesLength(post.post_id);
      setPostLikes(data);
      setLikeLength({
        ...likeLength,
        count: data.length,
        updated: checkThatPostLiked(data),
      });
      setloading(false);
    };
    fetchLikesLength();
  }, []);
  const handleClick = () => {
    commentInputRef.current.focus();
  };

  return (
    <View style={styles.post}>
      <View style={styles.post_top}>
        <View style={styles.flex_setting}>
          <Avatar
            size={32}
            rounded
            source={{
              uri: post.post_user_img,
            }}
          />
          <Text style={styles.post_username}>{post.username}</Text>
        </View>
      </View>
      <View style={styles.post_data}>
        <ImageBackground
          source={{
            uri: post.img,
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
          <TouchableWithoutFeedback onPress={likePost}>
            <Icon style={styles.post_icons} name="heart" type="feather" />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleClick}>
            <Icon
              style={styles.post_icons}
              name="message-circle"
              type="feather"
            />
          </TouchableWithoutFeedback>
          <Icon
            style={styles.post_icons}
            name="md-paper-plane-outline"
            type="ionicon"
          />
        </View>
        <Icon name="download" type="feather" />
      </View>
      <View style={styles.like_comment_section}>
        {loading ? (
          <ActivityIndicator
            animating={loading}
            style={{ alignSelf: "flex-start" }}
          />
        ) : (
          <Text style={{ marginTop: 5, fontSize: 14 }}>
            Like {likeLength.count}
          </Text>
        )}

        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>{post.username}</Text>
          <Text style={{ fontWeight: "400", fontSize: 14, paddingLeft: 5 }}>
            {post.description}
          </Text>
        </View>
        <CommentBox postID={post.post_id} commentInputRef={commentInputRef} />
        <View style={styles.flex_setting}>
          <Text style={styles.date_time}>{formattedTime}</Text>
        </View>
        <Text
          style={{
            fontSize: 9,
            color: "grey",
            fontWeight: "700",
          }}
        ></Text>
      </View>
    </View>
  );
};
export default Post;
const styles = StyleSheet.create({
  post: {
    marginTop: 20,
  },
  post_top: {
    paddingHorizontal: 10,
  },

  post_user_image: {
    height: 30,
    width: 30,

    borderRadius: 50,
  },
  post_username: {
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
  flex_setting: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  date_time: {
    fontSize: 10,
    marginTop: 2,
  },
});
