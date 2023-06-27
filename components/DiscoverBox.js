import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Avatar } from "@rneui/themed";
import { getAllUsers } from "../database";
import FollowButton from "./FollowButton";
import MainContext from "../MainContext/MainContext";

const DiscoverBox = ({ discoverBox, setDiscoverBox }) => {
  const { currentUser } = useContext(MainContext);
  const [allUsersData, setAllUsersData] = useState([]);
  const [removedBoxes, setRemovedBoxes] = useState([]);

  useEffect(() => {
    getAllUserInfo();
  }, []);

  const discoverBoxToggle = (index) => {
    const updatedBoxes = allUsersData.filter((_, i) => i !== index);
    const removedBox = allUsersData.find((_, i) => i === index);
    setAllUsersData(updatedBoxes);
    setRemovedBoxes([...removedBoxes, removedBox]);
  };

  const getAllUserInfo = async () => {
    const data = await getAllUsers();
    const filteredData = data.filter(
      (obj) => obj.username !== currentUser.username
    );
    setAllUsersData(filteredData);
  };

  return (
    <>
      {discoverBox ? (
        <View style={{ flexDirection: "row" }}>
          {allUsersData.map((user, index) => (
            <View key={index} style={styles.discover_people_box}>
              <TouchableOpacity
                onPress={() => discoverBoxToggle(index)}
                style={styles.iconContainer}
              >
                <Icon name="close" type="ionicon" size={20} color="black" />
              </TouchableOpacity>
              <View>
                <Avatar
                  size={65}
                  rounded
                  source={{
                    uri: user.user_img,
                  }}
                />
              </View>
              <Text style={styles.discover_box_username}>{user.username}</Text>
              <Text style={styles.discover_box_text}>Suggested for you</Text>
              <FollowButton />
            </View>
          ))}

          <View style={styles.discover_people_box_see_all}>
            <View>
              <Avatar
                size={65}
                rounded
                containerStyle={{
                  position: "absolute",
                  top: 10,
                  left: -40,
                }}
                source={{
                  uri: "https://randomuser.me/api/portraits/men/10.jpg",
                }}
              />
              <Avatar
                size={65}
                rounded
                containerStyle={{
                  position: "absolute",
                  top: 25,
                  right: -40,
                  borderWidth: 2,
                  borderColor: "white",
                }}
                source={{
                  uri: "https://randomuser.me/api/portraits/men/10.jpg",
                }}
              />
            </View>
            <View style={{ position: "absolute", bottom: 50 }}>
              <Text style={styles.discover_box_text}>
                Find More People to Follow
              </Text>
            </View>
            <Button
              containerStyle={{
                width: "90%",
                height: 30,
                marginTop: 5,
                borderRadius: 7,
                position: "absolute",
                bottom: 15,
              }}
              titleStyle={{
                fontSize: 13,
                color: "black",
              }}
              buttonStyle={{
                margin: 0,
                paddingTop: 5,
                backgroundColor: "#ccc",
              }}
              title={"Sell All"}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

export default DiscoverBox;

const styles = StyleSheet.create({
  discover_people_box_see_all: {
    width: 170,
    height: 170,
    display: "flex",
    alignItems: "center",
    borderColor: "#ccc",
    marginLeft: 5,
    borderWidth: 1,
    borderRadius: 5,
    position: "relative",
  },
  discover_people_box: {
    width: 170,
    height: 170,
    display: "flex",
    alignItems: "center",
    borderColor: "#ccc",
    marginLeft: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    position: "relative",
  },
  discover_box_username: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 3,
  },
  discover_box_text: {
    fontSize: 11,
  },
  iconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
  },
});
