import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import Feather from "react-native-vector-icons/Feather";
import MainContext from "../MainContext/MainContext";
import { Button } from "@rneui/base";

const ProfileAndSettingScreen = (props) => {
  const navigation = useNavigation();
  const { setCurrentUser } = useContext(MainContext);

  return (
    <SafeAreaView style={styles.setting_area}>
      <ScrollView>
        <TouchableWithoutFeedback
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
        </TouchableWithoutFeedback>
      </ScrollView>

      <Button
        title="Log Out"
        onPress={() => {
          const auth = getAuth();
          signOut(auth);
          setCurrentUser({});
        }}
      />
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
});
