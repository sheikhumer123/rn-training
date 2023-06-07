import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  u,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import MasonryList from "react-native-masonry-list";
import { getAllUsersForSearch } from "../database";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import { MasonryListPosts } from "../database";

const SearchScreen = ({}) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [masonryPosts, setMasonryPosts] = useState([]);
  const searchData = async (text) => {
    setSearchText(text);
    const lowercaseText = text.toLowerCase();
    const data = await getAllUsersForSearch(lowercaseText);
    setSearchResults(data);
  };

  useEffect(() => {
    const getPost = async () => {
      const data = await MasonryListPosts();
      const imgUrls = data.map((post) => post.imgUrl);
      setMasonryPosts(imgUrls);
    };
    getPost();
  }, []);

  return (
    <>
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingTop: 35,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.1 }}>
              <Feather
                onPress={() => {
                  navigation.navigate("Home");
                }}
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
          <View>
            {searchText.length == 0 && (
              <MasonryList
                listContainerStyle={{
                  marginTop: 20,
                }}
                columns={3}
                images={masonryPosts.map((img) => ({ uri: img }))}
              />
            )}
          </View>
          <View style={styles.serach_results}>
            {searchResults.map((result) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("ProfileScreen", { userId: result.id });
                }}
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
