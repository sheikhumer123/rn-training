import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import DiscoverBox from "../components/DiscoverBox";
import MainContext from "../MainContext/MainContext";
import Feather from "react-native-vector-icons/Feather";
import { Avatar } from "@rneui/themed";
import { app } from "../constants";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  getUserDB,
  createFollowFollowing,
  notify,
  removeFollowFollowing,
  getUserPosts,
} from "../database";

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userId } = route.params;
  const { currentUser, setCurrentUser } = useContext(MainContext);
  const [profile, setProfileData] = useState({
    followers: [],
    following: [],
  });
  const [discoverBox, setDiscoverBox] = useState(true);
  const [loading, setloading] = useState(false);
  const [postLength, setPostLength] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      const data = await getUserDB(userId);
      setProfileData(data);
      setloading(false);
    };
    getPostLength();
    fetchData();
  }, []);

  const getPostLength = async () => {
    const posts = await getUserPosts(currentUser.id);
    setPostLength(posts.length);
  };

  const follow = async () => {
    if (currentUser.following.includes(userId)) {
      setCurrentUser({
        ...currentUser,
        following: currentUser.following.filter((id) => id !== userId),
      });
      await removeFollowFollowing(currentUser.id, userId);
    } else {
      setCurrentUser({
        ...currentUser,
        following: [...currentUser.following, userId],
      });
      await createFollowFollowing(currentUser.id, userId);
      await notify(
        userId,
        currentUser.username,
        currentUser.user_img,
        app.notificationString.followingYou,
        currentUser.id
      );
    }
  };

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, ...app.styles.center_view }}>
          <ActivityIndicator animating={loading} size="small" color="#0000ff" />
        </View>
      ) : (
        <SafeAreaView style={styles.setting_area}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profile_page_top_nav}>
              <View style={styles.top_nav_flex_2}>
                <TouchableWithoutFeedback>
                  <Feather
                    onPress={() => navigation.navigate("Home")}
                    name="arrow-left"
                    size={23}
                    color="black"
                  />
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.top_nav_flex_1}>
                <Text style={styles.top_nav_email}>sadasdasd@gmail.com</Text>
              </View>
              <View style={styles.top_nav_flex}>
                <TouchableWithoutFeedback
                  onPress={() => setModalVisible((q) => !q)}
                >
                  <Feather name="menu" size={23} color="black" />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={styles.section_1_container}>
              <View style={styles.profile_page_section_1}>
                <Avatar
                  size={80}
                  rounded
                  source={{
                    uri: profile.user_img,
                  }}
                />
                <View style={styles.section_1_text}>
                  <Text style={app.styles.center_text}>{postLength}</Text>
                  <Text style={app.styles.center_text}>Posts</Text>
                </View>
                <View style={styles.section_1_text}>
                  <Text style={app.styles.center_text}>
                    {profile.followers.length}
                  </Text>
                  <Text style={app.styles.center_text}>Followers</Text>
                </View>
                <View style={styles.section_1_text}>
                  <Text style={app.styles.center_text}>
                    {profile.following.length}
                  </Text>
                  <Text style={app.styles.center_text}>Following</Text>
                </View>
              </View>
            </View>
            <View style={styles.section_2_container}>
              <Text>{profile.username}</Text>
              <Text>{profile.bio}</Text>
            </View>
            <View style={styles.section_3_container}>
              <View style={styles.profile_screen_buttons}>
                <Button
                  onPress={Follow}
                  buttonStyle={{
                    backgroundColor: "dodgerblue",
                  }}
                  containerStyle={{
                    width: "100%",
                    height: 33,
                  }}
                  titleStyle={{
                    fontSize: 13,
                    color: "white",
                    fontWeight: "600",
                  }}
                  title={
                    currentUser.following.includes(userId)
                      ? "Following"
                      : "Follow"
                  }
                />
              </View>
            </View>
            <View style={styles.seciton_4_container}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Suggested for you</Text>
                <TouchableWithoutFeedback>
                  <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
                    Sell all
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.discover_boxes}>
                  <DiscoverBox
                    discoverBox={discoverBox}
                    setDiscoverBox={setDiscoverBox}
                  />
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  setting_area: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  setting_option: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "red",
    flex: 1,
    alignContent: "center",
    paddingLeft: 10,
    alignItems: "center",
  },
  setting_option_text: {
    fontSize: 17,
  },
  section_1_container: {
    paddingHorizontal: 10,
  },
  section_2_container: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  section_3_container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  seciton_4_container: {
    marginTop: 30,
  },
  seciton_5_container: {
    marginTop: 20,
    paddingHorizontal: 2,
  },
  seciton_6_container: {
    marginTop: 20,
    flex: 1,
    height: 200,
  },
  discover_boxes: {
    marginTop: 10,
  },

  profile_screen_buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 10,
  },
  profile_page_top_nav: {
    display: "flex",
    flexDirection: "row",
    height: 35,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  profile_page_img: {
    height: 80,
    width: 80,
    borderRadius: 50,
    backgroundColor: "blue",
  },
  profile_page_section_1: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  section_1_text: {
    textAlign: "center",
  },
  add_friend_button: {
    height: 33,
    width: 30,
    backgroundColor: "#ccc",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  discover_people_box_dp: {
    height: 80,
    width: 80,
    backgroundColor: "red",
    borderRadius: 50,
  },
  discover_people_box: {
    width: 170,
    height: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  top_nav_flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  top_nav_flex_1: {
    display: "flex",
    flexDirection: "row",
    flex: 0.8,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  top_nav_flex_2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  top_nav_email: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
