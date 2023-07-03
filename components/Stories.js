import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
  Image,
  Keyboard,
  LayoutAnimation,
  Text,
} from "react-native";
import { Avatar } from "@rneui/themed";
import { Button } from "@rneui/base";
import { app } from "../constants";
import { Icon, LinearProgress } from "react-native-elements";
import {
  addStory,
  getStories,
  storyPicUpload,
  addStoryView,
} from "../database";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import MainContext from "../MainContext/MainContext";
const Stories = () => {
  const { currentUser } = useContext(MainContext);
  const timeLimit = 5000;

  const [loader, setLoader] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [storyVisible, setStoryVisible] = useState(false);
  const [modalImage, setModalImage] = useState();
  const [isStoryUpdated, setIsStoryUpdated] = useState(false);
  const [modalFooterSwitch, setModalFooterSwitch] = useState(false);
  const [storyTimeoutProgress, setStoryTimeoutProgress] = useState(0);
  const [storyTimeout, setStoryTimeout] = useState(false);
  const [storyImage, setStoryImage] = useState(currentUser.user_img);
  const [stories, setStories] = useState([]);
  const [storyBorder, setStoryBorder] = useState(false);
  const [userStory, setUserStory] = useState([]);
  const [viewed, setViewed] = useState(false);
  const [textInputFocused, setTextInputFocused] = useState(false);
  const [timer, setTimer] = useState(null);

  const pickImage = async () => {
    if (storyBorder) {
      setStoryTimeout(!storyTimeout);
    }
    if (modalFooterSwitch) {
      if (userStory) {
        setModalImage(userStory[0].storyImgUrl);
      }
      setStoryVisible(true);
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        let uri = result.assets[0].uri;
        setStoryImage(uri);
        setModalImage(uri);
        setStoryVisible(true);
        setIsStoryUpdated(true);
      }
    }
  };

  const uploadStoryImage = async () => {
    return await storyPicUpload(storyImage);
  };

  const storyUpload = async () => {
    setLoader(true);
    const currentUserID = currentUser.id;
    const createDate = new Date();
    const expireDate = new Date(createDate);
    expireDate.setDate(expireDate.getDate() + 1);
    const url = await uploadStoryImage();
    await addStory(url, createDate, expireDate, currentUserID);
    setLoader(false);
    setStoryVisible(false);
    setModalFooterSwitch(true);
    setStoryBorder(true);
  };
  const closeModal = () => {
    setStoryVisible(false);
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setStoryTimeoutProgress((prevProgress) => prevProgress + timeLimit - 20);
    }, 1000);
    return timer;
  };

  const stopTimer = (timer) => {
    clearInterval(timer);
  };

  const handleFocus = () => {
    setTextInputFocused(true);
    if (timer) {
      stopTimer(timer);
    }
  };

  const handleBlur = () => {
    setTextInputFocused(false);
    if (!textInputFocused) {
      const newTimer = startTimer();
      setTimer(newTimer);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (modalFooterSwitch && !textInputFocused) {
      const newTimer = startTimer();
      setTimer(newTimer);
      timeoutId = setTimeout(() => {
        stopTimer(newTimer);
        setStoryVisible(false);
        setStoryTimeoutProgress(0);
      }, timeLimit - 20);
    }
    return () => {
      if (timer) {
        stopTimer(timer);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [storyTimeout, textInputFocused, timeLimit]);

  useEffect(() => {
    setViewed(false);
    allStories();
  }, []);

  const allStories = async () => {
    const data = await getStories();
    const filteredData = data.filter((obj) => obj.user_id == currentUser.id);
    if (filteredData.length > 0) {
      setModalFooterSwitch(true);
      setModalImage(filteredData[0].storyImgUrl);
      setStoryImage(filteredData[0].storyImgUrl);
    }
    if (filteredData.length > 0) {
      setStoryBorder(true);
    } else {
      setStoryBorder(false);
    }
    setUserStory(filteredData);
    const otherUserStories = data.filter(
      (obj) => obj.user_id !== currentUser.id
    );
    setStories(otherUserStories);
    const test = data.filter((obj) => obj.user_id !== currentUser.id);
  };

  const openOtherStories = async (image, storyID) => {
    setModalFooterSwitch(true);
    if (image) {
      setModalImage(image);
      if (modalFooterSwitch) {
        setStoryVisible(true);
      }
    }
    await addStoryView(storyID, currentUser.id);
    setViewed(true);
    setStoryTimeout(!storyTimeout);
  };

  const animateLayoutChanges = (duration) => {
    LayoutAnimation.configureNext({
      duration: duration,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
  };

  return (
    <View style={styles.stories}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <LinearGradient
          style={{ borderRadius: 50, margin: 1 }}
          colors={storyBorder ? ["#8922B1", "#BE1271"] : ["white", "white"]}
          end={[1, 2]}
          locations={[0, 0.5]}
        >
          <View style={styles.story}>
            <Avatar
              onPress={pickImage}
              size={65}
              rounded
              source={{
                uri: storyImage,
              }}
            />
            {!storyBorder && (
              <View
                style={{
                  height: 19,
                  width: 19,
                  position: "absolute",
                  bottom: 0,
                  right: 5,
                  backgroundColor: "white",
                  borderRadius: 50,
                }}
              >
                <Icon
                  type="entypo"
                  name="circle-with-plus"
                  size={19}
                  color={"#00A36C"}
                />
              </View>
            )}
          </View>
        </LinearGradient>
        {stories.map((st, index) => {
          const viewedby = st.viewedBy && st.viewedBy.includes(currentUser.id);
          const gradientColors =
            viewedby || viewed ? ["#ccc", "#ccc"] : ["#8922B1", "#BE1271"];

          return (
            <LinearGradient
              key={index}
              style={{ borderRadius: 50, margin: 1 }}
              colors={gradientColors}
              end={[1, 2]}
              locations={[0, 0.5]}
            >
              <View style={styles.story} key={index}>
                <Avatar
                  onPress={() => openOtherStories(st.storyImgUrl, st.user_id)}
                  size={65}
                  rounded
                  source={{
                    uri: st.storyImgUrl,
                  }}
                />
              </View>
            </LinearGradient>
          );
        })}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={storyVisible}
        onRequestClose={() => {
          setStoryVisible(!storyVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={styles.closeStory} onPress={closeModal}>
              <Icon color={"white"} type="feather" name="x" size={35} />
            </Pressable>
            {modalFooterSwitch ? (
              <View
                style={{
                  width: app.deviceWidth,
                  height: 3,
                  position: "absolute",
                  top: 40,
                  zIndex: 4,
                  backgroundColor: "#ccc",
                }}
              ></View>
            ) : (
              <View></View>
            )}

            {storyTimeoutProgress > 0 ? (
              <View
                style={{
                  width: app.deviceWidth,
                  height: 3,
                  position: "absolute",
                  top: 40,
                  zIndex: 4,
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={storyTimeoutProgress}
                  trackColor="#BE1279"
                  color="#ccc"
                />
              </View>
            ) : (
              <View></View>
            )}

            <View style={styles.modal_body}>
              {loader && (
                <View style={styles.story_loader}>
                  <Text style={{ color: "white", fontSize: 14 }}>
                    Posting...
                  </Text>
                </View>
              )}

              <Image
                style={{
                  height: app.deviceHeight - 120,
                  width: app.deviceWidth,
                  borderRadius: 10,
                }}
                source={{
                  uri: modalImage
                    ? modalImage
                    : "https://placehold.co/600x400/000000/FFFFFF/png?text=stories",
                }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                paddingTop: keyboardHeight > 0 ? 5 : 0,
                paddingBottom: keyboardHeight > 0 ? 5 : 10,
                width:
                  keyboardHeight > 0 ? app.deviceWidth : app.deviceWidth - 30,
                flexDirection: "row",
                position: "absolute",
                bottom: keyboardHeight > 0 ? keyboardHeight / 2 + 48 : 60,
                alignItems: "center",
                justifyContent: isStoryUpdated ? "flex-end" : "space-between",
                backgroundColor: keyboardHeight > 0 ? "black" : "transparent",
              }}
            >
              {modalFooterSwitch ? (
                <>
                  <TextInput
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                      borderColor: isKeyboardVisible ? "transparent" : "white",
                      height: 40,
                      width: app.deviceWidth - 125,
                      borderWidth: 1,
                      borderRadius: 30,
                      alignSelf: "flex-start",
                      paddingLeft: 20,
                      color: "white",
                    }}
                    placeholderTextColor="white"
                    placeholder="Send Comment"
                  />
                  <View style={styles.modal_footer_icons}>
                    <Icon
                      iconStyle={styles.modal_icon}
                      type="feather"
                      name="heart"
                      size={24}
                    />
                    <Icon
                      iconStyle={styles.modal_icon}
                      type="ionicon"
                      name="md-paper-plane-outline"
                      size={24}
                    />
                  </View>
                </>
              ) : (
                <>
                  <Button
                    onPress={storyUpload}
                    title={"Post"}
                    containerStyle={{
                      width: 100,
                    }}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Stories;

const styles = StyleSheet.create({
  stories: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  story: {
    margin: 5,
    borderRadius: 50,
    position: "relative",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    height: app.deviceHeight,
    width: app.deviceWidth,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeStory: {
    position: "absolute",
    top: 55,
    right: 20,
    zIndex: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 40,
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
  story_modal_footer: {
    paddingBottom: 10,
    width: app.deviceWidth - 30,
    flexDirection: "row",
    position: "absolute",
    bottom: 60,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  modal_input: {
    borderColor: "white",
    height: 40,
    width: app.deviceWidth - 125,
    borderWidth: 1,
    borderRadius: 30,
    alignSelf: "flex-start",
    paddingLeft: 20,
    color: "white",
  },
  keyboardVisibleInput: {
    height: 40,
    width: app.deviceWidth - 125,
    borderWidth: 1,
    alignSelf: "flex-start",
    paddingLeft: 20,
    color: "white",
  },
  modal_icon: { padding: 5, marginHorizontal: 5, color: "white" },
  modal_footer_icons: {
    flexDirection: "row",
  },
  modal_body: {
    justifyContent: "center",
    alignItems: "center",
    height: app.deviceHeight - 125,
    width: app.deviceHeight,
    borderRadius: 10,
  },
  story_loader: {
    height: 50,
    width: 100,
    position: "absolute",
    top: app.deviceHeight / 2 - 50,
    zIndex: 99,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
});

// const keyboardDidShowListener = Keyboard.addListener(
//   "keyboardDidShow",
//   (event) => {
//     const height = event.endCoordinates.height;
//     animateLayoutChanges(200);
//     setKeyboardHeight(height);
//     setKeyboardVisible(true);
//   }
// );
// const keyboardDidHideListener = Keyboard.addListener(
//   "keyboardDidHide",
//   () => {
//     setKeyboardHeight(0);
//     animateLayoutChanges(200);
//     setKeyboardVisible(false);
//   }
// );
// return () => {
//   keyboardDidHideListener.remove();
//   keyboardDidShowListener.remove();
// };
