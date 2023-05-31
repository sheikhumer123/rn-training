import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "@rneui/themed";

import Feather from "react-native-vector-icons/Feather";
import MainContext from "../MainContext/MainContext";
import { getAuth, signOut } from "firebase/auth";

import { app } from "../constants";
import { Button } from "react-native-elements";
import DiscoverBox from "../components/DiscoverBox";
import HighlightStories from "../components/HighlightStories";
import ProfileTabNavigator from "../navigation/ProfileTabNavigator";

const ProfileAndSettingScreen = (props) => {
  const { setCurrentUser, currentUser } = useContext(MainContext);
  const [discoverBox, setDiscoverBox] = useState(true);

  const discoverBoxToggle = () => {
    setDiscoverBox(!discoverBox);
  };

  return (
    <SafeAreaView style={styles.setting_area}>
      <ScrollView>
        <View style={styles.profile_page_top_nav}></View>
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
              <Text style={app.styles.center_text}>1</Text>
              <Text style={app.styles.center_text}>Posts</Text>
            </View>
            <View style={styles.section_1_text}>
              <Text style={app.styles.center_text}>29</Text>
              <Text style={app.styles.center_text}>Followers</Text>
            </View>
            <View style={styles.section_1_text}>
              <Text style={app.styles.center_text}>15</Text>
              <Text style={app.styles.center_text}>Following</Text>
            </View>
          </View>
        </View>
        <View style={styles.section_2_container}>
          <Text>Umer</Text>
          <Text>Bio</Text>
        </View>
        <View style={styles.section_3_container}>
          <View style={styles.profile_screen_buttons}>
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
          <Text>Discover people</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.discover_boxes}>
              <DiscoverBox />
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
    flex: 1,
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
    height: 300,
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
    height: 50,
    width: "100%",
    backgroundColor: "red",
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
});

{
  /* <TouchableWithoutFeedback
          onPress={() => navigation.navigate("PrivacyAndSettings")}
        >
          <View style={styles.setting_option}>
            <Feather
              style={{
                position: "absolute",
                top: 12,
                right: 10,
              }}
              name="settings"
              size={22}
              color={"dodgerblue"}
            />
            <Text style={styles.setting_option_text}>Privacy and Secuity</Text>
          </View>
        </TouchableWithoutFeedback> */
  {
  }
}
