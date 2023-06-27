import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import MainContext from "../MainContext/MainContext";
import { getAllUsersForSearch } from "../database";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import { masonryListPosts } from "../database";
import { app } from "../constants";

const SearchScreen = ({}) => {
  const { currentUser } = useContext(MainContext);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchData = async (text) => {
    setSearchText(text);
    const lowercaseText = text.toLowerCase();
    const data = await getAllUsersForSearch(lowercaseText);
    const filteredData = data.filter(
      (obj) => obj.username !== currentUser.username
    );
    setSearchResults(filteredData);
  };
  useEffect(() => {
    const getPost = async () => {
      const data = await masonryListPosts();
      const imgUrls = data.map((post) => post.imgUrl);
    };
    getPost();
  }, []);

  const navigator = () => {
    setSearchText("");
    setSearchResults([]);
    navigation.navigate("Home");
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingTop: app.topHeight + 9,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.1 }}>
              <Feather
                onPress={navigator}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 10,
                }}
                name={"arrow-left"}
                size={18}
                color={"black"}
              />
            </View>
            <View style={{ position: "relative", flex: 0.8 }}>
              <TextInput
                placeholder="Search"
                onChangeText={(text) => searchData(text)}
                style={styles.search_input}
                value={searchText}
              />
              <Feather
                style={{
                  position: "absolute",
                  top: 8,
                  left: 15,
                }}
                name={"search"}
                size={18}
                color={"black"}
              />
            </View>
          </View>
          <View></View>
          <View style={styles.serach_results}>
            {searchResults.map((result, index) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setSearchText("");
                  setSearchResults([]);
                  navigation.navigate("ProfileScreen", { userId: result.id });
                }}
                key={index}
              >
                <View style={styles.dropdown_result}>
                  <View style={styles.setting}>
                    <Avatar
                      size={50}
                      rounded
                      containerStyle={{
                        marginTop: 5,
                      }}
                      source={{
                        uri: result.user_img,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {result.username}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  search_input: {
    width: "100%",
    height: 35,
    backgroundColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 40,
    marginLeft: 7,
  },
  setting: {
    height: 45,
    width: "95%",
    marginTop: 15,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  serach_results: {
    marginTop: 15,
  },
});
