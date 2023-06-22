import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "@rneui/themed";
import { app } from "../constants";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { getUserPosts } from "../database";

import Feather from "react-native-vector-icons/Feather";
import DiscoverBox from "../components/DiscoverBox";
import MainContext from "../MainContext/MainContext";
import HighlightStories from "../components/HighlightStories";
import ProfileTabNavigator from "../navigation/ProfileTabNavigator";
import SettingModal from "../components/SettingModal";
import AccountSwitchModal from "../components/AccountSwicthModal";
import CreateModal from "../components/CreateModal";

const ProfileAndSettingScreen = (props) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [postLength, setPostLength] = useState("");
  const [followersLength, setFollowersLength] = useState("");
  const [followingLength, setFollowingLength] = useState("");
  const [AccountModal, setAccountModal] = useState(false);
  const { setCurrentUser, currentUser } = useContext(MainContext);
  const [discoverBox, setDiscoverBox] = useState(true);

  const discoverBoxToggle = () => {
    setDiscoverBox(!discoverBox);
  };

  const getPostLength = async () => {
    const posts = await getUserPosts(currentUser.id);
    setPostLength(posts.length);
  };

  useEffect(() => {
    getPostLength();
    setFollowingLength(currentUser.following.length);
    setFollowersLength(currentUser.followers.length);
  }, []);

  return (
    <SafeAreaView style={styles.setting_area}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profile_page_top_nav}>
          <View style={styles.top_nav_flex_1}>
            <Text style={styles.top_nav_email}>{currentUser.email}</Text>
            <TouchableWithoutFeedback>
              <Feather
                onPress={() => setAccountModal((q) => !q)}
                style={{ marginRight: 8, marginTop: 4 }}
                name={"arrow-down"}
                size={16}
                color={"black"}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.top_nav_flex}>
            <TouchableWithoutFeedback onPress={() => setCreateModal((q) => !q)}>
              <Feather name={"plus-square"} size={23} color={"black"} />
            </TouchableWithoutFeedback>
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
                uri: currentUser.user_img,
              }}
            />
            <View style={styles.section_1_text}>
              <Text style={app.styles.center_text}>{postLength}</Text>
              <Text style={app.styles.center_text}>Posts</Text>
            </View>
            <View style={styles.section_1_text}>
              <Text style={app.styles.center_text}>{followersLength}</Text>
              <Text style={app.styles.center_text}>Followers</Text>
            </View>
            <View style={styles.section_1_text}>
              <Text style={app.styles.center_text}>{followingLength}</Text>
              <Text style={app.styles.center_text}>Following</Text>
            </View>
          </View>
        </View>
        <View style={styles.section_2_container}>
          <Text>{currentUser.username}</Text>
          <Text>{currentUser.bio}</Text>
        </View>
        <View style={styles.section_3_container}>
          <View style={styles.profile_screen_buttons}>
            <Button
              onPress={() => navigation.navigate("EditProfileScreen")}
              buttonStyle={{
                backgroundColor: "#ccc",
              }}
              containerStyle={{
                width: "47%",
                height: 33,
              }}
              titleStyle={{
                fontSize: 13,
                color: "black",
                fontWeight: "600",
              }}
              title={"Edit Profile"}
            />

            <Button
              buttonStyle={{
                backgroundColor: "#ccc",
              }}
              containerStyle={{
                width: "47%",
                height: 33,
              }}
              titleStyle={{
                fontSize: 13,
                color: "black",
                fontWeight: "600",
              }}
              title={"Share Profile"}
            />
          </View>
          <View style={styles.add_friend_button}>
            <TouchableWithoutFeedback onPress={discoverBoxToggle}>
              <Feather name={"user-plus"} size={18} color={"black"} />
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.seciton_4_container}>
          {discoverBox ? <Text>Discover people</Text> : null}

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.discover_boxes}>
              <DiscoverBox
                discoverBox={discoverBox}
                setDiscoverBox={setDiscoverBox}
              />
            </View>
          </ScrollView>
        </View>

        <View style={styles.seciton_5_container}>
          <Text style={app.styles.bold_text}>Story Highlights</Text>
          <Text>Keep your favorite stories on your profile</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.highlight_box}>
              <HighlightStories />
            </View>
          </ScrollView>
        </View>

        <View style={styles.seciton_6_container}>
          <ProfileTabNavigator />
        </View>
        <Button
          title="Log Out"
          onPress={() => {
            const auth = getAuth();
            signOut(auth);
            setCurrentUser({});
          }}
        />
        <SettingModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
        <AccountSwitchModal
          AccountModal={AccountModal}
          setAccountModal={setAccountModal}
        />
        <CreateModal
          createModal={createModal}
          setCreateModal={setCreateModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileAndSettingScreen;

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
    flex: 0.2,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  top_nav_flex_1: {
    display: "flex",
    flexDirection: "row",
    flex: 0.5,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  top_nav_email: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
